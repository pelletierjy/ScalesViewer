# UI Contract: Flute Diagram Component

**Feature**: Transverse Flute Instrument (`specs/001-transverse-flute`)
**Date**: 2026-07-01

## Component: FluteDiagram

Rendered inline within `src/app/flute/page.tsx` (no separate component file required for MVP; may be extracted if reuse emerges).

### Props Interface

```typescript
interface FluteDiagramProps {
  /** The note this diagram represents, including octave (e.g., "C4", "F#5") */
  note: NoteWithOctave;

  /** Scale context for coloring the note indicator */
  scale: Scale;

  /** Whether to display note name, flat equivalent, or scale degree */
  displayMode: "note" | "flat" | "degree";

  /** Whether the app is in dark mode (affects SVG colors) */
  isDarkMode: boolean;

  /** Whether to highlight only roots (monochrome mode) */
  highlightRoots: boolean;

  /** Called when the user clicks or presses Enter/Space on the diagram */
  onPlay: (note: NoteWithOctave) => void;
}
```

### Visual Contract

1. **Container**: Each diagram is an SVG `<g>` element with a fixed width and height, translated to its horizontal position in the row.
2. **Flute Body**: A vertical rectangle (`width=60, height=300`) centered in the diagram, colored according to theme (`gray-600` dark, `gray-300` light).
3. **Key Holes**: Circles (`r=8`) positioned vertically along the flute body at fixed Y coordinates corresponding to the key layout defined in `data-model.md`.
   - **Closed key**: Filled circle with contrasting fill color.
   - **Open key**: Outlined circle (stroke only, no fill).
4. **Note Label**: A text element above the flute body showing the note name (or degree/flat per `displayMode`), colored via the existing `getNoteColor` utility.
5. **Octave Indicator**: Small text below the note label when octave differs from the starting octave.
6. **Interactivity**:
   - `onClick` triggers `onPlay(note)`.
   - `onKeyDown` for `Enter` or `Space` triggers `onPlay(note)`.
   - `role="button"` and `tabIndex={0}` for keyboard accessibility.
   - `aria-label` format: `"Play {note} on flute"`.

### Row Layout Contract

1. **Container**: An outer SVG with `width="100%"`, `height="400"`, and `viewBox` sized to `noteCount * diagramWidth + padding`.
2. **Overflow**: The SVG is wrapped in a `div` with `overflow-x-auto` so narrow viewports scroll horizontally.
3. **Spacing**: Each diagram is spaced `diagramWidth + gap` pixels apart, where `gap = 20`.
4. **Responsive Behavior**: On viewports narrower than the total row width, the container scrolls. On wider viewports, the SVG centers.

## Hook Contract: useFluteNoteSequence

```typescript
function useFluteNoteSequence(scale: Scale, noteCount: number): NoteWithOctave[];
```

**Behavior**:
- Returns an array of `noteCount` consecutive notes from the given scale, starting at `scale.root` in octave 4.
- When the scale has fewer notes than `noteCount`, wraps into the next octave(s) by repeating the scale pattern.
- Memoized with `useMemo` keyed on `scale.root`, `scale.type`, `scale.mode`, and `noteCount`.

## Function Contract: getFluteFingering

```typescript
function getFluteFingering(note: NoteWithOctave): FluteFingering | null;
```

**Behavior**:
- Looks up the primary Boehm-system fingering for the given note.
- Returns `null` if the note is outside the supported range (C4–C7) or no fingering is defined.
- Pure function; no side effects.

## Function Contract: getConsecutiveScaleNotes

```typescript
function getConsecutiveScaleNotes(
  scale: Scale,
  count: number,
  startOctave?: number
): NoteWithOctave[];
```

**Behavior**:
- Generates `count` consecutive scale notes beginning at `scale.root` in `startOctave` (defaults to 4).
- Wraps through scale degrees, incrementing octave when cycling past the highest degree.
- Returns an empty array if `count <= 0`.
- Throws if `scale` is invalid (missing root or type).
