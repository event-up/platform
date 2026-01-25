"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Event } from "@workspace/models/db/Event";
import { fetchEventRegistrationByDomain } from "@/app/reg/actions";

export const useEventFromDomainQuery = (domain: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["event", domain],
    queryFn: async () => {
      const result = await fetchEventRegistrationByDomain(domain);

      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to fetch event");
      }

      return result.data;
    },
    enabled: !!domain,
    retry: 1,
  });

  console.log({ data, isLoading, error });

  return {
    event: data?.event,
    registrationForm: data?.registrationForm,
    isEventLoading: isLoading,
    eventError: error,
  };
};
