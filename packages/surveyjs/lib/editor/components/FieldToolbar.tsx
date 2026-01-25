/**
 * Component for adding new fields to the form
 * Follows Single Responsibility Principle - only handles field type selection
 */

import React from "react";
import { FieldType } from "../../models/types";
import { FIELD_TEMPLATES } from "../constants";
import { Button } from "@workspace/ui/components/button";

interface FieldToolbarProps {
  onAddField: (type: FieldType) => void;
}

export const FieldToolbar: React.FC<FieldToolbarProps> = ({ onAddField }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Add Field</h3>
      <div className="flex flex-row gap-2 overflow-x-auto">
        {Object.values(FIELD_TEMPLATES).map((template) => (
          <Button
            key={template.type}
            onClick={() => onAddField(template.type)}
            variant="outline"
            className="flex flex-col items-center gap-1 h-auto py-2 px-2 text-xs hover:bg-slate-50"
            title={`Add ${template.label}`}
          >
            <span className="text-sm">{template.icon}</span>
            <span className="font-medium text-slate-700 line-clamp-1 text-xs">
              {template.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};
