import { Event } from '@workspace/models/db/event';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError } from '@workspace/utils/src/errors/database';

const COLLECTION_NAME = 'events';
const eventsCollection = collection(db, COLLECTION_NAME);

export async function createEvent(event: Omit<Event, 'eventId'>): Promise<Event> {
    try {
        const newEventRef = doc(eventsCollection);
        const newEvent: Event = {
            ...event,
            eventId: newEventRef.id,
        };

        await setDoc(newEventRef, newEvent);
        return newEvent;
    } catch (error) {
        if (error instanceof Error) {
            throw DatabaseError.fromFirebaseError(error as any);
        }
        throw error;
    }
}
