"use client";

import { useState, type ReactNode } from "react";
import type { CustomField } from "@puckeditor/core";
import type {
  BackgroundAttachment,
  BackgroundImagePosition,
  BackgroundImageSize,
  ContainerPadding,
  ContainerPaddingPreset,
  ContainerSize,
  ContainerSizeUnit,
} from "../../types";

type PaddingFieldValue = ContainerPadding | ContainerPaddingPreset;
type SizeFieldValue = ContainerSize;
export type ImageUploadHandler = (file: File) => Promise<string>;

type ImageUrlFieldOptions = {
  uploadImage?: ImageUploadHandler;
};

type NumberFieldOptions = {
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  legacyValues?: Record<string, number>;
};

type ImageUrlFieldRendererProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  uploadImage?: ImageUploadHandler;
};

const defaultPadding: ContainerPadding = {
  all: false,
  top: 32,
  right: 24,
  bottom: 32,
  left: 24,
};

const paddingPresets: Record<ContainerPaddingPreset, ContainerPadding> = {
  none: { all: true, top: 0, right: 0, bottom: 0, left: 0 },
  small: { all: false, top: 16, right: 24, bottom: 16, left: 24 },
  medium: defaultPadding,
  large: { all: false, top: 48, right: 24, bottom: 48, left: 24 },
};

const defaultSize: ContainerSize = {
  enabled: false,
  value: 320,
  unit: "px",
};

const sizeUnits: Array<{
  label: string;
  value: ContainerSizeUnit;
}> = [
  { label: "px", value: "px" },
  { label: "vh", value: "vh" },
];

const backgroundPositionOptions: Array<{
  label: string;
  value: BackgroundImagePosition;
}> = [
  { label: "Center", value: "center center" },
  { label: "Top", value: "top center" },
  { label: "Bottom", value: "bottom center" },
  { label: "Left", value: "left center" },
  { label: "Right", value: "right center" },
  { label: "Top left", value: "top left" },
  { label: "Top right", value: "top right" },
  { label: "Bottom left", value: "bottom left" },
  { label: "Bottom right", value: "bottom right" },
];

const backgroundSizeOptions: Array<{
  label: string;
  value: BackgroundImageSize;
}> = [
  { label: "Cover", value: "cover" },
  { label: "Contain", value: "contain" },
  { label: "Auto", value: "auto" },
  { label: "Full width", value: "100% auto" },
  { label: "Full height", value: "auto 100%" },
];

const backgroundAttachmentOptions: Array<{
  label: string;
  value: BackgroundAttachment;
}> = [
  { label: "Scroll", value: "scroll" },
  { label: "Fixed", value: "fixed" },
  { label: "Local", value: "local" },
];

const defaultTextColorClass = "text-[#334155]";

const solidColorPresets = [
  "#0f172a",
  "#334155",
  "#64748b",
  "#ffffff",
  "#dc2626",
  "#ea580c",
  "#ca8a04",
  "#16a34a",
  "#0891b2",
  "#2563eb",
  "#7c3aed",
  "#db2777",
];

const gradientPresets = [
  { from: "#0f172a", to: "#22c55e", angle: 90 },
  { from: "#2563eb", to: "#7c3aed", angle: 90 },
  { from: "#f97316", to: "#db2777", angle: 90 },
  { from: "#06b6d4", to: "#10b981", angle: 90 },
  { from: "#facc15", to: "#ef4444", angle: 90 },
];

const inputClassName =
  "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50";

const selectClassName =
  "border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border bg-background px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50";

function CustomFieldLayout({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium leading-none text-slate-950">
        {label}
      </div>
      {children}
    </div>
  );
}

function normalizePadding(value: PaddingFieldValue | undefined) {
  if (!value) return defaultPadding;
  if (typeof value === "string") return paddingPresets[value] ?? defaultPadding;

  const top = Number.isFinite(value.top) ? value.top : defaultPadding.top;
  const right = Number.isFinite(value.right)
    ? value.right
    : defaultPadding.right;
  const bottom = Number.isFinite(value.bottom)
    ? value.bottom
    : defaultPadding.bottom;
  const left = Number.isFinite(value.left) ? value.left : defaultPadding.left;

  return {
    all: Boolean(value.all),
    top,
    right,
    bottom,
    left,
  };
}

