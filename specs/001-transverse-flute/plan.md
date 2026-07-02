# Implementation Plan: Transverse Flute Instrument

**Branch**: `[###-transverse-flute]` | **Date**: 2026-07-01 | **Spec**: [specs/001-transverse-flute/spec.md](spec.md)

**Input**: Feature specification from `/specs/001-transverse-flute/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add a transverse flute (concert flute) instrument page that displays scale notes as a horizontally scrollable row of vertical flute fingering diagrams. Each diagram shows a single note's Boehm-system fingering on a schematic SVG flute. Users select a scale, root note, and note count (1-24); the system renders consecutive scale notes across multiple octaves as needed. Clicking a diagram plays the note via the existing audio infrastructure.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode), React 19, Next.js 15 (App Router)

**Primary Dependencies**: Redux Toolkit (global state), Tailwind CSS (styling), SVG (visualization), Web Audio API (playback)

**Storage**: localStorage (Redux persistence for global config); no new backend storage needed

**Testing**: Jest + React Testing Library (existing stack)

**Target Platform**: Web browsers (desktop + mobile), Capacitor-built Android app

**Project Type**: Web application (Next.js App Router, single-page instrument views)

**Performance Goals**: Scale change renders in <2s; audio playback starts within 200ms of click; 12 diagrams render without jank on mid-tier mobile

**Constraints**: Must support 320px minimum viewport width; must reuse existing scale/audio utilities; must follow SVG schematic style consistent with other instruments

**Scale/Scope**: One new instrument page (~1-3 new source files + tests); extends existing `Instrument` union type and sample config; no new dependencies

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| 1. Modern React Patterns | ✅ Pass | Functional components + hooks; TypeScript strict mode |
| 2. Performance-Driven Architecture | ✅ Pass | SVG rendering is lightweight; local state for note count selector |
| 3. Accessibility First | ⚠️ Watch | Must add ARIA labels, keyboard handlers, and focus rings to each flute diagram (covered in tasks) |
| 4. Progressive Enhancement | ✅ Pass | Responsive horizontal scroll/scaling; touch-friendly SVG targets |
| 5. Musical Accuracy | ✅ Pass | Boehm-system fingerings cross-referenced against standard charts; primary fingerings only |
| 6. Developer Experience Excellence | ✅ Pass | Strict TS; tests in existing `src/__tests__/` structure |
| 7. Learning Platform Integrity | ✅ Pass | Follows piano/harmonica pattern (Redux for global config, local state for page controls) |

## Project Structure

### Documentation (this feature)

```text
specs/001-transverse-flute/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── flute/
│       └── page.tsx                 # Flute instrument page (client component)
├── lib/
│   ├── utils/
│   │   └── instrument.ts            # Extend Instrument union type
│   ├── audio/
│   │   ├── instrumentSampleConfig.ts # Add flute sample def + ALL_INSTRUMENTS entry
│   │   └── playbackStrategy.ts      # No change (flute uses sample fallback to sine)
│   └── hooks/
│       └── usePlayNote.ts           # No change (already instrument-agnostic)
├── components/
│   └── Header.tsx                   # Add <option value="flute">Flute</option>
├── features/
│   └── settings/
│       └── utils/
│           ├── settingsValidation.ts # Add "flute" to VALID_INSTRUMENTS
│           └── settingsDefaults.ts   # No change
└── __tests__/
    └── unit/
        └── audio/
            └── instrumentSampleConfig.test.ts # Update ALL_INSTRUMENTS assertion
```

**Structure Decision**: Single-project monolith. The flute page follows the same pattern as piano/harmonica/kalimba: a Next.js App Router page under `src/app/flute/page.tsx`, using Redux selectors for global config and local `useState` for page-specific controls (note count). Shared utilities in `src/lib/` are extended, not duplicated.

## Complexity Tracking

> No constitution violations requiring justification.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
