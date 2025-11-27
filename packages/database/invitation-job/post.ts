import { InvitationJob } from "@workspace/models/db/invitations";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@workspace/firebase";
import { DatabaseError } from "@workspace/utils/src/errors/database";
import {
  EVENT_COLLECTION,
  ORGANIZER_COLLECTION,
  INVITATION_JOB_COLLECTION,
} from "@workspace/const/database";

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
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      job.eventId,
      INVITATION_JOB_COLLECTION
    );
    const invitationJobRef = doc(invitationJobsCollection);

    const newInvitationJob = {
      ...job,
      jobId: invitationJobRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(invitationJobRef, newInvitationJob);
    return newInvitationJob;
  } catch (error) {
    if (error instanceof Error) {
      throw DatabaseError.fromFirebaseError(error as any);
    }
    throw error;
  }
}
