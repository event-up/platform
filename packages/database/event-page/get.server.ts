import { serverDb as db } from "@workspace/firebase/server";
import type { EventPage } from "@workspace/models/db/event-page";
import type { Timestamp } from "firebase-admin/firestore";
import { firestorePaths } from "../paths";
import { firestoreTimestampsToIsoStrings } from "../timestamps";
import { assertOrganizerOwnsEventServer } from "../event/assert-ownership.server";

export async function getEventPageServer(
  organizerId: string,
  eventId: string,
  pageId: string,
): Promise<EventPage | null> {
  await assertOrganizerOwnsEventServer(organizerId, eventId);

  const eventPageDoc = await db
    .doc(firestorePaths.eventPageDoc(organizerId, eventId, pageId).join("/"))
    .get();

  if (!eventPageDoc.exists) {
    return null;
  }

  return firestoreTimestampsToIsoStrings(
    eventPageDoc.data() as EventPage<Timestamp>
  );
}

export async function getPublishedEventPageServer(
  organizerId: string,
  eventId: string,
  pageId: string,
): Promise<EventPage["published"] | null> {
  const eventPage = await getEventPageServer(organizerId, eventId, pageId);

  return eventPage?.published ?? null;
}

export async function listEventPagesServer(
  organizerId: string,
  eventId: string,
): Promise<EventPage[]> {
  await assertOrganizerOwnsEventServer(organizerId, eventId);

  const snapshot = await db
    .collection(firestorePaths.eventPagesCollection(organizerId, eventId).join("/"))
    .get();

  return snapshot.docs.map((doc) =>
    firestoreTimestampsToIsoStrings(doc.data() as EventPage<Timestamp>)
  );
}

export async function getPublishedEventPageBySlugServer(
  organizerId: string,
  eventId: string,
  slug: string,
): Promise<EventPage | null> {
  const snapshot = await db
    .collection(firestorePaths.eventPagesCollection(organizerId, eventId).join("/"))
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  const eventPage = doc?.data()
    ? firestoreTimestampsToIsoStrings(doc.data() as EventPage<Timestamp>)
    : undefined;

  if (!eventPage?.published) {
    return null;
  }

  return eventPage;
}
