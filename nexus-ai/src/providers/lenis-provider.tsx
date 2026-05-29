'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLenis } from '@/lib/smooth-scroll';

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    // Expose this instance so the nav (and anywhere else) can scrollTo sections.
    setLenis(lenis);

    // Bridge Lenis virtual scroll to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Named ticker function so we can remove it cleanly on unmount
    const lenisRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      setLenis(null);
      lenis.destroy();
      gsap.ticker.remove(lenisRaf);
    };
  }, []);

  return <>{children}</>;
}
