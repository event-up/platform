"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@workspace/ui/components/sheet";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import {
  Registration,
  ParticipantStatus,
} from "@workspace/models/db/registration";
import { FormField } from "@workspace/models/dynamic-form";
import { useUpdateRegistrationStatusMutation } from "@/hooks/mutation/registration";
import { Ban, CheckCircle, UserCheck, UserX } from "lucide-react";

interface ParticipantDrawerProps {
  participant: Registration | null;
  formFields: FormField[];
  organizerId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusConfig: Record<
  ParticipantStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  registered: { label: "Registered", variant: "default" },
  "self-cancelled": { label: "Self Cancelled", variant: "secondary" },
  blocked: { label: "Blocked", variant: "destructive" },
  "checked-in": { label: "Checked In", variant: "outline" },
};

export function ParticipantDrawer({
  participant,
  formFields,
  organizerId,
  open,
  onOpenChange,
}: ParticipantDrawerProps) {
  const updateStatusMutation = useUpdateRegistrationStatusMutation();

  if (!participant) return null;

  const currentStatus = participant.status;
  const isBlocked = currentStatus === "blocked";
  const isCheckedIn = currentStatus === "checked-in";

  const handleBlockToggle = () => {
    const newStatus: ParticipantStatus = isBlocked ? "registered" : "blocked";
    updateStatusMutation.mutate({
      organizerId,
      eventId: participant.eventId,
      registrationId: participant.registrationId,
      status: newStatus,
    });
  };

  const handleCheckIn = () => {
    updateStatusMutation.mutate({
      organizerId,
      eventId: participant.eventId,
      registrationId: participant.registrationId,
      status: "checked-in",
    });
  };

  const formatValue = (value: unknown): string => {
    if (value === undefined || value === null) return "-";
    if (Array.isArray(value)) return value.join(", ");
    return String(value);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Participant Details</SheetTitle>
          <SheetDescription>
            View and manage participant information
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Status:
            </span>
            <Badge variant={statusConfig[currentStatus]?.variant || "default"}>
              {statusConfig[currentStatus]?.label || currentStatus}
            </Badge>
          </div>

          <Separator />

          {/* Registration Data */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Registration Information</h3>
            <dl className="space-y-3">
              {formFields.map((field) => (
                <div key={field.id} className="flex flex-col gap-1">
                  <dt className="text-sm font-medium text-muted-foreground">
                    {field.label}
                  </dt>
                  <dd className="text-sm">
                    {formatValue(participant.registrationData?.[field.id])}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Separator />

          {/* Contact Channels */}
          {participant.contactChannels?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Contact Channels</h3>
              <dl className="space-y-3">
                {participant.contactChannels.map((channel, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <dt className="text-sm font-medium text-muted-foreground">
                      {channel.type}
                    </dt>
                    <dd className="text-sm">{channel.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <Separator />

          {/* Metadata */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Metadata</h3>
            <dl className="space-y-3">
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-medium text-muted-foreground">
                  Registration ID
                </dt>
                <dd className="font-mono text-xs">
                  {participant.registrationId}
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-medium text-muted-foreground">
                  Created At
                </dt>
                <dd className="text-sm">
                  {participant.createdAt
                    ? new Date(participant.createdAt).toLocaleString()
                    : "-"}
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-medium text-muted-foreground">
                  Updated At
                </dt>
                <dd className="text-sm">
                  {participant.updatedAt
                    ? new Date(participant.updatedAt).toLocaleString()
                    : "-"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <SheetFooter className="flex-col gap-2 sm:flex-col">
          {/* Check In Button - only show if not checked in and not blocked */}
          {!isCheckedIn && !isBlocked && (
            <Button
              onClick={handleCheckIn}
              disabled={updateStatusMutation.isLoading}
              className="w-full"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Check In
            </Button>
          )}

          {/* Already checked in indicator */}
          {isCheckedIn && (
            <Button variant="outline" disabled className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" />
              Already Checked In
            </Button>
          )}

          {/* Block/Unblock Button */}
          <Button
            variant={isBlocked ? "outline" : "destructive"}
            onClick={handleBlockToggle}
            disabled={updateStatusMutation.isLoading}
            className="w-full"
          >
            {isBlocked ? (
              <>
                <UserX className="mr-2 h-4 w-4" />
                Unblock Participant
              </>
            ) : (
              <>
                <Ban className="mr-2 h-4 w-4" />
                Block Participant
              </>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
