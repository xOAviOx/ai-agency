'use client';

interface RingDef {
  r: number;
  opacity: number;
  sw: number;
  dots?: number[];
  dashed?: boolean;
}

const RINGS: RingDef[] = [
  { r: 0.09,  opacity: 0.55, sw: 1.5 },
  { r: 0.18,  opacity: 0.40, sw: 1.2 },
  { r: 0.28,  opacity: 0.30, sw: 1.0 },
  { r: 0.38,  opacity: 0.22, sw: 1.0, dots: [315, 45, 135, 225] },
  { r: 0.51,  opacity: 0.15, sw: 0.8, dots: [270, 0, 90, 180] },
  { r: 0.64,  opacity: 0.10, sw: 0.8, dashed: true },
  { r: 0.79,  opacity: 0.06, sw: 0.7 },
  { r: 0.92,  opacity: 0.03, sw: 0.6 },
];

interface HeroCircleProps {
  size: number;
  className?: string;
}

export function HeroCircle({ size, className }: HeroCircleProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Dark sphere fill — deep purple-black core fading to transparent */}
        <radialGradient id="hcFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1e0845" stopOpacity="0.92" />
          <stop offset="35%"  stopColor="#130528" stopOpacity="0.80" />
          <stop offset="70%"  stopColor="#0a0a0b" stopOpacity="0.50" />
          <stop offset="100%" stopColor="#0a0a0b" stopOpacity="0.00" />
        </radialGradient>
        {/* Outer purple halo */}
        <radialGradient id="hcHalo" cx="50%" cy="50%" r="50%">
          <stop offset="62%" stopColor="transparent" />
          <stop offset="82%" stopColor="#7c3aed"   stopOpacity="0.07" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* Glow filter for bright dots */}
        <filter id="hcDotGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer purple halo (subtly pulses via parent rotate) */}
      <circle cx={cx} cy={cy} r={maxR} fill="url(#hcHalo)" />

      {/* Dark sphere */}
      <circle cx={cx} cy={cy} r={maxR * 0.90} fill="url(#hcFill)" />

      {/* Rings + dots */}
      {RINGS.map((ring, i) => {
        const r = maxR * ring.r;
        const dashLen = r * 0.28;
        const gapLen  = r * 0.08;
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="white"
              strokeWidth={ring.sw}
              strokeOpacity={ring.opacity}
              strokeDasharray={ring.dashed ? `${dashLen} ${gapLen}` : undefined}
            />
            {ring.dots?.map((deg, di) => {
              const rad = (deg * Math.PI) / 180;
              const dx = cx + r * Math.cos(rad);
              const dy = cy + r * Math.sin(rad);
              return (
                <g key={di} filter="url(#hcDotGlow)">
                  {/* Outer glow halo */}
                  <circle cx={dx} cy={dy} r={4.5} fill="white" fillOpacity={0.12} />
                  {/* Core bright dot */}
                  <circle cx={dx} cy={dy} r={1.8} fill="white" fillOpacity={0.9} />
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Tiny centre point */}
      <circle cx={cx} cy={cy} r={3} fill="white" fillOpacity={0.12} />
      <circle cx={cx} cy={cy} r={1.5} fill="white" fillOpacity={0.35} />
    </svg>
  );
}
