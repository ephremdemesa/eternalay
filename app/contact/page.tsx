'use client';

import { useState } from 'react';
import Navbar from '@/components/UI/Navbar';

// Note: metadata export works in Server Components only.
// For SEO on this client page, metadata is inherited from layout.
// To add custom metadata, wrap this in a server component parent.

const SERVICES = [
  'Custom Software Development',
  'Application Security Testing',
  'DevSecOps',
  'Multiple Services',
  'Not sure yet',
];

const BUDGETS = [
  'Under $10,000',
  '$10,000 – $50,000',
  '$50,000 – $150,000',
  '$150,000+',
  'Prefer not to say',
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

const EMPTY: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative bg-midnight min-h-screen">
      <Navbar />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse, #00d4ff 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(ellipse, #00ff88 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-36 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 glass border border-[#00ff88]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse-slow" />
              <span className="text-[#00ff88] text-xs font-mono font-medium tracking-wider uppercase">
                Get In Touch
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-5 leading-[1.05]">
              Let&apos;s{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">
                Build
              </span>
              <br />
              Together.
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Tell us about your project and we&apos;ll get back to you within one business day with a tailored plan.
            </p>

            {/* Info cards */}
            <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-4 glass border border-white/5 rounded-xl px-5 py-4">
                  <span className="text-[#00ff88]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-slate-500 font-mono">Email</p>
                    <p className="text-white text-sm font-medium">info@eternalay.com</p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-center gap-4 glass border border-white/5 rounded-xl px-5 py-4">
                  <span className="text-[#00ff88]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-slate-500 font-mono">Response Time</p>
                    <p className="text-white text-sm font-medium">Within 1 business day</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 glass border border-white/5 rounded-xl px-5 py-4">
                  <span className="text-[#00ff88] mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-slate-500 font-mono">Location</p>
                    <p className="text-white text-sm font-medium">13612 Midway Rd, Suite 601 PMB 1007</p>
                    <p className="text-slate-400 text-xs mt-0.5">Farmers Branch, Texas 75244</p>
                  </div>
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="mt-6 rounded-xl overflow-hidden border border-white/8" style={{ height: '220px' }}>
                <iframe
                  title="EternalAY Office Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=13612+Midway+Rd+Suite+601,+Farmers+Branch,+TX+75244&output=embed"
                />
              </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="glass border border-[#00ff88]/20 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth={2} className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Message Received</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Thanks, <span className="text-white font-medium">{form.firstName}</span>. We&apos;ll review your request and reach out within one business day.
                </p>
                <button
                  onClick={() => { setForm(EMPTY); setSubmitted(false); }}
                  className="text-xs font-semibold text-[#00ff88] hover:underline underline-offset-2 transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass border border-white/8 rounded-2xl p-8 space-y-5"
              >
                {/* Name row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">
                      First Name <span className="text-[#00ff88]">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00ff88]/40 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">
                      Last Name <span className="text-[#00ff88]">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Smith"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00ff88]/40 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1.5">
                    Work Email <span className="text-[#00ff88]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00ff88]/40 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                {/* Phone + Company row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">
                      Phone <span className="text-slate-600">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00ff88]/40 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00ff88]/40 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>

                {/* Service + Budget row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">
                      Service Needed <span className="text-[#00ff88]">*</span>
                    </label>
                    <select
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ff88]/40 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">Budget Range</label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ff88]/40 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select range</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1.5">
                    Project Details <span className="text-[#00ff88]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your project, goals, timeline, and any technical constraints..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00ff88]/40 focus:bg-white/[0.06] transition-all resize-none"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-lg px-4 py-3 text-sm text-red-400 border border-red-500/20 bg-red-500/5">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#0a0e1a] font-bold py-3.5 rounded-lg text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,136,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message →'
                  )}
                </button>

                <p className="text-center text-slate-600 text-xs font-mono">
                  No spam. No commitment. We reply within 1 business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
