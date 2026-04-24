"use server";
import { serverDb as db } from "@workspace/firebase/server";
import { RegistrationForm } from "@workspace/models/db/registration-form";
import { Timestamp } from "firebase-admin/firestore";
import { firestorePaths } from "../paths";

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
    const res = docData as RegistrationForm;
    return {
      ...res,
      createdAt: (res.createdAt as Timestamp).toDate().toString(),
      updatedAt: (res.updatedAt as Timestamp).toDate().toString(),
    };
  }
  return null;
}
