import { cookies } from "next/headers";
import Link from "next/link";
import { Globe2 } from "lucide-react";
import { serverAuth } from "@workspace/firebase/server";
import { listEventPagesServer } from "@workspace/database/server/event-page";
import { getEventByIdServer } from "@workspace/database/server/event";
import { Button } from "@workspace/ui/components/button";
import {
  EVENT_LEGACY_PAGE_ID,
  createDefaultEventPageSitePages,
  normalizeEventPageSitePage,
} from "@workspace/page-builder";
import type { EventPageSitePage } from "@workspace/page-builder";
import type { EventPage } from "@workspace/models/db/event-page";
import { PageBuilderEditor } from "./components/page-builder-editor";

type PageBuilderPageProps = {
  params: Promise<{
    eventId: string;
  }>;
};

async function getOrganizerIdFromSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session")?.value;

  if (!session) return null;

  try {
    const decoded = await serverAuth.verifySessionCookie(session, true);
    return decoded.uid;
  } catch {
    return null;
  }
}

function toEditorPage(eventPage: EventPage): EventPageSitePage | null {
  const snapshot = eventPage.draft ?? eventPage.published;

  if (!snapshot?.data) {
    return null;
  }

  return {
    pageId: eventPage.eventPageId,
    name: eventPage.name ?? "Landing",
    slug: eventPage.slug ?? "",
    path: eventPage.path ?? "/",
    kind: eventPage.kind ?? "home",
    template: eventPage.template,
    data: snapshot.data,
    seo: snapshot.seo,
  } as EventPageSitePage;
}

function mergeInitialPages(eventPages: EventPage[]) {
  const defaults = createDefaultEventPageSitePages();
  const savedPages = eventPages
    .map(toEditorPage)
    .filter(Boolean) as EventPageSitePage[];
  const legacyPage = savedPages.find(
    (page) => page.pageId === EVENT_LEGACY_PAGE_ID,
  );
  const pagesById = new Map(savedPages.map((page) => [page.pageId, page]));

  const defaultPages = defaults.map((defaultPage) => {
    const savedPage = pagesById.get(defaultPage.pageId);

    if (savedPage) {
      return normalizeEventPageSitePage({
        ...defaultPage,
        data: savedPage.data,
        seo: savedPage.seo,
      });
    }

    if (defaultPage.pageId === "home" && legacyPage) {
      return normalizeEventPageSitePage({
        ...defaultPage,
        data: legacyPage.data,
        seo: legacyPage.seo,
      });
    }

    return defaultPage;
  });

  return defaultPages.concat(
    savedPages
      .filter((page) => page.kind === "custom")
      .map((page) => normalizeEventPageSitePage(page)),
  );
}

function getPublicEventUrl(domainName: string | undefined) {
  if (!domainName) return null;
  if (/^https?:\/\//.test(domainName)) return domainName;

  const protocol = domainName.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${domainName}`;
}

export default async function PageBuilderPage({ params }: PageBuilderPageProps) {
  const { eventId } = await params;
  const organizerId = await getOrganizerIdFromSession();
  const eventPages = organizerId
    ? await listEventPagesServer(organizerId, eventId)
    : [];
  const event = organizerId
    ? await getEventByIdServer(organizerId, eventId)
    : null;
  const initialPages = mergeInitialPages(eventPages);
  const publicEventUrl = getPublicEventUrl(event?.domainName);

  return (
    <div className="-m-4 w-[calc(100%+2rem)]">
      <div className="flex flex-col gap-4 border-b bg-background px-6 py-6 sm:flex-row sm:items-start sm:justify-between lg:px-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Event Pages
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Design the public pages guests see at every step.
          </p>
        </div>
        {publicEventUrl ? (
          <Button asChild variant="outline" className="shrink-0">
            <Link href={publicEventUrl} target="_blank" rel="noreferrer">
              <Globe2 className="size-4" />
              View Live
            </Link>
          </Button>
        ) : null}
      </div>
      <div className="px-6 py-5 lg:px-8">
        <PageBuilderEditor
          eventId={eventId}
          initialPages={initialPages}
        />
      </div>
    </div>
  );
}
