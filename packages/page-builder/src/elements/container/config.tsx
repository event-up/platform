import type { ComponentConfig } from "@puckeditor/core";
import type { EventPageComponents } from "../../types";
import {
  backgroundAttachmentField,
  backgroundImageField,
  backgroundImagePositionField,
  backgroundImageSizeField,
  paddingField,
  sizeField,
  type ImageUploadHandler,
} from "../shared/fields";
import { containerAllowedComponents } from "./allowed-components";
import { ContainerRenderer } from "./renderer";

type ContainerConfigOptions = {
  uploadBackgroundImage?: ImageUploadHandler;
};

export function createContainerConfig(
  options: ContainerConfigOptions = {},
): ComponentConfig<EventPageComponents["Container"]> {
  return {
    fields: {
      children: {
        type: "slot",
        allow: containerAllowedComponents,
      },
      background: {
        type: "select",
        options: [
          { label: "Transparent", value: "transparent" },
          { label: "White", value: "white" },
          { label: "Muted", value: "muted" },
          { label: "Accent", value: "accent" },
        ],
      },
      padding: paddingField("Padding"),
      height: sizeField("Height"),
      minHeight: sizeField("Minimum height"),
      backgroundImage: backgroundImageField("Background image", {
        uploadImage: options.uploadBackgroundImage,
      }),
      backgroundImagePosition: backgroundImagePositionField(
        "Background image position",
      ),
      backgroundImageSize: backgroundImageSizeField("Background image size"),
      backgroundAttachment: backgroundAttachmentField(
        "Background Attachment",
      ),
      maxWidth: {
        type: "select",
        options: [
          { label: "Small", value: "small" },
          { label: "Medium", value: "medium" },
          { label: "Large", value: "large" },
          { label: "Full", value: "full" },
        ],
      },
      align: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ],
      },
    },
    defaultProps: {
      children: [],
      background: "transparent",
      padding: {
        all: false,
        top: 32,
        right: 24,
        bottom: 32,
        left: 24,
      },
      height: {
        enabled: false,
        value: 320,
        unit: "px",
      },
      minHeight: {
        enabled: false,
        value: 320,
        unit: "px",
      },
      backgroundImage: "",
      backgroundImagePosition: "center center",
      backgroundImageSize: "cover",
      backgroundAttachment: "scroll",
      maxWidth: "large",
      align: "left",
    },
    render: ContainerRenderer,
  };
}

export const containerConfig = createContainerConfig();
