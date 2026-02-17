'use client';

import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import Badge from '../ui/Badge';

const ExperienceSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const images = [
    '/images/experience/image1.jpg',
    '/images/experience/image2.jpg',
    '/images/experience/image3.jpg'
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Fact Cards in Column */}
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

          {/* Right Side - Auto-sliding Image Carousel */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
            
            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-8 bg-white' 
                      : 'w-2 bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExperienceSection;
