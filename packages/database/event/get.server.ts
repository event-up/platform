"use server";
import { serverDb } from "@workspace/firebase/server";
import { EVENT_COLLECTION } from "@workspace/const/database";
import type { Event } from "@workspace/models/db/event";
import { firestorePaths } from "../paths";
import type { Timestamp } from "firebase-admin/firestore";
import { firestoreTimestampsToIsoStrings } from "../timestamps";

/**
 * Get an event by its domain name
 * @param domainName - The domain name to search for
 * @returns The event document or null if not found
 */
export const getEventByDomainNameServer = async (
  domainName: string,
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

  return firestoreTimestampsToIsoStrings(doc.data() as Event<Timestamp>);
};

export const getEventByIdServer = async (
  organizerId: string,
  eventId: string,
): Promise<Event | null> => {
  const snapshot = await serverDb
    .doc(firestorePaths.eventDoc(organizerId, eventId).join("/"))
    .get();

  if (!snapshot.exists) {
    return null;
  }
  return firestoreTimestampsToIsoStrings(snapshot.data() as Event<Timestamp>);
};
