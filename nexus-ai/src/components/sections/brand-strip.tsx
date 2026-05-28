'use client';

import { motion } from 'framer-motion';

/* ── Monochrome SVG brand marks ────────────────────────────── */
const VercelMark    = () => <svg width="13" height="11" viewBox="0 0 13 11" fill="currentColor" aria-hidden><path d="M6.5 0L13 11H0z"/></svg>;
const FigmaMark     = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden><circle cx="4" cy="4" r="3" opacity="0.75"/><circle cx="8" cy="4" r="3" opacity="0.45"/><circle cx="4" cy="8" r="3" opacity="0.55"/><circle cx="8" cy="8" r="3" opacity="0.35"/></svg>;
const StripeMark    = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><rect width="14" height="14" rx="2.5" fill="currentColor" opacity="0.12"/><path d="M4 8.5c0 1.1 1 2 3 2s3-1 3-2.2c0-1.4-1-2-3-2.5-1.8-.4-2.5-.9-2.5-1.6C4.5 3.4 5.5 3 7 3s2.3.5 2.8 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const NotionMark    = () => <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden><path d="M1 2h4l6 8.5V2h1.5v10H8L2 3.5V12H1V2z" opacity="0.9"/></svg>;
const HsbcMark      = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden><path d="M7.5 1L14 4.5v6L7.5 14 1 10.5v-6z" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.5"/><path d="M1 4.5L7.5 8 14 4.5M1 10.5L7.5 8 14 10.5M7.5 1v13" stroke="currentColor" strokeWidth="0.8" opacity="0.35"/></svg>;
const AdobeMark     = () => <svg width="15" height="14" viewBox="0 0 15 14" fill="currentColor" aria-hidden><path d="M1 13.5L6 0.5h2L13.5 13.5H11L9.3 10H5.7L4 13.5H1zm5-5.5h3L7.5 4 6 8z" opacity="0.88"/></svg>;
const BloombergMark = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden><rect x="1" y="1" width="12" height="12" rx="1.5" fill="currentColor" opacity="0.1"/><path d="M4.5 3.5H8c1.2 0 2 .7 2 1.8s-.7 1.5-1.5 1.7c1 .2 2 .9 2 2.1 0 1.7-1.4 2.4-3 2.4H4.5V3.5z" opacity="0.88"/></svg>;
const LinearMark    = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/><path d="M4 10L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;

/* ── Brand data — y keyframes create the individual float paths ─ */
const BRANDS = [
  { name: 'Vercel',    Mark: VercelMark,    y: [0,  -10, 0],   dur: 3.2, delay: 0   },
  { name: 'Figma',     Mark: FigmaMark,     y: [20,  10, 20],  dur: 3.9, delay: 0.4 },
  { name: 'Stripe',    Mark: StripeMark,    y: [-8, -19, -8],  dur: 4.1, delay: 0.8 },
  { name: 'Notion',    Mark: NotionMark,    y: [14,   4, 14],  dur: 3.6, delay: 0.2 },
  { name: 'HSBC',      Mark: HsbcMark,      y: [-14,-24,-14],  dur: 4.4, delay: 0.6 },
  { name: 'Adobe',     Mark: AdobeMark,     y: [24,  13, 24],  dur: 3.7, delay: 1.0 },
  { name: 'Bloomberg', Mark: BloombergMark, y: [-4, -14, -4],  dur: 4.0, delay: 0.3 },
  { name: 'Linear',    Mark: LinearMark,    y: [10,   0, 10],  dur: 4.5, delay: 0.7 },
];

export function BrandStrip() {
  return (
    <div className="w-full py-4" style={{ overflow: 'visible' }}>
      {/* Faint label — no box, no background */}
      <p className="text-center mono-caption text-white/[0.13] mb-6 tracking-[0.2em]">
        Trusted by forward-thinking teams
      </p>

      {/* Freely floating logos — each bobs independently */}
      <div
        className="flex flex-wrap justify-center items-center gap-x-10 md:gap-x-14 gap-y-3 px-6 py-10"
        style={{ overflow: 'visible' }}
      >
        {BRANDS.map(({ name, Mark, y, dur, delay }) => (
          <motion.div
            key={name}
            animate={{ y }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
            whileHover={{ scale: 1.12, opacity: 0.65 }}
            transition2={{ duration: 0.2 }}
            className="flex items-center gap-2 text-white/22 cursor-default select-none"
            style={{ color: 'rgba(255,255,255,0.22)' }}
          >
            <span style={{ color: 'rgba(255,255,255,0.32)' }} className="flex items-center shrink-0">
              <Mark />
            </span>
            <span
              className="mono-caption whitespace-nowrap"
              style={{ fontSize: '0.68rem', letterSpacing: '0.18em' }}
            >
              {name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
