'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
    <section className="relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Content stage — circle frame is centered on this, not the whole section */}
      <div className="relative flex items-center justify-center py-44 md:py-52">
        {/* Focused violet glow — single, intentional light source */}
        <div
          aria-hidden="true"
          className="absolute h-[620px] w-[620px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.20) 0%, rgba(124,58,237,0.05) 45%, transparent 72%)',
          }}
        />

        {/* Soft disc — a circular "panel" instead of a square card */}
        <div
          aria-hidden="true"
          className="absolute aspect-square w-[min(94vw,640px)] rounded-full border border-white/[0.07] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.035) 0%, transparent 68%)',
          }}
        />

        {/* Concentric ring frame — echoes the orbit motif, kept clear of the copy */}
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 800 800"
          animate={reducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute aspect-square w-[min(108vw,800px)] pointer-events-none"
        >
          <circle cx="400" cy="400" r="398" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
          <circle cx="400" cy="400" r="340" fill="none" stroke="white" strokeOpacity="0.09" strokeWidth="1" />
          <circle
            cx="400"
            cy="400"
            r="290"
            fill="none"
            stroke="white"
            strokeOpacity="0.06"
            strokeWidth="1"
            strokeDasharray="1 16"
            strokeLinecap="round"
          />
          {/* orbiting accent marks */}
          <circle cx="400" cy="60" r="3.5" fill="#A855F7" />
          <circle cx="740" cy="400" r="2" fill="white" fillOpacity="0.5" />
          <circle cx="400" cy="740" r="2" fill="white" fillOpacity="0.3" />
        </motion.svg>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-md px-6 text-center"
        >
          {/* Eyebrow */}
          <p className="mono-caption text-violet-400 mb-5">Got a project in mind?</p>

          {/* Headline */}
          <h2 className="display-l text-white mb-6">
            Give your team the firepower it deserves.
          </h2>

          {/* Body */}
          <p className="body-l text-white/55 mb-9">
            Stop letting manual work hold you back — AI automations and websites built by senior
            operators, embedded like in-house.
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
      <div className="relative z-10 pb-32">
        <p className="text-center mono-caption text-white/20 mb-5">Trusted by</p>
        <TrustMarquee />
      </div>
    </section>
  );
}
