"use client";
import * as React from "react";
import { ReactElementFactory } from "survey-react-ui";
import { Input as BaseInput } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";

interface SurveyInputProps {
  question?: {
    title?: string;
    name?: string;
    value?: string;
    errors?: any[];
    hasErrors?: boolean;
    isRequired?: boolean;
  };
  cssClasses?: {
    root?: string;
    control?: string;
    error?: string;
  };
  isDisplayMode?: boolean;
}

function SurveyInputField(props: SurveyInputProps) {
  const { question, cssClasses, isDisplayMode } = props;
  const hasError =
    question?.hasErrors || (question?.errors && question.errors.length > 0);
  const isRequired = question?.isRequired;
  console.log({ props });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (question && "value" in question) {
      (question as any).value = e.target.value;
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", cssClasses?.root)}>
      {question?.title && (
        <label
          htmlFor={question.name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {question.title}
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <BaseInput
        id={question?.name}
        name={question?.name}
        value={question?.value || ""}
        onChange={handleChange}
        disabled={isDisplayMode}
        aria-invalid={hasError}
        className={cn(
          cssClasses?.control,
          hasError &&
            "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
        )}
      />

      {hasError && question?.errors && (
        <div className={cn("text-sm text-destructive", cssClasses?.error)}>
          {question.errors.map((error: any, index: number) => (
            <p key={index}>{error?.text || error}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// Register the custom component with SurveyJS
ReactElementFactory.Instance.registerElement("text", (props) => (
  <SurveyInputField {...props} />
));

export { SurveyInputField };
