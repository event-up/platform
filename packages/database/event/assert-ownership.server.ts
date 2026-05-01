import { serverDb as db } from "@workspace/firebase/server";
import type { Event } from "@workspace/models/db/event";
import { firestorePaths } from "../paths";

const EVENT_ACCESS_DENIED_MESSAGE = "Event not found or access denied.";

type TransactionReader = Pick<FirebaseFirestore.Transaction, "get">;

export async function assertOrganizerOwnsEventServer(
  organizerId: string,
  eventId: string,
  transaction?: TransactionReader,
): Promise<void> {
  const eventRef = db.doc(
    firestorePaths.eventDoc(organizerId, eventId).join("/"),
  );
  const eventSnapshot = transaction
    ? await transaction.get(eventRef)
    : await eventRef.get();

  if (!eventSnapshot.exists) {
    throw new Error(EVENT_ACCESS_DENIED_MESSAGE);
  }

  const event = eventSnapshot.data() as Partial<Event> | undefined;

  if (event?.organizerId !== organizerId) {
    throw new Error(EVENT_ACCESS_DENIED_MESSAGE);
  }
}
