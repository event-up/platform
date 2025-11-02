import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Car } from "lucide-react";

// Mock event data
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

export default function MainPage() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold mb-4">Manage Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <Link key={event.eventId} href={`/event/${event.eventId}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-xl">{event.name}</CardTitle>
                <CardDescription>
                  {event.date.toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                     {event.location}
                  </p>
                  <p className="text-sm line-clamp-3">{event.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
