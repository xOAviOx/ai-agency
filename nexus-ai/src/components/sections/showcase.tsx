'use client';

import { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Project data ───────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    tag: 'AI Automation',
    tagColor: '#7C3AED',
    title: 'Cutting support tickets by 60% with an AI triage agent',
    summary: 'Built a GPT-4o powered classifier that routes, labels, and drafts responses for 800+ tickets/day.',
    type: 'browser',
    gradientFrom: '#1e1040',
    gradientTo: '#0a0820',
    rotation: -3,
  },
  {
    id: 2,
    tag: 'Custom Website',
    tagColor: '#2563EB',
    title: 'A $2M pipeline built on a 3-week site launch',
    summary: 'Sales-led website with AI-personalised content blocks, launched in 19 days.',
    type: 'phone',
    gradientFrom: '#0a1628',
    gradientTo: '#050c18',
    rotation: 2,
  },
  {
    id: 3,
    tag: 'AI Agent',
    tagColor: '#059669',
    title: 'Automating weekly reports across 5 data sources',
    summary: 'n8n + OpenAI workflow that pulls, summarises, and emails reports every Monday at 8am.',
    type: 'tablet',
    gradientFrom: '#0a1a12',
    gradientTo: '#050e09',
    rotation: -2,
  },
  {
    id: 4,
    tag: 'AI Automation',
    tagColor: '#D97706',
    title: 'Lead enrichment pipeline saving 4 hours of SDR time per day',
    summary: 'Clay + OpenAI + HubSpot pipeline that scores, enriches, and routes leads automatically.',
    type: 'browser',
    gradientFrom: '#1a1000',
    gradientTo: '#0e0800',
    rotation: 3,
  },
];

/* ── Fake screen content for each mockup ───────────────────── */
function MockupScreen({ type, gradientFrom, gradientTo }: {
  type: string;
  gradientFrom: string;
  gradientTo: string;
}) {
  const bars = [60, 45, 80, 35, 70, 90, 55, 75];
  return (
    <div
      className="w-full h-full rounded flex flex-col gap-2 p-3"
      style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
    >
      {/* Header row */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-violet-500" />
        <div className="h-1.5 w-20 rounded bg-white/10" />
        <div className="ml-auto h-1.5 w-10 rounded bg-white/5" />
      </div>
      {/* Chart area */}
      <div className="flex-1 flex items-end gap-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm opacity-70"
            style={{
              height: `${h}%`,
              background: i % 2 === 0 ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)',
            }}
          />
        ))}
      </div>
      {/* Footer row */}
      <div className="flex gap-1">
        <div className="h-1 flex-1 rounded bg-white/[0.06]" />
        <div className="h-1 flex-1 rounded bg-white/[0.04]" />
        <div className="h-1 flex-1 rounded bg-violet-500/30" />
      </div>
    </div>
  );
}

