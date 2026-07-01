'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const SERVICES = [
  {
    id: 'custom-software',
    number: '01',
    title: 'Custom Software Development',
    tagline: 'Built to Spec. Engineered to Last.',
    description:
      'We design and build bespoke software systems from the ground up — web platforms, APIs, microservices, and data pipelines — tailored precisely to your business logic and scale requirements.',
    bullets: [
      'Full-stack web & mobile applications',
      'API design & microservice architecture',
      'Legacy system modernization',
      'Real-time data pipelines & integrations',
    ],
    accentColor: '#00ff88',
    gradientFrom: 'rgba(0,255,136,0.06)',
    gradientTo: 'rgba(0,255,136,0.01)',
    borderColor: 'rgba(0,255,136,0.12)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    id: 'appsec',
    number: '02',
    title: 'Application Security Testing',
    tagline: 'Find Vulnerabilities Before Attackers Do.',
    description:
      'Comprehensive offensive security assessments covering SAST, DAST, penetration testing, and threat modelling. We identify, exploit, and remediate critical vulnerabilities across your entire attack surface.',
    bullets: [
      'OWASP Top 10 & CWE/CVE assessment',
      'Penetration testing (web, API, mobile)',
      'SAST/DAST/SCA/Container/IaC tools integration to CI/CD pipelines (GitHub, GitLab, ADO, ...)',
      'ISO 27001, PCI-DSS, SOC 2 & HIPAA gap analysis',
      'AI Agents Security — OWASP LLM Top 10 controls',
    ],
    accentColor: '#a855f7',
    gradientFrom: 'rgba(168,85,247,0.06)',
    gradientTo: 'rgba(168,85,247,0.01)',
    borderColor: 'rgba(168,85,247,0.12)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    id: 'devsecops',
    number: '03',
    title: 'DevSecOps',
    tagline: 'Security Embedded in Every Commit.',
    description:
      'We integrate security practices directly into your CI/CD pipeline — automated scanning, policy enforcement, secrets management, and compliance checks — so security never slows down delivery.',
    bullets: [
      'CI/CD security gate automation',
      'Container & IaC security scanning',
      'Secrets management (Vault, SOPS)',
      'SOC 2, ISO 27001 & NIST compliance',
    ],
    accentColor: '#00d4ff',
    gradientFrom: 'rgba(0,212,255,0.06)',
    gradientTo: 'rgba(0,212,255,0.01)',
    borderColor: 'rgba(0,212,255,0.12)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 6 0m-6 0H3m16.5 0a3 3 0 0 0 3-3m-3 3a3 3 0 1 1-6 0m6 0h1.5m-7.5 0v-9.75m0 0H12m-1.5 0h1.5M9.75 4.5h4.5" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(32px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen flex items-center py-24 px-6 md:px-16 lg:px-24 pointer-events-auto"
    >
      {/* Subtle background gradient blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, #00ff88 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 glass border border-[#00ff88]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse-slow" />
            <span className="text-[#00ff88] text-xs font-mono font-medium tracking-wider uppercase">
              What We Do
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">
              Services
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            From first line of code to hardened production — we cover the full engineering lifecycle.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{ transitionDelay: `${i * 120}ms` }}
              className="relative group rounded-2xl p-7 overflow-hidden cursor-default"
            >
              {/* Card background */}
              <div
                className="absolute inset-0 rounded-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-80"
                style={{
                  background: `linear-gradient(135deg, ${service.gradientFrom}, ${service.gradientTo})`,
                  border: `1px solid ${service.borderColor}`,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              />

              {/* Hover glow border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ border: `1px solid ${service.accentColor}35` }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Number + icon row */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-xs font-mono font-bold tracking-[0.2em] opacity-60"
                    style={{ color: service.accentColor }}
                  >
                    {service.number}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${service.accentColor}15`,
                      border: `1px solid ${service.accentColor}25`,
                      color: service.accentColor,
                    }}
                  >
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl leading-tight mb-1">
                  {service.title}
                </h3>
                <p
                  className="text-sm font-medium mb-4"
                  style={{ color: service.accentColor }}
                >
                  {service.tagline}
                </p>

                {/* Divider */}
                <div
                  className="h-px mb-4 w-full opacity-20"
                  style={{ background: service.accentColor }}
                />

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-slate-400 text-xs">
                      <span
                        className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ background: service.accentColor, boxShadow: `0 0 6px ${service.accentColor}` }}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* CTA link */}
                <Link
                  href="/services"
                  className="mt-6 text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 group/btn"
                  style={{ color: service.accentColor }}
                >
                  <span className="group-hover/btn:underline underline-offset-2">Learn More</span>
                  <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
