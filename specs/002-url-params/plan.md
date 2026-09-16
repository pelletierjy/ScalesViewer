# Implementation Plan: Shareable URL Parameters for Scale Display Settings

**Branch**: `002-url-params` | **Date**: 2026-07-06 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-url-params/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Reflect the app's shared scale display configuration — selected scale (type/mode), root note, color mode, flat display mode, and number display mode — as query-string parameters on the current instrument page's URL, kept in sync in both directions: URL params are applied to state on load (taking precedence over locally saved defaults), and any change to those settings via the existing UI is mirrored back into the URL immediately. This is implemented as a small Next.js App Router hook, wired into the existing `ClientLayout.tsx`, that reads/writes `useSearchParams()`/`router.replace()` against the existing `globalConfigSlice` Redux state — no new UI, no new persisted storage, no backend involved.

## Technical Context

**Language/Version**: TypeScript (strict mode), Next.js 16 (App Router), React 19

**Primary Dependencies**: `@reduxjs/toolkit` / `react-redux` (existing `globalConfigSlice`), `next/navigation` (`useSearchParams`, `useRouter`, `usePathname`)

**Storage**: Browser `localStorage` only (existing `persistentStateMiddleware`); no backend/database. N/A beyond what already exists.

**Testing**: Jest + React Testing Library (existing `src/__tests__/` conventions)

**Target Platform**: Web browsers (desktop + mobile), including the Capacitor-packaged Android build

**Project Type**: Single Next.js web application (frontend only) — existing structure, no new project

**Performance Goals**: URL reflects a settings change within 1s with no perceptible added latency to existing note-rendering/interaction performance (SC-002)

**Constraints**: URL updates must not cause a full navigation/page reload or reset in-memory Redux state; must not add a new browser-history entry per change (would break back/forward usability per spec edge cases) — achieved via `router.replace(..., { scroll: false })` rather than `router.push`

**Scale/Scope**: 5 shared settings (scale type, mode, root, color mode, flat display, number display — 6 URL keys total counting `mode` separately), synced uniformly across the 6 existing instrument routes (`/piano`, `/guitar`, `/kalimba`, `/harmonica`, `/flute`, `/recorder`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **State Management Guidelines — "URL state for navigation - Use Next.js App Router patterns"**: PASS. This feature is a direct implementation of that existing constitutional rule; no new state-management approach is introduced.
- **TypeScript-First Development**: PASS. New encode/decode/validation helpers and the sync hook will be fully typed against existing `Note`, `ScaleType`, `ScaleMode`, and `GlobalConfig` types; no `any`.
- **Performance-Driven Architecture**: PASS. Sync effect is scoped to the 5 relevant selectors only, using `router.replace` (no reload) so it does not add render or navigation overhead beyond a query-string update.
- **Component Architecture (Single responsibility / custom hooks for complex logic)**: PASS. Logic is isolated in one new hook (`useUrlSyncedGlobalConfig`) rather than duplicated per instrument page.
- **Accessibility / Progressive Enhancement / Musical Accuracy**: N/A — no UI, visual, or scale-calculation changes; existing components and calculations are reused as-is.
- No violations identified. Complexity Tracking section is not needed.

*Post-Phase 1 re-check*: Design artifacts (data-model.md, contracts/url-query-params.md, quickstart.md) introduce no new state-management pattern, no new project/module, and no persisted data beyond the existing Redux slice + localStorage. Constitution Check still PASSes with no violations.

## Project Structure

### Documentation (this feature)

```text
specs/002-url-params/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md         # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   └── url-query-params.md
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
# Option 1: Single project (existing Next.js app — no new top-level projects added)
src/
├── app/
│   └── ClientLayout.tsx              # MODIFIED: invoke the new URL-sync hook
├── features/
│   └── globalConfig/
│       ├── globalConfigSlice.ts      # UNCHANGED: existing selectors/actions reused
│       ├── urlConfigParams.ts        # NEW: encode/decode/validate GlobalConfig <-> URLSearchParams
│       └── useUrlSyncedGlobalConfig.ts  # NEW: hook wiring useSearchParams/router to the slice
└── lib/
    └── utils/
        ├── scaleConstants.ts         # UNCHANGED: source of truth for valid scale/mode values
        └── customScaleTypes.ts       # UNCHANGED: source of truth for valid custom scale ids

src/__tests__/
└── unit/
    └── features/
        └── globalConfig/
            ├── urlConfigParams.test.ts        # NEW
            └── useUrlSyncedGlobalConfig.test.ts  # NEW
```

**Structure Decision**: Existing single Next.js application structure is unchanged. This feature adds two new files colocated with the state they synchronize (`src/features/globalConfig/`) and one small change to the existing app-wide layout (`ClientLayout.tsx`), following the project's established "feature-organized" convention rather than introducing a new module or directory.

## Complexity Tracking

*No constitution violations identified — this section is not applicable.*
