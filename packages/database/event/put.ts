import { Event } from '@workspace/models/db/event';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError, NotFoundError } from '@workspace/utils/src/errors/database';

const COLLECTION_NAME = 'events';
const eventsCollection = collection(db, COLLECTION_NAME);

export async function updateEvent(eventId: string, updates: Partial<Event>): Promise<Event> {
    try {
        const eventRef = doc(eventsCollection, eventId);
        const eventDoc = await getDoc(eventRef);

        if (!eventDoc.exists()) {
            throw new NotFoundError('Event', eventId);
        }

        await updateDoc(eventRef, updates);

        const updatedDoc = await getDoc(eventRef);
        return updatedDoc.data() as Event;
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}