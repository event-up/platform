"use client";

/**
 * Component for displaying list of fields
 */

import React from "react";
import {
  AlignLeft,
  Calendar,
  CheckSquare,
  ChevronDown,
  Circle,
  Mail,
  Phone,
  Plus,
  Type,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { DraggableFieldList } from "./DraggableFieldList";
import { FieldType, FormField } from "@workspace/models/dynamic-form";
import { CONTACT_CHANNEL_FIELDS, FIELD_TEMPLATES } from "../constants";

const TYPE_ICONS: Record<FieldType, React.ReactNode> = {
  text: <Type className="size-4" />,
  textarea: <AlignLeft className="size-4" />,
  select: <Circle className="size-4" />,
  multiselect: <CheckSquare className="size-4" />,
  date: <Calendar className="size-4" />,
  phone: <Phone className="size-4" />,
  email: <Mail className="size-4" />,
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

const ADDABLE_TYPES = Object.values(FIELD_TEMPLATES).filter(
  (t) => !(CONTACT_CHANNEL_FIELDS as FieldType[]).includes(t.type),
);

interface FieldListProps {
  fields: FormField[];
  selectedFieldId: string | null;
  onSelectField: (id: string) => void;
  onRemoveField: (id: string) => void;
  onReorderFields: (newFields: FormField[]) => void;
  onAddField: (type: FieldType) => void;
  onUpdateField: (id: string, updates: Partial<FormField>) => void;
}

export const FieldList: React.FC<FieldListProps> = ({
  fields,
  selectedFieldId,
  onSelectField,
  onRemoveField,
  onReorderFields,
  onAddField,
  onUpdateField,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {fields.length === 0 ? (
        <div className="text-center py-12 px-6 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-sm font-medium text-slate-600 mb-1">
            No questions yet
          </p>
          <p className="text-sm text-slate-400">
            Click Add question below to get started
          </p>
        </div>
      ) : (
        <DraggableFieldList
          fields={fields}
          selectedFieldIndex={
            selectedFieldId
              ? fields.findIndex((f) => f.id === selectedFieldId)
              : null
          }
          onSelectField={(index) => {
            const field = fields[index];
            if (field) onSelectField(field.id);
          }}
          onRemoveField={(index) => {
            const field = fields[index];
            if (field) onRemoveField(field.id);
          }}
          onUpdateField={(index, updates) => {
            const field = fields[index];
            if (field) onUpdateField(field.id, updates);
          }}
          onReorderFields={onReorderFields}
        />
      )}

      {/* Add question dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-2xl border-dashed border-slate-300 bg-white hover:border-[#0097B2] hover:bg-[rgba(0,151,178,0.04)] hover:text-[#0097B2] text-sm font-medium text-slate-500 gap-2"
          >
            <Plus className="size-4" />
            Add question
            <ChevronDown className="size-4 ml-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="w-[--radix-dropdown-menu-trigger-width]"
        >
          {ADDABLE_TYPES.map((t) => (
            <DropdownMenuItem
              key={t.type}
              onSelect={() => onAddField(t.type)}
              className="gap-2 cursor-pointer"
            >
              <span className="text-muted-foreground shrink-0  pr-1">
                {TYPE_ICONS[t.type]}
              </span>
              {TYPE_LABELS[t.type]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
