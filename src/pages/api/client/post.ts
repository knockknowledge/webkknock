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
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({error: 'Método no permitido.'});
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res
      .status(429)
      .json({error: 'Demasiadas solicitudes. Intenta más tarde.'});
  }

  try {
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
      return res.status(400).json({error: 'Faltan campos requeridos.'});
    }

    await connectDB();

    // Crear el nuevo registro en la base de datos
    const newRegister = new ClientModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      classType: data.classType,
      ageGroup: data.ageGroup,
    });

    await newRegister.save();
    await sendMail(data);

    // Responder con el éxito
    return res.status(201).json({message: 'Cliente registrado exitosamente!'});
  } catch (error: any) {
    if (error?.code === 11000) {
      return res.status(409).json({error: 'El correo ya está registrado.'});
    }

    if (error.name === 'ValidationError') {
      return res.status(422).json({error: 'Datos de entrada no válidos.'});
    }

    return res.status(500).json({error: 'Error interno del servidor.'});
  }
}
