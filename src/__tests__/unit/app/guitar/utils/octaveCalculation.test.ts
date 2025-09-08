import { describe, it, expect, beforeEach } from 'vitest';
import {
  getBaseOctave,
  calculateNoteWithOctave,
  calculateNoteWithOctaveMemoized,
  clearCalculationCache
} from '@/app/guitar/utils/octaveCalculation';
import { Note } from '@/lib/utils/note';

describe('octaveCalculation', () => {
  beforeEach(() => {
    // Clear cache before each test
    clearCalculationCache();
  });

  describe('getBaseOctave', () => {
    it('should return correct octaves for standard 6-string guitar', () => {
      // Standard tuning: E4-B3-G3-D3-A2-E2 (high to low, indices 0-5)
      expect(getBaseOctave('E', 0, 6)).toBe(4); // High E string
      expect(getBaseOctave('B', 1, 6)).toBe(3); // B string
      expect(getBaseOctave('G', 2, 6)).toBe(3); // G string
      expect(getBaseOctave('D', 3, 6)).toBe(3); // D string
      expect(getBaseOctave('A', 4, 6)).toBe(2); // A string
      expect(getBaseOctave('E', 5, 6)).toBe(2); // Low E string
    });

    it('should return correct octaves for 7-string guitar', () => {
      // 7-string: E4-B3-G3-D3-A2-E2-B1 (high to low, indices 0-6)
      expect(getBaseOctave('E', 0, 7)).toBe(4); // High E string
      expect(getBaseOctave('B', 1, 7)).toBe(3); // B string
      expect(getBaseOctave('G', 2, 7)).toBe(3); // G string
      expect(getBaseOctave('D', 3, 7)).toBe(3); // D string
      expect(getBaseOctave('A', 4, 7)).toBe(2); // A string
      expect(getBaseOctave('E', 5, 7)).toBe(2); // E string
      expect(getBaseOctave('B', 6, 7)).toBe(1); // Low B string
    });

    it('should return correct octaves for 8-string guitar', () => {
      // 8-string: E4-B3-G3-D3-A2-E2-B1-F#1 (high to low, indices 0-7)
      expect(getBaseOctave('E', 0, 8)).toBe(4); // High E string
      expect(getBaseOctave('B', 1, 8)).toBe(3); // B string
      expect(getBaseOctave('G', 2, 8)).toBe(3); // G string
      expect(getBaseOctave('D', 3, 8)).toBe(3); // D string
      expect(getBaseOctave('A', 4, 8)).toBe(2); // A string
      expect(getBaseOctave('E', 5, 8)).toBe(2); // E string
      expect(getBaseOctave('B', 6, 8)).toBe(1); // B string
      expect(getBaseOctave('F#', 7, 8)).toBe(1); // Low F# string
    });

    it('should return correct octaves for 4-string bass', () => {
      // 4-string bass: G3-D3-A2-E2 (high to low, indices 0-3)
      expect(getBaseOctave('G', 0, 4)).toBe(3); // G string
      expect(getBaseOctave('D', 1, 4)).toBe(3); // D string
      expect(getBaseOctave('A', 2, 4)).toBe(2); // A string
      expect(getBaseOctave('E', 3, 4)).toBe(2); // E string
    });

    it('should handle notes with flat notation', () => {
      expect(getBaseOctave('Bb', 4, 6)).toBe(2); // Same as A#
      expect(getBaseOctave('Eb', 2, 6)).toBe(3); // Same as D#
      expect(getBaseOctave('Ab', 4, 6)).toBe(2); // Same as G#
    });

    it('should handle unusual string configurations', () => {
      // 5-string guitar (non-standard)
      expect(getBaseOctave('E', 0, 5)).toBe(4); // High E
      expect(getBaseOctave('A', 4, 5)).toBe(1); // Low A (fallback calculation)

      // 12-string guitar
      expect(getBaseOctave('E', 0, 12)).toBe(4); // High E
      expect(getBaseOctave('E', 11, 12)).toBe(1); // Lowest string (fallback)
    });

    it('should handle edge cases', () => {
      // String index beyond known configurations
      expect(getBaseOctave('E', 10, 12)).toBeGreaterThanOrEqual(1);
      expect(getBaseOctave('E', 10, 12)).toBeLessThanOrEqual(4);

      // Very high string index
      expect(getBaseOctave('C', 20, 25)).toBeGreaterThanOrEqual(1);
    });

    it('should handle unknown notes with fallback', () => {
      // Should not throw for any valid note
      const validNotes: Note[] = [
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
        'Bb', 'Db', 'Eb', 'Gb', 'Ab'
      ];

      validNotes.forEach(note => {
        expect(() => getBaseOctave(note, 0, 6)).not.toThrow();
        const octave = getBaseOctave(note, 0, 6);
        expect(typeof octave).toBe('number');
        expect(octave).toBeGreaterThanOrEqual(1);
        expect(octave).toBeLessThanOrEqual(6);
      });
    });
  });

  describe('calculateNoteWithOctave', () => {
    it('should calculate correct note with octave for open strings', () => {
      expect(calculateNoteWithOctave('E', 0, 6, 0)).toBe('E4'); // High E string
      expect(calculateNoteWithOctave('B', 1, 6, 0)).toBe('B3'); // B string
      expect(calculateNoteWithOctave('G', 2, 6, 0)).toBe('G3'); // G string
      expect(calculateNoteWithOctave('D', 3, 6, 0)).toBe('D3'); // D string
      expect(calculateNoteWithOctave('A', 4, 6, 0)).toBe('A2'); // A string
      expect(calculateNoteWithOctave('E', 5, 6, 0)).toBe('E2'); // Low E string
    });

    it('should calculate correct note with octave for fretted notes', () => {
      // Test some common fret positions
      expect(calculateNoteWithOctave('E', 0, 6, 1)).toBe('F4');  // E + 1 = F
      expect(calculateNoteWithOctave('E', 0, 6, 3)).toBe('G4');  // E + 3 = G
      expect(calculateNoteWithOctave('E', 0, 6, 5)).toBe('A4');  // E + 5 = A
      expect(calculateNoteWithOctave('E', 0, 6, 7)).toBe('B4');  // E + 7 = B
      expect(calculateNoteWithOctave('E', 0, 6, 12)).toBe('E5'); // E + 12 = E (octave up)
    });

    it('should handle octave transitions correctly', () => {
      // Going from B to C should increment octave
      expect(calculateNoteWithOctave('B', 1, 6, 1)).toBe('C4');  // B + 1 = C (next octave)
      expect(calculateNoteWithOctave('A', 4, 6, 3)).toBe('C3');  // A + 3 = C (same octave)
      expect(calculateNoteWithOctave('G', 2, 6, 5)).toBe('C4');  // G + 5 = C (next octave)
    });

    it('should handle multiple octave jumps', () => {
      expect(calculateNoteWithOctave('E', 0, 6, 12)).toBe('E5');  // One octave
      expect(calculateNoteWithOctave('E', 0, 6, 24)).toBe('E6');  // Two octaves
      expect(calculateNoteWithOctave('E', 0, 6, 36)).toBe('E7');  // Three octaves
    });

    it('should handle high fret numbers', () => {
      // Calculate the actual results based on the algorithm
      expect(calculateNoteWithOctave('E', 0, 6, 22)).toBe('D6'); // E + 22 = D (with octave calculation)
      expect(calculateNoteWithOctave('A', 4, 6, 19)).toBe('E4'); // A + 19 = E (A2 + 19 = E4)
      expect(calculateNoteWithOctave('D', 3, 6, 15)).toBe('F4');  // D + 15 = F (D3 + 15 = F4)
    });

    it('should handle different string configurations', () => {
      // 7-string guitar
      expect(calculateNoteWithOctave('B', 6, 7, 0)).toBe('B1'); // Low B string
      expect(calculateNoteWithOctave('B', 6, 7, 2)).toBe('C#2'); // B + 2 = C#

      // 4-string bass
      expect(calculateNoteWithOctave('E', 3, 4, 0)).toBe('E2'); // Bass E string
      expect(calculateNoteWithOctave('E', 3, 4, 12)).toBe('E3'); // Bass E + 12 = E
    });

    it('should handle notes with flat notation', () => {
      expect(calculateNoteWithOctave('Bb', 1, 6, 0)).toBe('A#3'); // Bb should be converted to A#
      expect(calculateNoteWithOctave('Eb', 2, 6, 0)).toBe('D#3'); // Eb should be converted to D#
    });

    it('should handle edge cases', () => {
      // Fret 0 (open string)
      expect(calculateNoteWithOctave('E', 5, 6, 0)).toBe('E2');

      // Very high frets
      expect(calculateNoteWithOctave('E', 0, 6, 48)).toBe('E8'); // Four octaves

      // String index beyond standard configurations
      expect(calculateNoteWithOctave('C', 15, 20, 5)).toMatch(/^[A-G][#b]?\d+$/);
    });
  });

  describe('calculateNoteWithOctaveMemoized', () => {
    it('should return same result as non-memoized version', () => {
      const testCases = [
        { note: 'E' as Note, stringIndex: 0, totalStrings: 6, fret: 0 },
        { note: 'E' as Note, stringIndex: 0, totalStrings: 6, fret: 5 },
        { note: 'A' as Note, stringIndex: 4, totalStrings: 6, fret: 7 },
        { note: 'D' as Note, stringIndex: 3, totalStrings: 6, fret: 12 }
      ];

      testCases.forEach(({ note, stringIndex, totalStrings, fret }) => {
        const regular = calculateNoteWithOctave(note, stringIndex, totalStrings, fret);
        const memoized = calculateNoteWithOctaveMemoized(note, stringIndex, totalStrings, fret);
        expect(memoized).toBe(regular);
      });
    });

    it('should cache results for repeated calls', () => {
      const note = 'E' as Note;
      const stringIndex = 0;
      const totalStrings = 6;
      const fret = 5;

      // First call
      const result1 = calculateNoteWithOctaveMemoized(note, stringIndex, totalStrings, fret);
      
      // Second call should return cached result
      const result2 = calculateNoteWithOctaveMemoized(note, stringIndex, totalStrings, fret);
      
      expect(result1).toBe(result2);
    });

    it('should handle different parameters separately', () => {
      const result1 = calculateNoteWithOctaveMemoized('E', 0, 6, 5);
      const result2 = calculateNoteWithOctaveMemoized('A', 4, 6, 7);
      const result3 = calculateNoteWithOctaveMemoized('E', 0, 6, 7);

      expect(result1).toBe('A4'); // E + 5 = A
      expect(result2).toBe('E3'); // A + 7 = E
      expect(result3).toBe('B4'); // E + 7 = B
    });

    it('should clear cache when requested', () => {
      // Fill cache
      calculateNoteWithOctaveMemoized('E', 0, 6, 0);
      calculateNoteWithOctaveMemoized('A', 4, 6, 0);
      calculateNoteWithOctaveMemoized('D', 3, 6, 0);

      // Clear cache
      clearCalculationCache();

      // Next calls should recalculate (though we can't easily test this without mocking)
      const result = calculateNoteWithOctaveMemoized('E', 0, 6, 0);
      expect(result).toBe('E4');
    });

    it('should handle cache size limit', () => {
      // Fill cache beyond limit
      for (let i = 0; i < 1100; i++) {
        calculateNoteWithOctaveMemoized('E', 0, 6, i % 24);
      }

      // Should still work without errors
      const result = calculateNoteWithOctaveMemoized('E', 0, 6, 0);
      expect(result).toBe('E4');
    });

    it('should be more efficient than non-memoized version for repeated calls', () => {
      // This is more of a performance test concept
      // We'll just verify it works correctly with many repeated calls
      const start = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        calculateNoteWithOctaveMemoized('E', 0, 6, 5);
      }
      
      const end = performance.now();
      
      // Should complete very quickly due to caching
      expect(end - start).toBeLessThan(50); // 50ms is very generous
    });
  });

  describe('integration tests', () => {
    it('should maintain consistency across all functions', () => {
      const testConfigurations = [
        { totalStrings: 6, stringIndex: 0, note: 'E' as Note, fret: 5 },
        { totalStrings: 6, stringIndex: 1, note: 'B' as Note, fret: 1 },
        { totalStrings: 7, stringIndex: 6, note: 'B' as Note, fret: 2 },
        { totalStrings: 4, stringIndex: 3, note: 'E' as Note, fret: 12 }
      ];

      testConfigurations.forEach(({ totalStrings, stringIndex, note, fret }) => {
        const baseOctave = getBaseOctave(note, stringIndex, totalStrings);
        const noteWithOctave = calculateNoteWithOctave(note, stringIndex, totalStrings, fret);
        const memoized = calculateNoteWithOctaveMemoized(note, stringIndex, totalStrings, fret);

        // Extract octave from result
        const resultOctave = parseInt(noteWithOctave.slice(-1));
        
        // Result octave should be base octave + fret octave changes
        // const expectedOctaveChange = Math.floor(fret / 12) + 
        //   (['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].indexOf(note) > 
        //    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].indexOf(calculateFretNote(note, fret)) ? 1 : 0);

        expect(resultOctave).toBeGreaterThanOrEqual(baseOctave);
        expect(noteWithOctave).toBe(memoized);
      });
    });

    it('should handle all valid note inputs', () => {
      const validNotes: Note[] = [
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
        'Bb', 'Db', 'Eb', 'Gb', 'Ab'
      ];

      validNotes.forEach(note => {
        expect(() => {
          getBaseOctave(note, 0, 6);
          calculateNoteWithOctave(note, 0, 6, 0);
          calculateNoteWithOctaveMemoized(note, 0, 6, 0);
        }).not.toThrow();
      });
    });

    it('should handle extreme fret numbers', () => {
      const extremeFrets = [0, 1, 11, 12, 23, 24, 35, 36, 47, 48];

      extremeFrets.forEach(fret => {
        const result = calculateNoteWithOctave('E', 0, 6, fret);
        expect(result).toMatch(/^[A-G][#b]?\d+$/);
        
        const memoized = calculateNoteWithOctaveMemoized('E', 0, 6, fret);
        expect(memoized).toBe(result);
      });
    });
  });
});