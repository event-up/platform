/**
 * Example usage of the Form Editor
 * This file demonstrates various ways to use the editor
 */

import React, { useState } from "react";
import {
  FormEditor,
  EditorState,
  SurveyConverter,
  useEditorState,
  FieldToolbar,
  FieldList,
  PropertyEditor,
  SurveyPreview,
} from "./index";

/**
 * Example 1: Basic usage
 */
export function BasicExample() {
  return (
    <div>
      <h1>Basic Form Editor</h1>
      <FormEditor />
    </div>
  );
}

/**
 * Example 2: With state tracking
 */
export function StateTrackingExample() {
  const [state, setState] = useState<EditorState>();

  const handleStateChange = (newState: EditorState) => {
    setState(newState);
    console.log("State changed:", newState);
  };

  const exportJSON = () => {
    if (state) {
      const json = SurveyConverter.toSurveyJSON(state);
      console.log("Exported JSON:", JSON.stringify(json, null, 2));

      // You could download this, send to API, etc.
      const blob = new Blob([JSON.stringify(json, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "survey.json";
      a.click();
    }
  };

  return (
    <div>
      <button onClick={exportJSON}>Export JSON</button>
      <FormEditor onStateChange={handleStateChange} />

      {state && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h3>Current State</h3>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

/**
 * Example 3: Pre-populated form
 */
export function PrePopulatedExample() {
  const initialState: Partial<EditorState> = {
    surveyTitle: "Customer Feedback Survey",
    surveyDescription:
      "We value your feedback! Please take a moment to fill out this survey.",
    fields: [
      {
        id: "field_1",
        type: "text",
        name: "full_name",
        title: "What is your full name?",
        isRequired: true,
        placeholder: "John Doe",
        inputType: "text",
      },
      {
        id: "field_2",
        type: "phone",
        name: "phone_number",
        title: "Phone Number",
        isRequired: true,
        placeholder: "+1 (555) 000-0000",
        inputType: "tel",
      },
      {
        id: "field_3",
        type: "textarea",
        name: "feedback",
        title: "Please share your feedback",
        isRequired: false,
        placeholder: "Tell us about your experience...",
        rows: 5,
      },
    ],
  };

  return <FormEditor initialState={initialState} />;
}

/**
 * Example 4: Custom layout with individual components
 */
export function CustomLayoutExample() {
  const { state, operations, updateSurveyMeta } = useEditorState({
    surveyTitle: "Custom Layout Form",
  });

  const selectedField = state.fields.find(
    (f: any) => f.id === state.selectedFieldId,
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left sidebar */}
      <div
        style={{
          width: "250px",
          padding: "20px",
          borderRight: "1px solid #e0e0e0",
        }}
      >
        <h2>Add Fields</h2>
        <FieldToolbar onAddField={operations.addField} />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
        <input
          type="text"
          value={state.surveyTitle}
          onChange={(e) => updateSurveyMeta({ title: e.target.value })}
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            width: "100%",
            marginBottom: "20px",
          }}
        />

        <FieldList
          fields={state.fields}
          selectedFieldId={state.selectedFieldId}
          onSelectField={operations.selectField}
          onRemoveField={operations.removeField}
          onMoveField={operations.moveField}
        />
      </div>

      {/* Right sidebar */}
      <div
        style={{
          width: "350px",
          padding: "20px",
          borderLeft: "1px solid #e0e0e0",
          overflow: "auto",
        }}
      >
        {selectedField ? (
          <PropertyEditor
            field={selectedField}
            onUpdate={(updates: any) =>
              operations.updateField(selectedField.id, updates)
            }
          />
        ) : (
          <SurveyPreview state={state} />
        )}
      </div>
    </div>
  );
}

/**
 * Example 5: Integration with API
 */
export function APIIntegrationExample() {
  const [loading, setLoading] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  const handleSave = async (state: EditorState) => {
    setLoading(true);
    try {
      const json = SurveyConverter.toSurveyJSON(state);

      // Example API call (replace with your actual API)
      const response = await fetch("/api/surveys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      const result = await response.json();
      setSavedId(result.id);
      alert("Form saved successfully!");
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <div>Saving...</div>}
      {savedId && <div>Saved with ID: {savedId}</div>}

      <FormEditor
        onSaveClick={handleSave}
        onStateChange={(state: any) => {
          // Auto-save or manual save trigger
          // handleSave(state);
        }}
      />

      <button
        onClick={() => {
          /* trigger save */
        }}
      >
        Save Form
      </button>
    </div>
  );
}

/**
 * Example 6: Load from existing SurveyJS JSON
 */
export function LoadFromJSONExample() {
  const existingSurveyJSON = {
    title: "Loaded Survey",
    description: "This was loaded from JSON",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "text",
            name: "question1",
            title: "Loaded Question",
            isRequired: true,
          },
        ],
      },
    ],
  };

  const initialState = SurveyConverter.fromSurveyJSON(existingSurveyJSON);

  return <FormEditor initialState={initialState} />;
}
