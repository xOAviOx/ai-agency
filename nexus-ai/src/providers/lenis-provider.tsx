'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLenis } from '@/lib/smooth-scroll';

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

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
      lenisRef.current = null;
      gsap.ticker.remove(lenisRaf);
    };
  }, []);

  // Reset scroll on route change. Lenis owns the scroll position, so Next's
  // default "scroll to top on navigate" doesn't take effect — without this you
  // land wherever the previous page was scrolled (e.g. the footer). If the new
  // URL has a hash (#team), scroll to that element instead.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const hash = window.location.hash;
    if (hash) {
      const scrollToTarget = () => {
        const el = document.querySelector(hash);
        if (el) lenis.scrollTo(el as HTMLElement, { offset: -88 });
        else lenis.scrollTo(0, { immediate: true });
      };
      // Scroll once the DOM exists, then correct after the page settles: heavy
      // pages (e.g. /portfolio with 12 live-preview iframes) grow after first
      // paint, which moves a lower target down — a single early scroll lands short.
      const raf = requestAnimationFrame(scrollToTarget);
      const t1 = setTimeout(scrollToTarget, 300);
      const t2 = setTimeout(scrollToTarget, 700);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
