'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scrollToHash, scrollToTop } from '@/lib/smooth-scroll';
import { openCalendly } from '@/lib/booking';

/* Hash targets (e.g. "#work") smooth-scroll on the home page; route targets
   (e.g. "/about") navigate to a real page. */
type NavLink = { label: string; target: string };

const NAV_LINKS: NavLink[] = [
  { label: 'Work', target: '#work' },
  { label: 'Services', target: '#services' },
  { label: 'About', target: '/about' },
  { label: 'Blog', target: '/blog' },
];

/* ── Navigation ─────────────────────────────────────────────── */
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Go to a hash (smooth-scroll when already home, else route home + hash) or
     a real page route. Always closes the mobile drawer. */
  const goTo = (target: string) => {
    setMobileOpen(false);
    if (target.startsWith('#')) {
      if (pathname === '/') scrollToHash(target);
      else router.push(`/${target}`);
    } else {
      router.push(target);
    }
  };

  const onLogo = () => {
    setMobileOpen(false);
    if (pathname === '/') scrollToTop();
    else router.push('/');
  };

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
            <button
              type="button"
              onClick={onLogo}
              aria-label="Back to top"
              className="text-white font-bold text-xl tracking-tight select-none cursor-pointer bg-transparent border-0 p-0"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              NEXUS
            </button>
            <span className="hidden lg:block text-white/35 text-[13px] font-medium tracking-wide select-none">
              Exceptional automation, seamless execution.
            </span>
          </div>

          {/* Center Side: Nav Links (Clean Text Transitions) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.target.startsWith('#') ? (
                <a
                  key={link.label}
                  href={`/${link.target}`}
                  onClick={(e) => {
                    if (pathname === '/') {
                      e.preventDefault();
                      scrollToHash(link.target);
                    }
                  }}
                  className="text-sm font-medium text-white/55 hover:text-white transition-colors duration-250 font-body"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.target}
                  className="text-sm font-medium text-white/55 hover:text-white transition-colors duration-250 font-body"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Side: CTAs matching video colors and structure exactly */}
          <div className="hidden md:flex items-center gap-4">
            {/* Ghost button with plus sign */}
            <button
              type="button"
              onClick={() => goTo('#agencies')}
              className="px-5 py-2.5 text-xs font-semibold text-white/70 hover:text-white border border-white/10 rounded-full hover:bg-white/[0.03] transition-all duration-200 flex items-center gap-1.5 cursor-pointer font-body"
            >
              For agencies
              <span className="text-white/40">+</span>
            </button>

            {/* Primary button: solid violet capsule with up-right arrow */}
            <button
              type="button"
              onClick={() => goTo('#contact')}
              className="px-5.5 py-2.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer font-body shadow-[0_4px_15px_rgba(124,58,237,0.25)] hover:scale-[1.02] active:scale-[0.98]"
            >
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
                <button
                  key={link.label}
                  type="button"
                  onClick={() => goTo(link.target)}
                  className="block text-left text-white/75 hover:text-white text-base font-medium py-2.5 px-4 rounded-xl hover:bg-white/[0.04] transition-colors font-body"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => goTo('#agencies')}
                className="w-full py-3 text-xs font-semibold text-white/70 border border-white/10 rounded-full hover:bg-white/5 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 font-body"
              >
                For agencies
                <span className="text-white/40">+</span>
              </button>
              <button
                type="button"
                onClick={() => goTo('#contact')}
                className="w-full py-3 text-xs font-bold text-white bg-violet-600 rounded-full cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(124,58,237,0.25)] font-body"
              >
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
