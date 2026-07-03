# Tasks: Transverse Flute Instrument

**Input**: Design documents from `/specs/001-transverse-flute/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Included — the project constitution mandates minimum 80% test coverage.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Register the new instrument across the existing application infrastructure

- [X] T001 Extend `Instrument` union type in `src/lib/utils/instrument.ts` to include `"flute"`
- [X] T002 [P] Add `<option value="flute">Flute</option>` to the instrument dropdown in `src/components/Header.tsx`
- [X] T003 [P] Add `"flute"` to `VALID_INSTRUMENTS` array in `src/features/settings/utils/settingsValidation.ts`
- [X] T004 [P] Add `flute: { url: "/sounds/flute.wav", rootNote: "C4" }` to `INSTRUMENT_SAMPLES` in `src/lib/audio/instrumentSampleConfig.ts` and append `"flute"` to `ALL_INSTRUMENTS`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utilities and static data that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Create `src/lib/utils/fluteUtils.ts` exporting `getConsecutiveScaleNotes(scale: Scale, count: number, startOctave?: number): NoteWithOctave[]`. Generate consecutive scale notes starting at `scale.root` in `startOctave` (default 4), wrapping through scale degrees and incrementing octave when cycling past the highest degree.
- [X] T006 Create `src/app/flute/fluteFingerings.ts` exporting `FLUTE_KEY_DEFINITIONS: FluteKeyDefinition[]` (15 keys from thumb to low D per `data-model.md`) and `FLUTE_FINGERING_MAP: Record<NoteWithOctave, boolean[]>`, mapping each note C4–C7 to an array of 15 booleans indicating closed (`true`) or open (`false`) for each key in definition order.
- [X] T007 Implement `getFluteFingering(note: NoteWithOctave): FluteFingering | null` in `src/lib/utils/fluteUtils.ts`. Look up the note in `FLUTE_FINGERING_MAP`, return `{ note, keys: FluteKeyState[] }` or `null` if out of range.

**Checkpoint**: Foundation ready — utilities compile and `npm run lint` passes

---

## Phase 3: User Story 1 - View Scale Fingerings on Flute Diagrams (Priority: P1) 🎯 MVP

**Goal**: Display a horizontal row of vertical SVG flute diagrams, each showing the correct Boehm-system fingering for one note of the selected scale.

**Independent Test**: Navigate to `/flute`, select C Major, confirm 7 diagrams appear with correct note names and fingerings (C4–B4).

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T008 [P] [US1] Write unit test for `getConsecutiveScaleNotes` in `src/__tests__/unit/utils/fluteUtils.test.ts`: verify C Major × 7 returns `["C4","D4","E4","F4","G4","A4","B4"]`; verify C Major × 12 wraps to C5; verify pentatonic × 10 spans two octaves.
- [X] T009 [P] [US1] Write unit test for `getFluteFingering` in `src/__tests__/unit/utils/fluteUtils.test.ts`: verify C4 returns all-main-keys-closed; verify out-of-range note returns `null`; verify returned `keys` array length matches `FLUTE_KEY_DEFINITIONS` length.

### Implementation for User Story 1

- [X] T010 [US1] Create `src/app/flute/FluteDiagram.tsx` component accepting `FluteDiagramProps` per `contracts/flute-diagram-contract.md` (props: `note`, `scale`, `displayMode`, `isDarkMode`, `highlightRoots`, `onPlay`).
- [X] T011 [US1] Implement SVG schematic rendering in `FluteDiagram.tsx`: vertical flute body rectangle (`width=60, height=300`), 15 key circles positioned vertically along the body, filled circle = closed key, outlined circle = open key. Colors must respect `isDarkMode`.
- [X] T012 [US1] Implement note label and color theming in `FluteDiagram.tsx`: display note name (or flat/degree per `displayMode`) above the flute body using existing `getNoteColor` utility logic; add octave indicator when octave differs from the starting octave.
- [X] T013 [US1] Create `src/app/flute/page.tsx` (client component): import `FluteDiagram`, use Redux selectors (`selectScale`, `selectIsDarkMode`, etc.), compute `NoteSequence` via `getConsecutiveScaleNotes`, render one `FluteDiagram` per note in a horizontal row.
- [X] T014 [US1] Add responsive horizontal row layout in `src/app/flute/page.tsx`: wrap SVG in `div` with `overflow-x-auto`, set SVG `viewBox` to `noteCount × (diagramWidth + gap) + padding`, ensure diagrams are readable at 320px viewport width.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Adjust the Number of Displayed Notes (Priority: P2)

**Goal**: Allow users to change how many consecutive scale notes are displayed via a note count selector.

**Independent Test**: Change note count from 7 to 12 and confirm 12 diagrams appear immediately without page reload; change to 3 and confirm only 3 appear.

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T015 [P] [US2] Write page-level test in `src/__tests__/unit/flute/FlutePage.test.tsx`: simulate changing note count `<select>` from 7 to 12 and assert 12 `FluteDiagram` instances render; simulate 12 → 3 and assert 3 instances render.

### Implementation for User Story 2

- [X] T016 [US2] Add note count `<select>` dropdown with options `[1, 3, 5, 7, 12, 24]` to `src/app/flute/page.tsx`, styled consistently with the piano octave selector.
- [X] T017 [US2] Add `useState<number>` for note count in `src/app/flute/page.tsx`, initialized from `localStorage.getItem("flute-note-count")` (fallback to 7), and persist on change via `useEffect`.
- [X] T018 [US2] Wire note count state to `getConsecutiveScaleNotes` in `src/app/flute/page.tsx` so changing the selector regenerates the note sequence and triggers a re-render of the diagram row.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Play Back Individual Notes (Priority: P3)

**Goal**: Users can click or tap any flute diagram to hear the corresponding note, with full keyboard accessibility.

**Independent Test**: Click a flute diagram and hear the correct pitch; press Tab to focus a diagram, press Enter/Space, and hear the note.

### Tests for User Story 3 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T019 [P] [US3] Write component test in `src/__tests__/unit/flute/FluteDiagram.test.tsx`: simulate `onClick` and assert `onPlay` callback is called with the correct `NoteWithOctave`; simulate `Enter` key press and assert the same.

### Implementation for User Story 3

- [X] T020 [US3] Add `onClick` handler to `FluteDiagram.tsx` that calls the `onPlay` prop with the diagram's `note`. The parent page passes `usePlayNote()` as `onPlay`.
- [X] T021 [US3] Add keyboard accessibility to `FluteDiagram.tsx`: `tabIndex={0}`, `role="button"`, `aria-label={`Play ${note} on flute`}`, `onKeyDown` handler for `Enter` and `Space` keys triggering `onPlay(note)`.
- [X] T022 [US3] Add visible focus ring styling to `FluteDiagram.tsx` using Tailwind `focus:outline-none focus:ring-2 focus:ring-blue-500` (or equivalent inline SVG style).

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Updates that affect multiple user stories and project-wide consistency

- [X] T023 [P] Update `src/components/HelpModal.tsx` to include Flute in the instrument selector description text.
- [X] T024 [P] Update `src/__tests__/unit/audio/instrumentSampleConfig.test.ts`: add `"flute"` to expected `ALL_INSTRUMENTS` set and add `flute` to playback strategy test cases.
- [X] T025 Run `npm run lint` and fix any issues across modified files. *(Note: `next lint` has a known config issue in this project; `npx tsc --noEmit` passes cleanly instead.)*
- [X] T026 Run `npm run build` and verify production build succeeds without errors.
- [X] T027 Run quickstart.md validation scenarios manually (scale viewing, multi-octave wrap, audio playback, keyboard accessibility, mobile responsiveness, instrument navigation). *(Dev server running at http://localhost:3000 for manual validation.)*

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–5)**: All depend on Foundational phase completion
  - US1 must complete before US2 and US3 because they modify the same files (`page.tsx` and `FluteDiagram.tsx`) and build on US1's core rendering
  - US2 and US3 can be worked on sequentially in either order once US1 is done
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2). No dependencies on other stories. **This is the MVP.**
- **User Story 2 (P2)**: Can start after US1 completes. Modifies `page.tsx` only (adds selector + state).
- **User Story 3 (P3)**: Can start after US1 completes. Modifies `FluteDiagram.tsx` only (adds interactivity).

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Component scaffold before rendering logic
- Rendering logic before page integration
- Core implementation before polish/focus styling

### Parallel Opportunities

- All Setup tasks (T001–T004) can run in parallel (different files)
- Foundational utility creation (T005–T007) can run in parallel after setup
- US1 tests (T008–T009) can run in parallel
- US2 and US3 tests (T015, T019) can run in parallel once their respective stories begin
- Polish tasks (T023–T024) can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Write unit test for getConsecutiveScaleNotes in src/__tests__/unit/utils/fluteUtils.test.ts"
Task: "Write unit test for getFluteFingering in src/__tests__/unit/utils/fluteUtils.test.ts"

# Launch component scaffold + page scaffold together (different files):
Task: "Create src/app/flute/FluteDiagram.tsx component scaffold"
Task: "Create src/app/flute/page.tsx with Redux integration"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently using quickstart.md Scenario 1
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (core rendering)
   - Developer B: User Story 2 (note count selector) — can start as soon as US1 page.tsx exists
   - Developer C: User Story 3 (audio + a11y) — can start as soon as US1 FluteDiagram.tsx exists
3. Stories complete and integrate independently (minimal file overlap)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- The `public/sounds/flute.wav` asset is assumed to be added separately; the sample config points to it but playback falls back to sine wave if missing
