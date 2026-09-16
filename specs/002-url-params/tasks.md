---

description: "Task list for feature implementation"
---

# Tasks: Shareable URL Parameters for Scale Display Settings

**Input**: Design documents from `/specs/002-url-params/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/url-query-params.md](./contracts/url-query-params.md), [quickstart.md](./quickstart.md)

**Tests**: Included. The project constitution mandates a minimum 80% test coverage standard, and the existing `globalConfig` slice already has test coverage — new logic follows the same convention.

**Organization**: Tasks are grouped by user story (from spec.md) to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

## Path Conventions

Single Next.js project (existing structure) — all paths are relative to the repository root, under `src/`.

---

## Phase 1: Setup

**Purpose**: Confirm a clean starting point; no new dependencies are required for this feature (reuses existing `next/navigation` and `@reduxjs/toolkit`).

- [X] T001 Run `npm run lint` and `npm test` on branch `002-url-params` to confirm a clean baseline before making changes; note (do not fix) any pre-existing unrelated failures. **Result**: `npm test` passes clean (19 suites, 195 tests). `npm run lint` / `next lint` and direct `eslint .` both fail with pre-existing, unrelated errors (Next 16's `next lint` no longer resolves as expected here, and the flat ESLint config crashes with a circular-JSON error in `@eslint/eslintrc`) — not introduced by this feature, not fixed here.

**Checkpoint**: Baseline confirmed clean (or pre-existing issues documented as out of scope).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The encode/decode/validation module and the slice setters that every user story (US1, US2, US3) depends on identically — they all read/write the same five settings through the same mechanism.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T002 [P] Add idempotent setter reducers `setShowFlats`, `setHighlightRoots`, `setShowDegrees` (each `PayloadAction<boolean>`) to `src/features/globalConfig/globalConfigSlice.ts`, alongside the existing `toggleShowFlats`/`toggleShowMonochrome`/`toggleShowDegrees` reducers (keep the toggles — existing UI controls use them). Export the new actions. These are needed because URL-driven sync must set an exact value, and the existing reducers only toggle.
- [X] T003 [P] Create `src/features/globalConfig/urlConfigParams.ts` with the query-key mapping types/constants from [contracts/url-query-params.md](./contracts/url-query-params.md): `root`, `scale`, `mode`, `color`, `flats`, `numbers`.
- [X] T004 Implement `encodeGlobalConfigToParams(config: { scale: Scale; highlightRoots: boolean; showFlats: boolean; showDegrees: boolean }): URLSearchParams` in `src/features/globalConfig/urlConfigParams.ts`, writing all six query keys per [data-model.md](./data-model.md) (booleans as `"1"`/`"0"`; `mode` omitted when `scale.mode` is undefined). (depends on T003)
- [X] T005 Implement `decodeParamsToGlobalConfigPatch(params: URLSearchParams): { root?: Note; scaleType?: ScaleType; mode?: ScaleMode; highlightRoots?: boolean; showFlats?: boolean; showDegrees?: boolean }` in `src/features/globalConfig/urlConfigParams.ts`. Validate each key independently per [data-model.md](./data-model.md) — `root` against the `Note` union, `scale` against `SCALE_TYPES` (`src/lib/utils/scaleConstants.ts`) plus `getCustomScales()` (`src/lib/utils/customScaleTypes.ts`), `mode` against `ScaleMode`, and the three booleans against `"1"`/`"0"`. Omit any key from the returned patch that is absent or fails validation — never throw. (depends on T003)
- [X] T006 [P] Unit tests for `encodeGlobalConfigToParams` and `decodeParamsToGlobalConfigPatch` in `src/__tests__/unit/features/globalConfig/urlConfigParams.test.ts`: full valid round-trip; each of `root`/`scale`/`mode`/`color`/`flats`/`numbers` individually invalid is omitted from the patch while the rest still decode; a custom scale id from `getCustomScales()` is accepted; an empty `URLSearchParams` yields an empty patch. **Also covers T015 (mixed valid/invalid params in one query string)** — see the last two tests in the file. (depends on T004, T005) — 11/11 passing, 97.95% line coverage on `urlConfigParams.ts`.

**Checkpoint**: Encode/decode/validation module and slice setters are complete and unit-tested — all user stories build on this.

---

## Phase 3: User Story 1 - Share the current view with a link (Priority: P1) 🎯 MVP

**Goal**: The browser URL always reflects the current scale, root, color mode, flat display, and number display; opening a URL with these params applies them immediately.

**Independent Test**: Per [quickstart.md](./quickstart.md) steps 1–3 — change each of the five settings and watch the address bar update live; copy the resulting URL into a new private/incognito window and confirm it reproduces the exact configuration.

### Implementation for User Story 1

- [X] T007 [US1] Implement `useUrlSyncedGlobalConfig()` in `src/features/globalConfig/useUrlSyncedGlobalConfig.ts`: on mount and whenever `useSearchParams()` changes, call `decodeParamsToGlobalConfigPatch`, then dispatch `setScale` (merging `root`/`scaleType`/`mode` overrides onto the current `scale`), `setShowFlats`, `setHighlightRoots`, and/or `setShowDegrees` — but only for keys present in the returned patch. **Implementation note**: reads "current" store values via a `useRef` kept fresh every render (`currentConfigRef`), rather than depending on the selectors directly, so this effect only re-runs when the URL itself changes (`[searchParams, dispatch]`) and never fights a live user-driven edit by re-applying a stale URL value. (depends on T002, T005)
- [X] T008 [US1] In `useUrlSyncedGlobalConfig()`, add an effect that watches `scale`, `highlightRoots`, `showFlats`, `showDegrees` (plus `pathname`/`router`/`searchParams`) and calls `router.replace(`${pathname}?${encodeGlobalConfigToParams({ scale, highlightRoots, showFlats, showDegrees }).toString()}`, { scroll: false })` whenever the encoded query differs from the current `searchParams`. **Implementation note**: this effect deliberately skips its very first invocation (via an `isFirstWriteRef` guard) — on mount, the URL→store effect above may dispatch changes that haven't propagated to this effect's closure within the same commit; skipping the first write avoids clobbering a shared link's values with stale pre-dispatch defaults, and the resulting re-render (if any) supplies settled values before anything is written. (depends on T004, T007)
- [X] T009 [US1] Invoke `useUrlSyncedGlobalConfig()` once from `src/app/ClientLayout.tsx`, placed textually *after* the existing localStorage `current-scale` restore effect (so URL-driven dispatches run after and override it within the same effect pass, per FR-007 — see T012). **Also required an unplanned change**: `useSearchParams()` requires a Suspense boundary for Next.js static prerendering (`next build` failed with "useSearchParams() should be wrapped in a suspense boundary" until fixed) — added `<Suspense fallback={null}>` around `<ClientLayout>` in `src/app/layout.tsx`. Verified with `npm run build` (succeeds, all 7 routes prerender). (depends on T007, T008)
- [X] T010 [P] [US1] Tests for `useUrlSyncedGlobalConfig` in `src/__tests__/unit/features/globalConfig/useUrlSyncedGlobalConfig.test.tsx` (`.tsx`, not `.ts` — needs JSX for the `<Provider>` wrapper): params present in the URL on initial render are dispatched into the store; a store change (e.g. `setScale`) results in a `router.replace` call (not `router.push`) with the expected query string. Mocks `next/navigation`. (depends on T007, T008) — 5/5 passing, 97%+ coverage.
- [X] T011 [US1] Manually validated [quickstart.md](./quickstart.md) steps 1–3 with Playwright against the dev server: full-link round trip in a fresh browser context correctly set the root/scale `<select>` values; changing a setting via the UI live-updated the address bar; no console errors, no update-loop/act() warnings under rapid changes. **Bug found and fixed during this validation**: `decodeParamsToGlobalConfigPatch`'s `root` validation originally accepted the full `Note` union (including flat spellings like `Bb`), but the app's actual root-note `<select>` (`src/components/Header.tsx`) only ever offers the 12 sharp-spelled `ROOTS` values as `scale.root` — accepting `Bb` set state the UI couldn't render, silently resetting the dropdown. Fixed `urlConfigParams.ts` to validate `root` against `ROOTS` instead of the full `Note` type; updated `data-model.md`/`contracts/url-query-params.md` and the affected unit tests accordingly.

**Checkpoint**: User Story 1 is fully functional and independently testable — this is the shippable MVP. ✅ Verified via `npm test` (212/212 passing) and `npm run build` (all routes prerender successfully).

---

## Phase 4: User Story 2 - Bookmark a favorite configuration (Priority: P2)

**Goal**: A URL captured at one point in time reliably reproduces that exact configuration later, even if the user's current default/local settings have since changed.

**Independent Test**: Per [quickstart.md](./quickstart.md) — save a configured URL, change settings afterward (so `localStorage` now holds different values), then reopen the saved URL and confirm the original configuration is restored, not the changed one.

### Implementation for User Story 2

- [X] T012 [P] [US2] Added a test ("US2: URL-provided values take precedence...") in `src/__tests__/unit/features/globalConfig/useUrlSyncedGlobalConfig.test.tsx` asserting that URL-provided values take precedence over pre-existing store values on load (dispatches a differing `setScale` before rendering the hook, then asserts the URL's values win per FR-007). Passing. (depends on T007)
- [X] T013 [US2] Not needed: T012's test passed against the ordering already established in T009 (hook invoked after the localStorage-restore effect in `ClientLayout.tsx`), and this was independently confirmed live — a Playwright session that carried over `localStorage` state across navigations (`/piano` → `/kalimba`) showed URL-specified values correctly overriding it. No code change required. (depends on T009, T012)
- [X] T014 [US2] Manually validated bookmarking-equivalent behavior with Playwright: navigated to a fully-specified URL, then navigated (via `page.goto`, a full reload — equivalent to reopening a bookmark) to a different URL in the same browser context; the second URL's values were correctly applied on top of the first navigation's persisted `localStorage` state, with no stale values leaking through.

**Checkpoint**: User Stories 1 and 2 both work independently — bookmarked links survive changes to current defaults. ✅ Verified.

---

## Phase 5: User Story 3 - Open a link with only some parameters set (Priority: P3)

**Goal**: Partial or partially-invalid query strings apply only their recognized, valid settings and leave the rest at the current/default values, without errors.

**Independent Test**: Per [quickstart.md](./quickstart.md) steps 4–5 — open a URL with only some of the five settings present, and separately a URL containing one invalid value alongside valid ones; confirm only the valid/present settings are applied and nothing breaks.

### Implementation for User Story 3

- [X] T015 [P] [US3] Added tests in `src/__tests__/unit/features/globalConfig/urlConfigParams.test.ts` for a single query string mixing valid and invalid params (valid `root` alongside an invalid `scale`; also a dedicated test for a flat-spelled `root` being rejected — see the T011 bug note), asserting only the valid keys appear in the decoded patch. Passing. (depends on T005)
- [X] T016 [US3] Added tests ("US3: ...") in `src/__tests__/unit/features/globalConfig/useUrlSyncedGlobalConfig.test.tsx` confirming that loading with a partial query string applies only the present/valid keys and leaves the rest at default, and that an invalid value is ignored without throwing or affecting other settings. Passing. (depends on T007)
- [X] T017 [US3] Manually validated with Playwright across `/piano`, `/kalimba`, and `/guitar`: a partial link (`root` + `flats` only) applied just those two settings; an invalid-`scale` link applied the valid `root` while `scale` fell back to default; navigating between instrument routes with no new query params preserved all five settings unchanged (FR-011), confirmed on both a Redux-only page (piano/kalimba) and the Context-based guitar page.

**Checkpoint**: All three user stories are independently functional and verified. ✅

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across the whole feature.

- [X] T018 [P] `npm run lint` still fails with the same pre-existing, unrelated error noted in T001 (Next 16 / `@eslint/eslintrc` circular-JSON crash) — not introduced by this feature. Manually confirmed the new/modified files (`globalConfigSlice.ts`, `urlConfigParams.ts`, `useUrlSyncedGlobalConfig.ts`, `ClientLayout.tsx`, `layout.tsx`) use strict TypeScript throughout with no `any`, and `npm run build`'s TypeScript pass succeeded cleanly.
- [X] T019 [P] Full `npm test` suite: 21/21 suites, 212/212 tests passing, no regressions.
- [X] T020 Manually validated quickstart.md step 6 (cross-instrument consistency) via Playwright — see T017.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories.
- **User Stories (Phase 3–5)**: All depend on Foundational phase completion.
  - US2 and US3 build directly on the hook created in US1 (T007/T008) — see notes below.
- **Polish (Phase 6)**: Depends on all three user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2). No dependency on other stories.
- **User Story 2 (P2)**: Reuses the hook built in US1 (T007) — its tasks add coverage/ordering fixes for a specific precedence rule rather than new parallel infrastructure, so in practice it follows US1.
- **User Story 3 (P3)**: Reuses the same hook and decode function built in US1/Foundational — its tasks add coverage for partial/invalid-value handling that Foundational (T005) already implements, so in practice it also follows US1.

### Within Each User Story

- Implementation before tests where the test targets that story's specific new behavior (US1); tests-first is used for US2/US3 since they primarily add regression coverage over Foundational/US1 code.
- Story complete before moving to the next priority when working solo; independently testable at each checkpoint.

### Parallel Opportunities

- T002 and T003 can run in parallel (different files).
- T006 can run once T004 and T005 are both done.
- T010, T012, T015 are test-only tasks in different describe blocks / files and can be parallelized with each other once their respective dependencies (T007/T008, T005) are done.
- T018 and T019 can run in parallel.

---

## Parallel Example: Foundational Phase

```bash
# Launch in parallel (different files):
Task: "Add idempotent setter reducers to src/features/globalConfig/globalConfigSlice.ts"
Task: "Create query-key mapping types/constants in src/features/globalConfig/urlConfigParams.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Run quickstart.md steps 1–3 independently
5. Ship — this alone delivers the "shareable link" value the feature was requested for

### Incremental Delivery

1. Setup + Foundational → shared encode/decode/validate module and slice setters ready
2. Add User Story 1 → validate → MVP shippable (sharing works end-to-end)
3. Add User Story 2 → validate → bookmarking precedence confirmed
4. Add User Story 3 → validate → partial/invalid-link robustness confirmed
5. Polish → lint, full test suite, final cross-instrument check

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently
- US2 and US3 are lightweight on top of US1 by design: the underlying sync mechanism is shared and already implements URL-precedence (FR-007) and partial/invalid-value tolerance (FR-008/FR-009) in Foundational + US1; US2/US3 tasks exist primarily to add explicit test coverage and close any gaps found, not to build parallel new infrastructure.
