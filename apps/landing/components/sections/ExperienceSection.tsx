import React from 'react';
import Container from '../ui/Container';
import Badge from '../ui/Badge';

const ExperienceSection: React.FC = () => {
  const facts = [
    {
      title: "Fully digitalized and robust attandance records",
      description: "No more manual entry, no more spreadsheets, no more lost attendees. EventUp handles everything digitally and you can access eveything from your mobile."
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
            We Took Attendance Off Your To-Do List
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Let your guests check in with a scan while you focus on what actually matters, making your event unforgettable.
          </p>
        </div>

        {/* Fact Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6">
            {facts.map((fact, index) => (
              <div 
                key={index}
                className="rounded-2xl bg-muted-light/50 border border-border p-6"
              >
                {/* Number Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-base">
                    {index + 1}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground leading-tight mb-3">
                  {fact.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted leading-relaxed text-sm">
                  {fact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExperienceSection;
