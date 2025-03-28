import Image from 'next/image';
import {useState, useEffect} from 'react';

const Subscription: React.FC = () => {
  const [bgSize, setBgSize] = useState('100% 100%');
  const [paddingSize, setPaddingSize] = useState(260);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setBgSize('cover');
        setPaddingSize(380);
      } else {
        setBgSize('100% 100%');
        setPaddingSize(260);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llamamos a la función inicialmente

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = [
    {
      title: 'Chill',
      description: '3 clases por semana.',
      icon: '/icons/chill.svg', // Ruta desde la carpeta public
    },
    {
      title: 'Focused',
      description: '4 clases por semana.',
      icon: '/icons/focused.svg',
    },
    {
      title: 'Immersion',
      description: '5 clases por semana.',
      icon: '/icons/inmerse.svg',
    },
    {
      title: 'Mastery',
      description: '6 clases por semana.',
      icon: '/icons/mastery.svg',
    },
  ];

  return (
    <section
      id="spotify-playlist"
      className="py-32 px-5"
      style={{
        backgroundImage: 'url(./images/bg-section-3.webp)',
        backgroundSize: bgSize,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingTop: paddingSize,
        paddingBottom: paddingSize,
      }}
    >
      <h2 className="text-5xl font-bold mb-10 text-center text-white">
        Suscripciones
      </h2>
      <div className="flex flex-wrap justify-center gap-20 md:flex-nowrap">
        {data.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-white w-full md:w-auto"
          >
            <div className="w-20 mx-10 h-20 text-red-500 flex items-center justify-center rounded-full text-lg font-semibold">
              <Image
                src={plan.icon}
                alt={plan.title}
                width={100}
                height={100}
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold capitalize">
              {plan.title}
            </h3>
            <p className="text-sm opacity-75  text-white font-bold">
              {plan.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Subscription;
