import { User } from '@workspace/models/db/user';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError } from '@workspace/utils/src/errors/database';
import {
    firestoreTimestampsToIsoStrings,
    isoStringsToFirestoreTimestamps,
} from '../timestamps';

const COLLECTION_NAME = 'users';
const usersCollection = collection(db, COLLECTION_NAME);

export async function createUser(user: User): Promise<User> {
    try {
        const userRef = doc(usersCollection, user.id);
        const persistedUser = isoStringsToFirestoreTimestamps<User, Timestamp>(
            user,
            Timestamp.fromDate
        );
        await setDoc(userRef, persistedUser);
        return firestoreTimestampsToIsoStrings(persistedUser);
    } catch (error) {
        if (error instanceof Error) {
            throw DatabaseError.fromFirebaseError(error as any);
        }
        throw error;
    }
}
