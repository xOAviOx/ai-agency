import { Navigation } from '@/components/sections/navigation';
import { Hero } from '@/components/sections/hero';
import { TravelingCircle } from '@/components/traveling-circle';
import { BrandStrip } from '@/components/sections/brand-strip';
import { Services } from '@/components/sections/services';
import { CaseStudy } from '@/components/sections/case-study';
import { Showcase } from '@/components/sections/showcase';
import { Agencies } from '@/components/sections/agencies';
import { Orbit, OrbitJourney } from '@/components/sections/orbit';
import { CTA } from '@/components/sections/cta';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <>
      <TravelingCircle />
      <OrbitJourney />
      <Navigation />
      <main>
        <Hero />
        <div className="relative z-[20]">
          <BrandStrip />
        </div>
        <Services />
        <CaseStudy />
        <Showcase />
        <Agencies />
        <Orbit />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
