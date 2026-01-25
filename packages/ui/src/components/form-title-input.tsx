import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

function FormTitleInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type="text"
      data-slot="form-title-input"
      className={cn(
        // Base styles
        "w-full min-w-0 bg-transparent text-3xl font-normal leading-tight text-gray-800 placeholder:text-gray-400",
        // Remove default input styling
        "border-0 outline-none ring-0 shadow-none p-0 m-0",
        // Focus and hover styles
        "focus:ring-0 focus:border-0 focus:outline-none",
        // Hover effect - subtle underline
        "hover:border-b hover:border-gray-300 focus:border-b focus:border-blue-600 transition-colors duration-200",
        // Padding for underline space
        "pb-1",
        className,
      )}
      {...props}
    />
  );
}

export { FormTitleInput };
