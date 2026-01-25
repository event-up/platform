# FormRenderer - Troubleshooting & FAQ

## Common Issues

### Issue 1: Form not rendering

**Problem**: Form component doesn't appear on page

**Solutions**:

1. Verify schema is valid:

```typescript
const schema: FormSchema = {
  fields: [{ name: "email", type: "email", label: "Email", required: true }],
};
```

2. Check `onSubmit` handler is provided:

```typescript
<FormRenderer
  schema={schema}
  onSubmit={(data) => console.log(data)}  // Required!
/>
```

3. Ensure component is wrapped in client component:

```typescript
"use client";
import { FormRenderer } from "@workspace/surveyjs";
```

### Issue 2: Validation not working

**Problem**: Form accepts invalid data

**Solutions**:

1. Ensure `type` is correct:

```typescript
{ type: "email", ... }  // Auto-validates email
{ type: "phone", ... }  // Auto-validates phone
```

2. Check `required: true` is set for required fields:

```typescript
{ required: true, ... }  // Validates presence
```

3. Add custom validation if needed:

```typescript
{
  validation: {
    minLength: 3,
    customMessage: "Minimum 3 characters"
  }
}
```

### Issue 3: Error messages not showing

**Problem**: Validation errors don't display

**Solutions**:

1. Check field has `name` property:

```typescript
{ name: "email", ... }  // Must be unique
```

2. Verify `onSubmit` doesn't swallow errors:

```typescript
const handleSubmit = async (data) => {
  try {
    await submitForm(data);
  } catch (error) {
    throw error; // Must re-throw!
  }
};
```

3. Check form hasn't been submitted yet (errors show after attempted submission)

### Issue 4: Custom validation not working

**Problem**: Pattern or custom validation doesn't validate

**Solutions**:

1. Check regex pattern is valid:

```typescript
// Good
pattern: "^[a-z]+$"

// Bad - unterminated string
pattern: "^[a-z]+$  // Missing closing quote
```

2. Test pattern separately:

```typescript
const regex = /^[a-z]+$/;
console.log(regex.test("abc")); // true
console.log(regex.test("ABC")); // false
```

3. Ensure field type supports validation:

```typescript
// Text supports pattern validation
{ type: "text", validation: { pattern: "..." } }

// Email/phone have built-in validation
{ type: "email", ... }  // Auto-validates
```

### Issue 5: Form keeps resetting

**Problem**: Form values disappear or reset unexpectedly

**Solutions**:

1. Don't wrap in `<FormRenderer>` multiple times:

```typescript
// Bad - creates new form instance
{condition && <FormRenderer schema={schema} ... />}

// Good - always render, control visibility
<FormRenderer schema={schema} ... style={{display: condition ? 'block' : 'none'}} />
```

2. Check `key` prop not changing on parent:

```typescript
// Bad
<div key={Math.random()}>
  <FormRenderer ... />
</div>

// Good
<div key="form-container">
  <FormRenderer ... />
</div>
```

### Issue 6: Phone validation too strict

**Problem**: Valid phone numbers rejected

**Solutions**:
Phone validation is international. Valid formats:

- `+1-555-000-0000` ✓
- `+1(555)000-0000` ✓
- `+15550000000` ✓
- `555-000-0000` ✓
- `555.000.0000` ✓
- `5550000000` ✓

**Invalid**:

- `555` ✗ (too short)
- `abc-def-ghij` ✗ (not numbers)

### Issue 7: TypeScript errors

**Problem**: TypeScript compilation errors

**Solutions**:

1. Ensure types are imported:

```typescript
import { FormSchema, FormField, FormValues } from "@workspace/surveyjs";
```

2. Type the submission data:

```typescript
const handleSubmit = async (data: FormValues) => {
  console.log(data);
};
```

3. Verify field names match usage:

```typescript
const schema: FormSchema = {
  fields: [
    { name: "email", type: "email", ... }
  ]
};

// This is type-safe
const data: FormValues = { email: "user@example.com" };
```

### Issue 8: Styling looks wrong

**Problem**: Form styling doesn't match design

**Solutions**:

1. Check Tailwind CSS is installed and configured
2. Verify shadcn UI components are imported
3. Check CSS file is included:

```typescript
import "@workspace/ui/styles/globals.css";
```

4. Check Tailwind config includes surveyjs paths:

```typescript
content: ["./node_modules/@workspace/surveyjs/**/*.{tsx,ts}"];
```

### Issue 9: Submit button always disabled

**Problem**: Can't submit even with valid data

**Solutions**:

1. Check `isDirty` state - form requires at least one change:

```typescript
// After selecting/editing fields
// Then submit becomes enabled
```

2. Disable isDirty check by removing the check in FormRenderer
3. Manually enable submit:

```typescript
<button disabled={false}>
  Submit
</button>
```

### Issue 10: Performance issues

