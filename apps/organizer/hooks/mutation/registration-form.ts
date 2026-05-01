import { useMutation } from "react-query";
import {
  createRegistrationFormAction,
  updateRegistrationFormAction,
} from "@/actions/registration-form-actions";
import { toast } from "sonner";

export const useCreateRegistrationFormMutation = () => {
  const mutation = useMutation({
    mutationFn: async (input: any) => {
      const result = await createRegistrationFormAction(input);
      if (result?.serverError) throw new Error(result.serverError);
      if (result?.validationErrors) throw new Error("Invalid input provided");
      return result?.data;
    },
    onSuccess: (data) => {
      toast.success("Registration Form Created", {
        description: "Your registration form has been saved successfully.",
      });
    },
    onError: (error: any) => {
      toast.error("Creation Failed", {
        description: error?.message || "Failed to create registration form.",
      });
      console.error("Error creating registration form:", error);
    },
  });

  return mutation;
};

export const useUpdateRegistrationFormMutation = () => {
  const mutation = useMutation({
    mutationFn: async (input: any) => {
      const result = await updateRegistrationFormAction(input);
      if (result?.serverError) throw new Error(result.serverError);
      if (result?.validationErrors) throw new Error("Invalid input provided");
      return result?.data;
    },
    onSuccess: (data) => {
      toast.success("Registration Form Updated", {
        description: "Your registration form has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast.error("Update Failed", {
        description: error?.message || "Failed to update registration form.",
      });
      console.error("Error updating registration form:", error);
    },
  });

  return mutation;
};
