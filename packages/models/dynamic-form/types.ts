import { z } from "zod";

export type FieldType =
  | "text"
  | "email"
  | "phone"
  | "select"
  | "multiselect"
  | "textarea"
  | "date";

export interface FormFieldOption {
  label: string;
  value: string | number;
}

export interface FormField {
  id: string;
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customMessage?: string;
  };
  options?: FormFieldOption[];
  description?: string;
}

export interface FormSchema {
  title?: string;
  description?: string;
  fields: FormField[];
}

export interface FormValues {
  [key: string]: string | string[] | number | undefined;
}

export interface FormFieldError {
  [key: string]: string;
}

export type ValidationSchema = z.ZodObject<any, any, any>;
