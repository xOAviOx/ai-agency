import type Lenis from 'lenis';

/* A tiny singleton bridge so any component (e.g. the nav) can drive the single
   Lenis instance created in <LenisProvider/> without prop-drilling or context. */
let _lenis: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  _lenis = lenis;
}

/* Pixels to leave above a target so the fixed 80px (h-20) header never covers it. */
const HEADER_OFFSET = -88;

/** Smooth-scroll to an in-page anchor like "#services". */
export function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (_lenis) {
    _lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

/** Smooth-scroll back to the very top of the page. */
export function scrollToTop() {
  if (_lenis) _lenis.scrollTo(0, { duration: 1.2 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}
