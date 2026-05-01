import { firestore } from "firebase-admin";
import { serverDb as db } from "@workspace/firebase/server";
import type {
  EventPage,
  EventPageKind,
  EventPagePuckData,
  EventPageSeo,
  EventPageTemplate,
} from "@workspace/models/db/event-page";
import { firestorePaths } from "../paths";
import { assertOrganizerOwnsEventServer } from "../event/assert-ownership.server";

type EventPageWriteInput = {
  pageId: string;
  name: string;
  slug: string;
  path: string;
  kind: EventPageKind;
  template?: EventPageTemplate;
  data: EventPagePuckData;
  seo?: EventPageSeo;
};

type SaveEventPagesDraftInput = {
  organizerId: string;
  eventId: string;
  pages: EventPageWriteInput[];
  schemaVersion: number;
};

function getEventPageDocRef(
  organizerId: string,
  eventId: string,
  pageId: string,
) {
  return db.doc(firestorePaths.eventPageDoc(organizerId, eventId, pageId).join("/"));
}

function createDraft(
  page: EventPageWriteInput,
  schemaVersion: number,
  savedAt: FirebaseFirestore.FieldValue,
): EventPage<FirebaseFirestore.FieldValue>["draft"] {
  return {
    data: page.data,
    seo: page.seo,
    schemaVersion,
    savedAt,
  };
}

function createBasePageFields(
  organizerId: string,
  eventId: string,
  page: EventPageWriteInput,
) {
  return {
    eventPageId: page.pageId,
    organizerId,
    eventId,
    name: page.name,
    slug: page.slug,
    path: page.path,
    kind: page.kind,
    ...(page.template ? { template: page.template } : {}),
  };
}

export async function saveEventPagesDraftServer({
  organizerId,
  eventId,
  pages,
  schemaVersion,
}: SaveEventPagesDraftInput): Promise<void> {
  const now = firestore.FieldValue.serverTimestamp();

  await db.runTransaction(async (transaction) => {
    // Phase 1: all reads
    await assertOrganizerOwnsEventServer(organizerId, eventId, transaction);

    const refsAndPages = pages.map((page) => ({
      page,
      ref: getEventPageDocRef(organizerId, eventId, page.pageId),
    }));
    const results = await Promise.all(
      refsAndPages.map(async ({ page, ref }) => ({
        page,
        ref,
        snapshot: await transaction.get(ref),
      })),
    );

    // Phase 2: all writes
    for (const { page, ref, snapshot } of results) {
      transaction.set(
        ref,
        {
          ...createBasePageFields(organizerId, eventId, page),
          draft: createDraft(page, schemaVersion, now),
          ...(snapshot.exists ? {} : { createdAt: now }),
          updatedAt: now,
        },
        { merge: true },
      );
    }
  });
}

export async function publishEventPagesDraftServer({
  organizerId,
  eventId,
  pages,
  schemaVersion,
}: SaveEventPagesDraftInput): Promise<void> {
  const now = firestore.FieldValue.serverTimestamp();

  await db.runTransaction(async (transaction) => {
    // Phase 1: all reads
    await assertOrganizerOwnsEventServer(organizerId, eventId, transaction);

    const refsAndPages = pages.map((page) => ({
      page,
      ref: getEventPageDocRef(organizerId, eventId, page.pageId),
    }));
    const results = await Promise.all(
      refsAndPages.map(async ({ page, ref }) => ({
        page,
        ref,
        snapshot: await transaction.get(ref),
      })),
    );

    // Phase 2: all writes
    for (const { page, ref, snapshot } of results) {
      const draft = createDraft(page, schemaVersion, now);

      transaction.set(
        ref,
        {
          ...createBasePageFields(organizerId, eventId, page),
          draft,
          published: draft,
          publishedAt: now,
          publishedBy: organizerId,
          ...(snapshot.exists ? {} : { createdAt: now }),
          updatedAt: now,
        },
        { merge: true },
      );
    }
  });
}

export async function deleteEventPageServer(
  organizerId: string,
  eventId: string,
  pageId: string,
): Promise<void> {
  await assertOrganizerOwnsEventServer(organizerId, eventId);

  await getEventPageDocRef(organizerId, eventId, pageId).delete();
}
