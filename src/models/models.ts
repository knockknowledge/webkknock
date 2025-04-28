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
    classType: {
      type: String,
      required: [true, 'El tipo de clase es requerido'],
      enum: ['Personalizado', 'Grupal', 'Conversacional'], // <- Aquí corregido
    },
    ageGroup: {
      type: String,
      required: [true, 'El grupo de edad es requerido'],
      enum: ['Niño', 'Adolescente', 'Adulto'], // <- Aquí corregido
    },
  },
  {
    timestamps: true,
  },
);

export default models.ClientRegister ||
  model('ClientRegister', clientRegisterSchema);
