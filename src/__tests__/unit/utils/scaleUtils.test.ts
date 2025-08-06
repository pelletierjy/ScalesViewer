/**
 * Comprehensive tests for scaleUtils.ts
 * Tests core music theory calculations and scale generation
 */

import {
  getNoteIndex,
  getNoteAtInterval,
  getScaleNotes,
  isNoteInScale,
  calculateFretNote,
  getScaleDegree,
  getInterval,
  transposeNote,
  sharpToFlat,
  SHARP_TO_FLAT,
  SCALE_DEGREES
} from '../../../lib/utils/scaleUtils';
import { Note } from '../../../lib/utils/note';
import { Scale, ScaleMode } from '../../../lib/utils/scaleType';
import {
  ALL_NOTES,
  CHROMATIC_SHARP_NOTES,
  ENHARMONIC_PAIRS,
  createScale,
  areEnharmonicEquivalents,
  noteToSemitone
} from '../../utils/musicTestUtils';

// Extend Jest matchers
expect.extend({
  toBeEnharmonicWith(received: Note, expected: Note) {
    const pass = areEnharmonicEquivalents(received, expected);
    return {
      pass,
      message: () => `Expected ${received} ${pass ? 'not ' : ''}to be enharmonic with ${expected}`
    };
  }
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeEnharmonicWith(expected: Note): R;
    }
  }
}

