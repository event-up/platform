import type { EventPageComponents } from "../../types";
import { sectionBackground } from "../shared/styles";

type SectionRendererProps = EventPageComponents["Section"];

export function SectionRenderer({
  title,
  body,
  background,
}: SectionRendererProps) {
  return (
    <section className={sectionBackground[background || "white"]}>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-3xl font-semibold text-slate-950">{title}</h2>
        {body ? (
          <p className="mt-4 whitespace-pre-line text-base leading-8 text-slate-600">
            {body}
          </p>
        ) : null}
      </div>
    </section>
  );
}
