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
import { Button } from "@workspace/ui/components/button";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { AlertTriangle } from "lucide-react";

interface FormEditorProps {
  initialState?: Partial<EditorState>;
  onStateChange?: (state: EditorState) => void;
  onSaveClick?: (state: EditorState) => Promise<void>;
  showValidationWarnings?: boolean;
}

export const FormEditor: React.FC<FormEditorProps> = ({
  initialState,
  onStateChange,
  onSaveClick,
  showValidationWarnings = true,
}) => {
  const { state, operations, updateSurveyMeta, validation, hasContactFields } =
    useEditorState(initialState);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [state, onStateChange]);

  const selectedField = state.fields.find(
    (f) => f.id === state.selectedFieldId,
  );

  const handleSave = async () => {
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    if (onSaveClick) {
      await onSaveClick(state);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Validation Warning */}
      {showValidationWarnings && !validation.isValid && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{validation.message}</AlertDescription>
        </Alert>
      )}

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

          {/* Save Button */}
          {onSaveClick && (
            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleSave}
                disabled={!validation.isValid}
                className={`px-6 py-2 ${
                  validation.isValid
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {validation.isValid ? "Save Form" : "Fix Issues to Save"}
              </Button>
              {!validation.isValid && (
                <p className="text-sm text-red-600 mt-2">
                  {validation.message}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
