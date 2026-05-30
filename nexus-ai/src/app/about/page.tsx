import type { Metadata } from 'next';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import { CalendlyButton } from '@/components/ui/calendly-button';
import { Reveal } from '@/components/ui/reveal';
import { AmbientCircle } from '@/components/ui/ambient-circle';

export const metadata: Metadata = {
  title: 'About — NEXUS',
  description: 'Who we are and how we build AI automation that feels in-house.',
};

const STATS = [
  { value: '40+', label: 'Automations shipped' },
  { value: '1 wk', label: 'Avg. delivery time' },
  { value: '96%', label: 'Client retention' },
];

const TEAM = [
  { initials: 'AS', name: 'Avi Shukla', role: 'Founder / AI Engineer', color: '#7C3AED' },
  { initials: 'AM', name: 'Aaritya Mishra', role: 'Design Lead & CR', color: '#059669' },
  { initials: 'HD', name: 'Harsheet Diwedi', role: 'Automation Strategist', color: '#2563EB' },
  { initials: 'DC', name: 'Dev Chen', role: 'Full-stack Engineer', color: '#D97706' },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
        <AmbientCircle />

        {/* ── Hero ── */}
        <section className="relative mx-auto max-w-[1280px] px-6 md:px-12 pt-36 pb-24 md:pt-44">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2">
              <div className="h-px w-4 bg-violet-500" />
              <span className="mono-caption text-violet-400">About NEXUS</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-xl text-white max-w-4xl mb-6">
              We build AI that works like it was always part of your team.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="body-l text-white/60 max-w-2xl mb-10">
              NEXUS is an AI automation agency. We design and ship custom agents,
              workflows, and high-performance websites for teams that want to move
              faster without adding headcount.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <CalendlyButton />
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-3xl">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.3 + i * 0.08}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30">
                  <p className="display-l text-white mb-2">{s.value}</p>
                  <p className="mono-caption text-white/40">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Team (anchor target for "Meet the makers") ── */}
        <section
          id="team"
          className="relative mx-auto max-w-[1280px] px-6 md:px-12 pb-32 scroll-mt-28"
        >
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2">
              <div className="h-px w-4 bg-violet-500" />
              <span className="mono-caption text-violet-400">Meet the makers</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-l text-white max-w-2xl mb-4">
              The people who build your automations.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="body-l text-white/55 max-w-2xl mb-12">
              A focused team of four. No account managers, no telephone games — you
              work directly with the engineers and designers shipping your project.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30">
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white"
                    style={{ background: member.color }}
                  >
                    {member.initials}
                  </div>
                  <p className="text-white font-medium text-lg leading-tight font-display">
                    {member.name}
                  </p>
                  <p className="mono-caption text-white/40 mt-2">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
