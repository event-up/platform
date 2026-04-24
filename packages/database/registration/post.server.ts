'use server';
import { Registration } from "@workspace/models/db/registration";
import { DatabaseError } from "@workspace/utils/src/errors/database";
import { serverDb } from "@workspace/firebase/server";
import { firestore } from "firebase-admin";
import { generateRegistrationToken } from "@workspace/check-token/lib/tokenize"
import { firestorePaths } from "../paths";

export async function createRegistrationServer(
  registration: Omit<
    Registration,
    "registrationId" | "createdAt" | "updatedAt" | "token"
  >,
): Promise<Registration> {
  try {
    const registrationsCollection = serverDb
      .collection(
        firestorePaths
          .registrationsCollection(registration.organizerId, registration.eventId)
          .join("/")
      );

    const registrationRef = registrationsCollection.doc();

    const newRegistration: Registration = {
      ...registration,
      registrationId: registrationRef.id,
      token: generateRegistrationToken(registrationRef.id, registration.eventId, registration.organizerId),
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
