import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import { SectionRenderer } from "./renderer";

export const sectionConfig: ComponentConfig<EventPageComponents["Section"]> = {
  fields: {
    title: { type: "text" },
    body: { type: "textarea" },
    background: {
      type: "select",
      options: [
        { label: "White", value: "white" },
        { label: "Muted", value: "muted" },
        { label: "Accent", value: "accent" },
      ],
    },
  },
  defaultProps: {
    title: "Section title",
    body: "Add event details, guest instructions, venue notes, or sponsor information.",
    background: "white",
  },
  render: SectionRenderer,
};
