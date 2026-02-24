"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventSchema } from "../../lib/validations/event";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { createEvent } from "@workspace/database/event/post";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function EventCreateForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const router = useRouter(); // This line should be added above the onSubmit definition.
  const { user } = useAuth();

  const [domainOption, setDomainOption] = React.useState<"own" | "free">(
    "free"
  );
  const [ownDomain, setOwnDomain] = React.useState("");
  const [freeSubdomain, setFreeSubdomain] = React.useState("");

  React.useEffect(() => {
    const composed =
      domainOption === "own"
        ? ownDomain.trim()
        : freeSubdomain.trim()
          ? `${freeSubdomain.trim()}.eventup.lk`
          : "";
    setValue("domainName", composed, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [domainOption, ownDomain, freeSubdomain, setValue]);

  const onSubmit = async (data: EventSchema) => {
    console.log("Form data:", data);

    if (!user) {
      toast("Authentication Error", {
        description: "You must be logged in to create an event.",
      });
      return;
    }

    try {
      const composedDomain =
        domainOption === "own"
          ? ownDomain.trim()
          : `${freeSubdomain.trim()}.eventup.lk`;
      const res = await createEvent({
        name: data.name,
        date: data.date.toISOString(),
        location: data.location,
        description: data.description,
        organizerId: user?.uid,
        domainName: composedDomain,
        entrances: null,
        checkers: null,
        scannerAccess: "anyone-have-link",
      });

      if (res && res.eventId) {
        toast("Event Created", {
          description: "Your event has been successfully created.",
        });
        router.push(`/event/${res.eventId}`);
      } else {
        toast("Creation Failed", {
          description: "Failed to create event. No event ID returned.",
        });
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast("Error", {
        description: "Failed to create event. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Create Event</CardTitle>
        <CardDescription>
          Fill in the details to create a new event.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="rounded-md border bg-muted/40 p-3 text-sm text-muted-foreground">
            <p className="leading-relaxed">
              Why a domain? In order to create and share your registration form,
              your event needs a domain or subdomain where the form is hosted.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              placeholder="Enter event name"
              {...register("name")}
              className={
                errors.name
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : ""
              }
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              {...register("date", { valueAsDate: true })}
              className={
                errors.date
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : ""
              }
            />
            {errors.date && (
              <p className="text-sm text-destructive">{errors.date.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter location"
              {...register("location")}
              className={
                errors.location
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : ""
              }
            />
            {errors.location && (
              <p className="text-sm text-destructive">
                {errors.location.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Enter event description"
              {...register("description")}
              className={cn(
                "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                errors.description
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : ""
              )}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Domain Setup</Label>
            <div className="grid gap-3">
              <label className="flex items-start gap-3 rounded-md border p-3 cursor-pointer">
                <input
                  type="radio"
                  name="domain-option"
                  className="mt-1"
                  value="own"
                  checked={domainOption === "own"}
                  onChange={() => setDomainOption("own")}
                />
                <div className="flex-1">
                  <p className="font-medium">I have a domain/subdomain</p>
                  <p className="text-sm text-muted-foreground">
                    Enter your domain (e.g., example.com or reg.example.com). We
                    will contact you to configure DNS and hosting for your
                    registration form.
                  </p>
                  <div className="mt-2">
                    <Input
                      id="own-domain"
                      placeholder="your-domain.com"
                      value={ownDomain}
                      onChange={(e) => setOwnDomain(e.target.value)}
                      className={cn(
                        errors.domainName && domainOption === "own"
                          ? "border-destructive focus-visible:ring-destructive/20"
                          : ""
                      )}
                    />
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 rounded-md border p-3 cursor-pointer">
                <input
                  type="radio"
                  name="domain-option"
                  className="mt-1"
                  value="free"
                  checked={domainOption === "free"}
                  onChange={() => setDomainOption("free")}
                />
                <div className="flex-1">
                  <p className="font-medium">I don't have a domain</p>
                  <p className="text-sm text-muted-foreground">
                    Get a free subdomain on eventup.lk. Choose a name and your
                    registration form will be available at
                    <span className="mx-1 font-mono">[name].eventup.lk</span>.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      id="free-subdomain"
                      placeholder="your-name"
                      value={freeSubdomain}
                      onChange={(e) =>
                        setFreeSubdomain(
                          e.target.value
                            .replace(/[^a-z0-9-]/gi, "")
                            .toLowerCase()
                        )
                      }
                      className={cn(
                        errors.domainName && domainOption === "free"
                          ? "border-destructive focus-visible:ring-destructive/20"
                          : ""
                      )}
                    />
                    <span className="text-sm text-muted-foreground">
                      .eventup.lk
                    </span>
                  </div>
                  {freeSubdomain && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Preview:{" "}
                      <span className="font-mono">
                        {freeSubdomain}.eventup.lk
                      </span>
                    </p>
                  )}
                </div>
              </label>
            </div>
            {/* Hidden field bound to form for validation */}
            <input type="hidden" {...register("domainName")} />
            {errors.domainName && (
              <p className="text-sm text-destructive">
                {errors.domainName.message as string}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Event"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
