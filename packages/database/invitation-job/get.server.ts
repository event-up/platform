import {
  EVENT_COLLECTION,
  INVITATION_JOB_COLLECTION,
  ORGANIZER_COLLECTION,
  REGISTRATION_COLLECTION,
} from "@workspace/const/database";
import { serverDb as db } from "@workspace/firebase/server";
import { InvitationJob } from "@workspace/models/db/invitations";
import {
  ParticipantStatus,
  Registration,
} from "@workspace/models/db/registration";

export async function getEventRegistrationsByStatus(
  organizerId: string,
  eventId: string,
  status: ParticipantStatus
) {
  const collectionRef = db
    .collection(ORGANIZER_COLLECTION)
    .doc(organizerId)
    .collection(EVENT_COLLECTION)
    .doc(eventId)
    .collection(REGISTRATION_COLLECTION);

  const snapshot = await collectionRef.where("status", "==", status).get();

  return snapshot.docs.map((doc) => doc.data() as Registration);
}

export async function getInvitationJobByIdServer(
  organizerId: string,
  eventId: string,
  jobId: string
): Promise<InvitationJob | null> {
  const jobDocRef = db
    .collection(ORGANIZER_COLLECTION)
    .doc(organizerId)
    .collection(EVENT_COLLECTION)
    .doc(eventId)
    .collection(INVITATION_JOB_COLLECTION)
    .doc(jobId);

  const jobSnapshot = await jobDocRef.get();

  if (!jobSnapshot.exists) {
    return null;
  }

  return jobSnapshot.data() as InvitationJob;
}
