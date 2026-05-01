import { InvitationJob } from "@workspace/models/db/invitations";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@workspace/firebase";
import { DatabaseError } from "@workspace/utils/src/errors/database";
import { firestorePaths } from "../paths";
import {
  firestoreTimestampsToIsoStrings,
  isoStringsToFirestoreTimestamps,
} from "../timestamps";

export async function createInvitationJob(
  organizerId: string,
  job: Omit<InvitationJob, "jobId" | "createdAt" | "updatedAt">
): Promise<
  InvitationJob & { jobId: string; createdAt: string; updatedAt: string }
> {
  try {
    // organizer > event > invitationJob
    const invitationJobsCollection = collection(
      db,
      ...firestorePaths.invitationJobsCollection(organizerId, job.eventId)
    );
    const invitationJobRef = doc(invitationJobsCollection);

    const now = Timestamp.fromDate(new Date());
    const newInvitationJob: InvitationJob<Timestamp | string> = isoStringsToFirestoreTimestamps<InvitationJob<Timestamp | string>, Timestamp>({
      ...job,
      jobId: invitationJobRef.id,
      createdAt: now,
      updatedAt: now,
    }, Timestamp.fromDate);

    await setDoc(invitationJobRef, newInvitationJob);
    return firestoreTimestampsToIsoStrings(newInvitationJob);
  } catch (error) {
    if (error instanceof Error) {
      throw DatabaseError.fromFirebaseError(error as any);
    }
    throw error;
  }
}
