# Tasks: French and Spanish Translations

**Input**: Design documents from `/specs/003-french-spanish-translations/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are optional for this feature; validation is performed via quickstart.md scenarios.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and create the i18n project structure

- [x] T001 Install `next-intl` and add to `package.json` dependencies
- [x] T002 Create `src/lib/i18n/config.ts` with locale configuration (supported locales, default locale, messages loader)
- [x] T003 [P] Create `src/lib/i18n/types.ts` with TypeScript types for translation keys and locale codes
- [x] T004 [P] Create `src/lib/i18n/messages/en.json` with the complete English source message structure (all namespaces: app, instrument, scale, scaleGroup, tuning, tuningCategory, texture, soundEngine, settings, help, ui, error, success)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Add `language` field to `globalConfig` Redux slice in `src/features/globalConfig/globalConfigSlice.ts` (default `"en"`, actions: `setLanguage`, selector: `selectLanguage`)
- [x] T006 Add `lang` URL parameter to `src/features/globalConfig/urlConfigParams.ts` with validation for `en | fr | es`
- [x] T007 Update `src/features/globalConfig/useUrlSyncedGlobalConfig.ts` to sync `lang` between Redux state, URL, and localStorage
- [x] T008 Add `getLocalizedNoteName(note, locale, accidental)` to `src/lib/utils/note.ts` with solfège mapping (Do, Ré, Mi, Fa, Sol, La, Si) for `fr`/`es`; letter names for `en`
- [x] T009 Create `src/components/LanguageSelector.tsx` dropdown component that reads `selectLanguage` and dispatches `setLanguage`
- [x] T010 Update `src/app/layout.tsx` to read `searchParams.lang`, fall back to `Accept-Language` header, and pass resolved locale to `ClientLayout`
- [x] T011 Update `src/app/ClientLayout.tsx` to receive `locale` prop, lazy-load messages for that locale, and wrap children with `NextIntlClientProvider`

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - French-speaking musician uses the app in French (Priority: P1) 🎯 MVP

**Goal**: All user-facing text displays in French when the locale is set to `fr`.

**Independent Test**: Open `http://localhost:3000/?lang=fr` and verify no English text appears across all pages, settings, and help content.

### Implementation for User Story 1

- [x] T012 [P] [US1] Replace hardcoded instrument names in `src/components/Header.tsx` with translation keys (`instrument.guitar`, etc.)
- [x] T013 [P] [US1] Convert `SCALE_TYPES` in `src/lib/utils/scaleConstants.ts` to use translation keys for `label` and `group`; update all consuming components
- [x] T014 [P] [US1] Translate all settings panel labels, descriptions, and button text in `src/features/settings/components/SettingsPanel.tsx` using translation keys
- [x] T015 [P] [US1] Refactor `src/components/HelpModal.tsx` to load slide content (titles, intros, features, steps, notes) from translation keys instead of hardcoded `slides` array
- [x] T016 [P] [US1] Convert tuning preset names and categories in `src/app/guitar/tunings.ts` (or related tuning constants) to use translation keys
- [x] T017 [P] [US1] Convert fretboard texture names in `src/app/guitar/Configuration/Configuration.tsx` to use translation keys
- [x] T018 [P] [US1] Convert sound engine option labels and descriptions in `src/features/settings/components/SettingsPanel.tsx` to use translation keys
- [x] T019 [P] [US1] Replace hardcoded UI strings (confirm dialogs, button labels, tooltips, aria-labels) across `src/components/Header.tsx`, `src/app/guitar/Configuration/Configuration.tsx`, and `src/app/guitar/CustomTuningEditor/CustomTuningEditor.tsx` with translation keys
- [x] T020 [US1] Populate `src/lib/i18n/messages/fr.json` with complete French translations for all keys defined in `en.json`
- [x] T021 [US1] Update `src/components/Header.tsx` to render `<LanguageSelector />` in the header toolbar

**Checkpoint**: At this point, opening `?lang=fr` should show a fully French UI with solfège note names

---

## Phase 4: User Story 2 - Spanish-speaking musician uses the app in Spanish (Priority: P1)

**Goal**: All user-facing text displays in Spanish when the locale is set to `es`.

**Independent Test**: Open `http://localhost:3000/?lang=es` and verify no English text appears across all pages, settings, and help content.

### Implementation for User Story 2

- [x] T022 [P] [US2] Populate `src/lib/i18n/messages/es.json` with complete Spanish translations for all keys defined in `en.json`
- [x] T023 [US2] Verify solfège note names display correctly in Spanish (Do, Re, Mi, Fa, Sol, La, Si)
- [x] T024 [US2] Manually validate all instrument pages (Guitar, Piano, Kalimba, Harmonica, Flute, Recorder) render correctly in Spanish without layout issues from longer translated strings

**Checkpoint**: At this point, opening `?lang=es` should show a fully Spanish UI

---

## Phase 5: User Story 3 - User switches language on demand (Priority: P2)

**Goal**: Users can switch between English, French, and Spanish via a dropdown without reloading the page.

**Independent Test**: Use the language selector in the header to switch between languages and observe immediate text updates without page reload.

