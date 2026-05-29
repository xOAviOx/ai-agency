'use client';

import { AmbientCircle } from '@/components/ui/ambient-circle';
import { Reveal } from '@/components/ui/reveal';
import { scrollToHash } from '@/lib/smooth-scroll';
import type { LegalDoc } from '@/lib/legal';

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function LegalContent({ doc }: { doc: LegalDoc }) {
  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      <AmbientCircle />

      {/* ── Hero ── */}
      <section className="relative mx-auto max-w-[1100px] px-6 md:px-12 pt-36 pb-10 md:pt-44">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2">
            <div className="h-px w-4 bg-violet-500" />
            <span className="mono-caption text-violet-400">Legal</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="display-l text-white mb-4">{doc.title}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mono-caption text-white/35 mb-6">Last updated: {doc.updated}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="body-l text-white/60 max-w-2xl">{doc.intro}</p>
        </Reveal>
      </section>

      {/* ── TOC + sections ── */}
      <section className="relative mx-auto max-w-[1100px] px-6 md:px-12 pb-32">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* Sticky table of contents (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mono-caption text-white/30 mb-4">On this page</p>
              <ul className="flex flex-col gap-2.5">
                {doc.sections.map((s, i) => (
                  <li key={s.heading}>
                    <button
                      type="button"
                      onClick={() => scrollToHash(`#${slugify(s.heading)}`)}
                      className="text-left text-sm text-white/45 transition-colors hover:text-violet-300 cursor-pointer"
                    >
                      <span className="text-white/25">{i + 1}.</span> {s.heading}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Sections */}
          <div className="max-w-2xl">
            {doc.sections.map((s, i) => (
              <Reveal key={s.heading} y={16}>
                <section id={slugify(s.heading)} className="mb-12 scroll-mt-28">
                  <h2 className="text-white text-xl md:text-2xl font-medium mb-4 font-display">
                    <span className="mr-2 text-violet-400/70">{i + 1}.</span>
                    {s.heading}
                  </h2>
                  {s.blocks.map((b, bi) =>
                    b.type === 'ul' ? (
                      <ul key={bi} className="mb-4 flex flex-col gap-2.5 pl-1">
                        {b.items.map((it, ii) => (
                          <li key={ii} className="flex gap-3 leading-relaxed text-white/65">
                            <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={bi} className="mb-4 leading-[1.7] text-white/65">
                        {b.text}
                      </p>
                    )
                  )}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
