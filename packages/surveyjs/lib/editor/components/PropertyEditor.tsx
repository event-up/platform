/**
 * Component for editing field properties
 * Follows Interface Segregation Principle - separate editors for different properties
 */

import React from "react";
import { FormField } from "@workspace/models/dynamic-form";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Checkbox } from "@workspace/ui/components/checkbox";

interface PropertyEditorProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
}

export const PropertyEditor: React.FC<PropertyEditorProps> = ({
  field,
  onUpdate,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <h3 className="text-base font-semibold text-slate-900 mb-5">
        Field Properties
      </h3>

      <div className="space-y-4">
        <div>
          <Label htmlFor="label" className="text-sm font-medium mb-2 block">
            Question Label
          </Label>
          <Input
            id="label"
            type="text"
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            placeholder="Enter question label"
            className="text-sm"
          />
        </div>

        <div>
          <Label htmlFor="id" className="text-sm font-medium mb-2 block">
            Field ID (Internal)
          </Label>
          <Input
            id="id"
            type="text"
            value={field.id}
            onChange={(e) => onUpdate({ id: e.target.value })}
            placeholder="field_id"
            className="text-sm"
          />
        </div>

        <div>
          <Label
            htmlFor="description"
            className="text-sm font-medium mb-2 block"
          >
            Description
          </Label>
          <textarea
            id="description"
            value={field.description || ""}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Optional description or help text"
            rows={2}
            className="flex h-20 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div>
          <Label
            htmlFor="placeholder"
            className="text-sm font-medium mb-2 block"
          >
            Placeholder Text
          </Label>
          <Input
            id="placeholder"
            type="text"
            value={field.placeholder || ""}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            placeholder="Enter placeholder"
            className="text-sm"
          />
        </div>





        <div className="flex items-center gap-2 pt-2">
          <Checkbox
            id="required"
            checked={field.required}
            onCheckedChange={(checked) => onUpdate({ required: !!checked })}
          />
          <Label
            htmlFor="required"
            className="text-sm font-medium cursor-pointer"
          >
            Required field
          </Label>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200 space-y-1 text-xs text-slate-600">
        <div>
          <span className="font-semibold">Field Type:</span> {field.type}
        </div>
        <div>
          <span className="font-semibold">ID:</span> {field.id}
        </div>
      </div>
    </div>
  );
};
