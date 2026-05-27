'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = ['Work', 'Services', 'About', 'Blog'];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setVisible(y < lastScrollY.current || y < 100);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: visible ? 0 : -80 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
          scrolled
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span
              className="text-white font-bold text-xl tracking-tight"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              NEXUS
            </span>
            <span className="hidden sm:block text-white/30 text-xs mono-caption">
              AI automation, built for scale.
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm text-white/70 border border-white/10 rounded-md hover:bg-white/[0.04] hover:text-white transition-all duration-200">
              For agencies
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-md shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_28px_rgba(124,58,237,0.5)] transition-all duration-200 group">
              Book a call
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/[0.06] p-6 space-y-4 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="block text-white/70 hover:text-white text-lg"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button className="w-full px-4 py-3 text-sm text-white/70 border border-white/10 rounded-md">
                For agencies
              </button>
              <button className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-md">
                Book a call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
