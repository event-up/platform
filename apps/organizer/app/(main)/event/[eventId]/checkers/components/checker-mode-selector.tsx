"use client";

import { Link2, UserCheck } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

export type CheckerMode = "copy-link" | "assign-checkers";

interface CheckerModeSelectorProps {
  selected: CheckerMode | null;
  onSelect: (mode: CheckerMode) => void;
  onNext: () => void;
}

const OPTIONS = [
  {
    id: "copy-link" as CheckerMode,
    icon: Link2,
    title: "Copy Link to Scanner",
    description:
      "Anyone with the link can access the scanner — no personal assignment required.",
  },
  {
    id: "assign-checkers" as CheckerMode,
    icon: UserCheck,
    title: "Assign Checkers",
    description:
      "Only the people you assign will be able to access the scanner at their entrance.",
  },
];

export function CheckerModeSelector({
  selected,
  onSelect,
  onNext,
}: CheckerModeSelectorProps) {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h2 className="text-lg font-semibold">How will checkers access the scanner?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a method for how your checkers will scan tickets at the event.
        </p>
      </div>

      {/* Radio option cards — connected bordered sections */}
      <div className="flex flex-col rounded-lg border overflow-hidden divide-y">
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={cn(
                "flex items-start gap-4 p-4 text-left transition-colors w-full",
                isSelected
                  ? "bg-primary/5"
                  : "bg-background hover:bg-muted/50"
              )}
            >
              {/* Radio indicator */}
              <span
                className={cn(
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  isSelected
                    ? "border-primary"
                    : "border-muted-foreground/40"
                )}
              >
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-primary" />
                )}
              </span>

              {/* Icon + text */}
              <div className="flex items-start gap-3">
                <Icon
                  className={cn(
                    "h-5 w-5 mt-0.5 shrink-0",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <div className="space-y-0.5">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isSelected && "text-primary"
                    )}
                  >
                    {option.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Button onClick={onNext} disabled={!selected}>
        Next →
      </Button>
    </div>
  );
}
