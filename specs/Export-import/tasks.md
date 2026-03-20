# Tasks: Settings Export/Import/Reset

**Input**: Design documents from `/specs/Export-import/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/settings-api.ts, quickstart.md

**Note**: No explicit test tasks included (not requested in design documents). Add test tasks if TDD approach is desired.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create feature directory structure and type definitions

- [X] T001 Create settings feature directory structure: `src/features/settings/` with subdirectories `components/`, `hooks/`, `utils/`, `types/`
- [X] T002 [P] Create type definitions file: `src/features/settings/types/settings.types.ts` with SettingsExport, SettingsImport, ExportOptions, ImportOptions, ExportResult, ImportResult, ResetResult interfaces

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utilities that MUST be complete before user stories can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Create localStorage manager: `src/lib/utils/localStorageManager.ts` with getAllSettings(), setSetting(), clearAllSettings() functions
- [X] T004 [P] Create validation utilities: `src/features/settings/utils/settingsValidation.ts` with validateImportData(), isValidTuningPreset(), isValidScale(), isValidInstrument(), isValidFretCount() functions
- [X] T005 Create default values constants: `src/features/settings/utils/settingsDefaults.ts` exporting globalConfigDefaults and guitarDefaults from initialState values
- [X] T006 Create error handling utilities: `src/features/settings/utils/settingsErrors.ts` with error message constants and formatError() helper for export/import/reset error scenarios

**Checkpoint**: Foundation utilities ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Export Settings (Priority: P1) 🎯 MVP

**Goal**: User can export all application settings to a JSON file for backup/transfer

**Independent Test**: Click "Export Settings" button → verify JSON file downloads with correct structure containing version, exportedAt, reduxState, and guitarSettings

### Implementation for User Story 1

- [X] T007 [P] Create export utilities: `src/features/settings/utils/settingsExport.ts` with gatherSettings(), createExportBlob(), triggerDownload() functions
- [X] T008 Create useSettingsManager hook - Export part: `src/features/settings/hooks/useSettingsManager.ts` implement exportSettings() function with loading state and error handling
- [X] T009 Create ExportButton component: `src/features/settings/components/ExportButton.tsx` with click handler, loading state, and error display
- [X] T010 Integrate ExportButton into navigation: Add settings icon/button to `src/components/navigation/` or appropriate location that opens settings panel

**Checkpoint**: At this point, User Story 1 should be fully functional - export downloads valid JSON file

---

## Phase 4: User Story 2 - Import Settings (Priority: P2)

**Goal**: User can import settings from a previously exported JSON file, with merge support for partial imports

**Independent Test**: Click "Import Settings" → select valid JSON file → verify settings applied and UI updates after reload

### Implementation for User Story 2

- [X] T011 [P] Create import utilities: `src/features/settings/utils/settingsImport.ts` with readFile(), parseJson(), mergeSettings() functions supporting mergeStrategy option
- [X] T012 Update useSettingsManager hook - Import part: Add importSettings() function with file handling, validation, merge logic, and result reporting
- [X] T013 Create ImportButton component: `src/features/settings/components/ImportButton.tsx` with hidden file input, file selection handler, and progress/error states
- [X] T014 Create settings panel container: `src/features/settings/components/SettingsPanel.tsx` modal dialog with role="dialog", aria-modal="true", ExportButton, ImportButton placement

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - export and import functional

---

## Phase 5: User Story 3 - Reset Settings (Priority: P3)

**Goal**: User can reset all settings to factory defaults with confirmation dialog

**Independent Test**: Click "Reset to Defaults" → confirm dialog → verify localStorage cleared and UI resets after reload

### Implementation for User Story 3

- [X] T015 [P] Create reset utilities: `src/features/settings/utils/settingsReset.ts` with clearAllSettings() function and getDefaultSettings() helper
- [X] T016 Update useSettingsManager hook - Reset part: Add resetSettings() function with optional confirmation handling and result reporting
- [X] T017 Create ResetButton component: `src/features/settings/components/ResetButton.tsx` with confirmation dialog, danger styling, and reload handling
- [X] T018 Update SettingsPanel: Add ResetButton with visual separator (divider) above it, danger styling (red/warning colors)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: UI/UX improvements, accessibility, and integration

- [X] T019 [P] Add keyboard navigation: Escape key to close SettingsPanel, Tab navigation between buttons, focus trap in modal
- [X] T020 [P] Add ARIA attributes: aria-label for Export/Import/Reset buttons, aria-describedby for error messages, role="alert" for error display
- [X] T021 Implement focus management: Return focus to trigger button after modal close, initial focus on first button when opened
- [X] T022 Add error display component: `src/features/settings/components/SettingsError.tsx` for inline error messages with role="alert"
- [X] T023 Add loading states: Spinner/loading indicators on buttons during export/import/reset operations
- [X] T024 Implement success feedback: Toast notification or inline success message after successful export/import/reset
- [X] T025 Add version migration warning: Display warning in SettingsPanel when importing from significantly different app version
- [X] T026 Run quickstart.md validation: Manual testing checklist verification from quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (T001, T002) - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all user stories being functionally complete

### User Story Dependencies

| Story | Depends On | Notes |
|-------|------------|-------|
| **US1 Export (P1)** | Foundational (T003-T006) | Can start immediately after Phase 2 |
| **US2 Import (P2)** | Foundational + US1 (for UI) | Shares SettingsPanel with US1, US3 |
| **US3 Reset (P3)** | Foundational + US1, US2 (for UI) | Uses same SettingsPanel container |

### Within Each User Story

**User Story 1 (Export)**:
- T007 and T008 can be done in parallel
- T009 depends on T007, T008
- T010 depends on T009

**User Story 2 (Import)**:
- T011 can be done in parallel with US1 implementation
- T012 depends on T011
- T013 depends on T012
- T014 depends on T009 (ExportButton exists), T013

**User Story 3 (Reset)**:
- T015 can be done in parallel with US1, US2 implementation
- T016 depends on T015
- T017 depends on T016
- T018 depends on T014 (SettingsPanel exists), T017

### Parallel Opportunities

**Phase 1 (Setup)**:
- T001 and T002 can run in parallel

**Phase 2 (Foundational)**:
- T003, T004, T005, T006 can all run in parallel

**Cross-Story Parallelism**:
- T007 (export utils) and T011 (import utils) and T015 (reset utils) can be developed in parallel
- T019, T020, T021, T022 (polish tasks) can run in parallel once UI components exist

---

## Parallel Execution Examples

### Parallel: Phase 2 Foundation
```bash
# All foundational utilities can be developed simultaneously:
Task: "Create localStorage manager in src/lib/utils/localStorageManager.ts"
Task: "Create validation utilities in src/features/settings/utils/settingsValidation.ts"
Task: "Create default values constants in src/features/settings/utils/settingsDefaults.ts"
Task: "Create error handling utilities in src/features/settings/utils/settingsErrors.ts"
```

### Parallel: Core Functions (After Foundation)
```bash
# Export, Import, Reset utilities can be developed in parallel:
Task: "Create export utilities in src/features/settings/utils/settingsExport.ts"
Task: "Create import utilities in src/features/settings/utils/settingsImport.ts"
Task: "Create reset utilities in src/features/settings/utils/settingsReset.ts"
```

### Parallel: UI Polish (After Components)
```bash
# Accessibility and polish tasks can run in parallel:
Task: "Add keyboard navigation support"
Task: "Add ARIA attributes for accessibility"
Task: "Add loading states to buttons"
Task: "Create error display component"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001, T002)
2. Complete Phase 2: Foundational (T003-T006)
3. Complete Phase 3: User Story 1 - Export (T007-T010)
4. **STOP and VALIDATE**: Test export functionality independently
   - Click export button
   - Verify JSON file downloads
   - Verify file contains expected structure
