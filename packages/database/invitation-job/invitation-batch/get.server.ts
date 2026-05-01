import { serverDb } from "@workspace/firebase/server";
import { InvitationJobBatch } from "@workspace/models/db/invitations";
import type { Timestamp } from "firebase-admin/firestore";
import { firestorePaths } from "../../paths";
import { firestoreTimestampsToIsoStrings } from "../../timestamps";

export const getInvitationBatchByIdServer = async (
  organizerId: string,
  eventId: string,
  jobId: string,
  batchId: string
): Promise<InvitationJobBatch | null> => {
  const batchRef = serverDb.doc(
    firestorePaths
      .invitationBatchDoc(organizerId, eventId, jobId, batchId)
      .join("/")
  );

  const batchSnap = await batchRef.get();
  if (!batchSnap.exists) {
    return null;
  }

  return firestoreTimestampsToIsoStrings(
    batchSnap.data() as InvitationJobBatch<Timestamp>
  );
};
