import { Organizer } from "@workspace/models/db/organizer";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@workspace/firebase";
import {
  DatabaseError,
  NotFoundError,
} from "@workspace/utils/src/errors/database";

const COLLECTION_NAME = "organizers";
const organizersCollection = collection(db, COLLECTION_NAME);

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
    const updated: Partial<Organizer> = {
      ...updates,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(organizerRef, updated);

    return updated;
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromFirebaseError(error as any);
  }
}
