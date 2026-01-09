import {
  ORGANIZER_COLLECTION,
  EVENT_COLLECTION,
  REGISTRATION_FORM_COLLECTION,
} from "@workspace/const/database";
import { db } from "@workspace/firebase";
import { RegistrationForm } from "@workspace/models/db/registration-form";
import { collection, query, limit, getDocs } from "firebase/firestore";

export async function getRegistrationForm(
  organizerId: string,
  eventId: string
): Promise<RegistrationForm | null> {
  const registrationFormCol = collection(
    db,
    `${ORGANIZER_COLLECTION}/${organizerId}/${EVENT_COLLECTION}/${eventId}/${REGISTRATION_FORM_COLLECTION}`
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
