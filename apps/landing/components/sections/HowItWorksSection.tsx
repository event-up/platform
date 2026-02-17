'use client';

import React from 'react';
import Container from '../ui/Container';
import Badge from '../ui/Badge';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Create Registration Form",
      description: "Build a custom registration form in minutes with your branding and required fields.",
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
      color: "from-primary/20 to-primary/10"
    },
    {
      number: 2,
      title: "Participants Fill the Form",
      description: "Your attendees register with their details — everything is automatically organized in your dashboard.",
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
      ),
      color: "from-primary/20 to-primary/10"
    },
    {
      number: 3,
      title: "Receive Personalized QR Code",
      description: "Each participant instantly receives their unique QR code invitation via SMS or email.",
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
        </svg>
      ),
      color: "from-primary/20 to-primary/10"
    },
    {
      number: 4,
      title: "Scan and Check In",
      description: "At the entrance, volunteers scan QR codes — instant verification, live updates, zero hassle.",
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      color: "from-primary/20 to-primary/10"
    },
    {
      number: 5,
      title: "Real-Time Check-In Count",
      description: "Track attendance metrics, analyze patterns, and generate comprehensive reports for your event.",
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
      color: "from-primary/20 to-primary/10"
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-32 bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 px-4">
          <Badge variant="primary" className="mb-4 md:mb-6">
            How It Works
          </Badge>
          <h2 className="mb-4 md:mb-6 text-foreground">
            Form setup to check-in<br className="hidden sm:block"/>in five simple steps
          </h2>
          <p className="text-base md:text-lg text-muted max-w-2xl mx-auto">
            Everything you need to manage your event attendance — simplified and automated.
          </p>
        </div>

        {/* Desktop Timeline View */}
        <div className="hidden lg:block relative">
          {/* Steps */}
          <div className="grid grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                {/* Icon Circle with Connecting Line */}
                <div className="relative mb-6 w-full flex items-center justify-center">
                  {/* Connecting Line - Left Side */}
                  {index > 0 && (
                    <div className="absolute right-1/2 top-1/2 w-[calc(50%+1.5rem)] h-0.5 -translate-y-1/2 mr-10 overflow-hidden">
                      <div className="h-full border-t-2 border-dashed border-primary/40 animate-dash-flow"></div>
                    </div>
                  )}
                  
                  {/* Connecting Line - Right Side */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-1/2 w-[calc(50%+1.5rem)] h-0.5 -translate-y-1/2 ml-10 overflow-hidden">
                      <div className="h-full border-t-2 border-dashed border-primary/40 animate-dash-flow"></div>
                    </div>
                  )}
                  
                  {/* Flip Circle Container */}
                  <div className="relative w-16 h-16 z-10" style={{ perspective: '1000px' }}>
                    <div className="w-full h-full relative transition-transform duration-500 group-hover:[transform:rotateY(180deg)]" style={{ transformStyle: 'preserve-3d' }}>
                      {/* Front - Number */}
                      <div className={`absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} border-4 border-white shadow-lg flex items-center justify-center backface-hidden`} style={{ backfaceVisibility: 'hidden' }}>
                        <span className="text-2xl font-bold text-primary">{step.number}</span>
                      </div>
                      
                      {/* Back - Icon */}
                      <div className={`absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} border-4 border-white shadow-lg flex items-center justify-center text-primary backface-hidden`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                <div className="space-y-3">
                  <div className="text-base md:text-lg font-semibold text-muted leading-tight">
                    {step.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 group">
              {/* Left: Icon and Connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                {/* Flip Circle Container */}
                <div className="relative" style={{ perspective: '1000px' }}>
                  <div className="w-12 h-12 relative transition-transform duration-500 group-hover:[transform:rotateY(180deg)]" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Front - Number */}
                    <div className={`absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} border-3 border-white shadow-lg flex items-center justify-center backface-hidden`} style={{ backfaceVisibility: 'hidden' }}>
                      <span className="text-lg font-bold text-primary">{step.number}</span>
                    </div>
                    
                    {/* Back - Icon */}
                    <div className={`absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} border-3 border-white shadow-lg flex items-center justify-center text-primary backface-hidden`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                      <div className="w-5 h-5">{step.icon}</div>
                    </div>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="w-1 h-16 bg-gradient-to-b from-primary/30 to-secondary-tan/30 mt-4"></div>
                )}
              </div>

              {/* Right: Content */}
              <div className="flex-1 pt-2">
                <div className="text-base md:text-lg font-semibold text-muted leading-tight">
                  {step.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary border border-primary/20">
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span className="font-medium">Set up in under 10 minutes</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
