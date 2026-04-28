"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ArrowRight, ExternalLink, Copy, FileEdit, Loader2, Save, X } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { useGetRegistrationQuery } from "@/hooks/query/registration";
import { useRegistrationFormQuery } from "@/hooks/query/registration-form";
import {
  useCreateRegistrationFormMutation,
  useUpdateRegistrationFormMutation,
} from "@/hooks/mutation/registration-form";
import { Registration } from "@workspace/models/db/registration";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Switch } from "@workspace/ui/components/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { toast } from "sonner";
import { FormEditor } from "@workspace/surveyjs/lib/editor/components";
import { EditorState } from "@workspace/surveyjs/lib/models/types";
import { validateFormForSave } from "@workspace/surveyjs/lib/editor/utils/validation";
import { uploadImageToFirebaseStorage } from "@workspace/firebase/storage/store";

type RegistrationFormStatus = "active" | "inactive";

// ─── Collecting pill ──────────────────────────────────────────────────────────

const CollectingPill = ({
  status,
}: {
  status: RegistrationFormStatus | undefined;
}) => {
  const isCollecting = status === "active";
  return (
    <Badge
      variant="outline"
      className={
        isCollecting
          ? "border-green-200 bg-green-50 text-green-700"
          : "bg-muted text-muted-foreground"
      }
    >
      <span
        className={
          isCollecting
            ? "mr-2 inline-block h-2 w-2 rounded-full bg-green-600 animate-pulse"
            : "mr-2 inline-block h-2 w-2 rounded-full bg-muted-foreground"
        }
      />
      {isCollecting ? "Accepting responses" : "Paused"}
    </Badge>
  );
};

// ─── Stats row ────────────────────────────────────────────────────────────────

const StatsRow = ({
  totalCount,
  isLoading,
}: {
  totalCount: number;
  isLoading: boolean;
}) => {
  const value = isLoading ? "..." : totalCount;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total responses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Completion rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-foreground">—</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg. time to complete</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-foreground">—</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Last response</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-foreground">—</p>
        </CardContent>
      </Card>
    </div>
  );
};

// ─── Responses over time ──────────────────────────────────────────────────────

const ResponsesOverTime = () => (
  <Card>
    <CardHeader>
      <CardTitle>Responses over time</CardTitle>
      <CardDescription>Track response patterns and trends</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="rounded-md border border-dashed bg-muted/50 p-8 text-center text-sm text-muted-foreground">
        Response analytics coming soon
      </div>
    </CardContent>
  </Card>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const findFieldValueByPartialKey = (
  data: Registration["registrationData"] | undefined,
  matcher: RegExp,
) => {
  if (!data) return "-";
  const match = Object.entries(data).find(
    ([key, value]) =>
      matcher.test(key) &&
      (typeof value === "string" || typeof value === "number"),
  );
  if (!match) return "-";
  return String(match[1]);
};

const formatSubmittedTime = (value: string | undefined) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
};

const createSafeStorageFileName = (fileName: string) =>
  fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "") || "cover-image";

// ─── Latest responses ─────────────────────────────────────────────────────────

