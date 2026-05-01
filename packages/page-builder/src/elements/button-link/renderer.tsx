import type { WithPuckProps } from "@puckeditor/core";
import type { EventPageComponents, EventPageMetadata } from "../../types";
import { getRegistrationHref } from "../shared/links";
import { buttonVariant } from "../shared/styles";

type ButtonLinkRendererProps = WithPuckProps<
  EventPageComponents["ButtonLink"]
>;

export function ButtonLinkRenderer({
  label,
  href,
  variant,
  align,
  puck,
}: ButtonLinkRendererProps) {
  const metadata = puck.metadata as EventPageMetadata | undefined;

  return (
    <section className="bg-white">
      <div
        className={`mx-auto max-w-4xl px-6 py-8 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        <a
          href={getRegistrationHref(href, metadata)}
          className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition ${
            buttonVariant[variant || "primary"]
          }`}
        >
          {label}
        </a>
      </div>
    </section>
  );
}
