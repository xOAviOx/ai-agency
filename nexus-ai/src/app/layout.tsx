import type { Metadata } from 'next';
import { Unbounded, Space_Grotesk, Space_Mono } from 'next/font/google';
import { LenisProvider } from '@/providers/lenis-provider';
import './globals.css';

const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NEXUS — AI Automation Agency',
  description:
    'We build custom AI agents, automations, and websites that plug straight into your team.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (ColorZilla, wallets, etc.)
          inject attributes like `cz-shortcut-listen` onto <body> before React
          hydrates, which would otherwise log a hydration-mismatch warning. */}
      <body suppressHydrationWarning>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
