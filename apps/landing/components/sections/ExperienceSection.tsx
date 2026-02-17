'use client';

import React, { useState } from 'react';
import Container from '../ui/Container';
import Badge from '../ui/Badge';

const ExperienceSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const facts = [
    {
      title: "Your entry experience becomes something people notice",
      description: "Attendees walk up, show a QR code, and they're in. No queue building at the door, no volunteer frantically scanning a spreadsheet, no awkward hold-ups. The first thing your guests experience is an entrance that just works — and that sets the tone for everything that follows."
    },
    {
      title: "You always know exactly what's happening",
      description: "From the moment doors open, you have a live view of attendance — how many people have arrived, how many are still expected, and how each entrance is moving. You're not guessing or waiting until the end to find out. You're in control, in real time, from wherever you are."
    },
    {
      title: "Your team can handle the day without you micromanaging it",
      description: "Volunteers get a tool that's simple enough to use without any training. You set things up beforehand, share a link, and on the day your team runs the door confidently. Less briefing, fewer mistakes, less stress landing on you."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        {/* Section Label */}
        <div className="text-center mb-16">
          <Badge variant="muted" className="mb-6">
            The Experience
          </Badge>
          <h2 className="mb-6 text-foreground">
            You focus on the event.<br/>Eventup handles the rest.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Here's what changes when you run your next event on Eventup.
          </p>
        </div>

        {/* Centered Fact Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6">
            {facts.map((fact, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer rounded-2xl bg-muted-light/50 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 ease-in-out min-h-[140px]"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Default State - Title Only */}
                <div className={`p-6 transition-opacity duration-300 ${
                  hoveredCard === index ? 'opacity-0' : 'opacity-100'
                }`}>
                  {/* Number Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-base transition-all duration-300">
                      {index + 1}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground leading-tight">
                    {fact.title}
                  </h3>
                </div>

                {/* Hover State - Title + Description */}
                <div className={`absolute inset-0 p-6 bg-muted-light/50 rounded-2xl transition-opacity duration-300 ${
                  hoveredCard === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  {/* Number Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-base">
                      {index + 1}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground leading-tight mb-3">
                    {fact.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted leading-relaxed text-sm">
                    {fact.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExperienceSection;
