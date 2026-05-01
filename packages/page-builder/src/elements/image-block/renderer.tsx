import type { EventPageComponents } from "../../types";

type ImageBlockRendererProps = EventPageComponents["ImageBlock"];

export function ImageBlockRenderer({
  imageUrl,
  alt,
  caption,
}: ImageBlockRendererProps) {
  return (
    <section className="bg-white">
      <figure className="mx-auto max-w-5xl px-6 py-12">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={alt || ""}
            className="aspect-[16/9] w-full rounded-lg object-cover"
          />
        ) : (
          <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-500">
            Add an image URL
          </div>
        )}
        {caption ? (
          <figcaption className="mt-3 text-sm text-slate-500">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </section>
  );
}
