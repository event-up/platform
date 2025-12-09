/**
 * Component for editing field properties
 * Follows Interface Segregation Principle - separate editors for different properties
 */

import React from "react";
import { FieldDefinition } from "../../models/types";

interface PropertyEditorProps {
  field: FieldDefinition;
  onUpdate: (updates: Partial<FieldDefinition>) => void;
}

export const PropertyEditor: React.FC<PropertyEditorProps> = ({
  field,
  onUpdate,
}) => {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Field Properties</h3>

      <div style={styles.section}>
        <label style={styles.label}>
          Question Title
          <input
            type="text"
            value={field.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            style={styles.input}
            placeholder="Enter question title"
          />
        </label>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>
          Field Name (Internal)
          <input
            type="text"
            value={field.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            style={styles.input}
            placeholder="field_name"
          />
        </label>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>
          Description
          <textarea
            value={field.description || ""}
            onChange={(e) => onUpdate({ description: e.target.value })}
            style={styles.textarea}
            placeholder="Optional description or help text"
            rows={2}
          />
        </label>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>
          Placeholder Text
          <input
            type="text"
            value={field.placeholder || ""}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            style={styles.input}
            placeholder="Enter placeholder"
          />
        </label>
      </div>

      {field.type === "textarea" && (
        <div style={styles.section}>
          <label style={styles.label}>
            Number of Rows
            <input
              type="number"
              value={field.rows || 4}
              onChange={(e) =>
                onUpdate({ rows: parseInt(e.target.value) || 4 })
              }
              style={styles.input}
              min="2"
              max="20"
            />
          </label>
        </div>
      )}

      {(field.type === "text" || field.type === "phone") && (
        <div style={styles.section}>
          <label style={styles.label}>
            Input Type
            <select
              value={field.inputType || "text"}
              onChange={(e) => onUpdate({ inputType: e.target.value })}
              style={styles.select}
            >
              {field.type === "text" && (
                <>
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="url">URL</option>
                  <option value="number">Number</option>
                </>
              )}
              {field.type === "phone" && (
                <>
                  <option value="tel">Phone</option>
                  <option value="text">Text</option>
                </>
              )}
            </select>
          </label>
        </div>
      )}

      <div style={styles.section}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={field.isRequired}
            onChange={(e) => onUpdate({ isRequired: e.target.checked })}
            style={styles.checkbox}
          />
          <span>Required field</span>
        </label>
      </div>

      <div style={styles.info}>
        <strong>Field Type:</strong> {field.type}
        <br />
        <strong>ID:</strong> {field.id}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    position: "sticky" as const,
    top: "16px",
  } as React.CSSProperties,
  title: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "16px",
    color: "#333",
  } as React.CSSProperties,
  section: {
    marginBottom: "16px",
  } as React.CSSProperties,
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    fontWeight: 500,
    color: "#555",
    gap: "6px",
  } as React.CSSProperties,
  input: {
    padding: "8px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    fontSize: "14px",
    fontFamily: "inherit",
  } as React.CSSProperties,
  textarea: {
    padding: "8px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    fontSize: "14px",
    fontFamily: "inherit",
    resize: "vertical" as const,
  } as React.CSSProperties,
  select: {
    padding: "8px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    fontSize: "14px",
    fontFamily: "inherit",
    backgroundColor: "#fff",
  } as React.CSSProperties,
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#555",
    cursor: "pointer",
  } as React.CSSProperties,
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
  } as React.CSSProperties,
  info: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
    fontSize: "12px",
    color: "#666",
    lineHeight: "1.6",
  } as React.CSSProperties,
};
