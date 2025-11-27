type JobStatusType = "created" | "processing" | "completed" | "failed";

export interface InvitationJob {
  eventId: string;
  jobName: string;
  status: JobStatusType;
  completedCount: number;
  failedCount: number;
  recipientsReference: string;
  notifyChannel: NotifyChannel;
}

export interface NotifyChannel {
  channelType: "SMS" | "EMAIL";
  messageTemplate: string;
}

export interface NotifyChannelSMS extends NotifyChannel {
  smsMaskId: string;
}
