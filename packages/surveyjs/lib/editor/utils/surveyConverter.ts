/**
 * Utility for converting between editor state and SurveyJS format
 * Follows Single Responsibility Principle
 */

import { EditorState } from "../../models/types";
import { FormField } from "@workspace/models/dynamic-form";

export class SurveyConverter {
  /**
   * Convert editor fields to SurveyJS JSON format
   */
  static toSurveyJSON(state: EditorState): any {
    const elements = state.fields.map((field) => {
      const element: any = {
        type: field.type,
        name: field.name,
        title: field.title,
        isRequired: field.isRequired,
      };

      if (field.placeholder) {
        element.placeholder = field.placeholder;
      }

      if (field.description) {
        element.description = field.description;
      }

      if (field.inputType) {
        element.inputType = field.inputType;
      }

      if (field.rows && field.type === "textarea") {
        element.rows = field.rows;
      }

      return element;
    });

    return {
      title: state.surveyTitle,
      description: state.surveyDescription,
      pages: [
        {
          name: "page1",
          elements,
        },
      ],
    };
  }

  /**
   * Create a model object from editor state
   * Returns the JSON representation (survey-core dependency removed)
   */
  static createModel(state: EditorState): any {
    return this.toSurveyJSON(state);
  }

  /**
   * Convert SurveyJS JSON to editor state
   */
  static fromSurveyJSON(json: any): Partial<EditorState> {
    const firstPage = json.pages?.[0];
    const elements = firstPage?.elements || [];

    const fields: FormField[] = elements.map((element: any, index: number) => ({
      id: `field_${Date.now()}_${index}`,
      type: element.type,
      name: element.name,
      title: element.title || "",
      isRequired: element.isRequired || false,
      placeholder: element.placeholder,
      description: element.description,
      inputType: element.inputType,
      rows: element.rows,
    }));

    return {
      fields,
      surveyTitle: json.title || "Untitled Form",
      surveyDescription: json.description || "",
      selectedFieldId: null,
    };
  }
}
