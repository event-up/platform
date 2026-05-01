import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import { RegistrationFormSlotRenderer } from "./renderer";

export const registrationFormSlotConfig: ComponentConfig<
  EventPageComponents["RegistrationFormSlot"]
> = {
  fields: {
    title: { type: "text" },
    description: { type: "textarea" },
  },
  defaultProps: {
    title: "Registration form",
    description: "The live registration form is shown here on the public page.",
  },
  render: RegistrationFormSlotRenderer,
};
