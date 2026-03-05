'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { env } from '@/env';

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
      {/* Animated morphing blobs with primary color gradients - more visible, larger, stronger blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[-15%] right-[-15%] w-[600px] h-[600px] rounded-full blur-[100px] animate-morph-1"
          style={{
            background: 'radial-gradient(circle, rgba(0,151,178,0.35) 0%, rgba(0,184,217,0.2) 50%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-15%] w-[500px] h-[500px] rounded-full blur-[100px] animate-morph-2"
          style={{
            background: 'radial-gradient(circle, rgba(0,184,217,0.25) 0%, rgba(0,151,178,0.15) 50%, transparent 70%)',
          }}
        />
      </div>

      <Container className="relative z-10 py-16 md:py-20 lg:py-32 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content with gradient overlay for readability */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left relative">
            {/* Gradient overlay to ensure text readability over animated blobs */}
            <div
              className="absolute inset-0 -z-10 rounded-[2rem] opacity-30"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, rgba(245,252,255,0.5) 100%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Headline */}
            <div className="mb-4 mt-6 md:mt-5 md:mb-6 text-4xl tracking-tight font-semibold md:text-6xl text-foreground animate-slide-up">
              Level up your event.
            </div>

            {/* Subheadline */}
            <div className="mb-4 md:mb-6 text-2xl md:text-3xl tracking lg:text-4xl font-semibold text-muted animate-slide-up" style={{ animationDelay: '0.1s' }}>
              The check-in experience your event deserves.
            </div>

            {/* Supporting Text */}
            <p className="mb-8 md:mb-10 hidden md:block tracking-tight text-lg md:text-xl lg:text-2xl text-muted leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              From registration to the final scan, EventUp keeps your team in control and your guests moving.
            </p>

            {/* CTAs */}
            <div className="flex flex-col animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center sm:items-stretch mb-3 relative">
                <div className="relative w-full sm:w-auto">
                  <Button variant="primary" size="md" href="/get-started" className="w-full sm:w-auto shadow-lg shadow-primary/20 relative z-10 block">
                    Join the Waitlist
                  </Button>
                  
                  {/* Hand-drawn arrow & text for Desktop */}
                  <div className="absolute top-[80%] left-[40%] pt-1 w-max hidden lg:flex flex-row items-start pointer-events-none">
                    <svg className="w-12 h-12 text-primary delay-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 80 80 Q 40 50 20 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M 20 20 L 40 22 M 20 20 L 22 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span 
                      className="text-2xl text-primary -rotate-3 transform translate-y-8 -ml-2 font-medium tracking-wide delay-400"
                      style={{ fontFamily: 'var(--font-caveat)' }}
                    >
                      Get exclusive offers<br/> when we launch.
                    </span>
                  </div>
                </div>
                
                <Button variant="secondary" className='border' size="md" href="/custom-setup">
                  Get a Custom Setup
                </Button>
              </div>
              
              <p className="text-sm text-muted text-center lg:text-left transition-opacity duration-500 delay-400 block lg:hidden">
                Be the first to know when we launch.
              </p>
            </div>
          </div>

          {/* Right Side - Auto-sliding Image Carousel */}
          <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                />
              </div>
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
      <div className="absolute bottom-8 left-0 right-0 md:left-1/2 md:right-auto flex justify-center md:block md:transform md:-translate-x-1/2 animate-bounce">
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
            transform: translate(-20px, 20px) scale(1.08);
            border-radius: 30% 70% 70% 30% / 30% 70% 70% 30%;
          }
          50% {
            transform: translate(20px, -20px) scale(0.92);
            border-radius: 50% 50% 30% 70% / 30% 70% 70% 30%;
          }
          75% {
            transform: translate(-10px, 10px) scale(1.04);
            border-radius: 70% 30% 50% 50% / 40% 50% 60% 50%;
          }
        }

        @keyframes morph-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          }
          30% {
            transform: translate(20px, -20px) scale(1.07);
            border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%;
          }
          60% {
            transform: translate(-20px, 20px) scale(0.93);
            border-radius: 30% 70% 70% 30% / 40% 60% 50% 60%;
          }
          85% {
            transform: translate(10px, -10px) scale(1.03);
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
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @media (min-width: 768px) {
          @keyframes bounce {
            0%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            50% {
              transform: translateX(-50%) translateY(-10px);
            }
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
