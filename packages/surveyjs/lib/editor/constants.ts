/**
 * Constants for the form editor
 */

import { FieldTemplate, FieldType } from "../models/types";

export const FIELD_TEMPLATES: Record<FieldType, FieldTemplate> = {
  text: {
    type: "text",
    label: "Text Input",
    icon: "📝",
    defaultProps: {
      type: "text",
      label: "Text Question",
      placeholder: "Enter your answer",
      required: false,
      name: "text_question",
    },
  },
  textarea: {
    type: "textarea",
    label: "Long Answer",
    icon: "📄",
    defaultProps: {
      type: "text",
      label: "Long Answer Question",
      required: false,
      placeholder: "Enter your detailed answer",
    },
  },
  date: {
    type: "date",
    label: "Date Picker",
    icon: "📅",
    defaultProps: {
      type: "text",
      label: "Date Question",
      required: false,
      placeholder: "Select a date",
    },
  },
  phone: {
    type: "phone",
    label: "Phone Number",
    icon: "📱",
    defaultProps: {
      type: "phone",
      label: "Phone Number",
      required: false,
      placeholder: "+1 (555) 000-0000",
    },
  },
};
