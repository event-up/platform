# FormRenderer - Dynamic Form Builder

A powerful, type-safe form renderer that generates fully functional forms from JSON schemas with built-in Zod validation, error handling, and support for multiple field types.

## Features

✅ **Dynamic Form Generation** - Create forms from JSON schemas  
✅ **Zod Validation** - Type-safe validation with detailed error messages  
✅ **Multiple Field Types** - Text, Email, Phone, Dropdown, Single Select, Multi-Select  
✅ **Error Handling** - Display field-level and form-level errors  
✅ **Custom Validation** - Define min/max length, regex patterns, custom messages  
✅ **Shadcn UI Integration** - Uses beautiful shadcn components  
✅ **React Hook Form** - Optimized form performance  
✅ **TypeScript Support** - Full type safety

## Quick Start

### Basic Usage

```tsx
import { FormRenderer, FormSchema } from "@workspace/surveyjs";

const schema: FormSchema = {
  title: "Contact Form",
  fields: [
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true,
    },
    {
      name: "message",
      type: "text",
      label: "Message",
      required: true,
      validation: { minLength: 10 },
    },
  ],
};

export function ContactPage() {
  return (
    <FormRenderer
      schema={schema}
      onSubmit={async (data) => {
        console.log("Form submitted:", data);
      }}
    />
  );
}
```

## Supported Field Types

- **text** - Basic text input with custom validation
- **email** - Email validation built-in
- **phone** - International phone format validation
- **dropdown** - Select dropdown
- **select** - Radio button single select
- **multiselect** - Checkbox multi-select

## Field Configuration

```typescript
{
  name: "fieldName",           // Unique identifier
  type: "text",                // Field type
  label: "Field Label",        // Display label
  placeholder?: "...",         // Placeholder text
  required?: true,             // Is required?
  validation?: {
    minLength?: 3,
    maxLength: 100,
    pattern?: "^[a-z]+$",
    customMessage?: "Custom error"
  },
  options?: [                  // For select/dropdown/multiselect
    { label: "Option 1", value: "opt1" }
  ],
  description?: "Helper text"  // Hint below field
}
```

## Validation

Fields automatically validate based on type:

- **email**: Email format validation
- **phone**: International phone format
- **required**: Presence validation
- **Custom**: Via minLength, maxLength, pattern

Errors display inline below each field.

## API

### FormRenderer Props

```typescript
<FormRenderer
  schema={FormSchema}                    // Required: Form schema
  onSubmit={(data) => Promise<void>}     // Required: Submit handler
  onCancel={() => void}                  // Optional: Cancel handler
  isLoading={boolean}                    // Optional: Loading state
  submitButtonText="Submit"              // Optional: Button text
  cancelButtonText="Cancel"              // Optional: Button text
  showCancel={true}                      // Optional: Show cancel button
/>
```

### FormSchema

```typescript
{
  title?: string;
  description?: string;
  fields: FormField[];
}
```

## Examples

See [examples.ts](./lib/renderer/examples.ts) for complete examples:

- Contact form
- Event registration
- Customer survey
- User registration

## For More Information

See [FORM_RENDERER_DOCS.md](./lib/renderer/FORM_RENDERER_DOCS.md) for comprehensive documentation.
