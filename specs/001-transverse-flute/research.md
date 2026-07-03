# Research: Transverse Flute Instrument

**Feature**: Transverse Flute Instrument (`specs/001-transverse-flute`)
**Date**: 2026-07-01

## Unknowns Resolved

### 1. Boehm-System Flute Fingering Representation

**Decision**: Use a simplified schematic SVG showing the flute body as a vertical rectangle with circular key holes aligned along its length. Each key is rendered as a circle: filled = closed (finger down), empty/outline = open (finger up). Keys are labeled with their standard Boehm identifiers (e.g., "L1", "L2", "R1", "R2", "Thumb").

**Rationale**:
- Matches the application's existing SVG schematic style (kalimba tines, harmonica holes, guitar fretboard)
- Easier to implement and maintain than a photorealistic illustration
- Clear at small sizes on mobile
- Standard music education apps (e.g., fingering chart apps) use similar schematic representations

**Alternatives considered**:
- Photorealistic flute image with overlay highlights: Rejected due to maintenance burden, asset size, and scaling issues
- Text-only fingering notation (e.g., "T 1 2 | 1 2 3"): Rejected because it lacks the intuitive visual mapping that musicians expect from a fingering chart

### 2. Multi-Octave Note Sequence Generation

**Decision**: Build a `getConsecutiveScaleNotes(scale, count, startOctave)` utility that generates `NoteWithOctave[]` by iterating through scale notes and incrementing octave when wrapping past the last scale degree.

**Rationale**:
- The existing `getScaleNotes()` returns only one octave of notes
- This utility is reusable and testable in isolation
- Start octave is fixed at C4 for flute (comfortable low register), but the root note may be anywhere in the scale

**Algorithm sketch**:
```
scaleNotes = getScaleNotes(scale)
rootIndex = index of scale.root in scaleNotes
result = []
octave = startOctave
for i from 0 to count-1:
  noteIndex = (rootIndex + i) % len(scaleNotes)
  if noteIndex < previousNoteIndex: octave += 1
  result.append(scaleNotes[noteIndex] + octave)
```

### 3. Audio Playback Strategy for Flute

**Decision**: Flute uses the existing "sample" playback strategy with a new flute WAV sample. If the sample fails to load, it falls back to sine wave (existing fallback behavior in `playNote`).

**Rationale**:
- Consistent with piano and harmonica which also use sample playback
- No need for pluck synth (that is reserved for guitar/kalimba)
- The existing `resolvePlaybackStrategy` already routes non-pluck instruments to sample; adding flute requires only adding it to `INSTRUMENT_SAMPLES`

### 4. Note Count Selector UI Pattern

**Decision**: A `<select>` dropdown identical to the piano's "octave count" selector, placed below the flute diagram row. Options: 1, 3, 5, 7, 12, 24.

**Rationale**:
- Reuses an existing, tested UI pattern from the piano page
- The discrete values cover common use cases (one note, one octave, full chromatic range)
- Local state with `localStorage` persistence mirrors piano's octave count behavior

### 5. Mobile Layout for Horizontal Row

**Decision**: The SVG container uses `overflow-x-auto` with `viewBox` scaling, identical to the piano and harmonica pages. On narrow screens, users scroll horizontally. The SVG `viewBox` ensures diagrams scale proportionally.

**Rationale**:
- Existing pattern in piano (wide keyboard) and harmonica (wide harp body)
- `overflow-x-auto` is a Tailwind one-liner
- Each flute diagram maintains a fixed aspect ratio, so scaling preserves readability

### 6. State Management Approach

**Decision**: Follow the piano/harmonica pattern: Redux for global config (scale, dark mode, etc.), local `useState` for page-specific controls (note count).

**Rationale**:
- Constitution Principle 7 (Learning Platform Integrity) intentionally uses different state management approaches per page
- Guitar uses Context; Piano uses Redux + local state; Flute should align with Piano for consistency within the "simple instrument" family
- No prop drilling needed; page is self-contained

## Decisions Summary

| Topic | Decision | Location |
|-------|----------|----------|
| Fingering visual | Schematic SVG with filled/open circles | `src/app/flute/page.tsx` SVG markup |
| Multi-octave notes | New `getConsecutiveScaleNotes` utility | `src/lib/utils/scaleUtils.ts` |
| Audio | Sample playback (new flute.wav) | `public/sounds/flute.wav`, `instrumentSampleConfig.ts` |
| Note count UI | `<select>` dropdown (1,3,5,7,12,24) | `src/app/flute/page.tsx` |
| Mobile layout | `overflow-x-auto` + SVG `viewBox` | `src/app/flute/page.tsx` container |
| State mgmt | Redux (global) + `useState` (local) | `src/app/flute/page.tsx` |