function normalizeSizeUnit(unit: unknown): ContainerSizeUnit {
  return unit === "vh" || unit === "hv" ? "vh" : "px";
}

function normalizeSize(value: SizeFieldValue | undefined): ContainerSize {
  if (!value) return defaultSize;

  return {
    enabled: Boolean(value.enabled),
    value: Number.isFinite(value.value) ? value.value : defaultSize.value,
    unit: normalizeSizeUnit(value.unit),
  };
}

function normalizeNumberFieldValue(
  value: number | string | undefined,
  options: NumberFieldOptions,
) {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const legacyValue = options.legacyValues?.[value];
    if (typeof legacyValue === "number") return legacyValue;

    const numericValue = Number(value);
    if (Number.isFinite(numericValue)) return numericValue;
  }

  return options.defaultValue;
}

function clampNumber(value: number, min?: number, max?: number) {
  const minValue = typeof min === "number" ? Math.max(value, min) : value;
  return typeof max === "number" ? Math.min(minValue, max) : minValue;
}

function normalizeCssValue(value: string, fallback = "#334155") {
  const trimmedValue = value.trim();
  return trimmedValue ? trimmedValue.replace(/\s+/g, "_") : fallback;
}

function cssValueFromArbitraryValue(value: string) {
  return value.replace(/_/g, " ");
}

function buildSolidTextColorClass(value: string) {
  return `text-[${normalizeCssValue(value)}]`;
}

function buildGradientTextColorClass(from: string, to: string, angle: number) {
  const normalizedAngle = clampNumber(Math.round(angle) || 0, 0, 360);
  const fromValue = normalizeCssValue(from);
  const toValue = normalizeCssValue(to);

  return `bg-[linear-gradient(${normalizedAngle}deg,${fromValue},${toValue})] bg-clip-text text-transparent`;
}

function parseTextColorClass(value: string | undefined) {
  const colorClass = value || defaultTextColorClass;
  const gradientMatch = colorClass.match(
    /bg-\[linear-gradient\(([-\d.]+)deg,([^,\]]+),([^,\]]+)\)\]/,
  );

  if (gradientMatch) {
    return {
      mode: "gradient" as const,
      angle: Number(gradientMatch[1]) || 90,
      from: cssValueFromArbitraryValue(gradientMatch[2] || "#0f172a"),
      to: cssValueFromArbitraryValue(gradientMatch[3] || "#22c55e"),
    };
  }

  const solidMatch = colorClass.match(/^text-\[(.+)\]$/);

  return {
    mode: "solid" as const,
    value: solidMatch
      ? cssValueFromArbitraryValue(solidMatch[1] || "#334155")
      : "#334155",
  };
}

function colorInputValue(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#334155";
}

function NumberInput({
  id,
  label,
  value,
  disabled,
  min = 0,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label
      className="space-y-1 text-xs font-medium text-slate-600"
      htmlFor={id}
    >
      <span>{label}</span>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
        className={`${inputClassName} w-full`}
      />
    </label>
  );
}

function NumberFieldRenderer({
  id,
  label,
  value,
  onChange,
  readOnly,
  options,
}: {
  id: string;
  label: string;
  value: number | string | undefined;
  onChange: (value: number) => void;
  readOnly?: boolean;
  options: NumberFieldOptions;
}) {
  const normalizedValue = normalizeNumberFieldValue(value, options);

  return (
    <CustomFieldLayout label={label}>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          min={options.min}
          max={options.max}
          step={options.step}
          value={normalizedValue}
          disabled={readOnly}
          onChange={(event) => {
            const nextValue = Number(event.target.value);
            onChange(
              clampNumber(
                Number.isFinite(nextValue) ? nextValue : options.defaultValue,
                options.min,
                options.max,
              ),
            );
          }}
          className={`${inputClassName} flex-1`}
        />
        {options.unit ? (
          <span className="text-sm font-medium text-slate-500">
            {options.unit}
          </span>
        ) : null}
      </div>
    </CustomFieldLayout>
  );
}

