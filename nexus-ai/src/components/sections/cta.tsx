'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ConcentricCircles } from '@/components/ui/concentric-circles';

const LOGOS = ['Acme', 'Northwind', 'Vertex', 'Helix', 'Lumen', 'Atlas', 'Beacon', 'Prism'];

function TrustMarquee() {
  return (
    <div className="w-full border-t border-b border-white/[0.06] py-5 overflow-hidden marquee-track">
      <div className="flex animate-marquee" style={{ width: 'max-content' }}>
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <span
            key={i}
            className="mx-10 text-white/20 font-semibold text-sm tracking-widest mono-caption whitespace-nowrap"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CTA() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative py-32 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Focused violet glow behind the panel — single, intentional light source */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[560px] w-[820px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0.06) 40%, transparent 72%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[820px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.005] px-8 py-16 md:px-16 md:py-20 text-center overflow-hidden"
        >
          {/* Top edge highlight */}
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          {/* Corner dots — matches the blueprint frame language used elsewhere */}
          {[
            'top-4 left-4',
            'top-4 right-4',
            'bottom-4 left-4',
            'bottom-4 right-4',
          ].map((pos) => (
            <div
              key={pos}
              className={`absolute ${pos} h-1.5 w-1.5 rounded-full bg-white/20`}
            />
          ))}

          {/* Spinning concentric badge — the circle motif, now a deliberate accent */}
          <motion.div
            animate={reducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            className="mx-auto mb-7 w-fit"
          >
            <ConcentricCircles size={64} opacity={0.9} />
          </motion.div>

          {/* Eyebrow */}
          <p className="mono-caption text-violet-400 mb-5">Got a project in mind?</p>

          {/* Headline */}
          <h2 className="display-l text-white max-w-xl mx-auto mb-6">
            Give your team the firepower it deserves.
          </h2>

          {/* Body */}
          <p className="body-l text-white/55 max-w-lg mx-auto mb-10">
            Stop letting manual work or limited dev capacity hold you back. Get AI automations and
            websites built by senior operators, embedded like in-house.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <button className="flex items-center gap-2.5 px-8 py-4 text-base font-medium text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-md shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] transition-all duration-300 group">
              Start a project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mono-caption text-white/30">Replies in 24 hours. No obligation.</p>
          </div>
        </motion.div>
      </div>

      {/* Trust marquee */}
      <div className="relative z-10 mt-24">
        <p className="text-center mono-caption text-white/20 mb-5">Trusted by</p>
        <TrustMarquee />
      </div>
    </section>
  );
}
