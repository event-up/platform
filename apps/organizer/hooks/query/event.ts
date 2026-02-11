import { useQuery } from "react-query";
import { getEvent, getOrganizerEvents } from "@workspace/database/event/get";
import type { Event } from "@workspace/models/db/event";

export const useEventQuery = (
  eventId: string,
  organizerId: string
): {
  event: Event | undefined;
  isEventLoading: boolean;
  eventError: unknown;
} => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEvent(eventId, organizerId),
  });

  return {
    event: data as unknown as Event | undefined,
    isEventLoading: isLoading,
    eventError: error,
  };
};


export const useGetOrgnizerEventsQuery = (
  organizerId: string
): {
  events: Event[];
  isEventsLoading: boolean;
  eventsError: unknown;
} => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events", organizerId],
    initialData: [],
    queryFn: () => getOrganizerEvents(organizerId),
  });
  console.log("data", { data });

  return {
    events: (data as unknown as Event[]) || [],
    isEventsLoading: isLoading,
    eventsError: error,
  };
};
