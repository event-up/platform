/**
 * Component for displaying list of fields
 * Follows Open/Closed Principle - extensible for different field types
 */

import React from "react";
import { FieldDefinition, FieldType } from "../../models/types";
import { FieldItem } from "./FieldItem";
import { AddFieldCard } from "./AddFieldCard";
import { DraggableFieldList } from "./DraggableFieldList";

interface FieldListProps {
  fields: FieldDefinition[];
  selectedFieldId: string | null;
  onSelectField: (id: string) => void;
  onRemoveField: (id: string) => void;
  onReorderFields: (newFields: FieldDefinition[]) => void;
  onAddField: (type: FieldType) => void;
  onUpdateField: (id: string, updates: Partial<FieldDefinition>) => void;
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
  if (fields.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>No fields yet</p>
        <p style={styles.emptyHint}>
          Click on a field type below to add your first question
        </p>
        <div className="mt-6">
          <AddFieldCard onAddField={onAddField} />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.list}>
      <DraggableFieldList
        fields={fields}
        selectedFieldIndex={
          selectedFieldId
            ? fields.findIndex((f) => f.id === selectedFieldId)
            : null
        }
        onSelectField={(index) => onSelectField(fields[index].id)}
        onRemoveField={(index) => onRemoveField(fields[index].id)}
        onUpdateField={(index, updates) =>
          onUpdateField(fields[index].id, updates)
        }
        onReorderFields={onReorderFields}
      />

      {/* Floating Add Field Card */}
      <div className="relative mt-4">
        <AddFieldCard onAddField={onAddField} />
      </div>
    </div>
  );
};

const styles = {
  list: {
    display: "flex",
    flexDirection: "column",
  } as React.CSSProperties,
  empty: {
    textAlign: "center",
    padding: "48px 24px",
    backgroundColor: "#fff",
    border: "2px dashed #e0e0e0",
    borderRadius: "8px",
  } as React.CSSProperties,
  emptyText: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "8px",
  } as React.CSSProperties,
  emptyHint: {
    fontSize: "14px",
    color: "#999",
  } as React.CSSProperties,
};
