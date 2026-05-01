"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  Puck,
  createUsePuck,
  type Data,
  type UiState,
  type Viewports,
} from "@puckeditor/core";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { publishEventPagesAction } from "@/actions/event-page-actions";
import {
  createEventPageClientConfig,
  eventPageClientConfig,
  type EventPageImageUploadContext,
} from "@workspace/page-builder/config/client";
import type { EventPageSeo, EventPageSitePage } from "@workspace/page-builder";
import styles from "./page-builder-editor.module.css";

type PageBuilderEditorProps = {
  eventId: string;
  initialPages: EventPageSitePage[];
};

const PAGE_TAB_ORDER = ["inv", "reg", "confirmation", "home"];
const PAGE_BUILDER_VIEWPORTS = [
  { width: 390, height: 844, label: "Mobile" },
  { width: 768, height: 1024, label: "Tablet" },
  { width: 1440, height: 900, label: "Desktop" },
] satisfies Viewports;

type ViewportState = UiState["viewports"]["current"];
const usePageBuilderPuck = createUsePuck<typeof eventPageClientConfig>();

type UploadImageResponse = {
  downloadUrl?: string;
  error?: string;
};

type ViewportStateBridgeProps = {
  children: ReactNode;
  onViewportChange: (viewport: ViewportState) => void;
};

function ViewportStateBridge({
  children,
  onViewportChange,
}: ViewportStateBridgeProps) {
  const viewport = usePageBuilderPuck(
    (state) => state.appState.ui.viewports.current,
  );

  useEffect(() => {
    onViewportChange(viewport);
  }, [onViewportChange, viewport]);

  return children;
}

function getOrderedPages(pages: EventPageSitePage[]) {
  return [...pages].sort((firstPage, secondPage) => {
    const firstIndex = PAGE_TAB_ORDER.indexOf(firstPage.pageId);
    const secondIndex = PAGE_TAB_ORDER.indexOf(secondPage.pageId);
    const normalizedFirstIndex =
      firstIndex === -1 ? PAGE_TAB_ORDER.length : firstIndex;
    const normalizedSecondIndex =
      secondIndex === -1 ? PAGE_TAB_ORDER.length : secondIndex;

    return normalizedFirstIndex - normalizedSecondIndex;
  });
}

function getActionError(
  result:
    | {
        serverError?: string;
        validationErrors?: unknown;
      }
    | null
    | undefined,
) {
  if (result?.serverError) return result.serverError;
  if (result?.validationErrors) return "Invalid page builder data.";
  return null;
}

function getSeoFromData(data: Data, seo: EventPageSeo = {}): EventPageSeo {
  const rootProps = data.root?.props as
    | { title?: unknown; description?: unknown }
    | undefined;

  return {
    title:
      seo.title ||
      (typeof rootProps?.title === "string" ? rootProps.title : ""),
    description:
      seo.description ||
      (typeof rootProps?.description === "string" ? rootProps.description : ""),
    imageUrl: seo.imageUrl,
  };
}

export function PageBuilderEditor({
  eventId,
  initialPages,
}: PageBuilderEditorProps) {
  const [pages, setPages] = useState<EventPageSitePage[]>(initialPages);
  const [selectedPageId, setSelectedPageId] = useState(
    getOrderedPages(initialPages)[0]?.pageId ?? "home",
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const [currentViewport, setCurrentViewport] = useState<ViewportState | null>(
    null,
  );

  const tabPages = useMemo(() => getOrderedPages(pages), [pages]);

  const selectedPage = useMemo(
    () => pages.find((page) => page.pageId === selectedPageId) ?? pages[0],
    [pages, selectedPageId],
  );

  const headerPath = useMemo(() => `/event/${eventId}/page-builder`, [eventId]);

  const updateSelectedPage = (
    updater: (page: EventPageSitePage) => EventPageSitePage,
  ) => {
    setPages((currentPages) =>
      currentPages.map((page) =>
        page.pageId === selectedPageId ? updater(page) : page,
      ),
    );
  };

  const withSelectedData = (data: Data = selectedPage?.data as Data) =>
    pages.map((page) =>
      page.pageId === selectedPageId
        ? {
            ...page,
            data: data as EventPageSitePage["data"],
          }
        : page,
    );

  const preparePagesForWrite = (nextPages: EventPageSitePage[]) =>
    nextPages.map((page) => ({
      ...page,
      seo: getSeoFromData(page.data as Data, page.seo ?? {}),
    }));

  const persistViewport = useCallback((nextViewport: ViewportState) => {
    setCurrentViewport((previousViewport) => {
      if (
        previousViewport?.width === nextViewport.width &&
        previousViewport?.height === nextViewport.height
      ) {
        return previousViewport;
      }

      return nextViewport;
    });
  }, []);

  const puckUi = useMemo(
    () =>
      currentViewport
        ? {
            viewports: {
              current: currentViewport,
              controlsVisible: true,
              options: PAGE_BUILDER_VIEWPORTS,
            },
          }
        : undefined,
    [currentViewport],
  );

  const uploadPageBuilderImage = useCallback(
    async (
      file: File,
      { imageContext }: { imageContext: EventPageImageUploadContext },
    ) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("context", "event-page-image");
      formData.append("eventId", eventId);
      formData.append("pageId", selectedPageId);
      formData.append("imageContext", imageContext);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as UploadImageResponse;

      if (!response.ok || !payload.downloadUrl) {
        throw new Error(payload.error || "Failed to upload image.");
      }

      return payload.downloadUrl;
    },
    [eventId, selectedPageId],
  );

  const pageBuilderConfig = useMemo(
    () =>
      createEventPageClientConfig({
        uploadImage: uploadPageBuilderImage,
      }),
    [uploadPageBuilderImage],
  );

  const puckOverrides = useMemo(
    () => ({
      puck: ({ children }: { children: ReactNode }) => (
        <ViewportStateBridge onViewportChange={persistViewport}>
          {children}
        </ViewportStateBridge>
      ),
    }),
    [persistViewport],
  );

  const publish = async (data: Data = selectedPage?.data as Data) => {
    const nextPages = preparePagesForWrite(withSelectedData(data));
    setPages(nextPages);
    setIsPublishing(true);

    try {
      const result = await publishEventPagesAction({
        eventId,
        pages: nextPages,
      });
      const error = getActionError(result);
      if (error) throw new Error(error);
      toast.success("Pages published", {
        description: "All public event pages now use the latest content.",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  if (!selectedPage) {
    return null;
  }

  return (
    <Tabs
      value={selectedPage.pageId}
      onValueChange={setSelectedPageId}
      className="min-h-[calc(100vh-10rem)] gap-5"
    >
      <TabsList className="max-w-full justify-start overflow-x-auto">
        {tabPages.map((page) => (
          <TabsTrigger key={page.pageId} value={page.pageId}>
            {page.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={selectedPage.pageId} className="m-0">
        <div className={styles.editorSurface} aria-busy={isPublishing}>
          <Puck
            key={selectedPage.pageId}
            config={pageBuilderConfig}
            data={selectedPage.data}
            // headerPath={headerPath}
            headerTitle={`${selectedPage.name} Builder`}
            height="calc(100vh - 220px)"
            metadata={{ registrationHref: "/reg" }}
            onChange={(data: Data) =>
              updateSelectedPage((page) => ({
                ...page,
                data: data as EventPageSitePage["data"],
              }))
            }
            onPublish={publish}
            overrides={puckOverrides}
            ui={puckUi}
            viewports={PAGE_BUILDER_VIEWPORTS}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
