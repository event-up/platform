'use client';

import InvitationFooter from "@/components/invitationFooter";
import InvitationHeader from "@/components/invitationHeader";
import InvitationToken from "@/components/invitationToken";
import type { Event } from "@workspace/models/db/event";
import type { Registration } from "@workspace/models/db/registration";

function formatEventDate(event?: Event | null) {
  const rawDate = event?.date;
  if (!rawDate) return undefined;

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) return undefined;

  return new Intl.DateTimeFormat("en", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export default function InvitationUIRenderer({
  regsitration,
  event,
}: {
  regsitration: Registration;
  event?: Event | null;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <InvitationToken value={regsitration.token} />
    </div>
  );
}
