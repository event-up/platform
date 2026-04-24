import { tasks } from "firebase-functions";
import { onTaskDispatched } from "firebase-functions/tasks";
import { SMSNotifyChannel } from "@workspace/models/db/invitations";
import { notifyRegistrationUsingSMS } from "@workspace/channels";
import { ChannelsError, ChannelsErrorCode } from "@workspace/utils";
import { getFunctions } from "firebase-admin/functions";
import { getInvitationJobByIdServer } from "@workspace/database/server/invitation-job";
import { getInvitationBatchByIdServer } from "@workspace/database/server/invitation-batch";
import { updateRegistrationServer } from "@workspace/database/server/registration";
import { updateInvitationJobBatchServer } from "@workspace/database/server/invitation-batch";
import { firestore } from "firebase-admin";
import { updateInvitationJobServer } from "@workspace/database/server/invitation-job";

interface InvitationTaskData {
  organizerId: string;
  eventId: string;
  jobId: string;
  batchId: string;
  isLastBatch: boolean;
}
const handleSendSMSBatch = async (req: tasks.Request<InvitationTaskData>) => {
  const { organizerId, eventId, jobId, batchId, isLastBatch } = req.data;
  let successCount = 0;
  console.debug(`######Processing batch ${batchId} for event ${eventId}`, {
    organizerId,
    eventId,
    jobId,
    batchId,
  });

  const batch = await getInvitationBatchByIdServer(
    organizerId,
    eventId,
    jobId,
    batchId
  );

  if (!batch)
    throw new ChannelsError(
      "Invitation batch not found: " + batchId,
      ChannelsErrorCode.CONFIGURATION_ERROR
    );
  const { recipients } = batch;
  if (batch.status === "completed") {
    console.debug(`Batch ${batchId} already completed, skipping`);
    return;
  }

  const invitationJob = await getInvitationJobByIdServer(
    organizerId,
    eventId,
    jobId
  );
  if (!invitationJob)
    throw new ChannelsError(
      "Invitation job not found: " + jobId,
      ChannelsErrorCode.CONFIGURATION_ERROR
    );
  const { notifyChannel } = invitationJob;
  if (invitationJob.status === "completed") {
    console.debug(`Invitation job ${jobId} already completed, skipping`);
    return;
  }

  console.debug(
    `EventId: ${eventId} : Notify channel type: ${notifyChannel.channelType}`
  );
  console.debug(
    `Processing batch ${batchId} with ${recipients.length} recipients`
  );

  if (notifyChannel.channelType !== "SMS") {
    console.debug("Notify channel is not SMS, skipping batch processing");
    return;
  }

  //   Only processing SMS
  if (notifyChannel.channelType === "SMS") {
    console.debug("Notify channel is SMS, processing batch....");
    try {
      for (const recipient of recipients) {
        console.debug(`Sending SMS to recipient ${recipient.registrationId}`);
        const { registration: updatedRecipientResponse, success } =
          await notifyRegistrationUsingSMS(
            jobId,
            recipient,
            (notifyChannel as SMSNotifyChannel).messageTemplate,
            (notifyChannel as SMSNotifyChannel).smsMaskId
          );

        await updateRegistrationServer(
          organizerId,
          eventId,
          recipient.registrationId,
          {
            contactChannels: updatedRecipientResponse.contactChannels,
          }
        );

        if (success) {
          successCount++;
        }
        await delay(500);
      }

      await updateInvitationJobBatchServer(
        organizerId,
        eventId,
        jobId,
        batchId,
        {
          status: "completed",
          completedAt: firestore.FieldValue
            ? firestore.FieldValue.serverTimestamp()
            : null,
          successCount,
        }
      );

      if (isLastBatch) {
        await updateInvitationJobServer(organizerId, eventId, jobId, {
          status: "completed",
          completedAt: firestore.FieldValue
            ? firestore.FieldValue.serverTimestamp()
            : null,
        });
      }
    } catch (error) {
      await updateInvitationJobBatchServer(
        organizerId,
        eventId,
        jobId,
        batchId,
        {
          status: "failed",
        }
      );
      await updateInvitationJobServer(organizerId, eventId, jobId, {
        status: "failed",
        completedAt: firestore.FieldValue
          ? firestore.FieldValue.serverTimestamp()
          : null,
      });
      throw error;
    }
  }
};

export const SendSMSBatch = onTaskDispatched<InvitationTaskData>(
  {
    rateLimits: {
      maxConcurrentDispatches: 1,
    },
    retry: false,
  },
  handleSendSMSBatch
);

export const triggerSendSMSBatch = async (values: InvitationTaskData) => {
  const response = await getFunctions()
    .taskQueue("SendSMSBatch")
    .enqueue({ ...values });
  return response;
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
