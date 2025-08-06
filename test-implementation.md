# ScalesViewer Test Implementation Plan

## Executive Summary

This document outlines a comprehensive testing strategy for the ScalesViewer musical instrument visualization application. The current test coverage is approximately 15% with only basic UI rendering tests. This plan prioritizes critical business logic (music theory calculations) and provides a roadmap to achieve 90% test coverage across core utilities and components.

## Current Test Coverage Assessment

### Existing Tests (4 files)
- `src/__tests__/Home.test.tsx` - Basic home page rendering and navigation
- `src/__tests__/CustomTuningEditor.test.tsx` - Guitar tuning editor functionality  
- `src/__tests__/tuningGroups.test.ts` - Tuning data validation
- `src/__tests__/test-utils.tsx` - Test utility setup with Redux provider

**Current Coverage Status:** **~15%** - Very limited coverage focusing mainly on basic UI rendering

## Critical Components Missing Tests

### HIGH PRIORITY - MISSING CRITICAL TESTS

#### Core Music Utilities (`src/lib/utils/`)
- **`scaleUtils.ts`** - **CRITICAL**: Scale calculations, transposition, note degree calculations
- **`note.ts`** - **CRITICAL**: Frequency calculations, enharmonic equivalents, note naming
- **`scaleConstants.ts`** - Scale definitions validation
- **Audio utilities** - Web Audio API integration (if implemented)

#### Guitar Core Components
- **`GuitarNeck/GuitarNeck.tsx`** - Main visualization component
- **`GuitarNeck/getFretPositions.tsx`** - Fret positioning calculations
- **`GuitarNeck/getAdjustedTuning.tsx`** - Base tuning transposition
- **`utils/octaveCalculation.ts`** - Octave logic for audio playback
- **`hooks/useLocalStorage.ts`** - Persistence logic

#### State Management
- **`features/globalConfig/globalConfigSlice.ts`** - Redux slice
- **`features/application/applicationSlice.ts`** - Application state
- **`app/persistentStateMiddleware.ts`** - localStorage middleware
- **`app/guitar/context.tsx`** - Guitar page context

#### Other Instrument Pages
- Piano, Kalimba, Harmonica components (completely untested)

## Testing Priority Matrix

### HIGH PRIORITY / HIGH IMPACT
1. **Music Theory Utilities** (`scaleUtils.ts`, `note.ts`)
   - Scale calculation accuracy
   - Note transposition logic
   - Frequency calculations
   - Enharmonic equivalents handling

2. **Core Guitar Components**
   - `GuitarNeck` rendering and note positioning
   - Fret position calculations
   - Octave calculations for audio

3. **State Persistence**
   - Redux store functionality
   - localStorage middleware
   - Custom tuning persistence

### HIGH PRIORITY / MEDIUM IMPACT
1. **Configuration Components**
   - Tuning selection and validation
   - Custom tuning creation/editing
   - Fret count and string count changes

2. **Context Providers**
   - Guitar page context functionality
   - State updates and propagation

### MEDIUM PRIORITY / HIGH IMPACT
1. **Other Instruments**
   - Piano keyboard rendering and interaction
   - Kalimba and Harmonica visualizations

2. **Audio System** (if implemented)
   - Note playback functionality
   - Web Audio API integration

### MEDIUM PRIORITY / MEDIUM IMPACT
1. **UI Components**
   - Theme switching
   - Responsive design behavior
   - Accessibility features

## Recommended Test Structure

```
src/__tests__/
├── unit/
│   ├── utils/
│   │   ├── scaleUtils.test.ts           # Scale calculations
│   │   ├── note.test.ts                 # Note utilities
│   │   ├── scaleConstants.test.ts       # Scale definitions
│   │   └── octaveCalculation.test.ts    # Octave logic
│   ├── components/
│   │   ├── guitar/
│   │   │   ├── GuitarNeck.test.tsx      # Guitar rendering
│   │   │   ├── Configuration.test.tsx    # Configuration panel
│   │   │   └── CustomTuningEditor.test.tsx  # Already exists
│   │   ├── piano/
│   │   │   └── PianoKeyboard.test.tsx   # Piano visualization
│   │   └── shared/
│   │       ├── Header.test.tsx          # Navigation
│   │       └── Footer.test.tsx          # Footer
│   └── hooks/
│       └── useLocalStorage.test.ts      # Custom hooks
├── integration/
│   ├── features/
│   │   ├── guitar-page.test.tsx         # Full guitar page
│   │   ├── piano-page.test.tsx          # Full piano page
│   │   └── navigation.test.tsx          # Page navigation
│   ├── state/
│   │   ├── redux-store.test.ts          # Store integration
│   │   ├── persistence.test.ts          # localStorage integration
│   │   └── context-providers.test.tsx   # Context integration
│   └── audio/
│       └── audio-playback.test.ts       # Audio system
└── e2e/
    ├── critical-paths/
    │   ├── guitar-tuning-workflow.test.ts
    │   ├── scale-visualization.test.ts
    │   └── cross-instrument.test.ts
    └── accessibility/
        └── keyboard-navigation.test.ts
```

