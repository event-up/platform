"use client";

/**
 * Main Form Editor Component
 * Single-column layout: header + fields with inline "Add question" dropdown.
 * Designed to be embedded inside a dialog/modal.
 */

import React, { useEffect, useRef, useState } from "react";
import { useEditorState } from "../hooks/useEditorState";
import { EditorState } from "../../models/types";
import { FieldList } from "./FieldList";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import { Textarea } from "@workspace/ui/components/textarea";
import { AlertTriangle, Building2, Image as ImageLogo, Link, Loader2 } from "lucide-react";

interface FormEditorProps {
  initialState?: Partial<EditorState>;
  onStateChange?: (state: EditorState) => void;
  onSaveClick?: (state: EditorState) => Promise<void>;
  onUploadCoverImage?: (file: File) => Promise<string>;
  showValidationWarnings?: boolean;
}

export const FormEditor: React.FC<FormEditorProps> = ({
  initialState,
  onStateChange,
  onUploadCoverImage,
  showValidationWarnings = true,
}) => {
  const {
    state,
    operations,
    updateSurveyMeta,
    updateBrandingMeta,
    validation,
  } = useEditorState(initialState);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [state, onStateChange]);

  return (
    <div className="flex flex-col gap-3">
      {showValidationWarnings && !validation.isValid && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{validation.message}</AlertDescription>
        </Alert>
      )}

      <RegistrationTitleCard
        title={state.surveyTitle}
        description={state.surveyDescription}
        coverImageUrl={state.coverImageUrl || ""}
        organizerName={state.organizerName || "EventUp"}
        organizerLogoUrl={state.organizerLogoUrl || ""}
        onUpdateTitle={(title) => updateSurveyMeta({ title })}
        onUpdateDescription={(description) => updateSurveyMeta({ description })}
        onUpdateCoverImageUrl={(coverImageUrl) =>
          updateBrandingMeta({ coverImageUrl })
        }
        onUpdateOrganizerName={(organizerName) =>
          updateBrandingMeta({ organizerName })
        }
        onUpdateOrganizerLogoUrl={(organizerLogoUrl) =>
          updateBrandingMeta({ organizerLogoUrl })
        }
        onUploadCoverImage={onUploadCoverImage}
      />

      {/* Questions divider */}
      {state.fields.length > 0 && (
        <div className="flex items-center gap-3 pt-1">
          <div className="flex-1 h-px bg-slate-200" />
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Questions
          </div>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      )}

      <FieldList
        fields={state.fields}
        selectedFieldId={state.selectedFieldId}
        onSelectField={operations.selectField}
        onRemoveField={operations.removeField}
        onReorderFields={operations.reorderFields}
        onAddField={operations.addField}
        onUpdateField={operations.updateField}
      />
    </div>
  );
};

interface RegistrationTitleCardProps {
  title: string;
  description: string;
  coverImageUrl: string;
  organizerName: string;
  organizerLogoUrl: string;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
  onUpdateCoverImageUrl: (coverImageUrl: string) => void;
  onUpdateOrganizerName: (organizerName: string) => void;
  onUpdateOrganizerLogoUrl: (organizerLogoUrl: string) => void;
  onUploadCoverImage?: (file: File) => Promise<string>;
}

const RegistrationTitleCard: React.FC<RegistrationTitleCardProps> = ({
  title,
  description,
  coverImageUrl,
  organizerName,
  organizerLogoUrl,
  onUpdateTitle,
  onUpdateDescription,
  onUpdateCoverImageUrl,
  onUpdateOrganizerName,
  onUpdateOrganizerLogoUrl,
  onUploadCoverImage,
}) => {
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingCoverImage, setIsUploadingCoverImage] = useState(false);
  const [coverImageUploadError, setCoverImageUploadError] = useState<
    string | null
  >(null);

  const handleCoverImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setCoverImageUploadError("Please choose an image file.");
      return;
    }

    if (!onUploadCoverImage) {
      setCoverImageUploadError(
        "Cover image upload is not configured. Paste an image URL below.",
      );
      return;
    }

    setCoverImageUploadError(null);
    setIsUploadingCoverImage(true);

    try {
      const uploadedImageUrl = await onUploadCoverImage(file);
      onUpdateCoverImageUrl(uploadedImageUrl);
    } catch (error) {
      setCoverImageUploadError(
        (error as Error)?.message || "Failed to upload cover image.",
      );
    } finally {
      setIsUploadingCoverImage(false);
    }
  };

  const openCoverImagePicker = () => {
    if (!isUploadingCoverImage) {
      coverImageInputRef.current?.click();
    }
  };

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-slate-200 bg-white py-0 shadow-sm">
      <CardContent className="flex flex-col gap-0 p-0">
        <input
          ref={coverImageInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => void handleCoverImageSelect(event)}
        />

        {/* Cover image — edge-to-edge */}
        <div className="h-48 w-full overflow-hidden bg-slate-100 md:h-56">
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt="Event cover"
              className="h-full w-full object-cover"
            />
          ) : (
            <button
              type="button"
              onClick={openCoverImagePicker}
              disabled={isUploadingCoverImage}
              className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-50 via-white to-[rgba(0,151,178,0.08)] px-6 text-center text-slate-500 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097B2] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-xs">
                {isUploadingCoverImage ? (
                  <Loader2 className="size-6 animate-spin" />
                ) : (
                  <ImageLogo className="size-6" />
                )}
              </span>
              <span className="text-sm font-medium">
                {isUploadingCoverImage
                  ? "Uploading cover image..."
                  : "Add an event cover image"}
              </span>
            </button>
          )}
        </div>

        {/* Change cover bar — only when image is set */}
        {coverImageUrl && (
          <div className="flex justify-end border-b border-slate-100 px-4 py-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openCoverImagePicker}
              disabled={isUploadingCoverImage}
            >
              {isUploadingCoverImage ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ImageLogo className="size-4" />
              )}
              Change cover image
            </Button>
          </div>
        )}

        {coverImageUploadError && (
          <p className="px-6  pt-2 text-sm text-destructive">
            {coverImageUploadError}
          </p>
        )}
        {/* Title / description */}
        <div className="flex flex-col gap-5 px-6 py-5">
          <div className="flex flex-col gap-3">
            <Input
              value={title}
              size={2}
              onChange={(e) => onUpdateTitle(e.target.value)}
              placeholder="Form title"
              className="rounded-none border-0 border-b border-b-transparent bg-transparent px-0 md:text-3xl shadow-none focus-visible:border-b-primary focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Textarea
              rows={2}
              value={description}
              onChange={(e) => onUpdateDescription(e.target.value)}
              placeholder="Add a short description for attendees..."
              className="min-h-14 resize-none rounded-none border-0 border-b border-b-transparent bg-transparent p-1 text-base text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:border-b-primary focus-visible:ring-0"
            />
          </div>
        </div>

        <Separator />

        {/* Hosted by */}
        <div className="bg-slate-50/80 px-6 py-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Hosted by
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-400">
              {organizerLogoUrl ? (
                <img
                  src={organizerLogoUrl}
                  alt="Organizer logo"
                  className="h-full w-full object-contain p-1.5"
                />
              ) : (
                <Building2 className="size-5" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <Input
                value={organizerName}
                onChange={(e) => onUpdateOrganizerName(e.target.value)}
                placeholder="Organizer name"
                className="h-auto border-0 bg-transparent px-0 py-0 text-sm font-semibold text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0"
              />
              <p className="mt-1 text-xs text-slate-500">
                Shown below the form title on the registration page.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
