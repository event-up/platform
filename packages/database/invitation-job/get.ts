import {
  EVENT_COLLECTION,
  INVITATION_JOB_COLLECTION,
  ORGANIZER_COLLECTION,
} from "@workspace/const/database";
import { db } from "@workspace/firebase";
import { InvitationJob } from "@workspace/models/db/invitations";
import { DatabaseError } from "@workspace/utils/src/errors/database";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export async function getInvitationJobsByEvent(
  organizerId: string,
  eventId: string
): Promise<InvitationJob[]> {
  try {
    const jobCollectionRef = collection(
      db,
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      INVITATION_JOB_COLLECTION
    );

    const snapshot = await getDocs(jobCollectionRef);

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map(
      (doc) => doc.data() as InvitationJob
    ) as InvitationJob[];
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromFirebaseError(error as any);
  }
}

export async function getInvitationJobById(
  organizerId: string,
  eventId: string,
  jobId: string
): Promise<InvitationJob | null> {
  try {
    const jobDocRef = doc(
      db,
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      INVITATION_JOB_COLLECTION,
      jobId
    );

    const jobSnapshot = await getDoc(jobDocRef);

    if (!jobSnapshot.exists()) {
      return null;
    }

    return jobSnapshot.data() as InvitationJob;
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromFirebaseError(error as any);
  }
}
