import ClientModel from '../../../models/models';
import {sendMail} from '../../../services/mailer';

export default async function handler(req: any, res: any) {
  try {
    // Recibimos los datos del cuerpo de la solicitud
    const data = req.body;

    // Validación de los datos recibidos
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      let mensaje = 'Faltan campos requeridos: ';
      let campos = ['firstName', 'lastName', 'email', 'phone'];

      for (let campo of campos) {
        if (!data[campo]) {
          mensaje += campo + ', ';
        }
      }

      // Eliminar la última coma y espacio del mensaje de error
      mensaje = mensaje.slice(0, -2);
      return res.status(400).json({error: mensaje});
    }

    // Crear el nuevo registro en la base de datos
    const newRegister = new ClientModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    });

    await sendMail(newRegister);

    // Responder con el éxito
    return res
      .status(201)
      .json({message: 'Cliente registrado exitosamente!', task: newRegister});
  } catch (error: any) {
    console.error('Error al crear el registro:', error);

    if (error.name === 'ValidationError') {
      return res
        .status(422)
        .json({error: 'Datos de entrada no válidos.', details: error.errors});
    } else {
      return res
        .status(500)
        .json({error: 'Error interno del servidor.', message: error.message});
    }
  }
}
