# Implementation Plan: Chord-Scale Intersection

## Phase 0 — Preparation
1. Create branch `feat/chord-scale-intersection` from `main`
2. Ensure `npm install` passes; copy repo if needed to local workspace

## Phase 1 — Music Theory Utilities
1. Add `src/lib/utils/chordUtils.ts`
   - `getDiatonicTriads(root: Note, scaleNotes: Note[]): Triad[]`
   - `getChordTones(chord: Triad): Note[]`
   - `isChordToneShared(tone: Note, allChords: Triad[][]): boolean`
   - `qualityFromIntervals(intervals: number[]): ChordQuality` (internal helper)
2. Add `src/lib/utils/chordTypes.ts`
   - `type ChordQuality = 'major' | 'minor' | 'diminished' | 'augmented'`
3. Export new utils from `src/lib/utils/index.ts` if it exists

## Phase 2 — State & Redux Integration
1. Extend `src/features/globalConfig/globalConfigSlice.ts`
   - Add `chordScaleMode: boolean`
   - Add `selectedChord: string | null` (e.g., `"Em"`)
2. Persist via existing `persistentStateMiddleware`

## Phase 3 — Shared Hook for Chord Highlights
1. Add `src/features/guitar/hooks/useChordHighlight.ts`
2. Add `src/features/piano/hooks/useChordHighlight.ts`
   - Takes active chord tones + scale notes
   - Returns highlight class/color for each note on the SVG
   - Shared visual language: root = blue, chord tone unique = gold, shared = gray

## Phase4 — UI Components
1. `src/components/ChordPanel/ChordPanel.tsx`
   - Toggle open/close (slide-over for mobile)
   - Lists generated diatonic chords
   - Selected chord active state
2. Integrate into guitar page (`src/app/guitar/page.tsx`) conditionally
3. Integrate into piano page (`src/app/piano/page.tsx`) conditionally

## Phase 5 — Reverse Lookup (Optional v1.1)
1. Add chord quality filter dropdown in ChordPanel
2. Filter displayed chords by selected quality

## Phase 6 — Polish & Testing
1. Add unit tests for `chordUtils.ts` (all modes, edge flats)
2. Add component test for ChordPanel selection + highlight toggle
3. Manual QA on guitar + piano, mobile + desktop, dark + light
4. Run `npm run lint`, `npm run build`, `npm test`

## Rollout
- Merge feature branch → `main`
- Remove `spec-driven` label from #49
- Tag release if user wants
