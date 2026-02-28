import React from 'react';
import Container from '../ui/Container';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
      title: "Built-In Registration Forms",
      description: "Stop juggling spreadsheets. Create beautiful, branded registration forms that collect exactly what you need."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      title: "Personalized Invitations with QR Codes",
      description: "Send every attendee a custom invitation automatically along with their unique QR code. No manual sending, no mix-ups."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
        </svg>
      ),
      title: "Fast Check-In via QR Scanner",
      description: "Skip the chaos at the entrance. Scan attendees in seconds using any smartphone — no expensive hardware required."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
      title: "Real-Time Attendance Tracking",
      description: "Know exactly who's arrived, who's missing, and how many guests you have — updated live as people check in."
    }
  ];

  return (
    <section
      style={{
        backgroundImage: 'url(/images/features-bg.png)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Dark overlay for readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.80) 50%, rgba(0,0,0,0.72) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Scrollable content sits above the overlay */}
      <div className="relative z-10 py-16 md:py-24 lg:py-32">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 px-4">
            <span className="inline-block text-xs md:text-sm font-semibold tracking-widest uppercase text-white/60 mb-3">
              Everything you need
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-5 leading-tight">
              What is EventUp?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              A platform that provides tools to streamline your event attendance management
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 lg:gap-8 px-4 md:px-0">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 rounded-2xl md:rounded-3xl smooth-transition hover:scale-[1.02]"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 md:w-14 md:h-14 mb-4 md:mb-5 rounded-xl md:rounded-2xl flex items-center justify-center text-white group-hover:scale-110 smooth-transition"
                  style={{
                    background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb, 99,102,241),0.5) 0%, rgba(255,255,255,0.12) 100%)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-white/65 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
};

export default FeaturesSection;
