import {
  EVENT_COLLECTION,
  INVITATION_BATCH_COLLECTION,
  INVITATION_JOB_COLLECTION,
  ORGANIZER_COLLECTION,
  REGISTRATION_COLLECTION,
  REGISTRATION_FORM_COLLECTION,
} from "@workspace/const/database";

export const firestorePaths = {
  organizersCollection: () => [ORGANIZER_COLLECTION] as const,
  organizerDoc: (organizerId: string) =>
    [ORGANIZER_COLLECTION, organizerId] as const,
  eventsCollection: (organizerId: string) =>
    [ORGANIZER_COLLECTION, organizerId, EVENT_COLLECTION] as const,
  eventDoc: (organizerId: string, eventId: string) =>
    [ORGANIZER_COLLECTION, organizerId, EVENT_COLLECTION, eventId] as const,
  registrationFormsCollection: (organizerId: string, eventId: string) =>
    [
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      REGISTRATION_FORM_COLLECTION,
    ] as const,
  registrationFormDoc: (
    organizerId: string,
    eventId: string,
    formId: string
  ) =>
    [
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      REGISTRATION_FORM_COLLECTION,
      formId,
    ] as const,
  registrationsCollection: (organizerId: string, eventId: string) =>
    [
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      REGISTRATION_COLLECTION,
    ] as const,
  registrationDoc: (organizerId: string, eventId: string, registrationId: string) =>
    [
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      REGISTRATION_COLLECTION,
      registrationId,
    ] as const,
  invitationJobsCollection: (organizerId: string, eventId: string) =>
    [
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      INVITATION_JOB_COLLECTION,
    ] as const,
  invitationJobDoc: (organizerId: string, eventId: string, jobId: string) =>
    [
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      INVITATION_JOB_COLLECTION,
      jobId,
    ] as const,
  invitationBatchesCollection: (
    organizerId: string,
    eventId: string,
    jobId: string
  ) =>
    [
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      INVITATION_JOB_COLLECTION,
      jobId,
      INVITATION_BATCH_COLLECTION,
    ] as const,
  invitationBatchDoc: (
    organizerId: string,
    eventId: string,
    jobId: string,
    batchId: string
  ) =>
    [
      ORGANIZER_COLLECTION,
      organizerId,
      EVENT_COLLECTION,
      eventId,
      INVITATION_JOB_COLLECTION,
      jobId,
      INVITATION_BATCH_COLLECTION,
      batchId,
    ] as const,
};

