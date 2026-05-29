import type { Metadata } from 'next';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import { CalendlyButton } from '@/components/ui/calendly-button';

export const metadata: Metadata = {
  title: 'About — NEXUS',
  description: 'Who we are and how we build AI automation that feels in-house.',
};

/* NOTE: placeholder copy — replace with the real agency story / team / mission
   once provided. The page shell, nav, and CTAs are already wired. */
const STATS = [
  { value: '—', label: 'Automations shipped' },
  { value: '—', label: 'Avg. delivery time' },
  { value: '—', label: 'Client retention' },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen" style={{ background: 'var(--bg)' }}>
        <section className="mx-auto max-w-[1280px] px-6 md:px-12 pt-36 pb-24 md:pt-44">
          <p className="mono-caption text-violet-400 mb-6">About NEXUS</p>
          <h1 className="display-xl text-white max-w-4xl mb-6">
            We build AI that works like it was always part of your team.
          </h1>
          <p className="body-l text-white/60 max-w-2xl mb-10">
            {/* TODO: replace with your real story. */}
            NEXUS is an AI automation agency. We design and ship custom agents,
            workflows, and high-performance websites for teams that want to move
            faster without adding headcount.
          </p>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-medium text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-md shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] transition-all duration-300 group"
          >
            Book a call
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-3xl">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-8"
              >
                <p className="display-l text-white mb-2">{s.value}</p>
                <p className="mono-caption text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
