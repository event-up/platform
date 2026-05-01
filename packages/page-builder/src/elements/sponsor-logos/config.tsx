import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import { imageUrlField } from "../shared/fields";
import { SponsorLogosRenderer } from "./renderer";

export const sponsorLogosConfig: ComponentConfig<
  EventPageComponents["SponsorLogos"]
> = {
  fields: {
    title: { type: "text" },
    sponsors: {
      type: "array",
      arrayFields: {
        name: { type: "text" },
        logoUrl: imageUrlField("Logo"),
        href: { type: "text" },
      },
      defaultItemProps: {
        name: "Sponsor",
        logoUrl: "",
        href: "",
      },
      getItemSummary: (item) => item.name || "Sponsor",
    },
  },
  defaultProps: {
    title: "Partners",
    sponsors: [],
  },
  render: SponsorLogosRenderer,
};
