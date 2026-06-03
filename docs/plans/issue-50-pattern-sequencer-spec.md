# Issue #50: Melodic Pattern Sequencer (Scale Locker) — Implementation Spec

> **Goal:** Let users lock a scale and explore melodic patterns within it, turning the visualization into an active practice tool.

## Architecture

- **Pattern logic** lives in `src/lib/utils/patternUtils.ts` — pure functions, fully tested.
- **State** uses Redux (`patternSlice.ts`) for persistence across navigation.
- **UI** is a `PatternPanel` component (similar to `ChordPanel`) shown on instrument pages.
- **Audio** reuses existing `playNote()` from `audioUtils.ts`.
- **Visual feedback** highlights notes matching the current pattern step on the instrument.

## Non-Goals (v1)

- No MIDI import/recording.
- No microtonal scales.
- No external DAW sync.
- No custom pattern builder UI (presets only for v1; custom builder can be added later).
- No animated SVG cursor moving across strings/frets (v1 highlights all notes of the current step degree).

## Acceptance Criteria

- [ ] Scale selection locks pattern to diatonic notes only.
- [ ] Pattern step editor accepts degrees 1–7 (preset patterns for v1).
- [ ] Changing root re-maps every pattern step to the new key diatonically.
- [ ] Playback highlights current step notes on the active instrument.
- [ ] Audio playback uses existing `audioUtils.ts`.
- [ ] Strict TypeScript, no `any`, Tailwind styling.

## Data Model

```ts
// patternUtils.ts
export type PatternStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | -2 | -3 | -5 | -6 | -7; // negative = flat alteration

export interface MelodicPattern {
  id: string;
  name: string;
  steps: PatternStep[];
}

export const PRESET_PATTERNS: MelodicPattern[] = [
  { id: "1235", name: "1-2-3-5", steps: [1, 2, 3, 5] },
  { id: "35810", name: "3-5-7-9 (diatonic)", steps: [3, 5, 7, 2] }, // 9th = 2
  { id: "1b345", name: "1-♭3-4-5", steps: [1, -3, 4, 5] },
  { id: "1531", name: "1-5-3-1", steps: [1, 5, 3, 1] },
  { id: "1357", name: "1-3-5-7", steps: [1, 3, 5, 7] },
];

// Convert a pattern step to a semitone interval within the scale
export function getStepInterval(step: PatternStep, scaleNotes: Note[]): number;

// Map pattern steps to actual notes given a scale
export function getPatternNotes(pattern: MelodicPattern, scale: Scale): NoteWithOctave[];

// Transpose pattern diatonically when root changes (already handled by getPatternNotes)
```

## State (Redux)

```ts
// features/pattern/patternSlice.ts
interface PatternState {
  isPatternModeEnabled: boolean;
  selectedPatternId: string | null;
  currentStepIndex: number;
  isPlaying: boolean;
  tempo: number; // BPM
  loop: boolean;
}
```

Actions:
- `togglePatternMode()`
- `selectPattern(id: string)`
- `setTempo(bpm: number)`
- `toggleLoop()`
- `startPlayback()` / `stopPlayback()` / `advanceStep()`

## Component Plan

### PatternPanel
- Positioned below instrument on each page (like `ChordPanel`).
- Toggle switch to enable/disable pattern mode.
- Preset selector dropdown.
- Transport: Play / Stop button, tempo input (slider + number), loop checkbox.
- Step visualizer: row of buttons showing pattern steps, current step highlighted.
- When enabled, non-pattern notes on instrument are dimmed (or pattern notes are brightened).

### Instrument Integration
- Guitar / Piano pages read `patternState` from Redux.
- When `isPatternModeEnabled` and `isPlaying`, the current step's notes are emphasized.
- `playNote()` is called for each step advance.

### Timing
- `useEffect` with `setInterval` based on `tempo` BPM.
- Interval = `(60 / tempo) * 1000` ms.
- Clean up on unmount or stop.

## File Touch List

1. **Create:** `src/lib/utils/patternUtils.ts`
2. **Create:** `src/lib/utils/__tests__/patternUtils.test.ts`
3. **Create:** `src/features/pattern/patternSlice.ts`
4. **Create:** `src/features/pattern/__tests__/patternSlice.test.ts`
5. **Create:** `src/components/PatternPanel/PatternPanel.tsx`
6. **Modify:** `src/app/store.ts` — add `pattern` reducer
7. **Modify:** `src/app/guitar/page.tsx` — add `<PatternPanel />`
8. **Modify:** `src/app/piano/page.tsx` — add `<PatternPanel />`
9. **Modify:** `src/app/guitar/GuitarNeck/...` — accept pattern highlight props (or use Redux directly)
10. **Modify:** `src/app/piano/...` — accept pattern highlight props

## Testing Strategy

- Unit tests for `patternUtils.ts` (RED-GREEN-REFACTOR).
- Unit tests for `patternSlice.ts` reducer logic.
- Integration: build passes, existing 82 tests still pass.

---
