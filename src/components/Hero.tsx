import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {footerDetails} from '@/data/footer';
import Link from 'next/link';
import {getPlatformIconByName} from '../utils/utils';
import AppStoreButton from './AppStoreButton';
import PlayStoreButton from './PlayStoreButton';

import {heroDetails} from '@/data/hero';
import ContactForm from './ContactForm';

// Lista de imágenes de fondo para el carrusel
const backgroundImages = [
  '/images/hero_wallpaper_1.webp',
  '/images/hero_wallpaper_2.webp',
  '/images/hero_wallpaper_3.webp',
  '/images/hero_wallpaper_4.webp',
];

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  // Precargar imágenes
  useEffect(() => {
    backgroundImages.forEach(image => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setLoadedImages(prev => [...prev, image]);
      };
    });
  }, []);

  // Cambiar imagen cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center pb-32 pt-32 md:pt-40 px-5 bg-cover bg-center"
    >
      {/* Contenedor de imágenes precargadas */}
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full h-full">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{backgroundImage: `url(${image})`}}
            initial={{opacity: 0}}
            animate={{opacity: currentImage === index ? 1 : 0}}
            transition={{duration: 2, ease: 'easeInOut'}} // Transición más fluida
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col lg:flex-row w-full items-end justify-center lg:justify-between space-y-8 lg:space-y-0">
        {/* Contenedor para el contenido */}
        <div className="text-white text-center lg:text-left flex-1">
          <h1 className="text-4xl text-white md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto">
            {heroDetails.heading}
          </h1>
          {/* {footerDetails.socials && (
            <div className="flex items-center gap-5 flex-wrap mx-auto">
              {Object.keys(footerDetails.socials).map(platformName => {
                if (platformName && footerDetails.socials[platformName]) {
                  return (
                    <Link
                      href={footerDetails.socials[platformName]}
                      key={platformName}
                      aria-label={platformName}
                    >
                      {getPlatformIconByName(platformName)}
                    </Link>
                  );
                }
              })}
            </div>
          )} */}
        </div>

        {/* ContactForm */}
        <div className="w-full lg:w-1/3">
          <ContactForm title={'Contáctanos'} classes="py-8" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
