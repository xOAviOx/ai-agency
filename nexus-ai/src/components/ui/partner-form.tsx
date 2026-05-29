'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check, Loader2 } from 'lucide-react';

/* 👉 Get a free key at https://web3forms.com — enter avishuklacode@gmail.com and
   submissions land in that inbox. The key is PUBLIC by design (safe in client
   code). Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local, or replace the fallback. */
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '5f06f556-b045-4fa4-89aa-824a2e64e3a6';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full rounded-md border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-white/30 transition-colors focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/40';

export function PartnerForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Reset to a fresh form whenever it re-opens.
  useEffect(() => {
    if (open) {
      setStatus('idle');
      setErrorMsg('');
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (WEB3FORMS_ACCESS_KEY.includes('REPLACE')) {
      setStatus('error');
      setErrorMsg('Form not configured yet — add your Web3Forms access key.');
      return;
    }

    setStatus('submitting');
    const payload = Object.fromEntries(new FormData(form));
    payload.access_key = WEB3FORMS_ACCESS_KEY;
    payload.subject = 'New agency partnership inquiry — NEXUS';
    payload.from_name = 'NEXUS website';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg(data.message ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again or email us directly.');
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
          aria-label="Partner with us"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111113] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {status === 'success' ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="display-l mb-2 text-white" style={{ fontSize: '1.5rem' }}>
                  Request sent.
                </h3>
                <p className="body-l mb-7 text-white/55" style={{ fontSize: '0.95rem' }}>
                  Thanks — we&apos;ll get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-white/10 px-6 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="mb-1 inline-flex items-center gap-2">
                  <div className="h-px w-4 bg-violet-500" />
                  <span className="mono-caption text-violet-400">For agencies</span>
                </div>
                <h3 className="display-l mb-2 text-white" style={{ fontSize: '1.6rem' }}>
                  Partner with us
                </h3>
                <p className="mb-6 text-sm text-white/55">
                  Tell us about your agency and what you need. We reply within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  {/* Honeypot — hidden from humans, catches bots. */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pf-name" className="mono-caption text-white/40">
                      Your name
                    </label>
                    <input id="pf-name" name="name" required className={inputClass} placeholder="Jane Doe" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pf-agency" className="mono-caption text-white/40">
                      Agency
                    </label>
                    <input
                      id="pf-agency"
                      name="agency"
                      required
                      className={inputClass}
                      placeholder="Studio / agency name"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pf-email" className="mono-caption text-white/40">
                      Work email
                    </label>
                    <input
                      id="pf-email"
                      name="email"
                      type="email"
                      required
                      className={inputClass}
                      placeholder="you@agency.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pf-message" className="mono-caption text-white/40">
                      What do you need?
                    </label>
                    <textarea
                      id="pf-message"
                      name="message"
                      rows={3}
                      required
                      className={`${inputClass} resize-none`}
                      placeholder="White-label AI builds, overflow capacity, a specific project…"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-red-400" role="alert">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="mt-1 flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-violet-600 to-violet-700 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(124,58,237,0.35)] transition-all duration-200 hover:shadow-[0_0_45px_rgba(124,58,237,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send request
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
