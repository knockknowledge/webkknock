import Image from 'next/image';

const Subscription: React.FC = () => {
  return (
    <section
      id="spotify-playlist"
      className="py-32 px-5"
      style={{
        backgroundImage: 'url(./images/bg-section-3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingTop: 300,
        paddingBottom: 300,
      }}
      >
      <h2 className="text-5xl font-bold mb-10 text-center text-white">Suscripciones</h2>
      <div className="flex justify-center gap-10">
        {["Chill", "Focused", "Immersion", "Mastery"].map((plan, index) => (
          <div key={index} className="flex flex-col items-center text-white">
            <div className="w-20 h-20 bg-white text-red-500 flex items-center justify-center rounded-full text-lg font-semibold">
              Icono
            </div>
            <h3 className="mt-4 text-xl font-semibold capitalize">{plan}</h3>
            <p className="text-sm opacity-75 mt-2 text-white">Lorem ipsum dolor sit amet.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Subscription;
