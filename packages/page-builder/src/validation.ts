import {
  createDefaultInvitationPageData,
  createDefaultRegistrationPageData,
  EVENT_HOME_PAGE_ID,
  EVENT_INVITATION_PAGE_ID,
  EVENT_REGISTRATION_PAGE_ID,
  getDefaultEventPageDefinition,
} from "./defaults";
import type {
  EventPageData,
  EventPageDefinition,
  EventPageMetadata,
  EventPageSitePage,
} from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isEventPageData(value: unknown): value is EventPageData {
  if (!isRecord(value)) return false;
  if (!Array.isArray(value.content)) return false;
  if (!isRecord(value.root)) return false;

  return value.content.every((item) => {
    if (!isRecord(item)) return false;
    if (typeof item.type !== "string") return false;
    return isRecord(item.props);
  });
}

function getLegacyContainerZoneKeys(id: string) {
  return [`${id}:children`, `${id}:${id}:children`];
}

function migrateContainerSlotContent(
  content: EventPageData["content"],
  zones: NonNullable<EventPageData["zones"]>,
  migratedZoneKeys: Set<string>,
): EventPageData["content"] {
  return content.map((item) => {
    if (!isRecord(item) || !isRecord(item.props)) return item;

    const itemProps = item.props as Record<string, unknown>;
    const itemId = itemProps.id;
    const existingChildren = (
      Array.isArray(itemProps.children) ? itemProps.children : []
    ) as EventPageData["content"];

    if (item.type !== "Container" || typeof itemId !== "string") {
      return item;
    }

    const legacyZoneKey = getLegacyContainerZoneKeys(itemId).find(
      (zoneKey) => Array.isArray(zones[zoneKey]) && zones[zoneKey].length > 0,
    );
    const legacyChildren = (
      legacyZoneKey ? (zones[legacyZoneKey] ?? []) : []
    ) as EventPageData["content"];
    const children =
      existingChildren.length > 0 ? existingChildren : legacyChildren;

    if (legacyZoneKey) {
      migratedZoneKeys.add(legacyZoneKey);
    }

    return {
      ...item,
      props: {
        ...item.props,
        children: migrateContainerSlotContent(
          children,
          zones,
          migratedZoneKeys,
        ),
      },
    };
  }) as EventPageData["content"];
}

function migrateContainerSlots(data: EventPageData): EventPageData {
  const zones = data.zones ?? {};
  const migratedZoneKeys = new Set<string>();
  const content = migrateContainerSlotContent(
    data.content,
    zones,
    migratedZoneKeys,
  );

  if (migratedZoneKeys.size === 0) {
    return {
      ...data,
      content,
    };
  }

  const nextZones = Object.fromEntries(
    Object.entries(zones).filter(
      ([zoneKey]) => !migratedZoneKeys.has(zoneKey),
    ),
  );

  return {
    ...data,
    content,
    zones: Object.keys(nextZones).length > 0 ? nextZones : undefined,
  };
}

export function normalizeEventPageData(
  value: unknown,
  fallback: EventPageData,
): EventPageData {
  return migrateContainerSlots(isEventPageData(value) ? value : fallback);
}

function hasComponent(data: EventPageData, type: string) {
  return data.content.some((item) => isRecord(item) && item.type === type);
}

function withRequiredComponent(
  data: EventPageData,
  fallback: EventPageData,
  componentType: string,
) {
  if (hasComponent(data, componentType)) return data;

  const slot = fallback.content.find(
    (item) => isRecord(item) && item.type === componentType,
  );

  return {
    ...data,
    content: slot ? [...data.content, slot] : data.content,
  };
}

export function normalizeReservedEventPageData(
  page: Pick<EventPageDefinition, "pageId" | "template">,
  data: unknown,
  metadata: EventPageMetadata = {},
): EventPageData {
  if (page.template === "registration") {
    const fallback = createDefaultRegistrationPageData(metadata);
    return withRequiredComponent(
      normalizeEventPageData(data, fallback),
      fallback,
      "RegistrationFormSlot",
    );
  }

  // if (page.template === "invitation") {
  //   const fallback = createDefaultInvitationPageData(metadata);
  //   return withRequiredComponent(
  //     normalizeEventPageData(data, fallback),
  //     fallback,
  //     "InvitationTokenSlot",
  //   );
  // }

  //eefefe

  return data as EventPageData;
}

export function normalizeEventPageSitePage(
  page: EventPageSitePage,
  metadata: EventPageMetadata = {},
): EventPageSitePage {
  const defaultDefinition = getDefaultEventPageDefinition(page.pageId);
  const definition = defaultDefinition
    ? { ...page, ...defaultDefinition }
    : page;

  return {
    ...definition,
    data: normalizeReservedEventPageData(definition, page.data, metadata),
  };
}

export function isProtectedEventPageId(pageId: string) {
  return (
    pageId === EVENT_HOME_PAGE_ID ||
    pageId === EVENT_REGISTRATION_PAGE_ID ||
    pageId === EVENT_INVITATION_PAGE_ID
  );
}
