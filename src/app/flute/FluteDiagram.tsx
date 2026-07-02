"use client";

import React from "react";
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { getScaleDegree, SHARP_TO_FLAT } from "@/lib/utils/scaleUtils";
import { getFluteFingering } from "@/lib/utils/fluteUtils";
import { getScaleNoteColor } from "@/app/guitar/GuitarNeck/getScaleNoteColor";

export interface FluteDiagramProps {
  note: NoteWithOctave;
  scale: Scale;
  displayMode: "note" | "flat" | "degree";
  isDarkMode: boolean;
  highlightRoots: boolean;
  onPlay: (note: NoteWithOctave) => void;
}

const sharpToFlat = (note: Note): Note => {
  return SHARP_TO_FLAT[note] || note;
};

export const FluteDiagram: React.FC<FluteDiagramProps> = ({
  note,
  scale,
  displayMode,
  isDarkMode,
  highlightRoots,
  onPlay,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const fingering = getFluteFingering(note);

  // Extract note name and octave
  const match = note.match(/^([A-G][#b]?)(\d+)$/);
  const noteName = match ? (match[1] as Note) : ("C" as Note);
  const octave = match ? parseInt(match[2], 10) : 4;
  const startOctave = 4;

  const handleClick = () => onPlay(note);
  const handleKeyDown = (e: React.KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPlay(note);
    }
  };

  const closedFill = isDarkMode ? "#d1d5db" : "#1f2937";
  const openStroke = isDarkMode ? "#d1d5db" : "#1f2937";
  const bodyFill = isDarkMode ? "#4b5563" : "#d1d5db";

  const labelText = (() => {
    if (displayMode === "degree") {
      return getScaleDegree(noteName, scale);
    }
    if (displayMode === "flat") {
      return sharpToFlat(noteName);
    }
    return noteName;
  })();

  const noteColor = getScaleNoteColor(noteName, scale, isDarkMode, highlightRoots);

  return (
    <g
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role="button"
      tabIndex={0}
      aria-label={`Play ${note} on flute`}
      className="cursor-pointer focus:outline-none"
      style={{ outline: "none" }}
    >
      {/* Focus ring */}
      {isFocused && (
        <rect
          x={-36}
          y={0}
          width={72}
          height={350}
          rx={6}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={3}
          className="transition-colors duration-200"
        />
      )}

      {/* Note label above flute body */}
      <text
        x={0}
        y={20}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={noteColor}
        fontSize="16"
        fontWeight="bold"
        className="select-none"
      >
        {labelText}
      </text>

      {/* Octave indicator when different from starting octave */}
      {octave !== startOctave && (
        <text
          x={0}
          y={36}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={isDarkMode ? "#9ca3af" : "#6b7280"}
          fontSize="10"
          className="select-none"
        >
          {octave}
        </text>
      )}

      {/* Flute body */}
      <rect
        x={-30}
        y={44}
        width={60}
        height={300}
        rx={4}
        fill={bodyFill}
        className="transition-colors duration-200"
      />

      {/* Key holes */}
      {fingering?.keys.map((key, i) => (
        <g key={key.keyId} transform={`translate(0, ${60 + i * 18})`}>
          <circle
            r={8}
            fill={key.closed ? closedFill : "none"}
            stroke={openStroke}
            strokeWidth={2}
            className="transition-colors duration-200"
          />
          {/* Key label */}
          <text
            x={20}
            y={0}
            dominantBaseline="middle"
            fill={isDarkMode ? "#d1d5db" : "#374151"}
            fontSize="9"
            className="select-none"
          >
            {key.label}
          </text>
        </g>
      ))}
    </g>
  );
};
