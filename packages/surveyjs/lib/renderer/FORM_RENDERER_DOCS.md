# FormRenderer Comprehensive Documentation

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Field Types](#field-types)
5. [Validation](#validation)
6. [Component Props](#component-props)
7. [Examples](#examples)
8. [Error Handling](#error-handling)
9. [Best Practices](#best-practices)
10. [API Reference](#api-reference)

## Overview

The FormRenderer is a production-ready form solution that generates fully functional, validated forms from JSON schemas. It combines the power of React Hook Form for state management, Zod for validation, and shadcn UI components for beautiful UI.

### Key Benefits

- **Zero Configuration** - Just provide a schema and go
- **Type-Safe** - Full TypeScript support end-to-end
- **Production Ready** - Handles all edge cases and errors
- **Accessible** - ARIA attributes for accessibility
- **Performant** - Optimized with React Hook Form
- **Extensible** - Easy to add custom field types

## Installation

The FormRenderer is part of the `@workspace/surveyjs` package. Install dependencies:

```bash
pnpm install
```

### Required Dependencies

All dependencies are pre-configured in `package.json`:

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-hook-form": "^7.66.1",
    "@hookform/resolvers": "^5.2.2",
    "zod": "^3.25.76",
    "lucide-react": "^0.475.0",
    "@workspace/ui": "workspace:*"
  }
}
```

## Quick Start

### 1. Define Your Schema

```typescript
import { FormSchema } from "@workspace/surveyjs";

const contactSchema: FormSchema = {
  title: "Contact Us",
  description: "We'd love to hear from you",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Your Name",
      placeholder: "John Doe",
      required: true,
      validation: { minLength: 2 },
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true,
    },
    {
      name: "subject",
      type: "dropdown",
      label: "Subject",
      required: true,
      options: [
        { label: "General Inquiry", value: "general" },
        { label: "Support", value: "support" },
        { label: "Feedback", value: "feedback" },
      ],
    },
  ],
};
```

### 2. Render the Form

```typescript
import { FormRenderer } from '@workspace/surveyjs';

export function ContactPage() {
  const handleSubmit = async (data) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }
  };

  return (
    <FormRenderer
      schema={contactSchema}
      onSubmit={handleSubmit}
    />
  );
}
```

## Field Types

### Text Input

Standard text input for general text content.

```typescript
{
  name: "username",
  type: "text",
  label: "Username",
  placeholder: "Choose a username",
  required: true,
  validation: {
    minLength: 3,
    maxLength: 20,
    pattern: "^[a-zA-Z0-9_-]+$",
    customMessage: "Username must contain only letters, numbers, hyphens, or underscores"
  },
  description: "3-20 characters"
}
```

**Features:**

- Text-only input
- Custom validation rules
- Min/max length validation
- Regex pattern matching
- Custom error messages

### Email Input

Email input with automatic email format validation.

```typescript
{
  name: "email",
  type: "email",
  label: "Email Address",
  placeholder: "user@example.com",
  required: true,
  description: "We'll use this to contact you"
}
```

**Features:**

- Automatic email validation
- RFC-compliant email checking
- Built-in error message

### Phone Input

Phone input with international format validation.

```typescript
{
  name: "phone",
  type: "phone",
  label: "Phone Number",
  placeholder: "+1 (555) 000-0000",
  required: false,
  description: "Include country code"
}
```

**Features:**

- International phone format support
- Flexible format (with/without dashes, parentheses)
- Country code support
- Automatic validation

**Supported Formats:**

- `+1-555-000-0000`
- `+1(555)000-0000`
- `+15550000000`
- `555-000-0000`

### Dropdown Select

Single selection dropdown for choosing from a list.

```typescript
{
  name: "country",
  type: "dropdown",
  label: "Select Your Country",
  placeholder: "Choose a country...",
  required: true,
  options: [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "Mexico", value: "mx" }
  ]
}
```

**Features:**

- Scrollable dropdown list
- Custom placeholder text
- Type-safe option values
- Accessible keyboard navigation

### Single Select (Radio)

Single selection using radio buttons for smaller option sets.

```typescript
{
  name: "preference",
  type: "select",
  label: "Your Preference",
  required: true,
  options: [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" }
  ]
}
```

**Features:**

- Radio button UI
- Clear visual selection
- Good for 2-5 options
- Required field validation

### Multi-Select (Checkbox)

Multiple selection using checkboxes.

```typescript
{
  name: "interests",
  type: "multiselect",
  label: "Select Your Interests",
  required: true,
  options: [
    { label: "Technology", value: "tech" },
    { label: "Sports", value: "sports" },
    { label: "Music", value: "music" },
    { label: "Travel", value: "travel" }
  ],
  description: "Select at least one option"
}
```

**Features:**

- Checkbox UI
- Multiple selections
- Array output
- Required field validation (min 1 selected)

## Validation

### Validation Rules

Fields support the following validation properties:

```typescript
validation?: {
  minLength?: number;        // Minimum string length
  maxLength?: number;        // Maximum string length
  pattern?: string;          // Regex pattern for validation
  customMessage?: string;    // Custom error message
}
```

### Type-Based Validation

Different field types have automatic validation:

| Type            | Automatic Validation       |
| --------------- | -------------------------- |
| text            | Pattern matching           |
| email           | RFC-compliant email format |
| phone           | International phone format |
| select/dropdown | Value must be in options   |
| multiselect     | At least one if required   |

### Validation Examples

#### Username with Pattern

```typescript
{
  name: "username",
  type: "text",
  validation: {
    minLength: 3,
    maxLength: 20,
    pattern: "^[a-zA-Z0-9_-]+$",
    customMessage: "Username must be 3-20 characters (alphanumeric, dash, underscore)"
  }
}
```

#### ZIP Code with Pattern

```typescript
{
  name: "zipCode",
  type: "text",
  validation: {
    pattern: "^[0-9]{5}(-[0-9]{4})?$",
    customMessage: "Enter a valid ZIP code (e.g., 12345 or 12345-6789)"
  }
}
```

#### Password Length

```typescript
{
  name: "password",
  type: "text",
  validation: {
    minLength: 8,
    customMessage: "Password must be at least 8 characters"
  }
}
```

#### URL Validation

```typescript
{
  name: "website",
  type: "text",
  validation: {
    pattern: "^https?://[\\w\\.-]+\\.[a-zA-Z]{2,}",
    customMessage: "Please enter a valid URL (e.g., https://example.com)"
  }
}
```

### Error Display

Errors are displayed in two ways:

1. **Field-level errors**: Shown below the field in red

   ```
   Email Address
   [input box with red border]
   Invalid email address
   ```

2. **Form-level errors**: Shown at the top in an alert
   ```
   ⚠️ Failed to submit form
   ```

### Required Field Validation

By default, fields with `required: true` must have a value:

```typescript
{
  name: "email",
  type: "email",
  required: true
  // Automatically shows: "email is required" if empty
}
```

Override the message with validation.customMessage:

```typescript
{
  name: "email",
  type: "email",
  required: true,
  validation: {
    customMessage: "Please provide your email address"
  }
}
```

## Component Props

### FormRenderer Component

```typescript
interface FormRendererProps {
  /**
   * The form schema defining fields and structure
   */
  schema: FormSchema;

