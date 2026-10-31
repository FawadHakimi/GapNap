import Hero from './Hero';
import LiveAvailability from './LiveAvailability';
import Features from './Features';
import HowItWorks from './HowItWorks';
import PriceCards from './PriceCards';
import Location from './Location';
import Faq from './Faq';
import FinalCta from './FinalCta';

export default function Home() {
  return (
    <>
      <Hero />
      <LiveAvailability />
      <Features />
      <HowItWorks />
      <PriceCards />
      <Location />
      <Faq />
      <FinalCta />
    </>
  );
}
