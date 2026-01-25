import { Timestamp } from "firebase-admin/firestore";

export type Event = {
  name: string;
  date: string | Timestamp;
  location: string;
  description: string;
  eventId: string;
  organizerId: string;
  domainName: string;
};
