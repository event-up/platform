"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { FileEdit, Users, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useGetRegistrationQuery } from "@/hooks/query/registration";
import { toast } from "sonner";

/**
 * Registration Form Management Page
 * Features:
 *  - View registration form status
 *  - View total registration count
 *  - Edit registration form fields
 *  - Show empty state when no form exists
 */
const RegistrationPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [hasForm, setHasForm] = useState(false);

  // Fetch registrations to get count
  const { registrations, isRegistrationLoading } = useGetRegistrationQuery(
    user?.uid || "",
    eventId,
    { lastDoc: null, pageSize: 1000 }
  );

  const registrationCount = registrations?.data?.length || 0;

  useEffect(() => {
    // TODO: Check if a registration form exists for this event
    // For now, we'll simulate this check
    // In production, fetch form configuration from database
    setHasForm(false);
  }, [eventId]);

  const handleEditForm = () => {
    router.push(`/event/${eventId}/registration/create`);
  };

  const handleCreateForm = () => {
    router.push(`/event/${eventId}/registration/create`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Registration Form
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your event registration form and view statistics
          </p>
        </div>
        {hasForm && (
          <Button onClick={handleEditForm}>
            <FileEdit className="mr-2 h-4 w-4" />
            Edit Form
          </Button>
        )}
      </div>

      {/* Statistics Card */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Registrations
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isRegistrationLoading ? "..." : registrationCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              People registered for this event
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Form Status</CardTitle>
            <FileEdit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hasForm ? "Active" : "Not Created"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {hasForm
                ? "Registration form is live"
                : "No registration form configured"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Form Status Section */}
      {!hasForm ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-3 mb-4">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              No Registration Form Found
            </h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Create a registration form to start collecting participant
              information for your event. You can customize fields to match your
              requirements.
            </p>
            <Button onClick={handleCreateForm} size="lg">
              <FileEdit className="mr-2 h-4 w-4" />
              Create Registration Form
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Registration Form Preview</CardTitle>
            <CardDescription>
              This is how your registration form appears to participants
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: Add form preview component */}
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <p className="text-muted-foreground">
                Form preview will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RegistrationPage;
