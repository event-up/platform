"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { InvitationJob } from "@workspace/models/db/invitations";
import { useMutation } from "react-query";
import { createInvitationJob } from "@workspace/database/invitation-job/post"

interface JobCreateFormProps {
  onJobCreated?: () => void;
}

type ChannelType = "SMS" | "EMAIL";

export function JobCreateForm({ onJobCreated }: JobCreateFormProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [jobName, setJobName] = useState("");
  const [recipientsReference, setRecipientsReference] = useState("");
  const [channelType, setChannelType] = useState<ChannelType>("EMAIL");
  const [messageTemplate, setMessageTemplate] = useState("");
  const [smsMaskId, setSmsMaskId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { eventId } = useParams<{ eventId: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement job creation logic with createInvitationJob
      const jobData: InvitationJob = {
        eventId,
        jobName,
        status: "created" as const,
        completedCount: 0,
        failedCount: 0,
        recipientsReference,
        notifyChannel: {
          channelType,
          messageTemplate,
          ...(channelType === "SMS" && { smsMaskId }),
        },
      };

      if(user?.uid){
        const result = createInvitationJob(user?.uid,jobData)
        
      }

      console.log("Creating new invitation job...", jobData);
      
      // Reset form
      setJobName("");
      setRecipientsReference("");
      setMessageTemplate("");
      setSmsMaskId("");
      setOpen(false);
      onJobCreated?.();
    } catch (error) {
      console.error("Error creating invitation job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="size-4 mr-2" />
          Create New Job
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create Invitation Job</SheetTitle>
          <SheetDescription>
            Set up a new invitation sending job for your event
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="jobName">Job Name</Label>
            <Input
              id="jobName"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder="e.g., Initial Invitations - VIP List"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientsReference">Recipients Reference</Label>
            <Input
              id="recipientsReference"
              value={recipientsReference}
              onChange={(e) => setRecipientsReference(e.target.value)}
              placeholder="e.g., path/to/recipients/list or collection reference"
              required
            />
            <p className="text-xs text-muted-foreground">
              Reference to the recipients list (e.g., Firestore collection path)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="channelType">Notification Channel</Label>
            <Select
              value={channelType}
              onValueChange={(value) => setChannelType(value as ChannelType)}
            >
              <SelectTrigger id="channelType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EMAIL">Email</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {channelType === "SMS" && (
            <div className="space-y-2">
              <Label htmlFor="smsMaskId">SMS Mask ID</Label>
              <Input
                id="smsMaskId"
                value={smsMaskId}
                onChange={(e) => setSmsMaskId(e.target.value)}
                placeholder="Enter SMS mask ID"
                required
              />
              <p className="text-xs text-muted-foreground">
                The sender ID that will appear on SMS messages
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="messageTemplate">Message Template</Label>
            <Textarea
              id="messageTemplate"
              value={messageTemplate}
              onChange={(e) => setMessageTemplate(e.target.value)}
              placeholder={
                channelType === "EMAIL"
                  ? "Dear {name},\n\nYou are invited to {eventName}...\n\nUse variables like {name}, {eventName}, {date}"
                  : "Hi {name}, you're invited to {eventName}. RSVP: {link}"
              }
              rows={6}
              required
            />
            <p className="text-xs text-muted-foreground">
              Use placeholders like {"{name}"}, {"{eventName}"}, {"{date}"}, {"{link}"}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Job"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
