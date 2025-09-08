# Unit Test Completion Plan for ScalesViewer

## Current Status
- **Overall Coverage**: 21.56% (66 tests passing)
- **Target Coverage**: 70%+
- **Framework**: Vitest with React Testing Library
- **Priority**: High-impact, business-critical components first

## Coverage Gap Analysis

### 🔴 Critical Gaps (0% Coverage)
1. **Audio Utilities** (`lib/utils/audioUtils.ts`) - Core audio functionality
2. **Note Utilities** (`lib/utils/note.ts`) - Music theory fundamentals  
3. **Instrument Utilities** (`lib/utils/instrument.ts`) - Instrument definitions
4. **Guitar Components** - Most guitar UI components completely untested
5. **Redux Store** - State management completely untested
6. **React Components** - Header, Footer, Details components untested

### 🟡 Moderate Gaps (Partial Coverage)
1. **Guitar Configuration** (26% coverage) - Partially tested
2. **Scale Utilities** (94% coverage) - Nearly complete, minor gaps
3. **Global Config** (51% coverage) - Settings and preferences

## Implementation Strategy

### Phase 1: Core Utilities (Week 1)
**Priority**: Critical business logic
**Target**: 50%+ coverage for utility functions
**Estimated Tests**: 40-50 new tests

#### 1.1 Audio Utilities (`lib/utils/audioUtils.ts`)
```typescript
// Test Coverage Areas:
- AudioContext creation and management
- Note frequency calculations
- Audio playback functions
- Error handling for audio failures
- Browser compatibility checks
```

#### 1.2 Note Utilities (`lib/utils/note.ts`) 
```typescript
// Test Coverage Areas:
- Note name parsing and validation
- Enharmonic equivalent calculations
- Frequency calculations for all notes
- Octave calculations
- Scientific pitch notation
- MIDI note number conversions
```

#### 1.3 Instrument Utilities (`lib/utils/instrument.ts`)
```typescript
// Test Coverage Areas:
- Instrument type definitions
- Default tuning validations
- String count validations
- Instrument-specific configurations
```

### Phase 2: Redux State Management (Week 2)
**Priority**: Application state integrity
**Target**: 80%+ coverage for Redux logic
**Estimated Tests**: 25-30 new tests

#### 2.1 Global Config Slice (`app/features/globalConfig/globalConfigSlice.ts`)
```typescript
// Test Coverage Areas:
- Dark mode toggling
- Instrument selection
- Scale settings
- Display preferences
- LocalStorage integration
- State persistence
```

#### 2.2 Application Slice (`app/features/application/applicationSlice.ts`)
```typescript
// Test Coverage Areas:
- Application initialization
- Loading states
- Error handling
- Middleware functionality
```

### Phase 3: React Components (Week 3)
**Priority**: UI functionality and user interactions
**Target**: 70%+ coverage for components
**Estimated Tests**: 35-40 new tests

#### 3.1 Core Components
- **Header Component**: Navigation, theme switching, responsive behavior
- **Footer Component**: Links, responsive design, accessibility
- **Details Component**: Information display, collapsible sections

#### 3.2 Guitar Components
- **GuitarNeck Component**: SVG rendering, note highlighting, interactivity
- **FretMarkers Component**: Position markers, responsive sizing
- **StringGroup Component**: String layout, note positioning
- **NotesDisplay Component**: Note rendering, click handling
- **Configuration Component**: Settings UI, form validation

### Phase 4: Hooks and Context (Week 4)
**Priority**: React hooks and state management
**Target**: 80%+ coverage for custom hooks
**Estimated Tests**: 20-25 new tests

#### 4.1 Guitar Context (`app/guitar/context.tsx`)
```typescript
// Test Coverage Areas:
- State management for guitar settings
- Tuning updates and validation
- Fret count management
- LocalStorage synchronization
- Context provider functionality
```

#### 4.2 Local Storage Hook (`app/guitar/hooks/useLocalStorage.ts`)
```typescript
// Test Coverage Areas:
- LocalStorage read/write operations
- JSON serialization/deserialization
- Error handling for storage failures
- Fallback behavior
- Cleanup on unmount
```

### Phase 5: Integration and Edge Cases (Week 5)
**Priority**: Real-world scenarios and edge cases
**Target**: Comprehensive edge case coverage
**Estimated Tests**: 15-20 new tests

#### 5.1 Error Handling
- Network failure scenarios
- Invalid user input handling
- Audio API failures
- LocalStorage quota exceeded
- Browser compatibility issues

#### 5.2 Performance Testing
- Large scale data handling
- Memory leak prevention
- Re-render optimization
- Debouncing and throttling

## Test Organization

