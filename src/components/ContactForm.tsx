'use client';
import React from 'react';
import {Dialog, Transition} from '@headlessui/react';
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

type ModalState = {
  open: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  code?: string;
  requestId?: string;
};

const ContactForm: React.FC<ContactFormProps> = ({title, classes}) => {
  // Usar react-hook-form con Yup para la validación
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [modalState, setModalState] = React.useState<ModalState>({
    open: false,
    type: 'success',
    title: '',
    message: '',
  });

  const closeModal = () =>
    setModalState(prev => ({
      ...prev,
      open: false,
    }));

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/client/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setModalState({
          open: true,
          type: 'error',
          title: 'No pudimos enviar tu registro',
          message: payload?.error || 'Error al enviar el formulario.',
          code: payload?.code,
          requestId: payload?.requestId,
        });
        return;
      }

      reset();
      setModalState({
        open: true,
        type: 'success',
        title: 'Registro enviado',
        message:
          payload?.message ||
          'Gracias por registrarte. Te contactaremos muy pronto.',
        requestId: payload?.requestId,
      });
    } catch (error) {
      setModalState({
        open: true,
        type: 'error',
        title: 'No pudimos enviar tu registro',
        message:
          error instanceof Error
            ? error.message
            : 'Error al enviar el formulario.',
      });
    }
  };

  return (
    <section className={clsx('bg-white px-8 rounded-lg shadow-lg', classes)}>
      <Transition appear show={modalState.open} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-start gap-3">
                    <div
                      className={clsx(
                        'flex h-10 w-10 items-center justify-center rounded-full',
                        modalState.type === 'success' &&
                          'bg-emerald-100 text-emerald-700',
                        modalState.type === 'error' &&
                          'bg-rose-100 text-rose-700',
                      )}
                    >
                      {modalState.type === 'success' ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold text-slate-900"
                      >
                        {modalState.title}
                      </Dialog.Title>
                      <Dialog.Description className="mt-2 text-sm text-slate-600">
                        {modalState.message}
                      </Dialog.Description>
                      {(modalState.code || modalState.requestId) && (
                        <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                          {modalState.code && (
                            <div className="font-mono">
                              Codigo: {modalState.code}
                            </div>
                          )}
                          {modalState.requestId && (
                            <div className="font-mono">
                              ID: {modalState.requestId}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className={clsx(
                        'rounded-lg px-4 py-2 text-sm font-medium text-white',
                        modalState.type === 'success'
                          ? 'bg-emerald-500 hover:bg-emerald-600'
                          : 'bg-rose-500 hover:bg-rose-600',
                      )}
                    >
                      Cerrar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

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
            Modalidad:
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
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={clsx(
              'flex justify-center bg-blue-300 p-4 rounded-lg text-white hover:bg-blue-400 w-full',
              isSubmitting && 'opacity-60 cursor-not-allowed',
            )}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
