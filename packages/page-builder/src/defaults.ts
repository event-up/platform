import type {
  EventPageData,
  EventPageDefinition,
  EventPageMetadata,
  EventPageSitePage,
  EventPageTemplate,
} from "./types";

export const EVENT_PAGE_SCHEMA_VERSION = 1;
export const EVENT_HOME_PAGE_ID = "home";
export const EVENT_LEGACY_PAGE_ID = "main";
export const EVENT_REGISTRATION_PAGE_ID = "reg";
export const EVENT_INVITATION_PAGE_ID = "inv";
export const EVENT_RESERVED_PAGE_IDS = [
  EVENT_HOME_PAGE_ID,
  EVENT_REGISTRATION_PAGE_ID,
  EVENT_INVITATION_PAGE_ID,
] as const;
export const EVENT_RESERVED_SLUGS = [
  EVENT_REGISTRATION_PAGE_ID,
  EVENT_INVITATION_PAGE_ID,
] as const;

export const DEFAULT_EVENT_PAGE_DEFINITIONS: EventPageDefinition[] = [
  {
    pageId: EVENT_HOME_PAGE_ID,
    name: "Landing",
    slug: "",
    path: "/",
    kind: "home",
  },
  {
    pageId: EVENT_REGISTRATION_PAGE_ID,
    name: "Registration",
    slug: EVENT_REGISTRATION_PAGE_ID,
    path: "/reg",
    kind: "reserved",
    template: "registration",
  },
  {
    pageId: EVENT_INVITATION_PAGE_ID,
    name: "Invitation",
    slug: EVENT_INVITATION_PAGE_ID,
    path: "/inv/[registrationId]",
    kind: "reserved",
    template: "invitation",
  },
];

export function normalizeEventPageSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isReservedEventPageSlug(value: string) {
  const slug = normalizeEventPageSlug(value);
  return EVENT_RESERVED_SLUGS.includes(
    slug as (typeof EVENT_RESERVED_SLUGS)[number],
  );
}

export function isSingleSegmentEventPageSlug(value: string) {
  const slug = normalizeEventPageSlug(value);
  return Boolean(slug) && !slug.includes("/");
}

export function createEventPagePath(
  slug: string,
  template?: EventPageTemplate,
) {
  if (template === "invitation") return "/inv/[registrationId]";
  return slug ? `/${slug}` : "/";
}

export function getDefaultEventPageDefinition(pageId: string) {
  return DEFAULT_EVENT_PAGE_DEFINITIONS.find((page) => page.pageId === pageId);
}

export function createDefaultEventPageData(
  metadata: EventPageMetadata = {},
): EventPageData {
  const eventName = metadata.eventName || "Your Event";
  const registrationHref = metadata.registrationHref || "/reg";

  return {
    root: {
      props: {
        title: eventName,
        description: "Create a memorable event page for your guests.",
        background: "white",
      },
    },
    content: [
      {
        type: "Hero",
        props: {
          id: "hero-default",
          eyebrow: metadata.eventLocation || "EventUp",
          title: eventName,
          subtitle:
            "Share the essential details, build excitement, and guide guests to register.",
          imageUrl: "",
          align: "left",
          buttonLabel: "Register now",
          buttonHref: registrationHref,
        },
      },
      {
        type: "Section",
        props: {
          id: "section-default",
          title: "About this event",
          body: "Use this space to introduce the experience, audience, venue, and what guests should expect.",
          background: "white",
        },
      },
      {
        type: "RegistrationCTA",
        props: {
          id: "registration-cta-default",
          title: "Ready to attend?",
          description: "Complete your registration to reserve your place.",
          buttonLabel: "Go to registration",
          href: registrationHref,
        },
      },
    ],
    zones: {},
  };
}

export function createDefaultRegistrationPageData(
  metadata: EventPageMetadata = {},
): EventPageData {
  const eventName = metadata.eventName || "Your Event";

  return {
    root: {
      props: {
        title: "Registration",
        description: `Register for ${eventName}.`,
        background: "soft",
      },
    },
    content: [
      {
        type: "Hero",
        props: {
          id: "registration-hero-default",
          eyebrow: metadata.eventLocation || "EventUp",
          title: `Register for ${eventName}`,
          subtitle:
            "Complete the form below to reserve your place at the event.",
          imageUrl: "",
          align: "center",
          buttonLabel: "",
          buttonHref: "",
        },
      },
      {
        type: "RegistrationFormSlot",
        props: {
          id: "registration-form-slot-default",
          title: "Registration form",
          description: "Guest registration details are collected here.",
        },
      },
    ],
    zones: {},
  };
}

export function createDefaultInvitationPageData(
  metadata: EventPageMetadata = {},
): EventPageData {
  const eventName = metadata.eventName || "Your Event";

  return {
    root: {
      props: {
        title: "Invitation",
        description: `Invitation for ${eventName}.`,
        background: "soft",
      },
    },
    content: [
      {
        type: "Hero",
        props: {
          id: "invitation-hero-default",
          eyebrow: "Invitation",
          title: eventName,
          subtitle: "Keep this invitation ready for event check-in.",
          imageUrl: "",
          align: "center",
          buttonLabel: "",
          buttonHref: "",
        },
      },
      {
        type: "InvitationTokenSlot",
        props: {
          id: "invitation-token-slot-default",
          title: "Invitation token",
          description: "The guest QR code and invitation details appear here.",
        },
      },
    ],
    zones: {},
  };
}

export function createDefaultEventPageSitePages(
  metadata: EventPageMetadata = {},
): EventPageSitePage[] {
  return DEFAULT_EVENT_PAGE_DEFINITIONS.map((definition) => {
    if (definition.template === "registration") {
      return {
        ...definition,
        data: createDefaultRegistrationPageData(metadata),
      };
    }

    if (definition.template === "invitation") {
      return {
        ...definition,
        data: createDefaultInvitationPageData(metadata),
      };
    }

    return {
      ...definition,
      data: createDefaultEventPageData(metadata),
    };
  });
}
