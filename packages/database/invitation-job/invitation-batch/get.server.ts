import {
  EVENT_COLLECTION,
  INVITATION_BATCH_COLLECTION,
  INVITATION_JOB_COLLECTION,
  ORGANIZER_COLLECTION,
} from "@workspace/const/database";
import { serverDb } from "@workspace/firebase/server";
import { InvitationJobBatch } from "@workspace/models/db/invitations";

export const getInvitationBatchByIdServer = async (
  organizerId: string,
  eventId: string,
  jobId: string,
  batchId: string
): Promise<InvitationJobBatch | null> => {
  const batchRef = serverDb
    .collection(ORGANIZER_COLLECTION)
    .doc(organizerId)
    .collection(EVENT_COLLECTION)
    .doc(eventId)
    .collection(INVITATION_JOB_COLLECTION)
    .doc(jobId)
    .collection(INVITATION_BATCH_COLLECTION)
    .doc(batchId);

  const batchSnap = await batchRef.get();
  if (!batchSnap.exists) {
    return null;
  }

  return batchSnap.data() as InvitationJobBatch;
};
