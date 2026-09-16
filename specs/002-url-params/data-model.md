# Phase 1 Data Model: Shareable URL Parameters for Scale Display Settings

This feature has no persisted/database entities. The only "entity" is the shareable configuration already represented in the app's existing `GlobalConfig` Redux state (`src/features/globalConfig/globalConfigSlice.ts`), plus its query-string representation.

## Entity: Scale Display Configuration

The subset of `GlobalConfig` covered by this feature, and its URL query-string mapping.

| Field (existing, in `GlobalConfig`) | Type | Query key | Validation rule |
|---|---|---|---|
| `scale.root` | `Note` (`src/lib/utils/note.ts`) | `root` | Must be one of the 12 sharp-spelled `ROOTS` values (`src/lib/utils/scaleConstants.ts`) — the app's root-note picker never uses flat spellings as `scale.root`'s canonical value, so those are rejected even though they're valid `Note` literals; otherwise ignored (fall back to current/default root). |
| `scale.type` | `ScaleType` (`src/lib/utils/scaleType.ts`) — built-in id or custom scale id | `scale` | Must be one of `SCALE_TYPES` (`src/lib/utils/scaleConstants.ts`) or a custom scale id returned by `getCustomScales()` (`src/lib/utils/customScaleTypes.ts`); otherwise ignored. |
| `scale.mode` | `ScaleMode \| undefined` | `mode` | Must be a member of the `ScaleMode` union when the resolved `scale` type supports modes; otherwise ignored/omitted. |
| `highlightRoots` | `boolean` | `color` | Must be `"1"` or `"0"`; otherwise ignored. `1` → `true` (highlighted roots), `0` → `false` (monochrome). |
| `showFlats` | `boolean` | `flats` | Must be `"1"` or `"0"`; otherwise ignored. `1` → `true` (flats), `0` → `false` (sharps). |
| `showDegrees` | `boolean` | `numbers` | Must be `"1"` or `"0"`; otherwise ignored. `1` → `true` (scale degrees), `0` → `false` (note names). |

### Relationships

- This configuration is not tied to a specific instrument; it is read/written identically regardless of which instrument route (`/piano`, `/guitar`, `/kalimba`, `/harmonica`, `/flute`, `/recorder`) is active (FR-011).
- It composes three of the existing `GlobalConfig` fields (`scale.root`, `scale.type`, `scale.mode`) and three independent boolean fields (`highlightRoots`, `showFlats`, `showDegrees`). No new Redux fields are introduced — this feature only adds a URL-facing read/write layer on top of the existing slice.

### State transitions

1. **Load with URL params present**: valid params overwrite the corresponding field(s) in `GlobalConfig` (taking precedence over the value restored from `localStorage`). Invalid/absent params leave the corresponding field at its current/default value.
2. **User changes a setting via existing UI controls**: the existing Redux action fires as today (e.g. `setScale`, `toggleShowFlats`); the URL sync layer observes the resulting `GlobalConfig` change and mirrors the new value into the query string.
3. **Navigation between instrument pages**: the five query params persist unchanged across the navigation (they are not instrument-scoped).

No new persisted storage is introduced; `localStorage` persistence (via the existing `persistentStateMiddleware`) continues unchanged as the fallback for when the URL doesn't specify a setting.
