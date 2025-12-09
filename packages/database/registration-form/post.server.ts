"use server";
import {
  ORGANIZER_COLLECTION,
  EVENT_COLLECTION,
  REGISTRATION_FORM_COLLECTION,
} from "@workspace/const/database";
import { serverDb as db } from "@workspace/firebase/server";
import { RegistrationForm } from "@workspace/models/db/registration-form";
import {
  DatabaseError,
  DatabaseErrorCode,
} from "@workspace/utils/src/errors/database";
import { firestore } from "firebase-admin";

export async function createRegistrationFormServer(
  formData: Omit<
    RegistrationForm,
    "createdAt" | "updatedAt" | "registrationFormId"
  >
) {
  const registrationFormCol = db.collection(
    `${ORGANIZER_COLLECTION}/${formData.organizerId}/${EVENT_COLLECTION}/${formData.eventId}/${REGISTRATION_FORM_COLLECTION}`
  );

  const existingForms = await registrationFormCol.limit(1).get();

  if (!existingForms.empty) {
    throw new DatabaseError(
      DatabaseErrorCode.DUPLICATE_ENTRY,
      "Registration form already exists for this event. Only one registration form is allowed per event."
    );
  }

  const registrationFormDocRef = registrationFormCol.doc();

  const registrationForm: RegistrationForm = {
    ...formData,
    registrationFormId: registrationFormDocRef.id,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  };

  await registrationFormDocRef.set(registrationForm);
}
