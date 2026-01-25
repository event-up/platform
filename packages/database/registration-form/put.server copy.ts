"user server";
import {
  ORGANIZER_COLLECTION,
  EVENT_COLLECTION,
  REGISTRATION_FORM_COLLECTION,
} from "@workspace/const/database";
import { serverDb as db } from "@workspace/firebase/server";
import { RegistrationForm } from "@workspace/models/db/registration-form";
import { firestore } from "firebase-admin";

export async function updateRegistrationFormServer(
  organizerId: string,
  eventId: string,
  registrationFormId: string,
  formData: Partial<Omit<RegistrationForm, "createdAt" | "updatedAt">>
): Promise<Partial<RegistrationForm>> {
  const registrationFormDocRef = db.doc(
    `${ORGANIZER_COLLECTION}/${organizerId}/${EVENT_COLLECTION}/${eventId}/${REGISTRATION_FORM_COLLECTION}/${registrationFormId}`
  );

  const updateData = {
    ...formData,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  };

  await registrationFormDocRef.update(updateData);

  return {
    registrationFormId: registrationFormId,
    ...formData,
  };
}
