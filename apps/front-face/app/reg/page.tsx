import { SurveyComponent } from "@workspace/surveyjs";
import {
  EventCoverHeader,
  FormHeader,
  RegistrationFormContainer,
  type RegistrationContent,
} from "./components";
import { headers } from "next/headers";
import { getEventByDomainNameServer } from "@workspace/database/event/get.server";

async function getRegistrationContent(): Promise<RegistrationContent> {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  // Extract domain name (remove port if present)
  const domainName = host.split(":")[0];

  if (!domainName) {
    throw new Error("Domain name not found in headers");
  }
  const event = await getEventByDomainNameServer(domainName);

  if (!event) {
    // Return default content if event not found
    return {
      title: "Event Registration Form",
      description: "Please fill out the form below to register for our event.",
      eventName: "Event Registration",
      coverImage: undefined,
      logo: undefined,
    };
  }

  return {
    title: event.name,
    description: event.description,
    eventName: event.name,
    coverImage: undefined, // Add coverImage field to Event model if needed
    logo: undefined, // Add logo field to Event model if needed
  };
}

export default async function RegistrationPage() {
  const content = await getRegistrationContent();

  return (
    <RegistrationFormContainer>
      <EventCoverHeader
        coverImage={content.coverImage}
        logo={content.logo}
        eventName={content.eventName}
      />

      <div className="p-8 md:p-12 space-y-8">
        <div className="h-8" />

        <FormHeader title={content.title} description={content.description} />

        <div className="border-t border-border" />

        <div className="space-y-6">
          <SurveyComponent />
        </div>
      </div>
    </RegistrationFormContainer>
  );
}
