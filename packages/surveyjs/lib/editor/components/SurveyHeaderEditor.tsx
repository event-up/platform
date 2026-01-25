/**
 * Component for editing survey metadata (title and description)
 * Follows Single Responsibility Principle - Google Forms style
 */

import React from "react";
import { FormTitleInput } from "@workspace/ui/components/form-title-input";
import { FormDescriptionInput } from "@workspace/ui/components/form-description-input";

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
    <div className="relative">
      {/* Google Forms style header container */}
      <div className="bg-white rounded-lg  shadow-sm  border-gray-200 border-l-[5px] border-l-primary mb-4">
        {/* Purple accent bar at top */}
        <div className="h-2  rounded-t-lg"></div>

        {/* Content container */}
        <div className="p-6 space-y-2">
          <FormTitleInput
            value={title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            placeholder="Untitled form"
            className="text-3xl"
          />
          <FormDescriptionInput
            value={description}
            onChange={(e) => onUpdateDescription(e.target.value)}
            placeholder="Form description"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};
