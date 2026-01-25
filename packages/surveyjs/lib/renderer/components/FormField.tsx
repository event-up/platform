"use client";

import { Controller, FieldValues, UseFormReturn, Path } from "react-hook-form";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { cn } from "@workspace/ui/lib/utils";
import { FormField } from "@workspace/models/dynamic-form";

export interface BaseFieldProps<T extends FieldValues> {
  field: FormField;
  form: UseFormReturn<T>;
  error?: string;
}

/**
 * Text Input Field Component
 */
export function TextInputField<T extends FieldValues>({
  field,
  form,
  error,
}: BaseFieldProps<T>) {
  console.log("rendering textInputFied ", { field, form, error });

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>{field.label}</Label>
      <Controller
        name={field.name as Path<T>}
        control={form.control}
        render={({ field: fieldProps }) => (
          <Input
            id={field.name}
            type="text"
            placeholder={field.placeholder}
            aria-invalid={!!error}
            {...fieldProps}
            className={
              error
                ? "border-destructive focus-visible:ring-destructive/50"
                : ""
            }
          />
        )}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      {field.description && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}
    </div>
  );
}

/**
 * Email Input Field Component
 */
export function EmailInputField<T extends FieldValues>({
  field,
  form,
  error,
}: BaseFieldProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>{field.label}</Label>
      <Controller
        name={field.name as Path<T>}
        control={form.control}
        render={({ field: fieldProps }) => (
          <Input
            id={field.name}
            type="email"
            placeholder={field.placeholder}
            aria-invalid={!!error}
            {...fieldProps}
            className={
              error
                ? "border-destructive focus-visible:ring-destructive/50"
                : ""
            }
          />
        )}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      {field.description && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}
    </div>
  );
}

/**
 * Phone Input Field Component
 */
export function PhoneInputField<T extends FieldValues>({
  field,
  form,
  error,
}: BaseFieldProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>{field.label}</Label>
      <Controller
        name={field.name as Path<T>}
        control={form.control}
        render={({ field: fieldProps }) => (
          <Input
            id={field.name}
            type="tel"
            placeholder={field.placeholder || "+1 (555) 000-0000"}
            aria-invalid={!!error}
            {...fieldProps}
            className={
              error
                ? "border-destructive focus-visible:ring-destructive/50"
                : ""
            }
          />
        )}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      {field.description && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}
    </div>
  );
}

/**
 * Dropdown/Select Field Component
 */
export function DropdownField<T extends FieldValues>({
  field,
  form,
  error,
}: BaseFieldProps<T>) {
  const { watch } = form;
  const value = watch(field.name as Path<T>);

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>{field.label}</Label>
      <Controller
        name={field.name as Path<T>}
        control={form.control}
        render={({ field: fieldProps }) => (
          <Select value={value || ""} onValueChange={fieldProps.onChange}>
            <SelectTrigger
              id={field.name}
              aria-invalid={!!error}
              className={
                error
                  ? "border-destructive focus-visible:ring-destructive/50"
                  : ""
              }
            >
              <SelectValue
                placeholder={field.placeholder || "Select an option"}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      {field.description && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}
    </div>
  );
}

/**
 * Single Select Radio Field Component
 */
export function SingleSelectField<T extends FieldValues>({
  field,
  form,
  error,
}: BaseFieldProps<T>) {
  const { watch } = form;
  const value = watch(field.name as Path<T>);

  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <div className="space-y-2">
        {field.options?.map((option) => (
          <Controller
            key={option.value}
            name={field.name as Path<T>}
            control={form.control}
            render={({ field: fieldProps }) => (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value={String(option.value)}
                  checked={value === String(option.value)}
                  onChange={() => fieldProps.onChange(String(option.value))}
                  className={cn(
                    "rounded-full border border-input",
                    error ? "border-destructive" : "",
                  )}
                />
                <span className="text-sm">{option.label}</span>
              </label>
            )}
          />
        ))}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {field.description && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}
    </div>
  );
}

/**
 * Multiple Select Checkbox Field Component
 */
export function MultiSelectField<T extends FieldValues>({
  field,
  form,
  error,
}: BaseFieldProps<T>) {
  const { watch } = form;
  const value = (watch(field.name as Path<T>) || []) as string[];

  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <div className="space-y-2">
        {field.options?.map((option) => (
          <Controller
            key={option.value}
            name={field.name as Path<T>}
            control={form.control}
            render={({ field: fieldProps }) => (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={String(option.value)}
                  checked={value.includes(String(option.value))}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...value, String(option.value)]
                      : value.filter((v) => v !== String(option.value));
                    fieldProps.onChange(newValue);
                  }}
                  className={cn(
                    "rounded border border-input",
                    error ? "border-destructive" : "",
                  )}
                />
                <span className="text-sm">{option.label}</span>
              </label>
            )}
          />
        ))}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {field.description && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}
    </div>
  );
}

/**
 * Field Factory - Returns the appropriate field component based on type
 */
export function FormFieldComponent<T extends FieldValues>({
  field,
  form,
  error,
}: BaseFieldProps<T>) {
  switch (field.type) {
    case "email":
      return <EmailInputField field={field} form={form} error={error} />;
    case "phone":
      return <PhoneInputField field={field} form={form} error={error} />;
    case "dropdown":
    case "select":
      return <DropdownField field={field} form={form} error={error} />;
    case "multiselect":
      return <MultiSelectField field={field} form={form} error={error} />;
    case "text":
    default:
      return <TextInputField field={field} form={form} error={error} />;
  }
}
