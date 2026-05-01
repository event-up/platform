import {
} from "@workspace/const/database";
import { serverDb as db } from "@workspace/firebase/server";
import { InvitationJobBatch } from "@workspace/models/db/invitations";
import { Registration } from "@workspace/models/db/registration";
import { firestore } from "firebase-admin";
import { firestorePaths } from "../../paths";
import { isoStringsToFirestoreTimestamps } from "../../timestamps";

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
    firestorePaths.invitationBatchesCollection(organizerId, eventId, jobId).join("/")
  );
  const createdBatches: InvitationJobBatch[] = [];
  batches.forEach((batchList) => {
    const batchDocRef = batchesCol.doc(); // auto-ID
    const persistedBatch: InvitationJobBatch<FirebaseFirestore.FieldValue | FirebaseFirestore.Timestamp | string | null> = isoStringsToFirestoreTimestamps({
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
      updatedAt: firestore.FieldValue.serverTimestamp(),
    }, (date) => firestore.Timestamp.fromDate(date));
    const nowIso = new Date().toISOString();
    createdBatches.push({
      recipients: batchList,
      batchId: batchDocRef.id,
      status: "created",
      createdAt: nowIso,
      completedAt: nowIso,
      updatedAt: nowIso,
      successCount: 0,
      message,
    });
    batchWrites.set(batchDocRef, persistedBatch);
  });

  await batchWrites.commit();

  return createdBatches;
}
