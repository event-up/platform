import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import { imageUrlField } from "../shared/fields";
import { HeroRenderer } from "./renderer";

export const heroConfig: ComponentConfig<EventPageComponents["Hero"]> = {
  fields: {
    eyebrow: { type: "text" },
    title: { type: "text" },
    subtitle: { type: "textarea" },
    imageUrl: imageUrlField("Image"),
    align: {
      type: "select",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
      ],
    },
    buttonLabel: { type: "text" },
    buttonHref: { type: "text" },
  },
  defaultProps: {
    eyebrow: "Featured event",
    title: "Bring your audience together",
    subtitle:
      "Design a polished event page with the details your guests need.",
    imageUrl: "",
    align: "left",
    buttonLabel: "Register now",
    buttonHref: "/reg",
  },
  render: HeroRenderer,
};
