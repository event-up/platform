"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { FormField, FieldType } from "@workspace/models/dynamic-form";
import {
  Trash2,
  ChevronUp,
  ChevronDown,
  Lock,
  Type,
  AlignLeft,
  CheckSquare,
  Circle,
  Phone,
  Mail,
  Calendar,
  X,
  Plus,
} from "lucide-react";
import { CONTACT_CHANNEL_FIELDS } from "../constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Badge } from "@workspace/ui/components/badge";
import { Switch } from "@workspace/ui/components/switch";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";

const TYPE_ICONS: Record<FieldType, React.ReactNode> = {
  text: <Type className="size-3.5" />,
  textarea: <AlignLeft className="size-3.5" />,
  select: <Circle className="size-3.5" />,
  multiselect: <CheckSquare className="size-3.5" />,
  date: <Calendar className="size-3.5" />,
  phone: <Phone className="size-3.5" />,
  email: <Mail className="size-3.5" />,
};

const TYPE_LABELS: Record<FieldType, string> = {
  text: "Short answer",
  textarea: "Long answer",
  select: "Multiple choice",
  multiselect: "Checkboxes",
  date: "Date",
  phone: "Phone",
  email: "Email",
};

function FieldPreview({ field }: { field: FormField }) {
  const inputBase =
    "w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-[#F4F6F8] text-[14px] text-[#98A2B3] outline-none pointer-events-none";

  if (field.type === "textarea") {
    return (
      <textarea
        disabled
        rows={3}
        placeholder={field.placeholder || "Long answer text"}
        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F4F6F8] text-[14px] text-[#98A2B3] resize-none pointer-events-none"
      />
    );
  }

  if (field.type === "select" || field.type === "multiselect") {
    const isMulti = field.type === "multiselect";
    const shape = isMulti ? "rounded-[4px]" : "rounded-full";
    const options = field.options?.slice(0, 3) ?? [];
    return (
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className={cn(
                "w-[18px] h-[18px] border-2 border-[#D1D5DB] bg-white shrink-0",
                shape,
              )}
            />
            <span className="text-[14px] text-[#344054]">{opt.label}</span>
          </div>
        ))}
        {(field.options?.length ?? 0) > 3 && (
          <div className="text-[12px] text-[#9CA3AF] pl-7">
            + {(field.options?.length ?? 0) - 3} more options
          </div>
        )}
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <input
        disabled
        placeholder="dd / mm / yyyy"
        className={cn(inputBase, "w-64")}
      />
    );
  }

  return (
    <input
      disabled
      placeholder={field.placeholder || "Answer"}
      className={inputBase}
    />
  );
}

interface OptionsEditorProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
}

