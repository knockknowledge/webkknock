import Image from 'next/image';

const Logos: React.FC = () => {
  return (
    <section id="logos" className="py-32 px-5 bg-background">
      <p className="text-3xl text-center text-gray-600 md:text-3xl font-bold text-foreground">
        {'Estudiantes alrededor'}
        <br />
        {'del mundo en más de 9+ países'}
      </p>

      <div className="relative mt-5 w-full flex flex-wrap flex-row items-center justify-evenly gap-1 sm:gap-1 logos-container mask-gradient">
        {/* Contenido de imágenes */}
        <Image src="/flats/4.png" alt="Spain" width={100} height={100} />
        <Image src="/flats/8.png" alt="Spain" width={100} height={100} />
        <Image src="/flats/3.png" alt="EEUU" width={100} height={100} />
        <Image src="/flats/6.png" alt="Mexico" width={100} height={100} />
        <Image src="/flats/5.png" alt="RD" width={100} height={100} />
        <Image src="/flats/2.png" alt="Venezuela" width={100} height={100} />
        <Image src="/flats/9.png" alt="Colombia" width={100} height={100} />
        <Image src="/flats/10.png" alt="Chile" width={100} height={100} />
        <Image src="/flats/1.png" alt="Argentina" width={100} height={100} />
        <Image src="/flats/7.png" alt="Panama" width={100} height={100} />
      </div>
    </section>
  );
};

export default Logos;
