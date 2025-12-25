"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEditor } from "@workspace/surveyjs/lib/editor/components";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { useCreateRegistrationFormMutation } from "@/hooks/mutation/registration-form";
import { debug } from "console";

/**
 * Create Registration Form Page
 * Allows organizers to create a new registration form using the form editor
 */
const CreateRegistrationFormPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const { mutate, mutateAsync } = useCreateRegistrationFormMutation();
  const handleSaveForm = () => {
    // TODO: Implement form save logic using createRegistrationFormServer
    toast.success("Form Saved", {
      description: "Your registration form has been saved successfully.",
    });
    router.push(`/event/${eventId}/registration`);
  };

  const handleCancelEdit = () => {
    toast.info("Edit Cancelled", {
      description: "Changes to the form were discarded.",
    });
    router.push(`/event/${eventId}/registration`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create Registration Form
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize the fields for your event registration form
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button onClick={handleSaveForm}>Save Form</Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <FormEditor
            onSaveClick={async (formState) => {
              debugger;

              const res = await mutateAsync({
                authentication: [],
                eventId,
                formSchema: {
                  formDescription: formState.surveyDescription,
                  formTitle: formState.surveyTitle,
                  formFields: JSON.stringify(formState.fields),
                },
                organizerId: user.uid,
                status: "active",
              });
              toast.success("Form Saved", {
                description:
                  "Your registration form has been saved successfully.",
              });
              setTimeout(() => {});
              router.push(`/event/${eventId}/registration`);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRegistrationFormPage;
