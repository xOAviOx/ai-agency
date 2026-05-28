'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ConcentricCircles } from '@/components/ui/concentric-circles';

export function Agencies() {
  const reducedMotion = useReducedMotion();
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="grid md:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">
          {/* Left — image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Dashed outer border frame */}
            <div
              className="absolute -inset-4 rounded-2xl border border-dashed border-white/[0.1] pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, rgba(124,58,237,0.04) 0%, transparent 60%)',
              }}
            />
            {/* Corner dots */}
            {[
              'top-0 left-0 -translate-x-1 -translate-y-1',
              'top-0 right-0 translate-x-1 -translate-y-1',
              'bottom-0 left-0 -translate-x-1 translate-y-1',
              'bottom-0 right-0 translate-x-1 translate-y-1',
            ].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-2 h-2 rounded-full bg-white/20`}
              />
            ))}

            {/* Image / placeholder */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#111115] to-[#0D0D10]">
              {/* Fake team collaboration scene */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 p-8 w-full">
                  {/* Person cards */}
                  {[
                    { initials: 'AJ', color: '#7C3AED', role: 'AI Engineer' },
                    { initials: 'SR', color: '#2563EB', role: 'Designer' },
                    { initials: 'MP', color: '#059669', role: 'Strategist' },
                    { initials: 'DC', color: '#D97706', role: 'Developer' },
                    { initials: 'LK', color: '#DC2626', role: 'PM' },
                    { initials: 'TN', color: '#7C3AED', role: 'Data Eng.' },
                  ].map((person, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: person.color }}
                      >
                        {person.initials}
                      </div>
                      <span className="text-[10px] text-white/40">{person.role}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D10]/60 via-transparent to-transparent" />
              {/* Bottom label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="mono-caption text-white/30">Your extended team</span>
                <div className="flex -space-x-2">
                  {['#7C3AED', '#2563EB', '#059669'].map((c, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-bg-elevated"
                      style={{ background: c }}
                    />
                  ))}
                  <div className="w-5 h-5 rounded-full border border-bg-elevated bg-white/10 flex items-center justify-center text-[8px] text-white/60">
                    +3
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — copy */}
          <div className="relative">
            {/* Background circle */}
            <div className="absolute -right-32 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none">
              <motion.div
                animate={reducedMotion ? {} : { rotate: -360 }}
                transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
              >
                <ConcentricCircles size={400} />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <div className="mb-4 inline-flex items-center gap-2">
                <div className="w-4 h-px bg-violet-500" />
                <span className="mono-caption text-violet-400">For agencies</span>
              </div>

              <h2 className="display-l text-white mb-6">
                Scale your team instantly. Zero overheads.
              </h2>

              <p className="body-l text-white/55 mb-8">
                Our AI engineers and designers plug into your workflow as white-label talent. Ship
                faster, win bigger pitches, no headcount risk.
              </p>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  '30+ hrs saved / week',
                  'White-label delivery',
                  'Senior operators',
                  'No retainers',
                ].map((stat) => (
                  <span
                    key={stat}
                    className="px-3 py-1.5 rounded-full border border-white/[0.08] text-sm text-white/50"
                  >
                    {stat}
                  </span>
                ))}
              </div>

              <button className="flex items-center gap-2.5 px-6 py-3 text-sm font-medium text-white/80 border border-white/10 rounded-md hover:bg-white/[0.04] hover:text-white transition-all duration-200 group">
                Partner with us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
