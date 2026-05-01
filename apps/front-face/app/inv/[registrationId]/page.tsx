import InvitationUIRenderer from "./components/InvitationUIRenderer";
import { getEventByIdServer } from "@workspace/database/server/event";
import { getPublishedEventPageServer } from "@workspace/database/server/event-page";
import { getRegistrationById } from "@workspace/database/server/registration";
import {
  EVENT_INVITATION_PAGE_ID,
  createDefaultInvitationPageData,
} from "@workspace/page-builder";
import { EventPageRenderer } from "@workspace/page-builder/renderer";
import type { Event } from "@workspace/models/db/event";

type InvitationPageProps = {
  params: Promise<{ registrationId: string }>;
};

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { registrationId } = await params;
  const regsitration = await getRegistrationById(registrationId);

  if (!regsitration) {
    return <p>Registration not found</p>;
  }

  const event = await getEventByIdServer(
    regsitration.organizerId,
    regsitration.eventId,
  );
  const metadata = {
    eventName: event?.name,
    eventDate:event?.date,
    eventLocation: event?.location,
    registrationHref: "/reg",
    invitationSlot: (
      <InvitationUIRenderer regsitration={regsitration} event={event} />
    ),
  };
  const publishedPage = await getPublishedEventPageServer(
    regsitration.organizerId,
    regsitration.eventId,
    EVENT_INVITATION_PAGE_ID,
  );

  return (
    <EventPageRenderer
      data={publishedPage?.data}
      page={{
        pageId: EVENT_INVITATION_PAGE_ID,
        template: "invitation",
      }}
      metadata={metadata}
    />
  );
}
