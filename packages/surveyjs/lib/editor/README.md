# Form Editor

A Google Form-like interface for creating forms using SurveyJS. This editor provides an intuitive UI for building surveys with drag-and-drop functionality, field customization, and live preview.

## Features

- **Field Types**: Text input, Date picker, Text area, Phone number
- **Field Management**: Add, remove, and reorder fields
- **Property Editing**: Customize individual field properties
- **Live Preview**: See how your form will look to respondents
- **Export**: Convert to SurveyJS JSON format

## Architecture

Built following SOLID principles:

- **Single Responsibility**: Each component has one clear purpose
- **Open/Closed**: Extensible for new field types without modifying existing code
- **Liskov Substitution**: Components can be swapped with compatible implementations
- **Interface Segregation**: Clean, minimal interfaces
- **Dependency Inversion**: Depends on abstractions, not concrete implementations

## Components Structure

```
lib/editor/
├── components/          # UI Components
│   ├── FormEditor.tsx           # Main editor orchestrator
│   ├── FieldToolbar.tsx         # Add field buttons
│   ├── FieldList.tsx            # List of fields
│   ├── FieldItem.tsx            # Individual field display
│   ├── PropertyEditor.tsx       # Edit field properties
│   ├── SurveyHeaderEditor.tsx   # Edit form title/description
│   └── SurveyPreview.tsx        # Live preview
├── hooks/               # React hooks
│   └── useEditorState.ts        # State management
├── utils/               # Utilities
│   └── surveyConverter.ts       # Convert to/from SurveyJS format
├── types.ts             # TypeScript definitions
├── constants.ts         # Field templates and constants
└── index.ts             # Public API
```

## Usage

### Basic Usage

```tsx
import { FormEditor } from "@workspace/surveyjs";

function App() {
  return <FormEditor />;
}
```

### With State Management

```tsx
import { FormEditor, EditorState } from "@workspace/surveyjs";
import { useState } from "react";

function App() {
  const [editorState, setEditorState] = useState<EditorState>();

  const handleStateChange = (state: EditorState) => {
    setEditorState(state);
    console.log("Form updated:", state);
  };

  return (
    <FormEditor
      initialState={{
        surveyTitle: "My Custom Form",
        fields: [],
      }}
      onStateChange={handleStateChange}
    />
  );
}
```

### Custom Implementation

You can use individual components for custom implementations:

```tsx
import {
  useEditorState,
  FieldToolbar,
  FieldList,
  PropertyEditor,
} from "@workspace/surveyjs";

function CustomEditor() {
  const { state, operations } = useEditorState();

  return (
    <div>
      <FieldToolbar onAddField={operations.addField} />
      <FieldList
        fields={state.fields}
        selectedFieldId={state.selectedFieldId}
        onSelectField={operations.selectField}
        onRemoveField={operations.removeField}
        onMoveField={operations.moveField}
      />
      {/* Your custom UI */}
    </div>
  );
}
```

### Converting to SurveyJS Format

```tsx
import { SurveyConverter, EditorState } from "@workspace/surveyjs";

function exportForm(state: EditorState) {
  // Convert to SurveyJS JSON
  const surveyJSON = SurveyConverter.toSurveyJSON(state);

  // Or create a Survey model directly
  const model = SurveyConverter.createModel(state);

  // Export as JSON
  const jsonString = JSON.stringify(surveyJSON, null, 2);
  console.log(jsonString);
}
```

## Field Types

### Text Input

- Basic text field
- Supports different input types (email, URL, number)
- Configurable placeholder and validation

### Text Area

- Multi-line text input
- Configurable number of rows
- Ideal for longer responses

### Date Picker

- Native date input
- Consistent date format
- Easy date selection

### Phone Number

- Formatted phone input
- Configurable input type (tel/text)
- Custom placeholder support

## Adding New Field Types

To add a new field type, follow these steps:

1. Add the type to `types.ts`:

```typescript
export type FieldType =
  | "text"
  | "textarea"
  | "date"
  | "phone"
  | "your-new-type";
```

2. Add the template to `constants.ts`:

```typescript
export const FIELD_TEMPLATES: Record<FieldType, FieldTemplate> = {
  // ... existing templates
  "your-new-type": {
    type: "your-new-type",
    label: "Your Field Label",
    icon: "🆕",
    defaultProps: {
      type: "your-new-type",
      title: "Your Question",
      isRequired: false,
    },
  },
};
```

3. Update `PropertyEditor.tsx` if needed for custom properties
4. Update `SurveyConverter.ts` if special conversion logic is needed

## API Reference

### Types

#### `FieldType`

```typescript
type FieldType = "text" | "textarea" | "date" | "phone";
```

#### `FieldDefinition`

```typescript
interface FieldDefinition {
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
```

#### `EditorState`

```typescript
interface EditorState {
  fields: FieldDefinition[];
  selectedFieldId: string | null;
  surveyTitle: string;
  surveyDescription: string;
}
```

### Hooks

#### `useEditorState(initialState?)`

Returns state management utilities for the editor.

**Returns:**

- `state: EditorState` - Current editor state
- `operations: FieldOperations` - Field manipulation methods
- `updateSurveyMeta` - Update survey title/description

### Utils

#### `SurveyConverter.toSurveyJSON(state)`

Converts editor state to SurveyJS JSON format.

#### `SurveyConverter.createModel(state)`

Creates a SurveyJS Model from editor state.

#### `SurveyConverter.fromSurveyJSON(json)`

Converts SurveyJS JSON to editor state.

## Development

The component is built with:

- React 19
- TypeScript
- SurveyJS Core & React UI
- Inline styles (no external CSS dependencies)

## License

Private package for workspace use.
