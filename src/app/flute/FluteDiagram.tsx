"use client";

import React from "react";
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { getScaleDegree, SHARP_TO_FLAT, getScaleNotes } from "@/lib/utils/scaleUtils";

interface FluteDiagramProps {
  note: NoteWithOctave;
  scale: Scale;
  displayMode: "note" | "degree" | "flat";
  isDarkMode: boolean;
  highlightRoots: boolean;
  onPlay: (noteWithOctave: NoteWithOctave) => void;
}

type KeyDef = {
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  labelDy: number;
};

const DIAGRAM_W = 122;
const DIAGRAM_H = 320;
const TUBE_CX = 61;
const TUBE_W = 24;
const TUBE_X = TUBE_CX - TUBE_W / 2;

const KEYS: KeyDef[] = [
  { name: "thumb_B", x: 38, y: 10, w: 12, h: 9, r: 5, labelDy: -8 },
  { name: "thumb_C", x: 38, y: 24, w: 12, h: 9, r: 5, labelDy: -8 },
  { name: "thumb_D", x: 38, y: 38, w: 12, h: 9, r: 5, labelDy: -8 },
  { name: "G_key",  x: 38, y: 54, w: 12, h: 9, r: 5, labelDy: -8 },
  { name: "Eb",     x: 84, y: 88, w: 10, h: 8, r: 4, labelDy: -8 },
  { name: "F",      x: 84, y: 100, w: 10, h: 8, r: 4, labelDy: -8 },
  { name: "F#",     x: 84, y: 112, w: 10, h: 8, r: 4, labelDy: -8 },
  { name: "G",      x: 84, y: 124, w: 10, h: 8, r: 4, labelDy: -8 },
  { name: "G#",     x: 36, y: 212, w: 10, h: 8, r: 4, labelDy: 12 },
  { name: "C_foot", x: 61, y: 224, w: 10, h: 8, r: 4, labelDy: 12 },
  { name: "C#",     x: 86, y: 212, w: 10, h: 8, r: 4, labelDy: 12 },
];

// Ordered high->low: 3 subgroups of 3 holes each
const HOLES: { y: number }[][] = [
  [{ y: 152 }, { y: 170 }, { y: 188 }], // octave 3
  [{ y: 206 }, { y: 224 }, { y: 242 }], // octave 2
  [{ y: 260 }, { y: 278 }, { y: 296 }], // octave 1
];

const sharpToFlat = (note: Note): Note => SHARP_TO_FLAT[note] || note;

const inScale = (n: Note, s: Scale) => getScaleNotes(s).includes(n);

const noteColor = (
  note: Note,
  scale: Scale,
  isRoot: boolean,
  isDarkMode: boolean,
  highlightRoots: boolean
): string => {
  if (isRoot) return isDarkMode ? "#f3f4f6" : "#000000";
  if (highlightRoots) return isDarkMode ? "#60a5fa" : "#3b82f6";
  const degree = getScaleDegree(note, scale);
  const norm = ["♭2", "♭3", "♭5", "♭6", "♭7"].includes(degree)
    ? degree.replace("♭", "")
    : degree;
  switch (norm) {
    case "2": return isDarkMode ? "#059669" : "#047857";
    case "3": return isDarkMode ? "#ea580c" : "#c2410c";
    case "4": return isDarkMode ? "#34d399" : "#10b981";
    case "5": return isDarkMode ? "#f97316" : "#ea580c";
    case "6": return isDarkMode ? "#6ee7b7" : "#34d399";
    case "7": return isDarkMode ? "#fb923c" : "#f97316";
    default: return isDarkMode ? "#9ca3af" : "#6b7280";
  }
};

export default function FluteDiagram({
  note,
  scale,
  displayMode,
  isDarkMode,
  highlightRoots,
  onPlay,
}: FluteDiagramProps) {
  const raw = note.replace(/\d/, "") as Note;
  const isRoot = raw === scale.root;

  const handleClick = () => {
    if (inScale(raw, scale)) onPlay(note);
  };

  const label = () => {
    if (displayMode === "degree") return getScaleDegree(raw, scale);
    if (displayMode === "flat") return sharpToFlat(raw);
    return raw;
  };

  return (
    <g>
      {/* Body bg */}
      <rect
        x={0}
        y={0}
        width={DIAGRAM_W}
        height={DIAGRAM_H}
        rx={14}
        fill={isDarkMode ? "#374151" : "#e5e7eb"}
        className="transition-colors duration-200"
      />

      {/* Embouchure */}
      <ellipse
        cx={TUBE_CX}
        cy={18}
        rx={16}
        ry={7}
        fill={isDarkMode ? "#1f2937" : "#ffffff"}
        stroke={isDarkMode ? "#6b7280" : "#9ca3af"}
        strokeWidth={1}
      />

      {/* Tube */}
      <rect
        x={TUBE_X}
        y={26}
        width={TUBE_W}
        height={236}
        rx={12}
        fill={isDarkMode ? "#6b7280" : "#d1d5db"}
        stroke={isDarkMode ? "#1f2937" : "#ffffff"}
        strokeWidth={1}
      />

      {/* Tenon rings */}
      <rect x={TUBE_X - 2} y={140} width={TUBE_W + 4} height={8} rx={3} fill={isDarkMode ? "#9ca3af" : "#ffffff"} />
      <rect x={TUBE_X - 2} y={180} width={TUBE_W + 4} height={8} rx={3} fill={isDarkMode ? "#9ca3af" : "#ffffff"} />

      {/* Foot cap */}
      <path
        d={`M ${TUBE_X} 262 L ${TUBE_X + TUBE_W} 262 L ${TUBE_X + TUBE_W - 5} 296 Q ${TUBE_CX} 306 ${TUBE_X + 5} 296 Z`}
        fill={isDarkMode ? "#6b7280" : "#b0b7c3"}
      />

      {/* Holes */}
      {HOLES.map((row, ri) =>
        row.map((hole, hi) => {
          const hx = TUBE_CX + (hi - 1) * 9;
          const hy = hole.y;
          const active = inScale(raw, scale);
          if (!active) return null;
          const nr = isRoot;
          return (
            <g key={`hole-${ri}-${hi}`} onClick={handleClick} className="cursor-pointer">
              <circle
                cx={hx}
                cy={hy}
                r={8}
                fill={noteColor(raw, scale, nr, isDarkMode, highlightRoots)}
                stroke={isDarkMode ? "#1f2937" : "#000000"}
                strokeWidth={1}
              />
              <text
                x={hx}
                y={hy}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isDarkMode ? "#1f2937" : nr ? "#ffffff" : "#1f2937"}
                fontSize="9"
                className="select-none font-bold"
              >
                {label()}
              </text>
            </g>
          );
        })
      )}

      {/* Keys */}
      {KEYS.map((k) => {
        const active = inScale(raw, scale);
        if (!active) return null;
        return (
          <g key={k.name} onClick={handleClick} className="cursor-pointer">
            <rect
              x={k.x - k.w / 2}
              y={k.y}
              width={k.w}
              height={k.h}
              rx={k.r}
              fill={isDarkMode ? "#4b5563" : "#ffffff"}
              stroke={isDarkMode ? "#1f2937" : "#000000"}
              strokeWidth={1}
            />
            <text
              x={k.x}
              y={k.y + k.h / 2 + k.labelDy}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isDarkMode ? "#e5e7eb" : "#374151"}
              fontSize="7"
              className="select-none"
            >
              {k.name.replace("_", " ")}
            </text>
          </g>
        );
      })}
    </g>
  );
}
