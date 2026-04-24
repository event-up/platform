import { db } from "@workspace/firebase";
import { InvitationJob } from "@workspace/models/db/invitations";
import { DatabaseError } from "@workspace/utils/src/errors/database";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firestorePaths } from "../paths";

export async function getInvitationJobsByEvent(
  organizerId: string,
  eventId: string
): Promise<InvitationJob[]> {
  try {
    const jobCollectionRef = collection(
      db,
      ...firestorePaths.invitationJobsCollection(organizerId, eventId)
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
      ...firestorePaths.invitationJobDoc(organizerId, eventId, jobId)
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
