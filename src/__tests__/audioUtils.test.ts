import { calculateFrequency } from '../lib/utils/audioUtils';

describe('calculateFrequency', () => {
  it('should calculate correct frequencies for natural notes', () => {
    // Test C4 (261.63 Hz)
    expect(calculateFrequency('C4')).toBeCloseTo(261.63, 2);

    // Test A4 (440 Hz)
    expect(calculateFrequency('A4')).toBeCloseTo(440.0, 2);

    // Test G4 (392.0 Hz)
    expect(calculateFrequency('G4')).toBeCloseTo(392.0, 2);
  });

  it('should calculate correct frequencies for sharp notes', () => {
    // Test C#4 (277.18 Hz)
    expect(calculateFrequency('C#4')).toBeCloseTo(277.18, 2);

    // Test F#4 (369.99 Hz)
    expect(calculateFrequency('F#4')).toBeCloseTo(369.99, 2);
  });

  it('should correctly convert enharmonic equivalents', () => {
    // Test that Bb converts to A#
    expect(calculateFrequency('Bb4')).toBeCloseTo(466.16, 2);

    // Test that Db converts to C#
    expect(calculateFrequency('Db4')).toBeCloseTo(277.18, 2);

    // Test that Eb converts to D#
    expect(calculateFrequency('Eb4')).toBeCloseTo(311.13, 2);

    // Test that Gb converts to F#
    expect(calculateFrequency('Gb4')).toBeCloseTo(369.99, 2);

    // Test that Ab converts to G#
    expect(calculateFrequency('Ab4')).toBeCloseTo(415.3, 2);
  });

  it('should handle different octaves correctly', () => {
    // Test octave changes
    expect(calculateFrequency('C5')).toBeCloseTo(523.25, 2); // C5 = C4 * 2
    expect(calculateFrequency('C3')).toBeCloseTo(130.81, 2); // C3 = C4 / 2

    // Test A in different octaves
    expect(calculateFrequency('A3')).toBeCloseTo(220.0, 2); // A3
    expect(calculateFrequency('A5')).toBeCloseTo(880.0, 2); // A5
  });

  it('should handle enharmonic notes in different octaves', () => {
    // Test Bb in different octaves
    expect(calculateFrequency('Bb3')).toBeCloseTo(233.08, 2);
    expect(calculateFrequency('Bb5')).toBeCloseTo(932.33, 2);

    // Test Db in different octaves
    expect(calculateFrequency('Db3')).toBeCloseTo(138.59, 2);
    expect(calculateFrequency('Db5')).toBeCloseTo(554.37, 2);
  });

  it('should return default frequency for unknown notes', () => {
    // Test with an invalid note
    const result = calculateFrequency('X4' as any);
    expect(result).toBe(440); // Default to A4
  });
});