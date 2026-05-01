import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import { AgendaRenderer } from "./renderer";

export const agendaConfig: ComponentConfig<EventPageComponents["Agenda"]> = {
  fields: {
    title: { type: "text" },
    items: {
      type: "array",
      arrayFields: {
        time: { type: "text" },
        title: { type: "text" },
        description: { type: "textarea" },
      },
      defaultItemProps: {
        time: "9:00 AM",
        title: "Session title",
        description: "Short session description.",
      },
      getItemSummary: (item) => item.title || item.time || "Agenda item",
    },
  },
  defaultProps: {
    title: "Agenda",
    items: [
      {
        time: "9:00 AM",
        title: "Doors open",
        description: "Guests arrive and check in.",
      },
    ],
  },
  render: AgendaRenderer,
};
