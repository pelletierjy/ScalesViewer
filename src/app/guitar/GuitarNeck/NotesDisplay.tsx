import React, { useMemo } from 'react';
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { isNoteInScale, getScaleDegree, sharpToFlat } from "@/lib/utils/scaleUtils";
import { playNote } from "@/lib/utils/audioUtils";
import { getNoteColor } from "./getNoteColor";
import { TuningPreset } from "../types/tuningPreset";
import { FrettedNotes } from './FrettedNotes';
import { VirtualizedFrettedNotes } from './VirtualizedFrettedNotes';
import { useSelector } from 'react-redux';
import { selectAudioStatus } from '@/features/audio/audioSlice';
import { selectNote } from '@/features/selectedNote/selectedNoteSlice';
import { useDispatch } from 'react-redux';
import { RootState } from '@/app/store';

interface NotesDisplayProps {
  adjustedTuning: TuningPreset;
  dimensions: { width: number; height: number };
  stringSpacing: number;
  fretCount: number;
  scale: Scale;
  isDarkMode: boolean;
  showDegrees: boolean;
  showFlats: boolean;
  highlightRoots: boolean;
  flipX: boolean;
  flipY: boolean;
  calculateNoteWithOctave: (openNote: Note, stringIndex: number, fret: number) => NoteWithOctave;
  fretPositions?: number[][];
  stringIndex?: number;
  openNote?: Note;
}

export const NotesDisplay: React.FC<NotesDisplayProps> = React.memo(({
  adjustedTuning,
  dimensions,
  stringSpacing,
  fretCount,
  scale,
  isDarkMode,
  showDegrees,
  showFlats,
  highlightRoots,
  flipX,
  flipY,
  calculateNoteWithOctave,
  fretPositions = [],
  stringIndex = 0,
  openNote: openNoteProp,
}) => {
  const audioStatus = useSelector((state: RootState) => selectAudioStatus(state));
  const selectedNote = useSelector((state: RootState) => state.selectedNote.selectedNote);
  const dispatch = useDispatch();

  // Memoize circle radius and font size calculations
  const circleRadius = useMemo(() =>
    Math.min(stringSpacing / 3.5, stringSpacing / 3.5) * 1.25,
    [stringSpacing]
  );

  const fontSize = useMemo(() =>
    Math.min(stringSpacing / 3, stringSpacing / 3) * 1.25,
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

  // Get the open note for this specific string
  const openNote = openNoteProp || [...adjustedTuning.strings].reverse()[stringIndex];
  
  // Get the zero fret position
  const zeroFretPosition = fretPositions.length > 0 && fretPositions[stringIndex] && fretPositions[stringIndex].length > 0
    ? fretPositions[stringIndex][0]
    : 0;
    
  return (
    <>
      {/* Zero fret note */}
      {isNoteInScale(openNote, scale) && (
        <g
          transform={`translate(${zeroFretPosition + circleRadius}, ${
            (stringIndex + 1) * stringSpacing
          })`}
          onClick={() =>
            handleNoteClick(
              openNote,
              calculateNoteWithOctave(openNote, stringIndex, 0)
            )
          }
          className="cursor-pointer"
        >
          <title>{calculateNoteWithOctave(openNote, stringIndex, 0)}</title>
          <circle
            r={isNoteHighlighted(openNote) ? circleRadius * 1.15 : circleRadius}
            fill={getNoteColor(
              openNote,
              scale,
              isDarkMode,
              highlightRoots
            )}
            className="transition-all duration-200"
            style={{
              filter: isNoteHighlighted(openNote) ? 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' : 'none'
            }}
          />
          <text
            fill={
              isDarkMode
                ? "#1f2937"
                : openNote === scale.root
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
              ? getScaleDegree(openNote, scale)
              : showFlats
              ? sharpToFlat(openNote)
              : openNote}
          </text>
        </g>
      )}

      {/* Fretted notes - use virtualization for large fretboards */}
      {fretCount > 24 ? (
        <VirtualizedFrettedNotes
          openNote={openNote}
          stringIndex={stringIndex}
          fretCount={fretCount}
          dimensions={dimensions}
          stringSpacing={stringSpacing}
          scale={scale}
          isDarkMode={isDarkMode}
          showDegrees={showDegrees}
          showFlats={showFlats}
          highlightRoots={highlightRoots}
          flipX={flipX}
          flipY={flipY}
          calculateNoteWithOctave={calculateNoteWithOctave}
          fretPositions={fretPositions[stringIndex] || []}
        />
      ) : (
        <FrettedNotes
          openNote={openNote}
          stringIndex={stringIndex}
          fretCount={fretCount}
          dimensions={dimensions}
          stringSpacing={stringSpacing}
          scale={scale}
          isDarkMode={isDarkMode}
          showDegrees={showDegrees}
          showFlats={showFlats}
          highlightRoots={highlightRoots}
          flipX={flipX}
          flipY={flipY}
          calculateNoteWithOctave={calculateNoteWithOctave}
          fretPositions={fretPositions[stringIndex] || []}
        />
      )}
    </>
  );
});

NotesDisplay.displayName = 'NotesDisplay';