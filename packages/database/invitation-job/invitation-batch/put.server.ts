import { serverDb as db } from "@workspace/firebase/server";
import { InvitationJobBatch } from "@workspace/models/db/invitations";
import {
  DatabaseError,
  DatabaseErrorCode,
} from "@workspace/utils/src/errors/database";
import { firestore } from "firebase-admin";
import { firestorePaths } from "../../paths";
import { isoStringsToFirestoreTimestamps } from "../../timestamps";

export async function updateInvitationJobBatchServer(
  organizerId: string,
  eventId: string,
  jobId: string,
  batchId: string,
  updateData: Partial<InvitationJobBatch>
) {
  const batchPath = firestorePaths
    .invitationBatchDoc(organizerId, eventId, jobId, batchId)
    .join("/");

  const batchDocRef = db.doc(batchPath);
  const batchDoc = await batchDocRef.get();

  if (!batchDoc.exists) {
    throw new DatabaseError(
      DatabaseErrorCode.ENTITY_NOT_FOUND,
      `Invitation batch with ID ${batchId} does not exist`
    );
  }

  await batchDocRef.update({
    ...isoStringsToFirestoreTimestamps(
      updateData,
      (date) => firestore.Timestamp.fromDate(date),
    ),
    updatedAt: firestore.FieldValue
      ? firestore.FieldValue.serverTimestamp()
      : null,
  });
}