function TextColorFieldRenderer({
  id,
  label,
  value,
  onChange,
  readOnly,
}: {
  id: string;
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) {
  const parsedColor = parseTextColorClass(value);
  const isGradient = parsedColor.mode === "gradient";
  const solidValue =
    parsedColor.mode === "solid" ? parsedColor.value : "#334155";
  const gradientFrom =
    parsedColor.mode === "gradient" ? parsedColor.from : "#0f172a";
  const gradientTo =
    parsedColor.mode === "gradient" ? parsedColor.to : "#22c55e";
  const gradientAngle =
    parsedColor.mode === "gradient" ? parsedColor.angle : 90;

  return (
    <CustomFieldLayout label={label}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={readOnly}
            aria-pressed={!isGradient}
            onClick={() => onChange(buildSolidTextColorClass(solidValue))}
            className="h-9 rounded-md border px-3 text-sm font-medium aria-pressed:border-slate-950 aria-pressed:bg-slate-950 aria-pressed:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Solid
          </button>
          <button
            type="button"
            disabled={readOnly}
            aria-pressed={isGradient}
            onClick={() =>
              onChange(
                buildGradientTextColorClass(
                  gradientFrom,
                  gradientTo,
                  gradientAngle,
                ),
              )
            }
            className="h-9 rounded-md border px-3 text-sm font-medium aria-pressed:border-slate-950 aria-pressed:bg-slate-950 aria-pressed:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Gradient
          </button>
        </div>

        {isGradient ? (
          <div className="space-y-3">
            <div
              className="h-10 rounded-md border"
              style={{
                backgroundImage: `linear-gradient(${gradientAngle}deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1 text-xs font-medium text-slate-600">
                <span>From</span>
                <input
                  type="color"
                  value={colorInputValue(gradientFrom)}
                  disabled={readOnly}
                  onChange={(event) =>
                    onChange(
                      buildGradientTextColorClass(
                        event.target.value,
                        gradientTo,
                        gradientAngle,
                      ),
                    )
                  }
                  className="h-9 w-full rounded-md border bg-transparent p-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </label>
              <label className="space-y-1 text-xs font-medium text-slate-600">
                <span>To</span>
                <input
                  type="color"
                  value={colorInputValue(gradientTo)}
                  disabled={readOnly}
                  onChange={(event) =>
                    onChange(
                      buildGradientTextColorClass(
                        gradientFrom,
                        event.target.value,
                        gradientAngle,
                      ),
                    )
                  }
                  className="h-9 w-full rounded-md border bg-transparent p-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </label>
            </div>
            <NumberInput
              id={`${id}-angle`}
              label="Angle"
              value={gradientAngle}
              disabled={readOnly}
              min={0}
              max={360}
              step={1}
              onChange={(nextAngle) =>
                onChange(
                  buildGradientTextColorClass(
                    gradientFrom,
                    gradientTo,
                    nextAngle,
                  ),
                )
              }
            />
            <div className="grid grid-cols-5 gap-2">
              {gradientPresets.map((preset) => (
                <button
                  key={`${preset.from}-${preset.to}-${preset.angle}`}
                  type="button"
                  title={`${preset.from} to ${preset.to}`}
                  disabled={readOnly}
                  onClick={() =>
                    onChange(
                      buildGradientTextColorClass(
                        preset.from,
                        preset.to,
                        preset.angle,
                      ),
                    )
                  }
                  className="h-8 rounded-md border disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    backgroundImage: `linear-gradient(${preset.angle}deg, ${preset.from}, ${preset.to})`,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="color"
                value={colorInputValue(solidValue)}
                disabled={readOnly}
                onChange={(event) =>
                  onChange(buildSolidTextColorClass(event.target.value))
                }
                className="h-9 w-12 shrink-0 rounded-md border bg-transparent p-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <input
                id={id}
                value={solidValue}
                disabled={readOnly}
                placeholder="#334155"
                onChange={(event) =>
                  onChange(buildSolidTextColorClass(event.target.value))
                }
                className={`${inputClassName} flex-1`}
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {solidColorPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  title={preset}
                  aria-label={`Set text color to ${preset}`}
                  disabled={readOnly}
                  onClick={() => onChange(buildSolidTextColorClass(preset))}
                  className="h-8 rounded-md border disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ backgroundColor: preset }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </CustomFieldLayout>
  );
}

function ImageUrlFieldRenderer({
  id,
  label,
  value,
  onChange,
  readOnly,
  uploadImage,
}: ImageUrlFieldRendererProps) {
  const fileInputId = `${id}-file`;
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const isDisabled = Boolean(readOnly || isUploading);

  return (
    <CustomFieldLayout label={label}>
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            id={id}
            value={value || ""}
            onChange={(event) => onChange(event.target.value)}
            readOnly={readOnly || isUploading}
            placeholder="https://... or choose a local image"
            className={`${inputClassName} flex-1`}
          />
          <label
            htmlFor={fileInputId}
            aria-disabled={isDisabled}
            className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-md border bg-background px-3 text-sm font-medium shadow-xs transition-all hover:bg-accent hover:text-accent-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Choose"}
          </label>
        </div>
        <input
          id={fileInputId}
          type="file"
          accept="image/*"
          disabled={isDisabled}
          className="sr-only"
          onChange={async (event) => {
            const input = event.currentTarget;
            const file = input.files?.[0];

            if (file) {
              setUploadError(null);

              if (!uploadImage) {
                onChange(URL.createObjectURL(file));
                input.value = "";
                return;
              }

              const previousValue = value || "";
              const previewUrl = URL.createObjectURL(file);
              setIsUploading(true);
              onChange(previewUrl);

              try {
                const downloadUrl = await uploadImage(file);
                onChange(downloadUrl);
              } catch (error) {
                onChange(previousValue);
                setUploadError(
                  error instanceof Error
                    ? error.message
                    : "Failed to upload image.",
                );
              } finally {
                URL.revokeObjectURL(previewUrl);
                setIsUploading(false);
              }
            }

            input.value = "";
          }}
        />
        {uploadError ? (
          <p className="text-xs font-medium text-destructive">{uploadError}</p>
        ) : null}
        {value ? (
          <div className="overflow-hidden rounded-md border bg-muted">
            <img
              src={value}
              alt=""
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </CustomFieldLayout>
  );
}

export function numberField<TValue extends number | string = number | string>(
  label: string,
  options: NumberFieldOptions,
): CustomField<TValue> {
  return {
    type: "custom",
    label,
    render: ({ id, value, onChange, readOnly }) => (
      <NumberFieldRenderer
        id={id}
        label={label}
        value={value as number | string | undefined}
        onChange={(nextValue) => onChange(nextValue as TValue)}
        readOnly={readOnly}
        options={options}
      />
    ),
  };
}

export function textColorField(label: string): CustomField<string> {
  return {
    type: "custom",
    label,
    render: ({ id, value, onChange, readOnly }) => (
      <TextColorFieldRenderer
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    ),
  };
}

export function imageUrlField(
  label: string,
  options: ImageUrlFieldOptions = {},
): CustomField<string> {
  return {
    type: "custom",
    label,
    render: ({ id, value, onChange, readOnly }) => (
      <ImageUrlFieldRenderer
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        uploadImage={options.uploadImage}
      />
    ),
  };
}

export function paddingField(label: string): CustomField<PaddingFieldValue> {
  return {
    type: "custom",
    label,
    render: ({ id, value, onChange, readOnly }) => {
      const padding = normalizePadding(value);
      const allValue = padding.top;
      const update = (nextPadding: ContainerPadding) => onChange(nextPadding);
      const updateSide = (side: keyof Omit<ContainerPadding, "all">) => {
        return (nextValue: number) => {
          if (padding.all) {
            update({
              all: true,
              top: nextValue,
              right: nextValue,
              bottom: nextValue,
              left: nextValue,
            });
            return;
          }

          update({
            ...padding,
            [side]: nextValue,
          });
        };
      };

      return (
        <CustomFieldLayout label={label}>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={padding.all}
                disabled={readOnly}
                onChange={(event) => {
                  if (event.target.checked) {
                    update({
                      all: true,
                      top: allValue,
                      right: allValue,
                      bottom: allValue,
                      left: allValue,
                    });
                    return;
                  }

                  update({ ...padding, all: false });
                }}
                className="size-4 rounded border-slate-300"
              />
              Apply same value to all sides
            </label>

            {padding.all ? (
              <NumberInput
                id={`${id}-all`}
                label="All sides"
                value={allValue}
                disabled={readOnly}
                onChange={updateSide("top")}
              />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <NumberInput
                  id={`${id}-top`}
                  label="Top"
                  value={padding.top}
                  disabled={readOnly}
                  onChange={updateSide("top")}
                />
                <NumberInput
                  id={`${id}-right`}
                  label="Right"
                  value={padding.right}
                  disabled={readOnly}
                  onChange={updateSide("right")}
                />
                <NumberInput
                  id={`${id}-bottom`}
                  label="Bottom"
                  value={padding.bottom}
                  disabled={readOnly}
                  onChange={updateSide("bottom")}
                />
                <NumberInput
                  id={`${id}-left`}
                  label="Left"
                  value={padding.left}
                  disabled={readOnly}
                  onChange={updateSide("left")}
                />
              </div>
            )}
          </div>
        </CustomFieldLayout>
      );
    },
  };
}

export function sizeField(label: string): CustomField<SizeFieldValue> {
  return {
    type: "custom",
    label,
    render: ({ id, value, onChange, readOnly }) => {
      const size = normalizeSize(value);
      const update = (nextSize: ContainerSize) => onChange(nextSize);

      return (
        <CustomFieldLayout label={label}>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={size.enabled}
                disabled={readOnly}
                onChange={(event) =>
                  update({
                    ...size,
                    enabled: event.target.checked,
                  })
                }
                className="size-4 rounded border-slate-300"
              />
              Set {label.toLowerCase()}
            </label>

            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1">
                <NumberInput
                  id={`${id}-value`}
                  label="Value"
                  value={size.value}
                  disabled={readOnly || !size.enabled}
                  min={0}
                  onChange={(nextValue) =>
                    update({
                      ...size,
                      value: nextValue,
                    })
                  }
                />
              </div>
              <label
                className="w-24 space-y-1 text-xs font-medium text-slate-600"
                htmlFor={`${id}-unit`}
              >
                <span>Unit</span>
                <select
                  id={`${id}-unit`}
                  value={size.unit}
                  disabled={readOnly || !size.enabled}
                  onChange={(event) =>
                    update({
                      ...size,
                      unit: event.target.value as ContainerSizeUnit,
                    })
                  }
                  className={selectClassName}
                >
                  {sizeUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </CustomFieldLayout>
      );
    },
  };
}

export function backgroundImageField(
  label: string,
  options: ImageUrlFieldOptions = {},
): CustomField<string> {
  return imageUrlField(label, options);
}

export function backgroundImagePositionField(
  label: string,
): CustomField<BackgroundImagePosition> {
  return {
    type: "custom",
    label,
    render: ({ id, value, onChange, readOnly }) => (
      <CustomFieldLayout label={label}>
        <select
          id={id}
          value={value || "center center"}
          disabled={readOnly}
          onChange={(event) =>
            onChange(event.target.value as BackgroundImagePosition)
          }
          className={selectClassName}
        >
          {backgroundPositionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </CustomFieldLayout>
    ),
  };
}

export function backgroundImageSizeField(
  label: string,
): CustomField<BackgroundImageSize> {
  return {
    type: "custom",
    label,
    render: ({ id, value, onChange, readOnly }) => (
      <CustomFieldLayout label={label}>
        <select
          id={id}
          value={value || "cover"}
          disabled={readOnly}
          onChange={(event) =>
            onChange(event.target.value as BackgroundImageSize)
          }
          className={selectClassName}
        >
          {backgroundSizeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </CustomFieldLayout>
    ),
  };
}

export function backgroundAttachmentField(
  label: string,
): CustomField<BackgroundAttachment> {
  return {
    type: "custom",
    label,
    render: ({ id, value, onChange, readOnly }) => (
      <CustomFieldLayout label={label}>
        <select
          id={id}
          value={value || "scroll"}
          disabled={readOnly}
          onChange={(event) =>
            onChange(event.target.value as BackgroundAttachment)
          }
          className={selectClassName}
        >
          {backgroundAttachmentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </CustomFieldLayout>
    ),
  };
}
