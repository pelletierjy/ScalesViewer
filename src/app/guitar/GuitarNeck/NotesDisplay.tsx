import React from 'react';
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { calculateFretNote, isNoteInScale, getScaleDegree, sharpToFlat } from "@/lib/utils/scaleUtils";
import { playNote } from "@/lib/utils/audioUtils";
import { getNoteColor } from "./getNoteColor";
import { getStringThickness } from "./getStringThickness";
import { TuningPreset } from "../types/tuningPreset";
import { getFretPositions } from './getFretPositions';
import { FrettedNotes } from './FrettedNotes';

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
}

export const NotesDisplay: React.FC<NotesDisplayProps> = ({
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
}) => {
  return (
    <>
      {[...adjustedTuning.strings]
        .reverse()
        .map((openNote, stringIndex) => (
          <g key={`string-${stringIndex}`} className="group">
            {/* String line */}
            <line
              x1={0}
              y1={(stringIndex + 1) * stringSpacing}
              x2={dimensions.width}
              y2={(stringIndex + 1) * stringSpacing}
              stroke={isDarkMode ? "#9ca3af" : "#666"}
              strokeWidth={getStringThickness(
                stringIndex,
                adjustedTuning.strings.length
              )}
              className="transition-colors duration-200"
            />

            {/* Tuning label */}
            <text
              x={-10}
              y={(stringIndex + 1) * stringSpacing}
              textAnchor="end"
              dominantBaseline="middle"
              fill={isDarkMode ? "#9ca3af" : "#666"}
              fontSize={Math.min(12, stringSpacing / 4)}
              className="transition-colors duration-200"
            >
              <title>{`String ${
                adjustedTuning.strings.length - stringIndex
              }: ${openNote}`}</title>
              {openNote}
            </text>

            {/* Zero fret note */}
            {isNoteInScale(openNote, scale) && (
              <g
                transform={`translate(${stringSpacing / 4}, ${
                  (stringIndex + 1) * stringSpacing
                })`}
                onClick={() =>
                  playNote(
                    calculateNoteWithOctave(openNote, stringIndex, 0)
                  )
                }
                className="cursor-pointer"
              >
                <circle
                  r={Math.min(stringSpacing / 3.5, stringSpacing / 3.5)}
                  fill={getNoteColor(
                    openNote,
                    scale,
                    isDarkMode,
                    highlightRoots
                  )}
                  className="transition-colors duration-200"
                />
                <text
                  fill={
                    isDarkMode
                      ? "#1f2937"
                      : openNote === scale.root
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
                    ? getScaleDegree(openNote, scale)
                    : showFlats
                    ? sharpToFlat(openNote)
                    : openNote}
                </text>
              </g>
            )}

            {/* Fretted notes */}
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
            />
          </g>
        ))}
    </>
  );
}; 