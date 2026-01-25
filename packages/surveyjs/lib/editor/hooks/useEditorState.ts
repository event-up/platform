/**
 * Custom hook for managing editor state
 * Follows Single Responsibility Principle - only handles state management
 */

import { useState, useCallback } from "react";
import {
  EditorState,
  FieldDefinition,
  FieldType,
  FieldOperations,
} from "../../models/types";
import { FIELD_TEMPLATES } from "../constants";

export function useEditorState(initialState?: Partial<EditorState>) {
  const [state, setState] = useState<EditorState>({
    fields: [],
    selectedFieldId: null,
    surveyTitle: "Untitled Form",
    surveyDescription: "",
    ...initialState,
  });

  const addField = useCallback(
    (type: FieldType) => {
      debugger;
      const template = FIELD_TEMPLATES[type];
      const newField: FieldDefinition = {
        id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: `question_${state.fields.length + 1}`,
        ...template.defaultProps,
      } as FieldDefinition;

      setState((prev) => ({
        ...prev,
        fields: [...prev.fields, newField],
        selectedFieldId: newField.id,
      }));
    },
    [state.fields.length],
  );

  const removeField = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== id),
      selectedFieldId:
        prev.selectedFieldId === id ? null : prev.selectedFieldId,
    }));
  }, []);

  const updateField = useCallback(
    (id: string, updates: Partial<FieldDefinition>) => {
      setState((prev) => ({
        ...prev,
        fields: prev.fields.map((f) =>
          f.id === id ? { ...f, ...updates } : f,
        ),
      }));
    },
    [],
  );

  const reorderFields = useCallback((newFields: FieldDefinition[]) => {
    setState((prev) => ({
      ...prev,
      fields: newFields,
    }));
  }, []);

  const selectField = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedFieldId: id }));
  }, []);

  const updateSurveyMeta = useCallback(
    (updates: { title?: string; description?: string }) => {
      setState((prev) => ({
        ...prev,
        surveyTitle: updates.title ?? prev.surveyTitle,
        surveyDescription: updates.description ?? prev.surveyDescription,
      }));
    },
    [],
  );

  const operations: FieldOperations = {
    addField,
    removeField,
    updateField,
    reorderFields,
    selectField,
  };

  return {
    state,
    operations,
    updateSurveyMeta,
  };
}
