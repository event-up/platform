/**
 * Type definitions for the form editor
 */

import type { FieldType } from "@workspace/models/dynamic-form";
import type { FormField } from "../renderer/types";

export type ContactChannelType = "phone" | "email";

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface FieldTemplate {
  type: FieldType;
  label: string;
  icon: string;
  defaultProps: Partial<FormField>;
}

export interface EditorState {
  fields: FormField[];
  selectedFieldId: string | null;
  surveyTitle: string;
  surveyDescription: string;
}

export interface FieldOperations {
  addField: (type: FieldType) => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  reorderFields: (newFields: FormField[]) => void;
  selectField: (id: string | null) => void;
}
