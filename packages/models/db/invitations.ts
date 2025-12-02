import { Registration } from "./registration";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
type JobStatusType = "created" | "processing" | "completed" | "failed";

export interface InvitationJob {
  eventId: string;
  jobName: string;
  status: JobStatusType;
  completedCount: number;
  completedAt: Timestamp | FieldValue | null;
  failedCount: number;
  recipientsReference: string;
  notifyChannel: NotifyChannel | SMSNotifyChannel;
}

interface NotifyChannel {
  channelType: "SMS" | "EMAIL";
  messageTemplate: string;
}
export interface SMSNotifyChannel extends NotifyChannel {
  smsMaskId: string;
}

export type InvitationJobBatch = {
  batchId: string;
  recipients: Registration[];
  status: JobStatusType;
  completedAt: Timestamp | FieldValue | null;
  successCount: number;
  createdAt: Timestamp | FieldValue | null;
  message: string | null;
};
