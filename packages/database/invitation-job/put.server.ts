import { InvitationJob } from "@workspace/models/db/invitations";
import { serverDb } from "@workspace/firebase/server";
import { firestorePaths } from "../paths";
import { firestore } from "firebase-admin";
import { isoStringsToFirestoreTimestamps } from "../timestamps";

export const updateInvitationJobServer = async (
  organizerId: string,
  eventId: string,
  jobId: string,
  job: Partial<InvitationJob>
) => {
  const invitationJobDocRef = serverDb.doc(
    firestorePaths.invitationJobDoc(organizerId, eventId, jobId).join("/")
  );
  const invitationJobSnap = await invitationJobDocRef.get();

  if (!invitationJobSnap.exists) {
    throw new Error("Invitation job does not exist");
  }

  const result = await invitationJobDocRef.update(
    isoStringsToFirestoreTimestamps(
      job,
      (date) => firestore.Timestamp.fromDate(date),
    ),
  );

  return result;
};
