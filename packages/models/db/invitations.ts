import { Registration } from "./registration";
type JobStatusType = "created" | "processing" | "completed" | "failed";

export interface InvitationJob<DateTime = string> {
  jobId: string;
  eventId: string;
  jobName: string;
  status: JobStatusType;
  completedCount: number;
  completedAt: DateTime | null;
  failedCount: number;
  recipientsReference: string;
  notifyChannel: NotifyChannel | SMSNotifyChannel;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface NotifyChannel {
  channelType: "SMS" | "EMAIL";
  messageTemplate: string;
}
export interface SMSNotifyChannel extends NotifyChannel {
  smsMaskId: string;
}

export type InvitationJobBatch<DateTime = string> = {
  batchId: string;
  recipients: Registration<DateTime>[];
  status: JobStatusType;
  completedAt: DateTime | null;
  successCount: number;
  createdAt: DateTime | null;
  updatedAt: DateTime;
  message: string | null;
};
