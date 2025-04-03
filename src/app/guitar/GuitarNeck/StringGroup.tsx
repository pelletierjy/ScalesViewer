import React from 'react';
import { Note } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { TuningPreset } from "../types/tuningPreset";
import { getStringThickness } from "./getStringThickness";
import { NotesDisplay } from "./NotesDisplay";

interface StringGroupProps {
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
  calculateNoteWithOctave: (openNote: Note, stringIndex: number, fret: number) => string;
}

export const StringGroup: React.FC<StringGroupProps> = ({
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

            {/* Notes Display */}
            <NotesDisplay
              adjustedTuning={adjustedTuning}
              dimensions={dimensions}
              stringSpacing={stringSpacing}
              fretCount={fretCount}
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