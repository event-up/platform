import { onDocumentCreated } from "firebase-functions/v2/firestore";
import {
  EVENT_COLLECTION,
  INVITATION_JOB_COLLECTION,
  ORGANIZER_COLLECTION,
} from "@workspace/const/database";
import { InvitationJob } from "@workspace/models/db/invitations";
import { getEventRegistrationsByStatus } from "@workspace/database/server/invitation-job";
import { createBatch } from "@workspace/database/server/invitation-batch";
import { updateInvitationJobServer } from "@workspace/database/server/invitation-job";
import { Registration } from "@workspace/models/db/registration";
import { triggerSendSMSBatch } from "@/src/task-queue/send-sms-batch";
const BATCH_SIZE = process.env.BATCH_SIZE
  ? parseInt(process.env.BATCH_SIZE)
  : 100;

exports.onInvitationJobCreated = onDocumentCreated(
  `${ORGANIZER_COLLECTION}/{organizerId}/${EVENT_COLLECTION}/{eventId}/${INVITATION_JOB_COLLECTION}/{invitationJobId}`,
  async (jobSnap) => {
    const { organizerId, eventId, invitationJobId } = jobSnap.params;
    const job = (await jobSnap.data?.data()) as InvitationJob | undefined;

    if (!job) {
      return;
    }
    if (job.status !== "created") {
      console.debug(
        `Skipping job ${invitationJobId}; expected created status but got ${job.status}`
      );
      return;
    }
    const message = job.notifyChannel.messageTemplate;

    await updateInvitationJobServer(organizerId, eventId, invitationJobId, {
      status: "processing",
    });

    try {
      console.debug("Fetching registrations with status 'registered'...");
      const registrations = await getEventRegistrationsByStatus(
        organizerId,
        eventId,
        "registered"
      );
      console.debug(
        `Fetched ${registrations.length} registrations with status 'registered'.`
      );

      if (registrations.length === 0) {
        await updateInvitationJobServer(organizerId, eventId, invitationJobId, {
          status: "completed",
        });
        return;
      }

      console.debug(`Creating batches...`);
      const batches: Registration[][] = [];
      for (let i = 0; i < registrations.length; i += BATCH_SIZE) {
        batches.push(registrations.slice(i, i + BATCH_SIZE));
      }
      console.log(
        `Split ${registrations.length} recipients into ${batches.length} batches`
      );

      console.debug(`Saving batches...`);
      const createdBatches = await createBatch(
        organizerId,
        eventId,
        invitationJobId,
        batches,
        message
      );

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
      }

      console.log({ enqueuedResponses });
    } catch (error) {
      console.error("Invitation job trigger failed", error);
      await updateInvitationJobServer(organizerId, eventId, invitationJobId, {
        status: "failed",
      });
      throw error;
    }
  }
);