describe('scaleUtils', () => {
  describe('getNoteIndex', () => {
    it('should return correct indices for all notes', () => {
      expect(getNoteIndex('A')).toBe(0);
      expect(getNoteIndex('A#')).toBe(1);
      expect(getNoteIndex('B')).toBe(2);
      expect(getNoteIndex('C')).toBe(3);
      expect(getNoteIndex('C#')).toBe(4);
      expect(getNoteIndex('D')).toBe(5);
      expect(getNoteIndex('D#')).toBe(6);
      expect(getNoteIndex('E')).toBe(7);
      expect(getNoteIndex('F')).toBe(8);
      expect(getNoteIndex('F#')).toBe(9);
      expect(getNoteIndex('G')).toBe(10);
      expect(getNoteIndex('G#')).toBe(11);
    });

    it('should handle flat notes correctly', () => {
      expect(getNoteIndex('Bb')).toBe(1); // Same as A#
      expect(getNoteIndex('Db')).toBe(4); // Same as C#
      expect(getNoteIndex('Eb')).toBe(6); // Same as D#
      expect(getNoteIndex('Gb')).toBe(9); // Same as F#
      expect(getNoteIndex('Ab')).toBe(11); // Same as G#
    });

    it('should be consistent across all chromatic notes', () => {
      const indices = CHROMATIC_SHARP_NOTES.map(note => getNoteIndex(note));
      expect(indices).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });
  });

  describe('getNoteAtInterval', () => {
    it('should calculate notes at basic intervals from A', () => {
      expect(getNoteAtInterval('A', 0)).toBe('A');   // unison
      expect(getNoteAtInterval('A', 1)).toBe('A#');  // minor 2nd
      expect(getNoteAtInterval('A', 2)).toBe('B');   // major 2nd
      expect(getNoteAtInterval('A', 3)).toBe('C');   // minor 3rd
      expect(getNoteAtInterval('A', 4)).toBe('C#');  // major 3rd
      expect(getNoteAtInterval('A', 5)).toBe('D');   // perfect 4th
      expect(getNoteAtInterval('A', 6)).toBe('D#');  // tritone
      expect(getNoteAtInterval('A', 7)).toBe('E');   // perfect 5th
      expect(getNoteAtInterval('A', 8)).toBe('F');   // minor 6th
      expect(getNoteAtInterval('A', 9)).toBe('F#');  // major 6th
      expect(getNoteAtInterval('A', 10)).toBe('G');  // minor 7th
      expect(getNoteAtInterval('A', 11)).toBe('G#'); // major 7th
      expect(getNoteAtInterval('A', 12)).toBe('A');  // octave
    });

    it('should handle octave wraparound correctly', () => {
      expect(getNoteAtInterval('A', 13)).toBe('A#'); // octave + minor 2nd
      expect(getNoteAtInterval('A', 15)).toBe('C');  // octave + minor 3rd
      expect(getNoteAtInterval('A', 24)).toBe('A');  // two octaves
    });

    it('should work with all chromatic starting notes', () => {
      CHROMATIC_SHARP_NOTES.forEach((note, startIndex) => {
        // Test perfect 5th (7 semitones)
        const expectedIndex = (startIndex + 7) % 12;
        const expectedNote = CHROMATIC_SHARP_NOTES[expectedIndex];
        expect(getNoteAtInterval(note, 7)).toBe(expectedNote);
      });
    });
  });

  describe('getScaleNotes', () => {
    it('should generate correct notes for major scale modes', () => {
      // C Ionian (major)
      const cMajor = getScaleNotes(createScale('C', 'ionian'));
      expect(cMajor).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);

      // D Dorian
      const dDorian = getScaleNotes(createScale('D', 'dorian'));
      expect(dDorian).toEqual(['D', 'E', 'F', 'G', 'A', 'B', 'C']);

      // E Phrygian
      const ePhrygian = getScaleNotes(createScale('E', 'phrygian'));
      expect(ePhrygian).toEqual(['E', 'F', 'G', 'A', 'B', 'C', 'D']);
    });

    it('should generate correct notes for different roots', () => {
      const gMajor = getScaleNotes(createScale('G', 'ionian'));
      expect(gMajor).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F#']);

      const fMajor = getScaleNotes(createScale('F', 'ionian'));
      expect(fMajor).toEqual(['F', 'G', 'A', 'A#', 'C', 'D', 'E']);
    });

    it('should handle sharp and flat roots correctly', () => {
      const fSharpMajor = getScaleNotes(createScale('F#', 'ionian'));
      expect(fSharpMajor).toHaveLength(7);
      expect(fSharpMajor[0]).toBe('F#');

      const bbMajor = getScaleNotes(createScale('Bb', 'ionian'));
      expect(bbMajor).toHaveLength(7);
      expect(bbMajor[0]).toBe('Bb');
    });
  });

  describe('isNoteInScale', () => {
    it('should correctly identify notes in C major scale', () => {
      const cMajorScale = createScale('C', 'ionian');
      
      // Notes in C major
      expect(isNoteInScale('C', cMajorScale)).toBe(true);
      expect(isNoteInScale('D', cMajorScale)).toBe(true);
      expect(isNoteInScale('E', cMajorScale)).toBe(true);
      expect(isNoteInScale('F', cMajorScale)).toBe(true);
      expect(isNoteInScale('G', cMajorScale)).toBe(true);
      expect(isNoteInScale('A', cMajorScale)).toBe(true);
      expect(isNoteInScale('B', cMajorScale)).toBe(true);

      // Notes not in C major
      expect(isNoteInScale('C#', cMajorScale)).toBe(false);
      expect(isNoteInScale('D#', cMajorScale)).toBe(false);
      expect(isNoteInScale('F#', cMajorScale)).toBe(false);
      expect(isNoteInScale('G#', cMajorScale)).toBe(false);
      expect(isNoteInScale('A#', cMajorScale)).toBe(false);
    });

    it('should handle different modes correctly', () => {
      const aMinorScale = createScale('A', 'aeolian');
      
      expect(isNoteInScale('A', aMinorScale)).toBe(true);
      expect(isNoteInScale('B', aMinorScale)).toBe(true);
      expect(isNoteInScale('C', aMinorScale)).toBe(true);
      expect(isNoteInScale('D', aMinorScale)).toBe(true);
      expect(isNoteInScale('E', aMinorScale)).toBe(true);
      expect(isNoteInScale('F', aMinorScale)).toBe(true);
      expect(isNoteInScale('G', aMinorScale)).toBe(true);

      expect(isNoteInScale('A#', aMinorScale)).toBe(false);
      expect(isNoteInScale('C#', aMinorScale)).toBe(false);
    });
  });

  describe('calculateFretNote', () => {
    it('should calculate notes for standard guitar tuning', () => {
      // Low E string (6th string)
      expect(calculateFretNote('E', 0)).toBe('E');
      expect(calculateFretNote('E', 1)).toBe('F');
      expect(calculateFretNote('E', 2)).toBe('F#');
      expect(calculateFretNote('E', 3)).toBe('G');
      expect(calculateFretNote('E', 5)).toBe('A');
      expect(calculateFretNote('E', 7)).toBe('B');
      expect(calculateFretNote('E', 12)).toBe('E');
    });

    it('should handle all fret positions correctly', () => {
      // Test octave at 12th fret for all strings
      const standardTuning: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];
      standardTuning.forEach(openNote => {
        expect(calculateFretNote(openNote, 12)).toBe(openNote);
      });
    });

    it('should handle high fret numbers', () => {
      expect(calculateFretNote('E', 24)).toBe('E');  // 2 octaves
      expect(calculateFretNote('E', 15)).toBe('G#'); // E + 15 semitones
      expect(calculateFretNote('A', 17)).toBe('C#'); // A + 17 semitones
    });
  });

  describe('getScaleDegree', () => {
    it('should return correct scale degrees for major scale', () => {
      const cMajorScale = createScale('C', 'ionian');
      
      expect(getScaleDegree('C', cMajorScale)).toBe('1');   // Root
      expect(getScaleDegree('D', cMajorScale)).toBe('2');   // Major 2nd
      expect(getScaleDegree('E', cMajorScale)).toBe('3');   // Major 3rd
      expect(getScaleDegree('F', cMajorScale)).toBe('4');   // Perfect 4th
      expect(getScaleDegree('G', cMajorScale)).toBe('5');   // Perfect 5th
      expect(getScaleDegree('A', cMajorScale)).toBe('6');   // Major 6th
      expect(getScaleDegree('B', cMajorScale)).toBe('7');   // Major 7th
    });

    it('should return correct scale degrees with flats for minor scale', () => {
      const aMinorScale = createScale('A', 'aeolian');
      
      expect(getScaleDegree('A', aMinorScale)).toBe('1');   // Root
      expect(getScaleDegree('B', aMinorScale)).toBe('2');   // Major 2nd
      expect(getScaleDegree('C', aMinorScale)).toBe('♭3');  // Minor 3rd
      expect(getScaleDegree('D', aMinorScale)).toBe('4');   // Perfect 4th
      expect(getScaleDegree('E', aMinorScale)).toBe('5');   // Perfect 5th
      expect(getScaleDegree('F', aMinorScale)).toBe('♭6');  // Minor 6th
      expect(getScaleDegree('G', aMinorScale)).toBe('♭7');  // Minor 7th
    });

    it('should return empty string for notes not in scale', () => {
      const cMajorScale = createScale('C', 'ionian');
      
      expect(getScaleDegree('C#', cMajorScale)).toBe('');
      expect(getScaleDegree('D#', cMajorScale)).toBe('');
      expect(getScaleDegree('F#', cMajorScale)).toBe('');
    });
  });

  describe('getInterval', () => {
    it('should calculate correct ascending intervals', () => {
      expect(getInterval('C', 'C')).toBe(0);   // unison
      expect(getInterval('C', 'D')).toBe(2);   // major 2nd
      expect(getInterval('C', 'E')).toBe(4);   // major 3rd
      expect(getInterval('C', 'F')).toBe(5);   // perfect 4th
      expect(getInterval('C', 'G')).toBe(7);   // perfect 5th
      expect(getInterval('C', 'A')).toBe(9);   // major 6th
      expect(getInterval('C', 'B')).toBe(11);  // major 7th
    });

    it('should be consistent across all starting notes', () => {
      CHROMATIC_SHARP_NOTES.forEach((fromNote, fromIndex) => {
        CHROMATIC_SHARP_NOTES.forEach((toNote, toIndex) => {
          const expectedInterval = (toIndex - fromIndex + 12) % 12;
          expect(getInterval(fromNote, toNote)).toBe(expectedInterval);
        });
      });
    });

    it('should handle tritone correctly', () => {
      expect(getInterval('C', 'F#')).toBe(6);  // tritone
      expect(getInterval('F#', 'C')).toBe(6);  // tritone in reverse
    });
  });

  describe('transposeNote', () => {
    it('should transpose notes correctly', () => {
      expect(transposeNote('C', 2)).toBe('D');
      expect(transposeNote('C', 7)).toBe('G');
      expect(transposeNote('C', 12)).toBe('C');
      expect(transposeNote('G', 5)).toBe('C');
    });

    it('should handle negative transposition', () => {
      expect(transposeNote('C', -1)).toBe('B');
      expect(transposeNote('C', -2)).toBe('A#');
      expect(transposeNote('C', -7)).toBe('F');
    });

    it('should handle large intervals', () => {
      expect(transposeNote('C', 24)).toBe('C');  // Two octaves
      expect(transposeNote('C', 25)).toBe('C#'); // Two octaves + 1
      expect(transposeNote('C', -13)).toBe('B'); // Down octave + 1
    });
  });

  describe('sharpToFlat', () => {
    it('should convert sharp notes to their flat equivalents', () => {
      expect(sharpToFlat('A#')).toBe('Bb');
      expect(sharpToFlat('C#')).toBe('Db');
      expect(sharpToFlat('D#')).toBe('Eb');
      expect(sharpToFlat('F#')).toBe('Gb');
      expect(sharpToFlat('G#')).toBe('Ab');
    });

    it('should return natural notes unchanged', () => {
      expect(sharpToFlat('A')).toBe('A');
      expect(sharpToFlat('B')).toBe('B');
      expect(sharpToFlat('C')).toBe('C');
      expect(sharpToFlat('D')).toBe('D');
      expect(sharpToFlat('E')).toBe('E');
      expect(sharpToFlat('F')).toBe('F');
      expect(sharpToFlat('G')).toBe('G');
    });
  });

  describe('integration tests', () => {
    it('should maintain consistency between functions', () => {
      // Test that getNoteAtInterval and getInterval are inverse operations
      CHROMATIC_SHARP_NOTES.forEach(root => {
        for (let interval = 0; interval < 12; interval++) {
          const targetNote = getNoteAtInterval(root, interval);
          const calculatedInterval = getInterval(root, targetNote);
          expect(calculatedInterval).toBe(interval);
        }
      });
    });

    it('should maintain consistency between calculateFretNote and getNoteAtInterval', () => {
      const testNotes: Note[] = ['E', 'A', 'D', 'G', 'B'];
      testNotes.forEach(openString => {
        for (let fret = 0; fret <= 24; fret++) {
          const frettedNote = calculateFretNote(openString, fret);
          const intervalNote = getNoteAtInterval(openString, fret);
          expect(frettedNote).toBe(intervalNote);
        }
      });
    });

    it('should handle enharmonic equivalents correctly', () => {
      ENHARMONIC_PAIRS.forEach(([sharp, flat]) => {
        expect(getNoteIndex(sharp)).toBe(getNoteIndex(flat));
        expect(getNoteAtInterval(sharp, 0)).toBe(sharp);
        expect(getNoteAtInterval(flat, 0)).toBe(flat);
      });
    });
  });

  describe('constants validation', () => {
    it('should have correct SHARP_TO_FLAT mapping', () => {
      expect(SHARP_TO_FLAT['A#']).toBe('Bb');
      expect(SHARP_TO_FLAT['C#']).toBe('Db');
      expect(SHARP_TO_FLAT['D#']).toBe('Eb');
      expect(SHARP_TO_FLAT['F#']).toBe('Gb');
      expect(SHARP_TO_FLAT['G#']).toBe('Ab');
    });

    it('should have correct SCALE_DEGREES array', () => {
      expect(SCALE_DEGREES).toHaveLength(12);
      expect(SCALE_DEGREES[0]).toBe('1');
      expect(SCALE_DEGREES[1]).toBe('♭2');
      expect(SCALE_DEGREES[11]).toBe('7');
    });
  });
});