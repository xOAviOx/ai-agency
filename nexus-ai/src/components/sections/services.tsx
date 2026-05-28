'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HeroCircle } from '@/components/ui/hero-circle';

/* Radius of the small intersection circle — divider lines terminate here */
const CIRCLE_SIZE = 64;
const CIRCLE_R    = CIRCLE_SIZE / 2; // 32px

const SERVICES = [
  {
    id: 1,
    title: 'AI Agents & Workflows',
    description:
      'Custom GPT-powered agents that handle real tasks — from customer support to internal ops — without hand-holding.',
    tag: 'Agents',
    gradient: 'from-violet-900/40 to-violet-950/20',
  },
  {
    id: 2,
    title: 'Process Automation',
    description:
      "n8n, Make, and bespoke pipelines that eliminate manual work, cut error rates, and free up your team's headspace.",
    tag: 'Automation',
    gradient: 'from-blue-900/40 to-blue-950/20',
  },
  {
    id: 3,
    title: 'High-Performance Websites',
    description:
      'Conversion-focused builds with AI-powered features baked in — from personalization to content generation.',
    tag: 'Web',
    gradient: 'from-emerald-900/40 to-emerald-950/20',
  },
  {
    id: 4,
    title: 'AI Strategy & Integration',
    description:
      'From audit to deployment, we map your stack, identify the highest-ROI AI opportunities, and ship them.',
    tag: 'Strategy',
    gradient: 'from-amber-900/40 to-amber-950/20',
  },
];

interface QuadrantProps {
  service: (typeof SERVICES)[0];
  position: 'tl' | 'tr' | 'bl' | 'br';
  gridRotation: number;
}

function Quadrant({ service, position, gridRotation }: QuadrantProps) {
  const [hovered, setHovered] = useState(false);

  const cornerClass = {
    tl: 'items-start justify-start text-left',
    tr: 'items-end justify-start text-right',
    bl: 'items-start justify-end text-left',
    br: 'items-end justify-end text-right',
  }[position];

  return (
    <motion.div
      className={`relative flex flex-col ${cornerClass} p-10 min-h-[300px] cursor-default overflow-hidden group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background glow on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} pointer-events-none`}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Heading — always visible */}
      <h3 className="display-l text-white relative z-10 max-w-[240px] leading-[1.1]">
        {service.title}
      </h3>

      {/* Hover card */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="hover-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-6 bottom-6 rounded-lg border border-violet-500/20 bg-bg-elevated/80 backdrop-blur-sm p-5 shadow-[inset_0_0_30px_rgba(124,58,237,0.06)] z-20"
          >
            {/* Mini gradient bar */}
            <div className="w-8 h-0.5 bg-gradient-to-r from-violet-500 to-transparent mb-3 rounded-full" />
            <p className="text-sm text-white/65 leading-relaxed mb-4">{service.description}</p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              Explore
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tag */}
      <div className="relative z-10 mt-3">
        <span className="mono-caption text-white/25">{service.tag}</span>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section className="relative z-10 py-24 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="mono-caption text-white/40">What we build</span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </motion.div>

        {/* 2×2 grid with cross dividers */}
        <div className="relative">
          {/* Mobile: single column stack */}
          <div className="md:hidden flex flex-col gap-px bg-white/[0.06]">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-bg">
                <Quadrant service={s} position="tl" gridRotation={0} />
              </div>
            ))}
          </div>

          {/* Desktop: 2×2 grid — borders replaced by explicit line segments
              so they terminate cleanly at the intersection circle edge */}
          <div className="hidden md:block relative">
            <div className="grid grid-cols-2">
              <div><Quadrant service={SERVICES[0]} position="tl" gridRotation={0} /></div>
              <div><Quadrant service={SERVICES[1]} position="tr" gridRotation={0} /></div>
              <div><Quadrant service={SERVICES[2]} position="bl" gridRotation={0} /></div>
              <div><Quadrant service={SERVICES[3]} position="br" gridRotation={0} /></div>
            </div>

            {/* Cross dividers — 4 dashed segments, each ending CIRCLE_R px from center */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Vertical — top half */}
              <div
                className="absolute left-1/2 top-0 -translate-x-px"
                style={{ height: `calc(50% - ${CIRCLE_R}px)`, borderLeft: '1px dashed rgba(255,255,255,0.08)' }}
              />
              {/* Vertical — bottom half */}
              <div
                className="absolute left-1/2 bottom-0 -translate-x-px"
                style={{ height: `calc(50% - ${CIRCLE_R}px)`, borderLeft: '1px dashed rgba(255,255,255,0.08)' }}
              />
              {/* Horizontal — left half */}
              <div
                className="absolute top-1/2 left-0 -translate-y-px"
                style={{ width: `calc(50% - ${CIRCLE_R}px)`, borderTop: '1px dashed rgba(255,255,255,0.08)' }}
              />
              {/* Horizontal — right half */}
              <div
                className="absolute top-1/2 right-0 -translate-y-px"
                style={{ width: `calc(50% - ${CIRCLE_R}px)`, borderTop: '1px dashed rgba(255,255,255,0.08)' }}
              />

              {/* Permanent circle at the crosshair — fades in when section enters viewport */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <HeroCircle size={CIRCLE_SIZE} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
