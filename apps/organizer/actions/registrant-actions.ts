"use server";
import { z } from "zod";
import { authActionClient } from "@/lib/safe-action";
import { updateRegistrationServer } from "@workspace/database/server/registration";

const updateRegistrationStatusSchema = z.object({
  eventId: z.string().min(1),
  registrationId: z.string().min(1),
  status: z.enum(["registered", "self-cancelled", "blocked", "checked-in"]),
});
const updateRegistrationStatusAction = async ({
  parsedInput,
  ctx: { organizerId },
}: {
  parsedInput: z.infer<typeof updateRegistrationStatusSchema>;
  ctx: { organizerId: string };
}) => {
  await updateRegistrationServer(
    organizerId,
    parsedInput.eventId,
    parsedInput.registrationId,
    { status: parsedInput.status },
  );
  return { message: `Status updated to ${parsedInput.status}` };
};
export const updateRegistrationStatus = authActionClient
  .inputSchema(updateRegistrationStatusSchema)
  .action(updateRegistrationStatusAction);
