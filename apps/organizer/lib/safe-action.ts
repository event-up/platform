import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { ActionError, AuthenticationError } from "@workspace/models/errors";
import { cookies } from "next/headers";
import { serverAuth } from "@workspace/firebase/server";

export const authActionClient = createSafeActionClient({
  handleServerError(e) {
    console.error("[safe-action]:", e);
    if (e instanceof ActionError) return e.message;
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next }) => {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session")?.value;
  console.log("session :: ", session);
  if (!session)
    throw new ActionError("Authentication required. Please sign in.");

  let decoded: { uid: string };
  try {
    decoded = await serverAuth.verifySessionCookie(session, true);
  } catch {
    throw new AuthenticationError(
      "Session expired or invalid. Please sign in again.",
    );
  }

  return next({ ctx: { organizerId: decoded.uid } });
});
