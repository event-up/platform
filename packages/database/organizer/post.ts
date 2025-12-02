import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Organizer } from "@workspace/models/db/organizer";
import { ORGANIZER_COLLECTION } from "@workspace/const/database";
import { serverTimestamp } from "firebase/firestore";
/**
 * Creates a new organizer document in the Firestore "Organizers" collection
 * @param organizer - The organizer data to save
 * @returns Promise<void>
 */
export async function createOrganizer(
  organizer: Organizer
): Promise<Organizer> {
  try {
    const organizersCollection = collection(db, ORGANIZER_COLLECTION);
    const organizerDoc = doc(organizersCollection, organizer.userId);
    debugger;
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
      `Failed to create organizer: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
