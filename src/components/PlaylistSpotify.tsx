import Image from 'next/image';
import {useState, useEffect} from 'react';

const PlaylistSpotify: React.FC = () => {
  const [bgSize, setBgSize] = useState('100% 100%');
  const [paddingSize, setPaddingSize] = useState(260);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setBgSize('cover');
        setPaddingSize(350);
      } else {
        setBgSize('100% 100%');
        setPaddingSize(190);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llamamos a la función inicialmente

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="spotify-playlist"
      className="py-32 px-5 "
      style={{
        backgroundImage: 'url(./images/bg-section-2.webp)',
        backgroundSize: bgSize,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingTop: paddingSize,
        paddingBottom: paddingSize,
      }}
    >
      <div className="mt-5 w-full flex flex-wrap flex-row items-center justify-evenly gap-5 sm:gap-10 logos-container">
        <a
          href="https://open.spotify.com/playlist/7cOqP2wIh8WlREYTGEUHen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="pointer hover:scale-110 transition-transform duration-300 ease-in-out"
            src="/images/A-level-playlist.png"
            alt="A Level Playlist"
            width={260}
            height={260}
          />
        </a>
        <a
          href="https://open.spotify.com/playlist/1UaUR4ZHJIu8Z47pB6dSSi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="pointer hover:scale-110 transition-transform duration-300 ease-in-out"
            src="/images/B-level-playlist.png"
            alt="B Level Playlist"
            width={260}
            height={260}
          />
        </a>
        <a
          href="https://open.spotify.com/playlist/2cSMcNXBPaL7f2DqsCtp39"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="pointer hover:scale-110 transition-transform duration-300 ease-in-out"
            src="/images/C-level-playlist.png"
            alt="C Level Playlist"
            width={260}
            height={260}
          />
        </a>
      </div>
    </section>
  );
};

export default PlaylistSpotify;
