"use server";

import {
  Registration,
  ParticipantStatus,
} from "@workspace/models/db/registration";
import { createRegistration } from "@workspace/database/registration/post";
import { updateRegistrationServer } from "@workspace/database/registration/put.server";

const createNewRegistration = async (data: Registration) => {
  const res = await createRegistration({
    ...data,
  });
};

export async function updateRegistrationStatus(
  organizerId: string,
  eventId: string,
  registrationId: string,
  status: ParticipantStatus
) {
  const result = await updateRegistrationServer(
    organizerId,
    eventId,
    registrationId,
    { status }
  );
  return { success: true, message: `Status updated to ${status}` };
}
