import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { UserRole } from "./user";

export type Organizer = {
  userId: string;
  email: string;
  role: UserRole;
  profileImgUrl: string;
  createdAt?: FieldValue | Timestamp;
  updatedAt?: FieldValue | Timestamp;
};
