import {
  ParticipantStatus,
  Registration,
} from "@workspace/models/db/registration";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@workspace/firebase";
import {
  DatabaseError,
  NotFoundError,
} from "@workspace/utils/src/errors/database";
import {
  EVENT_COLLECTION,
  ORGANIZER_COLLECTION,
  REGISTRATION_COLLECTION,
  REGISTRATION_FORM_COLLECTION,
} from "@workspace/const/database";

export async function getRegistration(
  orgnizerId: string,
  eventId: string,
  registrationId: string
): Promise<Registration> {
  try {
    const registrationCollection = collection(
      db,
      ORGANIZER_COLLECTION,
      orgnizerId,
      EVENT_COLLECTION,
      eventId,
      REGISTRATION_FORM_COLLECTION
    );
    const registrationRef = doc(registrationCollection, registrationId);
    const registrationDoc = await getDoc(registrationRef);

    if (!registrationDoc.exists()) {
      throw new NotFoundError("Registration", registrationId);
    }

    return registrationDoc.data() as Registration;
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromFirebaseError(error as any);
  }
}

export interface PaginationOptions {
  pageSize?: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

export async function getEventRegistrations(
  organizerId: string,
  eventId: string,
  options?: PaginationOptions
): Promise<PaginatedResponse<Registration>> {
  try {
    debugger;
    console.log({
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      REGISTRATION_COLLECTION,
    });

    const pageSize = options?.pageSize || 20;
    const registrationCollection = collection(
      db,
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      REGISTRATION_COLLECTION
    );

    let registrationsQuery = query(
      registrationCollection,
      orderBy("createdAt", "desc"),
      limit(pageSize + 1) // Fetch one extra to determine if there are more
    );

    if (options?.lastDoc) {
      registrationsQuery = query(
        registrationCollection,
        orderBy("createdAt", "desc"),
        startAfter(options.lastDoc),
        limit(pageSize + 1)
      );
    }

    const querySnapshot = await getDocs(registrationsQuery);
    const docs = querySnapshot.docs;
    const hasMore = docs.length > pageSize;

    const data = docs
      .slice(0, pageSize)
      .map((doc) => doc.data() as Registration);

    const lastDoc = hasMore && docs[pageSize - 1] ? docs[pageSize - 1] : null;

    return {
      data,
      lastDoc: lastDoc ?? null,
      hasMore,
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromFirebaseError(error as any);
  }
}

export async function getEventRegistrationsByStatus(
  organizerId: string,
  eventId: string,
  status: ParticipantStatus
) {
  try {
    const collectionRef = collection(
      db,
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      REGISTRATION_COLLECTION
    );
    const docRef = await getDocs(
      query(collectionRef, where("status", "==", status))
    );

    return docRef.docs.map((doc) => doc.data() as Registration);
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromFirebaseError(error as any);
  }
}