/* ── Project card ───────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const verticalOffset = [0, 40, -20, 20][index % 4];

  return (
    <motion.div
      className="flex-shrink-0 w-[320px] md:w-[400px] flex flex-col gap-4"
      style={{ marginTop: verticalOffset }}
      initial={{ rotate: project.rotation }}
      whileHover={{ rotate: 0, y: -8, transition: { duration: 0.3 } }}
    >
      {/* Mockup frame */}
      <div
        className="relative rounded-xl overflow-hidden border border-white/[0.08]"
        style={{ rotate: `${project.rotation}deg` }}
      >
        {project.type === 'browser' && (
          <div>
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06] bg-white/[0.03]">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 text-center text-[9px] text-white/20 bg-white/[0.03] rounded px-2 py-0.5">
                dashboard.app
              </div>
            </div>
            <div className="h-44">
              <MockupScreen
                type="browser"
                gradientFrom={project.gradientFrom}
                gradientTo={project.gradientTo}
              />
            </div>
          </div>
        )}
        {project.type === 'phone' && (
          <div className="flex justify-center bg-[#080808] py-4">
            <div className="w-36 h-52 rounded-2xl border border-white/[0.12] overflow-hidden">
              <MockupScreen
                type="phone"
                gradientFrom={project.gradientFrom}
                gradientTo={project.gradientTo}
              />
            </div>
          </div>
        )}
        {project.type === 'tablet' && (
          <div className="flex justify-center bg-[#080808] py-4">
            <div className="w-56 h-40 rounded-xl border border-white/[0.12] overflow-hidden">
              <MockupScreen
                type="tablet"
                gradientFrom={project.gradientFrom}
                gradientTo={project.gradientTo}
              />
            </div>
          </div>
        )}
      </div>

      {/* Info card */}
      <div className="rounded-xl border border-white/[0.08] bg-bg-elevated p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: project.tagColor }}
          />
          <span className="mono-caption" style={{ color: project.tagColor }}>
            {project.tag}
          </span>
        </div>
        <h3 className="text-white font-medium leading-snug mb-2 text-[15px]">{project.title}</h3>
        <p className="text-sm text-white/50 leading-relaxed mb-4">{project.summary}</p>
        <button className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors group">
          View project
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Showcase Section ───────────────────────────────────────── */
export function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return; // skip parallax for reduced-motion users

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Only run on desktop
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const totalScrollWidth = track.scrollWidth - container.offsetWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${totalScrollWidth + 200}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, {
        x: -totalScrollWidth,
        ease: 'none',
      });

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: '100vh', background: 'var(--bg)' }}
    >
      <div
        ref={trackRef}
        className="flex h-full items-center gap-8 px-12"
        style={{ width: 'max-content' }}
      >
        {/* Intro panel */}
        <div className="flex-shrink-0 w-[320px] md:w-[420px] flex flex-col justify-center h-full pr-8 border-r border-white/[0.06]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mono-caption text-white/35 mb-4">What we do</p>
            <h2
              className="text-white font-bold leading-none"
              style={{
                fontSize: 'clamp(5rem, 10vw, 9rem)',
                letterSpacing: '-0.03em',
                fontFamily: 'var(--font-geist-sans)',
              }}
            >
              Show
              <br />
              case
            </h2>
            {/* Dimension annotation */}
            <div className="mt-4 inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20">
              <span className="mono-caption text-blue-400">310 × 87</span>
            </div>
          </motion.div>
        </div>

        {/* Project cards */}
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}

        {/* Final CTA card */}
        <div className="flex-shrink-0 w-64 flex flex-col items-center justify-center h-full pl-4">
          <div className="rounded-2xl border border-white/[0.08] bg-bg-elevated p-8 flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full border border-violet-500/30 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="text-white font-medium">View all work</h3>
            <p className="text-sm text-white/40">See every project we&apos;ve shipped.</p>
            <button className="w-full py-2 text-sm font-medium text-white border border-white/10 rounded-md hover:bg-white/[0.04] transition-colors">
              View all →
            </button>
          </div>
        </div>
      </div>

      {/* Mobile fallback: vertical stack */}
      <div className="md:hidden absolute inset-0 overflow-y-auto py-24 px-6">
        <div className="max-w-md mx-auto">
          <p className="mono-caption text-white/35 mb-2">What we do</p>
          <h2 className="text-6xl font-bold text-white mb-10" style={{ letterSpacing: '-0.03em' }}>
            Showcase
          </h2>
          <div className="flex flex-col gap-12">
            {PROJECTS.map((project, i) => (
              <div key={project.id} className="flex flex-col gap-4">
                <div className="rounded-xl overflow-hidden border border-white/[0.08] h-44">
                  <MockupScreen
                    type={project.type}
                    gradientFrom={project.gradientFrom}
                    gradientTo={project.gradientTo}
                  />
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-bg-elevated p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.tagColor }} />
                    <span className="mono-caption" style={{ color: project.tagColor }}>{project.tag}</span>
                  </div>
                  <h3 className="text-white font-medium leading-snug mb-2">{project.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{project.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
