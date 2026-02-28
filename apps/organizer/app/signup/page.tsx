import { SignUpForm } from "./components/signup-form.container";
import Image from "next/image";

export default function Signup() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 p-1 lg:p-2 gap-4 lg:gap-8 bg-background">
      <div className="flex flex-col justify-center px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-md mx-auto">
          <SignUpForm />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block overflow-hidden rounded-lg">
        <Image
          src="/signup-bg.png"
          alt="Event Organizer at work"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for better contrast and premium feel */}
      </div>
    </div>
  );
}
