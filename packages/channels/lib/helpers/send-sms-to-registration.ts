import {
  ContactChannelJobResult,
  Registration,
  RegistrationContactChannels,
} from "@workspace/models/db/registration";
import {
  createNotifyLkClient,
  NotifyLkClient,
  SendSMSParams,
  SendSMSResponse,
} from "../sms/notifylk";
import axios from "axios";

export const notifyRegistrationUsingSMS = async (
  jobId: string,
  registration: Registration,
  message: string,
  senderId: string
): Promise<{ registration: Registration; success: boolean }> => {
  const _registration = { ...registration };
  const { contactChannels } = _registration;
  let isSuccess = false;

  const notifylk = createNotifyLkClient({
    apiKey: process.env.NOTIFYLK_API_KEY || "",
    userId: process.env.NOTIFYLK_USER_ID || "",
    baseUrl: process.env.NOTIFYLK_URL || "",
  });
  console.log({ contactChannels });
  for (const channel of contactChannels) {
    channel.jobResults = channel.jobResults || [];
    if (channel.type !== RegistrationContactChannels.PHONE) continue;
    try {
      const response = await notifylk.sendSMS({
        message,
        senderId,
        to: channel.value,
      });

      if (!response) {
        throw new Error("No response from SMS service");
      }

      if (response.status === "success") {
        isSuccess = true;
        channel.jobResults.push({ jobId, response, success: true });
        continue;
      }

      if (response.status === "error") {
        channel.jobResults.push({ jobId, response, success: false });
        continue;
      }
    } catch (error) {
      console.error("Error sending SMS:", { error });
      if (axios.isAxiosError(error)) {
        channel.jobResults.push({
          jobId,
          response: error.response?.data || error.message,
          success: false,
        });
      }
      if (error instanceof Error) {
        channel.jobResults.push({
          jobId,
          response: { message: error.message },
          success: false,
        });
      }
    }
  }

  return { registration: _registration, success: isSuccess };
};
