/* Single source for the booking link. Every "Book a call" / "Start a project"
   button calls openCalendly(). Calendly emails the host automatically on every
   booking — that built-in notification is the "notify me". */

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

/** 👉 REPLACE with your real Calendly scheduling link. */
export const CALENDLY_URL = 'https://calendly.com/REPLACE-ME/intro-call';

const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css';
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js';

let loader: Promise<void> | null = null;

/** Lazy-load Calendly's widget the first time a button is clicked (keeps it off
   the initial page load). */
function ensureCalendly(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    if (!document.querySelector('link[data-calendly]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CALENDLY_CSS;
      link.dataset.calendly = '';
      document.head.appendChild(link);
    }
    const script = document.createElement('script');
    script.src = CALENDLY_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Calendly failed to load'));
    document.body.appendChild(script);
  });
  return loader;
}

/** Open the Calendly popup. Falls back to a new tab if the widget can't load. */
export async function openCalendly(): Promise<void> {
  try {
    await ensureCalendly();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      return;
    }
  } catch {
    loader = null; // allow a retry on the next click
  }
  window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
}
