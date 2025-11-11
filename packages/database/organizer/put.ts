import { Organizer } from '@workspace/models/db/organizer';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError, NotFoundError } from '@workspace/utils/src/errors/database';

const COLLECTION_NAME = 'organizers';
const organizersCollection = collection(db, COLLECTION_NAME);

export async function updateOrganizer(userId: string, updates: Partial<Organizer>): Promise<Organizer> {
    try {
        const organizerRef = doc(organizersCollection, userId);
        const organizerDoc = await getDoc(organizerRef);

        if (!organizerDoc.exists()) {
            throw new NotFoundError('Organizer', userId);
        }

        await updateDoc(organizerRef, updates);

        const updatedDoc = await getDoc(organizerRef);
        return updatedDoc.data() as Organizer;
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}