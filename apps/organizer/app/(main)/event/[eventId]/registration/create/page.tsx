"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEditor } from "@workspace/surveyjs/lib/editor/components";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import {
  useCreateRegistrationFormMutation,
  useUpdateRegistrationFormMutation,
} from "@/hooks/mutation/registration-form";
import { debug } from "console";
import { useRegistrationFormQuery } from "@/hooks/query/registration-form";
import { EditorState } from "@workspace/surveyjs/lib/models/types";
import { useCallback, useState } from "react";
import { FormState } from "react-hook-form";
import { Loader2, Save, X } from "lucide-react";

/**
 * Create Registration Form Page
 * Allows organizers to create a new registration form using the form editor
 */
const CreateRegistrationFormPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [currentFormState, setCurrentFormState] = useState<EditorState | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);

  const { registrations } = useRegistrationFormQuery(user.uid, eventId);
  const { mutateAsync } = useCreateRegistrationFormMutation();
  const { mutateAsync: updateMutateAsync } =
    useUpdateRegistrationFormMutation();

  const handleCancelEdit = () => {
    toast.info("Edit Cancelled", {
      description: "Changes to the form were discarded.",
    });
    router.push(`/event/${eventId}/registration`);
  };

  const handleSaveForm = useCallback(async (formState: EditorState) => {
    setIsSaving(true);
    try {
      console.log({ formState });
      debugger;
      if (registrations?.registrationFormId) {
        await updateMutateAsync({
          organizerId: user.uid,
          eventId,
          formId: registrations.registrationFormId,
          formData: {
            authentication: [],
            formSchema: {
              description: formState.surveyDescription,
              title: formState.surveyTitle,
              fields: formState.fields,
            },
            status: "active",
          },
        });
        toast.success("Form Updated", {
          description: "Your registration form has been updated successfully.",
        });
      } else {
        await mutateAsync({
          authentication: [],
          eventId,
          formSchema: {
            description: formState.surveyDescription,
            title: formState.surveyTitle,
            fields: formState.fields,
          },
          organizerId: user.uid,
          status: "active",
        });
        toast.success("Form Saved", {
          description: "Your registration form has been saved successfully.",
        });
      }
      setTimeout(() => {
        router.push(`/event/${eventId}/registration`);
      }, 1000);
    } catch (error) {
      toast.error("Save Failed", {
        description:
          (error as any)?.message || "Failed to save registration form.",
      });
      console.error("Error saving registration form:", error);
    } finally {
      setIsSaving(false);
    }
  }, []);

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
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={() => currentFormState && handleSaveForm(currentFormState)}
            disabled={isSaving || !currentFormState}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="">
          <FormEditor
            initialState={{
              surveyDescription: registrations?.formSchema.description,
              surveyTitle: registrations?.formSchema.title,
              fields: registrations?.formSchema.fields || [],
            }}
            onStateChange={setCurrentFormState}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRegistrationFormPage;
