import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — EventUp',
  description: 'EventUp Privacy Policy — how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  const lastUpdated = 'February 26, 2026';

  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        {
          subtitle: '1.1 Information you provide',
          text: 'When you create an EventUp account or register for an event, we collect information you provide directly, including your name, email address, phone number, and any other details required by the event organizer\'s registration form.',
        },
        {
          subtitle: '1.2 Information collected automatically',
          text: 'When you use EventUp, we automatically collect certain information about your device and usage, including your IP address, browser type, operating system, pages visited, and time spent on the platform.',
        },
        {
          subtitle: '1.3 Event check-in data',
          text: 'When you check in at an event, we record the check-in timestamp and confirm your attendance status. This information is made available to the event organizer.',
        },
      ],
    },
    {
      title: '2. How We Use Your Information',
      content: [
        {
          subtitle: '',
          text: 'We use the information we collect to: provide and improve the EventUp platform; send you event invitations and QR codes; enable event organizers to manage registrations and check-ins; communicate with you about your account; ensure the security and integrity of our services; and comply with legal obligations.',
        },
      ],
    },
    {
      title: '3. Sharing Your Information',
      content: [
        {
          subtitle: '3.1 With event organizers',
          text: 'When you register for an event, the organizer will have access to the information you provided in the registration form, as well as your check-in status.',
        },
        {
          subtitle: '3.2 Service providers',
          text: 'We may share your information with trusted third-party service providers who assist us in operating the platform (e.g., email delivery, cloud hosting). These providers are bound by confidentiality agreements.',
        },
        {
          subtitle: '3.3 Legal requirements',
          text: 'We may disclose your information if required by law, court order, or other legal process, or if we believe disclosure is necessary to protect our rights, the rights of others, or public safety.',
        },
        {
          subtitle: '3.4 We do not sell your data',
          text: 'EventUp does not sell, rent, or trade your personal information to third parties for marketing purposes.',
        },
      ],
    },
    {
      title: '4. Data Retention',
      content: [
        {
          subtitle: '',
          text: 'We retain your personal information for as long as your account is active or as needed to provide you with our services. Event registration and check-in data is retained for the period specified by the event organizer or for a maximum of 2 years after the event date, whichever is shorter. You may request deletion of your data at any time by contacting us.',
        },
      ],
    },
    {
      title: '5. Security',
      content: [
        {
          subtitle: '',
          text: 'We implement industry-standard security measures to protect your personal information, including encryption in transit (TLS/HTTPS), access controls, and regular security reviews. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.',
        },
      ],
    },
    {
      title: '6. Your Rights',
      content: [
        {
          subtitle: '',
          text: 'Depending on your location, you may have the right to: access the personal information we hold about you; request correction of inaccurate data; request deletion of your data; withdraw consent for processing; and lodge a complaint with a data protection authority. To exercise any of these rights, please contact us at privacy@eventup.com.',
        },
      ],
    },
    {
      title: '7. Cookies',
      content: [
        {
          subtitle: '',
          text: 'EventUp uses cookies and similar technologies to maintain your session, remember your preferences, and analyse platform usage. You can control cookies through your browser settings. Disabling cookies may affect the functionality of the platform.',
        },
      ],
    },
    {
      title: '8. Children\'s Privacy',
      content: [
        {
          subtitle: '',
          text: 'EventUp is not intended for use by individuals under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.',
        },
      ],
    },
    {
      title: '9. Changes to This Policy',
      content: [
        {
          subtitle: '',
          text: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page with a new "Last Updated" date. Your continued use of EventUp after any changes constitutes your acceptance of the updated policy.',
        },
      ],
    },
    {
      title: '10. Contact Us',
      content: [
        {
          subtitle: '',
          text: 'If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at: privacy@eventup.com or through our Contact page at eventup.com/contact.',
        },
      ],
    },
  ];

  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 bg-primary/8 px-4 py-1.5 rounded-full">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5">Privacy Policy</h1>
            <p className="text-muted text-base">Last updated: {lastUpdated}</p>
            <div className="mt-6 p-5 rounded-2xl bg-primary/5 border border-primary/15">
              <p className="text-sm text-muted leading-relaxed">
                At EventUp, your privacy matters. This policy explains what data we collect, why we collect it, and how we protect it. 
                If you have questions after reading this, <a href="/contact" className="text-primary hover:underline font-medium">contact us</a> — we're happy to help.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20 md:pb-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-10">
              {sections.map((section, i) => (
                <div key={i} className="pb-10 border-b border-border last:border-0">
                  <h2 className="text-xl font-bold text-foreground mb-5">{section.title}</h2>
                  <div className="space-y-4">
                    {section.content.map((item, j) => (
                      <div key={j}>
                        {item.subtitle && (
                          <h3 className="text-base font-semibold text-foreground mb-2">{item.subtitle}</h3>
                        )}
                        <p className="text-muted leading-relaxed text-sm md:text-base">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-border text-center">
              <p className="text-sm text-muted mb-3">Questions about this policy?</p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact our team
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
