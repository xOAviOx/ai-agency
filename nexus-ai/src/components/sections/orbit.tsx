'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useTime,
  useReducedMotion,
  MotionValue,
} from 'framer-motion';
import { ArrowRight, Zap, Clock, Users, Star, Shield, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { degToRad } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────
   "Why NEXUS" — cinematic orbiting scene.

   Architecture
   ────────────
   <Orbit>            tall section (300vh) that drives a scroll timeline
     <ScrollScene>    sticky, full-viewport stage that stays pinned while
                      the timeline plays out (enter → active → exit)
       <RingSystem>   oversized concentric rings, main + counter rotation
       <OrbitItem>    a single label travelling around the circle

   Motion sources
   ──────────────
   - useTime()        a rAF-driven clock → smooth, continuous rotation that
                      never depends on scroll position (so it keeps "alive")
   - scrollYProgress  layered on top for parallax + enter/exit transforms
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

/* Tunables — change these to retune the whole scene at a glance. */
const SPIN_DURATION_MS = 70_000; // ms for one full continuous revolution
const SCROLL_SPIN_DEG = 55;      // extra degrees driven by scroll (parallax)

/* ──────────────────────────────────────────────────────────────
   RingSystem — the oversized circle graphic.
   Two stacked square SVGs so each layer can rotate independently
   without fighting over a shared transform-origin.
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
      {/* Main layer — rotates forward */}
      <motion.svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="absolute inset-0 h-full w-full transform-gpu will-change-transform"
        style={{ rotate: rotation }}
        aria-hidden="true"
      >
        {/* outermost broken ring */}
        <Ring r={290} opacity={0.1} width={1} dash="46 22" />
        {/* violet accent arc (~20% of the circumference) */}
        <Ring
          r={accentR}
          opacity={0.55}
          width={1.5}
          color="#A855F7"
          dash={`${circ(accentR) * 0.2} ${circ(accentR)}`}
          rotate={-30}
        />
        {/* dotted mid ring */}
        <Ring r={208} opacity={0.14} width={1} dash="2 12" />
        {/* faint tight ring */}
        <Ring r={120} opacity={0.1} width={1} />
      </motion.svg>

      {/* Counter layer — rotates the other way for depth */}
      <motion.svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="absolute inset-0 h-full w-full transform-gpu will-change-transform"
        style={{ rotate: counter }}
        aria-hidden="true"
      >
        {/* notched ring (single gap on the right) */}
        <Ring r={252} opacity={0.16} width={1} dash={`${circ(252) * 0.88} ${circ(252)}`} />
        <Ring r={170} opacity={0.12} width={1} />
        <Ring r={300} opacity={0.06} width={1} />
        {/* short violet tick segment */}
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
   Position is pure translation (no rotation on the node) so the
   text always stays upright and readable, regardless of spin.
   ────────────────────────────────────────────────────────────── */
function OrbitItem({
  phrase,
  index,
  radius,
  spin,
  progress,
}: {
  phrase: (typeof PHRASES)[number];
  index: number;
  radius: number;
  spin: MotionValue<number>;       // total rotation in degrees (continuous + scroll)
  progress: MotionValue<number>;   // section scroll progress 0→1
}) {
  const Icon = phrase.icon;
  const time = useTime();

  // Live angle for this item = its base position + the shared spin.
  const angle = useTransform(spin, (s) => phrase.angle + s);

  // Polar → cartesian. (-90 so 0° sits at the top of the circle.)
  const x = useTransform(angle, (a) => Math.cos(degToRad(a - 90)) * radius);
  const yOrbit = useTransform(angle, (a) => Math.sin(degToRad(a - 90)) * radius);

  // Subtle independent bob so the system never feels mechanical.
  const float = useTransform(time, (t) => Math.sin(t / 1600 + phrase.angle) * 6);
  const y = useTransform([yOrbit, float] as MotionValue[], ([o, f]: number[]) => o + f);

  // Individual fade-in (staggered) + collective fade-out on exit.
  const inStart = 0.06 + index * 0.025;
  const opacity = useTransform(
    progress,
    [inStart, inStart + 0.14, 0.78, 0.92],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 transform-gpu will-change-transform"
      style={{ x, y, opacity }}
    >
      {/* Inner wrapper centers the card on the orbit point */}
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

/* ──────────────────────────────────────────────────────────────
   Orbit — section wrapper + scroll timeline.
   ────────────────────────────────────────────────────────────── */
export function Orbit() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [labelRadius, setLabelRadius] = useState(330);

  // Keep the orbit radius proportional to the circle's responsive size.
  useEffect(() => {
    const update = () => {
      const diameter = Math.min(window.innerWidth * 0.78, 760);
      setLabelRadius(diameter * 0.46);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Progress 0→1 across the full pinned region of the tall wrapper.
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  });

  /* ── Continuous, scroll-independent rotation (the "alive" feel) ── */
  const time = useTime();
  const baseSpin = useTransform(time, (t) =>
    reducedMotion ? 0 : (t / SPIN_DURATION_MS) * 360
  );
  // Scroll adds a little extra rotation for parallax on top of the base.
  const scrollSpin = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : SCROLL_SPIN_DEG]);
  const spin = useTransform([baseSpin, scrollSpin] as MotionValue[], ([b, s]: number[]) => b + s);

  // Ring layers: forward + counter (slower) for depth.
  const ringRotation = spin;
  const counterRotation = useTransform(spin, (s) => -s * 0.55);

  /* ── Enter / Active / Exit transforms ── */
  // Phase 1 (enter): fade + scale up.  Phase 3 (exit): fade + scale + lift.
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0]);
  const sceneY = useTransform(scrollYProgress, [0.85, 1], [0, -90]);
  const circleScale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.6, 1, 1, 0.88]);
  const centerOpacity = useTransform(scrollYProgress, [0.02, 0.14, 0.8, 0.95], [0, 1, 1, 0]);
  const centerScale = useTransform(scrollYProgress, [0, 0.18], [0.85, 1]);

  return (
    <section className="relative" style={{ background: 'var(--bg)' }}>
      {/* ── Desktop / tablet: pinned cinematic scene ── */}
      <div ref={sceneRef} className="relative hidden md:block" style={{ height: '300vh' }}>
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          {/* Ambient violet glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(124,58,237,0.10) 0%, transparent 70%)',
            }}
          />

          <motion.div
            className="relative flex h-full w-full items-center justify-center transform-gpu"
            style={{ opacity: sceneOpacity, y: sceneY }}
          >
            {/* Oversized ring system */}
            <motion.div
              className="absolute transform-gpu will-change-transform"
              style={{
                width: 'min(78vw, 760px)',
                height: 'min(78vw, 760px)',
                scale: circleScale,
              }}
            >
              {/* soft glow halo behind the rings */}
              <div
                className="pointer-events-none absolute inset-[12%] rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 65%)' }}
              />
              <RingSystem rotation={ringRotation} counter={counterRotation} />
            </motion.div>

            {/* Center label */}
            <motion.div
              className="pointer-events-none absolute z-10 text-center"
              style={{ opacity: centerOpacity, scale: centerScale }}
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
                radius={labelRadius}
                spin={spin}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Mobile: simplified, readable stacked list ── */}
      <div className="md:hidden px-6 py-24">
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