const LatestResponses = ({
  eventId,
  registrations,
  isLoading,
}: {
  eventId: string;
  registrations: Registration[];
  isLoading: boolean;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Latest responses</CardTitle>
      <CardDescription>Most recent form submissions</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  Loading responses...
                </TableCell>
              </TableRow>
            ) : registrations.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  No responses yet
                </TableCell>
              </TableRow>
            ) : (
              registrations.map((registration) => {
                const name = findFieldValueByPartialKey(
                  registration.registrationData,
                  /name/i,
                );
                const email = findFieldValueByPartialKey(
                  registration.registrationData,
                  /email/i,
                );
                return (
                  <TableRow key={registration.registrationId}>
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {email}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatSubmittedTime(registration.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      <Button variant="link" className="h-auto p-0" asChild>
        <Link href={`/event/${eventId}/participants`}>
          View all registrations
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

// ─── Share card ───────────────────────────────────────────────────────────────

const ShareCard = ({
  eventId,
  copied,
  onCopy,
}: {
  eventId: string;
  copied: boolean;
  onCopy: () => void;
}) => {
  const shareLink = `https://event.eventup.lk/${eventId}`;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share</CardTitle>
        <CardDescription>Send this link to collect registrations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border bg-muted/50 px-3 py-2 font-mono text-xs text-muted-foreground break-all">
          {shareLink}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Copied" : "Copy link"}
          </Button>
          <Button variant="outline" asChild>
            <a href={shareLink} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// ─── Collecting card ──────────────────────────────────────────────────────────

const CollectingCard = ({
  isCollecting,
  onToggle,
  isLoading,
}: {
  isCollecting: boolean;
  onToggle: (checked: boolean) => void;
  isLoading: boolean;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Collection settings</CardTitle>
      <CardDescription>Control whether form responses are accepted</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Collect responses</p>
          <p className="text-sm text-muted-foreground">
            {isCollecting
              ? "Responses are currently being accepted"
              : "Responses are currently paused"}
          </p>
        </div>
        <Switch
          checked={isCollecting}
          onCheckedChange={onToggle}
          disabled={isLoading}
          aria-label="Toggle response collection"
        />
      </div>
    </CardContent>
  </Card>
);

// ─── Form Editor Dialog ───────────────────────────────────────────────────────

const FormEditorDialog = ({
  onClose,
  initialState,
  onSave,
  onUploadCoverImage,
  isSaving,
}: {
  onClose: () => void;
  initialState: Partial<EditorState>;
  onSave: (state: EditorState) => Promise<void>;
  onUploadCoverImage: (file: File) => Promise<string>;
  isSaving: boolean;
}) => {
  const [currentFormState, setCurrentFormState] = useState<EditorState | null>(null);

  const handleSave = async () => {
    if (!currentFormState) return;
    const validation = validateFormForSave(currentFormState.fields);
    if (!validation.isValid) {
      toast.error("Form Validation Failed", { description: validation.message });
      return;
    }
    await onSave(currentFormState);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center"
      style={{ background: "rgba(17,24,39,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-[#F9FAFB] w-full max-w-[1100px] my-6 mx-4 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dialog header */}
        <div className="flex items-center justify-between px-6 h-14 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[8px] bg-[rgba(0,151,178,0.1)] text-[#0097B2] flex items-center justify-center">
              <FileEdit className="size-4" />
            </div>
            <div>
              <div className="text-[14px] font-semibold tracking-tight leading-tight">
                Edit registration form
              </div>
              <div className="text-[12px] text-slate-500">
                Changes are saved when you click Save.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose} disabled={isSaving}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => void handleSave()}
              disabled={isSaving || !currentFormState}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-auto p-6">
          <FormEditor
            initialState={initialState}
            onStateChange={setCurrentFormState}
            onUploadCoverImage={onUploadCoverImage}
          />
        </div>
      </div>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const RegistrationPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const [isCollecting, setIsCollecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    registrations: registrationForm,
    isRegistrationLoading: isRegistrationFormLoading,
  } = useRegistrationFormQuery(user?.uid || "", eventId);

  const {
    registrations: registrationList,
    isRegistrationLoading: isRegistrationsLoading,
  } = useGetRegistrationQuery(user?.uid || "", eventId, {
    lastDoc: null,
    pageSize: 5,
  });

  const {
    mutateAsync: updateRegistrationForm,
    isLoading: isRegistrationFormUpdateLoading,
  } = useUpdateRegistrationFormMutation();

  const { mutateAsync: createRegistrationForm } =
    useCreateRegistrationFormMutation();

  useEffect(() => {
    setIsCollecting(registrationForm?.status === "active");
  }, [registrationForm]);

  const latestResponses = registrationList?.data ?? [];
  const totalResponses = registrationList?.data?.length ?? 0;

  const handleSaveForm = useCallback(
    async (formState: EditorState) => {
      const registrationBranding = {
        coverImageUrl: formState.coverImageUrl || "",
        organizerName: formState.organizerName || "EventUp",
        organizerLogoUrl: formState.organizerLogoUrl || "",
      };

      setIsSaving(true);
      try {
        if (registrationForm?.registrationFormId) {
          await updateRegistrationForm({
            organizerId: user!.uid,
            eventId,
            formId: registrationForm.registrationFormId,
            formData: {
              authentication: [],
              formSchema: {
                description: formState.surveyDescription,
                title: formState.surveyTitle,
                fields: formState.fields,
                registrationBranding,
              },
              status: "active",
            },
          });
          toast.success("Form Updated", {
            description: "Your registration form has been updated successfully.",
          });
        } else {
          await createRegistrationForm({
            authentication: [],
            eventId,
            formSchema: {
              description: formState.surveyDescription,
              title: formState.surveyTitle,
              fields: formState.fields,
              registrationBranding,
            },
            organizerId: user!.uid,
            status: "active",
          });
          toast.success("Form Saved", {
            description: "Your registration form has been saved successfully.",
          });
        }
        setBuilderOpen(false);
      } catch (error) {
        toast.error("Save Failed", {
          description:
            (error as Error)?.message || "Failed to save registration form.",
        });
      } finally {
        setIsSaving(false);
      }
    },
    [registrationForm, user, eventId, updateRegistrationForm, createRegistrationForm],
  );

  const handleUploadCoverImage = useCallback(
    async (file: File) => {
      if (!user?.uid) {
        throw new Error("You need to be signed in to upload a cover image.");
      }

      const safeFileName = createSafeStorageFileName(file.name);
      const storagePath = [
        "Organizers",
        user.uid,
        "Events",
        eventId,
        "registration-cover",
        `${crypto.randomUUID()}-${safeFileName}`,
      ].join("/");

      return uploadImageToFirebaseStorage(file, storagePath);
    },
    [eventId, user?.uid],
  );

  const handleToggleCollection = async (checked: boolean) => {
    if (!user?.uid || !registrationForm?.registrationFormId) return;
    try {
      await updateRegistrationForm({
        organizerId: user.uid,
        eventId,
        formId: registrationForm.registrationFormId,
        formData: { status: checked ? "active" : "inactive" },
      });
      setIsCollecting(checked);
      toast.success(
        `Registration form ${checked ? "started" : "stopped"}`,
      );
    } catch (error) {
      toast.error("Failed to update registration form");
      console.error(error);
    }
  };

  const handleCopyLink = async () => {
    const shareLink = `https://event.eventup.lk/${eventId}`;
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      toast.error("Could not copy link");
      console.error(error);
    }
  };

  const editorInitialState: Partial<EditorState> = {
    surveyDescription: registrationForm?.formSchema.description,
    surveyTitle: registrationForm?.formSchema.title,
    fields: registrationForm?.formSchema.fields || [],
    coverImageUrl:
      registrationForm?.formSchema.registrationBranding?.coverImageUrl || "",
    organizerName:
      registrationForm?.formSchema.registrationBranding?.organizerName ||
      "EventUp",
    organizerLogoUrl:
      registrationForm?.formSchema.registrationBranding?.organizerLogoUrl || "",
  };

  return (
    <>
      <div className="space-y-0">
        {/* Header */}
        <div className="rounded-t-xl border bg-card px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Registration
                </h1>
                <CollectingPill status={registrationForm?.status} />
              </div>
              <p className="text-sm text-muted-foreground">
                Accepting responses at event.eventup.lk/{eventId}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setBuilderOpen(true)}>
                <FileEdit className="mr-2 h-4 w-4" />
                {registrationForm ? "Edit form" : "Create form"}
              </Button>
              {registrationForm && (
                <Button
                  variant={isCollecting ? "destructive" : "default"}
                  onClick={() => void handleToggleCollection(!isCollecting)}
                  disabled={isRegistrationFormUpdateLoading}
                >
                  {isCollecting ? "Stop collecting" : "Start collecting"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="rounded-b-xl border border-t-0 bg-background p-6">
          {!registrationForm ? (
            <Card className="border-2">
              <CardContent className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                <h2 className="text-xl font-semibold">No registration form yet</h2>
                <p className="max-w-xl text-sm text-muted-foreground">
                  Create a form to start collecting attendee details for this event.
                </p>
                <Button onClick={() => setBuilderOpen(true)}>Create form</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-8">
                <StatsRow
                  totalCount={totalResponses}
                  isLoading={isRegistrationsLoading || isRegistrationFormLoading}
                />
                <ResponsesOverTime />
                <LatestResponses
                  eventId={eventId}
                  registrations={latestResponses}
                  isLoading={isRegistrationsLoading}
                />
              </div>

              <div className="space-y-6 lg:col-span-4 lg:sticky lg:top-6 lg:self-start">
                <ShareCard
                  eventId={eventId}
                  copied={copied}
                  onCopy={handleCopyLink}
                />
                <CollectingCard
                  isCollecting={isCollecting}
                  isLoading={isRegistrationFormUpdateLoading}
                  onToggle={(checked) => void handleToggleCollection(checked)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form editor dialog */}
      {builderOpen && (
        <FormEditorDialog
          onClose={() => !isSaving && setBuilderOpen(false)}
          initialState={editorInitialState}
          onSave={handleSaveForm}
          onUploadCoverImage={handleUploadCoverImage}
          isSaving={isSaving}
        />
      )}
    </>
  );
};

export default RegistrationPage;
