export type ParticipantStatus =
  | "registered"
  | "self-cancelled"
  | "blocked"
  | "checked-in";

export enum RegistrationContactChannels {
  PHONE = "PHONE",
  EMAIL = "EMAIL",
  SMS = "SMS",
}

export interface ContactChannelJobResult {
  jobId: string;
  response: unknown;
  success: boolean;
}

export interface CheckInData<DateTime = string> {
  timeStamp: DateTime;
  entranceCode: string;
  inputToken: string;
}

export interface ContactChannel {
  type: RegistrationContactChannels;
  value: string;
  jobResults: ContactChannelJobResult[];
}
export interface BaseRegistration<DateTime = string> {
  organizerId: string;
  eventId: string;
  registrationId: string;
  // ......
  status: ParticipantStatus;
  checkInData: CheckInData<DateTime>[];
  createdAt: DateTime;
  updatedAt: DateTime;
  contactChannels: ContactChannel[];
  token: string;
}
export interface Registration<DateTime = string> extends BaseRegistration<DateTime> {
  registrationData?: {
    [key: string]: any;
  };
}

// export interface RegistrationToken {
//   verifyToken: string;
//   type: "QR" | "PIN";
// }

// export interface QRRegistrationToken extends RegistrationToken {
//   qrText: string;
//   qrURL: string;
// }
