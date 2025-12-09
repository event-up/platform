/**
 * Type definitions for the form editor
 */

export type FieldType = "text" | "textarea" | "date" | "phone";

export interface FieldDefinition {
  id: string;
  type: FieldType;
  name: string;
  title: string;
  isRequired: boolean;
  placeholder?: string;
  description?: string;
  inputType?: string;
  rows?: number;
}

export interface FieldTemplate {
  type: FieldType;
  label: string;
  icon: string;
  defaultProps: Partial<FieldDefinition>;
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
  moveField: (fromIndex: number, toIndex: number) => void;
  selectField: (id: string | null) => void;
}