## Specific Testing Approaches

### Unit Tests (70% of effort)

#### Scale Utilities Testing
```typescript
// Example test cases for scaleUtils.ts
describe('scaleUtils', () => {
  describe('getScaleNotes', () => {
    it('should calculate C major scale correctly', () => {
      expect(getScaleNotes('C', 'major')).toEqual([
        { note: 'C', degree: 1, interval: 0 },
        { note: 'D', degree: 2, interval: 2 },
        // ... etc
      ])
    })
    
    it('should handle flat preferences', () => {
      expect(getScaleNotes('F', 'major', true)[6].note).toBe('E')
    })
    
    it('should throw error for invalid scale', () => {
      expect(() => getScaleNotes('C', 'invalid')).toThrow()
    })
  })
  
  describe('transposeNote', () => {
    it('should transpose notes correctly', () => {
      expect(transposeNote('C', 2)).toBe('D')
      expect(transposeNote('B', 2)).toBe('C#')
    })
    
    it('should handle negative transposition', () => {
      expect(transposeNote('C', -1)).toBe('B')
    })
  })
})
```

#### Guitar Component Testing
```typescript
// Focus on SVG rendering and calculations
describe('GuitarNeck', () => {
  it('should render correct number of strings', () => {
    render(<GuitarNeck stringCount={6} />)
    expect(screen.getAllByTestId('guitar-string')).toHaveLength(6)
  })
  
  it('should calculate fret positions correctly', () => {
    const positions = getFretPositions(25.5, 24)
    expect(positions).toHaveLength(24)
    expect(positions[11]).toBeCloseTo(12.75) // 12th fret at half scale length
  })
  
  it('should handle string count changes', () => {
    const { rerender } = render(<GuitarNeck stringCount={6} />)
    expect(screen.getAllByTestId('guitar-string')).toHaveLength(6)
    
    rerender(<GuitarNeck stringCount={7} />)
    expect(screen.getAllByTestId('guitar-string')).toHaveLength(7)
  })
})
```

#### Note Utility Testing
```typescript
describe('note utilities', () => {
  describe('noteToFrequency', () => {
    it('should calculate A4 frequency correctly', () => {
      expect(noteToFrequency('A', 4)).toBeCloseTo(440, 1)
    })
    
    it('should calculate octave relationships', () => {
      expect(noteToFrequency('A', 5)).toBeCloseTo(880, 1)
      expect(noteToFrequency('A', 3)).toBeCloseTo(220, 1)
    })
  })
  
  describe('enharmonic equivalents', () => {
    it('should identify enharmonic equivalents', () => {
      expect(areEnharmonicallyEquivalent('C#', 'Db')).toBe(true)
      expect(areEnharmonicallyEquivalent('F#', 'Gb')).toBe(true)
      expect(areEnharmonicallyEquivalent('C', 'D')).toBe(false)
    })
  })
})
```

### Integration Tests (20% of effort)

#### Context Provider Testing
```typescript
describe('DataProvider Integration', () => {
  it('should persist tuning changes to localStorage', async () => {
    const { result } = renderHook(() => useContext(DataContext), {
      wrapper: DataProvider
    })
    
    act(() => {
      result.current.setCurrentTuning({
        name: 'Test Tuning',
        notes: ['D', 'A', 'D', 'G', 'A', 'D']
      })
    })
    
    expect(localStorage.getItem('currentTuning')).toContain('Test Tuning')
  })
})
```

#### Redux Store Integration
```typescript
describe('Store Integration', () => {
  it('should persist global config changes', () => {
    const store = configureStore({
      reducer: { globalConfig: globalConfigReducer },
      middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(persistentStateMiddleware)
    })
    
    store.dispatch(toggleDarkMode())
    
    expect(localStorage.getItem('globalConfig')).toContain('darkMode')
  })
})
```

### E2E Tests (10% of effort)

#### Critical User Journeys
- Load guitar page → Change tuning → Verify fretboard updates
- Switch between instruments → Verify state persistence  
- Change scale → Play notes → Verify audio
- Create custom tuning → Save → Reload page → Verify persistence

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
**Goals:** Establish robust testing foundation for core business logic

**Tasks:**
1. **Set up comprehensive test utilities**
   - Enhance `test-utils.tsx` with guitar context providers
   - Add custom render helpers for different contexts
   - Set up mock utilities for localStorage and audio

2. **Implement music theory utility tests**
   - `src/__tests__/unit/utils/scaleUtils.test.ts`
   - `src/__tests__/unit/utils/note.test.ts`
   - `src/__tests__/unit/utils/scaleConstants.test.ts`

3. **Add core guitar calculation tests**
   - `src/__tests__/unit/utils/octaveCalculation.test.ts`
   - Tests for `getFretPositions` and `getAdjustedTuning`

**Success Criteria:**
- 90%+ coverage of music utility functions
- All scale calculations tested with edge cases
- Frequency calculations verified against known values

### Phase 2: Components (Week 3-4)
**Goals:** Test component rendering and user interactions