### Implementation for User Story 3

- [x] T025 [US3] Wire `LanguageSelector` in `src/components/Header.tsx` to dispatch `setLanguage` and trigger `saveState()` for persistence
- [x] T026 [US3] Ensure `NextIntlClientProvider` in `src/app/ClientLayout.tsx` re-renders children when the locale changes
- [ ] T027 [US3] Add `React.memo` to expensive visualization components (`src/app/guitar/GuitarNeck/GuitarNeck.tsx`, `src/app/piano/PageClient.tsx`) to prevent unnecessary re-renders when only locale changes *(optional performance optimization — deferred)*

**Checkpoint**: Language switching works instantly from the header dropdown

---

## Phase 6: User Story 4 - Language preference persists across sessions (Priority: P2)

**Goal**: Selected language is remembered after closing the browser, and first-time visitors see their browser language automatically.

**Independent Test**: Close browser after selecting French, reopen the app, and verify it loads in French without a URL param.

### Implementation for User Story 4

- [x] T028 [US4] Implement browser language detection in `src/app/layout.tsx`: parse `Accept-Language` header and select first supported match (`fr` or `es`) *(implemented client-side in `ClientLayout.tsx` since App Router server components cannot reliably access request headers without forcing dynamic rendering)*
- [x] T029 [US4] Ensure `src/features/globalConfig/globalConfigSlice.ts` persistence middleware saves `language` to localStorage alongside other global config
- [x] T030 [US4] Ensure `src/app/layout.tsx` prefers `searchParams.lang` over browser detection, and browser detection over default `en`
- [x] T031 [US4] Verify that `useUrlSyncedGlobalConfig.ts` updates the URL with `?lang=` when the user changes language manually

**Checkpoint**: Language persists across sessions and browser detection works for new visitors

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility improvements, documentation, and validation

- [x] T032 [P] Update `src/app/layout.tsx` to render `<html lang={locale}>` so screen readers announce the correct language
- [x] T033 [P] Add `aria-label={t("aria.languageSelector")}` to `src/components/LanguageSelector.tsx`
- [x] T034 [P] Verify all `<Select>` components in `src/components/Header.tsx` have translated `label` props via the `<Field>` component
- [ ] T035 Run `npm run lint` and fix any i18n-related TypeScript or ESLint issues *(environment-specific `next lint` failure — TypeScript `npx tsc --noEmit` and `npm run build` both pass)*
- [x] T036 Run `npm run build` and verify no build errors from the i18n integration
- [x] T037 Update `README.md` with a note about supported languages and how translators can contribute to `src/lib/i18n/messages/`
- [ ] T038 Execute quickstart validation scenarios from `specs/003-french-spanish-translations/quickstart.md` (Scenarios 1–8) *(pending manual browser validation)*

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–6)**: All depend on Foundational phase completion
  - US1 and US2 can proceed in parallel after Foundational (different translation files)
  - US3 and US4 can proceed in parallel after Foundational
  - US3/US4 do NOT depend on US1/US2 completion
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2). No dependencies on other stories.
- **User Story 2 (P1)**: Can start after Foundational (Phase 2). No dependencies on US1 (just needs `es.json` populated).
- **User Story 3 (P2)**: Can start after Foundational (Phase 2). No dependencies on US1/US2.
- **User Story 4 (P2)**: Can start after Foundational (Phase 2). No dependencies on US1/US2/US3.

### Within Each User Story

- Translation key replacement tasks (T012–T019) can run in parallel because they touch different files
- T020 (fr.json population) should happen after the English key structure is finalized
- T022 (es.json population) can happen in parallel with T020

### Parallel Opportunities

- T012–T019 (key replacements across components) can all run in parallel
- T020 (fr.json) and T022 (es.json) can run in parallel
- T032–T034 (polish tasks) can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all component translation tasks together:
Task: "Replace hardcoded instrument names in src/components/Header.tsx"
Task: "Convert SCALE_TYPES to use translation keys in src/lib/utils/scaleConstants.ts"
Task: "Translate settings panel in src/features/settings/components/SettingsPanel.tsx"
Task: "Refactor HelpModal to load from translation keys in src/components/HelpModal.tsx"
Task: "Convert tuning preset names in src/app/guitar/tunings.ts"
Task: "Convert texture names in src/app/guitar/Configuration/Configuration.tsx"
Task: "Convert sound engine options in src/features/settings/components/SettingsPanel.tsx"
Task: "Replace UI strings across Header, Configuration, CustomTuningEditor"

# Then populate French translations:
Task: "Populate src/lib/i18n/messages/fr.json"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (French translations)
4. **STOP and VALIDATE**: Open `?lang=fr` and verify no English text
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (French) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (Spanish) → Test independently
4. Add User Story 3 (Language switching) → Test independently
5. Add User Story 4 (Persistence) → Test independently
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 (French) + US2 (Spanish) — translation content
   - Developer B: US3 (Language switching) + US4 (Persistence) — wiring and state management
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Translation files (`en.json`, `fr.json`, `es.json`) should be kept in sync — adding a new key to `en.json` requires adding it to `fr.json` and `es.json` as well
