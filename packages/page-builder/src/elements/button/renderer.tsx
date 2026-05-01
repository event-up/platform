import type { WithPuckProps } from "@puckeditor/core";
import type { EventPageComponents, EventPageMetadata } from "../../types";
import { getRegistrationHref } from "../shared/links";
import { buttonVariant } from "../shared/styles";

type ButtonRendererProps = WithPuckProps<EventPageComponents["Button"]>;

const buttonAlign = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function ButtonRenderer({
  label,
  href,
  variant,
  align,
  puck,
}: ButtonRendererProps) {
  const metadata = puck.metadata as EventPageMetadata | undefined;

  return (
    <div className={buttonAlign[align || "left"]}>
      <a
        href={getRegistrationHref(href, metadata)}
        className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition ${
          buttonVariant[variant || "primary"]
        }`}
      >
        {label}
      </a>
    </div>
  );
}
