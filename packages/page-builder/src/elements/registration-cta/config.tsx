import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import { RegistrationCTARenderer } from "./renderer";

export const registrationCTAConfig: ComponentConfig<
  EventPageComponents["RegistrationCTA"]
> = {
  fields: {
    title: { type: "text" },
    description: { type: "textarea" },
    buttonLabel: { type: "text" },
    href: { type: "text" },
  },
  defaultProps: {
    title: "Ready to attend?",
    description: "Register now and keep your event details close.",
    buttonLabel: "Register now",
    href: "/reg",
  },
  render: RegistrationCTARenderer,
};
