'use client';

import { useEffect, useRef } from 'react';
import type { LabModule } from '@/lib/moduleData';

interface ModuleInfoPanelProps {
  module: LabModule | null;
  onClose: () => void;
}

const MODULE_DETAILS: Record<string, { stack: string[]; metric: string; metricLabel: string }> = {
  'ai-core': {
    stack: ['PyTorch', 'ONNX Runtime', 'Triton', 'LangChain'],
    metric: '40ms',
    metricLabel: 'Avg Inference Time',
  },
  'cloud-infra': {
    stack: ['Kubernetes', 'Terraform', 'AWS/GCP', 'Istio'],
    metric: '99.99%',
    metricLabel: 'Uptime SLA',
  },
  'security-matrix': {
    stack: ['Zero Trust', 'Vault', 'SIEM', 'SOC 2 Type II'],
    metric: '< 1s',
    metricLabel: 'Threat Response',
  },
  'dev-hub': {
    stack: ['GitHub Actions', 'ArgoCD', 'Jest', 'Playwright'],
    metric: '98%',
    metricLabel: 'Test Coverage',
  },
};

export default function ModuleInfoPanel({ module, onClose }: ModuleInfoPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (module) {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateX(24px)';
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      });
    }
  }, [module]);

  if (!module) return null;

  const details = MODULE_DETAILS[module.id];

  return (
    <div
      ref={panelRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 w-72 pointer-events-auto"
    >
      <div
        className="glass-strong rounded-2xl border overflow-hidden"
        style={{ borderColor: `${module.accentColor}25` }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${module.accentColor}15` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-full animate-pulse-slow"
              style={{ background: module.accentColor, boxShadow: `0 0 8px ${module.accentColor}` }}
            />
            <span className="text-white font-semibold text-sm">{module.label}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/5"
            aria-label="Close panel"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Description */}
          <p className="text-slate-400 text-xs leading-relaxed">{module.description}</p>

          {/* Metric */}
          {details && (
            <div
              className="rounded-lg px-4 py-3 text-center"
              style={{ background: `${module.accentColor}10`, border: `1px solid ${module.accentColor}20` }}
            >
              <div
                className="text-2xl font-black font-mono"
                style={{ color: module.accentColor }}
              >
                {details.metric}
              </div>
              <div className="text-slate-500 text-xs mt-0.5">{details.metricLabel}</div>
            </div>
          )}

          {/* Tech Stack */}
          {details && (
            <div>
              <p className="text-slate-600 text-xs uppercase tracking-wider font-mono mb-2">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {details.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md font-mono"
                    style={{
                      background: `${module.accentColor}12`,
                      color: module.accentColor,
                      border: `1px solid ${module.accentColor}25`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            className="w-full py-2.5 rounded-lg text-xs font-semibold transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${module.accentColor}20, ${module.accentColor}08)`,
              border: `1px solid ${module.accentColor}30`,
              color: module.accentColor,
            }}
          >
            Explore {module.label} →
          </button>
        </div>
      </div>
    </div>
  );
}
