import Link from 'next/link';
import {useState, useEffect} from 'react';

const LevelUpAction: React.FC = () => {
  const [bgSize, setBgSize] = useState('100% 100%');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setBgSize('cover');
      } else {
        setBgSize('100% 100%');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llamamos a la función inicialmente

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="logos"
      className="py-10"
      style={{
        backgroundImage: 'url(./images/bg-section-1.webp)',
        backgroundSize: bgSize,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
      }}
    >
      <div className="mt-1 w-full flex flex-wrap flex-col items-center justify-evenly gap-5 sm:gap-10 logos-container">
        <h1 className="text-4xl text-center text-white md:text-5xl font-bold text-foreground">
          {'!Haz tu nivelacion gratis hoy!'}
        </h1>
        <div>
          <Link
            href="#hero"
            className="flex justify-center bg-[#FFFFFF] py-4 px-10 rounded-full"
          >
            <p className="text-[#ee5983]">Aqui</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LevelUpAction;
