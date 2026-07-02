# Data Model: Transverse Flute Instrument

**Feature**: Transverse Flute Instrument (`specs/001-transverse-flute`)
**Date**: 2026-07-01

## Entities

### FluteFingering

Represents the complete fingering required to produce a single pitch on a Boehm-system concert flute.

| Field | Type | Description |
|-------|------|-------------|
| `note` | `NoteWithOctave` | The pitch this fingering produces (e.g., "C4", "F#5") |
| `keys` | `FluteKeyState[]` | Ordered list of key states from headjoint to footjoint |

### FluteKeyState

Represents the state of one key/tone hole on the flute.

| Field | Type | Description |
|-------|------|-------------|
| `keyId` | `string` | Stable identifier for the key (e.g., "thumb", "l1", "r3", "eb") |
| `closed` | `boolean` | `true` = finger covering the key/hole; `false` = open |
| `label` | `string` | Human-readable label shown in the diagram (e.g., "L1", "R2", "E♭") |

### FluteKeyDefinition

Static metadata defining the visual layout of a key on the schematic diagram.

| Field | Type | Description |
|-------|------|-------------|
| `keyId` | `string` | Matches `FluteKeyState.keyId` |
| `label` | `string` | Display label |
| `position` | `number` | Vertical position index (0 = top/headjoint end) |
| `hand` | `"left" \| "right" \| "trill" \| "pinky"` | Grouping for layout/labeling |

### NoteSequence

The runtime-computed ordered list of notes to display.

| Field | Type | Description |
|-------|------|-------------|
| `notes` | `NoteWithOctave[]` | Consecutive scale notes with octave info |
| `scale` | `Scale` | Source scale (root + type + mode) |
| `noteCount` | `number` | How many notes were requested |

## Relationships

```
NoteSequence ──1:N──> FluteFingering
  (each note in the sequence has one fingering)

FluteFingering ──1:N──> FluteKeyState
  (each fingering defines the state of all keys)

FluteKeyDefinition ──metadata for──> FluteKeyState
  (static layout data references the same keyId)
```

## Static Data: Key Layout

The Boehm concert flute has the following keys, ordered from headjoint to footjoint:

| Position | keyId | Label | Hand |
|----------|-------|-------|------|
| 0 | `thumb` | Thumb | left |
| 1 | `l1` | L1 | left |
| 2 | `l2` | L2 | left |
| 3 | `l3` | L3 | left |
| 4 | `r1` | R1 | right |
| 5 | `r2` | R2 | right |
| 6 | `r3` | R3 | right |
| 7 | `eb` | E♭ | pinky |
| 8 | `gsharp` | G♯ | pinky |
| 9 | `c` | C | pinky |
| 10 | `csharp` | C♯ | pinky |
| 11 | `b` | B | pinky |
| 12 | `lowc` | Low C | foot |
| 13 | `lowcsharp` | Low C♯ | foot |
| 14 | `lowd` | Low D | foot |

## Static Data: Fingering Map (Partial — Primary Fingerings Only)

The full map covers C4 through C7. Below is a representative slice; the implementation file will contain the complete table.

| Note | thumb | l1 | l2 | l3 | r1 | r2 | r3 | eb | gsharp | c | csharp | b | lowc | lowcsharp | lowd |
|------|-------|----|----|----|----|----|----|----|--------|---|--------|---|------|-----------|------|
| C4 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| C#4/Db4 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| D4 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |
| C5 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| C6 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

> **Note**: The full fingering table is implementation data and lives in the source file (`src/app/flute/fluteFingerings.ts`). This model document defines the structure only.

## State Transitions

### Page-Level State (local `useState`)

```
[noteCount: number]
  └── user selects value from dropdown
      └── re-render with new NoteSequence
      └── update localStorage "flute-note-count"
```

### Global State (Redux — no changes to structure)

```
[globalConfig.scale]
  └── user changes scale anywhere in app
      └── flute page re-renders via selectScale
      └── new NoteSequence computed
      └── new FluteFingering[] rendered
```

## Validation Rules

1. `noteCount` must be an integer between 1 and 24 (inclusive).
2. Every `note` in a `NoteSequence` must have a corresponding `FluteFingering` entry; if a note is outside the mapped range, the diagram renders with a "not available" indicator instead of crashing.
3. `FluteKeyState[]` arrays must contain exactly one entry per `FluteKeyDefinition` (same length, same keyId order).
4. Octave numbers in `NoteWithOctave` must be ≥ 0 and ≤ 9.
