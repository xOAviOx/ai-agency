import type { Metadata } from 'next';
import { Compass, PenTool, Code2, Rocket, LifeBuoy, Activity, ShieldCheck, Clock } from 'lucide-react';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import { CalendlyButton } from '@/components/ui/calendly-button';
import { Reveal } from '@/components/ui/reveal';
import { AmbientCircle } from '@/components/ui/ambient-circle';

export const metadata: Metadata = {
  title: 'Our Process — NEXUS',
  description: 'How we ship AI automation: fast, monitored, and built to last.',
};

const STEPS = [
  {
    icon: Compass,
    title: 'Discover',
    body: 'We map your workflows, find the highest-leverage automation, and scope it — no fluff, no boilerplate.',
  },
  {
    icon: PenTool,
    title: 'Design',
    body: 'We architect the solution — agents, integrations, data flows — and align it with you before a line of code.',
  },
  {
    icon: Code2,
    title: 'Build',
    body: 'Senior engineers build in tight sprints. You see working progress, not status meetings.',
  },
  {
    icon: Rocket,
    title: 'Deploy',
    body: 'We ship to production with monitoring, validation, and rollback safety from day one.',
  },
  {
    icon: LifeBuoy,
    title: 'Support',
    body: 'We monitor, maintain, and iterate. The system keeps running — and keeps getting better.',
  },
];

const STANDARDS = [
  {
    icon: Activity,
    title: '99.9%+ monitored uptime',
    body: 'Every deployment ships with live monitoring and alerting, so issues are caught before you feel them.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & data handling',
    body: 'Least-privilege access, encrypted secrets, and GDPR-ready data practices baked into every build.',
  },
  {
    icon: Code2,
    title: 'Self-healing architecture',
    body: 'Multi-agent routing with validation and retries — solutions that recover instead of breaking at scale.',
  },
  {
    icon: Clock,
    title: 'Fast, predictable delivery',
    body: 'A typical build ships in around a week, with clear scope and milestones agreed up front.',
  },
];

export default function ProcessPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
        <AmbientCircle />

        {/* ── Hero ── */}
        <section className="relative mx-auto max-w-[1280px] px-6 md:px-12 pt-36 pb-20 md:pt-44">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2">
              <div className="h-px w-4 bg-violet-500" />
              <span className="mono-caption text-violet-400">Our process</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-xl text-white max-w-4xl mb-6">
              How we ship — fast, and built to last.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="body-l text-white/60 max-w-2xl mb-10">
              A single synchronized team, not a chain of freelancers. Here&apos;s how a
              NEXUS engagement runs from first call to live system.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <CalendlyButton label="Start a project" />
          </Reveal>
        </section>

        {/* ── Steps ── */}
        <section className="relative mx-auto max-w-[1280px] px-6 md:px-12 pb-28">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-violet-300">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="mono-caption text-white/25">0{i + 1}</span>
                  </div>
                  <h2 className="text-white text-lg font-medium mb-2 font-display">{step.title}</h2>
                  <p className="text-sm text-white/55 leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Standards & SLA (anchor target for "Our architecture SLA") ── */}
        <section
          id="standards"
          className="relative mx-auto max-w-[1280px] px-6 md:px-12 pb-32 scroll-mt-28"
        >
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2">
              <div className="h-px w-4 bg-violet-500" />
              <span className="mono-caption text-violet-400">The NEXUS Standard</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-l text-white max-w-2xl mb-4">
              Architecture &amp; SLA you can build a business on.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="body-l text-white/55 max-w-2xl mb-12">
              We don&apos;t just copy-paste prompts. Every system is engineered to perform
              flawlessly at scale — here&apos;s what that means in practice.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {STANDARDS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="flex h-full gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-violet-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-medium mb-2 font-display">{item.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Closing CTA */}
          <Reveal delay={0.1}>
            <div className="mt-16 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-10 text-center">
              <h2 className="display-l text-white mb-3" style={{ fontSize: '1.75rem' }}>
                Want this running in your business?
              </h2>
              <p className="body-l text-white/55 max-w-md mx-auto mb-8">
                Book a call and we&apos;ll scope the highest-leverage automation for your team.
              </p>
              <div className="flex justify-center">
                <CalendlyButton />
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
