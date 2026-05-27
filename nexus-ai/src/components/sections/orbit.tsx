'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { ArrowRight, Zap, Clock, Users, Star, Shield, Rocket } from 'lucide-react';
import { ConcentricCircles } from '@/components/ui/concentric-circles';
import { LucideIcon } from 'lucide-react';

/* ── Orbit phrases ──────────────────────────────────────────── */
const PHRASES: {
  angle: number;
  headline: string;
  sub: string;
  cta: string;
  icon: LucideIcon;
}[] = [
  { angle: 0,   headline: 'Less downtime.',      sub: 'More action.',              cta: 'Our process →',    icon: Zap    },
  { angle: 60,  headline: '24-hour replies.',     sub: 'Always.',                   cta: 'How we work →',   icon: Clock  },
  { angle: 120, headline: 'Direct access.',       sub: 'No account managers.',      cta: 'Meet the team →', icon: Users  },
  { angle: 180, headline: 'Senior talent.',       sub: 'On every project.',         cta: 'Our team →',      icon: Star   },
  { angle: 240, headline: 'Ship in weeks.',       sub: 'Not quarters.',             cta: 'Case studies →',  icon: Rocket },
  { angle: 300, headline: 'Embedded trust.',      sub: 'Like in-house talent.',     cta: 'How we embed →',  icon: Shield },
];

/* ── Single orbiting phrase node ───────────────────────────── */
function OrbitPhrase({
  phrase,
  orbitRadius,
  scrollRotation,
}: {
  phrase: typeof PHRASES[0];
  orbitRadius: number;
  scrollRotation: MotionValue<number>;
}) {
  const Icon = phrase.icon;

  // Pre-compute MotionValues at the top of the component (rules of hooks compliant)
  const x = useTransform(scrollRotation, (rot: number) => {
    const totalAngle = phrase.angle + rot;
    const rad = ((totalAngle - 90) * Math.PI) / 180;
    return orbitRadius * Math.cos(rad) - 88;
  });

  const y = useTransform(scrollRotation, (rot: number) => {
    const totalAngle = phrase.angle + rot;
    const rad = ((totalAngle - 90) * Math.PI) / 180;
    return orbitRadius * Math.sin(rad) - 56;
  });

  const rotate = useTransform(scrollRotation, (rot: number) => -rot);

  return (
    <motion.div
      className="absolute w-44"
      style={{ left: '50%', top: '50%', x, y, rotate }}
    >
      <div className="group cursor-default">
        <div className="mb-2 w-6 h-6 rounded-full bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
          <Icon className="w-3 h-3 text-violet-400" />
        </div>
        <h4 className="text-white font-medium text-sm leading-tight">{phrase.headline}</h4>
        <p className="text-white/45 text-xs mt-0.5">{phrase.sub}</p>
        <button className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-violet-400/60 hover:text-violet-300 transition-colors">
          {phrase.cta}
          <ArrowRight className="w-2.5 h-2.5" />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Orbit Section ──────────────────────────────────────────── */
export function Orbit() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Map scroll 0→1 to orbit rotation 0→90 degrees
  const orbitRotation = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden py-40"
      style={{ background: 'var(--bg)', minHeight: '100vh' }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12 w-full">
        {/* ── Mobile: stacked list ───────────────────────── */}
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="mono-caption text-white/35 mb-3">What you get</p>
            <h2 className="display-l text-white">Why teams choose NEXUS.</h2>
          </motion.div>
          <div className="max-w-sm mx-auto flex flex-col gap-6">
            {PHRASES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{p.headline}</h4>
                    <p className="text-sm text-white/50">{p.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Desktop: orbit layout ──────────────────────── */}
        <div className="hidden md:block relative" style={{ height: 640 }}>
          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
            <p className="mono-caption text-white/25 mb-2">What you get</p>
            <h2 className="text-2xl font-semibold text-white tracking-tight">Why NEXUS.</h2>
          </div>

          {/* Central concentric circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            >
              <ConcentricCircles size={220} />
            </motion.div>
          </div>

          {/* Orbiting phrases */}
          {PHRASES.map((phrase, i) => (
            <OrbitPhrase
              key={i}
              phrase={phrase}
              orbitRadius={260}
              scrollRotation={orbitRotation}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
