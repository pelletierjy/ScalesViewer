# Priority 1 Test Implementation Plan
## Core Music Utilities Testing Strategy

This document provides a detailed implementation plan for Priority 1 testing components in ScalesViewer - the core music theory utilities that power the entire application.

## Overview

Priority 1 components are **CRITICAL** business logic that must be tested with 90%+ coverage:

### Target Components
1. **`src/lib/utils/scaleUtils.ts`** - Scale calculations, transposition, note relationships
2. **`src/lib/utils/note.ts`** - Note type definitions and utilities  
3. **`src/app/guitar/utils/octaveCalculation.ts`** - Guitar-specific octave calculations

### Risk Assessment
- **HIGH RISK**: These utilities power all instrument visualizations
- **IMPACT**: Bugs here affect every scale calculation across the app
- **COMPLEXITY**: Mathematical calculations with edge cases

---

## Component Analysis

### 1. scaleUtils.ts Analysis

**Purpose**: Core scale theory calculations and note manipulation

**Key Functions to Test:**
- `getNoteIndex(note: Note): number` - Convert note to chromatic index
- `getNoteAtInterval(root: Note, interval: number): Note` - Calculate note at semitone interval
- `getScaleNotes(scale: Scale): Note[]` - Generate all notes in a scale
- `isNoteInScale(note: Note, scale: Scale): boolean` - Check scale membership
- `calculateFretNote(openNote: Note, fret: number): Note` - Calculate fretted note
- `getScaleDegree(note: Note, scale: Scale): string` - Get scale degree (1, ♭2, etc.)
- `getInterval(from: Note, to: Note): number` - Calculate semitone interval
- `transposeNote(note: Note, interval: number): Note` - Transpose by interval
- `sharpToFlat(note: Note): Note` - Enharmonic conversion

**Critical Edge Cases:**
- Flat/sharp note handling (`Bb` vs `A#`)
- Modal rotations for major scale
- Octave boundary crossings
- Invalid note inputs
- Negative intervals/transpositions

**Dependencies:**
- `SCALE_PATTERNS` from scaleConstants.ts
- `Note` type from note.ts
- `Scale`, `ScaleMode` types from scaleType.ts

### 2. note.ts Analysis

**Purpose**: Note type definitions and basic note utilities

**Current State**: 
- Contains only TypeScript type definitions
- No utility functions currently implemented
- May need additional utility functions for frequency calculations

**Key Types to Validate:**
- `Note` union type - All valid note names including enharmonics
- `NoteWithOctave` type - Note with octave number

**Potential Extensions Needed:**
- `noteToFrequency(note: NoteWithOctave): number`
- `frequencyToNote(frequency: number): NoteWithOctave` 
- `areEnharmonicallyEquivalent(note1: Note, note2: Note): boolean`

### 3. octaveCalculation.ts Analysis

**Purpose**: Guitar-specific octave calculations for audio playbook

**Key Functions to Test:**
- `getBaseOctave(note: Note, stringIndex: number, totalStrings: number): number`
- `calculateNoteWithOctave(openNote: Note, stringIndex: number, totalStrings: number, fret: number): NoteWithOctave`
- `calculateNoteWithOctaveMemoized()` - Cached version
- `clearCalculationCache(): void` - Cache management

**Critical Logic:**
- String position affects base octave (lower strings = lower octaves)
- Fret positions add semitones (12 frets = 1 octave)
- Octave boundary crossing (B to C increases octave)
- Memoization cache management (performance)

**Edge Cases:**
- 6-string standard tuning special cases
- Extended range guitars (7, 8+ strings)
- Alternative tunings
- Cache size limits (1000 entries)

---

## Test Implementation Plan

### Phase 1A: scaleUtils.ts Tests (Days 1-3)

#### Test File: `src/__tests__/unit/utils/scaleUtils.test.ts`

