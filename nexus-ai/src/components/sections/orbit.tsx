'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useTime,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
  MotionValue,
} from 'framer-motion';
import { ArrowRight, Zap, Clock, Users, Star, Shield, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { degToRad } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────
   "Why NEXUS" — a single circle that TRAVELS across sections.

   The circle is one fixed, full-viewport object (<OrbitJourney/>,
   rendered at the page root). Driven by global scrollY it:

     Showcase (parallax) ── appears small, faint, drifting
            │
            ▼  grows after "For Agencies"
     Why NEXUS stage ───── full-size ring; labels sweep L→R;
                           the ring rotates the SAME direction
            │
            ▼  fades + shrinks into the CTA

   <Orbit/> itself is just a tall transparent "stage" in normal
   flow that provides the scroll distance + a measurement marker
   for the pinned Why NEXUS moment. On mobile the whole travelling
   scene is skipped for a clean stacked list.
   ────────────────────────────────────────────────────────────── */

/* ── Orbit content ──────────────────────────────────────────── */
const PHRASES: {
  angle: number;
  headline: string;
  sub: string;
  cta: string;
  icon: LucideIcon;
}[] = [
  { angle: 0,   headline: 'Ship in weeks',   sub: 'Not quarters.',          cta: 'Case studies', icon: Rocket },
  { angle: 60,  headline: 'Embedded trust',  sub: 'Like in-house talent.',  cta: 'How we embed', icon: Shield },
  { angle: 120, headline: 'Less downtime',   sub: 'More action.',           cta: 'Our process',  icon: Zap    },
  { angle: 180, headline: '24-hour replies', sub: 'Always on, always you.', cta: 'How we work',  icon: Clock  },
  { angle: 240, headline: 'Senior talent',   sub: 'On every project.',      cta: 'Meet the team',icon: Star   },
  { angle: 300, headline: 'Direct access',   sub: 'No account managers.',   cta: 'Say hello',    icon: Users  },
];

/* Tunables — retune the whole journey here. */
const DRIFT_REV_MS = 140_000; // ms for one slow "alive" revolution (no scroll)
const ORBIT_SWEEP_DEG = 180;  // right→left sweep across the Why NEXUS region
const SMALL_SCALE = 0.14;     // size of the travelling circle before it grows

/* ──────────────────────────────────────────────────────────────
   RingSystem — the oversized circle graphic.
   Two stacked square SVGs so each layer rotates independently.
   ────────────────────────────────────────────────────────────── */
const VB = 600;          // viewBox size
const C = VB / 2;        // center
const circ = (r: number) => 2 * Math.PI * r;

function Ring({
  r,
  opacity,
  dash,
  width = 1,
  color = 'white',
  rotate = 0,
}: {
  r: number;
  opacity: number;
  dash?: string;
  width?: number;
  color?: string;
  rotate?: number;
}) {
  return (
    <circle
      cx={C}
      cy={C}
      r={r}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeOpacity={opacity}
      strokeDasharray={dash}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      transform={rotate ? `rotate(${rotate} ${C} ${C})` : undefined}
    />
  );
}

function RingSystem({
  rotation,
  counter,
}: {
  rotation: MotionValue<number>;
  counter: MotionValue<number>;
}) {
  const accentR = 286;
  return (
    <div className="relative h-full w-full">
      {/* Main layer — rotates with the sweep (same direction as labels) */}
      <motion.svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="absolute inset-0 h-full w-full transform-gpu will-change-transform"
        style={{ rotate: rotation }}
        aria-hidden="true"
      >
        <Ring r={290} opacity={0.1} width={1} dash="46 22" />
        <Ring
          r={accentR}
          opacity={0.55}
          width={1.5}
          color="#A855F7"
          dash={`${circ(accentR) * 0.2} ${circ(accentR)}`}
          rotate={-30}
        />
        <Ring r={208} opacity={0.14} width={1} dash="2 12" />
        <Ring r={120} opacity={0.1} width={1} />
      </motion.svg>

      {/* Counter layer — slower opposite spin for depth */}
      <motion.svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="absolute inset-0 h-full w-full transform-gpu will-change-transform"
        style={{ rotate: counter }}
        aria-hidden="true"
      >
        <Ring r={252} opacity={0.16} width={1} dash={`${circ(252) * 0.88} ${circ(252)}`} />
        <Ring r={170} opacity={0.12} width={1} />
        <Ring r={300} opacity={0.06} width={1} />
        <Ring
          r={170}
          opacity={0.5}
          width={1.5}
          color="#7C3AED"
          dash={`${circ(170) * 0.06} ${circ(170)}`}
          rotate={140}
        />
      </motion.svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   OrbitItem — one label travelling around the ring.
   Position is pure translation so text stays upright + readable.
   ────────────────────────────────────────────────────────────── */
function OrbitItem({
  phrase,
  index,
  radius,
  spin,
  orbitPhase,
}: {
  phrase: (typeof PHRASES)[number];
  index: number;
  radius: number;
  spin: MotionValue<number>;       // total rotation (drift + scroll sweep)
  orbitPhase: MotionValue<number>; // 0→1 across the Why NEXUS region
}) {
  const Icon = phrase.icon;
  const time = useTime();

  const angle = useTransform(spin, (s) => phrase.angle + s);
  const x = useTransform(angle, (a) => Math.cos(degToRad(a - 90)) * radius);
  const yOrbit = useTransform(angle, (a) => Math.sin(degToRad(a - 90)) * radius);

  // Subtle independent bob so the system never feels mechanical.
  const float = useTransform(time, (t) => Math.sin(t / 1600 + phrase.angle) * 6);
  const y = useTransform([yOrbit, float] as MotionValue[], ([o, f]: number[]) => o + f);

  // Individual staggered fade-in, collective fade-out — keyed to the
  // Why NEXUS phase so labels only exist while the circle is big.
  const inStart = index * 0.04;
  const opacity = useTransform(
    orbitPhase,
    [inStart, inStart + 0.16, 0.82, 0.96],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 transform-gpu will-change-transform"
      style={{ x, y, opacity }}
    >
      <div className="group w-48 -translate-x-1/2 -translate-y-1/2 lg:w-56">
        <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/25 bg-violet-500/10 shadow-[0_0_24px_-6px_rgba(124,58,237,0.6)]">
          <Icon className="h-4 w-4 text-violet-300" />
        </div>
        <h4 className="text-2xl font-semibold leading-tight tracking-tight text-white lg:text-[28px]">
          {phrase.headline}
        </h4>
        <p className="mt-1 text-sm text-white/45 lg:text-[15px]">{phrase.sub}</p>
        <button className="mt-2 inline-flex items-center gap-1 text-[13px] text-violet-300/70 transition-colors hover:text-violet-200">
          {phrase.cta}
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

/* small helpers */
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t); // smoothstep easing

/* ──────────────────────────────────────────────────────────────
   OrbitJourney — the fixed, travelling circle.
   Rendered once at the page root; reads global scrollY and the
   measured positions of Showcase / For Agencies / the Why NEXUS
   stage to drive scale, opacity, drift, and the L→R sweep.
   ────────────────────────────────────────────────────────────── */
export function OrbitJourney() {
  const reducedMotion = useReducedMotion();

  // Base render size of the circle (full-size). Label radius tracks it.
  const [size, setSize] = useState(640);
  const radius = size * 0.46;

  // Measurements kept in refs so the scroll callback never reads stale state.
  const m = useRef({
    showcaseTop: 0,
    agenciesTop: 0,
    orbitTop: 0,
    orbitBottom: 0,
    vh: 900,
  });

  useEffect(() => {
    function measure() {
      const vh = window.innerHeight;
      setSize(Math.min(window.innerWidth * 0.78, 760));

      const top = (sel: string) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      };
      const showcaseTop = top('[data-section="showcase"]');
      const agenciesTop = top('[data-section="agencies"]');
      const stage = document.querySelector('[data-orbit-stage]') as HTMLElement | null;
      const orbitTop = stage ? stage.getBoundingClientRect().top + window.scrollY : 0;
      const orbitBottom = stage ? orbitTop + stage.offsetHeight : 0;

      m.current = { showcaseTop, agenciesTop, orbitTop, orbitBottom, vh };
    }
    measure();
    window.addEventListener('resize', measure);
    // Re-measure after layout settles (fonts / images / GSAP pin spacers).
    const t = setTimeout(measure, 500);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, []);

  /* ── Scroll-driven motion values (imperatively set, then spring-smoothed) ── */
  const { scrollY } = useScroll();

  const scale = useMotionValue(SMALL_SCALE);
  const opacity = useMotionValue(0);
  const driftY = useMotionValue(0);
  const centerOp = useMotionValue(0);
  const sweep = useMotionValue(0);          // scroll contribution to rotation
  const orbitPhaseRaw = useMotionValue(0);  // 0→1 across the Why NEXUS region

  const scaleS = useSpring(scale, { stiffness: 220, damping: 38 });
  const driftS = useSpring(driftY, { stiffness: 220, damping: 38 });
  const sweepS = useSpring(sweep, { stiffness: 160, damping: 40 });
  const orbitPhase = useSpring(orbitPhaseRaw, { stiffness: 200, damping: 40 });

  useMotionValueEvent(scrollY, 'change', (sv) => {
    const { showcaseTop, agenciesTop, orbitTop, orbitBottom, vh } = m.current;
    if (!orbitBottom) return;

    /* Scroll keypoints (document space):
       appearStart  small circle fades in (around Case Study, before parallax)
       preHide      fades back out as the parallax takes over
       [preHide → reappear]  HIDDEN over the whole Showcase parallax
       reappear     fades in small as For Agencies arrives
       growStart→growEnd   transitions small → big across the Agencies→stage seam
       activeEnd    end of the held Why NEXUS moment
       exitEnd      fully gone into the CTA                                       */
    const appearStart = showcaseTop - vh * 1.1;
    const preHide     = showcaseTop - vh * 0.25;
    const reappear    = agenciesTop;
    const growStart   = orbitTop - vh * 0.4;
    const growEnd     = orbitTop + vh * 0.6;
    const activeEnd   = orbitBottom - vh;
    const exitEnd     = activeEnd + vh * 0.6;

    if (reducedMotion) {
      // Static: reveal at full size only inside the Why NEXUS region.
      const inRegion = sv >= growStart && sv <= exitEnd;
      scale.set(inRegion ? 1 : SMALL_SCALE);
      opacity.set(inRegion ? 1 : 0);
      driftY.set(0);
      centerOp.set(inRegion ? 1 : 0);
      sweep.set(0);
      orbitPhaseRaw.set(inRegion ? 0.4 : 0);
      return;
    }

    /* Hidden: before the journey, over the parallax, and after the exit. */
    if (sv < appearStart || (sv >= preHide && sv < reappear) || sv > exitEnd) {
      opacity.set(0);
      // keep small unless we're already past the big moment
      if (sv < reappear) {
        scale.set(SMALL_SCALE);
        orbitPhaseRaw.set(0);
      } else if (sv > exitEnd) {
        orbitPhaseRaw.set(1);
      }
      return;
    }

    /* Phase A — small travelling circle BEFORE the parallax (Case Study).
       Fades in, drifts down, fades out before the parallax dominates. */
    if (sv < preHide) {
      const p = clamp((sv - appearStart) / (preHide - appearStart));
      const fade = Math.min(clamp(p / 0.3), clamp((1 - p) / 0.3));
      scale.set(SMALL_SCALE);
      opacity.set(fade * 0.7);
      driftY.set(lerp(-vh * 0.12, vh * 0.12, p));
      centerOp.set(0);
      sweep.set(0);
      orbitPhaseRaw.set(0);

    /* Phase B — small travelling circle THROUGH For Agencies. */
    } else if (sv < growStart) {
      const p = clamp((sv - reappear) / (growStart - reappear));
      scale.set(SMALL_SCALE);
      opacity.set(clamp(p / 0.25) * 0.75);
      driftY.set(lerp(-vh * 0.1, 0, p));
      centerOp.set(0);
      sweep.set(0);
      orbitPhaseRaw.set(0);

    /* Phase C — transition small → BIG as you scroll past For Agencies. */
    } else if (sv < growEnd) {
      const p = smooth(clamp((sv - growStart) / (growEnd - growStart)));
      scale.set(lerp(SMALL_SCALE, 1, p));
      opacity.set(lerp(0.75, 0.95, p));
      driftY.set(0);
      centerOp.set(clamp((p - 0.5) / 0.5)); // "Why NEXUS." fades in late
      sweep.set(0);
      orbitPhaseRaw.set(0);

    /* Phase D — active: labels sweep right→left, ring rotates with them. */
    } else if (sv < activeEnd) {
      const p = clamp((sv - growEnd) / (activeEnd - growEnd));
      scale.set(1);
      opacity.set(0.95);
      driftY.set(0);
      centerOp.set(1);
      sweep.set(-p * ORBIT_SWEEP_DEG); // negative = counter-clockwise = R→L
      orbitPhaseRaw.set(p);

    /* Phase E — exit: shrink + fade into the next section. */
    } else {
      const p = clamp((sv - activeEnd) / (exitEnd - activeEnd));
      scale.set(lerp(1, 0.86, p));
      opacity.set(lerp(0.95, 0, p));
      driftY.set(lerp(0, -vh * 0.08, p));
      centerOp.set(lerp(1, 0, clamp(p * 1.4)));
      sweep.set(-ORBIT_SWEEP_DEG);
      orbitPhaseRaw.set(1);
    }
  });

  /* ── Continuous "alive" drift + scroll sweep → shared spin ── */
  const time = useTime();
  const drift = useTransform(time, (t) =>
    reducedMotion ? 0 : -(t / DRIFT_REV_MS) * 360 // negative = same R→L direction
  );
  const spin = useTransform([drift, sweepS] as MotionValue[], ([d, s]: number[]) => d + s);
  const counter = useTransform(spin, (s) => -s * 0.5);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[5] hidden items-center justify-center md:flex"
      style={{ opacity }}
      aria-hidden="true"
    >
      <motion.div style={{ y: driftS }} className="relative flex items-center justify-center">
        {/* Scaling stage — rings + labels scale together as one object */}
        <motion.div
          className="relative transform-gpu will-change-transform"
          style={{ width: size, height: size, scale: scaleS }}
        >
          {/* soft violet halo behind the rings */}
          <div
            className="pointer-events-none absolute inset-[12%] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 65%)' }}
          />

          <RingSystem rotation={spin} counter={counter} />

          {/* Center label */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
            style={{ opacity: centerOp }}
          >
            <p className="mono-caption mb-3 text-white/30">What you get</p>
            <h2
              className="font-semibold tracking-tight text-white"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                letterSpacing: '-0.03em',
                textShadow: '0 0 40px rgba(124,58,237,0.45)',
              }}
            >
              Why NEXUS.
            </h2>
          </motion.div>

          {/* Orbiting labels */}
          {PHRASES.map((phrase, i) => (
            <OrbitItem
              key={phrase.headline}
              phrase={phrase}
              index={i}
              radius={radius}
              spin={spin}
              orbitPhase={orbitPhase}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Orbit — the in-flow "stage".
   Desktop: a tall, transparent spacer that gives the journey its
   scroll distance and a measurable Why NEXUS moment.
   Mobile: a clean stacked list (the travelling scene is skipped).
   ────────────────────────────────────────────────────────────── */
export function Orbit() {
  return (
    <section className="relative" style={{ background: 'var(--bg)' }}>
      {/* Desktop / tablet stage — visuals come from <OrbitJourney/> */}
      <div data-orbit-stage className="relative hidden md:block" style={{ height: '300vh' }}>
        {/* Ambient glow anchored to the centered Why NEXUS moment */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>

      {/* Mobile — simplified, readable stacked list */}
      <div className="px-6 py-24 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mono-caption mb-3 text-white/35">What you get</p>
          <h2 className="display-l text-white">Why teams choose NEXUS.</h2>
        </motion.div>

        <div className="mx-auto flex max-w-sm flex-col gap-7">
          {PHRASES.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.headline}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-violet-500/25 bg-violet-500/10">
                  <Icon className="h-4 w-4 text-violet-300" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{p.headline}</h4>
                  <p className="text-sm text-white/50">{p.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
