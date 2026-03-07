"use client";

import React, { useState, useEffect, useCallback } from "react";
import Container from "../ui/Container";


const engagementFeatures = [
  {
    title: "Real-Time VIP Welcome",
    oneLiner: "Personalized welcome on LED screens the moment guests scan in.",
    description:
      'Personalize the entrance with instant "Welcome, [Name]" greetings on venue LED screens. A high-tech "Wow" factor that makes every guest feel like a VIP the second they scan in.',
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="8" cy="6" r="2.5" />
        <path d="M4 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <rect x="14" y="4" width="8" height="6" rx="1" />
        <path d="M16 10v2h4v-2M18 14v2" />
      </svg>
    ),
  },
  {
    title: "Verified Live Voting",
    oneLiner: "Only checked-in attendees vote: secure polls, no paper, no errors.",
    description:
      "Run secure, fraud-proof polls for AGMs, elections, or contests. Our system ensures only checked-in attendees can vote: no paper ballots, no manual counting, no errors.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Smart Raffle Draws",
    oneLiner: "Draw winners from your live list in one click; only those present can win.",
    description:
      "Ditch the buckets and paper slips. Randomly draw winners from your live attendance list with one click. It's transparent, exciting, and ensures only those present can win.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
  },
  {
    title: "Interactive Photo Wall",
    oneLiner: "Guests upload photos to a Live Gallery on the big screen.",
    description:
      "Let your guests own the spotlight. Attendees upload photos from their phones directly to a Live Gallery on the big screen, building community and high energy throughout the event.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="1"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
        />
        <path d="M3 16l5-5 4 4 6-6 3 3" />
        <circle
          cx="8.5"
          cy="8.5"
          r="1.5"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

const AUTO_ADVANCE_MS = 8000;
const N = engagementFeatures.length;
// Infinite loop: [last, ...all, first] so indices 1..N are the real slides, 0 and N+1 are clones
const extendedSlides = [
  engagementFeatures[N - 1],
  ...engagementFeatures,
  engagementFeatures[0],
];

const EngagementSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // start at first real slide (index 1)
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const goTo = useCallback((logicalIndex: number) => {
    setCurrentIndex(logicalIndex + 1); // map 0..3 to 1..4
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => i + 1);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => i - 1);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (currentIndex === 0) {
      setTransitionEnabled(false);
      setCurrentIndex(N);
    } else if (currentIndex === extendedSlides.length - 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!transitionEnabled) {
      const id = requestAnimationFrame(() => setTransitionEnabled(true));
      return () => cancelAnimationFrame(id);
    }
  }, [transitionEnabled]);

  // Logical index for dots (0..N-1)
  const logicalIndex = (() => {
    if (currentIndex === 0) return N - 1;
    if (currentIndex === extendedSlides.length - 1) return 0;
    return currentIndex - 1;
  })();

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-secondary-cream/40 to-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <span className="inline-block text-xs md:text-sm font-semibold tracking-widest uppercase text-primary mb-3">
            Add-on features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-5 leading-tight">
            Beyond the Entrance: Elevate Guest Engagement
          </h2>
          <p className="text-base md:text-lg text-muted max-w-3xl mx-auto leading-relaxed">
            Check-in is just the start. Once the entrance is seamless, keep the
            energy high inside. Use our exclusive add-ons to turn attendance
            data into an interactive guest experience.
          </p>
        </div>

        {/* Carousel: one feature at a time, auto-scrolling */}
        <div className="relative w-full pl-12 pr-12 md:pl-16 md:pr-16">
          {/* Prev / Next buttons */}
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center text-foreground hover:border-primary/40 hover:text-primary smooth-transition"
            aria-label="Previous feature"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white border border-border shadow-md flex items-center justify-center text-foreground hover:border-primary/40 hover:text-primary smooth-transition"
            aria-label="Next feature"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Track: explicit width so each slide = 100% of viewport */}
          <div className="w-full overflow-hidden">
            <div
              className="flex"
              style={{
                width: `${extendedSlides.length * 100}%`,
                transform: `translateX(-${currentIndex * (100 / extendedSlides.length)}%)`,
                transition: transitionEnabled
                  ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedSlides.map((feature, i) => (
                <div
                  key={`${feature.title}-${i}`}
                  className="flex-shrink-0 px-1 sm:px-2 md:px-4"
                  style={{ width: `${100 / extendedSlides.length}%` }}
                >
                  <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-10 rounded-xl md:rounded-2xl bg-white border border-border shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed md:hidden">
                      {feature.oneLiner}
                    </p>
                    <p className="hidden md:block text-muted leading-relaxed text-base lg:text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {engagementFeatures.map((_, index) => (
              <button
                key={engagementFeatures[index].title}
                type="button"
                onClick={() => goTo(index)}
                className="w-2.5 h-2.5 rounded-full smooth-transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                style={{
                  backgroundColor: index === logicalIndex ? "var(--primary)" : "var(--color-border)",
                }}
                aria-label={`Go to feature ${index + 1}`}
                aria-current={index === logicalIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EngagementSection;
