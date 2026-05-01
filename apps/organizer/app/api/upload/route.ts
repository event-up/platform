import { NextRequest, NextResponse } from "next/server";

import { serverAuth } from "@workspace/firebase/server";
import {
  UPLOAD_CONTEXT_HANDLERS,
  UploadValidationError,
  isUploadContextKey,
} from "@/lib/server/file-upload-contexts";

export const runtime = "nodejs";

function isUploadFile(value: FormDataEntryValue | null): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    "name" in value &&
    "size" in value
  );
}

async function getOrganizerIdFromSession(request: NextRequest) {
  const session = request.cookies.get("__session")?.value;

  if (!session) {
    throw new UploadValidationError("Authentication required.", 401);
  }

  try {
    const decoded = await serverAuth.verifySessionCookie(session, true);
    return decoded.uid;
  } catch {
    throw new UploadValidationError("Session expired or invalid.", 401);
  }
}

export async function POST(request: NextRequest) {
  try {
    const organizerId = await getOrganizerIdFromSession(request);
    const formData = await request.formData();
    const file = formData.get("file");
    const context = formData.get("context");

    if (!isUploadFile(file)) {
      throw new UploadValidationError("Missing file upload.");
    }

    if (typeof context !== "string" || !isUploadContextKey(context)) {
      throw new UploadValidationError("Unsupported upload context.");
    }

    const result = await UPLOAD_CONTEXT_HANDLERS[context]({
      file,
      formData,
      organizerId,
    });

    return NextResponse.json({
      downloadUrl: result.downloadUrl,
    });
  } catch (error) {
    if (error instanceof UploadValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("[upload-route]:", error);
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 },
    );
  }
}
