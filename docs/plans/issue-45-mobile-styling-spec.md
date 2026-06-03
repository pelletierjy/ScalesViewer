# Issue #45: Mobile Styling Alignment — Implementation Spec

> **Goal:** Fix horizontal overflow on `/guitar` (and all routes) when viewed on mobile phones so the page is usable without dragging.

## Problem Analysis

- `Header.tsx` uses nested `flex` rows without `flex-wrap`. On screens < 640px the instrument/scale/root selectors + icon buttons overflow horizontally.
- `ClientLayout.tsx` wraps `<Header />` in `flex justify-between items-center` with no overflow handling.
- The guitar SVG fretboard is inherently wider than mobile viewports and needs controlled scroll behavior rather than breaking the page layout.

## Acceptance Criteria

- [ ] Header controls wrap or collapse gracefully on screens < 640px wide.
- [ ] No horizontal scroll on the page body itself (instrument SVG may scroll internally).
- [ ] Default view on mobile shows page content centered/left-aligned within viewport.
- [ ] Existing desktop layout is unchanged.

## Implementation Tasks

### Task 1: Fix Header responsiveness

**File:** `src/components/Header.tsx`

- Change outer container from `flex items-center gap-4` to `flex flex-wrap items-center gap-4`.
- Change the controls row (`<div className="flex items-center gap-6">`) to `flex flex-wrap items-center gap-4 sm:gap-6`.
- Add responsive sizing to select elements: `w-full sm:w-auto` or ensure they shrink.
- Ensure button row (`<div className="flex gap-2">`) wraps: `flex flex-wrap gap-2`.

### Task 2: Fix ClientLayout overflow

**File:** `src/app/ClientLayout.tsx`

- Change header wrapper from `flex justify-between items-center` to `flex flex-wrap justify-between items-center gap-4`.
- Ensure the outer `max-w-[1400px]` container has `overflow-x-hidden` or proper containment.

### Task 3: Fix Guitar page overflow

**File:** `src/app/guitar/page.tsx`

- Ensure the outer `div` does not force width beyond viewport. Already `w-full` — verify.
- Guitar SVG neck may need `overflow-x-auto` on its container if wider than screen.

### Task 4: Verify

Run dev server, resize browser to 375px width, confirm:
- No body horizontal scroll.
- Header stacks vertically.
- Guitar neck scrolls horizontally if needed but page does not.

---
