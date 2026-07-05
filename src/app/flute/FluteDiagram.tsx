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

// Vertical layout of a single flute column (kept aligned with page.tsx spacing)
const TUBE_X = -16;
const TUBE_WIDTH = 32;
const TUBE_TOP = 40;
const TUBE_HEIGHT = 310;
const EMBOUCHURE_Y = 56;
const FIRST_KEY_Y = 78;
const KEY_SPACING = 17;

export const FluteDiagram: React.FC<FluteDiagramProps> = ({
  note,
  scale,
  displayMode,
  isDarkMode,
  highlightRoots,
  onPlay,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const gradientId = React.useId();
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

  // Metallic tube shading
  const tubeStops = isDarkMode
    ? ["#6b7280", "#374151", "#1f2937", "#374151", "#6b7280"]
    : ["#f8fafc", "#cbd5e1", "#94a3b8", "#cbd5e1", "#f1f5f9"];
  const tubeStroke = isDarkMode ? "#111827" : "#94a3b8";

  // Key cups: closed = filled (pressed), open = hollow ring
  const closedFill = isDarkMode ? "#e5e7eb" : "#1f2937";
  const openFill = isDarkMode ? "#111827" : "#ffffff";
  const ringStroke = isDarkMode ? "#9ca3af" : "#475569";
  const embouchureFill = isDarkMode ? "#0b0f19" : "#334155";

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
      <defs>
        {/* Left-to-right silver shading gives the tube a rounded, metallic look */}
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          {tubeStops.map((color, i) => (
            <stop
              key={i}
              offset={`${(i / (tubeStops.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
      </defs>

      {/* Focus ring */}
      {isFocused && (
        <rect
          x={-36}
          y={0}
          width={72}
          height={360}
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
        y={18}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={noteColor}
        fontSize="16"
        fontWeight="bold"
        className="select-none"
      >
        {labelText}
        {octave !== startOctave && (
          <tspan fontSize="10" dy={-6} fill={isDarkMode ? "#9ca3af" : "#6b7280"}>
            {octave}
          </tspan>
        )}
      </text>

      {/* Flute tube (headjoint → foot), drawn as a rounded metallic pipe */}
      <rect
        x={TUBE_X}
        y={TUBE_TOP}
        width={TUBE_WIDTH}
        height={TUBE_HEIGHT}
        rx={TUBE_WIDTH / 2}
        fill={`url(#${gradientId})`}
        stroke={tubeStroke}
        strokeWidth={1}
        className="transition-colors duration-200"
      />
      {/* Specular highlight down the length of the tube */}
      <rect
        x={TUBE_X + 5}
        y={TUBE_TOP + 4}
        width={4}
        height={TUBE_HEIGHT - 8}
        rx={2}
        fill={isDarkMode ? "#9ca3af" : "#ffffff"}
        opacity={0.5}
      />

      {/* Embouchure hole (lip plate) on the headjoint */}
      <ellipse
        cx={0}
        cy={EMBOUCHURE_Y}
        rx={11}
        ry={7}
        fill={embouchureFill}
        stroke={ringStroke}
        strokeWidth={1.5}
      />

      {/* Key cups: filled = closed/pressed, hollow = open */}
      {fingering?.keys.map((key, i) => (
        <g key={key.keyId} transform={`translate(0, ${FIRST_KEY_Y + i * KEY_SPACING})`}>
          {/* Key ring seat */}
          <circle r={8.5} fill={openFill} stroke={ringStroke} strokeWidth={1.5} />
          {/* Closed indicator fills the cup */}
          {key.closed && (
            <circle r={5.5} fill={closedFill} className="transition-colors duration-200" />
          )}
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
