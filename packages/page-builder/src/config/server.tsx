import type { ComponentConfig, Config } from "@puckeditor/core";
import { AgendaRenderer } from "../elements/agenda/renderer";
import { ButtonRenderer } from "../elements/button/renderer";
import { ButtonLinkRenderer } from "../elements/button-link/renderer";
import { containerAllowedComponents } from "../elements/container/allowed-components";
import { ContainerRenderer } from "../elements/container/renderer";
import { HeroRenderer } from "../elements/hero/renderer";
import { ImageBlockRenderer } from "../elements/image-block/renderer";
import { InvitationTokenSlotRenderer } from "../elements/invitation-token-slot/renderer";
import { RegistrationCTARenderer } from "../elements/registration-cta/renderer";
import { RegistrationFormSlotRenderer } from "../elements/registration-form-slot/renderer";
import { SectionRenderer } from "../elements/section/renderer";
import { rootBackground } from "../elements/shared/styles";
import { SpeakerGridRenderer } from "../elements/speaker-grid/renderer";
import { SponsorLogosRenderer } from "../elements/sponsor-logos/renderer";
import { TextBlockRenderer } from "../elements/text-block/renderer";
import { TextLabelRenderer } from "../elements/text-label/renderer";
import type { EventPageComponents, EventPageRootProps } from "../types";

const containerFields = {
  children: {
    type: "slot",
    allow: containerAllowedComponents,
  },
} as NonNullable<ComponentConfig<EventPageComponents["Container"]>["fields"]>;

export function createEventPageConfig(): Config<
  EventPageComponents,
  EventPageRootProps
> {
  return {
    root: {
      render: ({ children, background }) => (
        <main className={rootBackground[background || "white"]}>
          <div className="min-h-screen">{children}</div>
        </main>
      ),
    },
    components: {
      Container: {
        fields: containerFields,
        render: ContainerRenderer,
      },
      Button: {
        render: ButtonRenderer,
      },
      TextLabel: {
        render: TextLabelRenderer,
      },
      Hero: {
        render: HeroRenderer,
      },
      Section: {
        render: SectionRenderer,
      },
      TextBlock: {
        render: TextBlockRenderer,
      },
      ImageBlock: {
        render: ImageBlockRenderer,
      },
      ButtonLink: {
        render: ButtonLinkRenderer,
      },
      Agenda: {
        render: AgendaRenderer,
      },
      SpeakerGrid: {
        render: SpeakerGridRenderer,
      },
      SponsorLogos: {
        render: SponsorLogosRenderer,
      },
      RegistrationCTA: {
        render: RegistrationCTARenderer,
      },
      RegistrationFormSlot: {
        render: RegistrationFormSlotRenderer,
      },
      InvitationTokenSlot: {
        render: InvitationTokenSlotRenderer,
      },
    },
  };
}

export const eventPageConfig = createEventPageConfig();