**Problem**: Form laggy or slow

**Solutions**:

1. Don't re-create schema on every render:

```typescript
// Bad
const schema: FormSchema = { fields: [...] };  // Recreated each render

// Good
const schema = useMemo(() => ({ fields: [...] }), []);
```

2. Use React.memo for custom components
3. Avoid heavy operations in onSubmit
4. Use async/await properly

## FAQ

### Q: Can I have conditional fields?

**A**: Currently not built-in. Workaround: Change schema based on state

```typescript
const [userType, setUserType] = useState("individual");
const schema = userType === "individual" ? schema1 : schema2;
```

### Q: Can I have multi-step forms?

**A**: Yes! Use state to track steps:

```typescript
const [step, setStep] = useState(1);
const schema = step === 1 ? step1Schema : step2Schema;
```

### Q: Can I pre-fill form values?

**A**: Not yet - roadmap item. Use workaround:

```typescript
// Create initial schema with values
{ name: "email", type: "email", placeholder: "pre@filled.com" }
```

### Q: Can I have dependent fields?

**A**: Not yet - future enhancement. Use multi-step form pattern.

### Q: What about file uploads?

**A**: Not currently supported. File upload field type is in roadmap.

### Q: Can I customize error messages?

**A**: Yes, use `validation.customMessage`:

```typescript
validation: {
  minLength: 8,
  customMessage: "Must be at least 8 characters long"
}
```

### Q: How do I validate async (like checking username availability)?

**A**: In onSubmit handler:

```typescript
const handleSubmit = async (data) => {
  const response = await fetch(`/api/check/${data.username}`);
  if (!response.ok) {
    throw new Error("Username already taken");
  }
};
```

### Q: Can I submit form programmatically?

**A**: Use React Hook Form's submit method. Currently not exposed in FormRenderer.

### Q: How do I reset form?

**A**: Use `onCancel` handler:

```typescript
<FormRenderer
  onCancel={() => {
    // Reset logic
  }}
/>
```

### Q: Can I have nested fields?

**A**: Not currently - future enhancement.

### Q: What about array/repeatable fields?

**A**: Not currently - planned feature.

### Q: Can I use custom components?

**A**: Yes - import and modify individual field components:

```typescript
import { TextInputField } from "@workspace/surveyjs";
// Customize and use
```

### Q: How do I access raw validation schema?

**A**: Use createValidationSchema utility:

```typescript
import { createValidationSchema } from "@workspace/surveyjs";
const zodSchema = createValidationSchema(formSchema);
```

### Q: Can I validate without rendering?

**A**: Yes, use validateFormData utility:

```typescript
import { validateFormData } from "@workspace/surveyjs";
const result = await validateFormData(data, zodSchema);
```

### Q: Does this work with Next.js?

**A**: Yes! It's a client component. Use `"use client"` directive.

### Q: Does this work with Remix?

**A**: Yes! Works with any React framework.

### Q: Is it accessible?

**A**: Yes! Uses semantic HTML and ARIA attributes.

### Q: What about IE11 support?

**A**: Not supported. Requires modern browsers.

### Q: Can I use with Context API state?

**A**: Yes, pass state via onSubmit handler.

### Q: Can I use with Redux?

**A**: Yes, dispatch actions in onSubmit.

### Q: How do I test forms?

**A**: Use testing utilities in testing.ts file.

### Q: Can I theme the form?

**A**: Yes, customize Tailwind theme for shadcn components.

## Debug Tips

### Enable console logging

```typescript
const handleSubmit = async (data: FormValues) => {
  console.log("Form data:", data);
  console.log(
    "Data types:",
    Object.entries(data).map(([k, v]) => [k, typeof v])
  );
};
```

### Check validation schema

```typescript
import { createValidationSchema } from "@workspace/surveyjs";
const schema = createValidationSchema(formSchema);
console.log("Validation schema:", schema);
```

### Test individual validation

```typescript
import { validateFormData } from "@workspace/surveyjs";
const result = await validateFormData({ email: "test" }, schema);
console.log("Validation result:", result);
```

### Check form state

```typescript
const { watch, formState } = form;
console.log("Form values:", watch());
console.log("Form errors:", formState.errors);
```

## Performance Tips

1. **Memoize schema**: Don't recreate schema on every render
2. **Use useCallback**: For submit handlers
3. **Lazy load**: Load form only when needed
4. **Avoid rerenders**: Keep form in separate component
5. **Use onChange mode**: Validate as you type (default)

## Security Tips

1. **Always validate**: Server-side validation required
2. **Sanitize input**: Escape user input
3. **No sensitive data**: Don't store passwords client-side
4. **HTTPS only**: Use HTTPS for all submissions
5. **CSRF tokens**: Include in form submissions

---

**Still having issues?** Check:

1. Console for error messages
2. Network tab for API errors
3. Documentation files
4. Examples and integration patterns
