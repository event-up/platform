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
        id: field.id,
        title: field.label,
        isRequired: field.required,
      };

      if (field.placeholder) {
        element.placeholder = field.placeholder;
      }

      if (field.description) {
        element.description = field.description;
      }

      if (field.options?.length) {
        element.options = field.options;
      }

      return element;
    });

    return {
      title: state.surveyTitle,
      description: state.surveyDescription,
      metadata: {
        registrationBranding: {
          coverImageUrl: state.coverImageUrl,
          organizerName: state.organizerName,
          organizerLogoUrl: state.organizerLogoUrl,
        },
      },
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
    const registrationBranding = json.metadata?.registrationBranding || {};

    const fields: FormField[] = elements.map((element: any, index: number) => ({
      id: element.id || `field_${Date.now()}_${index}`,
      type: element.type,
      label: element.title || "",
      required: element.isRequired || false,
      placeholder: element.placeholder,
      description: element.description,
      options: element.options,
    }));

    return {
      fields,
      surveyTitle: json.title || "Untitled Form",
      surveyDescription: json.description || "",
      coverImageUrl: registrationBranding.coverImageUrl || "",
      organizerName: registrationBranding.organizerName || "EventUp",
      organizerLogoUrl: registrationBranding.organizerLogoUrl || "",
      selectedFieldId: null,
    };
  }
}
