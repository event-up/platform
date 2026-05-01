import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import { TextBlockRenderer } from "./renderer";

export const textBlockConfig: ComponentConfig<
  EventPageComponents["TextBlock"]
> = {
  fields: {
    title: { type: "text" },
    body: { type: "textarea" },
    align: {
      type: "select",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
      ],
    },
  },
  defaultProps: {
    title: "Helpful information",
    body: "Use focused text blocks for directions, policies, accessibility notes, or event highlights.",
    align: "left",
  },
  render: TextBlockRenderer,
};
