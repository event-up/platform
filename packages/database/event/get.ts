import { Event } from "@workspace/models/db/event";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@workspace/firebase";
import {
  DatabaseError,
  NotFoundError,
} from "@workspace/utils/src/errors/database";
import { firestorePaths } from "../paths";

export async function getEvent(
  eventId: string,
  organizerId: string
): Promise<Event> {
  try {
    const eventsCollection = collection(
      db,
      ...firestorePaths.eventsCollection(organizerId)
    ); // Placeholder for organizer ID
    const eventDocRef = doc(eventsCollection, eventId);
    const eventDoc = await getDoc(eventDocRef);

    if (!eventDoc.exists()) {
      throw new NotFoundError("Event", eventId);
    }

    return eventDoc.data() as Event;
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromFirebaseError(error as any);
  }
}

export async function getOrganizerEvents(
  organizerId: string
): Promise<Event[]> {
  try {
    const query = collection(
      db,
      ...firestorePaths.eventsCollection(organizerId)
    );
    const querySnapshot = await getDocs(query);

    return querySnapshot.docs.map((doc) => doc.data() as Event);
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromFirebaseError(error as any);
  }
}
