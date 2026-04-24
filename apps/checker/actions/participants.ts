"use server";

import { updateRegistrationServer } from "@workspace/database/server/registration";

import {
  getEventRegistrationsByStatus,
  getRegistrationById,
} from "@workspace/database/server/registration";
import { CheckInData } from "@workspace/models/db/registration";
import { serverTimestamp } from "firebase/firestore";

class ActionError extends Error {
  data: unknown = null;
  constructor(message: string, data: unknown) {
    super(message);
    this.data = data;
  }
}

export const checkInParticipant = async (params: {
  registrationId: string;
  eventId: string;
  entranceCode: string;
}) => {
  try {
    const participant = await getRegistrationById(params.registrationId);

    if (!participant) {
      throw new ActionError("No Registration Found", { participant });
    }

    if (participant?.status == "checked-in") {
      throw new ActionError("Participant Already CheckedIn", {
        registrationId: params.registrationId,
        checkedInData: participant.checkInData,
      });
    }

    const updatedCheckInData: CheckInData[] = [
      ...participant.checkInData,
      {
        entranceCode: params.entranceCode,
        inputToken: params.registrationId,
        timeStamp: serverTimestamp(),
      },
    ];

    await updateRegistrationServer(
      participant?.organizerId,
      participant?.eventId,
      participant?.registrationId,
      { status: "checked-in", checkInData: updatedCheckInData },
    );
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to check in participant",
    };
  }
};