  /**
   * Callback called when form is submitted with valid data
   * Data is pre-validated by Zod schema
   */
  onSubmit: (data: FormValues) => void | Promise<void>;

  /**
   * Optional callback when cancel button is clicked
   */
  onCancel?: () => void;

  /**
   * Show loading state (disables submit, shows "Submitting...")
   * @default false
   */
  isLoading?: boolean;

  /**
   * Custom submit button text
   * @default "Submit"
   */
  submitButtonText?: string;

  /**
   * Custom cancel button text
   * @default "Cancel"
   */
  cancelButtonText?: string;

  /**
   * Show the cancel button
   * @default true
   */
  showCancel?: boolean;
}
```

### FormSchema Interface

```typescript
interface FormSchema {
  /**
   * Form title displayed at the top
   */
  title?: string;

  /**
   * Form description/subtitle
   */
  description?: string;

  /**
   * Array of form fields
   */
  fields: FormField[];
}
```

### FormField Interface

```typescript
interface FormField {
  /**
   * Unique field identifier (used as form data key)
   */
  name: string;

  /**
   * Field input type
   */
  type: FieldType;

  /**
   * Label text shown above field
   */
  label: string;

  /**
   * Placeholder text inside input
   */
  placeholder?: string;

  /**
   * Is field required?
   */
  required?: boolean;

  /**
   * Custom validation rules
   */
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customMessage?: string;
  };

  /**
   * Options for select/dropdown/multiselect types
   */
  options?: FormFieldOption[];

  /**
   * Helper text shown below field
   */
  description?: string;
}
```

### FormFieldOption Interface

```typescript
interface FormFieldOption {
  /**
   * Label shown to user
   */
  label: string;

