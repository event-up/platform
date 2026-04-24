import { Registration } from "@workspace/models/db/registration";
import {
  DatabaseError,
  NotFoundError,
} from "@workspace/utils/src/errors/database";
import { serverDb } from "@workspace/firebase/server";
import { firestore } from "firebase-admin";
import { firestorePaths } from "../paths";

export async function updateRegistrationServer(
  organizerId: string,
  eventId: string,
  registrationId: string,
  updates: Partial<Registration>
) {
  try {
    const regRef = serverDb
      .doc(firestorePaths.registrationDoc(organizerId, eventId, registrationId).join("/"));
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
