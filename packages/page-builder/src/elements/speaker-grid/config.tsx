import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import { imageUrlField } from "../shared/fields";
import { SpeakerGridRenderer } from "./renderer";

export const speakerGridConfig: ComponentConfig<
  EventPageComponents["SpeakerGrid"]
> = {
  fields: {
    title: { type: "text" },
    speakers: {
      type: "array",
      arrayFields: {
        name: { type: "text" },
        role: { type: "text" },
        imageUrl: imageUrlField("Photo"),
      },
      defaultItemProps: {
        name: "Speaker name",
        role: "Role or topic",
        imageUrl: "",
      },
      getItemSummary: (item) => item.name || "Speaker",
    },
  },
  defaultProps: {
    title: "Speakers",
    speakers: [],
  },
  render: SpeakerGridRenderer,
};
