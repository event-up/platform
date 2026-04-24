"use server";

import InvitationUIRenderer from "./components/InvitationUIRenderer";
import { getRegistrationById } from "@workspace/database/server/registration";

export default async function  InvitationPage({params}: {params: {registrationId: string}}) {
  const {registrationId} = await params;
  const regsitration = await getRegistrationById(registrationId);

  if(!regsitration){
    return <p>Registration not found</p>;
  }

  return <InvitationUIRenderer regsitration={regsitration} />;
}
