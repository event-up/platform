import Image from "next/image";

interface EventCoverHeaderProps {
  coverImage?: string;
  logo?: string;
  eventName?: string;
}

export function EventCoverHeader({
  coverImage,
  logo,
  eventName = "Event",
}: EventCoverHeaderProps) {
  return (
    <div className="w-full relative">
      {/* Cover Image */}
      <div className="relative w-full h-48 md:h-64 rounded-t-lg overflow-hidden bg-gradient-to-r from-primary to-primary/60">
        {coverImage && (
          <Image
            src={coverImage}
            alt={`${eventName} cover`}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Logo Overlay */}
      {logo && (
        <div className="absolute -bottom-12 left-8 w-24 h-24 rounded-full shadow-lg border-4 border-card bg-card overflow-hidden">
          <Image
            src={logo}
            alt={`${eventName} logo`}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
