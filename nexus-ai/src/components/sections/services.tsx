'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
/* Gap each dashed arm leaves for the traveling circle (matches its 64px final visual size) */
const CIRCLE_R = 32;

/* ─────────────────────────────  Phone frame + per-service screens  ───────────────────────────── */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[88px] h-[176px] rounded-[16px] border border-white/15 bg-[#0b0b0d] overflow-hidden shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)]">
      {/* Notch */}
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-7 h-1 rounded-full bg-black z-20" />
      {/* Screen */}
      <div className="absolute inset-[3px] rounded-[13px] overflow-hidden bg-[#0a0a0b]">
        {children}
      </div>
      {/* Inner highlight */}
      <div className="absolute inset-0 rounded-[16px] pointer-events-none ring-1 ring-inset ring-white/[0.04]" />
    </div>
  );
}

/* AI Agents — live chat conversation */
function AgentScreen() {
  const bubbles = [
    { from: 'bot', w: 70, delay: 0.1 },
    { from: 'user', w: 60, delay: 0.25 },
    { from: 'bot', w: 80, delay: 0.4 },
    { from: 'user', w: 50, delay: 0.55 },
    { from: 'bot', w: 65, delay: 0.7 },
  ];
  return (
    <div className="absolute inset-0 pt-5 px-2 pb-2 flex flex-col gap-1 bg-gradient-to-b from-violet-950/30 to-transparent">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: b.from === 'bot' ? -6 : 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: b.delay, duration: 0.3 }}
          className={`h-2 rounded-md ${
            b.from === 'bot'
              ? 'self-start bg-white/10'
              : 'self-end bg-violet-500/60'
          }`}
          style={{ width: `${b.w}%` }}
        />
      ))}
      {/* Typing dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.3 }}
        className="self-start flex gap-0.5 mt-0.5"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1 h-1 rounded-full bg-white/40"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* Automation — workflow nodes wired together */
function AutomationScreen() {
  return (
    <div className="absolute inset-0 pt-5 px-2 pb-2 bg-gradient-to-b from-blue-950/30 to-transparent">
      <svg viewBox="0 0 80 150" className="w-full h-full">
        {/* Connecting lines */}
        <motion.line
          x1="40" y1="18" x2="40" y2="42"
          stroke="rgba(124,58,237,0.5)" strokeWidth="1" strokeDasharray="2 2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.15, duration: 0.4 }}
        />
        <motion.line
          x1="40" y1="62" x2="40" y2="86"
          stroke="rgba(124,58,237,0.5)" strokeWidth="1" strokeDasharray="2 2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.35, duration: 0.4 }}
        />
        <motion.line
          x1="40" y1="106" x2="40" y2="130"
          stroke="rgba(124,58,237,0.5)" strokeWidth="1" strokeDasharray="2 2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.55, duration: 0.4 }}
        />
        {/* Nodes */}
        {[
          { y: 4, fill: 'rgba(124,58,237,0.3)', stroke: 'rgba(124,58,237,0.7)', delay: 0.05 },
          { y: 44, fill: 'rgba(255,255,255,0.06)', stroke: 'rgba(255,255,255,0.2)', delay: 0.25 },
          { y: 88, fill: 'rgba(255,255,255,0.06)', stroke: 'rgba(255,255,255,0.2)', delay: 0.45 },
          { y: 132, fill: 'rgba(16,185,129,0.25)', stroke: 'rgba(16,185,129,0.7)', delay: 0.65 },
        ].map((n, i) => (
          <motion.rect
            key={i}
            x="14" y={n.y} width="52" height="14" rx="3"
            fill={n.fill} stroke={n.stroke} strokeWidth="1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: n.delay, duration: 0.3 }}
          />
        ))}
        {/* Inner content lines on nodes */}
        {[8, 48, 92, 136].map((y, i) => (
          <motion.line
            key={i}
            x1="20" y1={y} x2="50" y2={y}
            stroke="rgba(255,255,255,0.35)" strokeWidth="1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.2, duration: 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
}

/* Web — landing page layout */
function WebScreen() {
  return (
    <div className="absolute inset-0 pt-5 px-1.5 pb-1.5 flex flex-col gap-1 bg-gradient-to-b from-emerald-950/20 to-transparent">
      {/* Hero block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="h-14 rounded-md bg-gradient-to-br from-violet-500/40 via-fuchsia-500/20 to-transparent relative overflow-hidden"
      >
        <div className="absolute bottom-1 left-1 right-1 space-y-0.5">
          <div className="h-0.5 w-[60%] rounded-full bg-white/60" />
          <div className="h-0.5 w-[40%] rounded-full bg-white/30" />
        </div>
      </motion.div>
      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="h-2 w-[45%] rounded-full bg-violet-500/70"
      />
      {/* Text lines */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="space-y-0.5 mt-0.5"
      >
        <div className="h-0.5 w-[80%] rounded-full bg-white/25" />
        <div className="h-0.5 w-[65%] rounded-full bg-white/20" />
        <div className="h-0.5 w-[70%] rounded-full bg-white/20" />
      </motion.div>
      {/* Grid cards */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.35 }}
        className="grid grid-cols-2 gap-1 mt-auto"
      >
        <div className="h-8 rounded-sm bg-white/[0.06] border border-white/[0.06]" />
        <div className="h-8 rounded-sm bg-white/[0.06] border border-white/[0.06]" />
      </motion.div>
    </div>
  );
}

/* Strategy — analytics dashboard */
function StrategyScreen() {
  const bars = [40, 65, 50, 78, 60, 90, 72];
  return (
    <div className="absolute inset-0 pt-5 px-1.5 pb-1.5 flex flex-col gap-1.5 bg-gradient-to-b from-amber-950/20 to-transparent">
      {/* KPI row */}
      <motion.div
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="grid grid-cols-2 gap-1"
      >
        <div className="rounded-sm border border-white/10 p-1">
          <div className="h-0.5 w-[60%] rounded-full bg-white/30 mb-0.5" />
          <div className="text-[7px] leading-none font-semibold text-violet-400">+24%</div>
        </div>
        <div className="rounded-sm border border-white/10 p-1">
          <div className="h-0.5 w-[60%] rounded-full bg-white/30 mb-0.5" />
          <div className="text-[7px] leading-none font-semibold text-emerald-400">98%</div>
        </div>
      </motion.div>
      {/* Bar chart */}
      <div className="flex items-end gap-[2px] h-16 mt-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${h}%`, opacity: 1 }}
            transition={{ delay: 0.25 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-500/30 to-violet-400/80"
          />
        ))}
      </div>
      {/* Legend lines */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
        className="space-y-0.5 mt-auto"
      >
        <div className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-violet-400" />
          <div className="h-0.5 flex-1 rounded-full bg-white/15" />
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          <div className="h-0.5 flex-1 rounded-full bg-white/15" />
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────  Service data  ───────────────────────────── */

const SERVICES = [
  {
    id: 1,
    title: 'AI Agents & Workflows',
    description:
      'Custom GPT-powered agents that handle real tasks — from customer support to internal ops — without hand-holding.',
    tag: 'Agents',
    Screen: AgentScreen,
  },
  {
    id: 2,
    title: 'Process Automation',
    description:
      "n8n, Make, and bespoke pipelines that eliminate manual work, cut error rates, and free up your team's headspace.",
    tag: 'Automation',
    Screen: AutomationScreen,
  },
  {
    id: 3,
    title: 'High-Performance Websites',
    description:
      'Conversion-focused builds with AI-powered features baked in — from personalization to content generation.',
    tag: 'Web',
    Screen: WebScreen,
  },
  {
    id: 4,
    title: 'AI Strategy & Integration',
    description:
      'From audit to deployment, we map your stack, identify the highest-ROI AI opportunities, and ship them.',
    tag: 'Strategy',
    Screen: StrategyScreen,
  },
];

/* ─────────────────────────────  Quadrant  ───────────────────────────── */

interface QuadrantProps {
  service: (typeof SERVICES)[0];
  position: 'tl' | 'tr' | 'bl' | 'br';
}

/* Phone cluster placement opposite the text corner so they don't fight the copy */
const phoneCornerStyle: Record<QuadrantProps['position'], string> = {
  tl: 'bottom-6 right-8',
  tr: 'bottom-6 left-8',
  bl: 'top-6 right-8',
  br: 'top-6 left-8',
};

function Quadrant({ service, position }: QuadrantProps) {
  const [hovered, setHovered] = useState(false);

  const cornerClass = {
    tl: 'items-start justify-start text-left',
    tr: 'items-end justify-start text-right',
    bl: 'items-start justify-end text-left',
    br: 'items-end justify-end text-right',
  }[position];

  const isRight = position === 'tr' || position === 'br';
  const Screen = service.Screen;
  /* Mirror the phone cluster on right-side quadrants so the back-phone leans away from the text */
  const mirror = position === 'tr' || position === 'br' ? -1 : 1;

  return (
    <motion.div
      className={`relative flex flex-col ${cornerClass} p-10 min-h-[360px] cursor-default overflow-hidden group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Blueprint grid overlay — zoom + fade in on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 1.08,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(124,58,237,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(124,58,237,0.18) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        }}
      />

      {/* One-shot light sweep on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="sweep"
            className="absolute inset-0 pointer-events-none"
            initial={{ x: '-110%', opacity: 0 }}
            animate={{ x: '110%', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background:
                'linear-gradient(115deg, transparent 35%, rgba(168,85,247,0.18) 50%, transparent 65%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Phone preview cluster — opposite corner of the text */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="phones"
            className={`absolute z-[5] pointer-events-none ${phoneCornerStyle[position]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Continuous float wrapper */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Back phone */}
              <motion.div
                initial={{ opacity: 0, y: 24, rotate: 0, x: 0 }}
                animate={{ opacity: 1, y: 0, rotate: -10 * mirror, x: -14 * mirror }}
                exit={{ opacity: 0, y: 16, rotate: 0 }}
                transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <PhoneFrame>
                  <Screen />
                </PhoneFrame>
              </motion.div>
              {/* Front phone — offset, leans the other way */}
              <motion.div
                className="absolute top-4"
                style={{ left: 22 * mirror }}
                initial={{ opacity: 0, y: 28, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: 7 * mirror }}
                exit={{ opacity: 0, y: 20, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <PhoneFrame>
                  <Screen />
                </PhoneFrame>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heading — width in `ch` scales with the (wide) display font so long
          single words like "Automation"/"Integration" always fit on a line;
          break-words is a safety net so nothing can ever run off-screen. */}
      <h3 className="display-l text-white relative z-10 max-w-[15ch] leading-[1.1] break-words hyphens-none">
        {service.title}
      </h3>

      {/* Description */}
      <p
        className={`relative z-10 mt-5 text-sm text-white/45 leading-relaxed max-w-[300px] ${
          isRight ? 'ml-auto' : ''
        }`}
      >
        {service.description}
      </p>

      {/* Tag + Explore */}
      <div
        className={`relative z-10 mt-auto pt-6 flex items-center gap-3 ${
          isRight ? 'flex-row-reverse' : ''
        }`}
      >
        <span className="mono-caption text-white/25">{service.tag}</span>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors"
        >
          Explore
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative z-10 py-24 overflow-hidden" style={{ background: 'var(--bg)' }}>
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
                <Quadrant service={s} position="tl" />
              </div>
            ))}
          </div>

          {/* Desktop: 2×2 grid — borders replaced by explicit line segments
              so they terminate cleanly at the intersection circle edge */}
          <div className="hidden md:block relative">
            <div className="grid grid-cols-2">
              <div><Quadrant service={SERVICES[0]} position="tl" /></div>
              <div><Quadrant service={SERVICES[1]} position="tr" /></div>
              <div><Quadrant service={SERVICES[2]} position="bl" /></div>
              <div><Quadrant service={SERVICES[3]} position="br" /></div>
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

              {/* Zero-size marker — TravelingCircle measures this to know the intersection doc position */}
              <div
                data-intersection="services"
                className="absolute top-1/2 left-1/2 w-0 h-0"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
