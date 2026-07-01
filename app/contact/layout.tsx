import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Start a Project',
  description:
    'Get in touch with EternalAY. Tell us about your project — custom software development, application security testing, or DevSecOps. Based in Texas, open for engagements.',
  alternates: { canonical: 'https://eternalay.com/contact' },
  openGraph: {
    title: 'Contact Us | EternalAY',
    description: 'Start a project with EternalAY — Custom Software Dev, AppSec & DevSecOps. Texas-based. Reply within 1 business day.',
    url: 'https://eternalay.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
