import type { SlotComponent, WithPuckProps } from "@puckeditor/core";
import type { CSSProperties } from "react";
import type {
  ContainerPadding,
  ContainerPaddingPreset,
  ContainerSize,
  ContainerSizeUnit,
  EventPageComponents,
} from "../../types";

type ContainerRendererProps = WithPuckProps<
  Omit<EventPageComponents["Container"], "children"> & {
    children: SlotComponent;
  }
>;

const containerBackground = {
  transparent: "",
  white: "bg-white",
  muted: "bg-slate-50",
  accent: "bg-emerald-50",
};

const containerPadding = {
  none: { all: true, top: 0, right: 0, bottom: 0, left: 0 },
  small: { all: false, top: 16, right: 24, bottom: 16, left: 24 },
  medium: { all: false, top: 32, right: 24, bottom: 32, left: 24 },
  large: { all: false, top: 48, right: 24, bottom: 48, left: 24 },
};

const containerMaxWidth = {
  small: "max-w-2xl",
  medium: "max-w-4xl",
  large: "max-w-6xl",
  full: "max-w-none",
};

const containerAlign = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function normalizePadding(
  padding: ContainerPadding | ContainerPaddingPreset | undefined,
) {
  if (!padding) return containerPadding.medium;
  if (typeof padding === "string") {
    return containerPadding[padding] ?? containerPadding.medium;
  }

  const allValue = Number.isFinite(padding.top)
    ? padding.top
    : containerPadding.medium.top;

  if (padding.all) {
    return {
      all: true,
      top: allValue,
      right: allValue,
      bottom: allValue,
      left: allValue,
    };
  }

  return {
    all: false,
    top: Number.isFinite(padding.top) ? padding.top : containerPadding.medium.top,
    right: Number.isFinite(padding.right)
      ? padding.right
      : containerPadding.medium.right,
    bottom: Number.isFinite(padding.bottom)
      ? padding.bottom
      : containerPadding.medium.bottom,
    left: Number.isFinite(padding.left)
      ? padding.left
      : containerPadding.medium.left,
  };
}

function normalizeSizeUnit(unit: string | undefined): ContainerSizeUnit {
  return unit === "vh" || unit === "hv" ? "vh" : "px";
}

function normalizeSize(size: ContainerSize | undefined) {
  if (!size?.enabled) return undefined;

  const value = Number(size.value);
  if (!Number.isFinite(value) || value < 0) return undefined;

  return `${value}${normalizeSizeUnit(size.unit)}`;
}

type ContainerSizeVars = CSSProperties & {
  "--event-page-container-height"?: string;
  "--event-page-container-min-height"?: string;
};

export function ContainerRenderer({
  children,
  background,
  padding,
  height,
  minHeight,
  backgroundImage,
  backgroundImagePosition,
  backgroundImageSize,
  backgroundAttachment,
  maxWidth,
  align,
}: ContainerRendererProps) {
  const normalizedPadding = normalizePadding(padding);
  const heightValue = normalizeSize(height);
  const minHeightValue = normalizeSize(minHeight);
  const sectionStyle: ContainerSizeVars | undefined =
    backgroundImage || heightValue || minHeightValue
      ? {
          ...(heightValue
            ? { "--event-page-container-height": heightValue }
            : {}),
          ...(minHeightValue
            ? { "--event-page-container-min-height": minHeightValue }
            : {}),
          ...(backgroundImage
            ? {
                backgroundImage: `url("${backgroundImage}")`,
                backgroundPosition: backgroundImagePosition || "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: backgroundImageSize || "cover",
                backgroundAttachment: backgroundAttachment || "scroll",
              }
            : {}),
        }
      : undefined;

  return (
    <section
      className={`${containerBackground[background || "transparent"]} ${
        heightValue ? "h-[var(--event-page-container-height)]" : ""
      } ${
        minHeightValue ? "min-h-[var(--event-page-container-min-height)]" : ""
      }`}
      style={sectionStyle}
    >
      <div
        className={`mx-auto ${containerMaxWidth[maxWidth || "large"]} ${
          containerAlign[align || "left"]
        }`}
        style={{
          paddingTop: normalizedPadding.top,
          paddingRight: normalizedPadding.right,
          paddingBottom: normalizedPadding.bottom,
          paddingLeft: normalizedPadding.left,
        }}
      >
        {children({
          minEmptyHeight: 96,
          className: "min-h-24 space-y-4",
        })}
      </div>
    </section>
  );
}
