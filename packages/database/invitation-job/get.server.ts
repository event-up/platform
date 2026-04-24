import {
  REGISTRATION_COLLECTION,
} from "@workspace/const/database";
import { serverDb as db } from "@workspace/firebase/server";
import { InvitationJob } from "@workspace/models/db/invitations";
import {
  ParticipantStatus,
  Registration,
} from "@workspace/models/db/registration";
import { firestorePaths } from "../paths";

export async function getEventRegistrationsByStatus(
  organizerId: string,
  eventId: string,
  status: ParticipantStatus
) {
  const collectionRef = db.collection(
    firestorePaths.registrationsCollection(organizerId, eventId).join("/")
  );

  const snapshot = await collectionRef.where("status", "==", status).get();

  return snapshot.docs.map((doc) => doc.data() as Registration);
}

export async function getInvitationJobByIdServer(
  organizerId: string,
  eventId: string,
  jobId: string
): Promise<InvitationJob | null> {
  const jobDocRef = db.doc(
    firestorePaths.invitationJobDoc(organizerId, eventId, jobId).join("/")
  );

  const jobSnapshot = await jobDocRef.get();

  if (!jobSnapshot.exists) {
    return null;
  }

  return jobSnapshot.data() as InvitationJob;
}
