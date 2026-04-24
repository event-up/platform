"use server";

import { z } from "zod";
import { authActionClient } from "@/lib/safe-action";
import {
  createRegistrationFormServer,
  updateRegistrationFormServer,
} from "@workspace/database/server/registration-form";
import { RegistrationForm } from "@workspace/models/db/registration-form";

const createRegistrationFormSchema = z.object({
  organizerId: z.string().min(1),
  eventId: z.string().min(1),
  status: z.enum(["active", "inactive"]),
  authentication: z.array(z.any()),
  formSchema: z.object({
    title: z.string().optional().default(""),
    description: z.string().optional().default(""),
    fields: z.array(z.any()),
  }),
});

const updateRegistrationFormSchema = z.object({
  organizerId: z.string().min(1),
  eventId: z.string().min(1),
  formId: z.string().min(1),
  formData: z.record(z.string(), z.any()),
});

export const createRegistrationFormAction = authActionClient
  .inputSchema(createRegistrationFormSchema)
  .action(async ({ parsedInput, ctx: { organizerId } }) => {
    if (organizerId !== parsedInput.organizerId) {
      throw new Error("Organizer mismatch");
    }
    await createRegistrationFormServer(
      parsedInput as Omit<
        RegistrationForm,
        "createdAt" | "updatedAt" | "registrationFormId"
      >
    );
    return { success: true };
  });

export const updateRegistrationFormAction = authActionClient
  .inputSchema(updateRegistrationFormSchema)
  .action(async ({ parsedInput, ctx: { organizerId } }) => {
    if (organizerId !== parsedInput.organizerId) {
      throw new Error("Organizer mismatch");
    }
    const result = await updateRegistrationFormServer(
      parsedInput.organizerId,
      parsedInput.eventId,
      parsedInput.formId,
      parsedInput.formData as any
    );
    return result;
  });
