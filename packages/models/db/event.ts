import { Timestamp } from "firebase-admin/firestore";

export type Event = {
  name: string;
  date: string | Timestamp;
  location: string;
  description: string;
  eventId: string;
  organizerId: string;
  domainName: string;
  entrances: string[] | null;
  checkers: { email: string, name: string, entrance: string }[] | null;
  scannerAccess: "anyone-have-link" | "assigned-checkers"
};
