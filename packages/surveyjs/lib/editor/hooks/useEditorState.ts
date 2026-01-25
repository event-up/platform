/**
 * Custom hook for managing editor state
 * Follows Single Responsibility Principle - only handles state management
 */

import { useState, useCallback, useMemo } from "react";
import {
  EditorState,
  FieldOperations,
  ValidationResult,
} from "../../models/types";
import { FieldType, FormField } from "@workspace/models/dynamic-form";
import { FIELD_TEMPLATES } from "../constants";
import {
  validateFormForSave,
  hasContactChannelFields,
} from "../utils/validation";

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
      const template = FIELD_TEMPLATES[type];
      const newField: FormField = {
        id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: `question_${state.fields.length + 1}`,
        ...template.defaultProps,
      } as FormField;

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

  const updateField = useCallback((id: string, updates: Partial<FormField>) => {
    setState((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    }));
  }, []);

  const reorderFields = useCallback((newFields: FormField[]) => {
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

  // Validation state
  const validation = useMemo((): ValidationResult => {
    return validateFormForSave(state.fields);
  }, [state.fields]);

  const hasContactFields = useMemo((): boolean => {
    return hasContactChannelFields(state.fields);
  }, [state.fields]);

  return {
    state,
    operations,
    updateSurveyMeta,
    validation,
    hasContactFields,
  };
}
