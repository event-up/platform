"use client";

import InvitationFooter from "@/components/invitationFooter";
import InvitationHeader from "@/components/invitationHeader";
import InvitationToken from "@/components/invitationToken";
import { useParams } from "next/navigation";

export default function InvitationPage() {
  const { participantId } = useParams<{ participantId: string }>();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-6">
      <InvitationHeader />
      <InvitationToken />
      <InvitationFooter />
    </div>
  );
}

