# FormRenderer Quick Reference

## Installation

No additional installation needed. All dependencies are in `package.json`:

- ✅ react-hook-form
- ✅ @hookform/resolvers
- ✅ zod
- ✅ @workspace/ui

## Basic Usage

```tsx
import { FormRenderer, FormSchema } from "@workspace/surveyjs";

const schema: FormSchema = {
  title: "My Form",
  fields: [{ name: "email", type: "email", label: "Email", required: true }],
};

<FormRenderer schema={schema} onSubmit={(data) => console.log(data)} />;
```

## Field Types

| Type            | UI         | Validation              |
| --------------- | ---------- | ----------------------- |
| `"text"`        | Input      | Pattern, min/max length |
| `"email"`       | Input      | Email format            |
| `"phone"`       | Input      | Phone format            |
| `"dropdown"`    | Dropdown   | Options                 |
| `"select"`      | Radio      | Options                 |
| `"multiselect"` | Checkboxes | Options, min 1          |

## Field Properties

```typescript
{
  name: string;              // Required: unique field ID
  type: FieldType;           // Required: field type
  label: string;             // Required: display label
  placeholder?: string;      // Optional: placeholder text
  required?: boolean;        // Optional: is required?
  description?: string;      // Optional: helper text
  options?: [{               // For select/dropdown/multiselect
    label: string;
    value: string | number;
  }];
  validation?: {             // Optional: custom validation
    minLength?: number;
    maxLength?: number;
    pattern?: string;        // Regex pattern
    customMessage?: string;  // Error message
  };
}
```

## FormRenderer Props

```typescript
<FormRenderer
  schema={FormSchema}                    // Required
  onSubmit={(data) => Promise<void>}     // Required
  onCancel={() => void}                  // Optional
  isLoading={boolean}                    // Optional
  submitButtonText="Submit"              // Optional
  cancelButtonText="Cancel"              // Optional
  showCancel={true}                      // Optional
/>
```

## Validation Rules

### Automatic (by type)

```typescript
type: "email"; // → Email format validation
type: "phone"; // → Phone format validation
required: true; // → Presence validation
```

### Custom

```typescript
validation: {
  minLength: 3,                    // Minimum length
  maxLength: 20,                   // Maximum length
  pattern: "^[a-z]+$",            // Regex pattern
  customMessage: "Custom error"   // Error message
}
```

## Common Patterns

### Simple Form

```tsx
const schema: FormSchema = {
  fields: [
    { name: "name", type: "text", label: "Name", required: true },
    { name: "email", type: "email", label: "Email", required: true },
  ],
};

<FormRenderer schema={schema} onSubmit={handleSubmit} />;
```

### With Loading State

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (data) => {
  setIsLoading(true);
  try {
    await submitForm(data);
  } finally {
    setIsLoading(false);
  }
};

<FormRenderer schema={schema} onSubmit={handleSubmit} isLoading={isLoading} />;
```

### With Error Handling

```tsx
const handleSubmit = async (data) => {
  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed");
  } catch (error) {
    throw error; // Display in form
  }
};
```

### Multi-Step Form

```tsx
const [step, setStep] = useState(1);

const schema = step === 1 ? step1Schema : step2Schema;

const handleSubmit = async (data) => {
  if (step === 1) {
    // Validate and move to step 2
    setStep(2);
  } else {
    // Submit final data
    await finalSubmit(data);
  }
};

<FormRenderer
  schema={schema}
  onSubmit={handleSubmit}
  onCancel={() => step > 1 && setStep(step - 1)}
/>;
```

### Dropdown Options

```typescript
{
  name: "country",
  type: "dropdown",
  label: "Country",
  options: [
    { label: "USA", value: "us" },
    { label: "Canada", value: "ca" }
  ]
}
```

### Multi-Select with Validation

```typescript
{
  name: "interests",
  type: "multiselect",
  label: "Select interests",
  required: true,
  options: [
    { label: "Tech", value: "tech" },
    { label: "Sports", value: "sports" }
  ]
}
```

### Regex Validation

```typescript
{
  name: "zipCode",
  type: "text",
  label: "ZIP Code",
  validation: {
    pattern: "^[0-9]{5}(-[0-9]{4})?$",
    customMessage: "Enter valid ZIP code"
  }
}
```

## Form Data Output

```typescript
// After successful submission, data has format:
{
  fieldName1: "value",
  fieldName2: 123,
  fieldName3: ["item1", "item2"],  // multiselect
  ...
}
```

## Validation Examples

### Email (built-in)

```typescript
{ type: "email", label: "Email" }
```

### Phone (built-in)

```typescript
{ type: "phone", label: "Phone" }
```

### Custom Pattern

```typescript
{
  type: "text",
  validation: {
    pattern: "^[A-Z][a-z]+$",
    customMessage: "Start with capital letter"
  }
}
```

### Min/Max Length

```typescript
{
  type: "text",
  validation: {
    minLength: 3,
    maxLength: 50
  }
}
```

## Error Display

Field-level errors automatically appear below each field.

Form-level errors appear in alert at top.

Custom messages:

```typescript
validation: {
  minLength: 8,
  customMessage: "Password must be 8+ characters"
}
```

## Exports

```typescript
// Main component
import { FormRenderer } from '@workspace/surveyjs';

// Types
import { FormSchema, FormField, FormValues, FieldType } from '@workspace/surveyjs';

// Utilities
import { createValidationSchema, validateFormData } from '@workspace/surveyjs';

// Components (if needed)
import { TextInputField, EmailInputField, ... } from '@workspace/surveyjs';

// Examples
import { contactFormSchema, ... } from '@workspace/surveyjs';
```

## TypeScript

```typescript
const schema: FormSchema = {
  fields: [
    {
      name: "email",
      type: "email",
      label: "Email",
    },
  ],
};

const data: FormValues = {
  email: "user@example.com",
};
```

## Styling

Built with Tailwind CSS. Customize via:

1. Tailwind theme in `tailwind.config.ts`
2. CSS classes on wrapper elements
3. Shadcn UI component styles

## Documentation

- **README.md** - Quick start
- **FORM_RENDERER_DOCS.md** - Complete reference
- **examples.ts** - Schema examples
- **integration-examples.tsx** - Implementation patterns
- **testing.ts** - Validation tests

## Common Mistakes

❌ Don't: Forget `type` property
✅ Do: Always include `type: "email"` etc.

❌ Don't: Use spaces in field names
✅ Do: Use camelCase: `firstName`

❌ Don't: Make all fields required
✅ Do: Only require truly necessary fields

❌ Don't: Use overly complex validation
✅ Do: Keep validation rules simple and clear

## Tips & Tricks

1. **Reuse schemas** - Define once, use many times
2. **Compose schemas** - Split complex forms into parts
3. **Test validation** - Use validation test suite
4. **Handle errors** - Always throw from onSubmit
5. **Show loading** - Use isLoading prop for feedback
6. **Use descriptions** - Help users understand fields

## Links

- Documentation: See FORM_RENDERER_DOCS.md
- Examples: See examples.ts
- Integration: See integration-examples.tsx
- Tests: See testing.ts
- Features: See FEATURES.md
- Summary: See IMPLEMENTATION_SUMMARY.md

---

**Ready to use!** Start with the basic usage example above.
