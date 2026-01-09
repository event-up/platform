import { ReactNode } from "react";

interface RegistrationFormContainerProps {
  children: ReactNode;
}

export function RegistrationFormContainer({
  children,
}: RegistrationFormContainerProps) {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-card rounded-lg shadow-md overflow-hidden border border-border">
          {children}
        </div>
      </div>
    </div>
  );
}
