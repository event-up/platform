/**
 * Component for adding new fields to the form
 * Follows Single Responsibility Principle - only handles field type selection
 */

import React from "react";
import { FIELD_TEMPLATES, CONTACT_CHANNEL_FIELDS } from "../constants";
import { Button } from "@workspace/ui/components/button";
import { FieldType } from "@workspace/models/dynamic-form";

interface FieldToolbarProps {
  onAddField: (type: FieldType) => void;
}

export const FieldToolbar: React.FC<FieldToolbarProps> = ({ onAddField }) => {
  const contactFields = Object.values(FIELD_TEMPLATES).filter((template) =>
    CONTACT_CHANNEL_FIELDS.includes(template.type),
  );
  const regularFields = Object.values(FIELD_TEMPLATES).filter(
    (template) => !CONTACT_CHANNEL_FIELDS.includes(template.type),
  );

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-5">
      {/* Contact Channel Fields Section */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">
          Contact Information <span className="text-red-500">*</span>
        </h3>
        <p className="text-xs text-slate-600 mb-3">
          At least one contact field is required for user registration
        </p>
        <div className="flex flex-row gap-2 overflow-x-auto">
          {contactFields.map((template) => (
            <Button
              key={template.type}
              onClick={() => onAddField(template.type)}
              variant="outline"
              className="flex flex-col items-center gap-1 h-auto py-2 px-2 text-xs hover:bg-blue-50 border-blue-200"
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

      {/* Regular Fields Section */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Additional Fields
        </h3>
        <div className="flex flex-row gap-2 overflow-x-auto">
          {regularFields.map((template) => (
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
    </div>
  );
};
