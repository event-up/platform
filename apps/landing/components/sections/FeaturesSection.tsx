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
      description: "Skip the chaos at the entrance. Scan attendees in seconds using any smartphone : no expensive hardware required."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
      title: "Real-Time Attendance Tracking",
      description: "Know exactly who's arrived, who's missing, and how many guests you have—updated live as people check in."
    }
  ];

  return (
    <section className="py-12 md:py-20 lg:py-28 bg-gradient-to-b from-white to-secondary-cream/10">
      <Container>
        {/* Section Header - Mobile First */}
        <div className="text-center mb-10 md:mb-16 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            What is EventUp?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            A platform that provides tools to streamline your event attendance management
          </p>
        </div>

        {/* Features Grid - Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 px-4 md:px-0">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/50 hover:bg-white border border-primary/10 hover:border-primary/30 smooth-transition hover:shadow-lg"
            >
              {/* Icon */}
              <div className="w-12 h-12 md:w-14 md:h-14 mb-4 md:mb-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/20 to-secondary-tan/20 flex items-center justify-center text-primary group-hover:scale-110 smooth-transition">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
