"use client";
/**
 * Main Form Editor Component
 * Follows Dependency Inversion and Single Responsibility Principles
 * Orchestrates the editor UI but delegates specific responsibilities to child components
 */

import React, { useEffect, useState } from "react";
import { useEditorState } from "../hooks/useEditorState";
import { EditorState } from "../../models/types";
import { FieldToolbar } from "./FieldToolbar";
import { FieldList } from "./FieldList";
import { PropertyEditor } from "./PropertyEditor";
import { SurveyHeaderEditor } from "./SurveyHeaderEditor";
import { SurveyPreview } from "./SurveyPreview";
import { Button } from "@workspace/ui/components/button";
import { Loader2 } from "lucide-react";

interface FormEditorProps {
  initialState?: Partial<EditorState>;
  onStateChange?: (state: EditorState) => void;
  onSaveClick?: (state: EditorState) => Promise<void>;
}

export const FormEditor: React.FC<FormEditorProps> = ({
  initialState,
  onStateChange,
  onSaveClick,
}) => {
  const { state, operations, updateSurveyMeta } = useEditorState(initialState);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [state, onStateChange]);

  const selectedField = state.fields.find(
    (f) => f.id === state.selectedFieldId
  );

  const handleSavePress = async () => {
    if (onSaveClick) {
      setIsSaving(true);
      try {
        await onSaveClick(state);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Form Editor</h1>
        <div style={styles.actions}>
          <Button onClick={handleSavePress} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Left Panel - Editor */}
        <div style={styles.leftPanel}>
          <SurveyHeaderEditor
            title={state.surveyTitle}
            description={state.surveyDescription}
            onUpdateTitle={(title) => updateSurveyMeta({ title })}
            onUpdateDescription={(description) =>
              updateSurveyMeta({ description })
            }
          />

          <FieldToolbar onAddField={operations.addField} />

          <FieldList
            fields={state.fields}
            selectedFieldId={state.selectedFieldId}
            onSelectField={operations.selectField}
            onRemoveField={operations.removeField}
            onMoveField={operations.moveField}
          />
        </div>

        {/* Right Panel - Properties & Preview */}
        <div style={styles.rightPanel}>
          {selectedField ? (
            <PropertyEditor
              field={selectedField}
              onUpdate={(updates) =>
                operations.updateField(selectedField.id, updates)
              }
            />
          ) : (
            <SurveyPreview state={state} />
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "0",
  } as React.CSSProperties,
  header: {
    backgroundColor: "#fff",
    borderBottom: "1px solid #e0e0e0",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
  } as React.CSSProperties,
  title: {
    fontSize: "20px",
    fontWeight: 600,
    margin: 0,
    color: "#333",
  } as React.CSSProperties,
  actions: {
    display: "flex",
    gap: "8px",
  } as React.CSSProperties,
  button: {
    padding: "8px 16px",
    backgroundColor: "#4285f4",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
  buttonSecondary: {
    padding: "8px 16px",
    backgroundColor: "#fff",
    color: "#4285f4",
    border: "1px solid #4285f4",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
  } as React.CSSProperties,
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "24px",
    padding: "24px",
    maxWidth: "1600px",
    margin: "0 auto",
  } as React.CSSProperties,
  leftPanel: {
    minWidth: 0,
  } as React.CSSProperties,
  rightPanel: {
    minWidth: 0,
  } as React.CSSProperties,
};
