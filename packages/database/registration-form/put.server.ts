"use server";

import { serverDb as db } from "@workspace/firebase/server";
import { RegistrationForm } from "@workspace/models/db/registration-form";
import { firestore } from "firebase-admin";
import { firestorePaths } from "../paths";

export async function updateRegistrationFormServer(
  organizerId: string,
  eventId: string,
  registrationFormId: string,
  formData: Partial<Omit<RegistrationForm, "createdAt" | "updatedAt">>
): Promise<Partial<RegistrationForm>> {
  const registrationFormDocRef = db.doc(
    firestorePaths
      .registrationFormDoc(organizerId, eventId, registrationFormId)
      .join("/")
  );

  const updateData = {
    ...formData,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  };

  await registrationFormDocRef.update(updateData);

  return {
    registrationFormId,
    ...formData,
  };
}

