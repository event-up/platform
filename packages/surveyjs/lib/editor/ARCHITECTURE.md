# Architecture Diagram

## Component Hierarchy

```
FormEditor (Main Orchestrator)
│
├─── Header (Title + Actions)
│    ├─── Form Editor Title
│    └─── Action Buttons (Save, Export JSON)
│
├─── Left Panel
│    │
│    ├─── SurveyHeaderEditor
│    │    ├─── Title Input
│    │    └─── Description Textarea
│    │
│    ├─── FieldToolbar
│    │    ├─── Text Input Button 📝
│    │    ├─── Textarea Button 📄
│    │    ├─── Date Picker Button 📅
│    │    └─── Phone Number Button 📱
│    │
│    └─── FieldList
│         └─── FieldItem (for each field)
│              ├─── Header
│              │    ├─── Index Badge
│              │    ├─── Type Label
│              │    └─── Actions
│              │         ├─── Move Up ↑
│              │         ├─── Move Down ↓
│              │         └─── Remove ×
│              │
│              └─── Content
│                   ├─── Title
│                   ├─── Description
│                   └─── Preview Input
│
└─── Right Panel (Conditional)
     │
     ├─── PropertyEditor (when field selected)
     │    ├─── Question Title Input
     │    ├─── Field Name Input
     │    ├─── Description Textarea
     │    ├─── Placeholder Input
     │    ├─── Type-specific Properties
     │    │    ├─── Rows (for textarea)
     │    │    └─── Input Type (for text/phone)
     │    ├─── Required Checkbox
     │    └─── Field Info Display
     │
     └─── SurveyPreview (when no selection)
          ├─── Preview Header
          └─── Survey Component (Live Preview)
```

## Data Flow

```
User Interaction
     ↓
Component (UI)
     ↓
Event Handler
     ↓
useEditorState Hook
     ↓
State Update (setState)
     ↓
React Re-render
     ↓
Updated UI
```

### Example: Adding a Field

```
1. User clicks "Text Input" button
   ↓
2. FieldToolbar.onAddField('text')
   ↓
3. operations.addField('text')
   ↓
4. useEditorState.addField() creates new field
   ↓
5. setState updates fields array
   ↓
6. FormEditor re-renders
   ↓
7. FieldList shows new FieldItem
   ↓
8. New field is auto-selected
   ↓
9. PropertyEditor displays field properties
```

### Example: Editing a Field

```
1. User types in Property Editor
   ↓
2. PropertyEditor.onUpdate({ title: 'new value' })
   ↓
3. operations.updateField(fieldId, { title: 'new value' })
   ↓
4. useEditorState.updateField() merges updates
   ↓
5. setState updates specific field
   ↓
6. FieldItem re-renders with new title
   ↓
7. SurveyPreview updates (if visible)
```

## State Structure

```typescript
EditorState {
  surveyTitle: string           // "Untitled Form"
  surveyDescription: string     // ""
  selectedFieldId: string | null // "field_abc123" or null
  fields: FieldDefinition[]     // Array of fields
}

FieldDefinition {
  id: string                    // "field_1234_xyz"
  type: FieldType               // 'text' | 'textarea' | 'date' | 'phone'
  name: string                  // "question_1"
  title: string                 // "What is your name?"
  isRequired: boolean           // false
  placeholder?: string          // "Enter your answer"
  description?: string          // "Help text"
  inputType?: string            // "text", "email", "tel", etc.
  rows?: number                 // 4 (for textarea)
}
```

## Module Dependencies

```
FormEditor
  ↓ imports
  ├─── useEditorState (hooks)
  ├─── EditorState (types)
  ├─── FieldToolbar (components)
  ├─── FieldList (components)
  ├─── PropertyEditor (components)
  ├─── SurveyHeaderEditor (components)
  └─── SurveyPreview (components)

SurveyPreview
  ↓ imports
  ├─── Survey (survey-react-ui)
  ├─── EditorState (types)
  └─── SurveyConverter (utils)

useEditorState
  ↓ imports
  ├─── EditorState (types)
  ├─── FieldDefinition (types)
  ├─── FieldType (types)
  ├─── FieldOperations (types)
  └─── FIELD_TEMPLATES (constants)

SurveyConverter
  ↓ imports
  ├─── Model (survey-core)
  ├─── FieldDefinition (types)
  └─── EditorState (types)
```

## SOLID Principles Mapping

```
Single Responsibility
├─── FieldToolbar: Only displays field type buttons
├─── FieldItem: Only displays one field
├─── PropertyEditor: Only edits properties
├─── SurveyPreview: Only shows preview
├─── useEditorState: Only manages state
└─── SurveyConverter: Only converts formats

Open/Closed
└─── Add new field types by extending constants
     No need to modify existing components

Liskov Substitution
└─── Any component can be replaced with compatible impl
     FormEditor doesn't care about internal component logic

Interface Segregation
├─── FieldToolbar: only needs onAddField
├─── FieldList: only needs fields + operations
└─── PropertyEditor: only needs field + onUpdate

Dependency Inversion
├─── FormEditor depends on EditorState (abstraction)
├─── SurveyPreview depends on EditorState (abstraction)
└─── Components don't depend on concrete implementations
```

## File Responsibility Matrix

| File                   | Responsibility          | Dependencies                  |
| ---------------------- | ----------------------- | ----------------------------- |
| FormEditor.tsx         | Orchestrate UI layout   | All components + hook         |
| FieldToolbar.tsx       | Show field type buttons | types, constants              |
| FieldItem.tsx          | Display one field       | types                         |
| FieldList.tsx          | List all fields         | types, FieldItem              |
| PropertyEditor.tsx     | Edit field properties   | types                         |
| SurveyHeaderEditor.tsx | Edit form metadata      | none                          |
| SurveyPreview.tsx      | Show live preview       | types, utils, survey-react-ui |
| useEditorState.ts      | Manage state            | types, constants              |
| surveyConverter.ts     | Convert formats         | types, survey-core            |
| types.ts               | Type definitions        | none                          |
| constants.ts           | Field templates         | types                         |

## Extension Points

Want to add a new field type? Here's what to modify:

```
1. types.ts
   └─── Add to FieldType union

2. constants.ts
   └─── Add to FIELD_TEMPLATES

3. PropertyEditor.tsx (optional)
   └─── Add type-specific property editors

4. surveyConverter.ts (optional)
   └─── Add special conversion logic
```

No other files need modification! ✨
