'use client';

import React from 'react';
import Container from '../ui/Container';

const SocialProofSection: React.FC = () => {
  const testimonials = [
    {
      quote: "Finally, an event check-in system that actually works offline! Our venue's Wi-Fi is spotty, but EventUp never missed a beat.",
      author: "Maya R.",
      role: "HR Manager, TechStart",
    },
    {
      quote: "We reduced our check-in time from 30 minutes to under 5. Guests were amazed at how smooth it was.",
      author: "David K.",
      role: "Event Coordinator, Colombo Expo",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">What Organizers Say</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted by event teams</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            From corporate gatherings to community festivals, EventUp delivers a seamless entry experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-2xl bg-gray-50/80 border border-border hover:border-primary/30 hover:shadow-lg smooth-transition">
              <svg className="w-10 h-10 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-1.43-.858-2.594-2.211-2.898l-4.662.524a1.275 1.275 0 01-1.008-.59l-.157-3.023A1.268 1.268 0 017.058 8h5.662a2.5 2.5 0 01-.045-.246 2.058 2.058 0 001.684-1.156l.168-.983c1.578-7.13 6.379-12.848 6.379-12.848s-1.636-2.415-4.931-2.415c-3.596 0-5.765 2.04-5.765 5.44 0 .987.286 1.93.814 2.775a.333.333 0 01.36.288l3.025-.497a1.275 1.275 0 01.539.38z" />
              </svg>
              <p className="text-base text-foreground leading-relaxed mb-4">{t.quote}</p>
              <div>
                <div className="font-semibold text-foreground">{t.author}</div>
                <div className="text-sm text-muted">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted mb-4">Event types we power</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
            {['Corporate Events', 'Tech Meetups', 'Workshops', 'Conferences', 'Community Gatherings', 'Galas'].map((type) => (
              <span
                key={type}
                className="px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium border border-primary/10"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SocialProofSection;
