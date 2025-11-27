import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  eventId: z.string().optional(),
  organizerId: z.string().optional(),
});

export type EventSchema = z.infer<typeof eventSchema>;
