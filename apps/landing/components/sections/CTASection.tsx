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
          <div className="flex flex-col items-center mb-10 mt-8 relative">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto relative">
              <div className="relative w-full sm:w-auto">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  href="/get-started"
                  className="bg-white text-primary hover:bg-secondary-cream hover:text-primary-dark border-0 shadow-xl w-full sm:w-auto relative z-10 block"
                >
                  Join the Waitlist
                </Button>
                
                {/* Hand-drawn arrow & text for Desktop/Tablet */}
                <div className="absolute top-[105%] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-1/4 pt-2 w-max hidden sm:flex flex-row items-start text-white/90">
                  <svg className="w-10 h-10 transform -scale-x-100 rotate-[70deg] mt-1 -ml-4 mr-2" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 80 Q 40 20, 80 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M80 40 L 60 30 M 80 40 L 70 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span 
                    className="text-2xl -rotate-6 transform translate-y-2 font-medium tracking-wide"
                    style={{ fontFamily: 'var(--font-caveat)' }}
                  >
                    Be the first to know when we launch.
                  </span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="lg" 
                href="/custom-setup"
                className="bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 w-full sm:w-auto"
              >
                Get a Custom Setup
              </Button>
            </div>
            
            {/* Fallback for Mobile */}
            <div className="flex sm:hidden flex-col items-center mt-6 w-full gap-2 text-white/90">
              <svg className="w-8 h-8 transform -rotate-45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 80 Q 40 20, 80 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M80 40 L 60 30 M 80 40 L 70 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span 
                className="text-xl font-medium tracking-wide -rotate-3"
                style={{ fontFamily: 'var(--font-caveat)' }}
              >
                Be the first to know when we launch.
              </span>
            </div>
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
