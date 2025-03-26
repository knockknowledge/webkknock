import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import clsx from 'clsx';

// Definir el esquema de validación con Yup
const schema = Yup.object({
  firstName: Yup.string().required('El nombre es requerido'),
  lastName: Yup.string().required('El apellido es requerido'),
  email: Yup.string()
    .email('Por favor ingresa un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  phone: Yup.string().required('El teléfono es requerido'),
  classType: Yup.string().required('Selecciona el tipo de clase'),
  ageGroup: Yup.string().required('Selecciona la edad del estudiante'),
}).required();

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  classType: string;
  ageGroup: string;
}

interface ContactFormProps {
  title?: string; // El título es opcional
  classes?: string; // Clases CSS opcionales
}

const ContactForm: React.FC<ContactFormProps> = ({title, classes}) => {
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
    <section className={clsx('bg-white px-8 rounded-lg shadow-lg', classes)}>
      {title && <h2 className="text-blue-500 mb-5">{title}</h2>}
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

        {/* Tipo de clase */}
        <div className="mb-4 flex flex-col rounded-lg p-2 bg-gray-200">
          <label htmlFor="classType" className="text-sm">
            Tipo de clase:
          </label>
          <div className="flex flex-col">
            <Controller
              control={control}
              name="classType"
              render={({field}) => (
                <div className="flex flex-col space-y-2">
                  <label className="text-sm">
                    <input
                      {...field}
                      type="radio"
                      value="Personalizado"
                      className="mr-2"
                    />
                    Personalizado
                  </label>
                  <label className="text-sm">
                    <input
                      {...field}
                      type="radio"
                      value="Grupal"
                      className="mr-2"
                    />
                    Grupal
                  </label>
                  <label className="text-sm">
                    <input
                      {...field}
                      type="radio"
                      value="Conversacional"
                      className="mr-2"
                    />
                    Conversacional
                  </label>
                </div>
              )}
            />
          </div>
          {errors.classType && (
            <p style={{color: 'red'}}>{errors.classType.message}</p>
          )}
        </div>

        {/* Edad del estudiante */}
        <div className="mb-4 flex flex-col rounded-lg p-2 bg-gray-200">
          <label htmlFor="ageGroup" className="text-sm">
            Edad del estudiante:
          </label>
          <div className="flex flex-col">
            <Controller
              control={control}
              name="ageGroup"
              render={({field}) => (
                <div className="flex flex-col space-y-2">
                  <label className="text-sm">
                    <input
                      {...field}
                      type="radio"
                      value="Niño"
                      className="mr-2"
                    />
                    Niño
                  </label>
                  <label className="text-sm">
                    <input
                      {...field}
                      type="radio"
                      value="Adolescente"
                      className="mr-2"
                    />
                    Adolescente
                  </label>
                  <label className="text-sm">
                    <input
                      {...field}
                      type="radio"
                      value="Adulto"
                      className="mr-2"
                    />
                    Adulto
                  </label>
                </div>
              )}
            />
          </div>
          {errors.ageGroup && (
            <p style={{color: 'red'}}>{errors.ageGroup.message}</p>
          )}
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="flex justify-center bg-blue-300 p-4 rounded-lg text-white hover:bg-blue-400 w-full"
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
