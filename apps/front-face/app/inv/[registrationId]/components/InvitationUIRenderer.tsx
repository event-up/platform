'use client';

import InvitationFooter from "@/components/invitationFooter";
import InvitationHeader from "@/components/invitationHeader";
import InvitationToken from "@/components/invitationToken";
import { Registration } from "@workspace/models/db/registration";

export default function InvitationUIRenderer({regsitration}: {regsitration: Registration}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-6">
      <InvitationHeader />
      <InvitationToken />
      <InvitationFooter />
    </div>
  );
}
