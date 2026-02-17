import React from 'react';
import Container from '../ui/Container';
import Badge from '../ui/Badge';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      label: "Form Creation",
      title: "Build your registration form",
      description: "Create a clean, branded registration form in minutes. Share the link and watch your guest list fill up automatically — organised, searchable, and ready for event day without any manual work on your end.",
      position: "right" as const
    },
    {
      label: "Automated Invitations",
      title: "Send invitations automatically",
      description: "The moment someone registers, Eventup sends them a personalised invitation with their unique QR code — by SMS, email, or both. No bulk sending, no copy-pasting, no follow-up needed. Every attendee arrives prepared.",
      position: "left" as const
    },
    {
      label: "QR Check-In & Live Tracking",
      title: "Scan in. Update instantly.",
      description: "On the day, volunteers scan QR codes on any smartphone. Each scan is confirmed in under five seconds and your attendance dashboard updates live. Multiple entrances, one unified view. Nothing falls through the gaps.",
      position: "right" as const
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-32 bg-gradient-to-b from-white to-secondary-cream/10">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 px-4">
          <Badge variant="primary" className="mb-4 md:mb-6">
            How It Works
          </Badge>
          <h2 className="text-foreground">
            Three things that make event day<br className="hidden sm:block"/>genuinely easier.
          </h2>
        </div>

        {/* Features */}
        <div className="space-y-24 lg:space-y-32">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col ${feature.position === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center`}
            >
              {/* Animation Placeholder */}
              <div className="flex-1 w-full">
                <div className="aspect-video rounded-3xl bg-gradient-to-br from-primary/20 to-secondary-tan/20 glass-effect flex items-center justify-center group hover:scale-105 smooth-transition">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <svg className="w-10 h-10 text-primary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        {index === 0 && <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>}
                        {index === 1 && <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>}
                        {index === 2 && <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>}
                      </svg>
                    </div>
                    <p className="text-sm text-muted font-medium">
                      Animation placeholder - can be replaced later
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <Badge variant="secondary" className="mb-4">
                  {feature.label}
                </Badge>
                <h3 className="mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
