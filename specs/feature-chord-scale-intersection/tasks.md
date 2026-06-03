# Tasks: Chord-Scale Intersection

## T1 — Branch & Setup
- [x] Create branch `feat/chord-scale-intersection` from `main`

## T2 — Theory Utilities
- [x] File: `src/lib/utils/chordUtils.ts`
  - [x] `getDiatonicTriads(root, scaleNotes)`
  - [x] `getChordTones(triad)`
  - [x] `isChordToneShared(tone, triads)`
- [x] File: `src/lib/utils/chordTypes.ts`
  - [x] `ChordQuality` type + helpers
- [x] Unit tests: `src/__tests__/chordUtils.test.ts`

## T3 — Redux State
- [x] Update `globalConfigSlice.ts`
  - [x] `chordScaleMode`
  - [x] `selectedChord`
- [x] Verify persistence in localStorage

## T4 — Highlight Hooks
- [x] `useChordHighlight` for guitar
- [x] `useChordHighlight` for piano
- [x] Color tokens for root / unique / shared tones

## T5 — ChordPanel Component
- [x] `ChordPanel.tsx` + `ChordPanel.module.css` (or Tailwind)
- [x] Mobile slide-over behavior
- [x] Chord selection + active state

## T6 — Instrument Integration
- [x] Wire ChordPanel into guitar page (context trigger)
- [x] Wire ChordPanel into piano page
- [x] Toggle visibility via `chordScaleMode`

## T7 — Reverse Lookup (optional)
- [x] Quality filter dropdown
- [x] Filter logic on generated triads

## T8 — Polish & CI
- [x] `npm run lint` green
- [x] `npm run build` green
- [ ] `npm test` green
- [ ] Manual QA checklist
