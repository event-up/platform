import { MapPin, Clock } from "lucide-react";

interface InvitationFooterProps {
  location?: string;
  date?: string;
}

export default function InvitationFooter({
  location = "123 Main Street, City, State 12345",
  date = "2024-12-25T18:00:00",
}: InvitationFooterProps) {

 // const formattedDate = formatDate(date);

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-6 sm:pt-8">
      <div className="space-y-4 sm:space-y-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 mt-0.5">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-medium text-foreground mb-1">
              Location
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {location}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 mt-0.5">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-medium text-foreground mb-1">
              Date & Time
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}