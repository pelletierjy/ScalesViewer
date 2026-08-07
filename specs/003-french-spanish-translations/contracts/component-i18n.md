# Contract: Component Internationalization

**Feature**: French and Spanish Translations
**Date**: 2026-08-03

## Server Component Contract

`app/layout.tsx` is a Server Component. It MUST:

1. Accept `searchParams` and read `searchParams.lang`.
2. Fall back to `Accept-Language` header parsing if `lang` is absent.
3. Fall back to `en` if no supported language is detected.
4. Pass the resolved locale to `ClientLayout` as a prop.
5. Render `<html lang={locale}>`.

```typescript
interface RootLayoutProps {
  children: React.ReactNode;
  searchParams: { lang?: string };
}
```

## Client Component Contract

`app/ClientLayout.tsx` is a Client Component. It MUST:

1. Receive `locale` from `layout.tsx`.
2. Initialize the i18n provider with the locale and its messages.
3. Dispatch the locale to Redux `globalConfig` on mount (so URL sync and persistence work).
4. Wrap children with the i18n context/provider.

```typescript
interface ClientLayoutProps {
  locale: "en" | "fr" | "es";
  messages: Record<string, string>;
  children: React.ReactNode;
}
```

## Component Translation Consumption

Any component that displays user-facing text MUST use the translation hook/function instead of hardcoded strings.

**Pattern**:
```typescript
const { t } = useTranslations();

// In JSX
<Field label={t("settings.sound")} />
<option value="sample">{t("soundEngine.sample")}</option>
```

**Rules**:
- All new text added to the UI MUST use a translation key.
- Existing hardcoded strings MUST be replaced with translation keys.
- `title` and `aria-label` attributes MUST also be translated.
- `confirm()` dialog strings MUST be translated before calling.

## Note Display Contract

Components that display note names (root selectors, fretboard notes, piano keys, etc.) MUST use the localized note formatter.

```typescript
function getLocalizedNoteName(
  note: Note,
  locale: "en" | "fr" | "es",
  accidental: "sharp" | "flat"
): string;
```

**Rules**:
- Internal note calculations continue to use `Note` type (`C`, `D`, etc.).
- Display ONLY is localized.
- The `showFlats` toggle appends ♭ or ♯ to the localized name.

## Language Selector Component

A new `LanguageSelector` component MUST:

1. Read the active locale from Redux.
2. Render a dropdown with all supported languages.
3. Dispatch `setLanguage` on change.
4. Include `aria-label="Select language"`.

```typescript
interface LanguageSelectorProps {
  className?: string;
}
```

## Re-rendering Behavior

When the locale changes:
- All translated components re-render automatically via the i18n provider.
- Expensive visualization components (GuitarNeck, Piano) SHOULD be wrapped in `React.memo` to avoid unnecessary re-renders if their props haven't changed (language change only affects text, not geometry).
