'use client';

import { useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { HeroCircle } from '@/components/ui/hero-circle';

const CIRCLE_BASE  = 900;
const FINAL_SIZE   = 64;
const FINAL_SCALE  = FINAL_SIZE / CIRCLE_BASE;
const FINAL_ROT    = 240;

export function TravelingCircle() {
  const reducedMotion = useReducedMotion();

  const [heroHeight,       setHeroHeight]       = useState(900);
  const [intersectionDocY, setIntersectionDocY] = useState(1388);
  const [vh,               setVh]               = useState(900);

  useEffect(() => {
    function measure() {
      const viewportH = window.innerHeight;
      setVh(viewportH);

      const hero = document.querySelector('[data-section="hero"]') as HTMLElement | null;
      setHeroHeight(hero ? hero.offsetHeight : viewportH);

      const marker = document.querySelector('[data-intersection="services"]') as HTMLElement | null;
      if (marker && marker.offsetParent !== null) {
        setIntersectionDocY(marker.getBoundingClientRect().top + window.scrollY);
      } else {
        // Fallback: hero height + services top padding + label + half grid
        setIntersectionDocY(viewportH + 488);
      }
    }

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollY } = useScroll();

  const y  = useMotionValue(0);
  const sc = useMotionValue(1);
  const ro = useMotionValue(0);
  const op = useMotionValue(1);

  const yS  = useSpring(y,  { stiffness: 65, damping: 22 });
  const scS = useSpring(sc, { stiffness: 70, damping: 22 });
  const roS = useSpring(ro, { stiffness: 55, damping: 22 });

  useMotionValueEvent(scrollY, 'change', (sv) => {
    if (reducedMotion) return;

    // y=0 means the circle sits at the fixed wrapper's center (viewport center).
    // Positive y moves it DOWN from there.
    const intersectionAtEnd = intersectionDocY - heroHeight - vh / 2;

    if (sv <= 0) {
      y.set(0); sc.set(1); ro.set(0); op.set(1);
    } else if (sv <= heroHeight) {
      // Phase 1 — hero scrolling: travel from hero center → intersection
      const p = sv / heroHeight;
      y.set(p * intersectionAtEnd);
      sc.set(1 + p * (FINAL_SCALE - 1));
      ro.set(p * FINAL_ROT);
      op.set(1);
    } else {
      // Phase 2 — services (and beyond): track intersection as it scrolls up
      const vpY = intersectionDocY - sv; // intersection's current viewport position
      y.set(vpY - vh / 2);
      sc.set(FINAL_SCALE);
      ro.set(FINAL_ROT);
      // Fade out when intersection exits the top of viewport
      op.set(vpY < 0 ? 0 : Math.min(1, vpY / (vh * 0.15)));
    }
  });

  return (
    // Cover full viewport so flex-centering works; y shifts the whole plane down/up
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-40 hidden md:flex"
      style={{ y: yS, opacity: op }}
      aria-hidden="true"
    >
      <motion.div style={{ scale: scS, rotate: roS }}>
        <HeroCircle size={CIRCLE_BASE} />
      </motion.div>
    </motion.div>
  );
}
