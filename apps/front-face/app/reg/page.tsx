import { headers } from "next/headers";
import { getEventByDomainNameServer } from "@workspace/database/server/event";
import { getPublishedEventPageServer } from "@workspace/database/server/event-page";
import {
  EVENT_REGISTRATION_PAGE_ID,
  createDefaultRegistrationPageData,
} from "@workspace/page-builder";
import { EventPageRenderer } from "@workspace/page-builder/renderer";
import type { Event } from "@workspace/models/db/event";
import { RegistrationFlow } from "./registration-flow";

async function getCurrentDomainName() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  return host.split(":")[0] || "";
}

function formatEventDate(event: Event) {
  const rawDate = event.date;
  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export default async function RegistrationPage() {
  const domain = await getCurrentDomainName();
  const event = domain ? await getEventByDomainNameServer(domain) : null;
  const metadata = {
    eventName: event?.name,
    eventDate: event ? formatEventDate(event) : "",
    eventLocation: event?.location,
    registrationHref: "/reg",
    registrationSlot: <RegistrationFlow />,
  };
  const publishedPage = event
    ? await getPublishedEventPageServer(
        event.organizerId,
        event.eventId,
        EVENT_REGISTRATION_PAGE_ID,
      )
    : null;

  return (
    <EventPageRenderer
      data={publishedPage?.data ?? createDefaultRegistrationPageData(metadata)}
      page={{
        pageId: EVENT_REGISTRATION_PAGE_ID,
        template: "registration",
      }}
      metadata={metadata}
    />
  );
}