function OptionsEditor({ field, onUpdate }: OptionsEditorProps) {
  const options = field.options ?? [];
  const isMulti = field.type === "multiselect";
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const pendingFocusRef = useRef<number | null>(null);

  useEffect(() => {
    if (pendingFocusRef.current !== null) {
      const idx = pendingFocusRef.current;
      inputRefs.current[idx]?.focus();
      inputRefs.current[idx]?.select();
      pendingFocusRef.current = null;
    }
  });

  const updateLabel = (idx: number, label: string) => {
    onUpdate({
      options: options.map((o, i) => (i === idx ? { ...o, label } : o)),
    });
  };

  const addOption = () => {
    const n = options.length + 1;
    pendingFocusRef.current = options.length;
    onUpdate({
      options: [...options, { label: `Option ${n}`, value: `option_${n}` }],
    });
  };

  const removeOption = (idx: number) => {
    onUpdate({ options: options.filter((_, i) => i !== idx) });
  };

  const shape = isMulti ? "rounded-[4px]" : "rounded-full";

  return (
    <div className="space-y-3 mt-1" onClick={(e) => e.stopPropagation()}>
      {/* Type toggle */}
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={!isMulti ? "default" : "outline"}
          className="h-7 text-xs rounded-xl gap-1.5"
          onClick={() => onUpdate({ type: "select" })}
        >
          <Circle className="size-3" />
          Multiple choice
        </Button>
        <Button
          type="button"
          size="sm"
          variant={isMulti ? "default" : "outline"}
          className="h-7 text-xs rounded-xl gap-1.5"
          onClick={() => onUpdate({ type: "multiselect" })}
        >
          <CheckSquare className="size-3" />
          Checkboxes
        </Button>
      </div>

      {/* Options list */}
      <div className="space-y-2">
        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <span
              className={cn(
                "w-[16px] h-[16px] border-2 border-[#D1D5DB] bg-white shrink-0",
                shape,
              )}
            />
            <input
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              value={opt.label}
              onChange={(e) => updateLabel(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              className="flex-1 text-[14px] text-[#344054] bg-transparent border-b border-transparent hover:border-[#D1D5DB] focus:border-primary outline-none py-0.5 transition-colors placeholder:text-[#98A2B3]"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={options.length <= 1}
              onClick={() => removeOption(idx)}
              className="shrink-0 text-[#9CA3AF] hover:text-destructive hover:bg-destructive/10"
            >
              <X className="size-3.5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add option */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-[#667085] hover:text-primary h-8 px-2 text-[13px] gap-1.5"
        onClick={addOption}
      >
        <Plus className="size-3.5" />
        Add option
      </Button>
    </div>
  );
}

interface FieldItemProps {
  field: FormField;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onUpdate: (updates: Partial<FormField>) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const FieldItem: React.FC<FieldItemProps> = ({
  field,
  index,
  isSelected,
  onSelect,
  onRemove,
  onUpdate,
  onMoveUp,
  onMoveDown,
}) => {
  const [localLabel, setLocalLabel] = useState(field.label);

  useEffect(() => {
    setLocalLabel(field.label);
  }, [field.label]);

  const isLocked = (CONTACT_CHANNEL_FIELDS as FieldType[]).includes(field.type);
  const qNum = `Q${String(index + 1).padStart(2, "0")}`;

  const handleLabelBlur = () => {
    onUpdate({ label: localLabel });
  };

  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative bg-white rounded-2xl border transition-all duration-150",
        isSelected
          ? "border-primary shadow-[0_10px_28px_-18px_rgba(0,151,178,0.7)]"
          : "",
        isLocked ? "cursor-default" : "cursor-pointer",
      )}
    >
      {isSelected && (
        <>
          <span className="absolute left-0 inset-y-4 w-[4px] bg-primary rounded-r-full pointer-events-none" />
          <span className="absolute right-0 inset-y-4 w-[4px] bg-[#23A3BE] rounded-l-full pointer-events-none" />
        </>
      )}
      <div className="p-6">
        {/* Top row: Q number | content column */}
        <div className="flex items-start gap-3">
          <span className="text-[13px] font-semibold text-[#98A2B3] mt-[8px] tabular-nums shrink-0 select-none">
            {qNum}
          </span>

          {/* Content column */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Line 1: label input + System badge + Type badge — wraps on narrow screens */}
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={localLabel}
                onChange={(e) => setLocalLabel(e.target.value)}
                onBlur={handleLabelBlur}
                onClick={(e) => e.stopPropagation()}
                onFocus={() => onSelect()}
                placeholder="Question"
                className={cn(
                  "flex-1 min-w-[120px] text-[15px] font-semibold leading-[1.2] text-[#101828] bg-transparent outline-none focus:ring-0 placeholder:text-[#98A2B3] pb-0.5",
                  isSelected && "border-b border-primary",
                )}
              />

              {/* System badge */}
              {isLocked && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className="border-[rgba(35,163,190,0.28)] bg-[rgba(35,163,190,0.09)] text-[#027A92] cursor-default"
                    >
                      <Lock className="size-3" />
                      System
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    Required to send QR invites and check-in reminders. Label
                    can be renamed.
                  </TooltipContent>
                </Tooltip>
              )}

              {/* Type badge */}
              <Badge
                variant="outline"
                className="text-[#344054] bg-[#F9FAFB] border-[#D0D5DD] rounded-[10px]"
              >
                <span className="text-[#667085]">{TYPE_ICONS[field.type]}</span>
                {TYPE_LABELS[field.type] || field.type}
              </Badge>
            </div>

            {/* Description / help text */}
            {field.description && (
              <p className="text-[14px] text-[#667085]">{field.description}</p>
            )}

            {/* Field preview / options editor */}
            {isSelected &&
            (field.type === "select" || field.type === "multiselect") ? (
              <OptionsEditor field={field} onUpdate={onUpdate} />
            ) : (
              <FieldPreview field={field} />
            )}
          </div>
        </div>

        {/* Bottom toolbar (selected only) */}
        {isSelected && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-5 pt-4 border-t border-[#EAECF0] flex items-center justify-between gap-3"
          >
            {/* Required toggle */}
            <label className="inline-flex items-center gap-2 text-[14px] text-[#101828] select-none cursor-pointer">
              <Switch
                size="sm"
                checked={!!field.required}
                onCheckedChange={(checked) => {
                  if (!isLocked) onUpdate({ required: checked });
                }}
                disabled={isLocked}
              />
              Required
            </label>

            {/* Move + delete */}
            <div className="flex items-center gap-1 text-[#667085]">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                title="Move up"
                disabled={isLocked || !onMoveUp}
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveUp?.();
                }}
              >
                <ChevronUp className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                title="Move down"
                disabled={isLocked || !onMoveDown}
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveDown?.();
                }}
              >
                <ChevronDown className="size-4" />
              </Button>
              <Separator orientation="vertical" className="h-5 mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                title="Delete"
                disabled={isLocked}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isLocked) onRemove();
                }}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
