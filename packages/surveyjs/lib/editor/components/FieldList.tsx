/**
 * Component for displaying list of fields
 * Follows Open/Closed Principle - extensible for different field types
 */

import React from "react";
import { FieldDefinition } from "../../models/types";
import { FieldItem } from "./FieldItem";

interface FieldListProps {
  fields: FieldDefinition[];
  selectedFieldId: string | null;
  onSelectField: (id: string) => void;
  onRemoveField: (id: string) => void;
  onMoveField: (fromIndex: number, toIndex: number) => void;
}

export const FieldList: React.FC<FieldListProps> = ({
  fields,
  selectedFieldId,
  onSelectField,
  onRemoveField,
  onMoveField,
}) => {
  if (fields.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>No fields yet</p>
        <p style={styles.emptyHint}>
          Click on a field type above to add your first question
        </p>
      </div>
    );
  }

  return (
    <div style={styles.list}>
      {fields.map((field, index) => (
        <FieldItem
          key={field.id}
          field={field}
          index={index}
          isSelected={field.id === selectedFieldId}
          onSelect={() => onSelectField(field.id)}
          onRemove={() => onRemoveField(field.id)}
          onMoveUp={() => onMoveField(index, index - 1)}
          onMoveDown={() => onMoveField(index, index + 1)}
          canMoveUp={index > 0}
          canMoveDown={index < fields.length - 1}
        />
      ))}
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
