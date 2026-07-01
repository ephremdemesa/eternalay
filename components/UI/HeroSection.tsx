'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const PILLARS = [
  { label: 'Custom Software Dev', color: '#00ff88' },
  { label: 'AppSec Testing', color: '#a855f7' },
  { label: 'DevSecOps', color: '#00d4ff' },
];

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    const timeout = setTimeout(() => {
      el.style.transition = 'opacity 1s ease, transform 1s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="pointer-events-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass border border-[#00ff88]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse-slow" />
            <span className="text-[#00ff88] text-xs font-mono font-medium tracking-wider uppercase">
              Open for Engagements
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
          >
            Bespoke
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">
              Software
            </span>
            <br />
            Construction.
          </h1>

          {/* Subheading */}
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
            We build, secure, and automate software systems — from custom applications to hardened CI/CD pipelines.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <Link
              href="/services"
              className="btn-glow glass-strong border border-[#00d4ff]/40 text-[#00d4ff] font-semibold px-7 py-3.5 rounded-lg text-sm transition-all duration-300 hover:border-[#00d4ff]/70 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="relative overflow-hidden group bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#0a0e1a] font-bold px-7 py-3.5 rounded-lg text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,136,0.4)]"
            >
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Service pillars */}
          <div className="flex flex-wrap gap-2">
            {PILLARS.map((p) => (
              <span
                key={p.label}
                className="text-xs font-mono px-3 py-1.5 rounded-full"
                style={{
                  background: `${p.color}10`,
                  border: `1px solid ${p.color}25`,
                  color: p.color,
                }}
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto">
        <span className="text-slate-600 text-xs font-mono tracking-widest uppercase">Scroll to Explore</span>
        <div className="w-5 h-8 border border-slate-700 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#00ff88] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
