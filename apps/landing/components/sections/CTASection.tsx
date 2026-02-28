import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { env } from '@/env';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary via-primary-dark to-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-cream/10 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="mb-6 text-white">
            Your next event deserves<br className="hidden sm:block"/>a smoother entry.
          </h2>

          {/* Supporting Text */}
          <p className="mb-10 text-lg lg:text-xl text-white/90 leading-relaxed">
            Set up your event on Eventup and see the difference on day one. Getting started takes less time than building another spreadsheet.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-end mb-8">
            <div className="flex flex-col items-center relative">
             
              <Button 
                variant="secondary" 
                size="lg" 
                href="/get-started"
                className="bg-white text-primary hover:bg-secondary-cream hover:text-primary-dark border-0 shadow-xl"
              >
                Upgrade My Next Event
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="lg" 
              href="#demo"
              className="bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 w-full sm:w-auto"
            >
              Request a Demo
            </Button>
          </div>

          {/* Reassurance Line */}
          <p className="text-sm text-white/80 leading-relaxed max-w-xl mx-auto">
            No complicated setup. No special hardware.<br className="hidden sm:block"/>
            Just a calmer, more organised event day.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
