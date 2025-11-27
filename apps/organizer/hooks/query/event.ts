import { useQuery } from "react-query";
import { getEvent, getOrganizerEvents } from "@workspace/database/event/get";

export const useEventQuery = (eventId: string, organizerId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEvent(eventId, organizerId),
  });

  return {
    event: data,
    isEventLoading: isLoading,
    eventError: error,
  };
};

export const useGetOrgnizerEventsQuery = (organizerId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events", organizerId],
    initialData: [],
    queryFn: () => getOrganizerEvents(organizerId),
  });

  return {
    events: data,
    isEventsLoading: isLoading,
    eventsError: error,
  };
};
