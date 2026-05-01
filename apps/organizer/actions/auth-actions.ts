"use server";

import { cookies } from "next/headers";
import { serverAuth } from "@workspace/firebase/server";
import { ActionError, AuthenticationError } from "@workspace/models/errors";

const SESSION_COOKIE_NAME = "__session";
const SESSION_DURATION_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

export async function createSession(idToken: string): Promise<void> {
  let sessionCookie: string;
  try {
    sessionCookie = await serverAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION_MS,
    });
  } catch {
    throw new AuthenticationError(
      "Failed to create session. Please try again.",
    );
  }
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000, // maxAge in seconds
    sameSite: "lax", // "strict" breaks Google OAuth redirect
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function verifySession(): Promise<{ valid: boolean }> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!session) return { valid: false };
    await serverAuth.verifySessionCookie(session, true);
    return { valid: true };
  } catch {
    return { valid: false };
  }
}
