'use client';

import { ArrowUpRight } from 'lucide-react';
import { openCalendly } from '@/lib/booking';

/* Primary booking button for use inside Server Components (about, blog pages),
   which can't attach onClick handlers themselves. */
export function CalendlyButton({ label = 'Book a call' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => openCalendly()}
      className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-medium text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-md shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] transition-all duration-300 group cursor-pointer"
    >
      {label}
      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}
