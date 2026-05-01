import type { WithPuckProps } from "@puckeditor/core";
import type { EventPageComponents, EventPageMetadata } from "../../types";

type RegistrationFormSlotRendererProps = WithPuckProps<
  EventPageComponents["RegistrationFormSlot"]
>;

export function RegistrationFormSlotRenderer({
  title,
  description,
  puck,
}: RegistrationFormSlotRendererProps) {
  const metadata = puck.metadata as EventPageMetadata | undefined;

  if (metadata?.registrationSlot) {
    return <>{metadata.registrationSlot}</>;
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Reserved flow
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            {title || "Registration form"}
          </h2>
          {description ? (
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
