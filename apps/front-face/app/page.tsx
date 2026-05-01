import { headers } from "next/headers";
import { getEventByDomainNameServer } from "@workspace/database/server/event";
import { getPublishedEventPageServer } from "@workspace/database/server/event-page";
import { EventPageRenderer } from "@workspace/page-builder/renderer";
import {
  EVENT_HOME_PAGE_ID,
  EVENT_LEGACY_PAGE_ID,
} from "@workspace/page-builder";
import type { Event } from "@workspace/models/db/event";

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

function DefaultEventPage({ event }: { event: Event }) {
  const eventDate = formatEventDate(event);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-6 py-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {event.location}
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            {event.name}
          </h1>
          {eventDate ? (
            <p className="mt-5 max-w-2xl text-lg text-slate-100">
              {eventDate}
            </p>
          ) : null}
          {event.description ? (
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">
              {event.description}
            </p>
          ) : null}
          <a
            href="/reg"
            className="mt-8 inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-emerald-500 px-5 text-sm font-semibold text-white transition hover:bg-emerald-400"
          >
            Register now
          </a>
        </div>
      </section>
    </main>
  );
}

export default async function Page() {
  const domain = await getCurrentDomainName();
  const event = domain ? await getEventByDomainNameServer(domain) : null;

  if (!event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">
            Event page not found
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            This domain is not connected to an EventUp event.
          </p>
        </div>
      </main>
    );
  }

  const publishedPage = await getPublishedEventPageServer(
    event.organizerId,
    event.eventId,
    EVENT_HOME_PAGE_ID,
  );
  const legacyPublishedPage = publishedPage
    ? null
    : await getPublishedEventPageServer(
        event.organizerId,
        event.eventId,
        EVENT_LEGACY_PAGE_ID,
      );
  const page = publishedPage ?? legacyPublishedPage;

  if (!page?.data) {
    return <DefaultEventPage event={event} />;
  }

  return (
    <EventPageRenderer
      data={page.data}
      page={{ pageId: EVENT_HOME_PAGE_ID }}
      metadata={{
        eventName: event.name,
        eventDate: formatEventDate(event),
        eventLocation: event.location,
        registrationHref: "/reg",
      }}
    />
  );
}
