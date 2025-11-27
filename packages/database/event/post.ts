import { Event } from '@workspace/models/db/event';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError } from '@workspace/utils/src/errors/database';
import { EVENT_COLLECTION, ORGANIZER_COLLECTION } from '@workspace/const/database';


export async function createEvent(event: Omit<Event, 'eventId'>): Promise<Event> {
    try {
        const organizerEventsCollection = collection(db, ORGANIZER_COLLECTION, event.organizerId, EVENT_COLLECTION);
        const newEventRef = doc(organizerEventsCollection);
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
