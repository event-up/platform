import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

function FormDescriptionInput({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="form-description-input"
      className={cn(
        // Base styles
        "w-full min-w-0 bg-transparent text-sm leading-normal text-gray-700 placeholder:text-gray-400",
        // Remove default textarea styling
        "border-0 outline-none ring-0 shadow-none p-0 m-0 resize-none",
        // Focus and hover styles
        "focus:ring-0 focus:border-0 focus:outline-none",
        // Hover effect - subtle underline
        "hover:border-b hover:border-gray-300 focus:border-b focus:border-blue-600 transition-colors duration-200",
        // Padding for underline space and content
        "pb-1 pt-1",
        // Auto-sizing for content
        "field-sizing-content min-h-5",
        className,
      )}
      {...props}
    />
  );
}

export { FormDescriptionInput };
