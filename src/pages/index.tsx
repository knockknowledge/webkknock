'use client';
import Hero from '@/components/Hero';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import Pricing from '@/components/Pricing/Pricing';
import FAQ from '@/components/FAQ';
import Logos from '@/components/Logos';
import Benefits from '@/components/Benefits/Benefits';
import Container from '@/components/Container';
import Section from '@/components/Section';
import LevelUpAction from '@/components/LevelUpAction';
import PlaylistSpotify from '@/components/PlaylistSpotify';
import Subscription from '@/components/Subscription';
import ContactForm from '@/components/ContactForm';

import React, {useEffect, useState} from 'react';

const HomePage: React.FC = () => {
  const [bgSize, setBgSize] = useState('100% 100%');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setBgSize('100%');
      } else {
        setBgSize('70%');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llamamos a la función inicialmente

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Hero />
      <LevelUpAction />

      <Container>
        <Section id="about" title="" description="">
          <Benefits />
        </Section>

        <Logos />

        <Section id="plans" title="Nuestros Programas" description="">
          <div className="-mb-60 relative z-10 md:-mb-40">
            <Pricing />
          </div>
        </Section>
      </Container>

      <PlaylistSpotify />

      <Container>
        <div className="-mt-60 relative z-10 md:-mt-40">
          <Section id="testimonials" title="Testimonios" description="">
            <TestimonialsCarousel />
          </Section>
        </div>
        <div className="-mb-60 relative z-10 md:-mb-20">
          <FAQ />
        </div>
      </Container>

      <Subscription />

      <Container>
        <Section
          id="Contact"
          title="Contáctanos"
          description=""
          classes="-mt-40 relative z-10 flex justtify-center items-center flex-col"
        >
          <div
            style={{
              width: bgSize,
            }}
          >
            <ContactForm classes="py-4 w-[100%]" />
          </div>
        </Section>
      </Container>
    </>
  );
};

export default HomePage;
