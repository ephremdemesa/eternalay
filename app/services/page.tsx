import type { Metadata } from 'next';
import Navbar from '@/components/UI/Navbar';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services — Custom Software Dev, AppSec & DevSecOps',
  description:
    'EternalAY offers Custom Software Development, Application Security Testing (SAST/DAST/Pen Testing/OWASP LLM Top 10), and DevSecOps services from Texas.',
  alternates: { canonical: 'https://eternalay.com/services' },
  openGraph: {
    title: 'Services | EternalAY',
    description: 'Custom Software Development, AppSec Testing, and DevSecOps — Texas-based engineering team.',
    url: 'https://eternalay.com/services',
  },
};

const SERVICES = [
  {
    id: 'custom-software',
    number: '01',
    title: 'Custom Software Development',
    tagline: 'Built to Spec. Engineered to Last.',
    accentColor: '#00ff88',
    borderColor: 'rgba(0,255,136,0.15)',
    bgColor: 'rgba(0,255,136,0.05)',
    description:
      'We design and build bespoke software systems from the ground up — web platforms, APIs, microservices, and data pipelines tailored to your business logic and scale requirements.',
    offerings: [
      { title: 'Full-Stack Web Applications', body: 'React, Next.js, Node.js, Python — end-to-end product engineering with CI/CD from day one.' },
      { title: 'API & Microservice Architecture', body: 'RESTful and GraphQL APIs, event-driven microservices, and service mesh integration.' },
      { title: 'Data Pipelines & Integrations', body: 'Real-time and batch ETL pipelines, third-party API integrations, and data warehousing.' },
      { title: 'Legacy Modernization', body: 'Incremental refactoring and re-platforming of monoliths to cloud-native architectures.' },
    ],
    process: ['Discovery & Architecture', 'Sprint-based Development', 'QA & Security Review', 'Deployment & Handoff'],
  },
  {
    id: 'appsec',
    number: '02',
    title: 'Application Security Testing',
    tagline: 'Find Vulnerabilities Before Attackers Do.',
    accentColor: '#a855f7',
    borderColor: 'rgba(168,85,247,0.15)',
    bgColor: 'rgba(168,85,247,0.05)',
    description:
      'Comprehensive offensive security assessments covering SAST, DAST, penetration testing, and threat modelling — delivering actionable remediation roadmaps, not just raw findings.',
    offerings: [
      { title: 'Penetration Testing', body: 'Black-box, grey-box, and white-box testing for web apps, APIs, and mobile applications.' },
      { title: 'Static & Dynamic Analysis', body: 'SAST/DAST/SCA/Container/IaC tools integration to your CI/CD pipelines (GitHub, GitLab, ADO, ...) to catch vulnerabilities at every stage.' },
      { title: 'Threat Modelling', body: 'STRIDE/PASTA frameworks applied to architecture diagrams to surface design-level risks.' },
      { title: 'Compliance Assessments', body: 'ISO 27001, PCI-DSS, SOC 2, and HIPAA gap analysis with remediation guidance.' },
      { title: 'AI Agents Security', body: 'Security controls and assessments against the OWASP LLM Top 10 — covering prompt injection, insecure output handling, model inversion, supply chain risks, and more for LLM-powered applications and AI agents.' },
    ],
    process: ['Scoping & Recon', 'Exploitation & Testing', 'Findings Report', 'Remediation Support'],
  },
  {
    id: 'devsecops',
    number: '03',
    title: 'DevSecOps',
    tagline: 'Security Embedded in Every Commit.',
    accentColor: '#00d4ff',
    borderColor: 'rgba(0,212,255,0.15)',
    bgColor: 'rgba(0,212,255,0.05)',
    description:
      'We embed security directly into your engineering workflow — automated scanning, policy-as-code, secrets management, and compliance checks baked into every CI/CD stage.',
    offerings: [
      { title: 'CI/CD Security Gates', body: 'Automated vulnerability scanning, license checks, and policy enforcement on every pull request.' },
      { title: 'Container & IaC Security', body: 'Docker image scanning, Terraform/Kubernetes misconfig detection with Trivy, Checkov, and OPA.' },
      { title: 'Secrets Management', body: 'HashiCorp Vault, AWS Secrets Manager, and SOPS integration with zero-secret-in-code policies.' },
      { title: 'Compliance Automation', body: 'Continuous SOC 2, ISO 27001, and NIST CSF evidence collection and reporting pipelines.' },
    ],
    process: ['Pipeline Audit', 'Toolchain Integration', 'Policy Definition', 'Monitoring & Alerting'],
  },
];

export default function ServicesPage() {
  return (
    <main className="relative bg-midnight min-h-screen">
      <Navbar />

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, #00ff88 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(ellipse, #a855f7 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-36 pb-24">
        {/* Page header */}
        <div className="mb-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 glass border border-[#00ff88]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse-slow" />
            <span className="text-[#00ff88] text-xs font-mono font-medium tracking-wider uppercase">What We Do</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-5 leading-[1.05]">
            Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">
              Services
            </span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            From first line of code to hardened production — across three core disciplines.
          </p>
        </div>

        {/* Service blocks */}
        <div className="space-y-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${service.bgColor}, rgba(0,0,0,0.2))`,
                border: `1px solid ${service.borderColor}`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Header */}
              <div className="px-8 py-6 flex flex-col md:flex-row md:items-center gap-4"
                style={{ borderBottom: `1px solid ${service.borderColor}` }}>
                <div className="flex-1">
                  <span className="text-xs font-mono font-bold tracking-[0.2em] opacity-50 block mb-1"
                    style={{ color: service.accentColor }}>
                    {service.number}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-white">{service.title}</h2>
                  <p className="text-sm font-semibold mt-1" style={{ color: service.accentColor }}>
                    {service.tagline}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="flex-shrink-0 text-xs font-semibold px-5 py-2.5 rounded-lg transition-all duration-300"
                  style={{
                    background: `${service.accentColor}15`,
                    border: `1px solid ${service.accentColor}30`,
                    color: service.accentColor,
                  }}
                >
                  Get a Quote →
                </Link>
              </div>

              {/* Body */}
              <div className="px-8 py-7 grid md:grid-cols-3 gap-8">
                {/* Description + process */}
                <div className="md:col-span-1">
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.description}</p>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-mono text-slate-600 mb-3">Process</p>
                    <ol className="space-y-2">
                      {service.process.map((step, i) => (
                        <li key={step} className="flex items-center gap-3 text-sm text-slate-300">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                            style={{ background: `${service.accentColor}20`, color: service.accentColor }}
                          >
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Offerings grid */}
                <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                  {service.offerings.map((offering) => (
                    <div
                      key={offering.title}
                      className="rounded-xl p-4"
                      style={{ background: `${service.accentColor}08`, border: `1px solid ${service.accentColor}12` }}
                    >
                      <h4 className="text-white text-sm font-semibold mb-1.5">{offering.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{offering.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 text-lg mb-6">
            Not sure which service fits your needs?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#0a0e1a] font-bold px-8 py-4 rounded-xl text-sm hover:shadow-[0_0_50px_rgba(0,255,136,0.3)] transition-all duration-300"
          >
            Talk to an Engineer →
          </Link>
          <p className="text-slate-600 text-xs mt-16 font-mono">© 2025 EternalAY. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}
