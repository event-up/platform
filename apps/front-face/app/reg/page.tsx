"use client";

import { useEffect, useState } from "react";
import { FormRenderer, type FormSchema } from "@workspace/surveyjs";
import {
  EventCoverHeader,
  FormHeader,
  RegistrationFormContainer,
} from "./components";
import { useRegistrationContext } from "./registration-context";
import { useEventFromDomainQuery } from "@/hooks/query/event";

// Hardcoded schema for testing
const registrationSchema: FormSchema = {
  title: "Event Registration Form",
  description: "Please fill in your details to register for this event",
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
        customMessage: "First name must be between 2 and 50 characters",
      },
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "your.email@example.com",
      required: true,
      description: "We'll send your confirmation to this email",
    },
    {
      name: "phone",
      type: "phone",
      label: "Phone Number",
      placeholder: "+1 (555) 000-0000",
      required: false,
      description: "Optional - for event updates",
    },
    {
      name: "ticketType",
      type: "dropdown",
      label: "Ticket Type",
      placeholder: "Select ticket type",
      required: true,
      options: [
        { label: "General Admission", value: "general" },
        { label: "VIP Pass", value: "vip" },
        { label: "Student Ticket", value: "student" },
        { label: "Early Bird", value: "earlybird" },
      ],
    },
    {
      name: "dietaryRestrictions",
      type: "multiselect",
      label: "Dietary Restrictions",
      required: false,
      options: [
        { label: "Vegetarian", value: "vegetarian" },
        { label: "Vegan", value: "vegan" },
        { label: "Gluten-Free", value: "gluten-free" },
        { label: "Nut-Free", value: "nut-free" },
        { label: "Dairy-Free", value: "dairy-free" },
      ],
      description: "Select all that apply",
    },
    {
      name: "heardAbout",
      type: "select",
      label: "How did you hear about this event?",
      required: true,
      options: [
        { label: "Social Media", value: "social" },
        { label: "Email", value: "email" },
        { label: "Friend/Colleague", value: "referral" },
        { label: "Search Engine", value: "search" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "comments",
      type: "text",
      label: "Additional Comments",
      placeholder: "Any special requests or questions?",
      required: false,
      validation: {
        maxLength: 500,
      },
      description: "Optional - Maximum 500 characters",
    },
  ],
};

export default function RegistrationPage() {
  const { domain } = useRegistrationContext();
  const { event, registrationForm, isEventLoading, eventError } =
    useEventFromDomainQuery(domain);

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

  // Log the actual form schema from database for future integration
  console.log("Database form schema:", event);

  const handleSubmit = async (data: any) => {
    console.log("Form submitted with data:", data);
    // TODO: Handle form submission logic here
    // - Validate data
    // - Save to database
    // - Send confirmation email
    // - Redirect to confirmation page
  };
  console.log({
    json: registrationForm?.formSchema.fields || [],
  });

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

        <div className="space-y-6">
          <FormRenderer
            schema={registrationForm?.formSchema}
            onSubmit={handleSubmit}
            submitButtonText="Complete Registration"
            cancelButtonText="Clear Form"
            showCancel={true}
          />
        </div>
      </div>
    </RegistrationFormContainer>
  );
}
