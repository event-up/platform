import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import { numberField, textColorField } from "../shared/fields";
import { TextLabelRenderer } from "./renderer";

export const textLabelConfig: ComponentConfig<
  EventPageComponents["TextLabel"]
> = {
  fields: {
    text: { type: "textarea" },
    size: numberField("Font size", {
      defaultValue: 16,
      min: 1,
      max: 200,
      step: 1,
      unit: "px",
      legacyValues: {
        small: 14,
        medium: 16,
        large: 20,
      },
    }),
    textColor: textColorField("Text color"),
    weight: {
      type: "select",
      options: [
        { label: "Regular", value: "regular" },
        { label: "Medium", value: "medium" },
        { label: "Semibold", value: "semibold" },
      ],
    },
    align: {
      type: "select",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
  },
  defaultProps: {
    text: "Add a short label or note.",
    size: 16,
    textColor: "text-[#334155]",
    weight: "regular",
    align: "left",
  },
  render: TextLabelRenderer,
};
