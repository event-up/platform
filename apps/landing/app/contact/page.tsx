'use client';

import React, { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', type: 'general' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, wire this to your backend
    setSubmitted(true);
  };

  const contactDetails = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email us',
      value: 'hello@eventup.com',
      href: 'mailto:hello@eventup.com',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Based in',
      value: 'Sri Lanka',
      href: null,
    },
  ];

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 bg-primary/8 px-4 py-1.5 rounded-full">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
              We'd love to hear from you.
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              Whether you have a question, want a demo, or just want to talk about your upcoming event — we're here.
            </p>
          </div>
        </section>

        {/* Contact section */}
        <section className="pb-20 md:pb-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

              {/* Left — info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Contact details</h2>
                  <div className="space-y-4">
                    {contactDetails.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs text-muted font-medium uppercase tracking-wide">{item.label}</div>
                          {item.href ? (
                            <a href={item.href} className="text-foreground font-semibold hover:text-primary smooth-transition">
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-foreground font-semibold">{item.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response time */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/15">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold text-primary">Typically reply within 24 hours</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    For urgent event-day support, reach us directly at the email above.
                  </p>
                </div>

                {/* What to expect */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">What we can help with</h3>
                  <ul className="space-y-2.5">
                    {[
                      'Product demos & walkthroughs',
                      'Pricing & plan questions',
                      'Technical support',
                      'Partnership enquiries',
                      'Custom enterprise setups',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted">
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right — form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl border border-border shadow-sm p-7 md:p-10">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">Message sent!</h3>
                      <p className="text-muted">We'll get back to you within 24 hours. Thanks for reaching out!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 smooth-transition text-sm text-foreground placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="you@company.com"
                            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 smooth-transition text-sm text-foreground placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Company / Organisation</label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          placeholder="Optional"
                          className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 smooth-transition text-sm text-foreground placeholder:text-gray-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">How can we help?</label>
                        <select
                          value={form.type}
                          onChange={(e) => setForm({ ...form, type: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 smooth-transition text-sm text-foreground bg-white"
                        >
                          <option value="general">General enquiry</option>
                          <option value="demo">Request a demo</option>
                          <option value="pricing">Pricing question</option>
                          <option value="support">Technical support</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us about your event or what you need help with..."
                          className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 smooth-transition text-sm text-foreground placeholder:text-gray-400 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-full text-white font-semibold text-sm smooth-transition hover:opacity-90 active:scale-[0.98]"
                        style={{ background: 'linear-gradient(135deg, #0097B2 0%, #007A92 100%)' }}
                      >
                        Send Message
                      </button>

                      <p className="text-xs text-center text-muted">
                        By submitting, you agree to our{' '}
                        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
