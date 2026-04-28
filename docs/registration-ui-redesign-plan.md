# Registration Page UI Redesign Plan

## Context

The registration page (`apps/organizer/app/(main)/event/[eventId]/registration/page.tsx`) currently has a minimal UI showing form status and a toggle. The design handoff (Registration.jsx from the Claude Design bundle) specifies a polished, insights-first dashboard layout.

This plan covers updating the UI for both:
- `registration/page.tsx` — Full redesign
- `registration/create/page.tsx` — Header/breadcrumb refresh only

All colors use Tailwind/shadcn theme tokens — no hardcoded hex values.

---

## Files to Modify

| File | Change type |
|---|---|
| `apps/organizer/app/(main)/event/[eventId]/registration/page.tsx` | Full redesign |
| `apps/organizer/app/(main)/event/[eventId]/registration/create/page.tsx` | Minor header refresh |

---

## Design Decisions

### Form editor stays as a page (not modal)
The design uses a modal-based form builder. However, the actual app uses `@workspace/surveyjs` `FormEditor` which is a complex, full-page component. The `/create` page approach is kept — the "Edit form" button continues to route there.

### Data availability
| Stat | Data source | Status |
|---|---|---|
| Total responses | `useGetRegistrationQuery` (count) | Available |
| Completion rate | Not available | Shows `"—"` |
| Avg. time | Not available | Shows `"—"` |
| Response chart (daily) | Not available | Card shell with placeholder |
| Latest responses | `useGetRegistrationQuery` (first 5) | Available |
| Share link | Constructed from `eventId` | Available |

---

## Color Token Mapping

| Design color | Tailwind / shadcn token |
|---|---|
| `#0097B2` (teal primary) | `text-primary`, `bg-primary` |
| `#F9FAFB` (bg subtle) | `bg-muted/50` |
| `#E5E7EB` (border) | `border` |
| `#6B7280` (muted text) | `text-muted-foreground` |
| `#1A1A1A` (foreground) | `text-foreground` |
| `#10B981` (collecting green) | `text-green-700 bg-green-50 border-green-200` |
| `#EF4444` (destructive) | `text-destructive` |

---

## `page.tsx` — Full Redesign

### State & hooks
```ts
// Keep
useRegistrationFormQuery(user?.uid, eventId)       // form + status
useUpdateRegistrationFormMutation()                 // toggle collecting

// Add
useGetRegistrationQuery(user?.uid, eventId, { pageSize: 5 })  // total count + latest

// Remove
import { set } from "zod"   // unused, incorrect import
```

### Page layout

```
<div>
  ┌─ Header bar (bg-card border-b) ─────────────────────────────────┐
  │  <h1>Registration</h1>  <CollectingPill />                       │
  │  Accepting responses at event.eventup.lk/{eventId}               │
  │                          [Edit form]  [Stop/Start collecting]    │
  └──────────────────────────────────────────────────────────────────┘

  ┌─ Body (p-6) ─────────────────────────────────────────────────────┐
  │  IF no form → <EmptyState />                                     │
  │  ELSE:                                                           │
  │  ┌─ 8-col left ──────────────┐  ┌─ 4-col right (sticky) ──────┐ │
  │  │  <StatsRow />             │  │  <ShareCard />               │ │
  │  │  <ResponsesOverTime />    │  │  <CollectingCard />          │ │
  │  │  <LatestResponses />      │  │                              │ │
  │  └───────────────────────────┘  └──────────────────────────────┘ │
  └──────────────────────────────────────────────────────────────────┘
```

### Sub-components (all in `page.tsx`)

#### `CollectingPill({ status })`
Badge with animated pulse dot:
- Collecting: green dot (animate-pulse) + "Accepting responses"
- Paused: gray dot + "Paused"

#### `StatsRow({ totalCount, isLoading })`
4-up `Card` grid:
- "Total responses" — real count from `useGetRegistrationQuery`
- "Completion rate" — `"—"`
- "Avg. time to complete" — `"—"`
- "Last response" — `"—"`

#### `ResponsesOverTime()`
Card shell with heading + muted `text-muted-foreground` placeholder text:
> "Response analytics coming soon"

#### `LatestResponses({ registrations, isLoading })`
Card with table (name, email, submitted time). First 5 entries from query.
Footer: "View all registrations →" link to `/event/${eventId}/participants`.

#### `ShareCard({ eventId, copied, onCopy })`
- Form link displayed in monospace box
- [Copy link] button (shows "Copied" briefly)
- [Open] button (opens `https://event.eventup.lk/{eventId}` in new tab)

#### `CollectingCard({ isCollecting, onToggle, isLoading })`
- Toggle switch (shadcn `Switch`) wired to `handleToggleCollection`
- Label: "Collect responses" with sub-text showing current state

---

## `create/page.tsx` — Header Refresh

Changes only to the heading section — all logic stays unchanged:

```tsx
// Before
<h1 className="text-3xl font-bold tracking-tight">Create Registration Form</h1>

// After
<div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
  <Link href={`/event/${eventId}/registration`}>← Registration</Link>
</div>
<h1 className="text-2xl font-semibold tracking-tight">
  {registrations ? "Edit Registration Form" : "Create Registration Form"}
</h1>
```

Everything else (FormEditor, Save/Cancel handlers, mutations) stays exactly as-is.

---

## What Does NOT Change

- All hook logic, mutations, and server actions
- `@workspace/surveyjs` FormEditor component
- Route structure (no new routes)
- Navigation flow: "Edit form" → `/create`, Save → back to `/registration`

---

## Verification Steps

1. `pnpm --filter=organizer dev` → navigate to any event's `/registration` page
2. **No form state**: Empty state card renders with "Create Form" button
3. **Has form state**: Full insights dashboard renders with correct layout
4. **Toggle collecting**: Button updates status, shows toast, updates pill
5. **Copy link**: Shows "Copied" feedback for 1.5s
6. **Edit form**: Routes to `/create` page, FormEditor loads with existing form data
7. **Save form**: Saves + returns to `/registration` with success toast
8. `pnpm --filter=organizer typecheck` passes with no errors