### File Structure
```
src/__tests__/
├── unit/
│   ├── utils/
│   │   ├── audioUtils.test.ts          ✅ NEW
│   │   ├── note.test.ts                ✅ NEW  
│   │   ├── instrument.test.ts          ✅ NEW
│   │   └── scaleUtils.test.ts          ✅ EXISTING
│   ├── redux/
│   │   ├── globalConfigSlice.test.ts   ✅ NEW
│   │   └── applicationSlice.test.ts    ✅ NEW
│   ├── components/
│   │   ├── Header.test.tsx             ✅ NEW
│   │   ├── Footer.test.tsx             ✅ NEW
│   │   ├── Details.test.tsx            ✅ NEW
│   │   └── guitar/
│   │       ├── GuitarNeck.test.tsx     ✅ NEW
│   │       ├── Configuration.test.tsx  ✅ NEW
│   │       └── [other components]      ✅ NEW
│   └── hooks/
│       ├── useLocalStorage.test.ts     ✅ NEW
│       └── useGuitarContext.test.ts    ✅ NEW
├── integration/
│   ├── guitar-integration.test.ts      ✅ NEW
│   └── piano-integration.test.ts       ✅ NEW
└── e2e/                                ✅ EXISTING (SerenityJS)
```

### Testing Standards

#### 1. Test Naming Conventions
```typescript
// Function tests
describe('scaleUtils', () => {
  describe('getScaleNotes', () => {
    it('should return correct notes for C Major scale', () => {
      // Implementation
    });
    
    it('should handle invalid scale names gracefully', () => {
      // Implementation
    });
  });
});

// Component tests
describe('GuitarNeck Component', () => {
  it('should render the correct number of strings', () => {
    // Implementation
  });
  
  it('should highlight scale notes when scale is selected', () => {
    // Implementation
  });
});
```

#### 2. Test Data Management
```typescript
// Use consistent test data
const TEST_SCALES = {
  major: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  minor: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
  pentatonic: ['C', 'D', 'E', 'G', 'A']
};

const TEST_NOTES = {
  natural: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  sharp: ['C#', 'D#', 'F#', 'G#', 'A#'],
  flat: ['Db', 'Eb', 'Gb', 'Ab', 'Bb']
};
```

#### 3. Mock Strategies
```typescript
// Audio context mocking
vi.mock('../lib/utils/audioUtils', () => ({
  playNote: vi.fn(),
  createAudioContext: vi.fn(() => ({
    state: 'running',
    createOscillator: vi.fn(),
    createGain: vi.fn()
  }))
}));

// LocalStorage mocking
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
};
global.localStorage = localStorageMock;
```

## Implementation Timeline

### Week 1: Core Utilities
- [ ] Audio utilities tests (8-10 tests)
- [ ] Note utilities tests (12-15 tests)  
- [ ] Instrument utilities tests (6-8 tests)
- [ ] Scale utilities completion (5-8 tests)
- **Target**: 40-50 new tests, 35%+ overall coverage

### Week 2: Redux State
- [ ] Global config slice tests (10-12 tests)
- [ ] Application slice tests (8-10 tests)
- [ ] Store integration tests (5-8 tests)
- **Target**: 25-30 new tests, 45%+ overall coverage

### Week 3: React Components
- [ ] Core components (Header, Footer, Details) (12-15 tests)
- [ ] Guitar components (20-25 tests)
- [ ] Component integration tests (5-8 tests)
- **Target**: 35-40 new tests, 60%+ overall coverage

### Week 4: Hooks and Context
- [ ] Custom hooks tests (10-12 tests)
- [ ] Context providers tests (8-10 tests)
- [ ] Hook integration tests (5-8 tests)
- **Target**: 20-25 new tests, 70%+ overall coverage

### Week 5: Edge Cases and Optimization
- [ ] Error handling tests (8-10 tests)
- [ ] Performance tests (5-8 tests)
- [ ] Browser compatibility tests (5-8 tests)
- [ ] Test optimization and cleanup
- **Target**: 15-20 new tests, 70%+ overall coverage

## Success Metrics

### Coverage Targets
- **Overall Coverage**: 70%+ (from current 21.56%)
- **Utility Functions**: 90%+ 
- **React Components**: 80%+
- **Redux State**: 85%+
- **Custom Hooks**: 85%+

### Quality Metrics
- **Test Reliability**: >99% pass rate
- **Test Performance**: <5 minutes for full suite
- **Mock Coverage**: Comprehensive external dependency mocking
- **Edge Case Coverage**: All critical error paths tested

## Risk Mitigation

### Technical Risks
1. **Complex Audio Testing**: Use comprehensive mocking for Web Audio API
2. **SVG Component Testing**: Focus on prop validation and event handling
3. **LocalStorage Testing**: Mock storage APIs to avoid test isolation issues
4. **Performance Testing**: Use appropriate timeouts and async handling

### Timeline Risks
1. **Component Complexity**: Start with simpler components, build up complexity
2. **Integration Challenges**: Test individual units before integration
3. **Mock Complexity**: Create reusable mock utilities early
4. **Review Bottlenecks**: Implement tests incrementally with regular reviews

## Next Steps

1. **Start with Phase 1** - Core utilities (highest impact, lowest complexity)
2. **Implement incrementally** - Review and adjust approach based on early results  
3. **Monitor coverage** - Track progress weekly against targets
4. **Refactor as needed** - Improve test organization and reusability
5. **Document patterns** - Create testing guidelines for future development

This plan will transform the testing infrastructure from 21.56% to 70%+ coverage while maintaining high code quality and test reliability. The focus on critical business logic first ensures maximum impact on application stability and developer confidence."}