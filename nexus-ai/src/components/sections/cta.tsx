'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ConcentricCircles } from '@/components/ui/concentric-circles';

const LOGOS = ['Acme', 'Northwind', 'Vertex', 'Helix', 'Lumen', 'Atlas', 'Beacon', 'Prism'];

function TrustMarquee() {
  return (
    <div className="w-full border-t border-b border-white/[0.06] py-5 overflow-hidden marquee-track">
      <div className="flex animate-marquee" style={{ width: 'max-content' }}>
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <span key={i} className="mx-10 text-white/20 font-semibold text-sm tracking-widest mono-caption whitespace-nowrap">
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CTA() {
  return (
    <section className="relative py-40 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
      {/* Circle motif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        >
          <ConcentricCircles size={900} opacity={0.5} />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mono-caption text-violet-400 mb-6"
        >
          Got a project in mind?
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="display-xl text-white max-w-4xl mx-auto mb-8"
        >
          Give your team the firepower it deserves.
        </motion.h2>

        {/* Decorative line with circle endpoints */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 my-10"
        >
          <div className="w-2 h-2 rounded-full border border-white/20" />
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="w-2 h-2 rounded-full border border-white/20" />
        </motion.div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="body-l text-white/50 max-w-2xl mx-auto mb-12"
        >
          Stop letting manual work or limited dev capacity hold you back. Get AI automations and
          websites built by senior operators, embedded like in-house.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col items-center gap-3"
        >
          <button className="flex items-center gap-2.5 px-8 py-4 text-base font-medium text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-md shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] transition-all duration-300 group">
            Start a project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mono-caption text-white/30">Replies in 24 hours. No obligation.</p>
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
