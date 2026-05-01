import type { EventPageComponents } from "../../types";

type SpeakerGridRendererProps = EventPageComponents["SpeakerGrid"];

export function SpeakerGridRenderer({
  title,
  speakers,
}: SpeakerGridRendererProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-semibold text-slate-950">{title}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(speakers || []).map((speaker, index) => (
            <article
              key={`${speaker.name}-${index}`}
              className="rounded-lg border border-slate-200 p-5"
            >
              {speaker.imageUrl ? (
                <img
                  src={speaker.imageUrl}
                  alt={speaker.name}
                  className="mb-4 aspect-square w-full rounded-md object-cover"
                />
              ) : null}
              <h3 className="font-semibold text-slate-950">{speaker.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{speaker.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
