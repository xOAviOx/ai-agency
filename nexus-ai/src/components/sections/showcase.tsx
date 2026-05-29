'use client';

import { useRef, useEffect, type CSSProperties } from 'react';
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
  {
    id: 5,
    tag: 'AI Agent',
    tagColor: '#DB2777',
    title: 'A voice agent handling 1,200 booking calls a week',
    summary: 'Realtime voice assistant that qualifies, books, and syncs appointments straight to the calendar.',
    type: 'phone',
    gradientFrom: '#2a0a1e',
    gradientTo: '#160510',
    rotation: -3,
  },
  {
    id: 6,
    tag: 'Custom Website',
    tagColor: '#0891B2',
    title: 'Headless commerce rebuild that doubled conversion',
    summary: 'Next.js storefront with AI product recommendations, shipped with a 0.4s LCP.',
    type: 'tablet',
    gradientFrom: '#04222a',
    gradientTo: '#021015',
    rotation: 2,
  },
  {
    id: 7,
    tag: 'AI Automation',
    tagColor: '#7C3AED',
    title: 'Document parsing that clears a 10k-invoice backlog overnight',
    summary: 'Vision model + validation layer extracting line items into the ERP with 99.2% accuracy.',
    type: 'browser',
    gradientFrom: '#1e1040',
    gradientTo: '#0a0820',
    rotation: -2,
  },
  {
    id: 8,
    tag: 'AI Agent',
    tagColor: '#16A34A',
    title: 'An onboarding copilot that cut time-to-value in half',
    summary: 'In-app agent that guides new users, answers questions, and triggers setup steps automatically.',
    type: 'phone',
    gradientFrom: '#0a1a12',
    gradientTo: '#050e09',
    rotation: 3,
  },
];

