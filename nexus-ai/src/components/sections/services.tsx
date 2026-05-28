'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HeroCircle } from '@/components/ui/hero-circle';

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
  const gridRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Central circle rotates subtly with mouse position
  const circleRotate = useTransform(mouseX, [0, 1], [-15, 15]);

  function handleMouseMove(e: React.MouseEvent) {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
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
        <div
          ref={gridRef}
          className="relative"
          onMouseMove={handleMouseMove}
        >
          {/* Background HeroCircle — transitions in from hero's final scale, rotates on scroll */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
            style={{ scale: bgScale, opacity: bgOpacity, rotate: bgRotate }}
          >
            <HeroCircle size={700} />
          </motion.div>

          {/* Mobile: single column stack */}
          <div className="md:hidden flex flex-col gap-px bg-white/[0.06]">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-bg">
                <Quadrant service={s} position="tl" gridRotation={0} />
              </div>
            ))}
          </div>

          {/* Desktop: 2×2 grid */}
          <div className="hidden md:grid grid-cols-2 relative z-10">
            {/* Top-left */}
            <div className="border-r border-b border-dashed border-white/[0.08] relative">
              <Quadrant service={SERVICES[0]} position="tl" gridRotation={0} />
              {/* dimension label */}
              <span className="absolute bottom-2 right-4 mono-caption text-white/15">1199 × 300</span>
            </div>

            {/* Top-right */}
            <div className="border-b border-dashed border-white/[0.08] relative">
              <Quadrant service={SERVICES[1]} position="tr" gridRotation={0} />
              <span className="absolute bottom-2 left-4 mono-caption text-white/15">600 × 300</span>
            </div>

            {/* Bottom-left */}
            <div className="border-r border-dashed border-white/[0.08] relative">
              <Quadrant service={SERVICES[2]} position="bl" gridRotation={0} />
              <span className="absolute top-2 right-4 mono-caption text-white/15">1199 × 300</span>
            </div>

            {/* Bottom-right */}
            <div className="relative">
              <Quadrant service={SERVICES[3]} position="br" gridRotation={0} />
              <span className="absolute top-2 left-4 mono-caption text-white/15">600 × 300</span>
            </div>

            {/* Center intersection — circle + crosshair label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
              <motion.div style={{ rotate: circleRotate }}>
                <ConcentricCircles size={120} opacity={0.6} />
              </motion.div>
              {/* Dimension annotations on the dividers */}
              <span className="absolute top-1/2 left-full ml-4 -translate-y-1/2 mono-caption text-blue-400/60 whitespace-nowrap bg-blue-500/10 px-2 py-0.5 rounded">
                364 px
              </span>
              <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 mono-caption text-blue-400/60 whitespace-nowrap bg-blue-500/10 px-2 py-0.5 rounded">
                300 px
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
