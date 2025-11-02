import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

type Props = {
  params: { eventId: string };
};

const mockEvents = [
  {
    eventId: "1",
    name: "Tech Conference 2024",
    date: new Date("2024-06-15T10:00:00"),
    location: "San Francisco Convention Center",
    description: "A comprehensive technology conference featuring the latest innovations in software development, AI, and cloud computing.",
    organizerId: "org-1",
  },
  {
    eventId: "2",
    name: "Music Festival Summer",
    date: new Date("2024-07-20T14:00:00"),
    location: "Central Park, New York",
    description: "Join us for an amazing outdoor music festival with top artists from around the world. Food trucks and vendors available.",
    organizerId: "org-1",
  },
  {
    eventId: "3",
    name: "Startup Networking Night",
    date: new Date("2024-05-10T18:00:00"),
    location: "The Innovation Hub, Seattle",
    description: "Network with entrepreneurs, investors, and tech professionals. Great opportunity to connect and share ideas.",
    organizerId: "org-1",
  },
  {
    eventId: "4",
    name: "Art Gallery Opening",
    date: new Date("2024-05-25T19:00:00"),
    location: "Modern Art Museum, Chicago",
    description: "Experience the unveiling of our latest contemporary art collection. Wine and refreshments provided.",
    organizerId: "org-1",
  },
];

export function generateStaticParams() {
  return mockEvents.map((event) => ({
    eventId: event.eventId,
  }));
}

export default function EventPage({ params }: Props) {
  const { eventId } = params;
  const event = mockEvents.find((e) => e.eventId === eventId);

  if (!event) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Event Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The event with ID <strong>{eventId}</strong> could not be found.
        </p>
        <Link href="/">
          <Button variant="outline">Back to Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            ← Back to Events
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{event.name}</CardTitle>
          <CardDescription className="text-base mt-2">
            {event.date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at{" "}
            {event.date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-muted-foreground">{event.location}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Event ID: <span className="font-mono">{event.eventId}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Organizer ID: <span className="font-mono">{event.organizerId}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
