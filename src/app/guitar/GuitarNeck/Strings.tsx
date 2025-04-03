import React from 'react';
import { Note } from "@/lib/utils/note";
import { getStringThickness } from "./getStringThickness";

interface StringsProps {
  openNote: Note;
  stringIndex: number;
  stringCount: number;
  dimensions: { width: number; height: number };
  stringSpacing: number;
  isDarkMode: boolean;
}

export const Strings: React.FC<StringsProps> = ({
  openNote,
  stringIndex,
  stringCount,
  dimensions,
  stringSpacing,
  isDarkMode,
}) => {
  return (
    <>
      {/* String line */}
      <line
        x1={0}
        y1={(stringIndex + 1) * stringSpacing}
        x2={dimensions.width}
        y2={(stringIndex + 1) * stringSpacing}
        stroke={isDarkMode ? "#9ca3af" : "#666"}
        strokeWidth={getStringThickness(stringIndex, stringCount)}
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
        <title>{`String ${stringCount - stringIndex}: ${openNote}`}</title>
        {openNote}
      </text>
    </>
  );
}; 