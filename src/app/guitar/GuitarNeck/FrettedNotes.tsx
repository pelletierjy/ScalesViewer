import React from 'react';
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { calculateFretNote, isNoteInScale, getScaleDegree, sharpToFlat } from "@/lib/utils/scaleUtils";
import { playNote } from "@/lib/utils/audioUtils";
import { getNoteColor } from "./getNoteColor";
import { getFretPositions } from './getFretPositions';

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
  isMultiscale?: boolean;
  fretPositions?: number[];
}

export const FrettedNotes: React.FC<FrettedNotesProps> = ({
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
  isMultiscale = false,
  fretPositions = [],
}) => {
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
          : getFretPositions(dimensions.width, fretCount)[fretIndex];
          
        return (
          inScale && (
            <g
              key={`note-${stringIndex}-${fretIndex}`}
              transform={`translate(${
                fretPosition - stringSpacing / 4
              }, ${(stringIndex + 1) * stringSpacing})`}
              onClick={() => playNote(noteWithOctave)}
              className="cursor-pointer"
            >
              <circle
                r={Math.min(stringSpacing / 3.5, stringSpacing / 3.5)}
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
                fontSize={Math.min(stringSpacing / 3, stringSpacing / 3)}
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
}; 