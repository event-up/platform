import { serverDb } from "@workspace/firebase/server";
import { EVENT_COLLECTION } from "@workspace/const/database";
import type { Event } from "@workspace/models/db/Event";

/**
 * Get an event by its domain name
 * @param domainName - The domain name to search for
 * @returns The event document or null if not found
 */
export const getEventByDomainNameServer = async (
  domainName: string
): Promise<Event | null> => {
  const snapshot = await serverDb
    .collectionGroup(EVENT_COLLECTION)
    .where("domainName", "==", domainName)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  if (!doc) {
    return null;
  }

  return { ...doc.data(), eventId: doc.id } as Event;
};
