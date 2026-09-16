# Data Model: French and Spanish Translations

**Feature**: French and Spanish Translations
**Date**: 2026-08-03

## Entity: Language Option

Represents a supported locale in the application.

| Field | Type | Description |
|-------|------|-------------|
| code | `"en" \| "fr" \| "es"` | ISO 639-1 language code. Unique identifier. |
| name | `string` | Human-readable name in the language itself (e.g., "Français"). |
| nameInEnglish | `string` | English name for the selector (e.g., "French"). |

**Validation Rules**:
- `code` must be one of the supported values.
- Exactly one language is designated as the fallback (`en`).

## Entity: Translation Message

A single translatable string identified by a stable key.

| Field | Type | Description |
|-------|------|-------------|
| key | `string` | Dot-notated identifier (e.g., `instrument.guitar`, `settings.title`). |
| value | `string` | Localized text for a specific locale. May contain interpolation placeholders `{name}`. |
| locale | `LanguageOption["code"]` | The language this value belongs to. |

**Validation Rules**:
- All keys present in the fallback locale (`en`) MUST exist in every other locale.
- If a key is missing in a non-fallback locale, the fallback value is used at runtime.
- Keys are typed in TypeScript to prevent references to non-existent messages.

## Entity: User Language Preference

The persisted language choice for a given user/browser.

| Field | Type | Description |
|-------|------|-------------|
| locale | `LanguageOption["code"]` | The user's chosen or detected language. |
| source | `"user" \| "browser" \| "url" \| "default"` | How the current locale was determined. |

**State Transitions**:
1. First visit, no URL param, browser lang supported → `locale = browser lang`, `source = "browser"`
2. First visit, no URL param, browser lang unsupported → `locale = "en"`, `source = "default"`
3. First visit, URL param present → `locale = url value`, `source = "url"`
4. User changes via selector → `locale = selected`, `source = "user"`
5. Persisted preference loaded → `locale = stored value`, `source = "user"` (or previous source)

## Entity: Localized Note Name

A display representation of a musical note that adapts to locale conventions.

| Field | Type | Description |
|-------|------|-------------|
| note | `Note` (C, D, E, F, G, A, B) | The internal note identifier. |
| locale | `LanguageOption["code"]` | Determines naming convention. |
| displayName | `string` | `note` for `en`; solfège equivalent for `fr`/`es`. |
| accidental | `"sharp" \| "flat" \| "natural"` | Applied based on user toggle. |

**Rules**:
- `en`: C, D, E, F, G, A, B with ♯/♭ suffix.
- `fr`/`es`: Do, Ré, Mi, Fa, Sol, La, Si with ♯/♭ suffix.
- Internal calculations (frequencies, intervals) never use `displayName`.

## Entity: Localized Scale Entry

A scale type whose label and group name are resolved via translation keys.

| Field | Type | Description |
|-------|------|-------------|
| value | `ScaleType` | Machine identifier (e.g., `major`, `dorian`). Unchanged across locales. |
| labelKey | `string` | Translation key for the human-readable name (e.g., `scale.major`). |
| groupKey | `string` | Translation key for the category (e.g., `scaleGroup.common`). |

**Rules**:
- The UI resolves `labelKey` and `groupKey` against the active locale's messages.
- Custom user-created scales store their label directly (not a key) and are not translated.

## Entity: Localized Tuning Preset

A tuning preset whose name and category are resolved via translation keys.

| Field | Type | Description |
|-------|------|-------------|
| nameKey | `string` | Translation key for the preset name (e.g., `tuning.standard`). |
| categoryKey | `string` | Translation key for the category (e.g., `tuningCategory.standard`). |
| strings | `Note[]` | Actual string tunings; not localized. |

**Rules**:
- Custom tunings store their name directly and are not translated.
- The UI resolves `nameKey` and `categoryKey` against the active locale.