**Tasks:**
1. **Guitar component integration tests**
   - `src/__tests__/unit/components/guitar/GuitarNeck.test.tsx`
   - `src/__tests__/unit/components/guitar/Configuration.test.tsx`
   - SVG rendering validation
   - User interaction testing

2. **Configuration and tuning editor tests**
   - Expand existing `CustomTuningEditor.test.tsx`
   - Add comprehensive tuning selection tests
   - Test string count and fret count changes

3. **State management tests**
   - `src/__tests__/unit/hooks/useLocalStorage.test.ts`
   - Redux slice unit tests
   - Context provider tests

**Success Criteria:**
- 80%+ coverage of guitar components
- All user interactions tested
- State updates properly validated

### Phase 3: Integration (Week 5)
**Goals:** Test feature workflows and cross-component interactions

**Tasks:**
1. **Full page integration tests**
   - `src/__tests__/integration/features/guitar-page.test.tsx`
   - End-to-end guitar page functionality
   - Context and Redux integration

2. **Cross-component interaction tests**
   - Configuration changes affecting guitar neck
   - Tuning changes updating fretboard
   - Base tuning transposition workflows

3. **Persistence and localStorage tests**
   - `src/__tests__/integration/state/persistence.test.ts`
   - Custom tuning save/load cycles
   - Global config persistence

**Success Criteria:**
- 70%+ coverage of integration flows
- All major user workflows tested
- Persistence mechanisms validated

### Phase 4: Expansion (Week 6-7)
**Goals:** Extend testing to other instruments and advanced features

**Tasks:**
1. **Other instrument tests**
   - `src/__tests__/unit/components/piano/PianoKeyboard.test.tsx`
   - Basic Kalimba and Harmonica component tests
   - Instrument-specific state management

2. **Audio system tests** (if implemented)
   - `src/__tests__/integration/audio/audio-playback.test.ts`
   - Web Audio API mock testing
   - Note playback functionality

3. **Error handling and edge cases**
   - Invalid input handling
   - Network failure scenarios
   - Browser compatibility edge cases

**Success Criteria:**
- Basic coverage of all instrument types
- Audio system (if present) fully tested
- Robust error handling validated

### Phase 5: Quality (Week 8)
**Goals:** E2E testing and quality assurance

**Tasks:**
1. **E2E critical path tests**
   - `src/__tests__/e2e/critical-paths/guitar-tuning-workflow.test.ts`
   - `src/__tests__/e2e/critical-paths/scale-visualization.test.ts`
   - Full user journey validation

2. **Performance and accessibility tests**
   - `src/__tests__/e2e/accessibility/keyboard-navigation.test.ts`
   - Rendering performance benchmarks
   - Screen reader compatibility

3. **Cross-browser compatibility tests**
   - Mobile responsiveness validation
   - Browser-specific audio API testing
   - Progressive enhancement verification

**Success Criteria:**
- 100% critical path coverage
- Accessibility compliance verified
- Performance benchmarks established

## Quality Metrics & Goals

### Coverage Targets
- **Unit Tests:** 90%+ for utilities, 80%+ for components
- **Integration Tests:** 70%+ for feature flows  
- **E2E Tests:** 100% for critical paths

### Quality Benchmarks
- **Test execution time:** <30 seconds for full suite
- **Zero flaky tests:** All tests must be deterministic
- **100% TypeScript strict mode compliance**
- **Accessibility compliance testing**

### Continuous Integration Requirements
- All tests must pass before merge
- Coverage reports generated on each PR
- Performance regression detection
- Cross-browser test execution

## Tool Configuration

### Jest Configuration Enhancements
```javascript
// jest.config.js additions
const customJestConfig = {
  // ... existing config
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/globals.css',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    'src/lib/utils/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testTimeout: 10000,
}
```

### Additional Testing Dependencies
```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.0.1", 
    "@testing-library/user-event": "^14.5.2",
    "@testing-library/react-hooks": "^8.0.1",
    "jest-canvas-mock": "^2.5.2",
    "jest-environment-jsdom": "^29.7.0"
  }
}
```

## Immediate Next Steps

1. **Create `src/__tests__/unit/utils/scaleUtils.test.ts`**
2. **Create `src/__tests__/unit/utils/note.test.ts`**  
3. **Enhance test-utils.tsx with guitar context providers**
4. **Set up coverage reporting and CI integration**
5. **Begin Phase 1 implementation**

## Risk Mitigation

### Technical Risks
- **SVG testing complexity:** Use custom matchers and snapshot testing
- **Audio API mocking:** Create comprehensive Web Audio API mocks
- **localStorage testing:** Use jest-localstorage-mock for consistent behavior

### Process Risks  
- **Test maintenance overhead:** Prioritize maintainable test patterns
- **False positive/negative tests:** Implement strict test review process
- **Performance impact:** Monitor test execution time and optimize accordingly

This comprehensive testing strategy will transform ScalesViewer from a minimally tested application to a robust, well-tested musical instrument visualization platform with confidence in its core functionality and user experience.