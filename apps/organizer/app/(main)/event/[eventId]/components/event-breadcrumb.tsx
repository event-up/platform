"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";

import { useAuth } from "@/lib/auth-context";
import { useEventQuery } from "@/hooks/query/event";

// Map route segments to human-readable labels
const SEGMENT_LABELS: Record<string, string> = {
  checkers: "Checkers & Entrances",
  participants: "Participants",
  invitations: "Invitations",
  registration: "Registration",
};

export function EventBreadcrumb() {
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const pathname = usePathname();

  const { event } = useEventQuery(eventId, user?.uid ?? "");

  // Build breadcrumb items from the path segments after [eventId]
  // e.g. /event/abc123/checkers => ["checkers"]
  const segments = pathname.split(`/event/${eventId}`)[1]?.split("/").filter(Boolean) ?? [];

  const eventName = event?.name ?? "Event";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Root — Events list */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Events</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {/* Event name */}
        {segments.length === 0 ? (
          <BreadcrumbItem>
            <BreadcrumbPage>{eventName}</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/event/${eventId}`}>{eventName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {/* Sub-page segments */}
        {segments.map((segment, i) => {
          const isLast = i === segments.length - 1;
          const label = SEGMENT_LABELS[segment] ?? segment;

          return (
            <span key={segment} className="contents">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/event/${eventId}/${segments.slice(0, i + 1).join("/")}`}
                    >
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