5. Deploy/demo if ready

### Incremental Delivery

1. **Sprint 1**: Setup + Foundational + US1 Export
   - All tasks T001-T010
   - Result: Working export feature

2. **Sprint 2**: US2 Import
   - Tasks T011-T014
   - Result: Export + Import both functional

3. **Sprint 3**: US3 Reset + Polish
   - Tasks T015-T026
   - Result: Complete feature with full UX

### Single Developer Sequence

With one developer, recommended order:
1. T001, T002 (Setup - 1-2 hours)
2. T003-T006 (Foundation - 2-3 hours) → **STOP & TEST**
3. T007-T010 (US1 Export - 2-3 hours) → **STOP & TEST**
4. T011-T014 (US2 Import - 2-3 hours) → **STOP & TEST**
5. T015-T018 (US3 Reset - 1-2 hours) → **STOP & TEST**
6. T019-T026 (Polish - 2-3 hours) → **FINAL VALIDATION**

**Estimated Total**: 12-16 hours for complete feature

---

## Task Summary

| Phase | Task Count | Story |
|-------|------------|-------|
| Phase 1: Setup | 2 | - |
| Phase 2: Foundational | 4 | - |
| Phase 3: US1 Export | 4 | P1 🎯 |
| Phase 4: US2 Import | 4 | P2 |
| Phase 5: US3 Reset | 4 | P3 |
| Phase 6: Polish | 8 | - |
| **Total** | **26** | |

---

## Notes

- All file paths follow the structure defined in plan.md
- TypeScript strict mode required - no `any` types
- Tailwind CSS for all styling following existing dark/light theme patterns
- Components must support both desktop and mobile viewports
- Error messages defined in research.md section 4 (Error Handling Strategy)
- localStorage keys documented in data-model.md section "localStorageKeyMap"
- Export file format: `scalesviewer-settings-{timestamp}.json`
- Maximum file size for import: 10MB (per research.md)
