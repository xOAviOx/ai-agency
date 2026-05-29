import type { Metadata } from 'next';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import { LegalContent } from '@/components/legal-page';
import { AI_POLICY } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'AI Policy — NEXUS',
  description: 'How NEXUS builds, deploys, and operates AI systems responsibly.',
};

export default function AiPolicyPage() {
  return (
    <>
      <Navigation />
      <LegalContent doc={AI_POLICY} />
      <Footer />
    </>
  );
}
