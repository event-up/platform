import {
  ORGANIZER_COLLECTION,
  EVENT_COLLECTION,
  INVITATION_JOB_COLLECTION,
  INVITATION_BATCH_COLLECTION,
} from "@workspace/const/database";
import { serverDb as db } from "@workspace/firebase/server";
import { InvitationJobBatch } from "@workspace/models/db/invitations";
import { Registration } from "@workspace/models/db/registration";
import { firestore } from "firebase-admin";

export async function createBatch(
  organizerId: string,
  eventId: string,
  jobId: string,
  batches: Registration[][],
  message: string
) {
  // 3. Write each batch as a separate doc under job -> batches
  const batchWrites = db.batch();
  const batchesCol = db.collection(
    `${ORGANIZER_COLLECTION}/${organizerId}/${EVENT_COLLECTION}/${eventId}/${INVITATION_JOB_COLLECTION}/${jobId}/${INVITATION_BATCH_COLLECTION}`
  );
  const createdBatches: InvitationJobBatch[] = [];
  batches.forEach((batchList) => {
    const batchDocRef = batchesCol.doc(); // auto-ID
    const batch: InvitationJobBatch = {
      recipients: batchList,
      batchId: batchDocRef.id,
      status: "created",
      createdAt: firestore.FieldValue
        ? firestore.FieldValue.serverTimestamp()
        : null,
      message: message,
      completedAt: firestore.FieldValue
        ? firestore.FieldValue.serverTimestamp()
        : null,
      successCount: 0,
    };
    createdBatches.push(batch);
    batchWrites.set(batchDocRef, batch);
  });

  await batchWrites.commit();

  return createdBatches;
}
