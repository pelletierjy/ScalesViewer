# Feature Spec: Chord-Scale Intersection (Scale Mode Explorer)

## Problem / Opportunity
ScalesViewer currently shows note positions for a selected scale, but offers no harmonic context. Musicians and composers need to understand which chords fit inside a scale, and which scale degrees each chord contains.

## Solution
Add a **Chord-Scale Intersection** mode that:
1. Generates diatonic triads (and optional seventh chords) from the current scale + root
2. Visualizes chord tones on the active instrument (guitar/piano)
3. Distinguishes shared chord tones (present in multiple diatonic chords) from unique tones
4. Allows reverse lookup: select a chord quality to see where it lives in the scale

## Users
- Music students learning harmony
- Composers/arrangers writing diatonic progressions
- Improvisers choosing chord tones over a given scale
- Teachers explaining key relationships

## Success Criteria
- A user selects D Dorian on the guitar page → sees `Dm Em F G Am Bdim`
- Tapping `Em` highlights E, G, B across the fretboard
- Shared chord tones (e.g., F in D Dorian) are visually distinct from unique tones
- Works on mobile and desktop, respects dark/light theme
- Zero `any` types; strict TypeScript + Tailwind

## Scope

### In Scope (v1)
- Diatonic triad generation from `scaleConstants.ts` patterns + existing `scaleUtils.ts`
- Chord list panel (toggleable overlay on instrument pages)
- Click chord → highlight notes on active SVG visualization
- Shared vs unique chord tone distinction
- Reverse lookup by chord quality

### Out of Scope (v1)
- Chord voicing playback (audio)
- Seventh-chord generation (triads only; sevenths can follow later)
- MIDI analysis / auto-key detection
- Support for exotic / custom scales beyond current data model

## Dependencies
- Existing `scaleUtils.ts` (getScaleNotes, getScaleDegree)
- Existing `note.ts` (Note types, normalization)
- Redux store for global `chordScaleMode` toggle
- Instrument Contexts (guitar/piano) for local highlight state

## Risks
- Tight coupling with instrument SVG components; must keep highlight logic in shared hooks/utils
- Performance if we re-render full SVG on every chord click (mitigate with memoization)
- `scaleConstants.ts` may not directly enumerate triads; we derive them algorithmically
