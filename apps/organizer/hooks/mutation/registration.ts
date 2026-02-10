import { useMutation, useQueryClient } from "react-query";
import { ParticipantStatus } from "@workspace/models/db/registration";
import { updateRegistrationStatus } from "@/actions/registrant-actions";
import { toast } from "sonner";

interface UpdateStatusParams {
  organizerId: string;
  eventId: string;
  registrationId: string;
  status: ParticipantStatus;
}

export const useUpdateRegistrationStatusMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      organizerId,
      eventId,
      registrationId,
      status,
    }: UpdateStatusParams) =>
      updateRegistrationStatus(organizerId, eventId, registrationId, status),
    onSuccess: (data, variables) => {
      const statusMessages: Record<ParticipantStatus, string> = {
        registered: "Participant restored to registered",
        "self-cancelled": "Participant marked as self-cancelled",
        blocked: "Participant blocked successfully",
        "checked-in": "Participant checked in successfully",
      };
      toast.success("Status Updated", {
        description: statusMessages[variables.status],
      });
      // Invalidate registrations query to refetch data
      queryClient.invalidateQueries(["registration", variables.eventId]);
    },
    onError: (error: any) => {
      toast.error("Update Failed", {
        description: error?.message || "Failed to update participant status.",
      });
      console.error("Error updating registration status:", error);
    },
  });

  return mutation;
};
