'use client';

const BRANDS = [
  'Figma',
  'Notion',
  'Stripe',
  'Vercel',
  'HSBC',
  'Porsche',
  'Adobe',
  'Bloomberg',
  'Linear',
  'Intercom',
];

export function BrandStrip() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(10,10,11,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <p className="text-center mono-caption text-white/20 pt-5 mb-4">
        Trusted by forward-thinking teams
      </p>
      <div className="overflow-hidden marquee-track pb-5">
        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span
              key={i}
              className="mx-10 text-white/30 font-semibold text-sm tracking-widest mono-caption whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
