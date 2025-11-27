# Firebase Google Authentication - Organizer App

## Overview
This organizer app now has Firebase Google Authentication integrated. Users can sign in with their Google account to access the dashboard.

## Features Implemented

### 1. Authentication Utilities (`packages/firebase/auth.ts`)
- `signInWithGoogle()`: Handles Google sign-in popup
- `signOut()`: Signs out the current user
- `onAuthStateChange()`: Subscribe to authentication state changes
- `getCurrentUser()`: Get the currently authenticated user

### 2. Authentication Context (`apps/organizer/lib/auth-context.tsx`)
Provides authentication state management across the app:
- `user`: Current authenticated user or null
- `loading`: Loading state during authentication checks
- `signInWithGoogle()`: Function to trigger Google sign-in
- `signOut()`: Function to sign out

### 3. Protected Routes (`apps/organizer/components/protected-route.tsx`)
A wrapper component that:
- Redirects unauthenticated users to `/login`
- Shows loading state while checking authentication
- Renders children only for authenticated users

### 4. Updated Components
- **Login Form**: Implements Google sign-in with error handling and loading states
- **Sidebar**: Shows user information and sign-out button
- **Providers**: Wraps app with AuthProvider
- **Main Layout**: Protected with authentication requirement

## Usage

### Protecting a Route
Wrap any page that requires authentication:

\`\`\`tsx
import { ProtectedRoute } from "@/components/protected-route";

export default function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>Protected content</div>
    </ProtectedRoute>
  );
}
\`\`\`

### Using Authentication in Components
Use the `useAuth` hook:

\`\`\`tsx
import { useAuth } from "@/lib/auth-context";

function MyComponent() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign In</button>
      )}
    </div>
  );
}
\`\`\`

### Using the useUser Hook
A simpler hook for checking authentication status:

\`\`\`tsx
import { useUser } from "@/hooks/use-user";

function MyComponent() {
  const { user, isAuthenticated, loading } = useUser();
  
  // Use the data
}
\`\`\`

## Authentication Flow

1. **Unauthenticated User**:
   - User visits protected route
   - ProtectedRoute component detects no user
   - Redirects to `/login`

2. **Sign In**:
   - User clicks "Sign in with Google"
   - Google popup opens for account selection
   - User authenticates
   - Firebase returns user data
   - AuthContext updates with user
   - User redirected to main dashboard

3. **Authenticated User**:
   - User data persisted in Firebase Auth
   - AuthContext provides user across app
   - Protected routes render normally
   - User info shown in sidebar

4. **Sign Out**:
   - User clicks "Sign Out" in sidebar
   - Firebase signs out user
   - AuthContext clears user state
   - User redirected to `/login`

## Environment Variables

Make sure your `.env` or `.env.local` file has Firebase configuration:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

## Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication:
   - Navigate to Authentication > Sign-in method
   - Enable Google provider
   - Add authorized domains (localhost, your-domain.com)
3. Configure OAuth consent screen if needed

## Dependencies Added

- `firebase@^12.4.0` - Firebase SDK
- `@workspace/firebase` - Workspace Firebase package

## Files Created/Modified

### Created:
- `packages/firebase/auth.ts` - Authentication utilities
- `apps/organizer/lib/auth-context.tsx` - Auth context provider
- `apps/organizer/components/protected-route.tsx` - Route protection component
- `apps/organizer/hooks/use-user.ts` - User authentication hook

### Modified:
- `apps/organizer/app/login/login-form.container.tsx` - Added Google sign-in
- `apps/organizer/components/providers.tsx` - Added AuthProvider
- `apps/organizer/components/sidebar.component.tsx` - Added user info and sign-out
- `apps/organizer/app/(main)/layout.tsx` - Protected main routes
- `apps/organizer/package.json` - Added dependencies
- `packages/firebase/index.ts` - Export auth functions

## Testing

To test the authentication:

1. Start the dev server: `pnpm dev`
2. Navigate to `/login`
3. Click "Sign in with Google"
4. Select your Google account
5. You should be redirected to the dashboard
6. Check the sidebar for your user info
7. Click "Sign Out" to test sign out functionality
