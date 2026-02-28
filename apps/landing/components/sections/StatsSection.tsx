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
      <div className="absolute inset-0 opacity-30">
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
            Organizers trust Eventup.<br className="hidden sm:block"/>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="flex justify-center flex-row gap-3">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-muted-light/50 to-white border border-border hover:border-primary/30 hover:shadow-xl smooth-transition group"
            >
              <div className="mb-4">
                <span className="text-5xl lg:text-6xl font-bold text-primary group-hover:scale-110 inline-block smooth-transition">
                  {stat.number}
                </span>
              </div>
              <p className="text-base lg:text-lg text-muted font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
