import { User, UserRole } from '@workspace/models/db/user';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError, NotFoundError } from '@workspace/utils/src/errors/database';

const COLLECTION_NAME = 'users';
const usersCollection = collection(db, COLLECTION_NAME);

export async function getUser(userId: string): Promise<User> {
    try {
        const userRef = doc(usersCollection, userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            throw new NotFoundError('User', userId);
        }

        return userDoc.data() as User;
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}

export async function getUsersByRole(role: UserRole): Promise<User[]> {
    try {
        const q = query(usersCollection, where('role', '==', role));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => doc.data() as User);
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}