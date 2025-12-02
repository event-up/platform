import {
  ORGANIZER_COLLECTION,
  EVENT_COLLECTION,
  INVITATION_JOB_COLLECTION,
  INVITATION_BATCH_COLLECTION,
} from "@workspace/const/database";
import { serverDb as db } from "@workspace/firebase/server";
import { InvitationJobBatch } from "@workspace/models/db/invitations";
import {
  DatabaseError,
  DatabaseErrorCode,
} from "@workspace/utils/src/errors/database";
import { firestore } from "firebase-admin";

export async function updateInvitationJobBatchServer(
  organizerId: string,
  eventId: string,
  jobId: string,
  batchId: string,
  updateData: Partial<InvitationJobBatch>
) {
  const batchPath = `${ORGANIZER_COLLECTION}/${organizerId}/${EVENT_COLLECTION}/${eventId}/${INVITATION_JOB_COLLECTION}/${jobId}/${INVITATION_BATCH_COLLECTION}/${batchId}`;

  const batchDocRef = db.doc(batchPath);
  const batchDoc = await batchDocRef.get();

  if (!batchDoc.exists) {
    throw new DatabaseError(
      DatabaseErrorCode.ENTITY_NOT_FOUND,
      `Invitation batch with ID ${batchId} does not exist`
    );
  }

  await batchDocRef.update({
    ...updateData,
    updatedAt: firestore.FieldValue
      ? firestore.FieldValue.serverTimestamp()
      : null,
  });
}
