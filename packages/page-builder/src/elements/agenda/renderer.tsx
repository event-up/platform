import type { EventPageComponents } from "../../types";

type AgendaRendererProps = EventPageComponents["Agenda"];

export function AgendaRenderer({ title, items }: AgendaRendererProps) {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-3xl font-semibold text-slate-950">{title}</h2>
        <div className="mt-8 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {(items || []).map((item, index) => (
            <div
              key={`${item.time}-${item.title}-${index}`}
              className="grid gap-3 p-5 md:grid-cols-[140px_1fr]"
            >
              <p className="text-sm font-semibold text-emerald-700">
                {item.time}
              </p>
              <div>
                <h3 className="font-semibold text-slate-950">{item.title}</h3>
                {item.description ? (
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
