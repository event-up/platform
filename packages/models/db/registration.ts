export type ParticipantStatus =
  | "registered"
  | "self-cancelled"
  | "blocked"
  | "checked-in";
export interface BaseRegistration {
  organizerId: string;
  eventId: string;
  registrationId: string;
  // ......
  status: ParticipantStatus;
  createdAt: string;
  updatedAt: string;

  token: RegistrationToken;
}
export interface Registration extends BaseRegistration {
  registrationData?: {
    name: string;
    email: string;
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
