/**
 * Component for displaying and editing a single field
 * Follows Single Responsibility Principle - manages individual field display
 */

import React, { useState, useEffect } from "react";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { FormTitleInput } from "@workspace/ui/components/form-title-input";
import { FormDescriptionInput } from "@workspace/ui/components/form-description-input";
import { Button } from "@workspace/ui/components/button";
import { GripVertical, Trash2 } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { FormField } from "@workspace/models/dynamic-form";
interface FieldItemProps {
  field: FormField;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onUpdate: (updates: Partial<FormField>) => void;
}

export const FieldItem: React.FC<FieldItemProps> = ({
  field,
  index,
  isSelected,
  onSelect,
  onRemove,
  onUpdate,
}) => {
  const [localLabel, setLocalLabel] = useState(field.label);
  const [localDescription, setLocalDescription] = useState(
    field.description || "",
  );
  const [localPlaceholder, setLocalPlaceholder] = useState(
    field.placeholder || "",
  );

  // Update local state when field changes
  useEffect(() => {
    setLocalLabel(field.label);
    setLocalDescription(field.description || "");
    setLocalPlaceholder(field.placeholder || "");
  }, [field.label, field.description, field.placeholder]);

  // Update field when leaving edit mode
  const handleBlur = () => {
    if (isSelected) {
      onUpdate({
        label: localLabel,
        description: localDescription,
        placeholder: localPlaceholder,
      });
    }
  };

  return (
    <div
      onClick={onSelect}
      className={cn(
        "bg-white border rounded-lg cursor-pointer transition-all relative h-full flex flex-col",
        isSelected
          ? "border-purple-500 shadow-lg ring-2 ring-purple-100"
          : "border-slate-200 hover:border-slate-300 hover:shadow-md opacity-80",
      )}
    >
      <div className="p-6  field-content flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3 drag-handle">
            {/* Drag Handle */}
            <GripVertical />

            <span className="text-xs uppercase tracking-wide text-slate-500 font-medium">
              {field.type}
            </span>
          </div>
          <div className="flex gap-1 no-drag">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              variant="ghost"
              size="sm"
              className="h-7 w-7 "
              title="Remove field"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
        <div className="no-drag">
          {/* Question Label - Editable when selected */}
          {isSelected ? (
            <FormTitleInput
              value={localLabel}
              onChange={(e) => setLocalLabel(e.target.value)}
              onBlur={handleBlur}
              onClick={(e) => e.stopPropagation()}
              placeholder="Question"
              className="text-lg font-medium mb-2"
            />
          ) : (
            <div className="text-lg font-medium text-slate-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </div>
          )}

          {/* Question Description - Editable when selected */}
          {isSelected ? (
            <FormDescriptionInput
              value={localDescription}
              onChange={(e) => setLocalDescription(e.target.value)}
              onBlur={handleBlur}
              onClick={(e) => e.stopPropagation()}
              placeholder="Description (optional)"
              className="text-sm text-slate-600 mb-3"
              rows={1}
            />
          ) : (
            field.description && (
              <div className="text-sm text-slate-600 mb-3">
                {field.description}
              </div>
            )
          )}

          {/* Answer Field Preview */}
          <div className="pt-2">
            {field.type === "textarea" ? (
              isSelected ? (
                <Textarea
                  value={localPlaceholder}
                  onChange={(e) => setLocalPlaceholder(e.target.value)}
                  onBlur={handleBlur}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Placeholder text"
                  rows={3}
                  className="w-full text-sm border border-slate-300 rounded focus:border-purple-500"
                />
              ) : (
                <textarea
                  placeholder={field.placeholder}
                  disabled
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded bg-slate-50 text-slate-400 resize-none cursor-not-allowed"
                />
              )
            ) : isSelected ? (
              <Input
                type="text"
                value={localPlaceholder}
                onChange={(e) => setLocalPlaceholder(e.target.value)}
                onBlur={handleBlur}
                onClick={(e) => e.stopPropagation()}
                placeholder="Placeholder text"
                className="text-sm border-slate-300 focus:border-purple-500"
              />
            ) : (
              <Input
                type="text"
                placeholder={field.placeholder}
                disabled
                className="text-sm bg-slate-50 text-slate-400 cursor-not-allowed"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
