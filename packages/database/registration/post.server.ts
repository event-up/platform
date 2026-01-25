import { Registration } from "@workspace/models/db/registration";
import { DatabaseError } from "@workspace/utils/src/errors/database";
import { serverDb } from "@workspace/firebase/server";
import {
  EVENT_COLLECTION,
  ORGANIZER_COLLECTION,
  REGISTRATION_COLLECTION,
} from "@workspace/const/database";
import { firestore } from "firebase-admin";

export async function createRegistrationServer(
  registration: Omit<
    Registration,
    "registrationId" | "createdAt" | "updatedAt" | "token"
  >,
): Promise<Registration> {
  try {
    const registrationsCollection = serverDb
      .collection(ORGANIZER_COLLECTION)
      .doc(registration.organizerId)
      .collection(EVENT_COLLECTION)
      .doc(registration.eventId)
      .collection(REGISTRATION_COLLECTION);

    const registrationRef = registrationsCollection.doc();

    const tokenObject = {
      o: registration.organizerId,
      e: registration.eventId,
      r: registrationRef.id,
    };

    const newRegistration: Registration = {
      ...registration,
      registrationId: registrationRef.id,
      token: {
        verifyToken: JSON.stringify(tokenObject),
        type: "QR",
      },
      createdAt: firestore.FieldValue.serverTimestamp() as any,
      updatedAt: firestore.FieldValue.serverTimestamp() as any,
    };

    await registrationRef.set(newRegistration);

    // Return the registration with ISO string timestamps for consistency
    return {
      ...newRegistration,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw DatabaseError.fromFirebaseError(error as any);
    }
    throw error;
  }
}
