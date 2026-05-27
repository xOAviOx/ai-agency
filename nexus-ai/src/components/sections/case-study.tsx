'use client';

import { motion } from 'framer-motion';
import { ConcentricCircles } from '@/components/ui/concentric-circles';

const DELIVERED_FOR = ['Ratio', 'Helix Labs', 'Beacon Co.', 'Atlas Works'];

function FakeDashboard() {
  // A minimal SVG placeholder dashboard (bar chart + stat cards)
  return (
    <div className="w-full h-full p-4 bg-[#0D0D10] rounded flex flex-col gap-3">
      {/* Stat row */}
      <div className="grid grid-cols-3 gap-2">
        {['$2.4M', '18k', '+34%'].map((v, i) => (
          <div key={i} className="rounded bg-white/[0.04] border border-white/[0.06] p-2 text-center">
            <div className="text-xs font-bold text-white/80">{v}</div>
            <div className="text-[9px] text-white/30 mt-0.5">
              {['Revenue', 'Users', 'Growth'][i]}
            </div>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div className="flex-1 flex items-end gap-1.5 px-1">
        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background:
                i === 11
                  ? 'rgba(124,58,237,0.8)'
                  : i % 3 === 0
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(255,255,255,0.07)',
            }}
          />
        ))}
      </div>
      {/* X-axis labels */}
      <div className="flex gap-1.5 px-1">
        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
          <div key={i} className="flex-1 text-center text-[8px] text-white/20">
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaseStudy() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Background circle motif */}
      <div className="absolute -right-64 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <ConcentricCircles size={700} />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — Headline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-3 py-1 border border-white/10 rounded"
            >
              <span className="mono-caption text-white/50">Case Study :</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="display-l text-white mb-8"
            >
              Why Ratio has trusted us with their key accounts for over 3 years.
            </motion.h2>

            {/* Delivered for strip */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="mono-caption text-white/35 mb-4">We&apos;ve delivered for :</p>
              <div className="flex flex-wrap gap-3">
                {DELIVERED_FOR.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1.5 border border-white/[0.08] rounded text-sm text-white/50"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Testimonial + Mockup */}
          <div className="flex flex-col gap-6">
            {/* Testimonial card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="rounded-xl border border-white/[0.08] bg-bg-elevated p-6 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span className="mono-caption text-white/35">Testimonial</span>
              </div>
              <blockquote className="text-white/80 text-base leading-relaxed mb-5 italic">
                &ldquo;They&apos;ve embedded into our team. The automations they&apos;ve shipped are
                saving us 30+ hours a week.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center text-xs font-bold text-white">
                  SR
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Steve Renshaw</p>
                  <p className="text-xs text-white/40">Co-Founder, Ratio</p>
                </div>
              </div>
            </motion.div>

            {/* Browser mockup with fake dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 24, rotate: 3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0D0D10] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 mx-4 bg-white/[0.04] rounded text-[10px] text-white/25 px-3 py-1 text-center">
                  app.ratio.ai / dashboard
                </div>
              </div>
              {/* Dashboard content */}
              <div className="h-52">
                <FakeDashboard />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
