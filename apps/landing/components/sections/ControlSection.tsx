'use client';

import React, { useState } from 'react';
import Container from '../ui/Container';
import Badge from '../ui/Badge';

/* -------------------------------------------------------------------------- */
/*  Types                                                                       */
/* -------------------------------------------------------------------------- */
interface Feature {
  id: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  visual: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Inline Mini-Animations / Visuals                                            */
/* -------------------------------------------------------------------------- */

/** Animated drag-and-drop form builder mockup */
const FormBuilderVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6 md:p-8">
    <div className="w-full max-w-xs space-y-3 drop-shadow-2xl">
      <div className="rounded-2xl bg-white border border-gray-100 shadow-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="ml-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">Registration Form</span>
        </div>
        {['Full Name', 'Email Address', 'Phone Number'].map((label, i) => (
          <div
            key={label}
            className="mb-3 animate-[fadeSlideIn_0.6s_ease_forwards]"
            style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
          >
            <div className="text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-wide">{label}</div>
            <div className="h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center px-3">
              <div
                className="h-1.5 rounded-full bg-primary/20"
                style={{ width: `${55 + i * 15}%` }}
              />
            </div>
          </div>
        ))}
        <div className="mt-4 flex items-center gap-2 cursor-pointer" style={{ animation: 'clickTap 2.4s ease-in-out infinite' }}>
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="text-[11px] text-primary font-bold">Add Field</span>
        </div>
      </div>
    </div>
  </div>
);

/** Animated QR invitation send visual */
const InvitationVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6 md:p-8">
    <div className="w-full max-w-xs drop-shadow-2xl">
      <div className="rounded-2xl bg-white border border-gray-100 shadow-xl p-6 text-center">
        <div className="mb-4">
          <div className="text-xs text-gray-400 font-medium tracking-tight">Hello, Saharah 👋</div>
          <div className="text-base font-bold text-primary mt-1">You are invited!</div>
        </div>
        <div className="w-full h-px bg-gray-100 mb-5" />
        <div className="text-base font-bold text-gray-800 mb-1">Annual Company Party 2026</div>
        <div className="text-xs text-gray-400 mb-6">March 15 · Lotus Tower</div>
        <div className="flex justify-center mb-5">
          <div className="w-24 h-24 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner">
            <svg className="w-14 h-14 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
            </svg>
          </div>
        </div>
        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Scan at the door</div>
      </div>
    </div>
  </div>
);

/** Flexible check-in setup visual */
const CheckInSetupVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6 md:p-8">
    <div className="w-full max-w-xs space-y-4 drop-shadow-2xl">
      <div className="flex items-center gap-4 rounded-2xl bg-white border border-gray-100 shadow-lg p-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-bold text-gray-800">Staff Checker</div>
          <div className="text-[11px] text-gray-400 font-medium">3 active scanners</div>
        </div>
        <div className="ml-auto w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
      </div>
      <div className="flex items-center gap-4 rounded-2xl bg-white border border-gray-100 shadow-lg p-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-bold text-gray-800">Self-Check Kiosk</div>
          <div className="text-[11px] text-gray-400 font-medium">iPad Pro · Entrance A</div>
        </div>
        <div className="ml-auto w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
      </div>
      <div className="text-center text-[11px] text-primary font-bold uppercase tracking-wider">No hardware required</div>
    </div>
  </div>
);

