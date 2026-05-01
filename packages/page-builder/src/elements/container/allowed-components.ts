import type { EventPageComponents } from "../../types";

export const containerAllowedComponents = [
  "Container",
  "Button",
  "TextLabel",
  "Hero",
  "Section",
  "TextBlock",
  "ImageBlock",
  "ButtonLink",
  "Agenda",
  "SpeakerGrid",
  "SponsorLogos",
  "RegistrationCTA",
  "RegistrationFormSlot",
  "InvitationTokenSlot",
] satisfies Array<keyof EventPageComponents>;
