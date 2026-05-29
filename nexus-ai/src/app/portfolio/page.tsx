import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import { CalendlyButton } from '@/components/ui/calendly-button';
import { VoiceAgentCard } from '@/components/ui/voice-agent-card';
import { Reveal } from '@/components/ui/reveal';
import { AmbientCircle } from '@/components/ui/ambient-circle';

export const metadata: Metadata = {
  title: 'Portfolio — NEXUS',
  description: 'Websites we’ve shipped and AI voice agents you can try live.',
};

/* NOTE: placeholder projects — replace name/tag/blurb/url (+ live screenshot) per
   site. Set `url` to the real live link; '#' renders as a non-clicking demo card. */
type Website = { name: string; tag: string; blurb: string; url: string; from: string; to: string };
const WEBSITES: Website[] = [
  { name: 'Aurora Analytics', tag: 'SaaS', blurb: 'Marketing site + dashboard for a B2B analytics startup.', url: '#', from: '#7C3AED', to: '#2563EB' },
  { name: 'Bistro Nine', tag: 'Hospitality', blurb: 'Reservations-ready site for a fine-dining restaurant.', url: '#', from: '#D97706', to: '#DC2626' },
  { name: 'Volt Commerce', tag: 'E-commerce', blurb: 'Headless storefront with AI-powered product search.', url: '#', from: '#059669', to: '#2563EB' },
  { name: 'Lumen Health', tag: 'Healthcare', blurb: 'Patient intake + booking site with a privacy-first build.', url: '#', from: '#2563EB', to: '#7C3AED' },
  { name: 'Forge Studio', tag: 'Agency', blurb: 'Portfolio site with scroll-driven motion and case studies.', url: '#', from: '#7C3AED', to: '#DC2626' },
  { name: 'Nomad Travel', tag: 'Marketplace', blurb: 'Trip-planning marketplace with an AI itinerary builder.', url: '#', from: '#059669', to: '#D97706' },
];

/* NOTE: placeholder voice agents — "Try it" is a stub until you add a platform
   (see src/lib/voice-demo.ts). */
const VOICE_AGENTS = [
  { id: 'reception', name: 'Reception AI', use: 'Answers inbound calls, books appointments, and routes urgent ones to a human.' },
  { id: 'lead-qualifier', name: 'Lead Qualifier', use: 'Calls new leads within seconds, qualifies them, and books a demo on your calendar.' },
  { id: 'support-line', name: 'Support Line', use: 'Handles tier-1 support 24/7 in natural conversation, escalating when needed.' },
];

function WebsiteThumb({ from, to }: { from: string; to: string }) {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-t-2xl border-b border-white/[0.08]">
      {/* fake browser chrome */}
      <div className="flex items-center gap-1.5 bg-white/[0.04] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
      </div>
      {/* gradient "screenshot" */}
      <div
        className="h-full w-full"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})`, opacity: 0.5 }}
      />
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
        <AmbientCircle />

        {/* ── Hero ── */}
        <section className="relative mx-auto max-w-[1280px] px-6 md:px-12 pt-36 pb-16 md:pt-44">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2">
              <div className="h-px w-4 bg-violet-500" />
              <span className="mono-caption text-violet-400">Portfolio</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-xl text-white max-w-4xl mb-6">
              Work we&apos;ve shipped — and agents you can talk to.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="body-l text-white/60 max-w-2xl mb-10">
              A look at the websites we&apos;ve built and the AI voice agents we run.
              Try a live demo, or browse the builds.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <CalendlyButton label="Start a project" />
          </Reveal>
        </section>

        {/* ── Websites ── */}
        <section className="relative mx-auto max-w-[1280px] px-6 md:px-12 pb-28">
          <Reveal>
            <h2 className="display-l text-white mb-3" style={{ fontSize: '2rem' }}>
              Websites
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="body-l text-white/50 mb-12 max-w-xl">
              High-performance sites — fast, animated, and built to convert.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WEBSITES.map((site, i) => {
              const isLive = site.url.startsWith('http');
              return (
                <Reveal key={site.name} delay={i * 0.06}>
                  <a
                    href={site.url}
                    {...(isLive ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30"
                  >
                    <WebsiteThumb from={site.from} to={site.to} />
                    <div className="flex flex-1 flex-col p-6">
                      <span className="mono-caption text-violet-400 mb-3">{site.tag}</span>
                      <h3 className="text-white text-lg font-medium mb-2 font-display">{site.name}</h3>
                      <p className="text-sm text-white/55 leading-relaxed mb-5">{site.blurb}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-violet-300 group-hover:text-violet-200">
                        {isLive ? 'Visit site' : 'Coming soon'}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── AI Voice Agents ── */}
        <section className="relative mx-auto max-w-[1280px] px-6 md:px-12 pb-32">
          <Reveal>
            <div className="mb-3 inline-flex items-center gap-2">
              <div className="h-px w-4 bg-violet-500" />
              <span className="mono-caption text-violet-400">Live demos</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-l text-white mb-3" style={{ fontSize: '2rem' }}>
              AI Voice Agents
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="body-l text-white/50 mb-12 max-w-xl">
              Tap &ldquo;Try it&rdquo; to talk to a live agent — the same kind we deploy for clients.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {VOICE_AGENTS.map((agent, i) => (
              <Reveal key={agent.id} delay={i * 0.08}>
                <VoiceAgentCard id={agent.id} name={agent.name} use={agent.use} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
