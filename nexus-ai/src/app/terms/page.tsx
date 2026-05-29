import type { Metadata } from 'next';
import { Navigation } from '@/components/sections/navigation';
import { Footer } from '@/components/sections/footer';
import { LegalContent } from '@/components/legal-page';
import { TERMS } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Terms of Service — NEXUS',
  description: 'The terms governing use of the NEXUS website and services.',
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <LegalContent doc={TERMS} />
      <Footer />
    </>
  );
}
