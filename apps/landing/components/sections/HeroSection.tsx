'use client';

import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background decorative elements - subtle and clean */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-morph-1"></div>
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-morph-2"></div>
      </div>

      <Container className="relative z-10 py-16 md:py-20 lg:py-32 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Eyebrow Label */}
            {/* <Badge variant="primary" className="mb-4 md:mb-6 animate-fade-in">
              Event Attendance Management Platform
            </Badge> */}

            {/* Headline */}
            <div className="mb-4 md:mt-5 md:mb-6 text-5xl tracking-tight font-semibold md:text-6xl  text-foreground animate-slide-up">
              Level up your event.
            </div>

            {/* Subheadline */}
            <div className="mb-4 md:mb-6 text-2xl md:text-3xl tracking lg:text-4xl font-semibold text-muted animate-slide-up" style={{ animationDelay: '0.1s' }}>
              The check-in experience your event deserves.
            </div>

            {/* Supporting Text */}
            <p className="mb-8 md:mb-10 hidden md:block  text-lg md:text-xl lg:text-2xl text-muted leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              From registration to the final scan, EventUp keeps your team in control and your guests moving.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8 animate-slide-up justify-center lg:justify-start" style={{ animationDelay: '0.3s' }}>
              <Button variant="primary" size="md" href="#get-started">
                Get Started Free
              </Button>
              <Button variant="secondary" className='border' size="md" href="#demo">
                See It in Action
              </Button>
            </div>

            {/* Reassurance Line
            <p className="text-sm text-muted flex flex-wrap items-start gap-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <span>No credit card required</span>
              <span className="hidden sm:inline">·</span>
              <span>Any event type</span>
              <span className="hidden sm:inline">·</span>
              <span>Ready in minutes</span>
            </p> */}
          </div>

          {/* Right Side - Auto-sliding Image Carousel */}
          <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden ">
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
