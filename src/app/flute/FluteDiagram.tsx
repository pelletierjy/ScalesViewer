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

/* ------------------------------------------------------------------ */
/*  Realistic key layout for a Boehm-system concert flute             */
/*  Positions are percentages along the tube (0 = head, 100 = foot)   */
/* ------------------------------------------------------------------ */

interface KeyLayout {
  x: number; // 0–100 along the tube
  y: number; // vertical offset from tube center (- = above, + = below)
  type: "hole" | "lever-left" | "lever-right" | "foot";
  rx?: number; // ellipse radius x (for holes)
  ry?: number; // ellipse radius y
  width?: number; // for levers
  height?: number;
}

const KEY_LAYOUTS: Record<string, KeyLayout> = {
  thumb:   { x: 6,  y: -10, type: "hole", rx: 5.5, ry: 4 },
  l1:      { x: 16, y: 0,   type: "hole", rx: 5.5, ry: 4 },
  l2:      { x: 26, y: 0,   type: "hole", rx: 5.5, ry: 4 },
  l3:      { x: 36, y: 0,   type: "hole", rx: 5.5, ry: 4 },
  r1:      { x: 48, y: 0,   type: "hole", rx: 5.5, ry: 4 },
  r2:      { x: 58, y: 0,   type: "hole", rx: 5.5, ry: 4 },
  r3:      { x: 68, y: 0,   type: "hole", rx: 5.5, ry: 4 },
  eb:      { x: 72, y: 10,  type: "lever-right", width: 7, height: 3.5 },
  gsharp:  { x: 78, y: -10, type: "lever-left",  width: 7, height: 3.5 },
  c:       { x: 84, y: 0,   type: "hole", rx: 5, ry: 3.5 },
  csharp:  { x: 88, y: 10,  type: "lever-right", width: 6, height: 3 },
  b:       { x: 92, y: -10, type: "lever-left",  width: 6, height: 3 },
  lowc:    { x: 97, y: 8,   type: "foot", width: 5, height: 4 },
  lowcsharp:{ x: 97, y: -8,  type: "foot", width: 5, height: 4 },
  lowd:    { x: 94, y: 0,   type: "hole", rx: 4.5, ry: 3.5 },
};

/* ------------------------------------------------------------------ */

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

  const match = note.match(/^([A-G][#b]?)(\d+)$/);
  const noteName = match ? (match[1] as Note) : ("C" as Note);

  const handleClick = () => onPlay(note);
  const handleKeyDown = (e: React.KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPlay(note);
    }
  };

  const closedFill = isDarkMode ? "#d1d5db" : "#1f2937";
  const openStroke = isDarkMode ? "#9ca3af" : "#4b5563";
  const tubeFill = isDarkMode ? "#374151" : "#e5e7eb";
  const tubeStroke = isDarkMode ? "#6b7280" : "#9ca3af";
  const leverFill = isDarkMode ? "#6b7280" : "#d1d5db";
  const leverStroke = isDarkMode ? "#9ca3af" : "#6b7280";

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

  /* helpers ---------------------------------------------------------- */
  const keyState = (id: string) =>
    fingering?.keys.find((k) => k.keyId === id);

  const isClosed = (id: string) => keyState(id)?.closed ?? false;

  const tubeLength = 260;
  const tubeY = 50;
  const tubeH = 24;

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
      {/* Focus outline */}
      {isFocused && (
        <rect
          x={-8}
          y={-14}
          width={tubeLength + 56}
          height={tubeH + 52}
          rx={8}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={2.5}
          className="transition-colors duration-200"
        />
      )}

      {/* Note label */}
      <text
        x={tubeLength / 2 + 20}
        y={-2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={noteColor}
        fontSize="15"
        fontWeight="bold"
        className="select-none"
      >
        {labelText}
      </text>

      {/* ====== FLUTE BODY ====== */}

      {/* Main tube */}
      <rect
        x={0}
        y={tubeY}
        width={tubeLength}
        height={tubeH}
        rx={12}
        fill={tubeFill}
        stroke={tubeStroke}
        strokeWidth={1}
        className="transition-colors duration-200"
      />

      {/* Embouchure hole (lip plate) */}
      <ellipse
        cx={14}
        cy={tubeY + tubeH / 2}
        rx={10}
        ry={7}
        fill={isDarkMode ? "#1f2937" : "#f3f4f6"}
        stroke={tubeStroke}
        strokeWidth={1}
      />
      <ellipse
        cx={14}
        cy={tubeY + tubeH / 2}
        rx={6}
        ry={4}
        fill={isDarkMode ? "#111827" : "#d1d5db"}
      />

      {/* Tenon joints (subtle rings) */}
      <rect x={78} y={tubeY - 1} width={3} height={tubeH + 2} rx={1} fill={tubeStroke} opacity={0.5} />
      <rect x={158} y={tubeY - 1} width={3} height={tubeH + 2} rx={1} fill={tubeStroke} opacity={0.5} />

      {/* Foot joint end cap */}
      <rect
        x={tubeLength - 4}
        y={tubeY + 2}
        width={4}
        height={tubeH - 4}
        rx={2}
        fill={tubeStroke}
        opacity={0.6}
      />

      {/* ====== KEYS ====== */}

      {fingering?.keys.map((key) => {
        const layout = KEY_LAYOUTS[key.keyId];
        if (!layout) return null;

        const kx = (layout.x / 100) * tubeLength;
        const ky = tubeY + tubeH / 2 + layout.y;

        if (layout.type === "hole") {
          return (
            <g key={key.keyId}>
              {/* Pad cup (key surround) */}
              <ellipse
                cx={kx}
                cy={ky}
                rx={(layout.rx ?? 5) + 2}
                ry={(layout.ry ?? 4) + 1.5}
                fill={isDarkMode ? "#4b5563" : "#9ca3af"}
                opacity={0.4}
              />
              {/* Hole */}
              <ellipse
                cx={kx}
                cy={ky}
                rx={layout.rx ?? 5}
                ry={layout.ry ?? 4}
                fill={key.closed ? closedFill : "none"}
                stroke={openStroke}
                strokeWidth={1.8}
                className="transition-colors duration-200"
              />
            </g>
          );
        }

        /* lever or foot key */
        const lw = layout.width ?? 6;
        const lh = layout.height ?? 3;
        return (
          <g key={key.keyId}>
            {/* Lever arm */}
            <line
              x1={kx}
              y1={tubeY + tubeH / 2}
              x2={kx}
              y2={ky}
              stroke={leverStroke}
              strokeWidth={1.2}
              opacity={0.6}
            />
            {/* Lever pad */}
            <rect
              x={kx - lw / 2}
              y={ky - lh / 2}
              width={lw}
              height={lh}
              rx={1.5}
              fill={key.closed ? closedFill : leverFill}
              stroke={openStroke}
              strokeWidth={1.5}
              className="transition-colors duration-200"
            />
          </g>
        );
      })}

      {/* ====== KEY LABELS (mini legend below) ====== */}
      <g transform={`translate(0, ${tubeY + tubeH + 14})`}>
        {fingering?.keys.map((key, i) => {
          const layout = KEY_LAYOUTS[key.keyId];
          if (!layout) return null;
          const kx = (layout.x / 100) * tubeLength;
          return (
            <text
              key={`label-${key.keyId}`}
              x={kx}
              y={0}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isDarkMode ? "#9ca3af" : "#4b5563"}
              fontSize="7"
              className="select-none"
            >
              {key.label}
            </text>
          );
        })}
      </g>
    </g>
  );
};
