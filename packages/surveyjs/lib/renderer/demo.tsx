"use client";

/**
 * FormRenderer Test/Demo Component
 *
 * This file demonstrates how to use the FormRenderer with various form types
 * Can be used as a test page or documentation reference
 */

import React, { useState } from "react";
import { FormRenderer, FormSchema, FormValues } from "@workspace/surveyjs";
import { contactFormSchema, eventRegistrationSchema } from "./examples";

export function FormRendererDemo() {
  const [lastSubmittedData, setLastSubmittedData] = useState<FormValues | null>(
    null
  );
  const [selectedForm, setSelectedForm] = useState<"contact" | "event">(
    "contact"
  );

  const handleSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLastSubmittedData(data);
    console.log("Form submitted:", data);
  };

  const handleCancel = () => {
    setLastSubmittedData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            FormRenderer Demo
          </h1>
          <p className="text-lg text-slate-600">
            Explore the fully functional form renderer with Zod validation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Select Form
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedForm("contact")}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition ${
                    selectedForm === "contact"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Contact Form
                </button>
                <button
                  onClick={() => setSelectedForm("event")}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition ${
                    selectedForm === "event"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Event Registration
                </button>
              </div>

              {lastSubmittedData && (
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">
                    ✓ Submitted Data
                  </h3>
                  <pre className="text-xs text-green-800 overflow-auto max-h-64 bg-white p-2 rounded border border-green-100">
                    {JSON.stringify(lastSubmittedData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Form Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              {selectedForm === "contact" && (
                <FormRenderer
                  schema={contactFormSchema}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  submitButtonText="Send Message"
                  cancelButtonText="Clear Form"
                />
              )}

              {selectedForm === "event" && (
                <FormRenderer
                  schema={eventRegistrationSchema}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  submitButtonText="Register Now"
                  cancelButtonText="Reset"
                />
              )}
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon="✓"
            title="Zod Validation"
            description="Type-safe validation with detailed error messages"
          />
          <FeatureCard
            icon="📝"
            title="Multiple Field Types"
            description="Text, Email, Phone, Select, Dropdown, Multi-Select"
          />
          <FeatureCard
            icon="🎨"
            title="Shadcn UI Components"
            description="Beautiful, accessible UI components"
          />
          <FeatureCard
            icon="⚡"
            title="React Hook Form"
            description="Optimized form performance and state management"
          />
          <FeatureCard
            icon="🔒"
            title="Error Handling"
            description="Field-level and form-level error display"
          />
          <FeatureCard
            icon="📋"
            title="JSON Schema"
            description="Define forms completely through configuration"
          />
        </div>

        {/* Code Example */}
        <div className="mt-16 bg-slate-900 rounded-lg p-8 text-slate-100">
          <h2 className="text-2xl font-bold mb-4">Quick Start Code</h2>
          <pre className="text-sm overflow-auto bg-slate-800 p-4 rounded">
            {`import { FormRenderer, FormSchema } from '@workspace/surveyjs';

const schema: FormSchema = {
  title: "My Form",
  fields: [
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true
    }
  ]
};

export function MyForm() {
  return (
    <FormRenderer
      schema={schema}
      onSubmit={async (data) => {
        console.log(data);
      }}
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
}
