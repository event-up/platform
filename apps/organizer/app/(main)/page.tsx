"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Car, Plus } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import moment from "moment";
import { useGetOrgnizerEventsQuery } from "@/hooks/query/event";
import { useAuth } from "@/lib/auth-context";

export default function MainPage() {
  const { user } = useAuth();
  const { events } = useGetOrgnizerEventsQuery(user!.uid);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-semibold">Manage Events</h1>
        <Link href="/event/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!events?.length && (
          <p className="text-center text-muted-foreground">No events found.</p>
        )}
        {events?.map((event) => (
          <Link key={event.eventId} href={`/event/${event.eventId}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-xl">{event.name}</CardTitle>
                <CardDescription>
                  {moment(event.date).format("ddd, MMMM D, YYYY, hh:mm A")}
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
