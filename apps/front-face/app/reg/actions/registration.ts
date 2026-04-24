"use server";
import {
    ContactChannel,
    Registration,
} from "@workspace/models/db/registration";
import { createRegistrationServer } from "@workspace/database/server/registration";
import { generateRegistrationToken } from "@workspace/check-token/lib/tokenize"

export const createRegistration = async (
    eventId: string,
    organizerId: string,
    contactChannels: Omit<ContactChannel, "jobResults">[],
    data: Pick<Registration, "registrationData">,
): Promise<{ success: boolean; message: string; data?: Registration }> => {
    try {


        const registration = await createRegistrationServer({
            eventId,
            organizerId,
            status: "registered",
            contactChannels: contactChannels.map((channel) => ({
                ...channel,
                jobResults: [],
            })),
            checkInData: [],
            registrationData: data.registrationData,
        });

        return {
            success: true,
            message: "Registration created successfully",
            data: registration,
        };
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to create registration";
        return {
            success: false,
            message,
        };
    }
};