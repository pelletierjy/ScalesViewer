# ScalesViewer Testing Migration Plan

## Overview
This plan outlines the migration from Jest to Vitest and the implementation of the Screenplay pattern using SerenityJS with a "Jean-Yves" expert user persona.

## Migration Phases

### Phase 1: Jest to Vitest Migration (2-3 days) ✅ COMPLETED
**Objective**: Replace Jest with Vitest while maintaining all existing functionality

#### 1.1 Dependencies & Configuration ✅
- [x] Remove Jest packages (jest, jest-environment-jsdom, babel-jest, @types/jest)
- [x] Install Vitest packages (vitest, @vitest/ui, @vitest/coverage-v8, jsdom, @testing-library/react-vitest)
- [x] Create `vitest.config.ts` replacing `jest.config.js`
- [x] Update Next.js integration for Vitest compatibility
- [x] Update package.json test scripts

#### 1.2 Test File Migration ✅
- [x] Convert all test files to use Vitest imports
- [x] Replace `jest.fn()` with `vi.fn()`
- [x] Update `jest.setup.js` to `vitest.setup.ts`
- [x] Migrate mocks and test utilities
- [x] Update coverage configuration

#### 1.3 Validation ✅
- [x] Run all existing tests with Vitest (66 tests passed)
- [x] Coverage improved from 18.2% to 21.56%
- [x] Watch mode functionality verified
- [x] CI/CD compatibility maintained

### Phase 2: SerenityJS & Screenplay Pattern Implementation (3-4 days) 🔄 IN PROGRESS
**Objective**: Set up SerenityJS framework and implement Screenplay pattern

#### 2.1 SerenityJS Setup ✅ COMPLETED
- [x] Install SerenityJS packages:
  - `@serenity-js/core`
  - `@serenity-js/playwright`
  - `@serenity-js/serenity-bdd`
  - `@serenity-js/assertions`
- [x] Create SerenityJS configuration (`serenity.config.ts`)
- [x] Set up Serenity BDD reporting
- [x] Configure Playwright integration with SerenityJS

#### 2.2 Screenplay Pattern Architecture ✅ COMPLETED
- [x] Create `src/e2e/screenplay` directory structure:
  - `actors/` - Define actor capabilities
  - `abilities/` - System interactions
  - `tasks/` - High-level user goals
  - `interactions/` - Low-level interactions
  - `questions/` - Assertions and queries
  - `page-elements/` - Page object definitions

#### 2.3 Jean-Yves Expert Persona Definition ✅ COMPLETED
- [x] Create `JeanYves.ts` actor with expert capabilities:
  - Advanced musical knowledge
  - Efficient navigation patterns
  - Complex scale and tuning operations
  - Performance testing capabilities
- [x] Define expert-specific tasks and interactions
- [x] Create expert-level test scenarios

### Phase 3: Playwright to Screenplay Conversion (4-5 days) 🔄 IN PROGRESS
**Objective**: Convert existing Playwright tests to Screenplay pattern

#### 3.1 Convert Piano Tests ✅ COMPLETED
- [x] Analyze existing `e2e/piano/piano-basic.spec.ts`
- [x] Convert to Screenplay pattern using Jean-Yves persona
- [x] Implement piano-specific tasks:
  - `NavigateToPianoPage`
  - `SelectScale`
  - `VerifyKeyboardVisualization`
  - `TestNotePlayback`
  - `ChangePianoConfiguration`
- [x] Create `piano-basic-functionality.spec.ts` with Screenplay pattern
- [x] Implement piano-specific questions for assertions

#### 3.2 Convert Guitar Tests 🔄 IN PROGRESS
- [ ] Analyze existing guitar test patterns
- [ ] Convert to Screenplay pattern
- [ ] Implement guitar-specific tasks:
  - `NavigateToGuitarPage`
  - `SelectTuning`
  - `VerifyFretboardVisualization`
  - `TestCustomTuning`
  - `TestBaseTuningTransposition`

#### 3.3 Advanced Expert Scenarios 🔄 PENDING
- [ ] Create complex multi-instrument workflows
- [ ] Performance and load testing scenarios
- [ ] Cross-instrument consistency tests
- [ ] Advanced configuration scenarios

### Phase 4: BDD Integration & Feature Files (2-3 days)
**Objective**: Integrate Cucumber features with Screenplay pattern

#### 4.1 Convert Cucumber Step Definitions
- [ ] Update existing Cucumber features to use Screenplay pattern
- [ ] Implement step definitions using SerenityJS
- [ ] Create Jean-Yves specific BDD scenarios

#### 4.2 Enhanced Feature Files
- [ ] Create expert-level feature files:
  - `expert-piano-complex-scales.feature`
  - `expert-guitar-custom-tunings.feature`
  - `expert-multi-instrument-workflows.feature`
  - `expert-performance-testing.feature`

### Phase 5: Documentation & Training (1-2 days)
**Objective**: Document the new testing approach and train team

#### 5.1 Documentation
- [ ] Create Screenplay pattern guide
- [ ] Document Jean-Yves persona capabilities
- [ ] Write testing best practices guide
- [ ] Create troubleshooting documentation

#### 5.2 Team Training
- [ ] Conduct knowledge transfer sessions
- [ ] Create example tests for reference
- [ ] Update development guidelines

## Implementation Timeline

**Total Estimated Time: 12-17 days**

- Phase 1: 2-3 days
- Phase 2: 3-4 days  
- Phase 3: 4-5 days
- Phase 4: 2-3 days
- Phase 5: 1-2 days

## Success Criteria

1. **All existing tests pass** with Vitest
2. **Coverage maintained or improved** after migration
3. **SerenityJS reporting** provides clear test insights
4. **Jean-Yves persona** successfully implemented with expert capabilities
5. **Screenplay pattern** makes tests more maintainable and readable
6. **Performance improvement** in test execution speed
7. **Team adoption** of new testing patterns

## Risk Mitigation

- **Parallel Development**: Keep existing tests running while building new framework
- **Incremental Migration**: Convert tests gradually, not all at once
- **Backup Strategy**: Maintain Jest setup until migration is complete
- **Team Communication**: Regular updates and knowledge sharing

## Next Steps

1. Approve this migration plan
2. Set up development environment for Phase 1
3. Create feature branch for migration work
4. Begin with Vitest migration (Phase 1)
5. Implement SerenityJS setup (Phase 2)
6. Convert tests incrementally (Phases 3-4)