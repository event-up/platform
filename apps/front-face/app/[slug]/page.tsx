import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getEventByDomainNameServer } from "@workspace/database/server/event";
import { getPublishedEventPageBySlugServer } from "@workspace/database/server/event-page";
import {
  EVENT_RESERVED_SLUGS,
  normalizeEventPageSlug,
} from "@workspace/page-builder";
import { EventPageRenderer } from "@workspace/page-builder/renderer";
import type { Event } from "@workspace/models/db/event";

type CustomPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

export default async function CustomPage({ params }: CustomPageProps) {
  const { slug: rawSlug } = await params;
  const slug = normalizeEventPageSlug(rawSlug);

  if (
    !slug ||
    EVENT_RESERVED_SLUGS.includes(slug as (typeof EVENT_RESERVED_SLUGS)[number])
  ) {
    notFound();
  }

  const domain = await getCurrentDomainName();
  const event = domain ? await getEventByDomainNameServer(domain) : null;

  if (!event) {
    notFound();
  }

  const eventPage = await getPublishedEventPageBySlugServer(
    event.organizerId,
    event.eventId,
    slug,
  );

  if (!eventPage?.published?.data || eventPage.kind !== "custom") {
    notFound();
  }

  return (
    <EventPageRenderer
      data={eventPage.published.data}
      page={{ pageId: eventPage.eventPageId }}
      metadata={{
        eventName: event.name,
        eventDate: formatEventDate(event),
        eventLocation: event.location,
        registrationHref: "/reg",
      }}
    />
  );
}
