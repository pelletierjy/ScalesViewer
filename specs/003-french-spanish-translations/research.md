# Research: French and Spanish Translations

**Feature**: French and Spanish Translations
**Date**: 2026-08-03
**Purpose**: Resolve technical unknowns and document design decisions

## Decision: i18n Library for Next.js App Router

**Decision**: Use `next-intl` as the i18n library.

**Rationale**:
- `next-intl` is the de facto standard for Next.js App Router i18n. It supports both Server Components and Client Components, which is critical because GScale uses a mix (pages use Context/local state, layout is server-rendered).
- It provides built-in message formatting (pluralization, numbers, dates) which may be needed for future features.
- It integrates cleanly with Next.js middleware for locale-based routing or URL prefixes if needed later.
- It supports lazy-loading of messages, satisfying the constitution's bundle size constraint.
- Alternative `react-i18next` is more mature but requires more boilerplate for App Router and lacks first-class Server Component support.

**Alternatives considered**:
- `react-i18next` with `i18next`: Heavier, more boilerplate, App Router integration is secondary.
- Custom context-based solution: Would work for this small app but reinvents the wheel and lacks formatting utilities.
- Built-in Next.js internationalization (experimental): Too unstable for production use.

## Decision: Translation File Structure

**Decision**: Use flat JSON files with dot-notation keys, stored as `src/lib/i18n/messages/{locale}.json`.

**Rationale**:
- JSON is standard, easy for non-developers to edit, and supported by most translation management tools.
- Flat keys with dot notation (e.g., `instrument.guitar`, `scale.major`) are easy to search and prevent deeply nested objects.
- TypeScript types will be generated from the English source file to provide autocomplete and compile-time safety.

**Alternatives considered**:
- TypeScript `.ts` files: Better type safety but harder for external translators to edit.
- ICU MessageFormat: More powerful but overkill for this app's relatively simple strings.

## Decision: Note Name Localization Strategy

**Decision**: Implement a `getLocalizedNoteName(note, locale)` utility in `src/lib/utils/note.ts`.

**Rationale**:
- English (`en`): Uses letter names C, D, E, F, G, A, B with ♯/♭.
- French (`fr`) and Spanish (`es`): Uses fixed-do solfège: Do, Ré, Mi, Fa, Sol, La, Si with ♯/♭.
- This is a pure display concern; internal calculations continue to use the existing zero-based indexing and note constants.
- The existing `showFlats` toggle continues to work, appending ♯ or ♭ to the localized name.

**Mapping**:
| Letter | Solfège |
|--------|---------|
| C | Do |
| D | Ré |
| E | Mi |
| F | Fa |
| G | Sol |
| A | La |
| B | Si |

## Decision: Static Data Internationalization

**Decision**: Convert static constant arrays (scale types, tuning presets) to use translation keys instead of hardcoded English labels.

**Rationale**:
- `SCALE_TYPES` in `scaleConstants.ts` currently has hardcoded `label` and `group` strings. These will become translation keys (e.g., `scale.major`, `scaleGroup.common`).
- Tuning preset names and categories will follow the same pattern.
- Fretboard texture names and sound engine options will use translation keys.
- At runtime, a helper function resolves the key to the current locale's message.
- This avoids duplicating the entire data structure per language.

**Trade-off**: Slightly more indirection when reading code, but type-safe keys prevent errors.

## Decision: URL Language Parameter Strategy

**Decision**: Add `lang` as a URL query parameter managed by the existing `urlConfigParams.ts` system.

**Rationale**:
- The app already has a robust URL param sync system (`useUrlSyncedGlobalConfig`). Adding `lang` there is consistent and minimal.
- The parameter will be `?lang=fr` or `?lang=es`, defaulting to `en` when absent.
- On first visit without a URL param, browser language detection sets the default.
- When a user changes language via the selector, the URL updates immediately.
- This satisfies the spec requirement that shared links preserve the sender's language.

**Alternatives considered**:
- Locale-based subpaths (`/fr/guitar`): More SEO-friendly but requires restructuring the App Router and is overkill for a single-page app.
- Cookie-only storage: Would not survive sharing via URL.

## Decision: Language State Management

**Decision**: Store active language in the Redux `globalConfig` slice, synced to URL params and localStorage.

**Rationale**:
- The app already uses Redux for global config with persistence middleware. Adding `language` there is natural.
- URL sync and localStorage persistence come "for free" via existing middleware.
- The root `layout.tsx` reads the locale from the URL or browser setting for the initial server render, then ClientLayout hydrates Redux state.
- `next-intl` will receive the locale from Redux on the client side.

## Open Questions Resolved

| Question | Resolution |
|----------|------------|
| How to handle help modal slides? | Each slide's title, subtitle, intro, features, steps, and notes become arrays of translation keys. The component maps over them. |
| How to handle user-created custom scales/tunings? | Out of scope for translation; names remain as user entered them. |
| How to handle confirmation dialogs? | Dialog text moves to translation keys; `confirm()` calls use interpolated strings. |
| How to test translations? | Jest tests will mount components with a test locale provider and assert on translated text. |
