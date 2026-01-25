// Main component
export { FormRenderer, default } from "./FormRenderer";

// Types
export type {
  FieldType,
  FormFieldOption,
  FormField,
  FormSchema,
  FormValues,
  FormFieldError,
  ValidationSchema,
} from "@workspace/models/dynamic-form";

// Validation utilities
export {
  createValidationSchema,
  validateFormData,
  getFieldError,
} from "./validation";

// Field components
export {
  TextInputField,
  EmailInputField,
  PhoneInputField,
  DropdownField,
  SingleSelectField,
  MultiSelectField,
  FormFieldComponent,
} from "./components/FormField";

// Examples (for documentation and testing)
export {
  contactFormSchema,
  eventRegistrationSchema,
  surveyFormSchema,
  userRegistrationSchema,
} from "./examples";
