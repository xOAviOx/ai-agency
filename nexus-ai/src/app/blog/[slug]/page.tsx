import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import { POSTS, getPost, type PostBlock } from '@/lib/posts';

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Post not found — NEXUS' };
  return {
    title: `${post.title} — NEXUS`,
    description: post.excerpt,
  };
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="text-white text-2xl md:text-[1.75rem] font-medium leading-snug mt-14 mb-5 font-display">
          {block.text}
        </h2>
      );
    case 'ul':
      return (
        <ul className="mb-6 flex flex-col gap-3 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-white/65 leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'p':
    default:
      return <p className="mb-6 text-[1.0625rem] leading-[1.75] text-white/70">{block.text}</p>;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Navigation />
      <main className="relative min-h-screen" style={{ background: 'var(--bg)' }}>
        <article className="mx-auto max-w-[760px] px-6 pt-36 pb-24 md:pt-44">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All posts
          </Link>

          <div className="mb-6 flex items-center gap-3">
            <span className="mono-caption text-violet-400">{post.tag}</span>
            <span className="mono-caption text-white/30">{post.date}</span>
            <span className="mono-caption text-white/30">{post.readTime}</span>
          </div>

          <h1 className="display-l text-white mb-6">{post.title}</h1>
          <p className="body-l text-white/55 mb-4 border-b border-white/[0.08] pb-10">
            {post.excerpt}
          </p>

          <div className="mt-10">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {/* End-of-post CTA */}
          <div className="mt-16 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-10 text-center">
            <h2 className="display-l text-white mb-3 text-[1.75rem]">Got a process worth automating?</h2>
            <p className="body-l text-white/55 max-w-md mx-auto mb-8">
              We&apos;ll find the one workflow that buys your team the most time — and build it.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-medium text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-md shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] transition-all duration-300 group"
            >
              Book a call
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
