import type { EventPageComponents } from "../../types";

type TextLabelRendererProps = EventPageComponents["TextLabel"];

const defaultTextColorClass = "text-[#334155]";

const legacyTextLabelSize = {
  small: 14,
  medium: 16,
  large: 20,
};

const textLabelWeight = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
};

const textLabelAlign = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function resolveFontSize(size: TextLabelRendererProps["size"]) {
  if (typeof size === "number" && Number.isFinite(size)) return size;
  if (typeof size === "string") {
    const legacySize =
      legacyTextLabelSize[size as keyof typeof legacyTextLabelSize];
    if (legacySize) return legacySize;

    const numericSize = Number(size);
    if (Number.isFinite(numericSize)) return numericSize;
  }

  return legacyTextLabelSize.medium;
}

function cssValueFromArbitraryValue(value: string) {
  return value.replace(/_/g, " ");
}

function resolveTextColorStyle(textColor: string | undefined) {
  const colorClass = textColor || defaultTextColorClass;
  const gradientMatch = colorClass.match(
    /bg-\[linear-gradient\(([-\d.]+)deg,([^,\]]+),([^,\]]+)\)\]/,
  );

  if (gradientMatch) {
    return {
      backgroundImage: `linear-gradient(${gradientMatch[1]}deg, ${cssValueFromArbitraryValue(
        gradientMatch[2] || "#0f172a",
      )}, ${cssValueFromArbitraryValue(gradientMatch[3] || "#22c55e")})`,
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
      WebkitTextFillColor: "transparent",
    };
  }

  const solidMatch = colorClass.match(/^text-\[(.+)\]$/);

  return {
    color: solidMatch
      ? cssValueFromArbitraryValue(solidMatch[1] || "#334155")
      : "#334155",
  };
}

export function TextLabelRenderer({
  text,
  size,
  textColor,
  weight,
  align,
}: TextLabelRendererProps) {
  const colorClass = textColor || defaultTextColorClass;

  return (
    <p
      className={`whitespace-pre-line leading-normal ${colorClass} ${
        textLabelWeight[weight || "regular"]
      } ${textLabelAlign[align || "left"]}`}
      style={{
        fontSize: resolveFontSize(size),
        ...resolveTextColorStyle(textColor),
      }}
    >
      {text}
    </p>
  );
}
