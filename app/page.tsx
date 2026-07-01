'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/UI/Navbar';
import HeroSection from '@/components/UI/HeroSection';
import ServicesSection from '@/components/UI/ServicesSection';
import ModuleInfoPanel from '@/components/UI/ModuleInfoPanel';
import type { LabModule } from '@/lib/moduleData';

const LabScene = dynamic(() => import('@/components/Scene/LabScene'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-midnight flex items-center justify-center z-0">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-[#00ff88]/30 border-t-[#00ff88] rounded-full animate-spin" />
        <span className="text-slate-500 text-sm font-mono">Initializing Lab Environment...</span>
      </div>
    </div>
  ),
});

export default function Home() {
  const [activeModule, setActiveModule] = useState<LabModule | null>(null);

  const handleModuleSelect = useCallback((module: LabModule | null) => {
    setActiveModule(module);
  }, []);

  const handlePanelClose = useCallback(() => {
    setActiveModule(null);
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://eternalay.com/#organization',
        name: 'EternalAY',
        url: 'https://eternalay.com',
        email: 'info@eternalay.com',
        address: { '@type': 'PostalAddress', addressRegion: 'TX', addressCountry: 'US' },
        description: 'Custom Software Development, Application Security Testing, and DevSecOps company based in Texas.',
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://eternalay.com/#website',
        url: 'https://eternalay.com',
        name: 'EternalAY',
        publisher: { '@id': 'https://eternalay.com/#organization' },
      },
      {
        '@type': 'Service',
        name: 'Custom Software Development',
        provider: { '@id': 'https://eternalay.com/#organization' },
        description: 'Bespoke full-stack web applications, APIs, microservices, and data pipelines.',
        areaServed: 'US',
      },
      {
        '@type': 'Service',
        name: 'Application Security Testing',
        provider: { '@id': 'https://eternalay.com/#organization' },
        description: 'Penetration testing, SAST/DAST/SCA, threat modelling, OWASP LLM Top 10, and ISO 27001 compliance assessments.',
        areaServed: 'US',
      },
      {
        '@type': 'Service',
        name: 'DevSecOps',
        provider: { '@id': 'https://eternalay.com/#organization' },
        description: 'CI/CD security gates, container and IaC scanning, secrets management, and compliance automation.',
        areaServed: 'US',
      },
    ],
  };

  return (
    <main className="relative bg-midnight min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Fixed 3D Canvas */}
      <LabScene onModuleSelect={handleModuleSelect} />

      {/* Navbar */}
      <Navbar />

      {/* Module info panel */}
      <ModuleInfoPanel module={activeModule} onClose={handlePanelClose} />

      {/* Scrollable content */}
      <div className="relative z-10 pointer-events-none">
        {/* Hero */}
        <div className="pointer-events-auto">
          <HeroSection />
        </div>

        {/* Services preview */}
        <ServicesSection />

        {/* CTA */}
        <section className="min-h-[60vh] flex items-center justify-center px-6 pointer-events-auto pb-20">
          <div className="max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 glass border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse-slow" />
              <span className="text-slate-400 text-xs font-mono">Let&apos;s Build Together</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
              Ready to{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">
                Engineer
              </span>
              {' '}the Future?
            </h2>

            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Custom Software Development, Application Security Testing, and DevSecOps — EternalAY delivers end-to-end engineering that scales with your ambitions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#0a0e1a] font-bold px-8 py-4 rounded-xl text-sm hover:shadow-[0_0_50px_rgba(0,255,136,0.4)] transition-all duration-300 text-center"
              >
                Start a Project
              </Link>
              <Link
                href="/services"
                className="glass-strong border border-white/10 text-white font-semibold px-8 py-4 rounded-xl text-sm hover:border-white/20 transition-all duration-300 text-center"
              >
                View All Services
              </Link>
            </div>

            <p className="text-slate-600 text-xs mt-10 font-mono">
              © 2025 EternalAY. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
