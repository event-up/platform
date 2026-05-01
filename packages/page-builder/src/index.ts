export { createEventPageConfig, eventPageConfig } from "./config";
export {
  EVENT_PAGE_SCHEMA_VERSION,
  EVENT_HOME_PAGE_ID,
  EVENT_INVITATION_PAGE_ID,
  EVENT_LEGACY_PAGE_ID,
  EVENT_REGISTRATION_PAGE_ID,
  EVENT_RESERVED_PAGE_IDS,
  EVENT_RESERVED_SLUGS,
  DEFAULT_EVENT_PAGE_DEFINITIONS,
  createDefaultEventPageSitePages,
  createDefaultEventPageData,
  createDefaultInvitationPageData,
  createDefaultRegistrationPageData,
  createEventPagePath,
  getDefaultEventPageDefinition,
  isReservedEventPageSlug,
  isSingleSegmentEventPageSlug,
  normalizeEventPageSlug,
} from "./defaults";
export { EventPageRenderer } from "./renderer";
export {
  isEventPageData,
  isProtectedEventPageId,
  normalizeEventPageData,
  normalizeEventPageSitePage,
  normalizeReservedEventPageData,
} from "./validation";
export type {
  EventPageData,
  EventPageDefinition,
  EventPageKind,
  EventPageMetadata,
  EventPageSeo,
  EventPageSitePage,
  EventPageTemplate,
} from "./types";
