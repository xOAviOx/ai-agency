'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, Lock, BadgeCheck, Sparkles } from 'lucide-react';

const SERVICES = [
  'AI Agents & Workflows',
  'Process Automation',
  'High-Performance Websites',
  'AI Strategy & Integration',
];

const USEFUL_LINKS = ['Latest case studies', 'Book a call', 'Contact us'];

const LEGAL_LINKS = ['Privacy Policy', 'AI Policy', 'Terms of Service'];

const BADGES = [
  { icon: Shield, label: 'SOC 2', sub: 'Type II' },
  { icon: Lock, label: 'GDPR', sub: 'Ready' },
  { icon: BadgeCheck, label: 'ISO 27001', sub: 'Certified' },
  { icon: Sparkles, label: 'Enterprise', sub: 'AI-grade' },
];

/* Giant bottom wordmark — staggered per-letter hover (lift + violet + glow) */
const WORDMARK = 'NEXUS'.split('');
const wmContainer = {
  rest: {},
  hover: { transition: { staggerChildren: 0.045 } },
};
const wmLetter = {
  rest: { y: '0%', color: 'rgba(255,255,255,1)', textShadow: '0 0 0px rgba(124,58,237,0)' },
  hover: { y: '-8%', color: 'rgba(168,85,247,1)', textShadow: '0 0 55px rgba(124,58,237,0.5)' },
};

function LinkColumn({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div>
      <p className="mono-caption text-violet-400/70 mb-6">{heading}</p>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="group inline-flex items-center gap-1.5 text-[15px] text-white/60 transition-colors hover:text-white"
            >
              {link}
              <ArrowUpRight className="h-3.5 w-3.5 text-white/0 transition-all duration-200 group-hover:text-violet-300 group-hover:translate-x-0.5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-white/[0.06]"
      style={{ background: 'var(--bg)' }}
    >
      {/* ambient violet wash, bottom-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.10), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        {/* ── Row 1: wordmark + tagline / contact ── */}
        <div className="flex flex-col gap-8 border-b border-white/[0.06] py-14 md:flex-row md:items-center md:justify-between md:py-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <motion.span
              whileHover={{ color: 'rgba(168,85,247,1)', letterSpacing: '0.01em' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="select-none text-5xl font-bold leading-none tracking-tight text-white md:text-6xl"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}
            >
              NEXUS
            </motion.span>
            <span className="max-w-xs text-sm text-white/40 md:text-[15px]">
              Exceptional automation, seamless execution.
            </span>
          </div>

          <div className="flex flex-col gap-1.5 text-[15px] md:items-end">
            <a
              href="mailto:hello@nexus.ai"
              className="text-violet-300 transition-colors hover:text-violet-200"
            >
              hello@nexus.ai
            </a>
            <a
              href="tel:+447738288101"
              className="text-white/50 transition-colors hover:text-white/80"
            >
              +44 07738 288101
            </a>
          </div>
        </div>

        {/* ── Row 2: link columns + badges ── */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
          <LinkColumn heading="Our services" links={SERVICES} />
          <LinkColumn heading="Useful links" links={USEFUL_LINKS} />

          {/* affiliation / trust badges */}
          <div className="md:col-span-2 lg:col-span-1">
            <p className="mono-caption text-white/25 mb-6 lg:text-right">Trust & compliance</p>
            <div className="grid grid-cols-2 gap-3 sm:max-w-[280px] lg:ml-auto">
              {BADGES.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-3 transition-colors hover:border-violet-500/30"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                    <Icon className="h-4 w-4 text-violet-300" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold text-white/85">{label}</p>
                    <p className="text-[11px] text-white/35">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: copyright + legal ── */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] py-8 sm:flex-row sm:items-center">
          <p className="mono-caption text-white/30">© 2026 NEXUS. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="mono-caption text-white/25 transition-colors hover:text-white/50"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
