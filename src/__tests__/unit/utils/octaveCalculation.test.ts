/**
 * Comprehensive tests for octaveCalculation.ts
 * Tests guitar-specific octave calculations, memoization, and cache management
 */

import {
  getBaseOctave,
  calculateNoteWithOctave,
  calculateNoteWithOctaveMemoized,
  clearCalculationCache
} from '../../../app/guitar/utils/octaveCalculation';
import { Note, NoteWithOctave } from '../../../lib/utils/note';
import { COMMON_TUNINGS } from '../../utils/musicTestUtils';

describe('octaveCalculation', () => {
  beforeEach(() => {
    // Clear cache before each test to ensure clean state
    clearCalculationCache();
  });

  describe('getBaseOctave', () => {
    describe('6-string guitar (standard)', () => {
      const totalStrings = 6;

      it('should return correct base octave for standard guitar tuning', () => {
        // Standard 6-string guitar tuning: E2-A2-D3-G3-B3-E4 (low to high, reversed indices)
        expect(getBaseOctave('E', 0, totalStrings)).toBe(4); // High E string (index 0)
        expect(getBaseOctave('B', 1, totalStrings)).toBe(3); // B string (index 1)
        expect(getBaseOctave('G', 2, totalStrings)).toBe(3); // G string (index 2)
        expect(getBaseOctave('D', 3, totalStrings)).toBe(3); // D string (index 3)
        expect(getBaseOctave('A', 4, totalStrings)).toBe(2); // A string (index 4)
        expect(getBaseOctave('E', 5, totalStrings)).toBe(2); // Low E string (index 5)
      });

      it('should handle different notes on same string positions', () => {
        // Test different notes on high E string position
        expect(getBaseOctave('E', 0, totalStrings)).toBe(4);
        expect(getBaseOctave('F', 0, totalStrings)).toBe(4);
        expect(getBaseOctave('F#', 0, totalStrings)).toBe(4);
        
        // Test different notes on low E string position
        expect(getBaseOctave('E', 5, totalStrings)).toBe(2);
        expect(getBaseOctave('D', 5, totalStrings)).toBe(2); // Drop D tuning
      });
    });

    describe('7-string guitar', () => {
      const totalStrings = 7;

      it('should return correct base octave for 7-string guitar', () => {
        // 7-string guitar typically adds low B: B1-E2-A2-D3-G3-B3-E4
        expect(getBaseOctave('E', 0, totalStrings)).toBe(4); // High E string
        expect(getBaseOctave('B', 1, totalStrings)).toBe(3); // B string
        expect(getBaseOctave('G', 2, totalStrings)).toBe(3); // G string
        expect(getBaseOctave('D', 3, totalStrings)).toBe(3); // D string
        expect(getBaseOctave('A', 4, totalStrings)).toBe(2); // A string
        expect(getBaseOctave('E', 5, totalStrings)).toBe(2); // Low E string
        expect(getBaseOctave('B', 6, totalStrings)).toBe(1); // Low B string
      });
    });

    describe('8-string guitar', () => {
      const totalStrings = 8;

      it('should return correct base octave for 8-string guitar', () => {
        // 8-string guitar typically adds low F#: F#1-B1-E2-A2-D3-G3-B3-E4
        expect(getBaseOctave('E', 0, totalStrings)).toBe(4); // High E string
        expect(getBaseOctave('B', 1, totalStrings)).toBe(3); // B string
        expect(getBaseOctave('G', 2, totalStrings)).toBe(3); // G string
        expect(getBaseOctave('D', 3, totalStrings)).toBe(3); // D string
        expect(getBaseOctave('A', 4, totalStrings)).toBe(2); // A string
        expect(getBaseOctave('E', 5, totalStrings)).toBe(2); // Low E string
        expect(getBaseOctave('B', 6, totalStrings)).toBe(1); // Low B string
        expect(getBaseOctave('F#', 7, totalStrings)).toBe(1); // Low F# string
      });
    });

    describe('4-string bass', () => {
      const totalStrings = 4;

      it('should return correct base octave for 4-string bass', () => {
        // Standard bass tuning: E1-A1-D2-G2 (low to high, reversed indices)
        expect(getBaseOctave('G', 0, totalStrings)).toBe(3); // High G string
        expect(getBaseOctave('D', 1, totalStrings)).toBe(3); // D string
        expect(getBaseOctave('A', 2, totalStrings)).toBe(2); // A string
        expect(getBaseOctave('E', 3, totalStrings)).toBe(2); // Low E string
      });
    });

    describe('edge cases', () => {
      it('should handle single string', () => {
        expect(getBaseOctave('E', 0, 1)).toBe(4);
      });

      it('should handle maximum strings', () => {
        const totalStrings = 12;
        expect(getBaseOctave('E', 0, totalStrings)).toBe(4); // High string
        expect(getBaseOctave('E', 11, totalStrings)).toBe(1); // Lowest string
      });

      it('should handle all note types', () => {
        const totalStrings = 6;
        const stringIndex = 2; // Middle string position
        
        // Test all chromatic notes
        const testNotes: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        testNotes.forEach(note => {
          const octave = getBaseOctave(note, stringIndex, totalStrings);
          expect(octave).toBeGreaterThanOrEqual(1);
          expect(octave).toBeLessThanOrEqual(4);
        });
      });
    });
  });

  describe('calculateNoteWithOctave', () => {
    describe('6-string guitar standard tuning', () => {
      it('should calculate correct note and octave for open strings (fret 0)', () => {
        // Standard tuning with proper octaves
        const result0 = calculateNoteWithOctave('E', 0, 6, 0); // High E string
        expect(result0).toBe('E4');

        const result1 = calculateNoteWithOctave('B', 1, 6, 0); // B string
        expect(result1).toBe('B3');

        const result2 = calculateNoteWithOctave('G', 2, 6, 0); // G string
        expect(result2).toBe('G3');

        const result3 = calculateNoteWithOctave('D', 3, 6, 0); // D string
        expect(result3).toBe('D3');

        const result4 = calculateNoteWithOctave('A', 4, 6, 0); // A string
        expect(result4).toBe('A2');

        const result5 = calculateNoteWithOctave('E', 5, 6, 0); // Low E string
        expect(result5).toBe('E2');
      });

      it('should calculate correct note and octave for fretted positions', () => {
        // Low E string tests
        expect(calculateNoteWithOctave('E', 5, 6, 1)).toBe('F2'); // 1st fret
        expect(calculateNoteWithOctave('E', 5, 6, 5)).toBe('A2'); // 5th fret
        expect(calculateNoteWithOctave('E', 5, 6, 12)).toBe('E3'); // 12th fret (octave)
        
        // High E string tests
        expect(calculateNoteWithOctave('E', 0, 6, 12)).toBe('E5'); // 12th fret (octave)
        expect(calculateNoteWithOctave('E', 0, 6, 24)).toBe('E6'); // 24th fret (two octaves)
      });

      it('should handle octave boundary crossings correctly', () => {
        // B string (B3), 1st fret = C4 (crosses octave boundary)
        expect(calculateNoteWithOctave('B', 1, 6, 1)).toBe('C4');

        // G string (G3), 5th fret = C4
        expect(calculateNoteWithOctave('G', 2, 6, 5)).toBe('C4');

        // Low E string (E2), 8th fret = C3
        expect(calculateNoteWithOctave('E', 5, 6, 8)).toBe('C3');
      });

      it('should handle high fret positions (up to 24)', () => {
        // Low E string, 24th fret = E4 (two octaves up)
        expect(calculateNoteWithOctave('E', 5, 6, 24)).toBe('E4');

        // High E string, 24th fret = E6 (two octaves up)
        expect(calculateNoteWithOctave('E', 0, 6, 24)).toBe('E6');

        // A string, 17th fret
        expect(calculateNoteWithOctave('A', 4, 6, 17)).toBe('D4');
      });
    });

    describe('alternative tunings', () => {
      it('should handle drop D tuning', () => {
        // Drop D: D2-A2-D3-G3-B3-E4
        expect(calculateNoteWithOctave('D', 5, 6, 0)).toBe('D2'); // Low D string
        expect(calculateNoteWithOctave('D', 5, 6, 12)).toBe('D3'); // 12th fret
      });

      it('should handle DADGAD tuning', () => {
        // DADGAD: D2-A2-D3-G3-A3-D4
        expect(calculateNoteWithOctave('D', 0, 6, 0)).toBe('D4'); // High D string
        expect(calculateNoteWithOctave('A', 1, 6, 0)).toBe('A3'); // A string (2nd from top)
      });

      it('should handle open G tuning', () => {
        // Open G: D2-G2-D3-G3-B3-D4
        expect(calculateNoteWithOctave('G', 4, 6, 0)).toBe('G2'); // Low G string
        expect(calculateNoteWithOctave('D', 0, 6, 0)).toBe('D4'); // High D string
      });
    });

    describe('extended range guitars', () => {
      it('should handle 7-string guitar calculations', () => {
        // 7-string: B1-E2-A2-D3-G3-B3-E4
        expect(calculateNoteWithOctave('B', 6, 7, 0)).toBe('B1'); // Low B string
        expect(calculateNoteWithOctave('B', 6, 7, 12)).toBe('B2'); // 12th fret
      });

      it('should handle 8-string guitar calculations', () => {
        // 8-string: F#1-B1-E2-A2-D3-G3-B3-E4
        expect(calculateNoteWithOctave('F#', 7, 8, 0)).toBe('F#1'); // Low F# string
        expect(calculateNoteWithOctave('F#', 7, 8, 5)).toBe('B1'); // 5th fret
      });
    });

    describe('edge cases', () => {
      it('should handle all chromatic notes correctly', () => {
        // Test progression through all chromatic notes on middle string
        const results: NoteWithOctave[] = [];
        
        for (let fret = 0; fret < 12; fret++) {
          const result = calculateNoteWithOctave('C', 2, 6, fret);
          results.push(result);
        }

        expect(results[0]).toBe('C3');  // C
        expect(results[1]).toBe('C#3'); // C#
        expect(results[2]).toBe('D3');  // D
        expect(results[11]).toBe('B3'); // B
      });

      it('should handle large fret numbers', () => {
        const result = calculateNoteWithOctave('E', 5, 6, 36);
        expect(result).toBe('E5'); // Three octaves up from E2
      });
    });
  });

  describe('calculateNoteWithOctaveMemoized', () => {
    it('should return same results as non-memoized version', () => {
      const openNote: Note = 'E';
      const stringIndex = 5;
      const totalStrings = 6;
      const fret = 5;

      const normalResult = calculateNoteWithOctave(openNote, stringIndex, totalStrings, fret);
      const memoizedResult = calculateNoteWithOctaveMemoized(openNote, stringIndex, totalStrings, fret);

      expect(memoizedResult).toBe(normalResult);
    });

    it('should cache results for performance', () => {
      const openNote: Note = 'E';
      const stringIndex = 5;
      const totalStrings = 6;
      const fret = 12;

      // First call - should compute and cache
      const result1 = calculateNoteWithOctaveMemoized(openNote, stringIndex, totalStrings, fret);
      
      // Second call with same parameters - should use cache
      const result2 = calculateNoteWithOctaveMemoized(openNote, stringIndex, totalStrings, fret);

      expect(result1).toBe(result2);
      expect(result1).toBe('E3');
    });

    it('should handle different parameter combinations correctly', () => {
      // Test multiple different combinations to ensure cache keys work correctly
      const combinations = [
        { note: 'E' as Note, string: 0, total: 6, fret: 0 },
        { note: 'A' as Note, string: 4, total: 6, fret: 0 },
        { note: 'D' as Note, string: 3, total: 6, fret: 0 },
        { note: 'E' as Note, string: 5, total: 6, fret: 12 },
        { note: 'E' as Note, string: 0, total: 7, fret: 0 },
        { note: 'B' as Note, string: 6, total: 7, fret: 5 }
      ];

      const results = combinations.map(({ note, string, total, fret }) => {
        const normalResult = calculateNoteWithOctave(note, string, total, fret);
        const memoizedResult = calculateNoteWithOctaveMemoized(note, string, total, fret);
        return { normalResult, memoizedResult };
      });

      // All results should match between normal and memoized versions
      results.forEach(({ normalResult, memoizedResult }) => {
        expect(memoizedResult).toBe(normalResult);
      });
    });

    it('should handle cache performance with many calculations', () => {
      const startTime = performance.now();

      // Perform many calculations with repetitive parameters
      for (let i = 0; i < 100; i++) {
        for (let fret = 0; fret <= 24; fret++) {
          calculateNoteWithOctaveMemoized('E', 5, 6, fret);
          calculateNoteWithOctaveMemoized('A', 4, 6, fret);
          calculateNoteWithOctaveMemoized('D', 3, 6, fret);
        }
      }

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Should complete reasonably quickly due to caching (less than 100ms)
      expect(executionTime).toBeLessThan(100);
    });

    it('should respect cache size limit', () => {
      // Fill cache beyond the 1000 entry limit
      const notes: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      
      for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
        for (let string = 0; string < 8; string++) {
          for (let fret = 0; fret <= 12; fret++) {
            calculateNoteWithOctaveMemoized(notes[noteIndex], string, 6, fret);
            // This creates 12 * 8 * 13 = 1248 entries, exceeding the 1000 limit
          }
        }
      }

      // Cache should still work for new calculations
      const result = calculateNoteWithOctaveMemoized('E', 5, 6, 12);
      expect(result).toBe('E3');
    });
  });

  describe('clearCalculationCache', () => {
    it('should clear the memoization cache', () => {
      // Populate cache with some calculations
      calculateNoteWithOctaveMemoized('E', 5, 6, 12);
      calculateNoteWithOctaveMemoized('A', 4, 6, 5);
      calculateNoteWithOctaveMemoized('D', 3, 6, 0);

      // Clear the cache
      clearCalculationCache();

      // Should still work correctly after clearing
      const result = calculateNoteWithOctaveMemoized('E', 5, 6, 12);
      expect(result).toBe('E3');
    });

    it('should not affect non-memoized function', () => {
      const result1 = calculateNoteWithOctave('E', 5, 6, 12);
      
      clearCalculationCache();
      
      const result2 = calculateNoteWithOctave('E', 5, 6, 12);
      expect(result1).toBe(result2);
    });
  });

  describe('mathematical accuracy', () => {
    it('should correctly calculate octave progression', () => {
      // Test that each 12 frets increases octave by 1
      const baseResult = calculateNoteWithOctave('E', 5, 6, 0); // E2
      const octave1 = calculateNoteWithOctave('E', 5, 6, 12); // E3
      const octave2 = calculateNoteWithOctave('E', 5, 6, 24); // E4

      expect(baseResult).toBe('E2');
      expect(octave1).toBe('E3');
      expect(octave2).toBe('E4');
    });

    it('should handle semitone progression accurately', () => {
      // Test that each fret increases by one semitone
      const notes: NoteWithOctave[] = [];
      for (let fret = 0; fret < 13; fret++) {
        notes.push(calculateNoteWithOctave('C', 2, 6, fret));
      }

      // Should progress through all chromatic notes within the same octave, then to next octave
      expect(notes[0]).toBe('C3');
      expect(notes[1]).toBe('C#3');
      expect(notes[2]).toBe('D3');
      expect(notes[11]).toBe('B3');
      expect(notes[12]).toBe('C4'); // Octave boundary
    });

    it('should handle B to C octave boundary correctly', () => {
      // B3 + 1 semitone = C4
      const bNote = calculateNoteWithOctave('B', 1, 6, 0); // B3
      const cNote = calculateNoteWithOctave('B', 1, 6, 1); // C4

      expect(bNote).toBe('B3');
      expect(cNote).toBe('C4');
    });
  });

  describe('integration with guitar tuning systems', () => {
    it('should work with standard guitar intervals', () => {
      // Standard guitar tuning intervals: E-A-D-G-B-E
      // Perfect 4ths except G-B (major 3rd)
      
      // Low E to A (perfect 4th = 5 semitones)
      const lowEToA = calculateNoteWithOctave('E', 5, 6, 5);
      expect(lowEToA).toBe('A2');

      // A to D (perfect 4th = 5 semitones)
      const aToD = calculateNoteWithOctave('A', 4, 6, 5);
      expect(aToD).toBe('D3');

      // D to G (perfect 4th = 5 semitones)
      const dToG = calculateNoteWithOctave('D', 3, 6, 5);
      expect(dToG).toBe('G3');

      // G to B (major 3rd = 4 semitones)
      const gToB = calculateNoteWithOctave('G', 2, 6, 4);
      expect(gToB).toBe('B3');

      // B to E (perfect 4th = 5 semitones)
      const bToE = calculateNoteWithOctave('B', 1, 6, 5);
      expect(bToE).toBe('E4');
    });

    it('should work with common tunings', () => {
      // Test with predefined common tunings
      const { standard6, dropD, openG } = COMMON_TUNINGS;
      
      // Standard tuning open strings
      expect(calculateNoteWithOctave(standard6[0], 0, 6, 0)).toBe('E4'); // High E
      expect(calculateNoteWithOctave(standard6[5], 5, 6, 0)).toBe('E2'); // Low E
      
      // Drop D tuning
      expect(calculateNoteWithOctave(dropD[5], 5, 6, 0)).toBe('D2'); // Low D
      
      // Open G tuning
      expect(calculateNoteWithOctave(openG[0], 0, 6, 0)).toBe('D4'); // High D
    });
  });
});