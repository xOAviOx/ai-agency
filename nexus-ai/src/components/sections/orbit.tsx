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
  AnimatePresence,
} from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Clock, Users, Star, Shield, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { degToRad, cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────
   "Why NEXUS" — a single giant rotary dial.

   The circle acts as a massive dial positioned at the top-center
   of the section. Driven by global scrollY, it:
   
     1. Pushes the dial center upwards (off-screen/high up) so only
        the bottom arc sweeps through the viewport.
     2. As you scroll, the nodes rotate through the bottom focus point
        (6 o'clock / 180 degrees axis).
     3. When a node rotates onto this axis, that point heavily ZOOMS
        and glows.
     4. The rich content sections (avatars, uptime charts, etc.)
        scroll vertically in flow in front of the pinned circle,
        matching the exact design layout of the SALO reference website!
   ────────────────────────────────────────────────────────────── */

/* ── Orbit content ──────────────────────────────────────────── */
const PHRASES: {
  angle: number;
  headline: string;
  sub: string;
  icon: LucideIcon;
}[] = [
  { angle: 0,   headline: 'Direct access', sub: 'Meet the makers', icon: Users  },
  { angle: 60,  headline: 'Embedded trust', sub: 'Slack + GitHub',  icon: Shield },
  { angle: 120, headline: 'Less downtime',  sub: '99.98% uptime',   icon: Zap    },
  { angle: 180, headline: '24-hour replies', sub: 'Always active',   icon: Clock  },
  { angle: 240, headline: 'Senior talent',   sub: 'Expert builders', icon: Star   },
  { angle: 300, headline: 'Ship in weeks',   sub: 'Startup speed',   icon: Rocket },
];

/* Tunables */
const DRIFT_REV_MS = 140_000; // ms for one slow "alive" revolution (no scroll)
const SMALL_SCALE = 0.14;     // size of the travelling circle before it grows

// Snappy physical stepped dial transition function
const snapValue = (x: number) => {
  const integer = Math.floor(x);
  const fractional = x - integer;
  const snapT = Math.min(1, Math.max(0, (fractional - 0.275) / 0.45));
  const easedT = snapT * snapT * (3 - 2 * snapT); // smoothstep
  return integer + easedT;
};

/* ──────────────────────────────────────────────────────────────
   RingSystem — the oversized circle graphic.
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
      <motion.svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="absolute inset-0 h-full w-full transform-gpu will-change-transform"
        style={{ rotate: rotation }}
        aria-hidden="true"
      >
        <Ring r={290} opacity={0.06} width={1} dash="46 22" />
        <Ring
          r={accentR}
          opacity={0.35}
          width={1.5}
          color="#A855F7"
          dash={`${circ(accentR) * 0.2} ${circ(accentR)}`}
          rotate={-30}
        />
        <Ring r={208} opacity={0.08} width={1} dash="2 12" />
        <Ring r={120} opacity={0.06} width={1} />
      </motion.svg>

      <motion.svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="absolute inset-0 h-full w-full transform-gpu will-change-transform"
        style={{ rotate: counter }}
        aria-hidden="true"
      >
        <Ring r={252} opacity={0.1} width={1} dash={`${circ(252) * 0.88} ${circ(252)}`} />
        <Ring r={170} opacity={0.06} width={1} />
        <Ring r={300} opacity={0.03} width={1} />
        <Ring
          r={170}
          opacity={0.25}
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
   OrbitItem — one sleek glowing badge pill orbiting the ring.
   Pills are focused and heavily ZOOMED when reaching 6 o'clock (180deg).
   ────────────────────────────────────────────────────────────── */
function OrbitItem({
  phrase,
  radius,
  spin,
  orbitPhase,
  isActive,
  nodeExitX,
  isMobile,
}: {
  phrase: (typeof PHRASES)[number];
  radius: number;
  spin: MotionValue<number>;
  orbitPhase: MotionValue<number>;
  isActive: boolean;
  nodeExitX: MotionValue<number>; // shared slide-off-right on handoff
  isMobile: boolean;
}) {
  const Icon = phrase.icon;
  const time = useTime();

  const angle = useTransform(spin, (s) => phrase.angle + s);
  const baseX = useTransform(angle, (a) => Math.cos(degToRad(a - 90)) * radius);
  const x = useTransform([baseX, nodeExitX] as MotionValue[], ([bx, nx]: number[]) => bx + nx);
  const yOrbit = useTransform(angle, (a) => Math.sin(degToRad(a - 90)) * radius);

  // Subtle float (desktop only — keeps the dial perfectly still when idle on phones)
  const float = useTransform(time, (t) => (isMobile ? 0 : Math.sin(t / 1600 + phrase.angle) * 4));
  const y = useTransform([yOrbit, float] as MotionValue[], ([o, f]: number[]) => o + f);

  // Collective fade in/out of nodes keyed to orbitPhase
  const opacity = useTransform(
    orbitPhase,
    [0, 0.15, 0.85, 0.98],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 transform-gpu will-change-transform z-20"
      style={{ x, y, opacity }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 px-3.5 py-2 rounded-full border bg-black/85 md:backdrop-blur-md cursor-pointer transition-all duration-350 select-none shadow-[0_6px_20px_rgba(0,0,0,0.6)]"
        animate={{
          borderColor: isActive ? 'rgba(168, 85, 247, 0.55)' : 'rgba(255, 255, 255, 0.08)',
          boxShadow: isActive 
            ? '0 0 30px rgba(168, 85, 247, 0.35), inset 0 0 15px rgba(168, 85, 247, 0.15)' 
            : '0 0 0px rgba(0,0,0,0)',
          scale: isActive ? 1.35 : 0.86, // Heavily zoom active point on axis!
        }}
      >
        <div className={cn(
          "flex h-6.5 w-6.5 items-center justify-center rounded-full transition-colors duration-300",
          isActive ? "bg-violet-500 text-white" : "bg-white/5 text-white/40"
        )}>
          <Icon className="h-3.5 w-3.5" />
        </div>
        <span className={cn(
          "text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 font-mono",
          isActive ? "text-white" : "text-white/40"
        )}>
          {phrase.headline}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* small helpers */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t); // smoothstep easing
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

/* ──────────────────────────────────────────────────────────────
   OrbitJourney — the fixed, travelling circle.
   ────────────────────────────────────────────────────────────── */
export function OrbitJourney() {
  const reducedMotion = useReducedMotion();

  const [size, setSize] = useState(720);
  const radius = size * 0.46;

  const [isMobile, setIsMobile] = useState(false);
  // Height of the "Why NEXUS." title block under the dial (smaller on phones).
  const titleBlockH = isMobile ? 200 : 280;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const m = useRef({
    showcaseTop: 0,
    agenciesTop: 0,
    orbitTop: 0,
    orbitBottom: 0,
    ctaTop: 0,
    ctaBottom: 0,
    vh: 900,
    isMobile: false,
    dialMt: -240,      // how far the dial is pushed up so its bottom arc sweeps the viewport
    ctaRecenter: 152,  // px to drop the dial so its CIRCLE (not the column) centers in the CTA
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  /* ── Scroll-driven motion values ── */
  const { scrollY } = useScroll();

  const scale = useMotionValue(SMALL_SCALE);
  const opacity = useMotionValue(0);
  const driftY = useMotionValue(0);
  const centerOp = useMotionValue(0);
  const sweep = useMotionValue(180);         // Start sweep aligned to Slide 0 (180deg)
  const orbitPhaseRaw = useMotionValue(0);  // 0→1 across the Why NEXUS region
  const mt = useMotionValue(-240);          // dial vertical offset; → 0 to recenter as CTA backdrop

  const scaleS = useSpring(scale, { stiffness: 220, damping: 38 });
  const driftS = useSpring(driftY, { stiffness: 220, damping: 38 });
  const sweepS = useSpring(sweep, { stiffness: 180, damping: 28 }); // Snappy magnetic spring!
  const orbitPhase = useSpring(orbitPhaseRaw, { stiffness: 200, damping: 40 });
  const mtS = useSpring(mt, { stiffness: 150, damping: 34 });

  // Scroll updater: Maps the 300vh normal-flow scroll range cleanly to the dial states
  const updateScroll = (sv: number) => {
    const { showcaseTop, agenciesTop, orbitTop, orbitBottom, ctaBottom, vh, isMobile, dialMt } = m.current;
    if (!orbitBottom) return;

    // Fast, responsive 300vh scroll keypoints inside a normal-flow container
    const appearStart = showcaseTop - vh * 1.1;
    const preHide     = showcaseTop - vh * 0.25;
    const reappear    = agenciesTop;
    const growStart   = orbitTop - vh * 0.4;
    const growEnd     = orbitTop + vh * 0.1;
    const activeEnd   = orbitTop + vh * 1.95;
    const handoffEnd  = orbitTop + vh * 2.75;                   // pills exit + circle recenters
    const ctaHoldEnd  = ctaBottom ? ctaBottom - vh : handoffEnd + vh; // circle = CTA backdrop
    const finalEnd    = ctaBottom ? ctaBottom : ctaHoldEnd + vh * 0.6;
    const CTA_RECENTER = m.current.ctaRecenter; // px to drop the dial so its CIRCLE (not the column) centers

    if (reducedMotion) {
      const inRegion = sv >= growStart && sv <= finalEnd;
      const inCta = sv >= handoffEnd;
      scale.set(inRegion ? (inCta ? 0.92 : 1) : SMALL_SCALE);
      opacity.set(inRegion ? (inCta ? 0.6 : 1) : 0);
      driftY.set(inCta ? CTA_RECENTER : 0);
      centerOp.set(inRegion && !inCta ? 1 : 0);
      mt.set(inCta ? 0 : dialMt);
      sweep.set(inCta ? 60 : 180);
      orbitPhaseRaw.set(inRegion ? (inCta ? 1 : 0.4) : 0);
      return;
    }

    /* Hidden: before the journey, over the parallax, and after the CTA. */
    if (sv < appearStart || (sv >= preHide && sv < reappear) || sv > finalEnd) {
      opacity.set(0);
      if (sv < reappear) {
        scale.set(SMALL_SCALE);
        orbitPhaseRaw.set(0);
        sweep.set(180);
        mt.set(dialMt);
      } else if (sv > finalEnd) {
        orbitPhaseRaw.set(1);
        sweep.set(60); // Matches Slide 2 (120deg active node) sweep
      }
      return;
    }

    /* Phase A — small travelling circle BEFORE the parallax (Case Study). */
    if (sv < preHide) {
      const p = Math.min(1, Math.max(0, (sv - appearStart) / (preHide - appearStart)));
      const fade = Math.min(Math.min(1, Math.max(0, p / 0.3)), Math.min(1, Math.max(0, (1 - p) / 0.3)));
      scale.set(SMALL_SCALE);
      // On phones we skip the small travelling-circle pre-journey — the dial
      // simply grows in over "Why NEXUS" (lighter, less motion on small screens).
      opacity.set(isMobile ? 0 : fade * 0.7);
      driftY.set(lerp(-vh * 0.12, vh * 0.12, p));
      centerOp.set(0);
      sweep.set(180);
      orbitPhaseRaw.set(0);
      mt.set(dialMt);

    /* Phase B — small travelling circle THROUGH For Agencies. */
    } else if (sv < growStart) {
      const p = Math.min(1, Math.max(0, (sv - reappear) / (growStart - reappear)));
      scale.set(SMALL_SCALE);
      opacity.set(isMobile ? 0 : Math.min(1, Math.max(0, p / 0.25)) * 0.75);
      driftY.set(lerp(-vh * 0.1, 0, p));
      centerOp.set(0);
      sweep.set(180);
      orbitPhaseRaw.set(0);
      mt.set(dialMt);

    /* Phase C — transition small → BIG as you scroll past For Agencies. */
    } else if (sv < growEnd) {
      const p = smooth(Math.min(1, Math.max(0, (sv - growStart) / (growEnd - growStart))));
      scale.set(lerp(SMALL_SCALE, 1, p));
      // Mobile fades the dial in from 0 (no pre-journey to carry opacity over).
      opacity.set(lerp(isMobile ? 0 : 0.75, 0.95, p));
      driftY.set(0);
      centerOp.set(Math.min(1, Math.max(0, (p - 0.5) / 0.5)));
      sweep.set(180);
      orbitPhaseRaw.set(0);
      mt.set(dialMt);

    /* Phase D — active: snappy physical stepped dial brings nodes one-by-one to 6 o'clock focus! */
    } else if (sv < activeEnd) {
      const p = Math.min(1, Math.max(0, (sv - growEnd) / (activeEnd - growEnd)));
      scale.set(1);
      opacity.set(0.95);
      driftY.set(0);
      centerOp.set(1);
      mt.set(dialMt);

      // Calculate stepped snaps out of the 3 scrolling blocks (Index 0 to 2)
      const rawIndex = p * 2;
      const snappedIndex = snapValue(rawIndex);
      sweep.set(180 - snappedIndex * 60);

      orbitPhaseRaw.set(p);

    /* Phase E — handoff: pills slide off-right + fade (driven by orbitPhase),
       the SAME circle recenters (mt → 0) and eases to its CTA-backdrop state. */
    } else if (sv < handoffEnd) {
      const p = smooth(clamp((sv - activeEnd) / (handoffEnd - activeEnd)));
      scale.set(lerp(1, 0.92, p));
      opacity.set(lerp(0.95, 0.6, p));
      driftY.set(lerp(0, CTA_RECENTER, p));
      centerOp.set(0);
      mt.set(lerp(dialMt, 0, p));
      sweep.set(60);
      orbitPhaseRaw.set(1);

    /* Phase F — CTA hold: centered dimmed circle behind the CTA copy. */
    } else if (sv < ctaHoldEnd) {
      scale.set(0.92);
      opacity.set(0.6);
      driftY.set(CTA_RECENTER);
      centerOp.set(0);
      mt.set(0);
      sweep.set(60);
      orbitPhaseRaw.set(1);

    /* Phase G — final exit: shrink + fade out into the trust marquee. */
    } else {
      const p = smooth(clamp((sv - ctaHoldEnd) / (finalEnd - ctaHoldEnd)));
      scale.set(lerp(0.92, 0.8, p));
      opacity.set(lerp(0.6, 0, p));
      driftY.set(CTA_RECENTER - vh * 0.06 * p);
      centerOp.set(0);
      mt.set(0);
      sweep.set(60);
      orbitPhaseRaw.set(1);
    }
  };

  useMotionValueEvent(scrollY, 'change', (sv) => {
    updateScroll(sv);
  });

  useEffect(() => {
    function measure() {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const mobile = vw < 768;
      const sz = Math.min(vw * 0.85, 780);
      setSize(sz);
      setIsMobile(mobile);

      // Responsive dial geometry. The dial is pushed up by `dialMt` so its
      // bottom arc sweeps the upper-middle of the viewport. On phones the
      // circle is smaller, so the offset shrinks proportionally.
      const rad = sz * 0.46;
      // Push the dial up by roughly its radius + a slice of the viewport so the
      // upper pills clear off-screen and only the lower arc (with the focused
      // 6-o'clock pill) sweeps through — mirroring the desktop framing.
      const dialMt = mobile ? -Math.round(rad + vh * 0.13) : -240;
      const titleH = mobile ? 200 : 280;
      // Drop the dial by half the (title block + its 24px top margin) so the
      // CIRCLE — not the whole flex column — ends up centered in the CTA.
      const ctaRecenter = Math.round((titleH + 24) / 2);

      const top = (sel: string) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      };
      const showcaseTop = top('[data-section="showcase"]');
      const agenciesTop = top('[data-section="agencies"]');
      const stage = document.querySelector('[data-orbit-stage]') as HTMLElement | null;
      const orbitTop = stage ? stage.getBoundingClientRect().top + window.scrollY : 0;
      const orbitBottom = stage ? orbitTop + stage.offsetHeight : 0;

      // CTA stage — the dial circle carries on into here as the CTA backdrop.
      const ctaStage = document.querySelector('[data-cta-stage]') as HTMLElement | null;
      const ctaTop = ctaStage ? ctaStage.getBoundingClientRect().top + window.scrollY : 0;
      const ctaBottom = ctaStage ? ctaTop + ctaStage.offsetHeight : 0;

      m.current = {
        showcaseTop, agenciesTop, orbitTop, orbitBottom, ctaTop, ctaBottom, vh,
        isMobile: mobile, dialMt, ctaRecenter,
      };
      updateScroll(window.scrollY);
    }
    measure();
    window.addEventListener('resize', measure);

    // Listen to ScrollTrigger refresh so that measurements update when GSAP pins/spacers settle
    let cleanupST: (() => void) | null = null;
    import('gsap/ScrollTrigger')
      .then(({ ScrollTrigger }) => {
        ScrollTrigger.addEventListener('refresh', measure);
        cleanupST = () => ScrollTrigger.removeEventListener('refresh', measure);
        measure();
      })
      .catch((err) => console.error('ScrollTrigger listen error:', err));

    const t = setTimeout(measure, 500);
    let fontsReady = false;
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        fontsReady = true;
        measure();
        setTimeout(measure, 200);
      });
    }
    return () => {
      window.removeEventListener('resize', measure);
      if (cleanupST) cleanupST();
      clearTimeout(t);
    };
  }, []);

  /* ── Continuous "alive" drift + scroll sweep → shared spin ── */
  const time = useTime();
  // Idle drift is desktop-only: on phones it both wastes per-frame work and
  // de-syncs which pill is "active" from the slide in view. Scroll sweep alone
  // then drives the dial deterministically (slide 1 ↔ first pill, etc.).
  const drift = useTransform(time, (t) =>
    reducedMotion || isMobile ? 0 : -(t / DRIFT_REV_MS) * 360
  );
  const spin = useTransform([drift, sweepS] as MotionValue[], ([d, s]: number[]) => d + s);
  const counter = useTransform(spin, (s) => -s * 0.5);

  // Pills slide off to the RIGHT + fade as the dial finishes (handoff into the CTA).
  const nodeExitX = useTransform(orbitPhase, [0.82, 1], [0, 900]);

  // Solver: Active node is the one closest to 180 degrees (bottom-most / 6 o'clock position)
  useMotionValueEvent(spin, 'change', (s) => {
    let bestIndex = 0;
    let minDiff = Infinity;
    PHRASES.forEach((p, idx) => {
      const itemAngle = (p.angle + s) % 360;
      let diff = Math.abs(itemAngle - 180);
      if (diff > 180) diff = 360 - diff;
      if (diff < minDiff) {
        minDiff = diff;
        bestIndex = idx;
      }
    });
    setActiveSlide(bestIndex);
  });

  useMotionValueEvent(orbitPhase, 'change', (v) => {
    setShowDetail(v > 0.04);
  });

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[5] flex items-center justify-center"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Centered dial container - Circle shifts up so bottom arc sweeps through upper-middle */}
      <motion.div style={{ y: driftS }} className="relative flex flex-col items-center justify-center">
        {/* Giant Dial Circle */}
        <motion.div
          className="relative transform-gpu will-change-transform"
          style={{ width: size, height: size, scale: scaleS, marginTop: mtS }}
        >
          {/* soft violet halo behind the rings */}
          <div
            className="pointer-events-none absolute inset-[12%] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.11), transparent 65%)' }}
          />

          <RingSystem rotation={spin} counter={counter} />

          {/* Orbiting nodes - lock & zoom at the bottom center (6 o'clock position) */}
          {PHRASES.map((phrase, i) => (
            <OrbitItem
              key={phrase.headline}
              phrase={phrase}
              radius={radius}
              spin={spin}
              orbitPhase={orbitPhase}
              isActive={showDetail && activeSlide === i}
              nodeExitX={nodeExitX}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        {/* Dynamic Title placeholder when not showing dynamic cards */}
        <div
          className="w-full max-w-4xl flex flex-col items-center justify-start mt-6 px-6 text-center pointer-events-none"
          style={{ height: titleBlockH }}
        >
          {/* The big centered "Why NEXUS." title is desktop-only — on phones it
              would overlap the slide copy that rises from the bottom. */}
          <AnimatePresence>
            {!isMobile && !showDetail && (
              <motion.div
                key="main-title"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center mt-6"
                style={{ opacity: centerOp }}
              >
                <p className="mono-caption mb-3 text-white/30 font-mono">What you get</p>
                <h2
                  className="font-bold tracking-tight text-white uppercase"
                  style={{
                    fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
                    letterSpacing: '-0.04em',
                    fontFamily: 'var(--font-display)',
                    textShadow: '0 0 40px rgba(124,58,237,0.3)',
                  }}
                >
                  Why NEXUS.
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Orbit — the in-flow "stage".
   ────────────────────────────────────────────────────────────── */
export function Orbit() {
  return (
    <section id="why" className="relative" style={{ background: 'var(--bg)' }}>
      {/* Scroll stage — 300vh for 3 scrolling blocks. Now active on mobile too:
          the travelling dial (OrbitJourney) is driven by this stage's scroll. */}
      <div data-orbit-stage className="relative" style={{ height: '300vh' }}>
        {/* Sticky container that holds the ambient background glow */}
        <div className="sticky top-0 h-screen overflow-hidden pointer-events-none">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Stacked 100vh text content cards scrolling vertically in flow, layered on top of the circle */}
        <div className="absolute inset-0 z-20 flex flex-col pointer-events-none">
          {/* Slide 1 */}
          <div className="h-screen w-full flex flex-col items-center justify-end pb-24 text-center">
            <div className="flex flex-col items-center max-w-2xl px-6 pointer-events-auto">
              <div className="mb-4 h-12 flex items-center justify-center overflow-visible">
                <div className="flex -space-x-2 overflow-hidden bg-black/50 border border-white/10 rounded-full px-4 py-1.5 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                  <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-black" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Team member" />
                  <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-black" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Team member" />
                  <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-black" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Team member" />
                  <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-black" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Team member" />
                  <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-black" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="Team member" />
                  <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-violet-900/50 ring-2 ring-black text-[9px] font-bold text-violet-300 font-mono">+</div>
                </div>
              </div>
              <h3 className="text-white font-bold leading-tight tracking-tight text-2xl lg:text-3xl max-w-xl uppercase tracking-wide font-display">
                Direct access to expert talent
              </h3>
              <p className="mt-3 text-sm lg:text-[15px] text-white/50 leading-relaxed font-body">
                You speak directly to the builders solving your problem. No administrative overhead, no telephone games with account managers—just direct engineering alignment and rapid startup-speed execution.
              </p>
              <Link
                href="/about#team"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-violet-300 border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 hover:text-violet-200 transition-colors cursor-pointer group font-body"
              >
                Meet the makers
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="h-screen w-full flex flex-col items-center justify-end pb-24 text-center">
            <div className="flex flex-col items-center max-w-2xl px-6 pointer-events-auto">
              <div className="mb-4 h-12 flex items-center justify-center overflow-visible">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Avg delivery: 18 days
                </div>
              </div>
              <h3 className="text-white font-bold leading-tight tracking-tight text-2xl lg:text-3xl max-w-xl uppercase tracking-wide font-display">
                The NEXUS Standard
              </h3>
              <p className="mt-3 text-sm lg:text-[15px] text-white/50 leading-relaxed font-body">
                We don&apos;t just copy-paste prompts. We build custom multi-agent routing engines with self-healing database syncs and dynamic API validation protocols, ensuring our solutions perform flawlessly at scale.
              </p>
              <Link
                href="/process#standards"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-violet-300 border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 hover:text-violet-200 transition-colors cursor-pointer group font-body"
              >
                Our architecture SLA
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="h-screen w-full flex flex-col items-center justify-end pb-24 text-center">
            <div className="flex flex-col items-center max-w-2xl px-6 pointer-events-auto">
              <div className="mb-4 h-12 flex items-center justify-center overflow-visible">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-[10px] font-bold text-violet-400 uppercase tracking-widest font-mono shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-ping" />
                  99.98% Monitored Uptime
                </div>
              </div>
              <h3 className="text-white font-bold leading-tight tracking-tight text-2xl lg:text-3xl max-w-xl uppercase tracking-wide font-display">
                Less Downtime. More Action.
              </h3>
              <p className="mt-3 text-sm lg:text-[15px] text-white/50 leading-relaxed font-body">
                Stop wasting time managing disjointed freelancers. We are a unified, on-tap AI engineering team that works as a single synchronized unit, delivering bulletproof, zero-gap execution.
              </p>
              <Link
                href="/process"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-violet-300 border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 hover:text-violet-200 transition-colors cursor-pointer group font-body"
              >
                Our process
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
