'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ConcentricCircles } from '@/components/ui/concentric-circles';

/* ── Animated headline word split ───────────────────────────── */
function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <span aria-label={text} className="inline-block">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.7,
              delay: 0.3 + wi * 0.06,
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
  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-1.5 pointer-events-none select-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0.8],
        x: [0, 8, -4, 6, 0],
        y: [0, -6, 8, -3, 0],
      }}
      transition={{
        opacity: { delay, duration: 1 },
        x: { delay, duration: 8, repeat: Infinity, ease: 'easeInOut' },
        y: { delay, duration: 7, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {/* Cursor SVG */}
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
        <path d="M0 0L0 14L4 10L7 17L9 16L6 9L11 9Z" fill={color} />
      </svg>
      {/* Name pill */}
      <span
        className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
        style={{ background: color }}
      >
        {name}
      </span>
    </motion.div>
  );
}

/* ── Trust marquee ──────────────────────────────────────────── */
const LOGOS = ['Acme', 'Northwind', 'Vertex', 'Helix', 'Lumen', 'Atlas', 'Beacon', 'Prism'];

function TrustMarquee() {
  return (
    <div className="w-full border-t border-b border-white/[0.06] py-5 overflow-hidden marquee-track">
      <div className="flex animate-marquee" style={{ width: 'max-content' }}>
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <span
            key={i}
            className="mx-10 text-white/25 font-semibold text-sm tracking-widest mono-caption whitespace-nowrap"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */
export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Circle: scale from full viewport coverage to ~30% as user scrolls out
  const circleScale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1, 0.22]);
  const circleScaleSpring = useSpring(circleScale, { stiffness: 80, damping: 25 });

  // Circle slow infinite rotation happens via CSS animation
  const circleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const CIRCLE_BASE = 900; // base diameter before scaling

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Floating cursor decorations */}
      <FloatingCursor name="Alex" color="#7C3AED" x="8%" y="30%" delay={1.2} />
      <FloatingCursor name="Sara" color="#2563EB" x="85%" y="25%" delay={1.8} />
      <FloatingCursor name="Devon" color="#059669" x="78%" y="65%" delay={2.4} />
      <FloatingCursor name="Mia" color="#D97706" x="12%" y="70%" delay={3} />

      {/* Centered content area */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10 pt-24 pb-16">
        {/* Concentric circle — behind text, scroll-linked scale */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ scale: circleScaleSpring, opacity: circleOpacity }}
        >
          <motion.div
            animate={reducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <ConcentricCircles size={CIRCLE_BASE} />
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
          <button className="flex items-center gap-2.5 px-7 py-3.5 text-base font-medium text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-md shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] transition-all duration-300 group">
            Start a project
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <p className="mono-caption text-white/30">Replies in 24 hours. No obligation.</p>
        </motion.div>
      </div>

      {/* Trust strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-auto"
      >
        <p className="text-center mono-caption text-white/25 mb-4">
          Trusted by forward-thinking teams
        </p>
        <TrustMarquee />
      </motion.div>
    </section>
  );
}
