import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { auth } from "./index";

// Create Google provider
const googleProvider = new GoogleAuthProvider();

// Configure provider
googleProvider.setCustomParameters({
  prompt: "select_account",
});

/**
 * Sign in with Google popup
 */
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Sign in with email and password
 */
export async function signInWithEmailPassword(
  email: string,
  password: string
): Promise<User> {
  const result = await firebaseSignInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return result.user;
}

/**
 * Create a user with email and password
 */
export async function createEmailPasswordUser(
  email: string,
  password: string
): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(
  callback: (user: User | null) => void
): () => void {
  return onAuthStateChanged(auth, callback);
}

/**
 * Get current authenticated user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}