```typescript
describe('scaleUtils', () => {
  describe('getNoteIndex', () => {
    it('should return correct chromatic indices for sharp notes')
    it('should convert flat notes to sharp equivalents')
    it('should handle all valid note names')
    it('should throw error for invalid notes')
  })

  describe('getNoteAtInterval', () => {
    it('should calculate notes at positive intervals')
    it('should handle octave wraparound (> 12 semitones)')
    it('should handle negative intervals')
    it('should work with both sharp and flat root notes')
  })

  describe('getScaleNotes', () => {
    it('should generate C major scale correctly')
    it('should generate minor scales correctly') 
    it('should handle pentatonic scales')
    it('should apply modal rotations correctly')
    it('should work with all root notes')
    it('should handle exotic scales (diminished, whole-tone)')
  })

  describe('isNoteInScale', () => {
    it('should identify notes in major scales')
    it('should identify notes in minor scales')
    it('should handle enharmonic equivalents')
    it('should return false for non-scale notes')
  })

  describe('calculateFretNote', () => {
    it('should calculate fretted notes correctly')
    it('should handle 12th fret octave')
    it('should work with all open string notes')
    it('should handle extended fret ranges (24+ frets)')
  })

  describe('getScaleDegree', () => {
    it('should return correct scale degrees')
    it('should handle flat degrees (♭2, ♭3, etc.)')
    it('should work with all scale types')
  })

  describe('transposeNote', () => {
    it('should transpose notes up correctly')
    it('should transpose notes down (negative intervals)')
    it('should handle octave boundaries')
    it('should preserve enharmonic consistency')
  })

  describe('sharpToFlat conversion', () => {
    it('should convert sharp notes to flats')
    it('should leave natural notes unchanged')
    it('should handle all sharp/flat pairs')
  })
})
```

**Test Data Requirements:**
- All 12 chromatic notes (both sharp and flat forms)
- Major scale patterns for all roots
- Modal test cases (Dorian, Phrygian, etc.)
- Pentatonic and blues scale examples
- Edge case intervals (0, 12, 24, -1, -12)

#### Days 1-2: Core Functions
- `getNoteIndex`, `getNoteAtInterval`, `getScaleNotes`
- Focus on mathematical accuracy
- Test all scale types from SCALE_PATTERNS

#### Day 3: Advanced Functions  
- `isNoteInScale`, `getScaleDegree`, `transposeNote`
- Mode rotation testing
- Enharmonic handling edge cases

### Phase 1B: octaveCalculation.ts Tests (Days 4-5)

#### Test File: `src/__tests__/unit/utils/octaveCalculation.test.ts`

```typescript
describe('octaveCalculation', () => {
  describe('getBaseOctave', () => {
    it('should return correct octaves for 6-string standard tuning')
    it('should handle string position adjustments')
    it('should work with extended range guitars')
    it('should handle alternative tunings')
  })

  describe('calculateNoteWithOctave', () => {
    it('should calculate open string octaves correctly')
    it('should handle fret position octave changes')
    it('should detect octave boundary crossings (B to C)')
    it('should work across all fret positions')
    it('should handle extended range instruments')
  })

  describe('calculateNoteWithOctaveMemoized', () => {
    it('should return same results as non-memoized version')
    it('should cache results for repeated calls')
    it('should manage cache size limits')
  })

  describe('clearCalculationCache', () => {
    it('should clear memoization cache')
    it('should not affect calculation results after clearing')
  })
})
```

**Test Cases:**
- Standard 6-string guitar: E2-A2-D3-G3-B3-E4
- 7-string guitar scenarios
- All fret positions (0-24)
- Octave crossing scenarios (B to C, E to F)
- Cache performance validation

#### Day 4: Core Octave Logic
- `getBaseOctave` with string position logic
- `calculateNoteWithOctave` basic functionality
- Octave crossing detection

#### Day 5: Performance & Caching
- Memoization testing
- Cache size management  
- Performance benchmarking

### Phase 1C: note.ts Extensions (Day 6)

#### Current State Assessment
The current `note.ts` only contains TypeScript types. We may need to add utility functions.

#### Potential Extensions to Implement & Test:
```typescript
// Add these functions to note.ts if needed
export function noteToFrequency(note: NoteWithOctave): number
export function frequencyToNote(frequency: number): NoteWithOctave  
export function areEnharmonicallyEquivalent(note1: Note, note2: Note): boolean
```

#### Test File: `src/__tests__/unit/utils/note.test.ts`

```typescript
describe('note utilities', () => {
  describe('type validation', () => {
    it('should accept all valid Note types')
    it('should accept NoteWithOctave format')
  })

  // If frequency functions are added:
  describe('noteToFrequency', () => {
    it('should calculate A4 = 440Hz correctly')
    it('should handle octave relationships')
    it('should work with all note names')
  })

  describe('frequencyToNote', () => {
    it('should convert 440Hz to A4')
    it('should handle frequency ranges')
    it('should round to nearest note')
  })

  describe('areEnharmonicallyEquivalent', () => {
    it('should identify C# and Db as equivalent')
    it('should handle all enharmonic pairs')
    it('should return false for different notes')
  })
})
```

---

## Test Utilities Setup

### Enhanced Test Utils

Create `src/__tests__/utils/musicTestUtils.ts`:

