import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import { InvitationTokenSlotRenderer } from "./renderer";

export const invitationTokenSlotConfig: ComponentConfig<
  EventPageComponents["InvitationTokenSlot"]
> = {
  fields: {
    title: { type: "text" },
    description: { type: "textarea" },
  },
  defaultProps: {
    title: "Invitation token",
    description:
      "The live invitation QR code and guest details are shown here on the public page.",
  },
  render: InvitationTokenSlotRenderer,
};
