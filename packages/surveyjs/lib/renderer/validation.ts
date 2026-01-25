import { z } from "zod";
import { FormField, FormSchema, ValidationSchema } from "./types";

/**
 * Helper function to create Zod validators for specific field types
 */
function createFieldValidator(field: FormField): z.ZodType {
  let validator: z.ZodType;

  switch (field.type) {
    case "email":
      validator = z.string().email("Invalid email address");
      break;

    case "phone":
      validator = z
        .string()
        .regex(
          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
          "Invalid phone number"
        );
      break;

    case "multiselect":
      validator = z.array(z.string());
      break;

    case "select":
    case "dropdown":
      validator = z.string();
      break;

    case "text":
    default:
      validator = z.string();
  }

  // Apply custom validation rules from the schema
  if (field.validation) {
    if (field.type !== "multiselect" && field.validation.minLength) {
      validator = (validator as z.ZodString).min(
        field.validation.minLength,
        field.validation.customMessage ||
          `Minimum ${field.validation.minLength} characters required`
      );
    }

    if (field.type !== "multiselect" && field.validation.maxLength) {
      validator = (validator as z.ZodString).max(
        field.validation.maxLength,
        field.validation.customMessage ||
          `Maximum ${field.validation.maxLength} characters allowed`
      );
    }

    if (field.type !== "multiselect" && field.validation.pattern) {
      try {
        const regex = new RegExp(field.validation.pattern);
        validator = (validator as z.ZodString).regex(
          regex,
          field.validation.customMessage || "Format is invalid"
        );
      } catch (e) {
        console.warn(
          `Invalid regex pattern for field ${field.name}:`,
          field.validation.pattern
        );
      }
    }
  }

  // Handle required fields
  if (field.required) {
    if (field.type === "multiselect") {
      validator = (validator as z.ZodArray<any>).min(
        1,
        `${field.label} is required`
      );
    } else {
      validator = (validator as z.ZodString).min(
        1,
        `${field.label} is required`
      );
    }
  } else {
    // Make optional fields nullable
    if (field.type === "multiselect") {
      validator = (validator as z.ZodArray<any>).optional();
    } else {
      validator = (validator as z.ZodString).optional();
    }
  }

  return validator;
}

/**
 * Creates a Zod validation schema from a form schema
 */
export function createValidationSchema(
  formSchema: FormSchema
): ValidationSchema {
  const shape: Record<string, z.ZodType> = {};

  formSchema.fields.forEach((field) => {
    shape[field.name] = createFieldValidator(field);
  });

  return z.object(shape) as ValidationSchema;
}

/**
 * Validates form data against the schema
 */
export async function validateFormData(
  data: Record<string, any>,
  schema: ValidationSchema
): Promise<{
  success: boolean;
  errors?: Record<string, string>;
  data?: Record<string, any>;
}> {
  try {
    const validatedData = await schema.parseAsync(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return {
      success: false,
      errors: { _general: "An unexpected validation error occurred" },
    };
  }
}

/**
 * Get error message for a specific field
 */
export function getFieldError(
  errors: Record<string, string>,
  fieldName: string
): string | null {
  return errors[fieldName] || null;
}
