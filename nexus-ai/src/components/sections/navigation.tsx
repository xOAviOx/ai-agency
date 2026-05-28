'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = ['Work', 'Services', 'About', 'Blog'];

/* ── Animated nav link — underline expands from center ──────── */
function NavLink({ label }: { label: string }) {
  return (
    <motion.a
      href="#"
      className="relative text-sm text-white/55 hover:text-white transition-colors duration-200 py-1"
      whileHover="hover"
      initial="rest"
    >
      {label}
      {/* Underline: collapses to zero at center, expands to full width on hover */}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-px bg-white/70"
        style={{ originX: '50%' }}
        variants={{
          rest: { scaleX: 0, opacity: 0 },
          hover: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.a>
  );
}

/* ── Ghost button — magnetic + border-glow ──────────────────── */
function GhostBtn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16 });
  const sy = useSpring(y, { stiffness: 200, damping: 16 });
  const reduced = useReducedMotion();

  const move = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width  / 2)) * 0.28);
    y.set((e.clientY - (r.top  + r.height / 2)) * 0.28);
  }, [x, y, reduced]);

  const leave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      variants={{
        rest: {
          scale: 1,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.09), 0 0 0px rgba(255,255,255,0)',
        },
        hover: {
          scale: 1.04,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.30), 0 0 16px rgba(255,255,255,0.06)',
        },
        tap: { scale: 0.97 },
      }}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseMove={move}
      onMouseLeave={leave}
      className="px-4 py-2 text-sm text-white/65 hover:text-white rounded-md transition-colors duration-200 bg-transparent"
    >
      {children}
    </motion.button>
  );
}

/* ── Primary nav button — magnetic + shimmer + arrow spring ─── */
function PrimaryNavBtn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  const reduced = useReducedMotion();

  const move = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width  / 2)) * 0.28);
    y.set((e.clientY - (r.top  + r.height / 2)) * 0.28);
  }, [x, y, reduced]);

  const leave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      variants={{
        rest:  { scale: 1 },
        hover: { scale: 1.05 },
        tap:   { scale: 0.96 },
      }}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      onMouseMove={move}
      onMouseLeave={leave}
      className="btn-primary relative overflow-hidden flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-md group"
    >
      <span className="btn-shimmer-line" aria-hidden />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <motion.span
          variants={{ rest: { x: 0 }, hover: { x: 4 } }}
          transition={{ type: 'spring', stiffness: 380, damping: 20 }}
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.span>
      </span>
    </motion.button>
  );
}

/* ── Navigation ─────────────────────────────────────────────── */
export function Navigation() {
  const [scrolled,    setScrolled]    = useState(false);
  const [visible,     setVisible]     = useState(true);
  const [mobileOpen,  setMobileOpen]  = useState(false);
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

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link} label={link} />
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <GhostBtn>For agencies</GhostBtn>
            <PrimaryNavBtn>Book a call</PrimaryNavBtn>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
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
                className="block text-white/70 hover:text-white text-lg transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button className="w-full px-4 py-3 text-sm text-white/70 border border-white/10 rounded-md hover:bg-white/5 transition-colors duration-200">
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
