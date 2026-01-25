"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues } from "./types";
import { createValidationSchema } from "./validation";
import { FormFieldComponent } from "./components/FormField";
import { Button } from "@workspace/ui/components/button";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { AlertCircle } from "lucide-react";
import { FormSchema } from "@workspace/models/dynamic-form";

interface FormRendererProps {
  schema: FormSchema;
  onSubmit: (data: FormValues) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
  showCancel?: boolean;
}

/**
 * FormRenderer Component
 *
 * Renders a fully functional form from a JSON schema with:
 * - Zod-based validation
 * - React Hook Form integration
 * - Error handling and display
 * - Support for multiple field types
 * - Custom validation rules from schema
 */
export const FormRenderer: React.FC<FormRendererProps> = ({
  schema,
  onSubmit,
  onCancel,
  isLoading = false,
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
  showCancel = true,
}) => {
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Create validation schema from form schema
  const validationSchema = createValidationSchema(schema);

  // Initialize form with React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const { handleSubmit, formState } = form;
  const { errors, isSubmitting, isDirty } = formState;

  const handleFormSubmit = async (data: FormValues) => {
    try {
      setGeneralError(null);
      await onSubmit(data);
    } catch (error) {
      setGeneralError(
        error instanceof Error
          ? error.message
          : "An error occurred while submitting the form",
      );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {generalError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {schema.fields.map((field) => (
          <div key={field.name}>
            <FormFieldComponent
              field={field}
              form={form}
              error={errors[field.name]?.message as string}
            />
          </div>
        ))}

        <div className="flex gap-3 pt-6">
          <Button
            type="submit"
            disabled={isSubmitting || isLoading || !isDirty}
            className="flex-1"
          >
            {isSubmitting || isLoading ? "Submitting..." : submitButtonText}
          </Button>

          {showCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting || isLoading}
              className="flex-1"
            >
              {cancelButtonText}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormRenderer;
