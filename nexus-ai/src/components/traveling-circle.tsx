'use client';

import { useEffect, useRef, useState } from 'react';
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
const OPACITY_BASE = 0.7;

export function TravelingCircle() {
  const reducedMotion = useReducedMotion();

  // Client-only render: this is a decorative fixed overlay whose Framer Motion
  // value styles (transform/opacity) can't be predicted during SSR, so the
  // server HTML wouldn't match the client's first paint → hydration mismatch.
  // Mount after hydration to sidestep it (no SEO/content cost; aria-hidden).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Refs so the scroll callback always reads the latest measurements
  // without stale closure from useState.
  const heroHeightRef       = useRef(900);
  const intersectionDocYRef = useRef(1388);
  const vhRef               = useRef(900);
  const isMobileRef         = useRef(false);

  useEffect(() => {
    function measure() {
      const viewportH = window.innerHeight;
      vhRef.current = viewportH;

      const mobile = window.innerWidth < 768;
      isMobileRef.current = mobile;

      const hero = document.querySelector('[data-section="hero"]') as HTMLElement | null;
      heroHeightRef.current = hero ? hero.offsetHeight : viewportH;

      const marker = document.querySelector('[data-intersection="services"]') as HTMLElement | null;
      if (marker && marker.offsetParent !== null) {
        intersectionDocYRef.current = marker.getBoundingClientRect().top + window.scrollY;
      } else {
        intersectionDocYRef.current = viewportH + 488;
      }

      // On phones there is no grid intersection to dock into, so the circle is
      // just a soft backdrop: seed it small + dim so it never flashes huge.
      if (mobile) {
        sc.set(0.46);
        op.set(OPACITY_BASE * 0.7);
        y.set(0);
        ro.set(0);
      }
    }

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { scrollY } = useScroll();

  const y  = useMotionValue(0);
  const sc = useMotionValue(1);
  const ro = useMotionValue(0);
  const op = useMotionValue(1);

  // Stiff + critically damped springs — Lenis already smooths the scroll
  // input, so the spring only needs to remove sub-frame jitter. Soft springs
  // here caused visible overshoot/wobble at the Phase 1 → Phase 2 boundary.
  const yS  = useSpring(y,  { stiffness: 400, damping: 40 });
  const scS = useSpring(sc, { stiffness: 400, damping: 40 });
  const roS = useSpring(ro, { stiffness: 300, damping: 35 });

  useMotionValueEvent(scrollY, 'change', (sv) => {
    if (reducedMotion) return;

    // Mobile: no grid to dock into, so keep it as a soft, self-contained
    // backdrop — it sinks, shrinks and fades out as the hero leaves.
    if (isMobileRef.current) {
      const heroH = heroHeightRef.current;
      const p = Math.min(1, Math.max(0, sv / heroH));
      y.set(p * heroH * 0.18);
      sc.set(0.46 + (0.3 - 0.46) * p);
      ro.set(p * 140);
      op.set(
        p < 0.55
          ? OPACITY_BASE * 0.7
          : Math.max(0, OPACITY_BASE * 0.7 * (1 - (p - 0.55) / 0.45)),
      );
      return;
    }

    const heroH          = heroHeightRef.current;
    const intersectionY  = intersectionDocYRef.current;
    const vh             = vhRef.current;

    // The y offset that places the circle exactly at the intersection when
    // Phase 1 ends (sv === heroH). Positive = below viewport center.
    const intersectionAtEnd = intersectionY - heroH - vh / 2;

    if (sv <= 0) {
      // Resting at hero center
      y.set(0); sc.set(1); ro.set(0); op.set(OPACITY_BASE);

    } else if (sv <= heroH) {
      // Phase 1 — travel: lerp from hero center → intersection position
      const p = sv / heroH;
      y.set(p * intersectionAtEnd);
      sc.set(1 + p * (FINAL_SCALE - 1));
      ro.set(p * FINAL_ROT);
      op.set(OPACITY_BASE);

    } else {
      // Phase 2 — pinned to the grid intersection in DOCUMENT space.
      // Clamp to intersectionAtEnd so the circle never visually overshoots
      // below the intersection point while the page continues scrolling.
      const vpY = intersectionY - sv;     // intersection's current viewport Y
      const targetY = Math.min(intersectionAtEnd, vpY - vh / 2);
      y.set(targetY);
      sc.set(FINAL_SCALE);
      ro.set(FINAL_ROT);

      // Fade out only once the intersection has scrolled off the top
      // of the viewport (circle naturally leaves with the grid).
      if (vpY >= 0) {
        op.set(OPACITY_BASE);
      } else {
        // 120px of negative viewport position → fully faded
        op.set(Math.max(0, OPACITY_BASE * (1 + vpY / 120)));
      }
    }
  });

  // All hooks above run unconditionally (React rules); only the output is gated.
  if (!mounted) return null;

  return (
    // Fixed, full-viewport wrapper so flex-centering places the circle at
    // the viewport mid-point; the y spring shifts the whole plane.
    // z-[2] keeps the circle behind hero text (z-[10]) and brand strip
    // (z-[10] + solid bg) while still rendering above the page background.
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-[15]"
      style={{ y: yS, opacity: op }}
      aria-hidden="true"
    >
      <motion.div style={{ scale: scS, rotate: roS }}>
        <HeroCircle size={CIRCLE_BASE} />
      </motion.div>
    </motion.div>
  );
}
