'use client';

import React, { useState } from 'react';
import Container from '../ui/Container';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: 'Do I need to install any hardware to use EventUp?',
      answer: 'No. EventUp works with any smartphone or tablet. You can use your existing devices or set up a simple kiosk. No expensive scanners required.'
    },
    {
      question: 'How much will EventUp cost?',
      answer: <div>We provide custom quotes based on your event size and requirements. <a href="/contact" className="text-primary hover:underline">Contact us</a> for a personalized pricing plan.</div>
    },
    {
      question: 'Do you provide customized software solutions for events?',
      answer: <div>Yes! We offer custom add-ons to enhance your event experience: <br/>• Voting system for participants <br/>• Raffle draw tool <br/>• Welcome display app (shows scanned guest names with personalized welcome messages).</div>
    },
    {
      question: 'Is my event data secure?',
      answer: 'Yes. All data is encrypted in transit and at rest. QR codes are unique and cannot be forged. We never sell your data to third parties.'
    },
    {
      question: 'Can guests cancel their own registration?',
      answer: 'Yes! Organizers can enable a self-cancellation option, allowing guests to withdraw their registration. This keeps your guest list accurate and frees up spots automatically.'
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently asked questions</h2>
            <p className="text-muted text-lg">Everything you need to know about EventUp.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-border overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className="font-semibold text-foreground text-lg pr-4">{faq.question}</span>
                  <span className="text-primary flex-shrink-0">
                    {openIndex === i ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5">
                    <div className="pt-4 border-t border-border text-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
      </div>
      </Container>
    </section>
  );
};

export default FAQSection;