/** Self-cancellation visual */
const CancellationVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6 md:p-8">
    <div className="w-full max-w-xs drop-shadow-2xl">
      <div className="rounded-2xl bg-white border border-gray-100 shadow-xl p-6">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Live Guest List</div>
        {[
          { name: 'Alex Thompson', status: 'checked in', color: 'green' },
          { name: 'Maria Gonzalez', status: 'withdrawn', color: 'red' },
          { name: 'James Osei', status: 'confirmed', color: 'blue' },
        ].map(({ name, status, color }) => (
          <div key={name} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-white ${
              color === 'green' ? 'bg-green-400' : color === 'red' ? 'bg-red-400' : 'bg-primary/40'
            }`}>
              {name[0]}
            </div>
            <div className="flex-1">
              <div className="text-[12px] font-bold text-gray-800">{name}</div>
            </div>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
              color === 'green' ? 'bg-green-50 text-green-600' : 
              color === 'red' ? 'bg-red-50 text-red-500 opacity-80' : 
              'bg-blue-50 text-blue-600'
            }`}>
              {status}
            </span>
          </div>
        ))}
        <div className="mt-4 flex items-center gap-2 bg-primary/5 rounded-xl p-3 border border-primary/10">
          <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span className="text-[11px] text-primary font-bold">1 spot freed up automatically</span>
        </div>
      </div>
    </div>
  </div>
);

/** Real-time QR scan visual */
const QRScanVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6 md:p-8">
    <div className="relative w-full max-w-xs flex flex-col items-center gap-6 drop-shadow-2xl">
      <div className="relative w-40 h-48 rounded-3xl border-[6px] border-gray-800 bg-gray-900 shadow-2xl overflow-hidden flex items-center justify-center">
        <div className="relative w-24 h-24 border-2 border-primary/50 rounded-xl flex items-center justify-center bg-primary/5">
          <div className="absolute inset-x-0 h-0.5 bg-primary animate-[scanLine_1.8s_ease-in-out_infinite]" style={{ top: '50%' }} />
          <svg className="w-12 h-12 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-white rounded-2xl shadow-xl border border-green-100 px-5 py-3.5 animate-[fadeSlideIn_0.5s_ease_0.6s_forwards]" style={{ opacity: 0 }}>
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-sm">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <div className="text-[13px] font-bold text-gray-800">Checked In!</div>
          <div className="text-[11px] text-gray-400 font-medium">Sarah M. · just now</div>
        </div>
        <div className="ml-4 pl-4 border-l border-gray-100">
          <span className="text-[12px] font-extrabold text-primary">247</span>
          <span className="text-[10px] text-gray-300 font-bold ml-1">/ 300</span>
        </div>
      </div>
    </div>
  </div>
);

const features: Feature[] = [
  {
    id: 'form-builder',
    eyebrow: 'Registration',
    title: 'Build Your Event Form in Minutes',
    tagline: '"No coding. No complexity. Just your event, ready to go."',
    description: 'With EventUp\'s drag-and-drop form builder, create a fully custom registration form — tailored to your event — in minutes. Collect exactly the information you need, nothing more.',
    visual: <FormBuilderVisual />,
  },
  {
    id: 'invitations',
    eyebrow: 'Invitations',
    title: 'Invite Guests Automatically',
    tagline: '"Stop copy-pasting invitations. Let EventUp handle it."',
    description: 'Send QR-code invitations the moment someone registers, or gather all registrations first and bulk-send when you\'re ready. Either way, every guest gets a personalized QR invitation — automatically.',
    visual: <InvitationVisual />,
  },
  {
    id: 'checkin-setup',
    eyebrow: 'Check-In Setup',
    title: 'Flexible Check-In, Your Way',
    tagline: '"Staff at the door? Tablet on a stand? We\'ve got both."',
    description: 'Assign checkers to manage the entrance, or set up a dedicated scanning station — a tablet or phone on a stand, ready to go. Your event, your setup. No expensive hardware needed.',
    visual: <CheckInSetupVisual />,
  },
  {
    id: 'self-cancel',
    eyebrow: 'Self-Management',
    title: 'Let Guests Manage Their Own Spot',
    tagline: '"Reduce no-shows. Keep your guest list accurate."',
    description: 'Unexpected cancellations happen. With EventUp\'s optional self-cancellation feature, participants can withdraw their own registration — keeping your headcount accurate and freeing up spots for others, automatically.',
    visual: <CancellationVisual />,
  },
  {
    id: 'qr-checkin',
    eyebrow: 'Check-In',
    title: 'Instant QR Check-In at the Door',
    tagline: '"Zero queues. Zero paper. Just scan and go."',
    description: 'Your checkers open the EventUp Scanner App, scan each guest\'s QR code, and that\'s it — instant check-in, real-time updates. No paper lists, no manual ticking, no bottlenecks at the entrance.',
    visual: <QRScanVisual />,
  },
];

const ControlSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanLine {
          0%, 100% { transform: translateY(-28px); }
          50%       { transform: translateY(28px); }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes clickTap {
          0%, 70%, 100% { transform: scale(1); }
          80%            { transform: scale(0.92); }
          90%            { transform: scale(0.96); }
        }
        @keyframes visualFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <Container>
        <div className="text-center mb-16 lg:mb-24 px-4">
          <Badge variant="primary" className="mb-5">Features</Badge>
          <h2 className="text-foreground text-3xl md:text-5xl font-bold mb-5 leading-tight">
            Your Event.{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #0097B2 0%, #00B8D9 100%)' }}
            >
              Fully Under Control.
            </span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Stop juggling spreadsheets, WhatsApp groups, and paper lists. EventUp handles
            registration, invitations, and check-in — so your event runs like clockwork.
          </p>
        </div>

        <div className="hidden lg:grid lg:grid-cols-5 gap-12 xl:gap-20 items-center">
          <div className="col-span-2 space-y-2 sticky top-32">
            {features.map((f, i) => (
              <button
                key={f.id}
                onMouseEnter={() => setActiveFeature(i)}
                className={`w-full text-left rounded-2xl px-7 py-6 transition-all duration-300 border ${
                  activeFeature === i
                    ? 'bg-primary/[0.03] border-primary/20 shadow-sm'
                    : 'bg-transparent border-transparent hover:bg-gray-50'
                }`}
              >
                <span className={`text-[11px] font-bold tracking-[0.1em] uppercase block mb-1.5 transition-colors duration-200 ${activeFeature === i ? 'text-primary' : 'text-gray-400'}`}>
                  {f.eyebrow}
                </span>
                <span className={`font-bold text-lg leading-tight transition-colors duration-200 ${activeFeature === i ? 'text-foreground' : 'text-gray-400'}`}>
                  {f.title}
                </span>
                {activeFeature === i && (
                  <p className="mt-3 text-[14px] text-muted leading-relaxed animate-[fadeSlideIn_0.3s_ease_forwards]">
                    {f.description}
                  </p>
                )}
              </button>
            ))}
          </div>

          <div className="col-span-3 sticky top-32">
            <div
              className="relative rounded-[2.5rem] overflow-hidden w-full flex items-center justify-center shadow-[0_32px_64px_-16px_rgba(0,151,178,0.15)]"
              style={{
                background: 'linear-gradient(145deg, #eef9fb 0%, #e1f5f9 50%, #f0fbfc 100%)',
                border: '1px solid rgba(0, 151, 178, 0.15)',
                minHeight: '520px',
              }}
            >
              <div
                className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-[0.15] blur-[80px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #0097B2 0%, transparent 70%)' }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-[0.08] blur-[80px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #0097B2 0%, transparent 70%)' }}
              />

              <div
                key={activeFeature}
                className="relative z-10 w-full flex items-center justify-center"
                style={{
                  minHeight: '520px',
                  animation: 'visualFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards, floatUp 4.5s ease-in-out 0.4s infinite',
                }}
              >
                {features[activeFeature].visual}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden space-y-12 px-4">
          {features.map((f) => (
            <div key={f.id} className="space-y-6">
              <div
                className="rounded-3xl overflow-hidden w-full flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(145deg, #f3fafc 0%, #eaf8fb 100%)',
                  border: '1px solid rgba(0, 151, 178, 0.08)',
                  minHeight: '280px',
                }}
              >
                {f.visual}
              </div>
              <div className="px-2">
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-primary block mb-2">{f.eyebrow}</span>
                <h3 className="text-2xl font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted text-base leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ControlSection;
