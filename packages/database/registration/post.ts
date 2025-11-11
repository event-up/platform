import { Registration } from '@workspace/models/db/registration';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError } from '@workspace/utils/src/errors/database';

const COLLECTION_NAME = 'registrations';
const registrationsCollection = collection(db, COLLECTION_NAME);

export async function createRegistration(registration: Omit<Registration, 'id'>): Promise<Registration> {
    try {
        const registrationRef = doc(registrationsCollection);
        const newRegistration: Registration = {
            ...registration,
            id: registrationRef.id,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await setDoc(registrationRef, newRegistration);
        return newRegistration;
    } catch (error) {
        if (error instanceof Error) {
            throw DatabaseError.fromFirebaseError(error as any);
        }
        throw error;
    }
}