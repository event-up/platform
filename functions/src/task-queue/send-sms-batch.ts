import { tasks } from "firebase-functions";
import { onTaskDispatched } from "firebase-functions/tasks";
import { SMSNotifyChannel } from "@workspace/models/db/invitations";
import { notifyRegistrationUsingSMS } from "@workspace/channels";
import { ChannelsError, ChannelsErrorCode } from "@workspace/utils";
import { getFunctions } from "firebase-admin/functions";
import { getInvitationJobByIdServer } from "@workspace/database/invitation-job/get.server";
import { getInvitationBatchByIdServer } from "@workspace/database/invitation-job/invitation-batch/get.server";
import { updateRegistrationServer } from "@workspace/database/registration/put.server";
import { updateInvitationJobBatchServer } from "@workspace/database/invitation-job/invitation-batch/put.server";
import { firestore } from "firebase-admin";
import { updateInvitationJobServer } from "@workspace/database/invitation-job/put.server";

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

    for (const recipient of recipients) {
      // Send the SMS
      console.debug(`Sending SMS to recipient ${recipient.registrationId}`);
      const { registration: updatedRecipientResponse, success } =
        await notifyRegistrationUsingSMS(
          jobId,
          recipient,
          (notifyChannel as SMSNotifyChannel).messageTemplate,
          (notifyChannel as SMSNotifyChannel).smsMaskId
        );

      console.debug(
        `Received response for recipient ${recipient.registrationId}: ${JSON.stringify({ recipientResponse: updatedRecipientResponse })}`
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
      console.debug("Updated registration with SMS response");
      await delay(500);
    }
    console.debug("Updating batch status to completed");
    // update Batch status
    await updateInvitationJobBatchServer(organizerId, eventId, jobId, batchId, {
      status: "completed",
      completedAt: firestore.FieldValue
        ? firestore.FieldValue.serverTimestamp()
        : null,
      successCount,
    });

    console.debug(`######Batch Completed processing : ${batchId}`);
    if (isLastBatch) {
      console.debug(`*######Invitation Job Completed processing : ${jobId}`);

      await updateInvitationJobServer(organizerId, eventId, jobId, {
        status: "completed",
        completedAt: firestore.FieldValue
          ? firestore.FieldValue.serverTimestamp()
          : null,
      });
    }
    // TODO: Delete the registrations
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
