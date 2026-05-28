'use client';

import { useRef, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HeroCircle } from '@/components/ui/hero-circle';

/* ── Animated headline word split ───────────────────────────── */
function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(' ');
  const reducedMotion = useReducedMotion();
  return (
    <span aria-label={text} className="inline-block">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={reducedMotion ? { opacity: 0 } : { y: '100%', opacity: 0, filter: 'blur(8px)' }}
            animate={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: reducedMotion ? 0.3 : 0.7,
              delay: reducedMotion ? 0.1 : 0.3 + wi * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Floating cursor decoration ─────────────────────────────── */
interface FloatingCursorProps {
  name: string;
  color: string;
  x: string;
  y: string;
  delay: number;
}

function FloatingCursor({ name, color, x, y, delay }: FloatingCursorProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-1.5 pointer-events-none select-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0 }}
      animate={
        reducedMotion
          ? { opacity: 0.7 }
          : { opacity: [0, 1, 1, 0.8], x: [0, 8, -4, 6, 0], y: [0, -6, 8, -3, 0] }
      }
      transition={
        reducedMotion
          ? { delay, duration: 0.4 }
          : {
              opacity: { delay, duration: 1 },
              x: { delay, duration: 8, repeat: Infinity, ease: 'easeInOut' },
              y: { delay, duration: 7, repeat: Infinity, ease: 'easeInOut' },
            }
      }
    >
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
        <path d="M0 0L0 14L4 10L7 17L9 16L6 9L11 9Z" fill={color} />
      </svg>
      <span
        className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
        style={{ background: color }}
      >
        {name}
      </span>
    </motion.div>
  );
}

/* ── Magnetic CTA button ─────────────────────────────────────── */
function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const springBx = useSpring(bx, { stiffness: 200, damping: 15, mass: 0.5 });
  const springBy = useSpring(by, { stiffness: 200, damping: 15, mass: 0.5 });
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (reducedMotion) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      bx.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
      by.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
    },
    [bx, by, reducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    bx.set(0);
    by.set(0);
  }, [bx, by]);

  return (
    <motion.button
      ref={ref}
      style={{ x: springBx, y: springBy }}
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.05 },
        tap:   { scale: 0.97 },
      }}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="btn-primary relative overflow-hidden flex items-center gap-2.5 px-7 py-3.5 text-base font-medium text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-md group"
    >
      {/* Shimmer sweep (CSS-driven via btn-primary class) */}
      <span className="btn-shimmer-line" aria-hidden="true" />

      <span className="relative z-10 flex items-center gap-2.5">
        Start a project
        {/* Arrow slides right on hover via variant propagation */}
        <motion.span
          variants={{ rest: { x: 0 }, hover: { x: 5 } }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </span>
    </motion.button>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */
export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  /* Scroll-linked scale + fade */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const circleScale   = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1, 0.22]);
  const circleScaleS  = useSpring(circleScale, { stiffness: 80, damping: 25 });
  const circleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* Cursor parallax */
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const circleX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.8 });
  const circleY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.8 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(((e.clientX - rect.left) / rect.width  - 0.5) * 60);
      mouseY.set(((e.clientY - rect.top)  / rect.height - 0.5) * 60);
    },
    [mouseX, mouseY, reducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const CIRCLE_BASE = 900;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--bg)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating cursor decorations */}
      <FloatingCursor name="Alex"  color="#7C3AED" x="8%"  y="30%" delay={1.2} />
      <FloatingCursor name="Sara"  color="#2563EB" x="85%" y="25%" delay={1.8} />
      <FloatingCursor name="Devon" color="#059669" x="78%" y="65%" delay={2.4} />
      <FloatingCursor name="Mia"   color="#D97706" x="12%" y="70%" delay={3}   />

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10 pt-24 pb-16">

        {/* Circle: scroll scale → cursor parallax → slow rotation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ scale: circleScaleS, opacity: circleOpacity }}
        >
          <motion.div style={{ x: circleX, y: circleY }}>
            <motion.div
              animate={reducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            >
              <HeroCircle size={CIRCLE_BASE} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="mono-caption text-violet-400">AI Automation Agency</span>
        </motion.div>

        {/* Headline */}
        <h1 className="display-xl max-w-4xl text-white mb-6">
          <AnimatedHeadline text="AI automation that feels in-house, not outsourced." />
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="body-l text-white/60 max-w-xl mb-10"
        >
          We build custom AI agents, automations, and websites that plug straight into your team.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <MagneticButton />
          <p className="mono-caption text-white/30">Replies in 24 hours. No obligation.</p>
        </motion.div>
      </div>
    </section>
  );
}
