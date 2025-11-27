import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User,
    Auth
} from 'firebase/auth';
import { auth } from './index';

// Create Google provider
const googleProvider = new GoogleAuthProvider();

// Configure provider
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

/**
 * Sign in with Google popup
 */
export async function signInWithGoogle(): Promise<User> {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error: any) {
        console.error('Error signing in with Google:', error);
        throw new Error(error.message || 'Failed to sign in with Google');
    }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
    try {
        await firebaseSignOut(auth);
    } catch (error: any) {
        console.error('Error signing out:', error);
        throw new Error(error.message || 'Failed to sign out');
    }
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
