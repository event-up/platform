import { FieldValue, Timestamp } from "firebase-admin/firestore";

export enum RegistrationFormAuth {
  GUEST = "GUEST",
  GOOGLE = "GOOGLE",
  MICROSOFT = "MICROSOFT",
  SSO = "SSO",
}

export interface RegistrationForm {
  registrationFormId: string;
  organizerId: string;
  eventId: string;
  status: "active" | "inactive";
  formSchema: {
    formTitle: string;
    formDescription: string;
    formFields: string;
  };
  authentication: RegistrationFormAuth[];
  createdAt: FieldValue | Timestamp;
  updatedAt: FieldValue | Timestamp;
}
