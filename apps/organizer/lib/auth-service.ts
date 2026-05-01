"use client";

import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import {
  createEmailPasswordUser,
  signInWithEmailPassword as firebaseSignInWithEmailPassword,
  signInWithGoogle as firebaseSignInWithGoogle,
  signOut as firebaseSignOut,
} from "@workspace/firebase/auth";
import {
  createOrganizer,
  getOrganizer,
} from "@workspace/database/client/organizer";
import { UserRole } from "@workspace/models/db/user";
import { NotFoundError } from "@workspace/utils/src/errors/database";
import { createSession, destroySession } from "@/actions/auth-actions";

export type AuthCredentials = {
  email: string;
  password: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCredentials({ email, password }: AuthCredentials) {
  const normalizedEmail = email.trim();

  if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
    throw new Error("Enter a valid email address.");
  }

  if (!password) {
    throw new Error("Enter your password.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  return { email: normalizedEmail, password };
}

function getAuthErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/invalid-email":
      case "auth/user-disabled":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "The email or password you entered is incorrect.";
      case "auth/email-already-in-use":
        return "An account already exists for this email address.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      case "auth/popup-closed-by-user":
      case "auth/cancelled-popup-request":
        return "Google sign-in was cancelled.";
      case "auth/account-exists-with-different-credential":
        return "An account already exists with a different sign-in method.";
      case "auth/popup-blocked":
        return "Your browser blocked the Google sign-in popup.";
      default:
        return "Authentication failed. Please try again.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Authentication failed. Please try again.";
}

async function ensureOrganizerProfile(user: User) {
  try {
    await getOrganizer(user.uid);
  } catch (error) {
    if (!(error instanceof NotFoundError)) {
      throw error;
    }

    await createOrganizer({
      userId: user.uid,
      email: user.email || "",
      role: UserRole.ORGANIZER,
      profileImgUrl: user.photoURL || "",
    });
  }
}

async function completeOrganizerAuth(user: User) {
  await ensureOrganizerProfile(user);
  const idToken = await user.getIdToken();
  await createSession(idToken);
  return user;
}

async function runAuthFlow(authFlow: () => Promise<User>) {
  try {
    const user = await authFlow();
    return await completeOrganizerAuth(user);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export async function signInWithGoogle() {
  return runAuthFlow(firebaseSignInWithGoogle);
}

export async function signInWithEmailPassword(credentials: AuthCredentials) {
  const validCredentials = validateCredentials(credentials);

  return runAuthFlow(() =>
    firebaseSignInWithEmailPassword(
      validCredentials.email,
      validCredentials.password
    )
  );
}

export async function registerWithEmailPassword(credentials: AuthCredentials) {
  const validCredentials = validateCredentials(credentials);

  return runAuthFlow(() =>
    createEmailPasswordUser(validCredentials.email, validCredentials.password)
  );
}

export async function signOut() {
  try {
    await destroySession();
    await firebaseSignOut();
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}
