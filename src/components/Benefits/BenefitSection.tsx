'use client';
import Image from 'next/image';
import clsx from 'clsx';
import {motion, Variants} from 'framer-motion';

import {IBenefit} from '../../types/types';

interface Props {
  benefit: IBenefit;
  imageAtRight?: boolean;
}

const containerVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.9,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export const childVariants = {
  offscreen: {
    opacity: 0,
    x: -50,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 1,
    },
  },
};

const BenefitSection: React.FC<Props> = ({benefit, imageAtRight}: Props) => {
  const {title, imageSrc} = benefit;

  return (
    <section className="benefit-section">
      <motion.div
        className="flex flex-wrap flex-col items-center justify-center gap-2 lg:flex-row lg:gap-20 lg:flex-nowrap mb-24"
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{once: true}}
      >
        <div
          className={clsx('flex flex-wrap items-center w-full max-w-lg', {
            'justify-start': imageAtRight,
            'lg:order-1 justify-end': !imageAtRight,
          })}
        >
          <div className="w-full  text-center lg:text-left ">
            <motion.div
              className="flex flex-col w-full"
              variants={childVariants}
            >
              <div className="flex justify-center">
                <Image
                  src={imageSrc}
                  alt={title || 'Benefit image'}
                  width={300}
                  height={300}
                  quality={100}
                  className="lg:ml-0"
                />
              </div>

              <p className="mt-1.5 mx-auto lg:ml-0 leading-normal text-foreground-accent">
                {/* {description} */}
                Knock Knowledge es una academia online especializada en la
                enseñanza del idioma inglés, con profesores 100% capacitados, en
                continuo aprendizaje y desarrollo. Nuestra metodología se adapta
                al mundialmente reconocido{' '}
                <span className="font-bold">
                  &quot;Estándar Europeo del Marco Común Europeo de Referencia
                  para las Lenguas (CEFR)&quot;
                </span>{' '}
                dividido en diferentes grados de aprendizaje, los cuales son{' '}
                <span className="font-bold">
                  A1, A2, B1, B2 y C1, distribuidos a lo largo de 22 niveles
                </span>{' '}
                académicos, diseñados para garantizar una formación completa de
                personas bilingües al finalizar nuestro curso.
              </p>
            </motion.div>

            {/* <div className="mx-auto lg:ml-0 w-full">
              {bullets.map((item, index) => (
                <BenefitBullet
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  description={item.description}
                />
              ))}
            </div> */}
          </div>
        </div>

        <div className={clsx('mt-5 lg:mt-0', {'lg:order-2': imageAtRight})}>
          <div
            className={clsx('w-fit flex', {
              'justify-start': imageAtRight,
              'justify-end': !imageAtRight,
            })}
          >
            <iframe
              className="w-full h-[315px] lg:w-[560px] lg:h-[315px]"
              // width="560"
              // height="315"
              src="https://www.youtube.com/embed/FNLTSn7rKII?autoplay=1&mute=1"
              title="YouTube video player"
              frameBorder="0" // ✅ Correcto en TypeScript
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BenefitSection;
