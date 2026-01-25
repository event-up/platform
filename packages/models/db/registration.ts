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

export interface ContactChannel {
  type: RegistrationContactChannels;
  value: string;
  jobResults: ContactChannelJobResult[];
}
export interface BaseRegistration {
  organizerId: string;
  eventId: string;
  registrationId: string;
  // ......
  status: ParticipantStatus;
  createdAt: string;
  updatedAt: string;
  contactChannels: ContactChannel[];
  token: RegistrationToken;
}
export interface Registration extends BaseRegistration {
  registrationData?: {
    [key: string]: any;
  };
}

export interface RegistrationToken {
  verifyToken: string;
  type: "QR" | "PIN";
}

// export interface QRRegistrationToken extends RegistrationToken {
//   qrText: string;
//   qrURL: string;
// }
