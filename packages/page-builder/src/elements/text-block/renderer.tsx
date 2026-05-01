import type { EventPageComponents } from "../../types";

type TextBlockRendererProps = EventPageComponents["TextBlock"];

export function TextBlockRenderer({
  title,
  body,
  align,
}: TextBlockRendererProps) {
  return (
    <section className="bg-white">
      <div
        className={`mx-auto max-w-3xl px-6 py-12 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-3 whitespace-pre-line text-slate-600">{body}</p>
      </div>
    </section>
  );
}
