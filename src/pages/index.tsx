import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing/Pricing';
import FAQ from '@/components/FAQ';
import Logos from '@/components/Logos';
import Benefits from '@/components/Benefits/Benefits';
import Container from '@/components/Container';
import Section from '@/components/Section';
import LevelUpAction from '@/components/LevelUpAction';
import PlaylistSpotify from '@/components/PlaylistSpotify';

const HomePage: React.FC = () => {
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
          <Pricing />
        </Section>
      </Container>
      <PlaylistSpotify />
      <Container>
        <Section id="testimonials" title="Testimonios" description="">
          <Testimonials />
        </Section>
        <FAQ />
      </Container>
    </>
  );
};

export default HomePage;
