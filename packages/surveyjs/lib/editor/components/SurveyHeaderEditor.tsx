/**
 * Component for editing survey metadata (title and description)
 * Follows Single Responsibility Principle
 */

import React from "react";

interface SurveyHeaderEditorProps {
  title: string;
  description: string;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
}

export const SurveyHeaderEditor: React.FC<SurveyHeaderEditorProps> = ({
  title,
  description,
  onUpdateTitle,
  onUpdateDescription,
}) => {
  return (
    <div style={styles.container}>
      <input
        type="text"
        value={title}
        onChange={(e) => onUpdateTitle(e.target.value)}
        style={styles.titleInput}
        placeholder="Form Title"
      />
      <textarea
        value={description}
        onChange={(e) => onUpdateDescription(e.target.value)}
        style={styles.descriptionInput}
        placeholder="Form description (optional)"
        rows={2}
      />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "16px",
  } as React.CSSProperties,
  titleInput: {
    width: "100%",
    fontSize: "24px",
    fontWeight: 600,
    border: "none",
    outline: "none",
    marginBottom: "12px",
    padding: "8px 0",
    borderBottom: "2px solid transparent",
    transition: "border-color 0.2s",
  } as React.CSSProperties,
  descriptionInput: {
    width: "100%",
    fontSize: "14px",
    border: "none",
    outline: "none",
    resize: "vertical" as const,
    fontFamily: "inherit",
    color: "#666",
    padding: "8px 0",
  } as React.CSSProperties,
};
