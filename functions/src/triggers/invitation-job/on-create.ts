import { onDocumentCreated } from "firebase-functions/v2/firestore";
import {
  EVENT_COLLECTION,
  INVITATION_JOB_COLLECTION,
  ORGANIZER_COLLECTION,
} from "@workspace/const/database";
import { InvitationJob } from "@workspace/models/db/invitations";
import { createBatch, getEventRegistrationsByStatus } from "../../helpers";
import { Registration } from "@workspace/models/db/registration";
const BATCH_SIZE = 100;

exports.onInvitationJobCreated = onDocumentCreated(
  `${ORGANIZER_COLLECTION}/{organizerId}/${EVENT_COLLECTION}/{eventId}/${INVITATION_JOB_COLLECTION}/{invitationJobId}`,
  async (jobSnap) => {
    const job = (await jobSnap.data?.data()) as InvitationJob;
    // TODO  build the template
    const message = job.notifyChannel.messageTemplate;
    const { organizerId, eventId, invitationJobId } = jobSnap.params;
    const registrations = await getEventRegistrationsByStatus(
      organizerId,
      eventId,
      "registered"
    );

    const batches: Registration[][] = [];
    for (let i = 0; i < registrations.length; i += BATCH_SIZE) {
      batches.push(registrations.slice(i, i + BATCH_SIZE));
    }
    console.log(
      `Split ${registrations.length} recipients into ${batches.length} batches`
    );

    // 3. Write each batch as a separate doc under job -> batches
    await createBatch(organizerId, eventId, invitationJobId, batches, message);

    console.log({ registrations, message });
  }
);
