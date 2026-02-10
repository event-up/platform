"use client";

import { useSearchParams } from "next/navigation";
import { RegistrationFormContainer } from "../components";
import { CheckCircle, Calendar, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("registrationId");

  return (
    <RegistrationFormContainer>
      <div className="p-8 md:p-12 space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-foreground">
            Registration Successful!
          </h1>
          <p className="text-muted-foreground text-lg">
            Thank you for registering. Your spot has been confirmed.
          </p>
        </div>

        {/* Registration Details */}
        <div className="bg-muted/50 rounded-lg p-6 space-y-4">
          <h2 className="font-semibold text-lg text-foreground">
            Registration Details
          </h2>

          {registrationId && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="font-medium">Confirmation ID:</span>
              <code className="bg-background px-2 py-1 rounded text-sm font-mono">
                {registrationId}
              </code>
            </div>
          )}

          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Check Your Email</p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent with your registration
                  details and event information.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Add to Calendar</p>
                <p className="text-sm text-muted-foreground">
                  Don't forget to add the event to your calendar so you don't
                  miss it!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">What's Next?</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                1
              </span>
              <span>Check your email for the confirmation details</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                2
              </span>
              <span>Save or screenshot your confirmation ID</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                3
              </span>
              <span>Show your confirmation at the event check-in</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/reg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Register Another Person
            </Link>
          </Button>
        </div>
      </div>
    </RegistrationFormContainer>
  );
}
