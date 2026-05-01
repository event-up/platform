"use server";

import { z } from "zod";
import {
  DEFAULT_EVENT_PAGE_DEFINITIONS,
  EVENT_PAGE_SCHEMA_VERSION,
  createDefaultEventPageSitePages,
  createEventPagePath,
  isProtectedEventPageId,
  isReservedEventPageSlug,
  isSingleSegmentEventPageSlug,
  normalizeEventPageSitePage,
  normalizeEventPageSlug,
} from "@workspace/page-builder";
import { authActionClient } from "@/lib/safe-action";
import {
  deleteEventPageServer,
  publishEventPagesDraftServer,
  saveEventPagesDraftServer,
} from "@workspace/database/server/event-page";
import type {
  EventPagePuckData,
  EventPageSeo,
} from "@workspace/models/db/event-page";
import type { EventPageSitePage } from "@workspace/page-builder";

const eventPageDataSchema = z
  .object({
    content: z.array(z.any()),
    root: z.record(z.string(), z.any()),
    zones: z.record(z.string(), z.any()).optional(),
  })
  .passthrough();

const eventPageSeoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
  })
  .optional();

const eventPageSchema = z.object({
  pageId: z.string().min(1),
  name: z.string().min(1),
  slug: z.string(),
  path: z.string(),
  kind: z.enum(["home", "reserved", "custom"]),
  template: z.enum(["registration", "invitation"]).optional(),
  data: eventPageDataSchema,
  seo: eventPageSeoSchema,
});

function normalizePagesForWrite(pages: EventPageSitePage[]) {
  const pageMap = new Map<string, EventPageSitePage>();

  pages.forEach((page) => {
    pageMap.set(page.pageId, page);
  });

  createDefaultEventPageSitePages().forEach((page) => {
    if (!pageMap.has(page.pageId)) {
      pageMap.set(page.pageId, page);
    }
  });

  const normalized = Array.from(pageMap.values()).map((page) => {
    const defaultDefinition = DEFAULT_EVENT_PAGE_DEFINITIONS.find(
      (definition) => definition.pageId === page.pageId,
    );

    if (defaultDefinition) {
      return normalizeEventPageSitePage({
        ...page,
        ...defaultDefinition,
      });
    }

    const slug = normalizeEventPageSlug(page.slug);
    const name = page.name.trim();

    if (!name) {
      throw new Error("Page name is required.");
    }

    if (!isSingleSegmentEventPageSlug(slug)) {
      throw new Error("Custom page paths must use a single slug.");
    }

    if (isReservedEventPageSlug(slug)) {
      throw new Error("This page path is reserved.");
    }

    return normalizeEventPageSitePage({
      ...page,
      name,
      slug,
      path: createEventPagePath(slug),
      kind: "custom",
      template: undefined,
    });
  });

  const seenSlugs = new Set<string>();
  normalized.forEach((page) => {
    if (seenSlugs.has(page.slug)) {
      throw new Error("Page paths must be unique.");
    }
    seenSlugs.add(page.slug);
  });

  return normalized;
}

export const saveEventPagesDraftAction = authActionClient
  .inputSchema(
    z.object({
      eventId: z.string().min(1),
      pages: z.array(eventPageSchema).min(1),
    }),
  )
  .action(async ({ parsedInput, ctx: { organizerId } }) => {
    const pages = normalizePagesForWrite(
      parsedInput.pages as EventPageSitePage[],
    );

    await saveEventPagesDraftServer({
      organizerId,
      eventId: parsedInput.eventId,
      pages: pages.map((page) => ({
        ...page,
        data: page.data as EventPagePuckData,
        seo: page.seo as EventPageSeo | undefined,
      })),
      schemaVersion: EVENT_PAGE_SCHEMA_VERSION,
    });

    return { success: true };
  });

export const publishEventPagesAction = authActionClient
  .inputSchema(
    z.object({
      eventId: z.string().min(1),
      pages: z.array(eventPageSchema).min(1),
    }),
  )
  .action(async ({ parsedInput, ctx: { organizerId } }) => {
    const pages = normalizePagesForWrite(
      parsedInput.pages as EventPageSitePage[],
    );

    await publishEventPagesDraftServer({
      organizerId,
      eventId: parsedInput.eventId,
      pages: pages.map((page) => ({
        ...page,
        data: page.data as EventPagePuckData,
        seo: page.seo as EventPageSeo | undefined,
      })),
      schemaVersion: EVENT_PAGE_SCHEMA_VERSION,
    });

    return { success: true };
  });

export const deleteEventPageAction = authActionClient
  .inputSchema(
    z.object({
      eventId: z.string().min(1),
      pageId: z.string().min(1),
    }),
  )
  .action(async ({ parsedInput, ctx: { organizerId } }) => {
    if (isProtectedEventPageId(parsedInput.pageId)) {
      throw new Error("Default and reserved pages cannot be deleted.");
    }

    await deleteEventPageServer(
      organizerId,
      parsedInput.eventId,
      parsedInput.pageId,
    );

    return { success: true };
  });
