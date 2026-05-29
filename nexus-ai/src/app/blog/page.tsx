import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';

export const metadata: Metadata = {
  title: 'Blog — NEXUS',
  description: 'Notes on AI automation, agents, and shipping fast.',
};

/* NOTE: placeholder — no posts yet. Drop real posts into POSTS (or wire a CMS)
   once content is provided. Empty array renders the "coming soon" state. */
type Post = { title: string; excerpt: string; date: string; href: string };
const POSTS: Post[] = [];

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen" style={{ background: 'var(--bg)' }}>
        <section className="mx-auto max-w-[1280px] px-6 md:px-12 pt-36 pb-24 md:pt-44">
          <p className="mono-caption text-violet-400 mb-6">The NEXUS Journal</p>
          <h1 className="display-xl text-white max-w-4xl mb-6">
            Notes on AI, automation, and shipping fast.
          </h1>
          <p className="body-l text-white/60 max-w-2xl mb-14">
            Field notes from building AI agents and automations in production.
          </p>

          {POSTS.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] px-8 py-16 text-center">
              <p className="display-l text-white/80 mb-3">Coming soon.</p>
              <p className="body-l text-white/50 max-w-md mx-auto mb-8">
                We&apos;re writing our first posts. Want to be notified — or have a
                project in mind?
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-medium text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-md shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] transition-all duration-300 group"
              >
                Book a call
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {POSTS.map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors hover:border-violet-500/30"
                >
                  <p className="mono-caption text-white/35 mb-4">{post.date}</p>
                  <h2 className="text-white text-xl font-medium leading-snug mb-3 font-display">
                    {post.title}
                  </h2>
                  <p className="text-sm text-white/55 leading-relaxed mb-5">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-violet-300 group-hover:text-violet-200">
                    Read more
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
