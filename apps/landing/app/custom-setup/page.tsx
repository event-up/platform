import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Custom Setup | EventUp",
  description: "Get a fully managed EventUp setup. We handle QR generation, invitations, and check-in for you.",
};

export default function CustomSetupPage() {
  return (
    <div className="min-h-screen bg-background py-20 lg:py-32">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <p className="mb-8">
            <a href="/" className="text-primary hover:underline flex items-center gap-2">
              ← Back to home
            </a>
          </p>

          {/* Hero content for this page */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Let Us Handle Everything
            </h1>
            <p className="text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              You focus on your event. We'll manage the entire check-in experience — from QR generation to scanning at the door.
            </p>
          </div>

          {/* What's included */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border-2 border-primary/10 rounded-2xl bg-white">
              <h3 className="text-xl font-semibold mb-4 text-primary">Managed QR Generation</h3>
              <p className="text-muted">
                We create unique QR codes for each guest, linked to your event. No technical setup needed on your end.
              </p>
            </div>
            <div className="p-6 border-2 border-primary/10 rounded-2xl bg-white">
              <h3 className="text-xl font-semibold mb-4 text-primary">Bulk QR Sending</h3>
              <p className="text-muted">
                We send invitations via SMS or email to all your guests, with high deliverability and tracking.
              </p>
            </div>
            <div className="p-6 border-2 border-primary/10 rounded-2xl bg-white">
              <h3 className="text-xl font-semibold mb-4 text-primary">Custom Check-in App</h3>
              <p className="text-muted">
                Your team gets a branded scanning app (mobile/tablet) with fast QR capture and offline capability.
              </p>
            </div>
            <div className="p-6 border-2 border-primary/10 rounded-2xl bg-white">
              <h3 className="text-xl font-semibold mb-4 text-primary">Invitation Design</h3>
              <p className="text-muted">
                We design beautiful, customized invitation screens that match your event's branding.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border-2 border-primary/10">
            <h2 className="text-2xl font-semibold mb-4">Ready to hand off the details?</h2>
            <p className="text-lg text-muted mb-6">
              We'll set everything up for you. Just tell us about your event and we'll take it from there.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="primary" size="lg" href="tel:+94771234567" className="w-full sm:w-auto shadow-lg">
                Call Us Now
              </Button>
              <Button variant="secondary" size="lg" href="mailto:hello@eventup.ap" className="w-full sm:w-auto border-2">
                Send an Email
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted">
              Or reach us directly: <strong className="text-primary">+94 77 123 4567</strong>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
