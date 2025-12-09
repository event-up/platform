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
      title: "Text Question",
      isRequired: false,
      placeholder: "Enter your answer",
      inputType: "text",
    },
  },
  textarea: {
    type: "textarea",
    label: "Long Answer",
    icon: "📄",
    defaultProps: {
      type: "textarea",
      title: "Long Answer Question",
      isRequired: false,
      placeholder: "Enter your detailed answer",
      rows: 4,
    },
  },
  date: {
    type: "date",
    label: "Date Picker",
    icon: "📅",
    defaultProps: {
      type: "date",
      title: "Date Question",
      isRequired: false,
      inputType: "date",
    },
  },
  phone: {
    type: "phone",
    label: "Phone Number",
    icon: "📱",
    defaultProps: {
      type: "phone",
      title: "Phone Number",
      isRequired: false,
      placeholder: "+1 (555) 000-0000",
      inputType: "tel",
    },
  },
};
