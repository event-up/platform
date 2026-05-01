import type { EventPageComponents } from "../../types";

type SponsorLogosRendererProps = EventPageComponents["SponsorLogos"];

export function SponsorLogosRenderer({
  title,
  sponsors,
}: SponsorLogosRendererProps) {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-center text-2xl font-semibold text-slate-950">
          {title}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {(sponsors || []).map((sponsor, index) => {
            const content = sponsor.logoUrl ? (
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                className="max-h-12 max-w-full object-contain"
              />
            ) : (
              <span className="text-sm font-medium text-slate-500">
                {sponsor.name}
              </span>
            );

            return sponsor.href ? (
              <a
                key={`${sponsor.name}-${index}`}
                href={sponsor.href}
                className="flex h-24 items-center justify-center rounded-lg bg-white p-4 ring-1 ring-slate-200"
              >
                {content}
              </a>
            ) : (
              <div
                key={`${sponsor.name}-${index}`}
                className="flex h-24 items-center justify-center rounded-lg bg-white p-4 ring-1 ring-slate-200"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
