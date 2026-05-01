import { Registration } from '@workspace/models/db/registration';
import { collection, doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError, NotFoundError } from '@workspace/utils/src/errors/database';
import { firestorePaths } from "../paths";
import {
    firestoreTimestampsToIsoStrings,
    isoStringsToFirestoreTimestamps,
} from "../timestamps";

export async function updateRegistration(
    organizerId: string,
    eventId: string,
    registrationId: string,
    updates: Partial<Omit<Registration, 'id' | 'createdAt'>>
): Promise<Registration> {
    try {
        const registrationsCollection = collection(
          db,
          ...firestorePaths.registrationsCollection(organizerId, eventId)
        );
        const registrationRef = doc(registrationsCollection, registrationId);
        const registrationDoc = await getDoc(registrationRef);

        if (!registrationDoc.exists()) {
            throw new NotFoundError('Registration', registrationId);
        }

        const updateData = {
            ...isoStringsToFirestoreTimestamps(updates, Timestamp.fromDate),
            updatedAt: Timestamp.fromDate(new Date())
        };

        await updateDoc(registrationRef, updateData);

        const updatedDoc = await getDoc(registrationRef);
        return firestoreTimestampsToIsoStrings(
            updatedDoc.data() as Registration<Timestamp>
        );
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}
