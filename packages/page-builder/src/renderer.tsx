import { Render } from "@puckeditor/core";
import { createDefaultEventPageData } from "./defaults";
import { eventPageConfig } from "./config";
import type {
  EventPageData,
  EventPageDefinition,
  EventPageMetadata,
} from "./types";
import {
  normalizeEventPageData,
  normalizeReservedEventPageData,
} from "./validation";

type EventPageRendererProps = {
  data: EventPageData | unknown;
  metadata?: EventPageMetadata;
  page?: Pick<EventPageDefinition, "pageId" | "template">;
};

export function EventPageRenderer({
  data,
  metadata,
  page,
}: EventPageRendererProps) {
  const normalizedData = page
    ? normalizeReservedEventPageData(page, data, metadata)
    : normalizeEventPageData(data, createDefaultEventPageData(metadata));

    
  return (
    <Render
      config={eventPageConfig}
      data={normalizedData}
      metadata={{
        registrationHref: "/reg",
        ...metadata,
      }}
    />
  );
}
