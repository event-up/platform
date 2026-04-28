"use client";

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
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Teal accent bar */}
      <div className="h-2 bg-gradient-to-r from-[#0097B2] via-[#00B8D9] to-[#0097B2]" />

      <div className="px-6 pt-5 pb-6">
        <input
          value={title}
          onChange={(e) => onUpdateTitle(e.target.value)}
          placeholder="Form title"
          className="w-full text-[22px] font-semibold tracking-tight bg-transparent outline-none focus:border-b-2 focus:border-[#0097B2] pb-1 -mb-px placeholder:text-slate-400"
        />
        <textarea
          rows={2}
          value={description}
          onChange={(e) => onUpdateDescription(e.target.value)}
          placeholder="Add a short description for attendees…"
          className="mt-3 w-full resize-none text-[14px] text-slate-700 bg-transparent outline-none focus:border-b-2 focus:border-[#0097B2] pb-1 -mb-px placeholder:text-slate-400"
        />
      </div>
    </div>
  );
};