  /**
   * Value submitted with form (string or number)
   */
  value: string | number;
}
```

## Examples

### Example 1: Contact Form

```typescript
const schema: FormSchema = {
  title: "Contact Us",
  description: "Send us a message and we'll respond within 24 hours",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "John Doe",
      required: true,
      validation: { minLength: 2 }
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true
    },
    {
      name: "phone",
      type: "phone",
      label: "Phone Number",
      required: false
    },
    {
      name: "subject",
      type: "dropdown",
      label: "Subject",
      required: true,
      options: [
        { label: "General Inquiry", value: "general" },
        { label: "Technical Support", value: "support" },
        { label: "Feedback", value: "feedback" }
      ]
    },
    {
      name: "message",
      type: "text",
      label: "Message",
      placeholder: "Tell us more...",
      required: true,
      validation: {
        minLength: 10,
        maxLength: 1000,
        customMessage: "Message must be between 10 and 1000 characters"
      }
    }
  ]
};

function Contact() {
  const handleSubmit = async (data) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to send');
  };

  return <FormRenderer schema={schema} onSubmit={handleSubmit} />;
}
```

### Example 2: Event Registration

```typescript
const schema: FormSchema = {
  title: "Event Registration",
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
    },
    {
      name: "ticketType",
      type: "dropdown",
      label: "Ticket Type",
      required: true,
      options: [
        { label: "General Admission ($50)", value: "general" },
        { label: "VIP ($100)", value: "vip" },
        { label: "Student ($25)", value: "student" },
      ],
    },
    {
      name: "dietaryRestrictions",
      type: "multiselect",
      label: "Dietary Restrictions",
      options: [
        { label: "Vegetarian", value: "vegetarian" },
        { label: "Vegan", value: "vegan" },
        { label: "Gluten-Free", value: "gluten-free" },
        { label: "Nut-Free", value: "nut-free" },
      ],
    },
    {
      name: "newsletter",
      type: "select",
      label: "Subscribe to our newsletter?",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
  ],
};
```

### Example 3: User Registration

```typescript
const schema: FormSchema = {
  title: "Create Account",
  fields: [
    {
      name: "username",
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
      name: "email",
      type: "email",
      label: "Email",
      required: true,
    },
    {
      name: "phone",
      type: "phone",
      label: "Phone",
      required: true,
    },
    {
      name: "accountType",
      type: "select",
      label: "Account Type",
      required: true,
      options: [
        { label: "Personal", value: "personal" },
        { label: "Business", value: "business" },
      ],
    },
    {
      name: "interests",
      type: "multiselect",
      label: "Interests",
      options: [
        { label: "Technology", value: "tech" },
        { label: "Design", value: "design" },
        { label: "Business", value: "business" },
      ],
    },
  ],
};
```

### Example 4: Survey Form

```typescript
const schema: FormSchema = {
  title: "Customer Satisfaction Survey",
  description: "Help us improve your experience",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Your Name",
      required: true,
    },
    {
      name: "satisfaction",
      type: "select",
      label: "Overall satisfaction?",
      required: true,
      options: [
        { label: "Very Satisfied", value: "5" },
        { label: "Satisfied", value: "4" },
        { label: "Neutral", value: "3" },
        { label: "Dissatisfied", value: "2" },
        { label: "Very Dissatisfied", value: "1" },
      ],
    },
    {
      name: "department",
      type: "dropdown",
      label: "Which department did you interact with?",
      options: [
        { label: "Sales", value: "sales" },
        { label: "Support", value: "support" },
        { label: "Development", value: "dev" },
      ],
    },
    {
      name: "improvements",
      type: "multiselect",
      label: "Areas to improve",
      options: [
        { label: "Product Quality", value: "quality" },
        { label: "Customer Service", value: "service" },
        { label: "Documentation", value: "docs" },
        { label: "Pricing", value: "pricing" },
      ],
    },
    {
      name: "comments",
      type: "text",
      label: "Additional Comments",
      validation: { maxLength: 500 },
    },
  ],
};
```

## Error Handling

### Field-Level Errors

Errors are automatically displayed below each field when validation fails:

```typescript
// Automatic error messages based on field type:
// - "Invalid email address" for email fields
// - "Invalid phone number" for phone fields
// - "{label} is required" for required fields

// Custom error messages:
{
  name: "username",
  validation: {
    minLength: 3,
    customMessage: "Username must be at least 3 characters"
  }
}
```

### Form-Level Errors

Caught errors in the `onSubmit` handler are displayed at the top of the form:

```typescript
<FormRenderer
  schema={schema}
  onSubmit={async (data) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Server returned an error. Please try again.');
      }
    } catch (error) {
      // This message will be displayed in the form alert
      throw error;
    }
  }}
/>
```

### Async Validation Example

```typescript
const handleSubmit = async (data: FormValues) => {
  // Check if username is already taken
  const response = await fetch(`/api/check-username/${data.username}`);

  if (!response.ok) {
    throw new Error('Username is already taken');
  }

  // Proceed with registration
  await registerUser(data);
};

