import type { Event } from '@workspace/models/db/event';
import { collection, doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError, NotFoundError } from '@workspace/utils/src/errors/database';
import { firestorePaths } from "../paths";
import {
    firestoreTimestampsToIsoStrings,
    isoStringsToFirestoreTimestamps,
} from "../timestamps";

export async function updateEvent(
    organizerId: string,
    eventId: string,
    updates: Partial<Event>
): Promise<Event> {
    try {
        const eventsCollection = collection(db, ...firestorePaths.eventsCollection(organizerId));
        const eventRef = doc(eventsCollection, eventId);
        const eventDoc = await getDoc(eventRef);

        if (!eventDoc.exists()) {
            throw new NotFoundError('Event', eventId);
        }

        await updateDoc(
            eventRef,
            isoStringsToFirestoreTimestamps(updates, Timestamp.fromDate)
        );

        const updatedDoc = await getDoc(eventRef);
        return firestoreTimestampsToIsoStrings(updatedDoc.data() as Event<Timestamp>);
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}
