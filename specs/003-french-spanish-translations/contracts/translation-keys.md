# Contract: Translation Keys

**Feature**: French and Spanish Translations
**Date**: 2026-08-03

## Key Naming Convention

All translation keys use **dot-notation namespaces** in `lowercase.camelCase`.

Format: `{namespace}.{identifier}`

### Namespaces

| Namespace | Purpose | Examples |
|-----------|---------|----------|
| `app` | Global app text (title, tagline) | `app.title`, `app.tagline` |
| `instrument` | Instrument names | `instrument.guitar`, `instrument.piano` |
| `scale` | Scale type names | `scale.major`, `scale.dorian` |
| `scaleGroup` | Scale category names | `scaleGroup.common`, `scaleGroup.jazz` |
| `tuning` | Tuning preset names | `tuning.standard`, `tuning.dropD` |
| `tuningCategory` | Tuning category names | `tuningCategory.standard`, `tuningCategory.open` |
| `texture` | Fretboard texture names | `texture.rosewood`, `texture.maple` |
| `soundEngine` | Sound engine options | `soundEngine.sample`, `soundEngine.synth` |
| `settings` | Settings panel labels | `settings.title`, `settings.sound` |
| `help` | Help modal content | `help.slide1.title`, `help.slide1.steps.0.title` |
| `ui` | Reusable UI labels | `ui.close`, `ui.edit`, `ui.delete` |
| `error` | Error messages | `error.importFailed`, `error.unknown` |
| `success` | Success messages | `success.exported`, `success.imported` |

### Arrays

When a section has ordered items (help slides, feature lists), use numeric indices:

```
help.slide0.title
help.slide0.intro
help.slide0.steps.0.title
help.slide0.steps.0.desc
help.slide0.features.0.icon
help.slide0.features.0.title
help.slide0.features.0.desc
```

### Interpolation

Dynamic values use `{placeholder}` syntax:

```json
{
  "success.exported": "Settings exported to {filename}",
  "error.versionMismatch": "Warning: exported from version {importVersion} (current: {currentVersion})"
}
```

### Type Safety

A TypeScript type is generated from `en.json` so only valid keys can be referenced:

```typescript
type TranslationKey = keyof typeof enMessages;
function t(key: TranslationKey, values?: Record<string, string>): string;
```

## Fallback Rules

1. If a key is missing in the active locale, the English value is used.
2. If a key is missing in English, the key itself is displayed (development-only warning).
3. No runtime error is thrown for missing translations in production.
