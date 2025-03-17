import Image from 'next/image';
import {motion} from 'framer-motion';

const flags = [
  '/flats/4.png',
  '/flats/8.png',
  '/flats/3.png',
  '/flats/6.png',
  '/flats/5.png',
  '/flats/2.png',
  '/flats/9.png',
  '/flats/10.png',
  '/flats/1.png',
  '/flats/7.png',
];

const Logos: React.FC = () => {
  return (
    <section id="logos" className="py-32 px-5 bg-background overflow-hidden">
      <p className="text-3xl text-center text-gray-600 md:text-3xl font-bold text-foreground">
        {'Estudiantes alrededor'}
        <br />
        {'del mundo en más de 9+ países'}
      </p>

      <div className="relative mt-5 w-full overflow-hidden logos-container mask-gradient">
        <motion.div
          className="flex space-x-8 w-max"
          animate={{translateX: '-50%'}} // 🔹 En lugar de mover solo "-100%", usamos -50% para el loop
          transition={{
            repeat: Infinity,
            repeatType: 'loop', // 🔹 Hace que sea un ciclo sin cortes
            duration: 50, // 🔹 Ajusta la velocidad del movimiento
            ease: 'linear',
          }}
          style={{display: 'flex', minWidth: '200%'}} // 🔹 Asegura que haya suficiente espacio
        >
          {[...flags, ...flags].map((src, index) => (
            <Image key={index} src={src} alt="Flag" width={100} height={100} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Logos;