/* ── Fake screen content for each mockup ───────────────────── */
function MockupScreen({ gradientFrom, gradientTo }: {
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
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-violet-500" />
        <div className="h-1.5 w-20 rounded bg-white/10" />
        <div className="ml-auto h-1.5 w-10 rounded bg-white/5" />
      </div>
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
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex-shrink-0 w-[320px] md:w-[400px] flex flex-col gap-4"
      style={{ marginTop: verticalOffset }}
      initial={reducedMotion ? {} : { rotate: project.rotation }}
      whileHover={reducedMotion ? {} : { rotate: 0, y: -8, transition: { duration: 0.3 } }}
    >
      <div
        className="relative rounded-xl overflow-hidden border border-white/[0.08]"
        style={{ rotate: `${project.rotation}deg` }}
      >
        {project.type === 'browser' && (
          <div>
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
              <MockupScreen type="browser" gradientFrom={project.gradientFrom} gradientTo={project.gradientTo} />
            </div>
          </div>
        )}
        {project.type === 'phone' && (
          <div className="flex justify-center bg-[#080808] py-4">
            <div className="w-36 h-52 rounded-2xl border border-white/[0.12] overflow-hidden">
              <MockupScreen type="phone" gradientFrom={project.gradientFrom} gradientTo={project.gradientTo} />
            </div>
          </div>
        )}
        {project.type === 'tablet' && (
          <div className="flex justify-center bg-[#080808] py-4">
            <div className="w-56 h-40 rounded-xl border border-white/[0.12] overflow-hidden">
              <MockupScreen type="tablet" gradientFrom={project.gradientFrom} gradientTo={project.gradientTo} />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-bg-elevated p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.tagColor }} />
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
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef   = useRef<HTMLDivElement>(null);
  const scaleRef   = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const frame   = frameRef.current;
    const scale   = scaleRef.current;
    const track   = trackRef.current;
    if (!section || !frame || !scale || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      /* Measure at natural (final) scale so the parallax distance is correct */
      const totalScrollWidth = track.scrollWidth - window.innerWidth;
      const expandDistance   = window.innerHeight * 1.1;
      const scrollDistance   = totalScrollWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${expandDistance + scrollDistance + 200}`,
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* Phase 1a — frame expands from contained card → full viewport */
      tl.to(frame, {
        '--inset-x':      '0vw',
        '--inset-y':      '0vh',
        '--frame-radius': '0px',
        '--frame-border': 'rgba(168,85,247,0)',
        '--frame-glow':   '0 40px 120px -30px rgba(0,0,0,0.9)',
        ease: 'power2.inOut',
        duration: expandDistance,
      }, 0);

      /* Phase 1b — content scales up in sync with the frame */
      tl.fromTo(scale,
        { scale: 0.72 },
        { scale: 1, ease: 'power2.inOut', duration: expandDistance },
        0
      );

      /* Phase 2 — horizontal parallax track (only after expansion completes) */
      tl.to(track, {
        x: -totalScrollWidth,
        ease: 'none',
        duration: scrollDistance,
      }, expandDistance);

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      data-section="showcase"
      className="relative md:h-screen"
      style={{ background: 'var(--bg)' }}
    >
      {/* Backdrop pattern visible when frame is contained (desktop only) */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* Section label sitting above the contained frame */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex absolute top-8 left-0 right-0 z-10 items-center justify-center gap-4 px-12"
      >
        <span className="mono-caption text-white/40">Selected work</span>
        <span className="mono-caption text-white/20">— scroll to expand</span>
      </motion.div>

      {/* Animated frame — starts contained, expands to full viewport (desktop only) */}
      <div
        ref={frameRef}
        className="hidden md:block absolute overflow-hidden bg-bg"
        style={
          {
            '--inset-x':      '6vw',
            '--inset-y':      '12vh',
            '--frame-radius': '28px',
            '--frame-border': 'rgba(168,85,247,0.45)',
            '--frame-glow':
              '0 0 0 1px rgba(168,85,247,0.10), 0 30px 80px -20px rgba(124,58,237,0.30), 0 50px 120px -30px rgba(0,0,0,0.85)',
            top:    'var(--inset-y)',
            bottom: 'var(--inset-y)',
            left:   'var(--inset-x)',
            right:  'var(--inset-x)',
            borderRadius: 'var(--frame-radius)',
            border: '1.5px solid var(--frame-border)',
            boxShadow: 'var(--frame-glow)',
          } as CSSProperties
        }
      >
        {/* Corner brackets — purely decorative blueprint corners */}
        <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-violet-400/50 rounded-tl-md pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-violet-400/50 rounded-tr-md pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-violet-400/50 rounded-bl-md pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-violet-400/50 rounded-br-md pointer-events-none" />

        {/* Scale wrapper — content grows in sync with the frame */}
        <div
          ref={scaleRef}
          className="absolute inset-0 flex items-center"
          style={{ transformOrigin: 'left center', transform: 'scale(0.72)' }}
        >
        {/* Horizontal parallax track (desktop) */}
        <div
          ref={trackRef}
          className="hidden md:flex h-full items-center gap-8 px-12"
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
                  fontFamily: 'var(--font-display)',
                }}
              >
                Show
                <br />
                case
              </h2>
              <div className="mt-4 inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20">
                <span className="mono-caption text-blue-400">310 × 87</span>
              </div>
            </motion.div>
          </div>

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
        </div>

      </div>

      {/* Mobile — swipeable horizontal carousel (no GSAP pin/parallax → smooth on touch) */}
      <div className="md:hidden px-6 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="mono-caption text-white/35 mb-3">Selected work</p>
          <h2
            className="text-white font-bold leading-[0.95]"
            style={{
              fontSize: 'clamp(2.25rem, 10vw, 3.5rem)',
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-display)',
            }}
          >
            Showcase
          </h2>
          <p className="mono-caption text-white/25 mt-4 flex items-center gap-2">
            Swipe to explore
            <ArrowRight className="w-3.5 h-3.5" />
          </p>
        </motion.div>

        {/* Native scroll-snap row — bleeds to the screen edges */}
        <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scroll-padding-left:1.5rem]">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="snap-center shrink-0 w-[80vw] max-w-[320px]"
            >
              <div className="rounded-xl overflow-hidden border border-white/[0.08] h-44 mb-4">
                <MockupScreen type={project.type} gradientFrom={project.gradientFrom} gradientTo={project.gradientTo} />
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-bg-elevated p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.tagColor }} />
                  <span className="mono-caption" style={{ color: project.tagColor }}>{project.tag}</span>
                </div>
                <h3 className="text-white font-medium leading-snug mb-2 text-[15px]">{project.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{project.summary}</p>
              </div>
            </article>
          ))}

          {/* Trailing CTA card */}
          <article className="snap-center shrink-0 w-[72vw] max-w-[280px] flex">
            <div className="w-full rounded-xl border border-white/[0.08] bg-bg-elevated p-8 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-12 h-12 rounded-full border border-violet-500/30 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-white font-medium">View all work</h3>
              <p className="text-sm text-white/40">See every project we&apos;ve shipped.</p>
              <button className="w-full py-2 text-sm font-medium text-white border border-white/10 rounded-md hover:bg-white/[0.04] transition-colors">
                View all →
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
