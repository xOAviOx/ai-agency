'use client';

import { motion, MotionValue } from 'framer-motion';

interface CircleConfig {
  radiusFraction: number; // fraction of size/2
  strokeOpacity: number;
  notchDeg?: number; // degrees of gap on right side; omit = full circle
  strokeWidth?: number;
}

const CIRCLE_CONFIGS: CircleConfig[] = [
  { radiusFraction: 0.12, strokeOpacity: 0.30 },
  { radiusFraction: 0.20, strokeOpacity: 0.25 },
  { radiusFraction: 0.29, strokeOpacity: 0.20 },
  { radiusFraction: 0.38, strokeOpacity: 0.17, notchDeg: 28 },
  { radiusFraction: 0.47, strokeOpacity: 0.13, notchDeg: 38 },
];

interface NotchedArcProps {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  notchDeg: number;
  strokeWidth: number;
}

function NotchedArc({ cx, cy, r, opacity, notchDeg, strokeWidth }: NotchedArcProps) {
  const circ = 2 * Math.PI * r;
  const gapLen = circ * (notchDeg / 360);
  const mainLen = circ - gapLen;

  // Center the gap at 3 o'clock; dashoffset shifts the start of the dash array
  const offset = gapLen / 2;

  // Tick marks at each edge of the notch (the "bezel" steps)
  const halfDeg = notchDeg / 2;
  const tickGroups = [halfDeg, -halfDeg]; // both edges of gap
  const ticks: { x1: number; y1: number; x2: number; y2: number; o: number }[] = [];

  tickGroups.forEach((baseDeg) => {
    // Draw 3 small radial ticks decreasing in size toward the gap center
    for (let i = 0; i < 3; i++) {
      const tickDeg = baseDeg + (baseDeg > 0 ? -i * 5 : i * 5);
      const rad = ((tickDeg - 90) * Math.PI) / 180; // -90 so 0deg = top in my coord
      // Actually keep 3 o'clock = 0deg in SVG coordinates: angle = tickDeg * (Math.PI / 180)
      const svgRad = (tickDeg * Math.PI) / 180;
      const innerR = r - (3 - i) * 3;
      const outerR = r + (3 - i) * 2.5;
      ticks.push({
        x1: cx + innerR * Math.cos(svgRad),
        y1: cy + innerR * Math.sin(svgRad),
        x2: cx + outerR * Math.cos(svgRad),
        y2: cy + outerR * Math.sin(svgRad),
        o: opacity * (1 - i * 0.25),
      });
    }
  });

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="white"
        strokeWidth={strokeWidth}
        strokeOpacity={opacity}
        strokeDasharray={`${mainLen} ${gapLen}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="white"
          strokeWidth={0.8}
          strokeOpacity={t.o}
        />
      ))}
    </g>
  );
}

interface ConcentricCirclesProps {
  size: number;
  rotation?: number | MotionValue<number>;
  opacity?: number;
  className?: string;
}

export function ConcentricCircles({
  size,
  rotation = 0,
  opacity = 1,
  className,
}: ConcentricCirclesProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{
        // Framer Motion accepts both number and MotionValue<number> for rotate
        rotate: rotation,
        opacity,
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      {CIRCLE_CONFIGS.map((cfg, i) => {
        const r = maxR * cfg.radiusFraction;
        const sw = cfg.strokeWidth ?? 1;
        if (cfg.notchDeg) {
          return (
            <NotchedArc
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              opacity={cfg.strokeOpacity}
              notchDeg={cfg.notchDeg}
              strokeWidth={sw}
            />
          );
        }
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="white"
            strokeWidth={sw}
            strokeOpacity={cfg.strokeOpacity}
          />
        );
      })}
    </motion.svg>
  );
}
