import { Navigation } from '@/components/sections/navigation';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { CaseStudy } from '@/components/sections/case-study';
import { Showcase } from '@/components/sections/showcase';
import { Agencies } from '@/components/sections/agencies';
import { Orbit } from '@/components/sections/orbit';
import { CTA } from '@/components/sections/cta';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
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
