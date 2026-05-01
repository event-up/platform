import { db } from "@workspace/firebase";
import { RegistrationForm } from "@workspace/models/db/registration-form";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { firestorePaths } from "../paths";

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
    ...firestorePaths.registrationFormDoc(organizerId, eventId, formId)
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
