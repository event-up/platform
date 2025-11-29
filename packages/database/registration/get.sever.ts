"user server";
import {
  ParticipantStatus,
  Registration,
} from "@workspace/models/db/registration";
import { serverDb as db } from "@workspace/firebase/server";
import {
  ORGANIZER_COLLECTION,
  EVENT_COLLECTION,
  REGISTRATION_COLLECTION,
} from "@workspace/const/database";
import { DatabaseError } from "@workspace/utils/src/errors/database";

export async function getEventRegistrationsByStatus(
  organizerId: string,
  eventId: string,
  status: ParticipantStatus
) {
  try {
    const collectionRef = db
      .collection(ORGANIZER_COLLECTION)
      .doc(organizerId)
      .collection(EVENT_COLLECTION)
      .doc(eventId)
      .collection(REGISTRATION_COLLECTION);

    const snapshot = await collectionRef.where("status", "==", status).get();

    return snapshot.docs.map((doc) => doc.data() as Registration);
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromFirebaseError(error as any);
  }
}
