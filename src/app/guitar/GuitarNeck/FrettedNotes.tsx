import React, { useMemo } from 'react';
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { calculateFretNote, isNoteInScale, getScaleDegree, sharpToFlat } from "@/lib/utils/scaleUtils";
import { playNote } from "@/lib/utils/audioUtils";
import { getNoteColor } from "./getNoteColor";
import { useDispatch } from 'react-redux';
import { getFretPositions } from './getFretPositions';
import { useSelector } from 'react-redux';
import { selectAudioStatus } from '@/features/audio/audioSlice';
import { selectNote } from '@/features/selectedNote/selectedNoteSlice';
import { RootState } from '@/app/store';

interface FrettedNotesProps {
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
}

export const FrettedNotes: React.FC<FrettedNotesProps> = React.memo(({
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
}) => {
  const dispatch = useDispatch();
  const audioStatus = useSelector((state: RootState) => selectAudioStatus(state));
  const selectedNote = useSelector((state: RootState) => state.selectedNote.selectedNote);

  // Memoize fret positions calculation
  const defaultFretPositions = useMemo(() => 
    getFretPositions(dimensions.width, fretCount), 
    [dimensions.width, fretCount]
  );

  // Memoize circle radius calculation
  const circleRadius = useMemo(() =>
    Math.min(stringSpacing / 3.5, stringSpacing / 3.5) * 1.41,
    [stringSpacing]
  );

  // Memoize font size calculation
  const fontSize = useMemo(() =>
    Math.min(stringSpacing / 3, stringSpacing / 3) * 1.41,
    [stringSpacing]
  );

  // Handle note click - toggle selection if same note, otherwise select new note
  const handleNoteClick = (note: Note, noteWithOctave: NoteWithOctave) => {
    playNote(noteWithOctave, audioStatus);
    if (selectedNote === note) {
      dispatch(selectNote(null));
    } else {
      dispatch(selectNote(note));
    }
  };

  // Check if a note should be highlighted
  const isNoteHighlighted = (note: Note) => {
    return selectedNote === note;
  };

  return (
    <>
      {Array.from({ length: fretCount }, (_, index) => {
        const fretIndex = index + 1; // Start from fret 1, not 0
        const note = calculateFretNote(openNote, fretIndex);
        const noteWithOctave = calculateNoteWithOctave(
          openNote,
          stringIndex,
          fretIndex
        );
        const inScale = isNoteInScale(note, scale);
        const isRoot = note === scale.root;
        
        // Get fret position based on whether it's multiscale or not
        const fretPosition = fretPositions.length > 0
          ? fretPositions[fretIndex]
          : defaultFretPositions[fretIndex];
          
        return (
          inScale && (
            <g
              key={`note-${stringIndex}-${fretIndex}`}
              transform={`translate(${
                fretPosition - stringSpacing / 4
              }, ${(stringIndex + 1) * stringSpacing})`}
              onClick={() => handleNoteClick(note, noteWithOctave)}
              className="cursor-pointer"
            >
              <title>{noteWithOctave}</title>
              <circle
                r={isNoteHighlighted(note) ? circleRadius * 1.4 : circleRadius}
                fill={getNoteColor(note, scale, isDarkMode, highlightRoots)}
                className="transition-all duration-200"
                style={{
                  filter: isNoteHighlighted(note)
                    ? `drop-shadow(0 0 8px rgba(255,255,255,1)) drop-shadow(0 0 4px rgba(255,255,255,0.9)) drop-shadow(0 0 2px rgba(255,255,255,0.7))`
                    : 'none',
                  stroke: isNoteHighlighted(note) ? '#ffffff' : 'none',
                  strokeWidth: isNoteHighlighted(note) ? 2 : 0
                }}
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
          )
        );
      })}
    </>
  );
});

FrettedNotes.displayName = 'FrettedNotes';