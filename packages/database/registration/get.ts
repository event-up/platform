import { Registration } from '@workspace/models/db/registration';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError, NotFoundError } from '@workspace/utils/src/errors/database';

const COLLECTION_NAME = 'registrations';
const registrationsCollection = collection(db, COLLECTION_NAME);

export async function getRegistration(registrationId: string): Promise<Registration> {
    try {
        const registrationRef = doc(registrationsCollection, registrationId);
        const registrationDoc = await getDoc(registrationRef);

        if (!registrationDoc.exists()) {
            throw new NotFoundError('Registration', registrationId);
        }

        return registrationDoc.data() as Registration;
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}

export async function getRegistrationsByEvent(eventId: string): Promise<Registration[]> {
    try {
        const q = query(registrationsCollection, where('eventId', '==', eventId));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => doc.data() as Registration);
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}

export async function getRegistrationsByUser(userId: string): Promise<Registration[]> {
    try {
        const q = query(registrationsCollection, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => doc.data() as Registration);
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}