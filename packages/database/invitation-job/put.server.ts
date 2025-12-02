import { InvitationJob } from "@workspace/models/db/invitations";
import { serverDb } from "@workspace/firebase/server";
import {
  EVENT_COLLECTION,
  INVITATION_JOB_COLLECTION,
  ORGANIZER_COLLECTION,
} from "@workspace/const/database";

export const updateInvitationJobServer = async (
  organizerId: string,
  eventId: string,
  jobId: string,
  job: Partial<InvitationJob>
) => {
  const invitationJobRef = serverDb.collection(
    `${ORGANIZER_COLLECTION}/${organizerId}/${EVENT_COLLECTION}/${eventId}/${INVITATION_JOB_COLLECTION}`
  );
  const invitationJobSnap = await invitationJobRef.doc(jobId).get();

  if (!invitationJobSnap.exists) {
    throw new Error("Invitation job does not exist");
  }

  const result = await invitationJobRef.doc(jobId).update(job);

  return result;
};
