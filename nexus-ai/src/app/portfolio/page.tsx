import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import { CalendlyButton } from '@/components/ui/calendly-button';
import { VoiceAgentCard } from '@/components/ui/voice-agent-card';
import { WebsitePreview } from '@/components/ui/website-preview';
import { Reveal } from '@/components/ui/reveal';
import { AmbientCircle } from '@/components/ui/ambient-circle';

export const metadata: Metadata = {
  title: 'Portfolio — NEXUS',
  description: 'Websites we’ve shipped and AI voice agents you can try live.',
};

/* Live deployed builds. `url` is the real link; each card renders a scaled-down
   live <iframe> preview of the site (see WebsitePreview). The from/to gradient is
   the loading placeholder + fallback if a host ever refuses embedding. */
type Website = { name: string; tag: string; blurb: string; url: string; from: string; to: string };
const WEBSITES: Website[] = [
  // ── Dental ──
  { name: 'Ramirez Dentals', tag: 'Dental', blurb: 'Modern luxury dental clinic with a sleek dark-mode interface, featuring pain-free cosmetic and general dentistry services.', url: 'https://ramirez-dentals.netlify.app', from: '#0EA5E9', to: '#2563EB' },
  { name: 'The Dental Healthcare', tag: 'Dental', blurb: 'Premium luxury dental practice specializing in pain-free treatments, with elegant branding and comprehensive service offerings.', url: 'https://the-dental-healthcare.netlify.app', from: '#0EA5E9', to: '#2563EB' },
  { name: 'Tooth Fairy Dental Clinic', tag: 'Dental', blurb: 'Professional family dental clinic in Pretoria run by Dr. Lekota, offering anxiety-free care from general to cosmetic dentistry.', url: 'https://tooth-fairy-dental-clinic.netlify.app', from: '#0EA5E9', to: '#2563EB' },
  { name: 'Swarnim Dental Care', tag: 'Dental', blurb: 'Premium healthcare-focused dental practice with modern design, offering comprehensive services with patient comfort as priority.', url: 'https://swarnim-dental-clinic.netlify.app', from: '#0EA5E9', to: '#2563EB' },
  // ── Fitness ──
  { name: 'thejonitaj GYM', tag: 'Fitness', blurb: 'High-energy fitness hub with bold branding, featuring training programs and community-driven workout experiences.', url: 'https://thejonitaj-gym.netlify.app', from: '#F97316', to: '#DC2626' },
  { name: 'CrossFit Nîmes', tag: 'Fitness', blurb: 'Performance-focused CrossFit facility in Nîmes with a brutalist design aesthetic and structured training programs.', url: 'https://crossfit-nimes-gym.netlify.app', from: '#F97316', to: '#DC2626' },
  { name: 'Levo Gym & Rehabilitation', tag: 'Fitness', blurb: 'Premium fitness and specialized rehabilitation center in Kuwait City combining strength training with medical-grade recovery.', url: 'https://levo-gym.netlify.app', from: '#F97316', to: '#DC2626' },
  { name: 'FORGEE', tag: 'Fitness', blurb: 'High-performance training facility with bold typography and motivational positioning, pushing athletic boundaries.', url: 'https://forgee-gym.netlify.app', from: '#F97316', to: '#DC2626' },
  // ── Legal ──
  { name: 'Caravelli', tag: 'Legal', blurb: 'Boutique international law firm established in Geneva in 1958, specializing in financial regulation, white-collar defense and sovereign matters.', url: 'https://caravelli.netlify.app', from: '#6366F1', to: '#1E3A8A' },
  { name: 'Ashworth & Rowe', tag: 'Legal', blurb: 'Premier independent law firm since 1962, advising corporations, institutions and private clients with sophisticated counsel.', url: 'https://asworth-rowe-firm.netlify.app', from: '#6366F1', to: '#1E3A8A' },
  { name: 'Sterling, Kato & Moreau', tag: 'Legal', blurb: 'Transatlantic litigation firm founded in Boston in 1894, practicing commercial litigation, antitrust, IP and crisis management.', url: 'https://sterling-kato-moreau-firm.netlify.app', from: '#6366F1', to: '#1E3A8A' },
  { name: 'Nakamura Voss', tag: 'Legal', blurb: 'Technology and venture law firm in Palo Alto since 2011, advising founders on venture capital, M&A, IP strategy and AI governance.', url: 'https://nakamura-voss.netlify.app', from: '#6366F1', to: '#1E3A8A' },
];

/* Live voice demos — wired to ElevenLabs Conversational AI (see src/lib/voice-demo.ts).
   Agent ids resolve from NEXT_PUBLIC_EL_AGENT_* env vars at runtime. */
const VOICE_AGENTS = [
  { id: 'reception', name: 'Reception AI', use: 'Answers inbound calls, books appointments, and routes urgent ones to a human.' },
  { id: 'lead-qualifier', name: 'Lead Qualifier', use: 'Calls new leads within seconds, qualifies them, and books a demo on your calendar.' },
  // 'support-line' parked — agent errors server-side ("technical issues"); re-add once its
  // ElevenLabs config is fixed (set NEXT_PUBLIC_EL_AGENT_SUPPORT + restore the entry).
];

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
        <section id="websites" className="relative mx-auto max-w-[1280px] px-6 md:px-12 pb-28 scroll-mt-28">
          <Reveal>
            <h2 className="display-l text-white mb-3" style={{ fontSize: '2rem' }}>
              Websites
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="body-l text-white/50 mb-12 max-w-xl">
              Live builds across dental, fitness, and legal — each card is a real,
              scaled-down preview of the deployed site. Click any to open it.
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
                    <WebsitePreview from={site.from} to={site.to} url={site.url} title={site.name} />
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
        <section id="voice-agents" className="relative mx-auto max-w-[1280px] px-6 md:px-12 pb-32 scroll-mt-28">
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
