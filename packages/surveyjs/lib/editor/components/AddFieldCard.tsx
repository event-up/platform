/**
 * Floating Add Field Card Component
 * Displays as a question-like card for adding new fields
 */

import React, { useState } from "react";
import { FIELD_TEMPLATES, CONTACT_CHANNEL_FIELDS } from "../constants";
import { Button } from "@workspace/ui/components/button";
import { Plus, ChevronDown } from "lucide-react";
import { FieldType } from "lib/renderer";

interface AddFieldCardProps {
  onAddField: (type: FieldType) => void;
}

export const AddFieldCard: React.FC<AddFieldCardProps> = ({ onAddField }) => {
  const [showAll, setShowAll] = useState(false);

  const contactFields = Object.values(FIELD_TEMPLATES).filter((template) =>
    CONTACT_CHANNEL_FIELDS.includes(template.type),
  );
  const regularFields = Object.values(FIELD_TEMPLATES).filter(
    (template) => !CONTACT_CHANNEL_FIELDS.includes(template.type),
  );

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-3 mt-4">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Plus className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-600">
            Add Question:
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="h-6 px-2 text-xs"
        >
          {showAll ? "Show Less" : "Show All"}
          <ChevronDown
            className={`h-3 w-3 ml-1 transition-transform ${showAll ? "rotate-180" : ""}`}
          />
        </Button>
      </div>

      {/* Contact Fields (Always Shown) */}
      <div className="mb-2">
        <div className="text-xs font-medium text-blue-700 mb-1">
          Contact Info *
        </div>
        <div className="flex items-center gap-2">
          {contactFields.map((template) => (
            <Button
              key={template.type}
              onClick={() => onAddField(template.type)}
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 h-8 px-2.5 hover:bg-blue-50 hover:text-blue-700 transition-all group border-blue-200 border"
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

      {/* Regular Fields (Show/Hide Toggle) */}
      {(showAll || regularFields.length <= 3) && (
        <div>
          <div className="text-xs font-medium text-slate-700 mb-1">
            Other Fields
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {regularFields.slice(0, showAll ? undefined : 3).map((template) => (
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
      )}
    </div>
  );
};
