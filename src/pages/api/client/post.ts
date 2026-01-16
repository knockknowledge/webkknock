import {randomUUID} from 'crypto';
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

const logError = (requestId: string, scope: string, error: any) => {
  console.error(`[${requestId}] ${scope}`, {
    name: error?.name,
    code: error?.code,
    message: sanitizeErrorMessage(error?.message),
  });
};

const getClientIp = (req: any) => {
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

export default async function handler(req: any, res: any) {
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
  const data = req.body ?? {};

  // Validación de los datos recibidos
  const campos = [
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

  const clientPayload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    classType: data.classType,
    ageGroup: data.ageGroup,
  };

  try {
    await connectDB();
  } catch (error: any) {
    logError(requestId, 'connectDB', error);
    return res.status(500).json({
      error: 'No se pudo conectar a la base de datos.',
      code:
        error?.code === 'DB_NOT_CONFIGURED'
          ? 'DB_NOT_CONFIGURED'
          : 'DB_CONNECTION_FAILED',
      requestId,
    });
  }

  // Crear el nuevo registro en la base de datos
  const newRegister = new ClientModel(clientPayload);

  try {
    await newRegister.save();
  } catch (error: any) {
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({error: 'El correo ya está registrado.', code: 'DUPLICATE_EMAIL'});
    }

    if (error?.name === 'ValidationError') {
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

  try {
    await sendMail(clientPayload);
  } catch (error: any) {
    logError(requestId, 'sendMail', error);
    return res.status(502).json({
      error: 'No se pudo enviar el correo.',
      code: 'MAIL_SEND_FAILED',
      requestId,
    });
  }

  // Responder con el éxito
  return res
    .status(201)
    .json({message: 'Cliente registrado exitosamente!', requestId});
}
