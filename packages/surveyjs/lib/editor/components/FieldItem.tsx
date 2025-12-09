/**
 * Component for displaying and editing a single field
 * Follows Single Responsibility Principle - manages individual field display
 */

import React from "react";
import { FieldDefinition } from "../../models/types";

interface FieldItemProps {
  field: FieldDefinition;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export const FieldItem: React.FC<FieldItemProps> = ({
  field,
  index,
  isSelected,
  onSelect,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}) => {
  return (
    <div
      onClick={onSelect}
      style={{
        ...styles.container,
        ...(isSelected ? styles.containerSelected : {}),
      }}
    >
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.index}>{index + 1}</span>
          <span style={styles.type}>{field.type}</span>
        </div>
        <div style={styles.actions}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp();
            }}
            disabled={!canMoveUp}
            style={styles.actionButton}
            title="Move up"
          >
            ↑
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown();
            }}
            disabled={!canMoveDown}
            style={styles.actionButton}
            title="Move down"
          >
            ↓
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            style={styles.removeButton}
            title="Remove field"
          >
            ×
          </button>
        </div>
      </div>
      <div style={styles.content}>
        <div style={styles.title}>
          {field.title}
          {field.isRequired && <span style={styles.required}>*</span>}
        </div>
        {field.description && (
          <div style={styles.description}>{field.description}</div>
        )}
        <div style={styles.preview}>
          {field.type === "textarea" ? (
            <textarea
              style={styles.textareaPreview}
              placeholder={field.placeholder}
              disabled
              rows={field.rows || 4}
            />
          ) : (
            <input
              type={field.inputType || "text"}
              style={styles.inputPreview}
              placeholder={field.placeholder}
              disabled
            />
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    cursor: "pointer",
    transition: "all 0.2s",
  } as React.CSSProperties,
  containerSelected: {
    borderColor: "#4285f4",
    boxShadow: "0 0 0 2px rgba(66, 133, 244, 0.2)",
  } as React.CSSProperties,
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  } as React.CSSProperties,
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  } as React.CSSProperties,
  index: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#666",
    backgroundColor: "#f5f5f5",
    padding: "2px 8px",
    borderRadius: "4px",
  } as React.CSSProperties,
  type: {
    fontSize: "11px",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  } as React.CSSProperties,
  actions: {
    display: "flex",
    gap: "4px",
  } as React.CSSProperties,
  actionButton: {
    padding: "4px 8px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    color: "#666",
  } as React.CSSProperties,
  removeButton: {
    padding: "4px 8px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "18px",
    color: "#d32f2f",
    fontWeight: 600,
  } as React.CSSProperties,
  content: {
    marginTop: "8px",
  } as React.CSSProperties,
  title: {
    fontSize: "16px",
    fontWeight: 500,
    color: "#333",
    marginBottom: "4px",
  } as React.CSSProperties,
  required: {
    color: "#d32f2f",
    marginLeft: "4px",
  } as React.CSSProperties,
  description: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "12px",
  } as React.CSSProperties,
  preview: {
    marginTop: "12px",
  } as React.CSSProperties,
  inputPreview: {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: "#fafafa",
  } as React.CSSProperties,
  textareaPreview: {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: "#fafafa",
    resize: "vertical",
  } as React.CSSProperties,
};
