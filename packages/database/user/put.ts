import { User } from '@workspace/models/db/user';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError, NotFoundError } from '@workspace/utils/src/errors/database';

const COLLECTION_NAME = 'users';
const usersCollection = collection(db, COLLECTION_NAME);

export async function updateUser(userId: string, updates: Partial<User>): Promise<User> {
    try {
        const userRef = doc(usersCollection, userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            throw new NotFoundError('User', userId);
        }

        await updateDoc(userRef, updates);

        const updatedDoc = await getDoc(userRef);
        return updatedDoc.data() as User;
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}