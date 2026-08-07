# Contract: URL Parameters

**Feature**: French and Spanish Translations
**Date**: 2026-08-03

## Language Parameter

The `lang` query parameter controls the active display language.

| Property | Value |
|----------|-------|
| Key | `lang` |
| Type | `string` |
| Allowed values | `en`, `fr`, `es` |
| Default | `en` |
| Persisted | Yes (localStorage + URL) |

### Behavior

1. **Server-side (initial request)**: Next.js `layout.tsx` inspects `searchParams.lang`. If absent, it reads the `Accept-Language` header and selects the first supported match.
2. **Client-side**: The `useUrlSyncedGlobalConfig` hook syncs `lang` between Redux state, URL, and localStorage.
3. **On change**: When the user selects a new language, the URL is updated with `?lang={code}` and all visible text re-renders.
4. **Shareability**: Copying the URL preserves `lang`, so recipients see the app in the sender's chosen language.

### Validation

- Invalid `lang` values are ignored and fall back to `en`.
- Empty `lang` is treated as absent.
- Case-sensitive: only lowercase `en`, `fr`, `es` are accepted.

### Example URLs

- `https://example.com/?lang=fr`
- `https://example.com/?instrument=guitar&scale=major&root=C&lang=es`

## Existing Parameter Interactions

The `lang` parameter coexists with all existing URL parameters (`instrument`, `scale`, `root`, `showDegrees`, etc.) without conflict. Parameter order is not significant.
