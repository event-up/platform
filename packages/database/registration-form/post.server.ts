"use server";
import { serverDb as db } from "@workspace/firebase/server";
import { RegistrationForm } from "@workspace/models/db/registration-form";
import {
  DatabaseError,
  DatabaseErrorCode,
} from "@workspace/utils/src/errors/database";
import { firestore } from "firebase-admin";
import { firestorePaths } from "../paths";

export async function createRegistrationFormServer(
  formData: Omit<
    RegistrationForm,
    "createdAt" | "updatedAt" | "registrationFormId"
  >
) {
  const registrationFormCol = db.collection(
    firestorePaths
      .registrationFormsCollection(formData.organizerId, formData.eventId)
      .join("/")
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