```typescript
import { Note } from '@/lib/utils/note'
import { Scale, ScaleType } from '@/lib/utils/scaleType'

// Test data generators
export const ALL_NOTES: Note[] = [
  'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 
  'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'
]

export const ENHARMONIC_PAIRS: [Note, Note][] = [
  ['C#', 'Db'], ['D#', 'Eb'], ['F#', 'Gb'], 
  ['G#', 'Ab'], ['A#', 'Bb']
]

export const STANDARD_6_STRING_TUNING: Note[] = ['E', 'A', 'D', 'G', 'B', 'E']

export function createScale(root: Note, type: ScaleType): Scale {
  return { root, type }
}

export function expectNotesToBeEnharmonicallyEqual(actual: Note[], expected: Note[]) {
  // Custom matcher for enharmonic note arrays
}

// Frequency test constants
export const A4_FREQUENCY = 440
export const OCTAVE_RATIO = 2
```

### Mock Setup

For components with external dependencies:

```typescript
// Mock scaleConstants for isolated testing
jest.mock('@/lib/utils/scaleConstants', () => ({
  SCALE_PATTERNS: {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    // ... other test patterns
  }
}))
```

---

## Implementation Timeline

### Week 1: Priority 1 Core Utilities

#### Day 1-2: scaleUtils.ts Foundation
- **Morning**: Set up test structure and utilities
- **Afternoon**: Implement basic note/interval tests  
- **Output**: `getNoteIndex`, `getNoteAtInterval`, basic `getScaleNotes` tests

#### Day 3: scaleUtils.ts Advanced Features
- **Morning**: Scale generation and mode rotation tests
- **Afternoon**: Scale degree and transposition tests
- **Output**: Complete scaleUtils.ts test coverage

#### Day 4-5: octaveCalculation.ts  
- **Day 4**: Core octave calculation logic
- **Day 5**: Memoization and performance testing
- **Output**: Complete octaveCalculation.ts test coverage

#### Day 6: note.ts & Integration
- **Morning**: Assess and implement note utility functions if needed
- **Afternoon**: Integration testing between components
- **Output**: Complete Priority 1 test suite

#### Day 7: Quality Assurance
- **Morning**: Test review and edge case coverage
- **Afternoon**: Performance benchmarking and optimization
- **Output**: Production-ready test suite with 90%+ coverage

---

## Success Criteria

### Coverage Targets
- **scaleUtils.ts**: 95% coverage (all functions and branches)
- **octaveCalculation.ts**: 90% coverage (including cache logic)
- **note.ts**: 100% coverage (type validation + any utilities)

### Quality Metrics
- **All tests must pass consistently** (0% flaky tests)
- **Performance**: Test suite runs in <5 seconds
- **Edge case coverage**: All error conditions tested
- **Integration**: Components work together correctly

### Validation Tests
Each component must pass these integration validations:

1. **Scale Accuracy**: Generate C major scale → ['C', 'D', 'E', 'F', 'G', 'A', 'B']
2. **Transposition Accuracy**: C major + 2 semitones → D major
3. **Octave Calculation**: 6-string E standard, 12th fret → E one octave higher
4. **Enharmonic Handling**: F# major and Gb major generate equivalent scales

---

## Risk Mitigation Strategies

### Mathematical Accuracy
- **Cross-reference**: Validate calculations against music theory references
- **Property testing**: Use generated test cases for comprehensive coverage
- **Boundary testing**: Test all edge cases (0, 12, 24 semitones, etc.)

### Performance Concerns
- **Memoization testing**: Verify cache behavior under load
- **Memory leak prevention**: Test cache size limits
- **Benchmark critical paths**: Ensure calculations remain fast

### Type Safety
- **Exhaustive type testing**: Test all valid Note combinations
- **Invalid input handling**: Ensure proper error handling
- **TypeScript strict mode**: Maintain type safety throughout

---

## Next Steps After Priority 1

Once Priority 1 tests are complete (90%+ coverage), proceed to:

1. **Priority 2**: Guitar visualization components
2. **Priority 3**: State management testing  
3. **Integration**: Cross-component workflow testing

The Priority 1 foundation will enable confident development of all higher-level features, knowing the core music theory calculations are rock-solid.

---

## Implementation Commands

```bash
# Create test directory structure
mkdir -p src/__tests__/unit/utils
mkdir -p src/__tests__/utils

# Create test files
touch src/__tests__/unit/utils/scaleUtils.test.ts
touch src/__tests__/unit/utils/octaveCalculation.test.ts  
touch src/__tests__/unit/utils/note.test.ts
touch src/__tests__/utils/musicTestUtils.ts

# Run Priority 1 tests
npm test -- src/__tests__/unit/utils/

# Run with coverage
npm run test:coverage -- src/__tests__/unit/utils/
```

This plan ensures the most critical components are thoroughly tested first, providing a solid foundation for the entire ScalesViewer application.