import { UserRole } from "./user";

export type Organizer<DateTime = string> = {
  userId: string;
  email: string;
  role: UserRole;
  profileImgUrl: string;
  createdAt?: DateTime;
  updatedAt?: DateTime;
};
