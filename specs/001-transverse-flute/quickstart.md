# Quickstart: Transverse Flute Instrument

**Feature**: Transverse Flute Instrument (`specs/001-transverse-flute`)
**Date**: 2026-07-01

## Prerequisites

- Node.js >= 18
- npm dependencies installed (`npm install`)
- Development server can start (`npm run dev`)

## Validation Scenarios

### Scenario 1: View Scale Fingerings

**Steps**:
1. Start the dev server: `npm run dev`
2. Open `http://localhost:3000/flute`
3. Select **C Major** from the scale selector (or confirm it is the default).
4. Confirm the note count selector shows **7** by default.
5. Observe the row of flute diagrams.

**Expected Outcome**:
- Exactly 7 vertical flute diagrams are displayed in a horizontal row.
- The first diagram is labeled **C** and shows the C4 fingering (all main keys closed).
- The second diagram is labeled **D** and shows the D4 fingering.
- The seventh diagram is labeled **B** and shows the B4 fingering.
- All diagrams use the theme-appropriate colors (dark mode = dark gray body; light mode = light gray body).

### Scenario 2: Multi-Octave Wrap

**Steps**:
1. On the flute page, change the note count selector to **12**.
2. Ensure the scale is set to **C Major**.

**Expected Outcome**:
- 12 flute diagrams are displayed.
- Diagrams 1–7 show C4, D4, E4, F4, G4, A4, B4.
- Diagrams 8–12 show C5, D5, E5, F5, G5.
- The C5 diagram shows the same fingering pattern as C4 (all main keys closed).

### Scenario 3: Audio Playback

**Steps**:
1. On the flute page, click the first flute diagram (C4).

**Expected Outcome**:
- Audio plays a C4 pitch.
- If the flute sample (`/sounds/flute.wav`) is present, a flute timbre is heard.
- If the sample is missing, a sine wave at C4 frequency is heard (fallback).

### Scenario 4: Keyboard Accessibility

**Steps**:
1. On the flute page, press `Tab` until focus reaches the first flute diagram.
2. Press `Enter` or `Space`.

**Expected Outcome**:
- The focused diagram has a visible focus ring.
- The corresponding note plays.

### Scenario 5: Mobile Responsiveness

**Steps**:
1. Open browser DevTools and toggle to a mobile viewport (e.g., iPhone SE, 375px wide).
2. Navigate to `/flute`.
3. Select a note count of **12**.

**Expected Outcome**:
- The row of flute diagrams is horizontally scrollable.
- Each diagram remains readable (key circles are distinguishable, text is legible).
- Tapping a diagram plays the note.

### Scenario 6: Instrument Navigation

**Steps**:
1. Open the instrument dropdown in the page header.

**Expected Outcome**:
- **Flute** appears in the list alongside Guitar, Piano, Kalimba, and Harmonica.
- Selecting **Flute** navigates to `/flute`.

## Test Commands

```bash
# Run all tests
npm test

# Run tests related to audio/sample config (updated for flute)
npm test -- src/__tests__/unit/audio/instrumentSampleConfig.test.ts

# Run linter
npm run lint

# Build for production
npm run build
```

## Notes

- The `public/sounds/flute.wav` sample file is required for realistic playback but is **not** included in this plan's scope (assume it will be added during implementation or sourced from existing assets).
- If `flute.wav` is absent at validation time, the sine-wave fallback confirms the audio plumbing is correct.
