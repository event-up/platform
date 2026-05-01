import { randomUUID } from "node:crypto";

import { env } from "@/env";
import { serverStorage } from "@workspace/firebase/server";

type UploadContextHandlerInput = {
  file: File;
  formData: FormData;
  organizerId: string;
};

type UploadContextResult = {
  downloadUrl: string;
  storagePath: string;
};

type UploadContextHandler = (
  input: UploadContextHandlerInput,
) => Promise<UploadContextResult>;

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const IMAGE_CONTENT_TYPE_PATTERN = /^image\/(avif|gif|jpeg|png|webp|svg\+xml)$/;
const FIREBASE_UPLOAD_ATTEMPTS = 2;

export class UploadValidationError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "UploadValidationError";
    this.status = status;
  }
}

function getRequiredTextField(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new UploadValidationError(`Missing required field: ${key}.`);
  }

  return sanitizePathSegment(value, key);
}

function getOptionalTextField(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  return sanitizePathSegment(value, key);
}

function sanitizePathSegment(value: string, fieldName: string) {
  const sanitized = value.trim().replace(/[^a-zA-Z0-9_-]/g, "-");

  if (!sanitized) {
    throw new UploadValidationError(`Invalid value for field: ${fieldName}.`);
  }

  return sanitized;
}

function createSafeStorageFileName(fileName: string) {
  return (
    fileName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/^-+|-+$/g, "") || "uploaded-image"
  );
}

function assertImageFile(file: File) {
  if (!IMAGE_CONTENT_TYPE_PATTERN.test(file.type)) {
    throw new UploadValidationError("Only image uploads are supported.");
  }

  if (file.size <= 0) {
    throw new UploadValidationError("The uploaded file is empty.");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new UploadValidationError("Image uploads must be 5 MB or smaller.");
  }
}

function buildFirebaseDownloadUrl(storagePath: string, token: string) {
  const bucketName = env.FIREBASE_STORAGE_BUCKET;
  const encodedPath = encodeURIComponent(storagePath);

  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedPath}?alt=media&token=${token}`;
}

function isTransientUploadError(error: unknown) {
  if (!(error instanceof Error)) return false;

  const message = error.message.toLowerCase();

  return (
    message.includes("epipe") ||
    message.includes("econnreset") ||
    message.includes("socket hang up") ||
    message.includes("network timeout")
  );
}

async function writeFileToFirebaseStorage({
  bytes,
  contentType,
  storagePath,
  token,
}: {
  bytes: Buffer;
  contentType: string;
  storagePath: string;
  token: string;
}) {
  const bucket = serverStorage.bucket(env.FIREBASE_STORAGE_BUCKET);
  const storageFile = bucket.file(storagePath);

  await new Promise<void>((resolve, reject) => {
    const stream = storageFile.createWriteStream({
      resumable: true,
      metadata: {
        contentType,
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
    });

    stream.on("finish", resolve);
    stream.on("error", reject);
    stream.end(bytes);
  });
}

async function uploadImageToFirebaseAdminStorage(
  file: File,
  storagePath: string,
) {
  assertImageFile(file);

  const token = randomUUID();
  const bytes = Buffer.from(await file.arrayBuffer());

  for (let attempt = 1; attempt <= FIREBASE_UPLOAD_ATTEMPTS; attempt += 1) {
    try {
      await writeFileToFirebaseStorage({
        bytes,
        contentType: file.type,
        storagePath,
        token,
      });
      break;
    } catch (error) {
      if (
        attempt === FIREBASE_UPLOAD_ATTEMPTS ||
        !isTransientUploadError(error)
      ) {
        throw error;
      }
    }
  }

  return buildFirebaseDownloadUrl(storagePath, token);
}

function buildEventImagePath({
  organizerId,
  eventId,
  folder,
  file,
}: {
  organizerId: string;
  eventId: string;
  folder: string;
  file: File;
}) {
  const safeFileName = createSafeStorageFileName(file.name);

  return [
    "Organizers",
    organizerId,
    "Events",
    eventId,
    folder,
    `${randomUUID()}-${safeFileName}`,
  ].join("/");
}

async function uploadRegistrationCover({
  file,
  formData,
  organizerId,
}: UploadContextHandlerInput) {
  const eventId = getRequiredTextField(formData, "eventId");
  const storagePath = buildEventImagePath({
    organizerId,
    eventId,
    folder: "registration-cover",
    file,
  });

  return {
    downloadUrl: await uploadImageToFirebaseAdminStorage(file, storagePath),
    storagePath,
  };
}

async function uploadEventPageImage({
  file,
  formData,
  organizerId,
}: UploadContextHandlerInput) {
  const eventId = getRequiredTextField(formData, "eventId");
  const pageId = getOptionalTextField(formData, "pageId") ?? "shared";
  const imageContext =
    getOptionalTextField(formData, "imageContext") ?? "image";
  const storagePath = buildEventImagePath({
    organizerId,
    eventId,
    folder: `page-builder/${pageId}/${imageContext}`,
    file,
  });

  const usrl = await uploadImageToFirebaseAdminStorage(file, storagePath);
  return {
    downloadUrl: usrl,
    storagePath,
  };
}

export const UPLOAD_CONTEXT_HANDLERS = {
  "registration-cover": uploadRegistrationCover,
  "event-page-image": uploadEventPageImage,
} satisfies Record<string, UploadContextHandler>;

export type UploadContextKey = keyof typeof UPLOAD_CONTEXT_HANDLERS;

export function isUploadContextKey(value: string): value is UploadContextKey {
  return Object.prototype.hasOwnProperty.call(UPLOAD_CONTEXT_HANDLERS, value);
}
