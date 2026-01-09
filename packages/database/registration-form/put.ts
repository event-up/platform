import {
  ORGANIZER_COLLECTION,
  EVENT_COLLECTION,
  REGISTRATION_FORM_COLLECTION,
} from "@workspace/const/database";
import { db } from "@workspace/firebase";
import { RegistrationForm } from "@workspace/models/db/registration-form";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export async function updateRegistrationForm({
  eventId,
  organizerId,
  formId,
  formData,
}: {
  organizerId: string;
  eventId: string;
  formId: string;
  formData: Partial<Omit<RegistrationForm, "createdAt" | "updatedAt">>;
}) {
  const registrationFormDocRef = doc(
    db,
    `${ORGANIZER_COLLECTION}/${organizerId}/${EVENT_COLLECTION}/${eventId}/${REGISTRATION_FORM_COLLECTION}/${formId}`
  );

  const updateData = {
    ...formData,
    updatedAt: serverTimestamp(),
  };

  await updateDoc(registrationFormDocRef, updateData);

  return {
    registrationFormId: formId,
    ...formData,
  };
}
