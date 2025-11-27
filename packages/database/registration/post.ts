"use client";
import { Registration } from "@workspace/models/db/registration";
import { collection, doc, setDoc } from "firebase/firestore";

import { db } from "@workspace/firebase";
import { DatabaseError } from "@workspace/utils/src/errors/database";
import {
  EVENT_COLLECTION,
  ORGANIZER_COLLECTION,
  REGISTRATION_COLLECTION,
} from "@workspace/const/database";

export async function createRegistration(
  registration: Omit<
    Registration,
    "registrationId" | "createdAt" | "updatedAt" | "token"
  >
): Promise<Registration> {
  try {
    const registrationsCollection = collection(
      db,
      ORGANIZER_COLLECTION,
      registration.organizerId,
      EVENT_COLLECTION,
      registration.eventId,
      REGISTRATION_COLLECTION
    );
    const registrationRef = doc(registrationsCollection);

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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(registrationRef, newRegistration);
    return newRegistration;
  } catch (error) {
    if (error instanceof Error) {
      throw DatabaseError.fromFirebaseError(error as any);
    }
    throw error;
  }
}
