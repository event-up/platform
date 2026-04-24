import { Registration } from "@workspace/models";

const generateRegistrationToken = (
  registrationId: string,
  eventId: string,
  organizerId: string,
) => {
  return {
    o: organizerId,
    e: eventId,
    r: registrationId,
  };
};

const getSignedToken = (registration: Registration) => {
  const payload = `${registration.organizerId}:${registration.eventId}:${registration.registrationId}`;
};
