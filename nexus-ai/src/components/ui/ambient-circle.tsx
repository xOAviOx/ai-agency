'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ConcentricCircles } from '@/components/ui/concentric-circles';

/* Faint, slowly-rotating concentric rings used as a decorative backdrop on the
   inner pages (about, process, blog) so they feel alive and on-brand. */
export function AmbientCircle({
  size = 560,
  className = 'pointer-events-none absolute -right-40 -top-24 opacity-[0.12]',
}: {
  size?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div className={className} aria-hidden="true">
      <motion.div
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <ConcentricCircles size={size} />
      </motion.div>
    </div>
  );
}
