import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { FormField } from "../dynamic-form";

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
    title: string;
    description: string;
    fields: FormField[];
  };
  authentication: RegistrationFormAuth[];
  createdAt: FieldValue | Timestamp | string;
  updatedAt: FieldValue | Timestamp | string;
}
