import { Organizer } from '@workspace/models/db/organizer';
import { collection, doc, getDoc, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError, NotFoundError } from '@workspace/utils/src/errors/database';
import { ORGANIZER_COLLECTION } from "@workspace/const/database";
import { firestoreTimestampsToIsoStrings } from '../timestamps';

const organizersCollection = collection(db, ORGANIZER_COLLECTION);

export async function getOrganizer(userId: string): Promise<Organizer> {
    try {
        const organizerRef = doc(organizersCollection, userId);
        const organizerDoc = await getDoc(organizerRef);

        if (!organizerDoc.exists()) {
            throw new NotFoundError('Organizer', userId);
        }

        return firestoreTimestampsToIsoStrings(
            organizerDoc.data() as Organizer<Timestamp>
        );
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

        return firestoreTimestampsToIsoStrings(
            firstDoc.data() as Organizer<Timestamp>
        );
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}

