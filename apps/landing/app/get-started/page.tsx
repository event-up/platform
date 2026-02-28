import { OnboardingFlow } from "./components/onboarding-flow";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | EventUp Managed Beta",
  description: "Apply for our managed beta program to elevate your next event.",
};

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-20 lg:py-32">
      <div className="w-full max-w-2xl mx-auto">
        <OnboardingFlow />
      </div>
    </div>
  );
}
