# Jean-Yves Expert User Persona

## Overview
Jean-Yves is an expert musician and power user of the ScalesViewer application. He has deep knowledge of music theory, extensive experience with multiple instruments, and demands high performance and precision from the application.

## Characteristics

### Musical Expertise
- **Advanced Music Theory**: Understands complex scales, modes, and harmonic relationships
- **Multi-Instrument Proficiency**: Expert in guitar, piano, and other string instruments
- **Tuning Systems**: Knowledgeable about various tuning systems (equal temperament, just intonation, alternate tunings)
- **Performance Requirements**: Needs precise note frequencies and accurate visualizations

### Technical Expectations
- **Performance**: Expects instant response times and smooth interactions
- **Precision**: Requires exact note calculations and perfect visual representations
- **Advanced Features**: Uses complex features like custom tunings, base tuning transposition, and multi-scale instruments
- **Workflow Efficiency**: Performs multiple operations quickly and efficiently

### Usage Patterns
- **Complex Scale Exploration**: Tests exotic scales and modes
- **Custom Tuning Creation**: Creates and manages multiple custom tunings
- **Cross-Instrument Comparison**: Compares scales across different instruments
- **Performance Testing**: Tests application under various conditions

## Screenplay Implementation

### Actor Definition
```typescript
// src/e2e/screenplay/actors/JeanYves.ts
import { Actor } from '@serenity-js/core';

export class JeanYves extends Actor {
  static called(name: string): JeanYves {
    return new JeanYves(name);
  }
  
  // Expert-level abilities
  canUseAdvancedMusicTheory(): boolean {
    return true;
  }
  
  canNavigateEfficiently(): boolean {
    return true;
  }
  
  canPerformComplexOperations(): boolean {
    return true;
  }
}
```

### Expert-Specific Tasks

#### Musical Tasks
- `ExploreExoticScale`: Tests complex scales like Hungarian minor, Neapolitan scales
- `CreateCustomTuning`: Creates multi-string custom tunings with specific intervals
- `VerifyHarmonicAccuracy`: Checks note frequencies and harmonic relationships
- `TestCrossInstrumentConsistency`: Validates scale representations across instruments

#### Performance Tasks
- `StressTestApplication`: Performs rapid scale changes and navigation
- `TestLargeDatasetHandling`: Tests with many custom tunings and scales
- `VerifyResponsiveBehavior`: Tests on different screen sizes and orientations
- `TestAudioPerformance`: Validates audio playback quality and timing

#### Advanced Configuration Tasks
- `ConfigureAdvancedSettings`: Sets up complex display preferences
- `TestBaseTuningTransposition`: Verifies transposition accuracy
- `ValidateMultiscaleCalculations`: Tests multiscale fretboard positioning
- `TestPersistenceMechanisms`: Validates data saving and loading

### Example Usage in Tests
```typescript
// Example test using Jean-Yves persona
import { describe, it } from 'vitest';
import { actorCalled } from '@serenity-js/core';
import { JeanYves } from '../screenplay/actors/JeanYves';
import { NavigateToGuitarPage, CreateCustomTuning, VerifyTuningAccuracy } from '../screenplay/tasks';

describe('Expert Guitar Features', () => {
  it('should allow Jean-Yves to create complex custom tunings', async () => {
    await actorCalled('Jean-Yves')
      .whoCan(
        NavigateToGuitarPage,
        CreateCustomTuning,
        VerifyTuningAccuracy
      )
      .attemptsTo(
        NavigateToGuitarPage.forExpertUser(),
        CreateCustomTuning.withComplexIntervals(),
        VerifyTuningAccuracy.acrossAllFrets()
      );
  });
});
```

### Expert Scenarios

#### Scenario 1: Complex Scale Exploration
```gherkin
Feature: Expert Scale Exploration
  As Jean-Yves, an expert musician
  I want to explore exotic scales across multiple instruments
  So that I can analyze their harmonic properties

  Scenario: Hungarian Minor Scale Analysis
    Given Jean-Yves is on the piano page
    When he selects the Hungarian Minor scale
    And transposes it to multiple keys
    Then he should see accurate note visualizations
    And hear correct audio playback for each key
```

#### Scenario 2: Advanced Tuning Validation
```gherkin
Feature: Expert Tuning System Validation
  As Jean-Yves, I need precise tuning control
  I want to create and test custom tuning systems
  So that I can achieve perfect intonation

  Scenario: Multiscale Guitar Configuration
    Given Jean-Yves is configuring a multiscale guitar
    When he sets custom scale lengths for each string
    And applies a complex tuning system
    Then the fret positions should be calculated accurately
    And the note frequencies should be harmonically correct
```

## Implementation Guidelines

### When to Use Jean-Yves Persona
- **Complex Feature Testing**: Use for features requiring expert knowledge
- **Performance Testing**: Ideal for stress testing and performance validation
- **Edge Case Testing**: Perfect for testing boundary conditions and rare scenarios
- **Cross-Instrument Testing**: Use when testing consistency across instruments

### Jean-Yves vs Regular User
- **Regular User**: Basic functionality, common scales, standard tunings
- **Jean-Yves**: Advanced features, exotic scales, custom tunings, performance optimization

### Benefits of Expert Persona
1. **Realistic Testing**: Tests reflect actual expert user behavior
2. **Edge Case Discovery**: Finds issues that regular users might miss
3. **Performance Validation**: Ensures application meets expert performance expectations
4. **Feature Completeness**: Validates advanced features work correctly
5. **Documentation**: Provides clear examples of expert-level usage

## Success Metrics
- All expert scenarios pass consistently
- Performance benchmarks are met or exceeded
- Complex operations complete without errors
- Cross-instrument consistency is maintained
- Advanced features work as expected under stress conditions