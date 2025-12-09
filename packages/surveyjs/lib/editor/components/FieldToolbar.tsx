/**
 * Component for adding new fields to the form
 * Follows Single Responsibility Principle - only handles field type selection
 */

import React from "react";
import { FieldType } from "../../models/types";
import { FIELD_TEMPLATES } from "../constants";

interface FieldToolbarProps {
  onAddField: (type: FieldType) => void;
}

export const FieldToolbar: React.FC<FieldToolbarProps> = ({ onAddField }) => {
  return (
    <div style={styles.toolbar}>
      <h3 style={styles.title}>Add Field</h3>
      <div style={styles.buttonGrid}>
        {Object.values(FIELD_TEMPLATES).map((template) => (
          <button
            key={template.type}
            onClick={() => onAddField(template.type)}
            style={styles.button}
            title={`Add ${template.label}`}
          >
            <span style={styles.icon}>{template.icon}</span>
            <span style={styles.label}>{template.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  toolbar: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
  } as React.CSSProperties,
  title: {
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "12px",
    color: "#333",
  } as React.CSSProperties,
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: "8px",
  } as React.CSSProperties,
  button: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px",
    border: "1px solid #e0e0e0",
    borderRadius: "6px",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "all 0.2s",
    fontSize: "14px",
  } as React.CSSProperties,
  icon: {
    fontSize: "20px",
  } as React.CSSProperties,
  label: {
    color: "#555",
    fontWeight: 500,
  } as React.CSSProperties,
};
