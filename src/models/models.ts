import {Schema, model, models} from 'mongoose';

const clientRegisterSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'El apellido es requerido'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es requerido'],
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Por favor ingresa un correo electrónico válido'],
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es requerido'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default models.ClientRegister ||
  model('ClientRegister', clientRegisterSchema);
