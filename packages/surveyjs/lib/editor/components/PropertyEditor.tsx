/**
 * Component for editing field properties
 * Follows Interface Segregation Principle - separate editors for different properties
 */

import React from "react";
import { FieldDefinition } from "../../models/types";
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
  field: FieldDefinition;
  onUpdate: (updates: Partial<FieldDefinition>) => void;
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
          <Label htmlFor="title" className="text-sm font-medium mb-2 block">
            Question Title
          </Label>
          <Input
            id="title"
            type="text"
            value={field.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Enter question title"
            className="text-sm"
          />
        </div>

        <div>
          <Label htmlFor="name" className="text-sm font-medium mb-2 block">
            Field Name (Internal)
          </Label>
          <Input
            id="name"
            type="text"
            value={field.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="field_name"
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

        {field.type === "textarea" && (
          <div>
            <Label htmlFor="rows" className="text-sm font-medium mb-2 block">
              Number of Rows
            </Label>
            <Input
              id="rows"
              type="number"
              value={field.rows || 4}
              onChange={(e) =>
                onUpdate({ rows: parseInt(e.target.value) || 4 })
              }
              min="2"
              max="20"
              className="text-sm"
            />
          </div>
        )}

        {(field.type === "text" || field.type === "phone") && (
          <div>
            <Label
              htmlFor="inputType"
              className="text-sm font-medium mb-2 block"
            >
              Input Type
            </Label>
            <Select
              value={field.inputType || "text"}
              onValueChange={(value) => onUpdate({ inputType: value })}
            >
              <SelectTrigger id="inputType" className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {field.type === "text" && (
                  <>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="url">URL</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                  </>
                )}
                {field.type === "phone" && (
                  <>
                    <SelectItem value="tel">Phone</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <Checkbox
            id="required"
            checked={field.isRequired}
            onCheckedChange={(checked) => onUpdate({ isRequired: !!checked })}
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
