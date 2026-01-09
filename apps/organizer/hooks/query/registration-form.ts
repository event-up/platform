import { getRegistrationForm } from "@workspace/database/registration-form/get";
import { useQuery } from "react-query";

export const useRegistrationFormQuery = (
  organizerId: string,
  eventId: string
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["registration-form", eventId],
    initialData: null,
    queryFn: async () => {
      const res = await getRegistrationForm(organizerId, eventId);
      return res;
    },
    onError(err) {},
  });
  console.log("useRegistrationFormQuery:", { data });

  return {
    registrations: data ?? null,
    isRegistrationLoading: isLoading,
    registrationError: error,
  };
};
