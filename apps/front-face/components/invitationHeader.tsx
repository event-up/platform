import Image from "next/image";
import { Calendar } from "lucide-react";

interface InvitationHeaderProps {
  eventName?: string;
  eventLogo?: string;
}

export default function InvitationHeader({
  eventName = "Event Name",
  eventLogo,
}: InvitationHeaderProps) {
  return (
    <div className="w-full max-w-md mx-auto text-center space-y-4 px-4">
      <div className="flex justify-center items-center mb-6">
        {eventLogo ? (
          <div className="relative w-16 h-16 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
            <Image
              src={eventLogo}
              alt={eventName}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-4 border-primary/20 shadow-lg">
            <Calendar className="w-12 h-12 sm:w-14 sm:h-14 text-primary" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
          {eventName}
        </h1>
      </div>

      <div className="pt-2">
        <p className="text-base sm:text-lg text-muted-foreground font-medium">
          You are invited
        </p>
      </div>
    </div>
  );
}