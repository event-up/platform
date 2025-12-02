import { onDocumentCreated } from "firebase-functions/v2/firestore";
import {
  EVENT_COLLECTION,
  INVITATION_JOB_COLLECTION,
  ORGANIZER_COLLECTION,
} from "@workspace/const/database";
import { InvitationJob } from "@workspace/models/db/invitations";
import { getEventRegistrationsByStatus } from "@workspace/database/invitation-job/get.server";
import { createBatch } from "@workspace/database/invitation-job/invitation-batch/post.server";
import { updateInvitationJobServer } from "@workspace/database/invitation-job/put.server";
import { Registration } from "@workspace/models/db/registration";
import { triggerSendSMSBatch } from "@/src/task-queue/send-sms-batch";
const BATCH_SIZE = process.env.BATCH_SIZE
  ? parseInt(process.env.BATCH_SIZE)
  : 100;

exports.onInvitationJobCreated = onDocumentCreated(
  `${ORGANIZER_COLLECTION}/{organizerId}/${EVENT_COLLECTION}/{eventId}/${INVITATION_JOB_COLLECTION}/{invitationJobId}`,
  async (jobSnap) => {
    const job = (await jobSnap.data?.data()) as InvitationJob;
    // TODO  build the template
    const message = job.notifyChannel.messageTemplate;
    const { organizerId, eventId, invitationJobId } = jobSnap.params;

    console.debug("Fetching registrations with status 'registered'...");
    const registrations = await getEventRegistrationsByStatus(
      organizerId,
      eventId,
      "registered"
    );
    console.debug(
      `Fetched ${registrations.length} registrations with status 'registered'.`
    );

    console.debug(`Creating batches...`);
    const batches: Registration[][] = [];
    for (let i = 0; i < registrations.length; i += BATCH_SIZE) {
      batches.push(registrations.slice(i, i + BATCH_SIZE));
    }
    console.log(
      `Split ${registrations.length} recipients into ${batches.length} batches`
    );

    console.debug(`Saving batches...`);
    //Write each batch as a separate doc under job -> batches
    const createdBatches = await createBatch(
      organizerId,
      eventId,
      invitationJobId,
      batches,
      message
    );

    // To reduce the read count we are enqueuing batches here
    console.debug("Enqueuing batches for SMS sending...");
    const enqueuedResponses = [];
    for (const batch of createdBatches) {
      console.debug(`**Enqueuing batch ${batch.batchId}`);

      const res = await triggerSendSMSBatch({
        organizerId,
        eventId,
        jobId: invitationJobId,
        batchId: batch.batchId,
        isLastBatch: batch === createdBatches[createdBatches.length - 1],
      });
      enqueuedResponses.push(res);
      console.debug(`Enqueued batch ${res}`);
    }

    // update job status
    await updateInvitationJobServer(organizerId, eventId, invitationJobId, {
      status: "processing",
    });

    console.log({ enqueuedResponses });
  }
);
