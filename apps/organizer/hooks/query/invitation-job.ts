import { useQuery } from "react-query";
import { getInvitationJobsByEvent } from "@workspace/database/invitation-job/get";

export const useAllInvitationJobGet = (
  organizerId: string,
  eventId: string
) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["invitation-jobs", organizerId, eventId],
    refetchOnWindowFocus: false,
    queryFn: () => {
      console.log("Querying Invitation Jobs....");

      return getInvitationJobsByEvent(organizerId, eventId);
    },
  });

  return {
    invitationJobs: data,
    isInvitationJobsLoading: isLoading,
    invitationJobsError: error,
  };
};
