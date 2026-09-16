# Implementation Plan: French and Spanish Translations

**Branch**: `[003-french-spanish-translations]` | **Date**: 2026-08-03 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/003-french-spanish-translations/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add full French and Spanish localization to the GScale musical scale visualization app. This includes translating all UI text, help content, scale names, instrument names, tuning presets, and settings labels. The implementation will use an i18n library compatible with Next.js App Router, support solfège note naming (Do-Ré-Mi) for French and Spanish, persist language preference, and sync language selection to shareable URLs.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 14+ (App Router)

**Primary Dependencies**: React 18, Redux Toolkit, Tailwind CSS, React Testing Library + Jest

**Storage**: localStorage (for persistence), URL query params (for shareable state)

**Testing**: Jest with React Testing Library

**Target Platform**: Web (desktop + mobile browsers), Progressive Web App

**Project Type**: Web application (Next.js App Router)

**Performance Goals**: Lighthouse score > 90, First Contentful Paint < 1.5s on 3G, Time to Interactive < 3.5s on 3G

**Constraints**: Bundle size increase must be < 10% of current bundle; language messages should be lazy-loaded; no inline scripts

**Scale/Scope**: Single-user web app, ~60 scales, ~6 instruments, ~3 languages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| 1. Modern React Patterns | ✅ Pass | TypeScript-first; all new code uses strict types. Translation hooks will have explicit return types. |
| 2. Performance-Driven Architecture | ⚠️ Attention | i18n libraries add bundle weight. Messages must be lazy-loaded per locale. `React.memo` should wrap translated components that re-render on language change. |
| 3. Accessibility First | ✅ Pass | `lang` attribute on `<html>` must update with language change. Language selector needs `aria-label`. |
| 4. Progressive Enhancement | ✅ Pass | Language selection works without JS (server-rendered default). |
| 5. Musical Accuracy | ✅ Pass | Solfège naming (Do-Ré-Mi) is historically accurate for French/Spanish music education. |
| 6. Developer Experience Excellence | ✅ Pass | Translation keys will be typed to prevent runtime key errors. |
| 7. Learning Platform Integrity | ✅ Pass | ADR will document why the chosen i18n pattern fits Next.js App Router. |

**Gate Result**: PASS with performance attention item. Bundle size and lazy-loading will be explicitly addressed in tasks.

## Project Structure

### Documentation (this feature)

```text
specs/003-french-spanish-translations/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   ├── url-params.md
│   ├── translation-keys.md
│   └── component-i18n.md
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx              # Root layout: receives locale, sets <html lang>
│   ├── ClientLayout.tsx        # Client boundary: provides i18n context
│   ├── guitar/
│   ├── piano/
│   ├── kalimba/
│   ├── harmonica/
│   ├── flute/
│   └── recorder/
├── components/
│   ├── Header.tsx              # Instrument/scale selectors + language selector
│   ├── HelpModal.tsx           # Help slides content via translations
│   └── ui/                     # Reusable UI primitives
├── features/
│   ├── globalConfig/
│   │   ├── globalConfigSlice.ts   # Redux: add language to global state
│   │   ├── urlConfigParams.ts     # URL param definitions
│   │   └── useUrlSyncedGlobalConfig.ts
│   └── settings/
│       └── components/
│           └── SettingsPanel.tsx  # Settings labels via translations
├── lib/
│   ├── utils/
│   │   ├── scaleConstants.ts      # Scale types → translation keys
│   │   ├── note.ts                # Note naming formatter (letters vs solfège)
│   │   └── tuningUtils.ts         # Tuning preset names → translation keys
│   └── i18n/
│       ├── config.ts              # i18n library configuration
│       ├── messages/
│       │   ├── en.json            # English source messages
│       │   ├── fr.json            # French translations
│       │   └── es.json            # Spanish translations
│       └── types.ts               # Typed translation keys
└── __tests__/
```

**Structure Decision**: Single Next.js web application. Translations live in `src/lib/i18n/messages/`. The existing Redux store will hold the active language for client-side reactivity, while the root layout handles server-side locale negotiation. URL params continue to live in `features/globalConfig/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations requiring justification. The performance attention item (bundle size) will be mitigated through lazy-loading translation files and code-splitting by locale.
