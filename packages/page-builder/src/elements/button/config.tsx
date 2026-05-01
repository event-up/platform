import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import { ButtonRenderer } from "./renderer";

export const buttonConfig: ComponentConfig<EventPageComponents["Button"]> = {
  fields: {
    label: { type: "text" },
    href: { type: "text" },
    variant: {
      type: "select",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
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
    label: "Button",
    href: "/reg",
    variant: "primary",
    align: "left",
  },
  render: ButtonRenderer,
};
