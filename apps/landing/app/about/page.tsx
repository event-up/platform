import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — EventUp',
  description: 'Learn about EventUp, the event attendance management platform built for modern event organizers.',
};

export default function AboutPage() {
  const values = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Built for Speed',
      description: 'Every second at the door matters. EventUp is engineered to check in guests in under 4 seconds — no delays, no bottlenecks.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Reliability First',
      description: 'Your event day is not the time for surprises. EventUp works even in low-connectivity environments — because we\'ve been there.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Organizer Obsessed',
      description: 'We built EventUp by talking to organizers, not just engineers. Every feature exists because someone in the field needed it.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Simple by Design',
      description: 'A volunteer with no tech background should be able to run check-in on day one. That\'s our bar for simplicity.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Events powered' },
    { number: '50,000+', label: 'Guests checked in' },
    { number: '~4 sec', label: 'Average check-in time' },
  ];

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/4 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 bg-primary/8 px-4 py-1.5 rounded-full">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Built for the moments{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #0097B2 0%, #00B8D9 100%)' }}
              >
                that matter most.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              EventUp was born from a simple frustration: event check-in was stuck in the past. 
              Paper lists. Spreadsheets. Long queues. We built the platform we always wished existed.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Our Mission</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  Make every event entrance effortless.
                </h2>
                <p className="text-muted leading-relaxed mb-6 text-lg">
                  We believe that the entry experience sets the tone for the entire event. A smooth, fast, 
                  professional check-in tells your guests: this is well-organized. You made the right choice coming here.
                </p>
                <p className="text-muted leading-relaxed text-lg">
                  EventUp gives any organizer — from a corporate HR team running a company away-day to a 
                  community group hosting a meetup — the tools to deliver that experience, without complexity or cost.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-5">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md hover:border-primary/30 smooth-transition"
                  >
                    <div className="text-4xl md:text-5xl font-bold text-primary flex-shrink-0">{stat.number}</div>
                    <div className="text-muted font-medium text-lg">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">What We Stand For</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="group p-7 rounded-2xl bg-gray-50/80 border border-border hover:border-primary/30 hover:bg-white hover:shadow-lg smooth-transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary/15 smooth-transition">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24" style={{ background: 'linear-gradient(135deg, #0097B2 0%, #007A92 100%)' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your event check-in?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Join hundreds of organizers who have already made the switch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-primary font-semibold text-sm hover:bg-gray-50 smooth-transition shadow-lg"
              >
                Get Started Free
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/10 text-white font-semibold text-sm border-2 border-white/30 hover:bg-white/20 smooth-transition"
              >
                Talk to Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
