"use server";
import { serverDb as db } from "@workspace/firebase/server";
import { RegistrationForm } from "@workspace/models/db/registration-form";
import type { Timestamp } from "firebase-admin/firestore";
import { firestorePaths } from "../paths";
import { firestoreTimestampsToIsoStrings } from "../timestamps";

export async function getRegistrationFormServer(
  organizerId: string,
  eventId: string
): Promise<RegistrationForm | null> {
  const registrationFormCol = db.collection(
    firestorePaths.registrationFormsCollection(organizerId, eventId).join("/")
  );

  const snapshot = await registrationFormCol.limit(1).get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  const docData = doc?.data();

  if (docData) {
    return firestoreTimestampsToIsoStrings(docData as RegistrationForm<Timestamp>);
  }
  return null;
}
