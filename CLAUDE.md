# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Overview

This is a **pnpm + Turbo monorepo** for the EventUp platform — an event management system with QR-based check-in.

- **Package manager**: pnpm (v10.4.1), Node ≥ 20
- **Build orchestration**: Turbo (v2.x)
- **Backend**: Firebase (Firestore, Storage, Cloud Functions, Auth)
- **Frontend**: Next.js 15 (all apps except landing which uses 16), React, Tailwind CSS, shadcn/ui

## Commands

```bash
# Root-level (runs across all workspaces via Turbo)
pnpm dev            # Start all dev servers concurrently
pnpm build          # Build all apps and packages
pnpm lint           # Lint all workspaces
pnpm format         # Format with Prettier (TS, TSX, MD)

# Per-app dev (individual ports)
pnpm --filter=landing dev       # port 4000 (no turbopack)
pnpm --filter=organizer dev     # port 4001 (turbopack)
pnpm --filter=checker dev       # port 4002 (turbopack)
pnpm --filter=front-face dev    # port 4003 (turbopack)

# Type checking
pnpm --filter=<app> typecheck   # runs tsc --noEmit

# Firebase functions
cd functions && pnpm build      # compile functions
cd functions && pnpm serve      # local emulator
cd functions && pnpm deploy     # deploy to Firebase
```

## Architecture

### Apps (`apps/`)

| App | Port | Purpose |
|-----|------|---------|
| `landing` | 4000 | Public marketing site |
| `organizer` | 4001 | Event organizer dashboard |
| `checker` | 4002 | QR code scanning/check-in |
| `front-face` | 4003 | Guest registration & participation |

### Shared Packages (`packages/`)

| Package | Purpose |
|---------|---------|
| `ui` | Shared component library (Radix UI, shadcn/ui, Tailwind) |
| `models` | TypeScript type definitions (`db/`, `dynamic-form/`) |
| `database` | Firestore read/write operations (server-side) |
| `firebase` | Firebase SDK initialization + Firestore rules/indexes |
| `check-token` | QR token generation and validation |
| `channels` | Third-party notification integrations (Notify.lk via axios) |
| `surveyjs` | Dynamic form/survey builder components (React Hook Form + react-grid-layout) |
| `utils` | Shared utility functions |
| `const` | Shared constants and enums |
| `eslint-config` | Shared ESLint configurations |
| `typescript-config` | Shared TypeScript configs (`base`, `nextjs`, `react-library`) |

### Firebase Functions (`functions/`)

Cloud Functions handling async background work:
- `src/triggers/` — Firestore event triggers
- `src/triggers/invitation-job/` — Invitation sending logic
- `src/task-queue/` — Cloud Task queue handlers
- `src/helpers/` — Shared function utilities

## Key Architectural Patterns

### Data Flow
- **Next.js Server Actions** are used extensively for data mutations (files named `actions.ts` or in `actions/` directories)
- `@workspace/database` package contains all Firestore operations, split by entity (`event/`, `registration/`, `organizer/`, etc.)
- Client-side data fetching uses **TanStack React Query** (`@tanstack/react-query`)

### Server Actions — Defining and Invoking

The `organizer` app uses [`next-safe-action`](https://next-safe-action.dev) for all authenticated mutations. **Do not use plain `"use server"` functions for organizer mutations** — use `authActionClient` instead.

#### Two categories of server actions

**1. Auth lifecycle actions** (`apps/organizer/actions/auth-actions.ts`)
Plain `"use server"` functions used during the session cookie lifecycle (before/during sign-in and sign-out). These run outside `authActionClient` because the session cookie may not yet exist.

```typescript
"use server";
// createSession(idToken) — call after Firebase sign-in to mint the __session cookie
// destroySession()       — call before firebaseSignOut() to clear the cookie
```

**2. Authenticated mutations** — all other organizer actions
Defined with `authActionClient` from `apps/organizer/lib/safe-action.ts`. No `"use server"` directive needed.

```typescript
// apps/organizer/actions/some-actions.ts
import { z } from "zod";
import { authActionClient } from "@/lib/safe-action";

export const myAction = authActionClient
  .metadata({ actionName: "myAction" })
  .schema(z.object({ eventId: z.string().min(1) }))
  .action(async ({ parsedInput, ctx: { organizerId } }) => {
    // organizerId is resolved server-side from the __session cookie — never trust client input
    await doSomething(organizerId, parsedInput.eventId);
    return { message: "Done" };
  });
```

#### Invoking from a mutation hook

```typescript
import { myAction } from "@/actions/some-actions";

mutationFn: async (params) => {
  const result = await myAction(params);
  if (result?.serverError) throw new Error(result.serverError);
  if (result?.validationErrors) throw new Error("Invalid input provided");
  return result?.data;
},
```

#### Key rules
- `organizerId` is **never** accepted as a client parameter — always read from `ctx` injected by middleware
- Throw `ActionError` (imported from `@/lib/safe-action`) for user-visible error messages; other errors return a generic message
- Input validation is handled by Zod schema passed to `.schema()` — no manual validation needed

### Firebase Integration
- Firebase config is injected via `NEXT_PUBLIC_FIREBASE_*` env vars (see turbo.json for full list)
- Firebase Admin SDK uses `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `GOOGLE_APPLICATION_CREDENTIALS`
- Firestore rules live in `packages/firebase/firestore.rules.json`
- Firestore indexes live in `packages/firebase/firestore.indexes.json` — update here when adding new queries

### Environment Variables
Apps use `@t3-oss/env-nextjs` with Zod for validated env schemas. Each app has an `env.ts` file. Always define new env vars there before using them, and add them to `turbo.json`'s `globalEnv` if needed for build caching.

### UI Components
- Shared components live in `packages/ui/src/components/`
- Apps import via `@workspace/ui/components/*`
- Apps must include `@workspace/ui` in their `transpilePackages` in `next.config`

### Next.js App Router
All apps use the App Router. Route groups use `(folder)` convention. Server Components are the default; client components use `"use client"` directive.

## Firebase Project

- Project ID: `eventup-prod-18609` (from `.firebaserc`)
- Deploy: `firebase deploy` (all), or `--only functions`, `--only firestore`
