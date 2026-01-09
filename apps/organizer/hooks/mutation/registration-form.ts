import { useMutation } from "react-query";
import { createRegistrationFormServer } from "@workspace/database/registration-form/post.server";
import { updateRegistrationForm } from "@workspace/database/registration-form/put";
import { RegistrationForm } from "@workspace/models/db/registration-form";
import { toast } from "sonner";

export const useCreateRegistrationFormMutation = () => {
  const mutation = useMutation({
    mutationFn: createRegistrationFormServer,
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
    mutationFn: updateRegistrationForm,
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
