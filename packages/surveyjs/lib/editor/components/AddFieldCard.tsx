/**
 * Floating Add Field Card Component
 * Displays as a question-like card for adding new fields
 */

import React from "react";
import { FieldType } from "../../models/types";
import { FIELD_TEMPLATES } from "../constants";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";

interface AddFieldCardProps {
  onAddField: (type: FieldType) => void;
}

export const AddFieldCard: React.FC<AddFieldCardProps> = ({ onAddField }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-3 mt-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Plus className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-600">
            Add Question:
          </span>
        </div>

        <div className="flex items-center gap-2">
          {Object.values(FIELD_TEMPLATES).map((template) => (
            <Button
              key={template.type}
              onClick={() => onAddField(template.type)}
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 h-8 px-2.5 hover:bg-purple-50 hover:text-purple-700 transition-all group"
              title={`Add ${template.label}`}
            >
              <span className="text-base group-hover:scale-110 transition-transform">
                {template.icon}
              </span>
              <span className="font-medium text-xs">{template.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
