/**
 * Type definitions for the form editor
 */

import { FormField } from "lib/renderer";

export type FieldType = "text" | "textarea" | "date" | "phone";

export interface FieldDefinition extends FormField {
  id: string;
}

export interface FieldTemplate {
  type: FieldType;
  label: string;
  icon: string;
  defaultProps: Partial<FormField>;
}

export interface EditorState {
  fields: FieldDefinition[];
  selectedFieldId: string | null;
  surveyTitle: string;
  surveyDescription: string;
}

export interface FieldOperations {
  addField: (type: FieldType) => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FieldDefinition>) => void;
  reorderFields: (newFields: FieldDefinition[]) => void;
  selectField: (id: string | null) => void;
}
