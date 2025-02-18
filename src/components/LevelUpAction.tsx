const LevelUpAction: React.FC = () => {
  return (
    <section
      id="logos"
      className="py-32 px-5 "
      style={{
        backgroundImage: 'url(./images/bg-section-1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="mt-5 w-full flex flex-wrap flex-col items-center justify-evenly gap-5 sm:gap-10 logos-container">
        <h1 className="text-4xl text-center text-white md:text-6xl font-bold text-foreground">
          {'!Haz tu nivelacion gratis hoy!'}
        </h1>
        <div>
          <button className="flex justify-center bg-[#FFFFFF] py-4 px-10 rounded-full">
            <p className="text-[#ee5983]">Aqui</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LevelUpAction;
