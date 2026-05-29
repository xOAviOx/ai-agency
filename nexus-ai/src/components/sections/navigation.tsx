'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = ['Work', 'Services', 'About', 'Blog'];

/* ── Navigation ─────────────────────────────────────────────── */
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-colors duration-300 border-b',
          scrolled
            ? 'bg-[#0A0A0B]/80 backdrop-blur-xl border-white/[0.06]'
            : 'bg-transparent border-transparent'
        )}
      >
        <div className="w-full mx-auto max-w-[1280px] px-6 md:px-12 flex items-center justify-between">
          {/* Left Side: Logo + Structural Text (Matching SALO Exactly) */}
          <div className="flex items-center gap-5">
            <span
              className="text-white font-bold text-xl tracking-tight select-none cursor-pointer"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              NEXUS
            </span>
            <span className="hidden lg:block text-white/35 text-[13px] font-medium tracking-wide select-none">
              Exceptional automation, seamless execution.
            </span>
          </div>

          {/* Center Side: Nav Links (Clean Text Transitions) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-white/55 hover:text-white transition-colors duration-250 font-body"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right Side: CTAs matching video colors and structure exactly */}
          <div className="hidden md:flex items-center gap-4">
            {/* Ghost button with plus sign */}
            <button className="px-5 py-2.5 text-xs font-semibold text-white/70 hover:text-white border border-white/10 rounded-full hover:bg-white/[0.03] transition-all duration-200 flex items-center gap-1.5 cursor-pointer font-body">
              For agencies
              <span className="text-white/40">+</span>
            </button>
            
            {/* Primary button: solid violet capsule with up-right arrow */}
            <button className="px-5.5 py-2.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer font-body shadow-[0_4px_15px_rgba(124,58,237,0.25)] hover:scale-[1.02] active:scale-[0.98]">
              Book a call
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white flex items-center justify-center h-9 w-9 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-2xl border-b border-white/[0.06] p-6 space-y-5 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-white/75 hover:text-white text-base font-medium py-2.5 px-4 rounded-xl hover:bg-white/[0.04] transition-colors font-body"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 text-xs font-semibold text-white/70 border border-white/10 rounded-full hover:bg-white/5 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 font-body">
                For agencies
                <span className="text-white/40">+</span>
              </button>
              <button className="w-full py-3 text-xs font-bold text-white bg-violet-600 rounded-full cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(124,58,237,0.25)] font-body">
                Book a call
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
