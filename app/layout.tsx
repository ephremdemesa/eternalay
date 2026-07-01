import type { Metadata } from 'next';
import './globals.css';

const BASE_URL = 'https://eternalay.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'EternalAY — Custom Software Development & AppSec | Texas',
    template: '%s | EternalAY',
  },
  description:
    'EternalAY is a custom software development company based in Texas offering Application Security Testing (AppSec), DevSecOps, and OWASP LLM / AI Agents security services.',
  keywords: [
    'custom software development Texas',
    'application security testing',
    'AppSec consulting',
    'DevSecOps',
    'SAST DAST SCA',
    'OWASP LLM Top 10',
    'AI agents security',
    'penetration testing',
    'ISO 27001',
    'SOC 2 compliance',
    'software company Texas',
    'EternalAY',
  ],
  authors: [{ name: 'EternalAY', url: BASE_URL }],
  creator: 'EternalAY',
  publisher: 'EternalAY',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'EternalAY',
    title: 'EternalAY — Custom Software Development & AppSec | Texas',
    description:
      'Custom Software Development, Application Security Testing, and DevSecOps. Based in Texas — built for scale, security, and speed.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EternalAY — Bespoke Software Construction' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EternalAY — Custom Software Development & AppSec',
    description: 'Custom Software Dev, AppSec Testing & DevSecOps. Texas-based. Open for engagements.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-midnight text-slate-200 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
