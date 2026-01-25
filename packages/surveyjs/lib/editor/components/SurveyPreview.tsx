"use client";
/**
 * Preview component showing how the survey will look
 * Currently renders empty placeholder
 */

import React from "react";
import { EditorState } from "../../models/types";

interface SurveyPreviewProps {
  state: EditorState;
}

export const SurveyPreview: React.FC<SurveyPreviewProps> = ({ state }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Preview</h3>
        <p style={styles.hint}>
          This is how your form will look to respondents
        </p>
      </div>
      <div style={styles.preview}>
        <p style={styles.placeholderText}>
          Preview component - implementation pending
        </p>
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
    maxHeight: "calc(100vh - 32px)",
    overflow: "auto",
  } as React.CSSProperties,
  header: {
    marginBottom: "16px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e0e0e0",
  } as React.CSSProperties,
  title: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#333",
    marginBottom: "4px",
  } as React.CSSProperties,
  hint: {
    fontSize: "12px",
    color: "#999",
    margin: 0,
  } as React.CSSProperties,
  preview: {
    minHeight: "200px",
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
