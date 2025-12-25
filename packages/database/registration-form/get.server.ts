"use server";
import {
  ORGANIZER_COLLECTION,
  EVENT_COLLECTION,
  REGISTRATION_FORM_COLLECTION,
} from "@workspace/const/database";
import { serverDb as db } from "@workspace/firebase/server";
import { RegistrationForm } from "@workspace/models/db/registration-form";
import { firestore } from "firebase-admin";

export async function getRegistrationFormServer(
  organizerId: string,
  eventId: string
): Promise<RegistrationForm | null> {
  const registrationFormCol = db.collection(
    `${ORGANIZER_COLLECTION}/${organizerId}/${EVENT_COLLECTION}/${eventId}/${REGISTRATION_FORM_COLLECTION}`
  );

  const snapshot = await registrationFormCol.limit(1).get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  const docData = doc?.data();
  return docData;
}
