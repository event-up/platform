import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@workspace/firebase";
import { Organizer } from "@workspace/models/db/organizer";
import { firestorePaths } from "../paths";
import { firestoreTimestampsToIsoStrings } from "../timestamps";
/**
 * Creates a new organizer document in the Firestore "Organizers" collection
 * @param organizer - The organizer data to save
 * @returns Promise<void>
 */
export async function createOrganizer(
  organizer: Organizer,
): Promise<Organizer> {
  try {
    const organizersCollection = collection(db, ...firestorePaths.organizersCollection());
    const organizerDoc = doc(organizersCollection, organizer.userId);
    const now = Timestamp.fromDate(new Date());
    const organizerData: Organizer<Timestamp> = {
      userId: organizer.userId,
      email: organizer.email,
      role: organizer.role,
      profileImgUrl: organizer.profileImgUrl,
      createdAt: now,
      updatedAt: now,
    };
    await setDoc(organizerDoc, organizerData);

    return firestoreTimestampsToIsoStrings(organizerData);
  } catch (error) {
    console.error("Error creating organizer:", error);
    throw new Error(
      `Failed to create organizer: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
