import React from 'react';
import Container from '../ui/Container';
import Badge from '../ui/Badge';

const StatsSection: React.FC = () => {
  const stats = [
    // {
    //   number: "500+",
    //   label: "Events conducted on the platform"
    // },
    {
      number: "3000+",
      label: "Event Invitations sent"
    },
       {
      number: "2500+",
      label: "Participants checked in"
    },

  ];

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#0097B2 2px, transparent 2px)", 
          backgroundSize: "40px 40px",
          opacity: 0.15
        }}
      ></div>
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary-tan/5 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-6">
            By the Numbers
          </Badge>
          <h2 className="text-foreground">
            Organizers trust EventUp.<br className="hidden sm:block"/>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="flex justify-center flex-wrap gap-3">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-8 group"
            >
              <div className="mb-4">
                <span className="text-6xl lg:text-8xl font-bold text-primary group-hover:scale-110 inline-block smooth-transition">
                  {stat.number}
                </span>
              </div>
              <p className="text-lg lg:text-xl text-muted font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Social Proof Line */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Trusted by the cooperate clubs and event organisers in Sri Lanka.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
