"use client";

import React from "react";
import { FieldItem } from "./FieldItem";
import { FormField, FieldType } from "@workspace/models/dynamic-form";
import { CONTACT_CHANNEL_FIELDS } from "../constants";

interface DraggableFieldListProps {
  fields: FormField[];
  selectedFieldIndex: number | null;
  onSelectField: (index: number) => void;
  onRemoveField: (index: number) => void;
  onUpdateField: (index: number, updates: Partial<FormField>) => void;
  onReorderFields: (newFields: FormField[]) => void;
}

export const DraggableFieldList: React.FC<DraggableFieldListProps> = ({
  fields,
  selectedFieldIndex,
  onSelectField,
  onRemoveField,
  onUpdateField,
  onReorderFields,
}) => {
  const isLockedType = (type: FieldType) =>
    (CONTACT_CHANNEL_FIELDS as FieldType[]).includes(type);

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const prev = fields[index - 1];
    if (!prev || isLockedType(prev.type) || isLockedType(fields[index]!.type)) return;
    const next = [...fields];
    [next[index - 1], next[index]] = [next[index]!, next[index - 1]!];
    onReorderFields(next);
  };

  const handleMoveDown = (index: number) => {
    if (index >= fields.length - 1) return;
    const nextField = fields[index + 1];
    if (!nextField || isLockedType(nextField.type) || isLockedType(fields[index]!.type)) return;
    const next = [...fields];
    [next[index], next[index + 1]] = [next[index + 1]!, next[index]!];
    onReorderFields(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {fields.map((field, index) => (
        <FieldItem
          key={field.id}
          field={field}
          index={index}
          isSelected={selectedFieldIndex === index}
          onSelect={() => onSelectField(index)}
          onRemove={() => onRemoveField(index)}
          onUpdate={(updates) => onUpdateField(index, updates)}
          onMoveUp={index > 0 ? () => handleMoveUp(index) : undefined}
          onMoveDown={
            index < fields.length - 1 ? () => handleMoveDown(index) : undefined
          }
        />
      ))}
    </div>
  );
};
