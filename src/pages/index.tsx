import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import Logos from "@/components/Logos";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import LevelUpAction from "@/components/LevelUpAction";
import PlaylistSpotify from "@/components/PlaylistSpotify";
import Subscription from "@/components/Subscription";

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
          <div className="-mb-20 relative z-10">
            <Pricing />
          </div>
        </Section>

      </Container>

      <PlaylistSpotify />

      <Container>
      <div className="-mt-20 relative z-10">
        <Section id="testimonials" title="Testimonios" description="">
            
          <Testimonials  />
         
        </Section>
        </div>
 <div className="-mb-20 relative z-10">
        <FAQ />
        </div>
      </Container>

      <Subscription />
    </>
  );
};

export default HomePage;
