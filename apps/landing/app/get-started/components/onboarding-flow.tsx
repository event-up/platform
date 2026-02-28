"use client";

import { useState } from "react";
import { CheckCircle2, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { env } from "@/env";

export function OnboardingFlow() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      const response = await fetch("https://formspree.io/f/mnjbrreq", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 focus:border-primary";
  const labelClasses = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700";

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fade-in duration-500 max-w-xl mx-auto py-10 px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Great! You are In
          </h2>
          <p className="text-lg text-muted">
            Since our platform is 
          </p>
        </div>

        <div className="bg-primary/5 rounded-2xl p-6 md:p-8 w-full border border-primary/10 text-left">
          <h3 className="font-semibold text-lg mb-4 text-foreground">What you get right now:</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
              <span className="text-foreground">Automatic bulk <strong>invitation</strong> sending</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
              <span className="text-foreground"><strong>Customized QR invites</strong> sent via SMS.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
              <span className="text-foreground"><strong>Free remote support</strong> for your scanning team.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
              <span className="text-foreground"><strong>Exclusive 'Founding Partner' pricing.</strong></span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col w-full gap-4 pt-4">
          <Button size="lg" className="w-full text-lg h-14 bg-primary text-white flex items-center justify-center group" href={`tel:${env.NEXT_PUBLIC_CONTACT_PHONE.replace(/\s+/g, '')}`}>
            <Phone className="mr-2 h-5 w-5 group-hover:animate-pulse" /> 
            <span className="md:hidden">Ring Us Now</span>
            <span className="hidden md:inline">Ring us : {env.NEXT_PUBLIC_CONTACT_PHONE}</span>
          </Button>
          <Button size="lg" variant="secondary" className="w-full text h-14 flex items-center justify-center cursor-pointer" href="/">
            <ArrowLeft className="mr-2 h-5 w-5" /> Go Back (We will ring you shortly)
          </Button>
        </div>
        
        <p className="text-sm text-muted mt-8">
          We've also sent a summary to your email, along with our "Professional Organizer's Guide to Digital Check-ins".
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 max-w-xl mx-auto px-4">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-2">
          Now Accepting Beta Partners
        </div>
        <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Join EnvetUp Beta Program & Enjoy Discounts
        </div>
        <p className="text-lg text-muted leading-relaxed">
          Tell us about your upcoming event. We are in the process of finalzing our platform and would love to have you on board as a beta partner. 
        </p>
      </div>

      <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-2xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="text-lg font-semibold border-b border-gray-100 pb-2 text-gray-900">Contact Details</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className={labelClasses}>Full Name</label>
                <input id="name" name="name" placeholder="Jane Doe" required className={inputClasses} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className={labelClasses}>Email</label>
                <input id="email" name="email" type="email" placeholder="jane@company.com" required className={inputClasses} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className={labelClasses}>WhatsApp / Phone Number</label>
              <input id="phone" name="phone" type="tel" placeholder="+94 71 123 4567" required className={inputClasses} />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="text-lg font-semibold border-b border-gray-100 pb-2 text-gray-900">Event Context</div>
            <div className="space-y-2">
              <label htmlFor="company" className={labelClasses}>Company / Club Name <span className="text-muted-foreground font-normal">(Optional)</span></label>
              <input id="company" name="company" placeholder="EventUp Productions" className={inputClasses} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="scale" className={labelClasses}>Estimated Guest Count <span className="text-muted-foreground font-normal">(Optional)</span></label>
                <select id="scale" name="scale" className={`${inputClasses} bg-white appearance-none`}>
                  <option value="" disabled selected>Select scale</option>
                  <option value="<100">Under 100</option>
                  <option value="100-500">100 - 500</option>
                  <option value="500-1000">500 - 1,000</option>
                  <option value="1000+">1,000+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className={labelClasses}>Tentative Event Date <span className="text-muted-foreground font-normal">(Optional)</span></label>
                <div className="relative">
                  <input id="date" name="date" type="date" className={inputClasses} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              className={`w-full flex items-center justify-center font-medium rounded-full smooth-transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-14 text-lg bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Event Details"}
            </button>
            <p className="text-xs text-center text-muted mt-4">
              By submitting, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
