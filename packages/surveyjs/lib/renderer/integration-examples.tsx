/**
 * FormRenderer Integration Examples
 *
 * These are practical integration examples showing how to use FormRenderer
 * with different backends, patterns, and use cases.
 */

import { FormRenderer, FormSchema, FormValues } from "./index";
import React from "react";

// ============================================================================
// EXAMPLE 1: Basic Form with Simple API Call
// ============================================================================

const basicSchema: FormSchema = {
  title: "Newsletter Signup",
  fields: [
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
    },
    {
      id: "fullName",
      type: "text",
      label: "Full Name",
      required: false,
    },
  ],
};

export function BasicFormExample() {
  const handleSubmit = async (data: FormValues) => {
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to subscribe to newsletter");
    }
  };

  return <FormRenderer schema={basicSchema} onSubmit={handleSubmit} />;
}

// ============================================================================
// EXAMPLE 2: Form with Loading State and Error Handling
// ============================================================================

export function FormWithLoadingExample() {
  const [isLoading, setIsLoading] = React.useState(false);

  const schema: FormSchema = {
    title: "Create Account",
    fields: [
      {
        id: "username",
        type: "text",
        label: "Username",
        required: true,
        validation: {
          minLength: 3,
          maxLength: 20,
          pattern: "^[a-zA-Z0-9_-]+$",
          customMessage:
            "Username: 3-20 chars, alphanumeric/dash/underscore only",
        },
      },
      {
        id: "email",
        type: "email",
        label: "Email",
        required: true,
      },
    ],
  };

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check username availability
      const checkResponse = await fetch(
        `/api/auth/check-username/${data.username}`
      );
      if (!checkResponse.ok) {
        throw new Error("Username is already taken. Please choose another.");
      }

      // Create account
      const createResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!createResponse.ok) {
        throw new Error("Failed to create account. Please try again.");
      }

      // Success - redirect or show success message
      const user = await createResponse.json();
      console.log("Account created:", user);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormRenderer
      schema={schema}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}

// ============================================================================
// EXAMPLE 3: Multi-Step Form (Using State Management)
// ============================================================================

export function MultiStepFormExample() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<FormValues>({});

  const step1Schema: FormSchema = {
    title: "Event Registration - Step 1",
    description: "Personal Information",
    fields: [
      {
        id: "firstName",
        type: "text",
        label: "First Name",
        required: true,
      },
      {
        id: "lastName",
        type: "text",
        label: "Last Name",
        required: true,
      },
      {
        id: "email",
        type: "email",
        label: "Email",
        required: true,
      },
    ],
  };

  const step2Schema: FormSchema = {
    title: "Event Registration - Step 2",
    description: "Event Details",
    fields: [
      {
        id: "eventType",
        type: "dropdown",
        label: "Event Type",
        required: true,
        options: [
          { label: "Conference", value: "conference" },
          { label: "Workshop", value: "workshop" },
        ],
      },
      {
        id: "interests",
        type: "multiselect",
        label: "Areas of Interest",
        required: true,
        options: [
          { label: "Technology", value: "tech" },
          { label: "Business", value: "business" },
        ],
      },
    ],
  };

  const handleStep1Submit = async (data: FormValues) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStep2Submit = async (data: FormValues) => {
    const completeData = { ...formData, ...data };
    setFormData(completeData);

    const response = await fetch("/api/events/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completeData),
    });

    if (!response.ok) {
      throw new Error("Failed to register for event");
    }

    setStep(3); // Show success screen
  };

  if (step === 1) {
    return (
      <FormRenderer
        schema={step1Schema}
        onSubmit={handleStep1Submit}
        submitButtonText="Next"
        showCancel={false}
      />
    );
  }

  if (step === 2) {
    return (
      <FormRenderer
        schema={step2Schema}
        onSubmit={handleStep2Submit}
        onCancel={() => setStep(1)}
        submitButtonText="Register"
        cancelButtonText="Back"
      />
    );
  }

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-2">
        ✓ Successfully Registered!
      </h2>
      <p className="text-muted-foreground mb-4">
        Thank you for registering. We'll send you a confirmation email shortly.
      </p>
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Dynamic Form Based on User Selection
// ============================================================================

