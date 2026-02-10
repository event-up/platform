import React from 'react';
import Container from '../ui/Container';
import Badge from '../ui/Badge';

const ExperienceSection: React.FC = () => {
  const facts = [
    {
      title: "Your entry experience becomes something people notice",
      description: "Attendees walk up, show a QR code, and they're in. No queue building at the door, no volunteer frantically scanning a spreadsheet, no awkward hold-ups. The first thing your guests experience is an entrance that just works — and that sets the tone for everything that follows."
    },
    {
      title: "You always know exactly what's happening",
      description: "From the moment doors open, you have a live view of attendance — how many people have arrived, how many are still expected, and how each entrance is moving. You're not guessing or waiting until the end to find out. You're in control, in real time, from wherever you are."
    },
    {
      title: "Your team can handle the day without you micromanaging it",
      description: "Volunteers get a tool that's simple enough to use without any training. You set things up beforehand, share a link, and on the day your team runs the door confidently. Less briefing, fewer mistakes, less stress landing on you."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        {/* Section Label */}
        <div className="text-center mb-16">
          <Badge variant="muted" className="mb-6">
            The Experience
          </Badge>
          <h2 className="mb-6 text-foreground">
            You focus on the event.<br/>Eventup handles the rest.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Here's what changes when you run your next event on Eventup.
          </p>
        </div>

        {/* Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {facts.map((fact, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-muted-light/50 border border-border hover:border-primary/30 hover:shadow-lg smooth-transition"
            >
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg">
                  {index + 1}
                </span>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-foreground leading-tight">
                {fact.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {fact.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExperienceSection;
