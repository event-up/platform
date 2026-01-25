/**
 * Validation utilities for form editor
 */

import { ValidationResult } from "../../models/types";
import { FormField } from "@workspace/models/dynamic-form";
import { CONTACT_CHANNEL_FIELDS } from "../constants";

/**
 * Check if the form has at least one contact channel field
 */
export function hasContactChannelFields(fields: FormField[]): boolean {
  return fields.some((field) => CONTACT_CHANNEL_FIELDS.includes(field.type));
}

/**
 * Validate the form before saving
 */
export function validateFormForSave(fields: FormField[]): ValidationResult {
  // Check for contact channel fields
  if (!hasContactChannelFields(fields)) {
    return {
      isValid: false,
      message:
        "Form must contain at least one contact field (Phone or Email) to allow user registration.",
    };
  }

  // Check if form has any fields at all
  if (fields.length === 0) {
    return {
      isValid: false,
      message: "Form must contain at least one field.",
    };
  }

  return {
    isValid: true,
    message: "Form is valid and ready to save.",
  };
}
