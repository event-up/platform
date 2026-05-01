import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import { imageUrlField, type ImageUploadHandler } from "../shared/fields";
import { ImageBlockRenderer } from "./renderer";

type ImageBlockConfigOptions = {
  uploadImage?: ImageUploadHandler;
};

export function createImageBlockConfig(
  options: ImageBlockConfigOptions = {},
): ComponentConfig<EventPageComponents["ImageBlock"]> {
  return {
    fields: {
      imageUrl: imageUrlField("Image", {
        uploadImage: options.uploadImage,
      }),
      alt: { type: "text" },
      caption: { type: "text" },
    },
    defaultProps: {
      imageUrl: "",
      alt: "",
      caption: "",
    },
    render: ImageBlockRenderer,
  };
}

export const imageBlockConfig = createImageBlockConfig();
