import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

// Definir el esquema de validación con Yup
const schema = Yup.object({
  firstName: Yup.string().required('El nombre es requerido'),
  lastName: Yup.string().required('El apellido es requerido'),
  email: Yup.string()
    .email('Por favor ingresa un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  phone: Yup.string().required('El teléfono es requerido'),
}).required();

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const ContactForm: React.FC = () => {
  // Usar react-hook-form con Yup para la validación
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      alert('Formulario enviado con éxito');
    } catch (error) {
      alert('Error al enviar el formulario');
    }
  };

  return (
    <section className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-blue-500 mb-5">Contactanos</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col rounded-lg p-2 bg-gray-200">
          <label htmlFor="firstName">Nombre:</label>
          <Controller
            control={control}
            name="firstName"
            render={({field}) => (
              <input
                {...field}
                className="bg-gray-200 p-1 focus:outline-none "
              />
            )}
          />
          {errors.firstName && (
            <p style={{color: 'red'}}>{errors.firstName.message}</p>
          )}
        </div>
        <div className="mb-4 flex flex-col rounded-lg p-2 bg-gray-200">
          <label htmlFor="lastName">Apellido:</label>
          <Controller
            control={control}
            name="lastName"
            render={({field}) => (
              <input
                {...field}
                className="bg-gray-200 p-1 focus:outline-none "
              />
            )}
          />
          {errors.lastName && (
            <p style={{color: 'red'}}>{errors.lastName.message}</p>
          )}
        </div>
        <div className="mb-4 flex flex-col rounded-lg p-2 bg-gray-200">
          <label htmlFor="email">Correo electrónico:</label>
          <Controller
            control={control}
            name="email"
            render={({field}) => (
              <input
                type="email"
                {...field}
                className="bg-gray-200 p-1 focus:outline-none "
              />
            )}
          />
          {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
        </div>
        <div className="mb-4 flex flex-col rounded-lg p-2 bg-gray-200">
          <label htmlFor="phone">Teléfono:</label>
          <Controller
            control={control}
            name="phone"
            render={({field}) => (
              <input
                {...field}
                className="bg-gray-200 p-1 focus:outline-none "
              />
            )}
          />
          {errors.phone && <p style={{color: 'red'}}>{errors.phone.message}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="flex justify-center bg-blue-300 p-4 rounded-lg text-white hover:bg-blue-400"
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
