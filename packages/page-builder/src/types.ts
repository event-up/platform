import type { Data, Slot } from "@puckeditor/core";
import type { ReactNode } from "react";

export type ContainerPaddingPreset = "none" | "small" | "medium" | "large";

export type ContainerPadding = {
  all: boolean;
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type ContainerSizeUnit = "px" | "vh";

export type ContainerSize = {
  enabled: boolean;
  value: number;
  unit: ContainerSizeUnit;
};

export type BackgroundImagePosition =
  | "center center"
  | "top center"
  | "bottom center"
  | "left center"
  | "right center"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

export type BackgroundImageSize =
  | "cover"
  | "contain"
  | "auto"
  | "100% auto"
  | "auto 100%";

export type BackgroundAttachment = "scroll" | "fixed" | "local";

export type EventPageSeo = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

export type EventPageKind = "home" | "reserved" | "custom";

export type EventPageTemplate = "registration" | "invitation";

export type EventPageDefinition = {
  pageId: string;
  name: string;
  slug: string;
  path: string;
  kind: EventPageKind;
  template?: EventPageTemplate;
};

export type EventPageSitePage = EventPageDefinition & {
  data: EventPageData;
  seo?: EventPageSeo;
};

export type EventPageMetadata = {
  eventName?: string;
  eventDate?: string;
  eventLocation?: string;
  registrationHref?: string;
  registrationSlot?: ReactNode;
  invitationSlot?: ReactNode;
};

export type EventPageRootProps = {
  title: string;
  description: string;
  background: "white" | "soft" | "dark";
};

export type EventPageComponents = {
  Container: {
    children: Slot;
    background: "transparent" | "white" | "muted" | "accent";
    padding: ContainerPadding | ContainerPaddingPreset;
    height: ContainerSize;
    minHeight: ContainerSize;
    backgroundImage: string;
    backgroundImagePosition: BackgroundImagePosition;
    backgroundImageSize: BackgroundImageSize;
    backgroundAttachment: BackgroundAttachment;
    maxWidth: "small" | "medium" | "large" | "full";
    align: "left" | "center" | "right";
  };
  Button: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
    align: "left" | "center" | "right";
  };
  TextLabel: {
    text: string;
    size: number | "small" | "medium" | "large";
    textColor: string;
    weight: "regular" | "medium" | "semibold";
    align: "left" | "center" | "right";
  };
  Hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    align: "left" | "center";
    buttonLabel: string;
    buttonHref: string;
  };
  Section: {
    title: string;
    body: string;
    background: "white" | "muted" | "accent";
  };
  TextBlock: {
    title: string;
    body: string;
    align: "left" | "center";
  };
  ImageBlock: {
    imageUrl: string;
    alt: string;
    caption: string;
  };
  ButtonLink: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
    align: "left" | "center";
  };
  Agenda: {
    title: string;
    items: Array<{
      time: string;
      title: string;
      description: string;
    }>;
  };
  SpeakerGrid: {
    title: string;
    speakers: Array<{
      name: string;
      role: string;
      imageUrl: string;
    }>;
  };
  SponsorLogos: {
    title: string;
    sponsors: Array<{
      name: string;
      logoUrl: string;
      href: string;
    }>;
  };
  RegistrationCTA: {
    title: string;
    description: string;
    buttonLabel: string;
    href: string;
  };
  RegistrationFormSlot: {
    title: string;
    description: string;
  };
  InvitationTokenSlot: {
    title: string;
    description: string;
  };
};

export type EventPageData = Data<EventPageComponents, EventPageRootProps>;
