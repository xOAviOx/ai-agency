'use client';

/* ── Brand marks — scaled up for presence ───────────────────── */
const VercelMark    = () => <svg width="18" height="16" viewBox="0 0 13 11" fill="currentColor" aria-hidden><path d="M6.5 0L13 11H0z"/></svg>;
const FigmaMark     = () => <svg width="18" height="18" viewBox="0 0 12 12" fill="currentColor" aria-hidden><circle cx="4" cy="4" r="3" opacity="0.9"/><circle cx="8" cy="4" r="3" opacity="0.6"/><circle cx="4" cy="8" r="3" opacity="0.75"/><circle cx="8" cy="8" r="3" opacity="0.45"/></svg>;
const StripeMark    = () => <svg width="20" height="20" viewBox="0 0 14 14" fill="none" aria-hidden><rect width="14" height="14" rx="2.5" fill="currentColor" opacity="0.18"/><path d="M4 8.5c0 1.1 1 2 3 2s3-1 3-2.2c0-1.4-1-2-3-2.5-1.8-.4-2.5-.9-2.5-1.6C4.5 3.4 5.5 3 7 3s2.3.5 2.8 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const NotionMark    = () => <svg width="18" height="20" viewBox="0 0 12 14" fill="currentColor" aria-hidden><path d="M1 2h4l6 8.5V2h1.5v10H8L2 3.5V12H1V2z"/></svg>;
const HsbcMark      = () => <svg width="21" height="21" viewBox="0 0 15 15" fill="currentColor" aria-hidden><path d="M7.5 1L14 4.5v6L7.5 14 1 10.5v-6z" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.7"/><path d="M1 4.5L7.5 8 14 4.5M1 10.5L7.5 8 14 10.5M7.5 1v13" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/></svg>;
const AdobeMark     = () => <svg width="20" height="19" viewBox="0 0 15 14" fill="currentColor" aria-hidden><path d="M1 13.5L6 0.5h2L13.5 13.5H11L9.3 10H5.7L4 13.5H1zm5-5.5h3L7.5 4 6 8z"/></svg>;
const BloombergMark = () => <svg width="20" height="20" viewBox="0 0 14 14" fill="currentColor" aria-hidden><rect x="1" y="1" width="12" height="12" rx="1.5" fill="currentColor" opacity="0.15"/><path d="M4.5 3.5H8c1.2 0 2 .7 2 1.8s-.7 1.5-1.5 1.7c1 .2 2 .9 2 2.1 0 1.7-1.4 2.4-3 2.4H4.5V3.5z"/></svg>;
const LinearMark    = () => <svg width="19" height="19" viewBox="0 0 14 14" fill="none" aria-hidden><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4" opacity="0.8"/><path d="M4 10L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;

const BRANDS = [
  { name: 'Vercel',    Mark: VercelMark    },
  { name: 'Figma',     Mark: FigmaMark     },
  { name: 'Stripe',    Mark: StripeMark    },
  { name: 'Notion',    Mark: NotionMark    },
  { name: 'HSBC',      Mark: HsbcMark      },
  { name: 'Adobe',     Mark: AdobeMark     },
  { name: 'Bloomberg', Mark: BloombergMark },
  { name: 'Linear',    Mark: LinearMark    },
];

export function BrandStrip() {
  return (
    <div className="w-full overflow-hidden py-10 marquee-track">
      <div className="flex items-center gap-6 animate-marquee" style={{ width: 'max-content' }}>
        {[...BRANDS, ...BRANDS].map(({ name, Mark }, i) => (
          <div
            key={i}
            className="brand-chip flex items-center gap-2.5 whitespace-nowrap select-none px-5 py-2.5 rounded-full"
          >
            {/* Icon with subtle glow */}
            <span className="brand-icon flex items-center">
              <Mark />
            </span>
            {/* Name */}
            <span className="brand-name font-semibold tracking-widest uppercase" style={{ fontSize: '0.78rem' }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
