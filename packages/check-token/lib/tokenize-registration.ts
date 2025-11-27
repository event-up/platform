const generateRegistrationToken = (
  registrationId: string,
  eventId: string,
  organizerId: string
) => {
  return {
    o: organizerId,
    e: eventId,
    r: registrationId,
  };
};
