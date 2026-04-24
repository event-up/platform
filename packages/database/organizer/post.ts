import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@workspace/firebase";
import { Organizer } from "@workspace/models/db/organizer";
import { serverTimestamp } from "firebase/firestore";
import { firestorePaths } from "../paths";
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
    const organizerData: Organizer = {
      userId: organizer.userId,
      email: organizer.email,
      role: organizer.role,
      profileImgUrl: organizer.profileImgUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(organizerDoc, organizerData);

    return organizerData;
  } catch (error) {
    console.error("Error creating organizer:", error);
    throw new Error(
      `Failed to create organizer: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
