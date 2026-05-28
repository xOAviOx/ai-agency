'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { HeroCircle } from '@/components/ui/hero-circle';

const CIRCLE_BASE = 900;
const FINAL_SIZE  = 64;
const FINAL_SCALE = FINAL_SIZE / CIRCLE_BASE;
const FINAL_ROT   = 240;

export function TravelingCircle() {
  const reducedMotion = useReducedMotion();

  // Refs so the scroll callback always reads the latest measurements
  // without stale closure from useState.
  const heroHeightRef       = useRef(900);
  const intersectionDocYRef = useRef(1388);
  const vhRef               = useRef(900);

  useEffect(() => {
    function measure() {
      const viewportH = window.innerHeight;
      vhRef.current = viewportH;

      const hero = document.querySelector('[data-section="hero"]') as HTMLElement | null;
      heroHeightRef.current = hero ? hero.offsetHeight : viewportH;

      const marker = document.querySelector('[data-intersection="services"]') as HTMLElement | null;
      if (marker && marker.offsetParent !== null) {
        intersectionDocYRef.current = marker.getBoundingClientRect().top + window.scrollY;
      } else {
        intersectionDocYRef.current = viewportH + 488;
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

    const heroH          = heroHeightRef.current;
    const intersectionY  = intersectionDocYRef.current;
    const vh             = vhRef.current;

    // The y offset that places the circle exactly at the intersection when
    // Phase 1 ends (sv === heroH). Positive = below viewport center.
    const intersectionAtEnd = intersectionY - heroH - vh / 2;

    if (sv <= 0) {
      // Resting at hero center
      y.set(0); sc.set(1); ro.set(0); op.set(1);

    } else if (sv <= heroH) {
      // Phase 1 — travel: lerp from hero center → intersection position
      const p = sv / heroH;
      y.set(p * intersectionAtEnd);
      sc.set(1 + p * (FINAL_SCALE - 1));
      ro.set(p * FINAL_ROT);
      op.set(1);

    } else {
      // Phase 2 — frozen: circle sits at the intersection regardless of
      // further scrolling. The dashed cross lines scroll with the page
      // while the circle holds its viewport position.
      y.set(intersectionAtEnd);
      sc.set(FINAL_SCALE);
      ro.set(FINAL_ROT);

      // Fade out gradually as the user scrolls the services section away
      const svBeyond = sv - heroH;   // extra scroll past the hero
      const fadeIn   = 160;          // px of services scroll before fade begins
      const fadeOut  = 520;          // px of services scroll when fully faded
      if (svBeyond < fadeIn) {
        op.set(1);
      } else if (svBeyond < fadeOut) {
        op.set(1 - (svBeyond - fadeIn) / (fadeOut - fadeIn));
      } else {
        op.set(0);
      }
    }
  });

  return (
    // Fixed, full-viewport wrapper so flex-centering places the circle at
    // the viewport mid-point; the y spring shifts the whole plane.
    // z-[2] keeps the circle behind hero text (z-[10]) and brand strip
    // (z-[10] + solid bg) while still rendering above the page background.
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-[2] hidden md:flex"
      style={{ y: yS, opacity: op }}
      aria-hidden="true"
    >
      <motion.div style={{ scale: scS, rotate: roS }}>
        <HeroCircle size={CIRCLE_BASE} />
      </motion.div>
    </motion.div>
  );
}
