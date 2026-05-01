import type { WithPuckProps } from "@puckeditor/core";
import type { EventPageComponents, EventPageMetadata } from "../../types";
import { getRegistrationHref } from "../shared/links";

type RegistrationCTARendererProps = WithPuckProps<
  EventPageComponents["RegistrationCTA"]
>;

export function RegistrationCTARenderer({
  title,
  description,
  buttonLabel,
  href,
  puck,
}: RegistrationCTARendererProps) {
  const metadata = puck.metadata as EventPageMetadata | undefined;

  return (
    <section className="bg-emerald-700 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold">{title}</h2>
          {description ? (
            <p className="mt-3 max-w-2xl text-emerald-50">{description}</p>
          ) : null}
        </div>
        <a
          href={getRegistrationHref(href, metadata)}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}