export function DynamicFormExample() {
  const [userType, setUserType] = React.useState<string | null>(null);

  const initialSchema: FormSchema = {
    title: "Choose Account Type",
    fields: [
      {
        id: "accountType",
        type: "select",
        label: "Account Type",
        required: true,
        options: [
          { label: "Individual", value: "individual" },
          { label: "Business", value: "business" },
        ],
      },
    ],
  };

  const individualSchema: FormSchema = {
    title: "Individual Account Setup",
    fields: [
      {
        id: "firstName",
        type: "text",
        label: "First Name",
        required: true,
      },
      {
        id: "lastName",
        type: "text",
        label: "Last Name",
        required: true,
      },
      {
        id: "email",
        type: "email",
        label: "Email",
        required: true,
      },
    ],
  };

  const businessSchema: FormSchema = {
    title: "Business Account Setup",
    fields: [
      {
        id: "companyName",
        type: "text",
        label: "Company Name",
        required: true,
      },
      {
        id: "businessEmail",
        type: "email",
        label: "Business Email",
        required: true,
      },
      {
        id: "industry",
        type: "dropdown",
        label: "Industry",
        required: true,
        options: [
          { label: "Technology", value: "tech" },
          { label: "Finance", value: "finance" },
          { label: "Healthcare", value: "healthcare" },
          { label: "Other", value: "other" },
        ],
      },
      {
        id: "employees",
        type: "select",
        label: "Number of Employees",
        required: true,
        options: [
          { label: "1-10", value: "1-10" },
          { label: "11-50", value: "11-50" },
          { label: "51-200", value: "51-200" },
          { label: "200+", value: "200+" },
        ],
      },
    ],
  };

  const handleTypeSelect = async (data: FormValues) => {
    setUserType(data.accountType as string);
  };

  const handleAccountCreate = async (data: FormValues) => {
    const completeData = { accountType: userType, ...data };
    const response = await fetch("/api/auth/setup-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completeData),
    });

    if (!response.ok) {
      throw new Error("Failed to create account");
    }
  };

  if (!userType) {
    return <FormRenderer schema={initialSchema} onSubmit={handleTypeSelect} />;
  }

  const detailsSchema =
    userType === "individual" ? individualSchema : businessSchema;

  return (
    <FormRenderer
      schema={detailsSchema}
      onSubmit={handleAccountCreate}
      onCancel={() => setUserType(null)}
      cancelButtonText="Back"
    />
  );
}

// ============================================================================
// EXAMPLE 5: Form with File Upload Simulation
// ============================================================================

export function FormWithValidationExample() {
  const schema: FormSchema = {
    title: "Job Application",
    description: "Apply for our open positions",
    fields: [
      {
        id: "fullName",
        type: "text",
        label: "Full Name",
        required: true,
        validation: {
          minLength: 3,
          customMessage: "Please enter your full name",
        },
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
      },
      {
        id: "phone",
        type: "phone",
        label: "Phone Number",
        required: true,
      },
      {
        id: "position",
        type: "dropdown",
        label: "Position Applied For",
        required: true,
        options: [
          { label: "Software Engineer", value: "engineer" },
          { label: "Product Manager", value: "pm" },
          { label: "Designer", value: "designer" },
          { label: "Data Analyst", value: "analyst" },
        ],
      },
      {
        id: "experience",
        type: "select",
        label: "Years of Experience",
        required: true,
        options: [
          { label: "0-2 years", value: "0-2" },
          { label: "2-5 years", value: "2-5" },
          { label: "5-10 years", value: "5-10" },
          { label: "10+ years", value: "10+" },
        ],
      },
      {
        id: "skills",
        type: "multiselect",
        label: "Key Skills",
        required: true,
        options: [
          { label: "JavaScript", value: "js" },
          { label: "Python", value: "python" },
          { label: "React", value: "react" },
          { label: "Node.js", value: "node" },
          { label: "TypeScript", value: "ts" },
        ],
      },
      {
        id: "coverLetter",
        type: "text",
        label: "Cover Letter",
        required: false,
        validation: {
          maxLength: 1000,
        },
        description: "Optional: Tell us why you're interested in this position",
      },
    ],
  };

  const handleSubmit = async (data: FormValues) => {
    const response = await fetch("/api/jobs/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit application");
    }

    console.log("Application submitted:", data);
  };

  return (
    <FormRenderer
      schema={schema}
      onSubmit={handleSubmit}
      submitButtonText="Submit Application"
    />
  );
}

// ============================================================================
// EXPORT SUMMARY
// ============================================================================

/**
 * This file contains 5 complete integration examples:
 *
 * 1. BasicFormExample - Simple form with basic submission
 * 2. FormWithLoadingExample - Loading state and async validation
 * 3. MultiStepFormExample - Multi-step form with state persistence
 * 4. DynamicFormExample - Form that changes based on user selection
 * 5. FormWithValidationExample - Complex form with various field types and validation
 *
 * Each example demonstrates different patterns and best practices for using
 * the FormRenderer in real-world applications.
 */
