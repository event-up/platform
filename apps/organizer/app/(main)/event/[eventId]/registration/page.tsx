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
import { useRegistrationFormQuery } from "@/hooks/query/registration-form";
import { useUpdateRegistrationFormMutation } from "@/hooks/mutation/registration-form";
import { set } from "zod";

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
  const [isCollecting, setIsCollecting] = useState(false);

  // Fetch registrations to get count
  const { registrations, isRegistrationLoading } = useRegistrationFormQuery(
    user?.uid || "",
    eventId,
  );

  const {
    mutateAsync: updateRegistrationForm,
    isLoading: isRegistrationFormUpdateLoading,
  } = useUpdateRegistrationFormMutation();

  console.log({ registrations });

  useEffect(() => {
    if (registrations?.status === "active") {
      setIsCollecting(true);
      return;
    }
    setIsCollecting(false);
  }, [registrations]);

  const handleEditForm = () => {
    router.push(`/event/${eventId}/registration/create`);
  };

  const handleCreateForm = () => {
    router.push(`/event/${eventId}/registration/create`);
  };

  const handleToggleCollection = async () => {
    if (!user?.uid || !registrations?.registrationFormId) return;
    const newCollectingState = !isCollecting;

    try {
      await updateRegistrationForm({
        organizerId: user.uid,
        eventId,
        formId: registrations.registrationFormId,
        formData: {
          status: newCollectingState ? "active" : "inactive",
        },
      });

      setIsCollecting(newCollectingState);
      const status = newCollectingState ? "started" : "stopped";
      toast.success(`Registration form ${status}`);
    } catch (error) {
      toast.error("Failed to update registration form");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registration</h1>
        <p className="text-muted-foreground mt-2">
          Manage your event registration form
        </p>
      </div>

      {/* Form Status Section */}
      {!registrations ? (
        <Card className="border-2">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-3 mb-4">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No Registration Form configured
            </h3>
            <Button onClick={handleCreateForm} size="lg" variant="outline">
              Create Form
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Main Form Card */}
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold">
                      {registrations.formSchema.title}
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditForm}
                    >
                      <FileEdit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your registration form is collecting responses
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    event.eventup.lk/{eventId}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={isCollecting ? "default" : "outline"}
                    size="sm"
                    onClick={handleToggleCollection}
                  >
                    {isCollecting ? "stop" : "start"}
                  </Button>
                  {isCollecting ? (
                    <div className="flex items-center gap-2 ml-2 px-3 py-1 bg-green-50 border border-green-200 rounded-md">
                      <span className="text-xs font-medium text-green-700">
                        Collecting Responses
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 ml-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded-md">
                      <span className="text-xs font-medium text-gray-700">
                        Not Collecting Responses
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Form Opened
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Registrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isRegistrationLoading ? "..." : 0}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default RegistrationPage;
