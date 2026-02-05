import React, { useMemo } from 'react';
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { calculateFretNote, isNoteInScale, getScaleDegree, sharpToFlat } from "@/lib/utils/scaleUtils";
import { playNote } from "@/lib/utils/audioUtils";
import { getNoteColor } from "./getNoteColor";
import { getFretPositions } from './getFretPositions';
import { useSelector } from 'react-redux';
import { selectAudioStatus } from '@/features/audio/audioSlice';
import { RootState } from '@/app/store';

interface VirtualizedFrettedNotesProps {
  openNote: Note;
  stringIndex: number;
  fretCount: number;
  dimensions: { width: number; height: number };
  stringSpacing: number;
  scale: Scale;
  isDarkMode: boolean;
  showDegrees: boolean;
  showFlats: boolean;
  highlightRoots: boolean;
  flipX: boolean;
  flipY: boolean;
  calculateNoteWithOctave: (openNote: Note, stringIndex: number, fret: number) => NoteWithOctave;
  fretPositions?: number[];
  viewportStart?: number;
  viewportEnd?: number;
}

// Only render notes within the visible viewport for large fretboards
export const VirtualizedFrettedNotes: React.FC<VirtualizedFrettedNotesProps> = React.memo(({
  openNote,
  stringIndex,
  fretCount,
  dimensions,
  stringSpacing,
  scale,
  isDarkMode,
  showDegrees,
  showFlats,
  highlightRoots,
  flipX,
  flipY,
  calculateNoteWithOctave,
  fretPositions = [],
  viewportStart = 0,
  viewportEnd = fretCount,
}) => {
  const audioStatus = useSelector((state: RootState) => selectAudioStatus(state));

  // Memoize fret positions calculation
  const defaultFretPositions = useMemo(() => 
    getFretPositions(dimensions.width, fretCount), 
    [dimensions.width, fretCount]
  );

  // Memoize circle radius and font size calculations
  const circleRadius = useMemo(() =>
    Math.min(stringSpacing / 3.5, stringSpacing / 3.5) * 1.15,
    [stringSpacing]
  );

  const fontSize = useMemo(() =>
    Math.min(stringSpacing / 3, stringSpacing / 3) * 1.15,
    [stringSpacing]
  );

  // Optimize rendering by only calculating visible frets
  const visibleFrets = useMemo(() => {
    const start = Math.max(1, viewportStart);
    const end = Math.min(fretCount + 1, viewportEnd + 1);
    return Array.from({ length: end - start }, (_, i) => i + start);
  }, [viewportStart, viewportEnd, fretCount]);

  // Memoize note calculations for visible frets
  const visibleNotes = useMemo(() => {
    return visibleFrets.map(fretIndex => {
      const note = calculateFretNote(openNote, fretIndex);
      const noteWithOctave = calculateNoteWithOctave(openNote, stringIndex, fretIndex);
      const inScale = isNoteInScale(note, scale);
      const isRoot = note === scale.root;
      
      const fretPosition = fretPositions.length > 0
        ? fretPositions[fretIndex]
        : defaultFretPositions[fretIndex];

      return {
        fretIndex,
        note,
        noteWithOctave,
        inScale,
        isRoot,
        fretPosition,
      };
    }).filter(item => item.inScale); // Only include notes that are in scale
  }, [visibleFrets, openNote, stringIndex, scale, fretPositions, defaultFretPositions, calculateNoteWithOctave]);

  return (
    <>
      {visibleNotes.map(({ fretIndex, note, noteWithOctave, isRoot, fretPosition }) => (
        <g
          key={`note-${stringIndex}-${fretIndex}`}
          transform={`translate(${fretPosition - stringSpacing / 4}, ${(stringIndex + 1) * stringSpacing})`}
          onClick={() => playNote(noteWithOctave, audioStatus)}
          className="cursor-pointer"
        >
          <title>{noteWithOctave}</title>
          <circle
            r={circleRadius}
            fill={getNoteColor(note, scale, isDarkMode, highlightRoots)}
            className="transition-colors duration-200"
          />
          <text
            fill={
              isDarkMode
                ? "#1f2937"
                : isRoot
                ? "#ffffff"
                : "#1f2937"
            }
            fontSize={fontSize}
            textAnchor="middle"
            dy=".3em"
            className="select-none font-bold transition-colors duration-200"
            style={{
              textShadow: isDarkMode
                ? "0 0 1px rgba(0,0,0,0.3)"
                : "none",
              transform: `${flipX ? "scale(-1, 1)" : ""} ${
                flipY ? "scale(1, -1)" : ""
              }`,
            }}
          >
            {showDegrees
              ? getScaleDegree(note, scale)
              : showFlats
              ? sharpToFlat(note)
              : note}
          </text>
        </g>
      ))}
    </>
  );
});

VirtualizedFrettedNotes.displayName = 'VirtualizedFrettedNotes';