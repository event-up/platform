/**
 * Constants for the form editor
 */

import { FieldType } from "lib/renderer";
import { FieldTemplate } from "../models/types";

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
  email: {
    type: "email",
    label: "Email Address",
    icon: "📧",
    defaultProps: {
      type: "email",
      label: "Email Address",
      required: false,
      placeholder: "user@example.com",
    },
  },
  select: {
    type: "select",
    label: "Multiple Choice",
    icon: "✅",
    defaultProps: {
      type: "select",
      label: "Multiple Choice Question",
      required: false,
      options: [
        { label: "Option 1", value: "option_1" },
        { label: "Option 2", value: "option_2" },
        { label: "Option 3", value: "option_3" },
      ],
    },
  },
  multiselect: {
    type: "multiselect",
    label: "Checkboxes",
    icon: "☑️",
    defaultProps: {
      type: "multiselect",
      label: "Checkboxes Question",
      required: false,
      options: [
        { label: "Option 1", value: "option_1" },
        { label: "Option 2", value: "option_2" },
        { label: "Option 3", value: "option_3" },
      ],
    },
  },
};

export const CONTACT_CHANNEL_FIELDS: FieldType[] = ["phone", "email"];
