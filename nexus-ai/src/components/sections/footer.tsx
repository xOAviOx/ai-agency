'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const LEGAL_LINKS = [
  'Environmental Sustainability',
  'Privacy Policy',
  'AI Policy',
];

export function Footer() {
  const [wordmarkHovered, setWordmarkHovered] = useState(false);

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Top bar */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/[0.06]">
        <p className="mono-caption text-white/30">
          © 2026 NEXUS. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {LEGAL_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="mono-caption text-white/25 hover:text-white/50 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Decorative dashed divider with circle endpoints */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 py-4 flex items-center gap-3">
        <div className="w-2 h-2 flex-shrink-0 rounded-full border border-white/15" />
        <div
          className="flex-1 border-t"
          style={{ borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.08)' }}
        />
        <div className="w-2 h-2 flex-shrink-0 rounded-full border border-white/15" />
      </div>

      {/* Giant wordmark */}
      <div className="overflow-hidden">
        <motion.div
          onMouseEnter={() => setWordmarkHovered(true)}
          onMouseLeave={() => setWordmarkHovered(false)}
          animate={{
            letterSpacing: wordmarkHovered ? '0.06em' : '-0.02em',
            color: wordmarkHovered ? 'rgba(124,58,237,1)' : 'rgba(255,255,255,1)',
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="select-none cursor-default font-bold leading-none"
          style={{
            fontSize: 'clamp(8rem, 25vw, 22rem)',
            fontFamily: 'var(--font-geist-sans)',
            color: '#fff',
            letterSpacing: '-0.02em',
            paddingLeft: '0.5rem',
            lineHeight: 0.9,
          }}
        >
          NEXUS
        </motion.div>
      </div>

      {/* Tiny bottom padding */}
      <div className="h-4" />
    </footer>
  );
}
