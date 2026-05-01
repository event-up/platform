import type { WithPuckProps } from "@puckeditor/core";
import type { EventPageComponents, EventPageMetadata } from "../../types";
import { getRegistrationHref } from "../shared/links";

type HeroRendererProps = WithPuckProps<EventPageComponents["Hero"]>;

export function HeroRenderer({
  eyebrow,
  title,
  subtitle,
  imageUrl,
  align,
  buttonLabel,
  buttonHref,
  puck,
}: HeroRendererProps) {
  const centered = align === "center";
  const metadata = puck.metadata as EventPageMetadata | undefined;

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/35" />
      <div
        className={`relative mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-6 py-24 ${
          centered ? "items-center text-center" : "items-start"
        }`}
      >
        {eyebrow ? (
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
            {subtitle}
          </p>
        ) : null}
        {buttonLabel ? (
          <a
            href={getRegistrationHref(buttonHref, metadata)}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-emerald-500 px-5 text-sm font-semibold text-white transition hover:bg-emerald-400"
          >
            {buttonLabel}
          </a>
        ) : null}
      </div>
    </section>
  );
}
