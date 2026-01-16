import {randomUUID} from 'crypto';
import {NextApiRequest, NextApiResponse} from 'next';
import ClientModel from '../../../models/models';
import {sendMail} from '../../../services/mailer';
import {connectDB} from '../../../services/mongoose';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50kb',
    },
  },
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitState = new Map<string, {count: number; start: number}>();

const sanitizeErrorMessage = (message?: string) => {
  if (typeof message !== 'string') {
    return undefined;
  }
  return message.replace(
    /(mongodb(?:\+srv)?:\/\/)([^@]+)@/g,
    '$1***:***@',
  );
};

const logError = (requestId: string, scope: string, error: unknown) => {
  const errorObj =
    error && typeof error === 'object'
      ? (error as {name?: unknown; code?: unknown; message?: unknown})
      : {};

  console.error(`[${requestId}] ${scope}`, {
    name: typeof errorObj.name === 'string' ? errorObj.name : undefined,
    code: errorObj.code,
    message: sanitizeErrorMessage(
      typeof errorObj.message === 'string' ? errorObj.message : undefined,
    ),
  });
};

const getErrorCode = (error: unknown) => {
  if (error && typeof error === 'object' && 'code' in error) {
    return (error as {code?: unknown}).code;
  }
  return undefined;
};

const getErrorName = (error: unknown) => {
  if (error && typeof error === 'object' && 'name' in error) {
    const name = (error as {name?: unknown}).name;
    return typeof name === 'string' ? name : undefined;
  }
  return undefined;
};

type ClientPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  classType: string;
  ageGroup: string;
};

const logMailEvent = (
  requestId: string,
  stage: 'queued' | 'sent' | 'config-warning',
  details: Record<string, unknown>,
) => {
  const baseDetails = {
    to: process.env.MAIL_ADDRESS,
    from: process.env.MAIL_ADDRESS,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    ...details,
  };

  if (stage === 'config-warning') {
    console.warn(`[${requestId}] mail:${stage}`, baseDetails);
    return;
  }

  console.info(`[${requestId}] mail:${stage}`, baseDetails);
};

const sendMailInBackground = (payload: ClientPayload, requestId: string) => {
  const missingMailEnv = ['MAIL_ADDRESS', 'MAIL_PASSWORD'].filter(
    key => !process.env[key],
  );

  if (missingMailEnv.length) {
    logMailEvent(requestId, 'config-warning', {missingMailEnv});
  }

  const startedAt = Date.now();
  logMailEvent(requestId, 'queued', {clientEmail: payload.email});

  // Desacoplamos el envío para que no bloquee la respuesta al usuario
  void sendMail(payload)
    .then(info => {
      logMailEvent(requestId, 'sent', {
        messageId: info?.messageId,
        accepted: info?.accepted,
        rejected: info?.rejected,
        durationMs: Date.now() - startedAt,
      });
    })
    .catch(error => {
      logError(requestId, 'sendMail', error);
    });
};

const getClientIp = (req: NextApiRequest) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0];
  }
  return req.socket?.remoteAddress || 'unknown';
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const record = rateLimitState.get(ip);
  if (!record || now - record.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitState.set(ip, {count: 1, start: now});
    return false;
  }
  record.count += 1;
  return record.count > RATE_LIMIT_MAX;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestId = randomUUID();
  res.setHeader('x-request-id', requestId);

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res
      .status(405)
      .json({error: 'Método no permitido.', code: 'METHOD_NOT_ALLOWED'});
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res
      .status(429)
      .json({
        error: 'Demasiadas solicitudes. Intenta más tarde.',
        code: 'RATE_LIMITED',
      });
  }

  // Recibimos los datos del cuerpo de la solicitud
  const data = (req.body ?? {}) as Partial<ClientPayload>;

  // Validación de los datos recibidos
  const campos: (keyof ClientPayload)[] = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'classType',
    'ageGroup',
  ];
  const camposFaltantes = campos.filter(campo => !data[campo]);
  if (camposFaltantes.length) {
    return res
      .status(400)
      .json({error: 'Faltan campos requeridos.', code: 'MISSING_FIELDS'});
  }

  const clientPayload: ClientPayload = {
    firstName: data.firstName as string,
    lastName: data.lastName as string,
    email: data.email as string,
    phone: data.phone as string,
    classType: data.classType as string,
    ageGroup: data.ageGroup as string,
  };

  try {
    await connectDB();
  } catch (error: unknown) {
    logError(requestId, 'connectDB', error);
    const errorCode = getErrorCode(error);
    return res.status(500).json({
      error: 'No se pudo conectar a la base de datos.',
      code:
        errorCode === 'DB_NOT_CONFIGURED'
          ? 'DB_NOT_CONFIGURED'
          : 'DB_CONNECTION_FAILED',
      requestId,
    });
  }

  // Crear el nuevo registro en la base de datos
  const newRegister = new ClientModel(clientPayload);

  try {
    await newRegister.save();
  } catch (error: unknown) {
    const errorCode = getErrorCode(error);
    if (errorCode === 11000 || errorCode === '11000') {
      return res
        .status(409)
        .json({error: 'El correo ya está registrado.', code: 'DUPLICATE_EMAIL'});
    }

    if (getErrorName(error) === 'ValidationError') {
      return res
        .status(422)
        .json({error: 'Datos de entrada no válidos.', code: 'VALIDATION_ERROR'});
    }

    logError(requestId, 'save', error);
    return res.status(500).json({
      error: 'No se pudo guardar el registro.',
      code: 'DB_SAVE_FAILED',
      requestId,
    });
  }

  sendMailInBackground(clientPayload, requestId);

  // Responder con el éxito
  return res
    .status(201)
    .json({message: 'Registro guardado con éxito.', requestId});
}
