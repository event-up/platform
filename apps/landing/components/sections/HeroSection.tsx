'use client';

import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary-cream via-white to-primary/5">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-xl animate-morph-1"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-primary/20 rounded-full blur-xl animate-morph-2"></div>
      </div>

      <Container className="relative z-10 py-20 lg:py-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow Label */}
          <Badge variant="primary" className="mb-6 animate-fade-in">
            Event Attendance Management Platform
          </Badge>

          {/* Headline */}
          <h1 className="mb-6 text-foreground animate-slide-up">
            Level up your event.
          </h1>

          {/* Subheadline */}
          <h2 className="mb-6 text-2xl lg:text-3xl font-semibold text-muted animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We handle registration and attendance. You run the event.
          </h2>

          {/* Supporting Text */}
          <p className="mb-10 text-lg lg:text-xl text-muted max-w-3xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            From the first sign-up to the last scan at the door, Eventup keeps everything organised — so your team stays calm, your guests move fast, and you always know what's happening.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="primary" size="lg" href="#get-started">
              Get Started Free
            </Button>
            <Button variant="secondary" size="lg" href="#demo">
              See It in Action
            </Button>
          </div>

          {/* Reassurance Line */}
          <p className="text-sm text-muted flex flex-wrap items-center justify-center gap-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span>No credit card required</span>
            <span className="hidden sm:inline">·</span>
            <span>Any event type</span>
            <span className="hidden sm:inline">·</span>
            <span>Ready in minutes</span>
          </p>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-muted" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes morph-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            transform: translate(-10px, 10px) scale(1.05);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            transform: translate(10px, -10px) scale(0.95);
            border-radius: 50% 50% 30% 70% / 30% 70% 70% 30%;
          }
          75% {
            transform: translate(-5px, 5px) scale(1.02);
            border-radius: 70% 30% 50% 50% / 40% 50% 60% 50%;
          }
        }

        @keyframes morph-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          }
          30% {
            transform: translate(10px, -10px) scale(1.03);
            border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%;
          }
          60% {
            transform: translate(-10px, 10px) scale(0.97);
            border-radius: 30% 70% 70% 30% / 40% 60% 50% 60%;
          }
          85% {
            transform: translate(5px, -5px) scale(1.01);
            border-radius: 50% 50% 40% 60% / 70% 30% 60% 40%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-morph-1 {
          animation: morph-1 20s ease-in-out infinite;
        }

        .animate-morph-2 {
          animation: morph-2 25s ease-in-out infinite;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
