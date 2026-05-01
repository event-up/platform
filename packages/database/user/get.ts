import { User, UserRole } from '@workspace/models/db/user';
import { collection, doc, getDoc, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { db } from '@workspace/firebase';
import { DatabaseError, NotFoundError } from '@workspace/utils/src/errors/database';
import { firestoreTimestampsToIsoStrings } from '../timestamps';

const COLLECTION_NAME = 'users';
const usersCollection = collection(db, COLLECTION_NAME);

export async function getUser(userId: string): Promise<User> {
    try {
        const userRef = doc(usersCollection, userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            throw new NotFoundError('User', userId);
        }

        return firestoreTimestampsToIsoStrings(userDoc.data() as User<Timestamp>);
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

        return querySnapshot.docs.map(doc =>
            firestoreTimestampsToIsoStrings(doc.data() as User<Timestamp>)
        );
    } catch (error) {
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw DatabaseError.fromFirebaseError(error as any);
    }
}
