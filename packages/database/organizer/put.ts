import { Organizer } from "@workspace/models/db/organizer";
import {
  collection,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@workspace/firebase";
import {
  DatabaseError,
  NotFoundError,
} from "@workspace/utils/src/errors/database";
import { ORGANIZER_COLLECTION } from "@workspace/const/database";
import { firestoreTimestampsToIsoStrings } from "../timestamps";

const organizersCollection = collection(db, ORGANIZER_COLLECTION);

export async function updateOrganizer(
  userId: string,
  updates: Partial<Organizer>
): Promise<Partial<Organizer>> {
  try {
    const organizerRef = doc(organizersCollection, userId);
    const organizerDoc = await getDoc(organizerRef);

    if (!organizerDoc.exists()) {
      throw new NotFoundError("Organizer", userId);
    }
    const updated: Partial<Organizer<Timestamp | string>> = {
      ...updates,
      updatedAt: Timestamp.fromDate(new Date()),
    };
    await updateDoc(organizerRef, updated);

    return firestoreTimestampsToIsoStrings(updated);
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromFirebaseError(error as any);
  }
}
