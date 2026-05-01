"use client";

import type { Config } from "@puckeditor/core";
import { agendaConfig } from "../elements/agenda";
import { buttonConfig } from "../elements/button";
import { buttonLinkConfig } from "../elements/button-link";
import { createContainerConfig } from "../elements/container/config";
import { heroConfig } from "../elements/hero";
import { createImageBlockConfig } from "../elements/image-block/config";
import { invitationTokenSlotConfig } from "../elements/invitation-token-slot";
import { registrationFormSlotConfig } from "../elements/registration-form-slot";
import { registrationCTAConfig } from "../elements/registration-cta";
import { sectionConfig } from "../elements/section";
import { rootBackground } from "../elements/shared/styles";
import { speakerGridConfig } from "../elements/speaker-grid";
import { sponsorLogosConfig } from "../elements/sponsor-logos";
import { textLabelConfig } from "../elements/text-label";
import { textBlockConfig } from "../elements/text-block";
import type { EventPageComponents, EventPageRootProps } from "../types";

export type EventPageImageUploadContext =
  | "container-background-image"
  | "image-block";

export type EventPageImageUploadHandler = (
  file: File,
  context: {
    imageContext: EventPageImageUploadContext;
  },
) => Promise<string>;

type EventPageClientConfigOptions = {
  uploadImage?: EventPageImageUploadHandler;
};

export function createEventPageClientConfig(
  options: EventPageClientConfigOptions = {},
): Config<EventPageComponents, EventPageRootProps> {
  const uploadImage = options.uploadImage;

  return {
    root: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        background: {
          type: "select",
          options: [
            { label: "White", value: "white" },
            { label: "Soft", value: "soft" },
            { label: "Dark", value: "dark" },
          ],
        },
      },
      defaultProps: {
        title: "Event page",
        description: "A custom EventUp event page.",
        background: "white",
      },
      render: ({ children, background }) => (
        <main className={rootBackground[background || "white"]}>
          <div className="min-h-screen">{children}</div>
        </main>
      ),
    },
    categories: {
      basics: {
        title: "Basics",
        components: ["Container", "TextLabel", "Button"],
        defaultExpanded: true,
      },
      content: {
        title: "Content",
        components: ["Hero", "Section", "TextBlock", "ImageBlock"],
        defaultExpanded: true,
      },
      event: {
        title: "Event",
        components: [
          "Agenda",
          "SpeakerGrid",
          "SponsorLogos",
          "RegistrationCTA",
        ],
        defaultExpanded: true,
      },
      reserved: {
        title: "Reserved",
        components: ["RegistrationFormSlot", "InvitationTokenSlot"],
      },
      actions: {
        title: "Actions",
        components: ["ButtonLink"],
      },
    },
    components: {
      Container: createContainerConfig({
        uploadBackgroundImage: uploadImage
          ? (file) =>
              uploadImage(file, {
                imageContext: "container-background-image",
              })
          : undefined,
      }),
      Button: buttonConfig,
      TextLabel: textLabelConfig,
      Hero: heroConfig,
      Section: sectionConfig,
      TextBlock: textBlockConfig,
      ImageBlock: createImageBlockConfig({
        uploadImage: uploadImage
          ? (file) =>
              uploadImage(file, {
                imageContext: "image-block",
              })
          : undefined,
      }),
      ButtonLink: buttonLinkConfig,
      Agenda: agendaConfig,
      SpeakerGrid: speakerGridConfig,
      SponsorLogos: sponsorLogosConfig,
      RegistrationCTA: registrationCTAConfig,
      RegistrationFormSlot: registrationFormSlotConfig,
      InvitationTokenSlot: invitationTokenSlotConfig,
    },
  };
}

export const eventPageClientConfig = createEventPageClientConfig();
