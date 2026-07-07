# Contract: Scale Display Configuration Query Parameters

This app has no backend API; the external "contract" this feature introduces is the shape of the URL query string that any instrument page (`/piano`, `/guitar`, `/kalimba`, `/harmonica`, `/flute`, `/recorder`) accepts and produces.

## Parameters

| Key | Required | Type | Allowed values | Example |
|---|---|---|---|---|
| `root` | No | string | One of the 12 sharp-spelled `ROOTS` values (`C`, `C#`, `D`, `D#`, `E`, `F`, `F#`, `G`, `G#`, `A`, `A#`, `B`) — flat spellings (`Bb`, `Db`, ...) are display-only elsewhere in the app and are not accepted here | `root=C%23` (URL-encoded `C#`) |
| `scale` | No | string | A built-in scale type id (see `SCALE_TYPES`) or a custom scale id (`custom-*`) present in the visiting user's browser | `scale=major` |
| `mode` | No | string | A member of `ScaleMode` (`ionian`, `dorian`, `phrygian`, `lydian`, `mixolydian`, `aeolian`, `locrian`) — only meaningful for scale types that support modes | `mode=dorian` |
| `color` | No | `"1"` \| `"0"` | `1` = highlighted root notes, `0` = monochrome | `color=1` |
| `flats` | No | `"1"` \| `"0"` | `1` = flat note names, `0` = sharp note names | `flats=0` |
| `numbers` | No | `"1"` \| `"0"` | `1` = scale-degree numbers, `0` = note names | `numbers=0` |

## Behavior

- **All parameters are optional and independent.** Any subset may be present; missing parameters fall back to the visiting user's existing/default settings (FR-009).
- **Invalid values are ignored, not errors.** An unrecognized `root`, `scale`, or `mode`, or a `color`/`flats`/`numbers` value other than `1`/`0`, causes that single parameter to be ignored; the rest of the page (and the rest of the URL's parameters) is unaffected (FR-008, SC-005).
- **The current page always keeps the URL in sync.** Whenever a user changes the underlying scale, root, color mode, flat display, or number display through the existing UI, the browser's address bar is updated in place (no reload, no new history entry) so it always reflects the currently visible configuration (FR-006).
- **Not instrument-scoped.** The same five parameters apply identically regardless of which instrument route they appear on (FR-011).

## Example URLs

- Full link: `/guitar?root=D&scale=major&color=1&flats=0&numbers=1`
- Modal scale link: `/piano?root=E&scale=dorian&mode=dorian&color=0`
- Partial link (only overrides root and flats, everything else stays at the recipient's own defaults): `/kalimba?root=Bb&flats=1`
- Link with an invalid value (bad `scale` id is ignored, `root` still applies): `/flute?root=F&scale=not-a-real-scale`
