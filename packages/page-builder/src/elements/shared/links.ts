import type { EventPageMetadata } from "../../types";

export function getRegistrationHref(
  href: string | undefined,
  metadata?: EventPageMetadata,
) {
  return href || metadata?.registrationHref || "/reg";
}
