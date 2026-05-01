"use server";

import { z } from "zod";
import { authActionClient } from "@/lib/safe-action";
import { createInvitationJobServer } from "@workspace/database/server/invitation-job";

const notifyChannelSchema = z.discriminatedUnion("channelType", [
  z.object({
    channelType: z.literal("EMAIL"),
    messageTemplate: z.string().min(1),
  }),
  z.object({
    channelType: z.literal("SMS"),
    messageTemplate: z.string().min(1),
    smsMaskId: z.string().min(1),
  }),
]);

const createInvitationJobSchema = z.object({
  eventId: z.string().min(1),
  jobName: z.string().min(1),
  recipientsReference: z.string().min(1),
  notifyChannel: notifyChannelSchema,
});

export const createInvitationJobAction = authActionClient
  .inputSchema(createInvitationJobSchema)
  .action(async ({ parsedInput, ctx: { organizerId } }) => {
    const job = await createInvitationJobServer({
      organizerId,
      eventId: parsedInput.eventId,
      jobName: parsedInput.jobName,
      recipientsReference: parsedInput.recipientsReference,
      notifyChannel: parsedInput.notifyChannel,
    });

    return job;
  });

