import Image from 'next/image';
const PlaylistSpotify: React.FC = () => {
  return (
    <section
      id="logos"
      className="py-32 px-5 "
      style={{
        backgroundImage: 'url(./images/bg-section-2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingTop: 240,
        paddingBottom: 240,
      }}
    >
      <div className="mt-5 w-full flex flex-wrap flex-row items-center justify-evenly gap-5 sm:gap-10 logos-container">
        <Image
          className="pointer "
          src="/images/A-level-playlist.png"
          alt="Logo"
          width={200}
          height={200}
        />
        <Image
          className="pointer "
          src="/images/B-level-playlist.png"
          alt="Logo"
          width={200}
          height={200}
        />
        <Image
          className="pointer "
          src="/images/C-level-playlist.png"
          alt="Logo"
          width={200}
          height={200}
        />
      </div>
    </section>
  );
};

export default PlaylistSpotify;
