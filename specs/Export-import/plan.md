# Implementation Plan: Settings Export/Import/Reset

**Branch**: `feature-IND-999-export-import-settings` | **Date**: 2026-03-19 | **Spec**: [spec.md](../feature-IND-999-export-import-settings/spec.md)
**Input**: Feature specification from `/specs/feature-IND-999-export-import-settings/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement settings export, import, and reset functionality for the ScalesViewer application. This feature allows users to back up their customized tunings and preferences to a JSON file, restore settings from a backup, and reset to factory defaults. The implementation will be a client-side only feature using browser File API and localStorage.

## Technical Context

**Language/Version**: TypeScript 5.x, React 19.x, Next.js 16.x
**Primary Dependencies**: Redux Toolkit, React Context API, Tailwind CSS
**Storage**: Browser localStorage (4 keys: state, custom-tunings, current-scaleRoot, guitar-specific)
**Testing**: Jest, React Testing Library, Playwright E2E
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Single-page web application (Next.js App Router)
**Performance Goals**: Export/import operations complete in <500ms for typical settings
**Constraints**: localStorage size limit (~5-10MB), must work offline, CSP-compliant
**Scale/Scope**: Single user per browser, settings file typically <100KB

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Phase 0 | Phase 1 | Notes |
|-----------|---------|---------|-------|
| Modern React Patterns | ✅ PASS | ✅ PASS | Custom hooks for settings management, TypeScript strict |
| Performance-Driven | ✅ PASS | ✅ PASS | Async file operations, debounced localStorage writes |
| Accessibility First | ⚠️ REVIEW | ✅ PASS | ARIA labels for buttons, focus trap in modal, keyboard nav |
| Progressive Enhancement | ✅ PASS | ✅ PASS | File API detection, graceful fallback |
| Musical Accuracy | ✅ PASS | ✅ PASS | N/A for this feature |
| Developer Experience | ✅ PASS | ✅ PASS | Comprehensive error handling, JSDoc comments |
| Learning Platform | ✅ PASS | ✅ PASS | Demonstrates browser File API patterns |

**Gate Result**: PASS - All constitution principles satisfied

### Phase 1 Design Decisions

**Accessibility Improvements**:
- SettingsPanel uses `role="dialog"` with `aria-modal="true"`
- Export/Import/Reset buttons have descriptive `aria-label` attributes
- Focus returns to trigger button after modal close
- Keyboard navigation (Escape to close, Tab to navigate)

**Performance Considerations**:
- File operations use streams where available
- Settings validation runs in non-blocking manner
- Debounced localStorage writes preserved from existing patterns

## Project Structure

### Documentation (this feature)

```text
specs/feature-IND-999-export-import-settings/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── guitar/
│   │   ├── hooks/
│   │   │   └── useLocalStorage.ts    # Existing localStorage hooks
│   │   └── tunings.ts                # Custom tuning persistence
│   ├── store.ts                      # Redux store configuration
│   └── persistentStateMiddleware.ts  # Redux localStorage middleware
├── features/
│   ├── globalConfig/
│   │   └── globalConfigSlice.ts      # Redux state with initialState defaults
│   └── settings/                     # NEW: Settings export/import feature
│       ├── components/
│       │   ├── SettingsPanel.tsx     # Main settings UI container
│       │   ├── ExportButton.tsx      # Export settings button
│       │   ├── ImportButton.tsx      # Import settings button
│       │   └── ResetButton.tsx       # Reset to defaults button
│       ├── hooks/
│       │   └── useSettingsManager.ts # Core export/import/reset logic
│       ├── utils/
│       │   ├── settingsExport.ts     # Export functionality
│       │   ├── settingsImport.ts     # Import functionality
│       │   └── settingsReset.ts      # Reset functionality
│       └── types/
│           └── settings.types.ts     # TypeScript interfaces
└── lib/
    └── utils/
        └── localStorageManager.ts    # Centralized localStorage access

e2e/
├── settings/
│   ├── export-import.spec.ts         # E2E tests for export/import
│   └── reset.spec.ts                 # E2E tests for reset
└── pages/
    └── SettingsPage.ts               # Page object for settings
```

**Structure Decision**: Single-page web application with feature-based organization. Settings functionality added as a new feature module under `src/features/settings/` following existing Redux patterns.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