<FormRenderer schema={schema} onSubmit={handleSubmit} />
```

### Loading State

Show loading state while submitting:

```typescript
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (data) => {
  setIsLoading(true);
  try {
    await submitForm(data);
  } finally {
    setIsLoading(false);
  }
};

<FormRenderer
  schema={schema}
  onSubmit={handleSubmit}
  isLoading={isLoading}
/>
```

## Best Practices

### 1. Field Naming

Use clear, descriptive field names in camelCase:

```typescript
// Good
{ name: "firstName", ... }
{ name: "emailAddress", ... }
{ name: "agreeToTerms", ... }

// Avoid
{ name: "fname", ... }
{ name: "email_addr", ... }
{ name: "terms", ... }
```

### 2. Validation

Keep validation rules realistic and user-friendly:

```typescript
// Good: Clear, achievable validation
{
  name: "password",
  validation: {
    minLength: 8,
    customMessage: "Password must be at least 8 characters"
  }
}

// Avoid: Overly strict validation
{
  name: "password",
  validation: {
    minLength: 20,
    pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{20,})"
  }
}
```

### 3. Error Messages

Provide helpful, user-friendly error messages:

```typescript
// Good
customMessage: "Username must be 3-20 characters (letters, numbers, dash, underscore)";

// Avoid
customMessage: "Invalid format";

// Avoid
customMessage: "Regex pattern failed";
```

### 4. Optional vs Required

Be selective with required fields:

```typescript
// Good: Only truly necessary fields are required
{
  name: "email",
  type: "email",
  required: true
},
{
  name: "phone",
  type: "phone",
  required: false  // Nice to have, but not required
}

// Avoid: Too many required fields
// This leads to form abandonment
```

### 5. Field Organization

Order fields in a logical sequence:

```typescript
// Good: Logical flow
1. Name
2. Email
3. Subject
4. Message

// Avoid: Random order
1. Message
2. Email
3. Subject
4. Name
```

### 6. Descriptions

Use descriptions for clarification:

```typescript
{
  name: "agreeToTerms",
  type: "select",
  label: "Do you agree?",
  description: "By selecting yes, you agree to our Terms of Service",
  options: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ]
}
```

### 7. Testing

Always test validation rules:

```typescript
// Test that validation works
const testData = {
  username: "ab", // Should fail minLength: 3
};

// Expected error: "Username must be at least 3 characters"
```

## Type Safety

The FormRenderer is fully typed for TypeScript:

```typescript
import {
  FormSchema,
  FormField,
  FormValues,
  FormFieldOption,
  FieldType,
} from "@workspace/surveyjs";

// Type-safe schema definition
const schema: FormSchema = {
  fields: [
    {
      name: "email", // string
      type: "email", // FieldType: "email"
      label: "Email", // string
      required: true, // boolean
      options: [
        // FormFieldOption[]
        { label: "Opt", value: "opt" },
      ],
    },
  ],
};

// Type-safe submit handler
const handleSubmit = async (data: FormValues) => {
  console.log(data.email); // TypeScript knows this is a string
};
```

## API Reference

### Exported Functions

```typescript
// Create a Zod validation schema from FormSchema
export function createValidationSchema(
  formSchema: FormSchema
): ValidationSchema;

// Validate form data
export async function validateFormData(
  data: Record<string, any>,
  schema: ValidationSchema
): Promise<{
  success: boolean;
  errors?: Record<string, string>;
  data?: Record<string, any>;
}>;

// Get error for a specific field
export function getFieldError(
  errors: Record<string, string>,
  fieldName: string
): string | null;
```

### Exported Components

```typescript
export const FormRenderer: React.FC<FormRendererProps>;

export function FormFieldComponent<T extends FieldValues>({
  field,
  form,
  error
}: BaseFieldProps<T>);

export function TextInputField<T extends FieldValues>(...);
export function EmailInputField<T extends FieldValues>(...);
export function PhoneInputField<T extends FieldValues>(...);
export function DropdownField<T extends FieldValues>(...);
export function SingleSelectField<T extends FieldValues>(...);
export function MultiSelectField<T extends FieldValues>(...);
```

### Exported Types

```typescript
export type FieldType =
  | "text"
  | "email"
  | "phone"
  | "select"
  | "multiselect"
  | "dropdown";

export interface FormFieldOption { ... }
export interface FormField { ... }
export interface FormSchema { ... }
export interface FormValues { ... }
export interface FormFieldError { ... }
export type ValidationSchema = z.ZodObject<...>;
```

## Support

For issues or questions, please refer to:

- [Example schemas](./examples.ts)
- [Type definitions](./types.ts)
- [Validation logic](./validation.ts)
- [Component source](./components/FormField.tsx)
