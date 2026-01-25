"use client";
/**
 * Main Form Editor Component
 * Follows Dependency Inversion and Single Responsibility Principles
 * Orchestrates the editor UI but delegates specific responsibilities to child components
 */

import React, { useEffect } from "react";
import { useEditorState } from "../hooks/useEditorState";
import { EditorState } from "../../models/types";
import { FieldList } from "./FieldList";
import { PropertyEditor } from "./PropertyEditor";
import { SurveyHeaderEditor } from "./SurveyHeaderEditor";
import { SurveyPreview } from "./SurveyPreview";

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

  useEffect(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [state, onStateChange]);

  const selectedField = state.fields.find(
    (f) => f.id === state.selectedFieldId,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Main Panel - Editor (full width) */}
        <div className="min-w-0">
          <SurveyHeaderEditor
            title={state.surveyTitle}
            description={state.surveyDescription}
            onUpdateTitle={(title) => updateSurveyMeta({ title })}
            onUpdateDescription={(description) =>
              updateSurveyMeta({ description })
            }
          />

          <FieldList
            fields={state.fields}
            selectedFieldId={state.selectedFieldId}
            onSelectField={operations.selectField}
            onRemoveField={operations.removeField}
            onReorderFields={operations.reorderFields}
            onAddField={operations.addField}
            onUpdateField={operations.updateField}
          />
        </div>
      </div>
    </div>
  );
};
