"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Spinner } from "@workspace/ui/components/spinner";
import { useAuth } from "@/lib/auth-context";
import { useEventQuery } from "@/hooks/query/event";
import { useParams } from "next/navigation";
import moment from "moment";

export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const { event, isEventLoading, eventError } = useEventQuery(
    eventId,
    user!.uid
  );
  console.log({ event });

  if (!eventId) {
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

  if (isEventLoading || !event) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Loading Event</h1>
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      </div>
    );
  }

  if (eventError) {
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
            {moment(new Date(event.date)).format("dddd, MMMM D, YYYY")} at{" "}
            {moment(new Date(event.date)).format("h:mm A")}
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
              Organizer ID:{" "}
              <span className="font-mono">{event.organizerId}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
