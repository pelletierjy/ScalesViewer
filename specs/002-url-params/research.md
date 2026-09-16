# Phase 0 Research: Shareable URL Parameters for Scale Display Settings

All items below were resolved by reading the existing codebase (Next.js 16 App Router app, Redux Toolkit `globalConfigSlice`, `ClientLayout.tsx`); no `NEEDS CLARIFICATION` markers remain from the spec, so no external research was required.

## 1. Mechanism for reading/writing the query string

- **Decision**: Use Next.js App Router's `useSearchParams()` to read the current query string and `useRouter().replace(url, { scroll: false })` to write it back.
- **Rationale**: The project constitution explicitly calls for "URL state for navigation - Use Next.js App Router patterns." `router.replace` updates the address bar and query string without adding a new browser-history entry and without a full navigation/reload, satisfying FR-006 (immediate, automatic URL updates) while keeping back/forward behavior sane (see spec edge case on back/forward navigation). `ClientLayout.tsx` already uses `useRouter`/`usePathname` for instrument routing, so this keeps the pattern consistent.
- **Alternatives considered**:
  - `window.history.replaceState` directly — bypasses Next.js's router/URL synchronization, more brittle across App Router versions.
  - `router.push` for every settings change — would add one history entry per toggle, making the back button unusable (explicitly called out as an edge case to avoid).

## 2. Query parameter naming and encoding

- **Decision**: Five short, human-readable query keys, mapped 1:1 to existing state:
  | Query key | Redux field | Values |
  |---|---|---|
  | `root` | `scale.root` | Note names, e.g. `A`, `C#`, `Bb` |
  | `scale` | `scale.type` | Built-in scale type id (e.g. `major`) or custom scale id (e.g. `custom-abc123`) |
  | `mode` | `scale.mode` | Mode id (e.g. `ionian`), omitted when the scale type has no mode |
  | `color` | `highlightRoots` | `1` (highlighted roots) / `0` (monochrome) |
  | `flats` | `showFlats` | `1` (flats) / `0` (sharps) |
  | `numbers` | `showDegrees` | `1` (scale degrees) / `0` (note names) |
- **Rationale**: Keys read plainly in a shared link (part of "ease of sharing"), and map directly onto fields already defined in `src/lib/utils/scaleType.ts` (`Scale.root`, `Scale.type`, `Scale.mode`) and `globalConfigSlice.ts` (`highlightRoots`, `showFlats`, `showDegrees`), so no new vocabulary is introduced.
- **Alternatives considered**: A single opaque encoded blob (e.g. base64 JSON in one `c=` param) — rejected because it isn't human-readable or hand-editable, which works against the sharing goal.

## 3. Boolean encoding

- **Decision**: `1`/`0` for the three boolean settings.
- **Rationale**: Shortest, unambiguous representation; avoids bikeshedding between `true/false` and `on/off`.
- **Alternatives considered**: `true`/`false` strings — functionally equivalent but longer with no added clarity.

## 4. Validation of incoming values

- **Decision**: Before dispatching any URL-sourced value into Redux, validate it against the current set of known values:
  - `scale` against built-in `SCALE_TYPES` (`src/lib/utils/scaleConstants.ts`) plus custom scale ids from `getCustomScales()` (`src/lib/utils/customScaleTypes.ts`).
  - `mode` against the `ScaleMode` union.
  - `root` against the `Note` union (`src/lib/utils/note.ts`).
  - `color`, `flats`, `numbers` against `"1"`/`"0"`.
  Any value that fails validation is dropped (that setting falls back to its existing/default value); the rest of the URL's parameters are still applied.
- **Rationale**: Directly satisfies FR-008/FR-009 and SC-005 (invalid or partial links must not break the page or affect unrelated settings). Reuses validation data that already exists in the app rather than adding a schema-validation dependency.
- **Alternatives considered**: Rejecting the whole URL (or redirecting) on any invalid value — rejected, contradicts FR-008's requirement that other settings remain unaffected.

## 5. Sync direction and precedence

- **Decision**: Bidirectional, URL-wins-on-load:
  1. On initial load/navigation, any of the five params present in the URL are applied to Redux, taking precedence over the locally persisted (localStorage) values for just those settings (FR-007, FR-009).
  2. After load, any user-driven change to the five Redux settings is mirrored back into the URL (FR-006).
- **Rationale**: This precedence is what makes User Stories 1–3 work: opening a shared/bookmarked link reproduces the sender's exact view (P1/P2), and partial links only override the settings they specify while leaving the rest at the recipient's own defaults (P3).
- **Alternatives considered**: Write-only sync (URL reflects state but is never read back) — rejected, breaks the core sharing round-trip. Read-only sync (URL only applied once, not kept in sync) — rejected, fails FR-006/SC-002 (address bar must stay current for copy-at-any-time sharing).

## 6. Where the sync logic lives

- **Decision**: A single hook (e.g. `useUrlSyncedGlobalConfig`), invoked once from `ClientLayout.tsx`.
- **Rationale**: The five settings already live in one shared slice (`globalConfigSlice`) used by every instrument page; `ClientLayout.tsx` is already the one place that reconciles the current route with Redux state (see its existing pathname → `setInstrument` effect), so this keeps the new logic in the same place rather than duplicating it across six instrument pages (FR-011).
- **Alternatives considered**: Adding URL-sync effects independently inside each instrument page — rejected as duplicated logic for state that isn't instrument-specific.

**Output**: All unknowns resolved; no `NEEDS CLARIFICATION` markers remain.
