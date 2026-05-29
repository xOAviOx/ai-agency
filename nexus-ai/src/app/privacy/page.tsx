import type { Metadata } from 'next';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import { LegalContent } from '@/components/legal-page';
import { PRIVACY } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy — NEXUS',
  description: 'How NEXUS collects, uses, and protects your information.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <LegalContent doc={PRIVACY} />
      <Footer />
    </>
  );
}
