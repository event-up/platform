"use client";

import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { toast } from "sonner";
import { createRegistration } from "@workspace/database/registration/post";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

// Zod validation schema
const participantSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  foodPreference: z.string().min(1, "Food preference is required"),
});

type ParticipantFormData = z.infer<typeof participantSchema>;

export function ParticipantCreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ParticipantFormData>({
    resolver: zodResolver(participantSchema),
  });
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const onSubmit = async (data: ParticipantFormData) => {
    try {
      console.log("Participant data:", data);
      if (!user?.uid) return;
      const res = await createRegistration({
        eventId,
        organizerId: user?.uid || "",
        registrationData: data,
        status: "registered",
      });
      // TODO: Implement API call to create participant
      toast.success("Participant Created", {
        description: "The participant has been successfully added.",
      });
      reset();
    } catch (error) {
      console.error("Error creating participant:", error);
      toast.error("Error", {
        description: "Failed to create participant. Please try again.",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Participant
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Participant</SheetTitle>
          <SheetDescription>
            Add a new participant to this event.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 px-12 space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter participant name"
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="participant@example.com"
              {...register("email")}
              className={
                errors.email
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : ""
              }
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("phone")}
              className={
                errors.phone
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : ""
              }
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="foodPreference">Food Preference</Label>
            <Input
              id="foodPreference"
              placeholder="e.g., Vegetarian, Vegan, No preference"
              {...register("foodPreference")}
              className={
                errors.foodPreference
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : ""
              }
            />
            {errors.foodPreference && (
              <p className="text-sm text-destructive">
                {errors.foodPreference.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Participant"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
