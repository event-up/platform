# Quick Start Guide

## Installation

The package is already installed in your workspace as `@workspace/surveyjs`.

## Basic Usage

### 1. Import the FormEditor

```tsx
import { FormEditor } from "@workspace/surveyjs";
```

### 2. Use in Your Component

```tsx
function MyApp() {
  return (
    <div>
      <FormEditor />
    </div>
  );
}
```

That's it! The editor will render with all features.

## Available Features

### Adding Fields

Click on any field type button in the toolbar:

- 📝 Text Input
- 📄 Long Answer (Textarea)
- 📅 Date Picker
- 📱 Phone Number

### Editing Fields

1. Click on a field to select it
2. The Property Editor appears on the right
3. Modify:
   - Question Title
   - Field Name
   - Description
   - Placeholder
   - Required status
   - Type-specific properties

### Reordering Fields

- Click ↑ to move field up
- Click ↓ to move field down

### Removing Fields

- Click × on any field to remove it

### Preview

- When no field is selected, the right panel shows a live preview
- See how your form will look to respondents

## Advanced Usage

### Get Form Data

```tsx
import { FormEditor, EditorState, SurveyConverter } from "@workspace/surveyjs";
import { useState } from "react";

function MyApp() {
  const handleStateChange = (state: EditorState) => {
    // Get the current state
    console.log("Current form:", state);

    // Convert to SurveyJS JSON
    const surveyJSON = SurveyConverter.toSurveyJSON(state);
    console.log("Survey JSON:", surveyJSON);
  };

  return <FormEditor onStateChange={handleStateChange} />;
}
```

### Pre-populate Form

```tsx
import { FormEditor } from "@workspace/surveyjs";

function MyApp() {
  const initialState = {
    surveyTitle: "Contact Form",
    surveyDescription: "Please fill out this form",
    fields: [
      {
        id: "field_1",
        type: "text" as const,
        name: "full_name",
        title: "Full Name",
        isRequired: true,
        placeholder: "Enter your name",
        inputType: "text",
      },
    ],
  };

  return <FormEditor initialState={initialState} />;
}
```

### Export to JSON

```tsx
import { SurveyConverter, EditorState } from "@workspace/surveyjs";

function exportForm(state: EditorState) {
  const json = SurveyConverter.toSurveyJSON(state);
  const jsonString = JSON.stringify(json, null, 2);

  // Download as file
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "form.json";
  a.click();
}
```

### Use with SurveyJS Renderer

```tsx
import { Survey } from "survey-react-ui";
import { SurveyConverter, EditorState } from "@workspace/surveyjs";

function RenderForm({ editorState }: { editorState: EditorState }) {
  const model = SurveyConverter.createModel(editorState);

  return <Survey model={model} />;
}
```

## Component Structure

```
FormEditor
├── SurveyHeaderEditor (Form title & description)
├── FieldToolbar (Add field buttons)
├── FieldList
│   └── FieldItem[] (Each field with actions)
└── PropertyEditor | SurveyPreview (Right panel)
```

## Field Types Reference

### Text Input

- **Use for**: Short answers, names, emails
- **Properties**: title, placeholder, required, input type (text/email/url/number)

### Text Area

- **Use for**: Long-form answers, comments, descriptions
- **Properties**: title, placeholder, required, rows (2-20)

### Date Picker

- **Use for**: Date selection, birthdays, appointments
- **Properties**: title, required

### Phone Number

- **Use for**: Contact numbers
- **Properties**: title, placeholder, required, input type (tel/text)

## Styling

The editor uses inline styles and is ready to use without additional CSS. It follows a clean, Google Form-inspired design.

## Troubleshooting

### Fields not appearing

- Make sure you've clicked a field type button in the toolbar
- Check console for errors

### Can't edit field properties

- Click on the field to select it first
- The Property Editor appears on the right when a field is selected

### Preview not updating

- The preview updates automatically when you make changes
- Deselect any field to see the preview (click on empty space)

## Next Steps

- See `README.md` for detailed documentation
- See `examples.tsx` for more usage patterns
- See `IMPLEMENTATION.md` for architecture details
