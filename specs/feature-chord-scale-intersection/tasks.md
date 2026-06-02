# Tasks: Chord-Scale Intersection

## T1 — Branch & Setup
- [x] Create branch `feat/chord-scale-intersection` from `main`

## T2 — Theory Utilities
- [ ] File: `src/lib/utils/chordUtils.ts`
  - [ ] `getDiatonicTriads(root, scaleNotes)`
  - [ ] `getChordTones(triad)`
  - [ ] `isChordToneShared(tone, triads)`
- [ ] File: `src/lib/utils/chordTypes.ts`
  - [ ] `ChordQuality` type + helpers
- [ ] Unit tests: `src/__tests__/chordUtils.test.ts`

## T3 — Redux State
- [ ] Update `globalConfigSlice.ts`
  - [ ] `chordScaleMode`
  - [ ] `selectedChord`
- [ ] Verify persistence in localStorage

## T4 — Highlight Hooks
- [ ] `useChordHighlight` for guitar
- [ ] `useChordHighlight` for piano
- [ ] Color tokens for root / unique / shared tones

## T5 — ChordPanel Component
- [ ] `ChordPanel.tsx` + `ChordPanel.module.css` (or Tailwind)
- [ ] Mobile slide-over behavior
- [ ] Chord selection + active state

## T6 — Instrument Integration
- [ ] Wire ChordPanel into guitar page (context trigger)
- [ ] Wire ChordPanel into piano page
- [ ] Toggle visibility via `chordScaleMode`

## T7 — Reverse Lookup (optional)
- [ ] Quality filter dropdown
- [ ] Filter logic on generated triads

## T8 — Polish & CI
- [ ] `npm run lint` green
- [ ] `npm run build` green
- [ ] `npm test` green
- [ ] Manual QA checklist
