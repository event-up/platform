import { db } from "@workspace/firebase";
import { RegistrationForm } from "@workspace/models/db/registration-form";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { firestorePaths } from "../paths";

export async function getRegistrationForm(
  organizerId: string,
  eventId: string
): Promise<RegistrationForm | null> {
  const registrationFormCol = collection(
    db,
    ...firestorePaths.registrationFormsCollection(organizerId, eventId)
  );

  const queryRef = query(registrationFormCol, limit(1));
  const snapshot = await getDocs(queryRef);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  const docData = doc?.data();

  if (docData) {
    const res = docData as RegistrationForm;
    return res;
  }
  return null;
}
