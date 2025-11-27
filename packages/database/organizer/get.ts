import { Organizer } from '@workspace/models/db/organizer';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError, NotFoundError } from '@workspace/utils/src/errors/database';

const COLLECTION_NAME = 'organizers';
const organizersCollection = collection(db, COLLECTION_NAME);

export async function getOrganizer(userId: string): Promise<Organizer> {
    try {
        const organizerRef = doc(organizersCollection, userId);
        const organizerDoc = await getDoc(organizerRef);

        if (!organizerDoc.exists()) {
            throw new NotFoundError('Organizer', userId);
        }

        return organizerDoc.data() as Organizer;
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}

export async function getOrganizerByEmail(email: string): Promise<Organizer | null> {
    try {
        const q = query(organizersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        const firstDoc = querySnapshot.docs[0];
        if (!firstDoc) {
            return null;
        }

        return firstDoc.data() as Organizer;
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}



