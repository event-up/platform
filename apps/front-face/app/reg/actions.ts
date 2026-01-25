"use server";
import { BaseRegistration } from "@workspace/models/db/registration";
import { getRegistrationFormServer } from "@workspace/database/registration-form/get.server";
import { getEventByDomainNameServer } from "@workspace/database/event/get.server";
import { headers } from "next/headers";

const createRegistration = async (data: BaseRegistration) => {};

export async function getCurrentDomainName() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const domainName = host.split(":")[0];

  if (!domainName) {
    throw new Error("Domain name not found in headers");
  }

  return domainName;
}

export async function fetchEventRegistrationByDomain(domain: string) {
  try {
    const event = await getEventByDomainNameServer(domain);
    if (!event) {
      throw new Error("Event not found for this domain");
    }
    const registrationForm = await getRegistrationFormServer(
      event.organizerId,
      event.eventId,
    );

    return { success: true, data: { event, registrationForm } };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load event";
    return { success: false, error: message };
  }
}
