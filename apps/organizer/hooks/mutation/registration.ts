import { useMutation, useQueryClient } from "react-query";
import { ParticipantStatus } from "@workspace/models/db/registration";
import { updateRegistrationStatus } from "@/actions/registrant-actions";
import { toast } from "sonner";

interface UpdateStatusParams {
  eventId: string;
  registrationId: string;
  status: ParticipantStatus;
}

export const useUpdateRegistrationStatusMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ eventId, registrationId, status }: UpdateStatusParams) => {
      const result = await updateRegistrationStatus({ eventId, registrationId, status });
      if (result?.serverError) throw new Error(result.serverError);
      if (result?.validationErrors) throw new Error("Invalid input provided");
      return result?.data;
    },
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
