"use client";
import React from "react";
import { isNoteInScale, formatNoteLabel, sharpToFlat } from "@/lib/utils/scaleUtils";
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { InstrumentViewProps } from "@/components/InstrumentWorkspace/types";
import { useLocale } from "next-intl";

// Standard 17-key kalimba layout (from center outward)
const KALIMBA_NOTES: Note[] = [
  "D", // Center tine
  "B",
  "G",
  "E",
  "C",
  "A",
  "F",
  "D", // Leftmost tine
  "F",
  "A",
  "C",
  "E",
  "G",
  "B",
  "D",
  "F",
  "A", // Rightmost tine
];

export const useKalimbaSettings = (): void => undefined;

export const KalimbaView: React.FC<InstrumentViewProps> = ({
  scale,
  displayMode,
  isDarkMode,
  getNoteColor,
  onPlay,
}) => {
  const locale = useLocale();

  // Kalimba spans octaves 4-6; the middle tine (index 8) is usually G5.
  const handleNoteClick = (note: Note, index: number): void => {
    const octave = 5 + Math.floor((index - 8) / 7);
    onPlay(`${note}${octave}` as NoteWithOctave);
  };

  return (
    <svg width="100%" height="400" viewBox="0 0 800 400">
      {/* Kalimba body */}
      <path
        d="M200,350 L600,350 Q650,350 650,300 L650,150 Q650,100 600,100 L200,100 Q150,100 150,150 L150,300 Q150,350 200,350 Z"
        fill={isDarkMode ? "#4b5563" : "#d1d5db"}
        className="transition-colors duration-200"
      />

      {/* Sound hole */}
      <circle
        cx="400"
        cy="250"
        r="40"
        fill={isDarkMode ? "#1f2937" : "#ffffff"}
        className="transition-colors duration-200"
      />

      {/* Tines */}
      {KALIMBA_NOTES.map((note, i) => {
        const inScale = isNoteInScale(note, scale);
        const isRoot = note === scale.root;
        const offset = i - Math.floor(KALIMBA_NOTES.length / 2);
        const x = 400 + offset * 30;
        const height = 180 - Math.abs(offset) * 8;

        return (
          <g key={i}>
            <rect
              x={x - 5}
              y={120}
              width={10}
              height={height}
              rx={5}
              fill={isDarkMode ? "#6b7280" : "#9ca3af"}
              className="transition-colors duration-200"
            />

            <g
              transform={`translate(${x}, ${120 + height + 20})`}
              onClick={() => handleNoteClick(note, i)}
              className="cursor-pointer"
            >
              <circle
                r={15}
                fill={
                  inScale
                    ? getNoteColor(note)
                    : isDarkMode
                    ? "#374151"
                    : "#e5e7eb" // Gray-700/200 for non-scale notes
                }
                className="transition-colors duration-200 hover:fill-opacity-90"
              />
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fill={
                  inScale
                    ? isDarkMode
                      ? "#1f2937"
                      : isRoot
                      ? "#ffffff"
                      : "#1f2937"
                    : isDarkMode
                    ? "#9ca3af"
                    : "#6b7280"
                }
                fontSize="12"
                className="select-none font-bold transition-colors duration-200"
              >
                {inScale
                  ? formatNoteLabel(note, scale, displayMode, locale)
                  : displayMode === "flat"
                  ? formatNoteLabel(note, scale, "flat", locale)
                  : formatNoteLabel(note, scale, "note", locale)}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};
