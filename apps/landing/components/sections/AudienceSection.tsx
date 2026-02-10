import React from 'react';
import Container from '../ui/Container';
import Badge from '../ui/Badge';

const AudienceSection: React.FC = () => {
  const audiences = [
    {
      title: "Corporate & HR Teams",
      description: "Managing staff events, away-days, and internal company gatherings where a professional entry experience and accurate headcount actually matter.",
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    },
    {
      title: "Conference & Summit Organizers",
      description: "Running multi-session events with large delegate numbers, multiple entrances, and a need for real-time visibility across the full day.",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    {
      title: "Workshop & Training Facilitators",
      description: "Hosting structured sessions where knowing exactly who attended — and having a clean record of it — is part of the job.",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    {
      title: "Community Groups & Clubs",
      description: "Replacing paper sign-in sheets with something any volunteer can run confidently, without any technical background required.",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    {
      title: "Meetup & Networking Organizers",
      description: "Managing recurring events where a consistent, low-effort check-in process lets the focus stay on the people, not the admin.",
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-secondary-cream/30 to-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="muted" className="mb-6">
            Who It&apos;s For
          </Badge>
          <h2 className="mb-6 text-foreground">
            Built for any organizer<br className="hidden sm:block"/>running any event.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Eventup fits into your workflow whether you&apos;re managing 30 people or 3,000.
          </p>
        </div>

        {/* Audience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((audience, index) => (
            <div 
              key={index}
              className="p-6 lg:p-8 rounded-2xl bg-white border border-border hover:border-primary/40 hover:shadow-lg smooth-transition group"
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                  <svg className="w-6 h-6 text-primary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d={audience.icon}></path>
                  </svg>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {audience.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AudienceSection;
