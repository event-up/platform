"use client";

import { useState } from "react";
import { FormRenderer } from "@workspace/surveyjs";
import {
  EventCoverHeader,
  FormHeader,
  RegistrationFormContainer,
} from "./components";
import { useRegistrationContext } from "./registration-context";
import { useEventFromDomainQuery } from "@/hooks/query/event";
import { createRegistration } from "./actions";
import { CONTACT_CHANNEL_FIELDS } from "@workspace/surveyjs/lib/editor/constants";
import { RegistrationContactChannels } from "@workspace/models/db/registration";
import { useRouter } from "next/navigation";

export function RegistrationFlow() {
  const { domain } = useRegistrationContext();
  const { event, registrationForm, isEventLoading, eventError } =
    useEventFromDomainQuery(domain);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (isEventLoading) {
    return (
      <RegistrationFormContainer>
        <div className="p-8 md:p-12">Loading registration form...</div>
      </RegistrationFormContainer>
    );
  }

  if (eventError || !event || !registrationForm?.formSchema) {
    return (
      <RegistrationFormContainer>
        <div className="p-8 md:p-12 text-destructive">
          {"Registration form not found."}
        </div>
      </RegistrationFormContainer>
    );
  }

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const contactChannels: {
        type: RegistrationContactChannels;
        value: string;
      }[] = [];

      const formFields = registrationForm?.formSchema.fields || [];

      formFields.forEach((field) => {
        if (CONTACT_CHANNEL_FIELDS.includes(field.type) && data[field.id]) {
          const channelType =
            field.type.toUpperCase() as RegistrationContactChannels;
          contactChannels.push({
            type: channelType,
            value: data[field.id],
          });
        }
      });

      const result = await createRegistration(
        event.eventId,
        event.organizerId,
        contactChannels,
        { registrationData: data },
      );

      if (result.success) {
        router.push(
          `/reg/confirmation?registrationId=${result.data?.registrationId}`,
        );
      } else {
        setSubmitError(result.message);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed";
      setSubmitError(message);
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegistrationFormContainer>
      <EventCoverHeader coverImage={""} logo={""} eventName={event.name} />

      <div className="p-8 md:p-12 space-y-8">
        <div className="h-8" />

        <FormHeader
          title={registrationForm?.formSchema.title || "Event Registration"}
          description={
            registrationForm?.formSchema.description ||
            "Complete the form below to register"
          }
        />

        <div className="border-t border-border" />

        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {submitError}
          </div>
        )}

        <div className="space-y-6">
          <FormRenderer
            schema={registrationForm?.formSchema}
            onSubmit={handleSubmit}
            submitButtonText={
              isSubmitting ? "Submitting..." : "Complete Registration"
            }
            cancelButtonText="Clear Form"
            showCancel={true}
          />
        </div>
      </div>
    </RegistrationFormContainer>
  );
}
