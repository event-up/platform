import { firestore } from "firebase-admin";
import { serverDb } from "@workspace/firebase/server";
import { InvitationJob } from "@workspace/models/db/invitations";
import { firestorePaths } from "../paths";

type CreateInvitationJobInput = {
  organizerId: string;
  eventId: string;
  jobName: string;
  recipientsReference: string;
  notifyChannel: InvitationJob["notifyChannel"];
};

const validateNotifyChannel = (notifyChannel: InvitationJob["notifyChannel"]) => {
  if (!notifyChannel?.channelType) {
    throw new Error("Notification channel type is required");
  }
  if (!notifyChannel.messageTemplate?.trim()) {
    throw new Error("Message template is required");
  }
  if (
    notifyChannel.channelType === "SMS" &&
    "smsMaskId" in notifyChannel &&
    !notifyChannel.smsMaskId?.trim()
  ) {
    throw new Error("smsMaskId is required for SMS channel");
  }
};

export const createInvitationJobServer = async ({
  organizerId,
  eventId,
  jobName,
  recipientsReference,
  notifyChannel,
}: CreateInvitationJobInput) => {
  if (!organizerId || !eventId) {
    throw new Error("organizerId and eventId are required");
  }
  if (!jobName.trim()) {
    throw new Error("Job name is required");
  }
  if (!recipientsReference.trim()) {
    throw new Error("Recipients reference is required");
  }
  validateNotifyChannel(notifyChannel);

  const eventDocRef = serverDb.doc(
    firestorePaths.eventDoc(organizerId, eventId).join("/")
  );
  const eventSnap = await eventDocRef.get();
  if (!eventSnap.exists) {
    throw new Error("Event not found or not owned by organizer");
  }

  const jobsCollection = serverDb.collection(
    firestorePaths.invitationJobsCollection(organizerId, eventId).join("/")
  );
  const jobRef = jobsCollection.doc();

  const data = {
    eventId,
    jobId: jobRef.id,
    jobName: jobName.trim(),
    status: "created" as const,
    completedCount: 0,
    failedCount: 0,
    completedAt: null,
    recipientsReference: recipientsReference.trim(),
    notifyChannel,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  };

  await jobRef.set(data);
  return { ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
};
