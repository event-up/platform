"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * The form editor now lives inside a dialog on the Registration page.
 * Redirect anyone landing here directly.
 */
const CreateRegistrationFormPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const router = useRouter();

  useEffect(() => {
    router.replace(`/event/${eventId}/registration`);
  }, [eventId, router]);

  return null;
};

export default CreateRegistrationFormPage;
