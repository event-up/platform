export type EventPagePuckData = {
  content: unknown[];
  root: {
    props?: Record<string, unknown>;
    [key: string]: unknown;
  };
  zones?: Record<string, unknown>;
  [key: string]: unknown;
};

export type EventPageSeo = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

export type EventPageKind = "home" | "reserved" | "custom";

export type EventPageTemplate = "registration" | "invitation";

export type EventPageSnapshot<DateTime = string> = {
  data: EventPagePuckData;
  seo?: EventPageSeo;
  schemaVersion: number;
  savedAt: DateTime;
};

export type EventPage<DateTime = string> = {
  eventPageId: string;
  name: string;
  slug: string;
  path: string;
  kind: EventPageKind;
  template?: EventPageTemplate;
  organizerId: string;
  eventId: string;
  draft?: EventPageSnapshot<DateTime>;
  published?: EventPageSnapshot<DateTime>;
  createdAt: DateTime;
  updatedAt: DateTime;
  publishedAt?: DateTime;
  publishedBy?: string;
};
