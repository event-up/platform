import {
  EVENT_COLLECTION,
  INVITATION_JOB_COLLECTION,
  ORGANIZER_COLLECTION,
  REGISTRATION_COLLECTION,
} from "@workspace/const/database";
import {
  ParticipantStatus,
  Registration,
} from "@workspace/models/db/registration";
import { DatabaseError } from "@workspace/utils/src/errors/database";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export async function getEventRegistrationsByStatus(
  organizerId: string,
  eventId: string,
  status: ParticipantStatus
) {
  try {
    const collectionRef = db
      .collection(ORGANIZER_COLLECTION)
      .doc(organizerId)
      .collection(EVENT_COLLECTION)
      .doc(eventId)
      .collection(REGISTRATION_COLLECTION);

    const snapshot = await collectionRef.where("status", "==", status).get();

    return snapshot.docs.map((doc) => doc.data() as Registration);
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw DatabaseError.fromFirebaseError(error as any);
  }
}

export async function createBatch(
  organizerId: string,
  eventId: string,
  jobId: string,
  batches: Registration[][],
  message?: string
) {
  // 3. Write each batch as a separate doc under job -> batches
  const batchWrites = db.batch();
  const batchesCol = db.collection(
    `${ORGANIZER_COLLECTION}/${organizerId}/${EVENT_COLLECTION}/${eventId}/${INVITATION_JOB_COLLECTION}/${jobId}/batches`
  );

  batches.forEach((batchList) => {
    const batchDocRef = batchesCol.doc(); // auto-ID
    batchWrites.set(batchDocRef, {
      recipients: batchList,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      message: message ?? null,
    });
  });

  await batchWrites.commit();
}
