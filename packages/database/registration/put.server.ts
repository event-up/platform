import { Registration } from "@workspace/models/db/registration";
import {
  DatabaseError,
  NotFoundError,
} from "@workspace/utils/src/errors/database";
import { serverDb } from "@workspace/firebase/server";
import {
  EVENT_COLLECTION,
  ORGANIZER_COLLECTION,
  REGISTRATION_COLLECTION,
} from "@workspace/const/database";
import { firestore } from "firebase-admin";

export async function updateRegistrationServer(
  organizerId: string,
  eventId: string,
  registrationId: string,
  updates: Partial<Registration>
) {
  try {
    const regRef = serverDb
      .collection(ORGANIZER_COLLECTION)
      .doc(organizerId)
      .collection(EVENT_COLLECTION)
      .doc(eventId)
      .collection(REGISTRATION_COLLECTION)
      .doc(registrationId);
    const regSnap = await regRef.get();
    if (!regSnap.exists) {
      throw new NotFoundError("Registration", registrationId);
    }

    const updateData = {
      ...updates,
      updatedAt: firestore.FieldValue
        ? firestore.FieldValue.serverTimestamp()
        : null,
    };

    const result = await regRef.update(updateData);

    return result;
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromFirebaseError(error as any);
  }
}
