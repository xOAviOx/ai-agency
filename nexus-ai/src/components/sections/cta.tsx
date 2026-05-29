'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { openCalendly } from '@/lib/booking';

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

/* The interactive copy that lives inside the travelling circle.
   Reused by both the desktop stage and the mobile fallback. */
function CtaCopy() {
  return (
    <>
      <p className="mono-caption text-violet-400 mb-5">Got a project in mind?</p>
      <h2 className="display-l text-white mb-6">Give your team the firepower it deserves.</h2>
      <p className="body-l text-white/55 mb-9">
        Stop letting manual work hold you back — AI automations and websites built by senior
        operators, embedded like in-house.
      </p>
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => openCalendly()}
          className="flex items-center gap-2.5 px-8 py-4 text-base font-medium text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-md shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] transition-all duration-300 group cursor-pointer"
        >
          Start a project
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="mono-caption text-white/30">Replies in 24 hours. No obligation.</p>
      </div>
    </>
  );
}

export function CTA() {
  // Drive the copy's fade in/out from this section's own scroll progress, so it
  // lands inside the travelling circle (rendered by <OrbitJourney/>) as it arrives.
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });
  const copyOpacity = useTransform(scrollYProgress, [0.06, 0.24, 0.72, 0.92], [0, 1, 1, 0]);
  const copyY = useTransform(scrollYProgress, [0.06, 0.24], [28, 0]);

  return (
    <section data-section="cta" className="relative" style={{ background: 'var(--bg)' }}>
      {/* Scroll stage — the circle backdrop is the travelling <OrbitJourney/>
          circle that hands off from "Why NEXUS". Active on mobile too. */}
      <div ref={stageRef} data-cta-stage className="relative" style={{ height: '200vh' }}>
        {/* Scroll anchor for "Book a call" / "#contact". Placed ~mid-stage so the
            sticky copy ("Got a project in mind?") is faded-in & centered when we
            land here — the stage top would be blank (copy opacity is 0 there). */}
        <div id="contact" aria-hidden className="absolute left-0 top-[58vh] h-px w-px" />
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
          <motion.div
            style={{ opacity: copyOpacity, y: copyY }}
            className="relative z-10 max-w-md text-center"
          >
            <CtaCopy />
          </motion.div>
        </div>
      </div>

      {/* Trust marquee */}
      <div className="relative z-10 pb-32 pt-4">
        <p className="text-center mono-caption text-white/20 mb-5">Trusted by</p>
        <TrustMarquee />
      </div>
    </section>
  );
}
