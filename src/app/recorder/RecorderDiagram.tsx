"use client";

import React from "react";
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { getScaleDegree, SHARP_TO_FLAT } from "@/lib/utils/scaleUtils";
import { getRecorderFingering } from "@/lib/utils/recorderUtils";
import { RecorderHoleRenderState, RecorderType } from "./recorderFingerings";
import { getScaleNoteColor } from "@/app/guitar/GuitarNeck/getScaleNoteColor";

export interface RecorderDiagramProps {
  note: NoteWithOctave;
  recorder: RecorderType;
  scale: Scale;
  displayMode: "note" | "flat" | "degree";
  isDarkMode: boolean;
  highlightRoots: boolean;
  onPlay: (note: NoteWithOctave) => void;
  /** Optional chord/pattern highlight override applied to the note label color. */
  getHighlightColor?: (noteName: Note, fallback: string) => string;
}

const sharpToFlat = (note: Note): Note => {
  return SHARP_TO_FLAT[note] || note;
};

// Vertical layout of a single recorder column (kept aligned with page.tsx spacing).
const BODY_X = -15;
const BODY_WIDTH = 30;
const BODY_TOP = 44;
const BODY_HEIGHT = 300;
const WINDOW_Y = 62;
const THUMB_Y = 90;
const THUMB_X = -13;
const FIRST_HOLE_Y = 112;
const HOLE_SPACING = 23;
const DIVIDER_AFTER = 3; // extra gap between left-hand (1-3) and right-hand (4-7) holes
const LABEL_X = 22;

// Y position of the n-th front hole (holes 1..7 → index 0..6), with a small gap
// between the left- and right-hand groups to echo a real recorder's body.
const frontHoleY = (index: number): number =>
  FIRST_HOLE_Y + index * HOLE_SPACING + (index >= DIVIDER_AFTER ? 10 : 0);

export const RecorderDiagram: React.FC<RecorderDiagramProps> = ({
  note,
  recorder,
  scale,
  displayMode,
  isDarkMode,
  highlightRoots,
  onPlay,
  getHighlightColor,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const gradientId = React.useId();
  const fingering = getRecorderFingering(note, recorder);

  // Extract note name and octave.
  const match = note.match(/^([A-G][#b]?)(\d+)$/);
  const noteName = match ? (match[1] as Note) : ("C" as Note);
  const octave = match ? parseInt(match[2], 10) : 4;

  const handleClick = () => onPlay(note);
  const handleKeyDown = (e: React.KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPlay(note);
    }
  };

  // Wooden body shading.
  const woodStops = isDarkMode
    ? ["#8a6a48", "#6f5236", "#513c28", "#6f5236", "#8a6a48"]
    : ["#efd6b3", "#dcb98c", "#c69f6f", "#dcb98c", "#f0dcc0"];
  const woodStroke = isDarkMode ? "#3f2f1f" : "#8a6d4b";
  const ringBand = isDarkMode ? "#2f2417" : "#a07d54";

  // Holes: closed = filled (covered), open = hollow ring.
  const closedFill = isDarkMode ? "#f3f4f6" : "#1f2937";
  const openFill = isDarkMode ? "#241a10" : "#fbf3e6";
  const holeStroke = isDarkMode ? "#d8bd97" : "#5b4327";

  const labelText = (() => {
    if (displayMode === "degree") {
      return getScaleDegree(noteName, scale);
    }
    if (displayMode === "flat") {
      return sharpToFlat(noteName);
    }
    return noteName;
  })();

  const baseNoteColor = getScaleNoteColor(noteName, scale, isDarkMode, highlightRoots);
  const noteColor = getHighlightColor
    ? getHighlightColor(noteName, baseNoteColor)
    : baseNoteColor;

  // Render a single covered/open/half hole cup at (cx, cy).
  const renderCup = (
    cx: number,
    cy: number,
    r: number,
    state: RecorderHoleRenderState["state"]
  ) => (
    <>
      <circle cx={cx} cy={cy} r={r} fill={openFill} stroke={holeStroke} strokeWidth={1.5} />
      {state === "closed" && (
        <circle cx={cx} cy={cy} r={r - 3} fill={closedFill} className="transition-colors duration-200" />
      )}
      {state === "half" && (
        <path
          d={`M ${cx} ${cy - (r - 3)} A ${r - 3} ${r - 3} 0 0 1 ${cx} ${cy + (r - 3)} Z`}
          fill={closedFill}
          className="transition-colors duration-200"
        />
      )}
    </>
  );

  return (
    <g
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role="button"
      tabIndex={0}
      aria-label={`Play ${note} on recorder`}
      className="cursor-pointer focus:outline-none"
      style={{ outline: "none" }}
    >
      <defs>
        {/* Left-to-right shading gives the body a rounded, turned-wood look */}
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          {woodStops.map((color, i) => (
            <stop
              key={i}
              offset={`${(i / (woodStops.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
      </defs>

      {/* Focus ring */}
      {isFocused && (
        <rect
          x={-34}
          y={0}
          width={68}
          height={362}
          rx={6}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={3}
          className="transition-colors duration-200"
        />
      )}

      {/* Note label above the recorder */}
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
        <tspan fontSize="10" dy={-6} fill={isDarkMode ? "#9ca3af" : "#6b7280"}>
          {octave}
        </tspan>
      </text>

      {/* Beak / mouthpiece at the very top */}
      <path
        d={`M ${BODY_X + 4} ${BODY_TOP} L ${BODY_X + 6} 30 Q 0 24 ${BODY_WIDTH / 2 - 1} 30 L ${
          BODY_X + BODY_WIDTH - 4
        } ${BODY_TOP} Z`}
        fill={`url(#${gradientId})`}
        stroke={woodStroke}
        strokeWidth={1}
      />

      {/* Recorder body (head → foot), a rounded turned-wood pipe */}
      <rect
        x={BODY_X}
        y={BODY_TOP}
        width={BODY_WIDTH}
        height={BODY_HEIGHT}
        rx={BODY_WIDTH / 2}
        fill={`url(#${gradientId})`}
        stroke={woodStroke}
        strokeWidth={1}
        className="transition-colors duration-200"
      />
      {/* Specular highlight down the length of the body */}
      <rect
        x={BODY_X + 5}
        y={BODY_TOP + 6}
        width={3}
        height={BODY_HEIGHT - 12}
        rx={1.5}
        fill={isDarkMode ? "#d8bd97" : "#ffffff"}
        opacity={0.35}
      />

      {/* Decorative turned rings marking the head/body/foot joints */}
      {[BODY_TOP + 30, BODY_HEIGHT + BODY_TOP - 40].map((y) => (
        <rect
          key={y}
          x={BODY_X - 1}
          y={y}
          width={BODY_WIDTH + 2}
          height={4}
          rx={2}
          fill={ringBand}
        />
      ))}

      {/* Fipple window (labium) on the head joint */}
      <path
        d={`M -6 ${WINDOW_Y - 6} L 6 ${WINDOW_Y - 6} L 4 ${WINDOW_Y + 6} L -4 ${WINDOW_Y + 6} Z`}
        fill={isDarkMode ? "#0b0f19" : "#3b2c1a"}
        stroke={woodStroke}
        strokeWidth={1}
      />

      {/* Holes: covered = filled, open = hollow. Only drawn for in-range notes. */}
      {fingering?.holes.map((hole) => {
        if (hole.thumb) {
          // Thumb hole sits on the back of the instrument: drawn offset with a post.
          return (
            <g key={hole.holeId} transform={`translate(0, ${THUMB_Y})`}>
              <line x1={0} y1={0} x2={THUMB_X} y2={0} stroke={holeStroke} strokeWidth={2} />
              {renderCup(THUMB_X, 0, 7, hole.state)}
              <text
                x={THUMB_X - 12}
                y={0}
                textAnchor="end"
                dominantBaseline="middle"
                fill={isDarkMode ? "#d1d5db" : "#374151"}
                fontSize="9"
                className="select-none"
              >
                {hole.label}
              </text>
            </g>
          );
        }

        // Front holes 1..7 → index 0..6.
        const index = parseInt(hole.label, 10) - 1;
        const y = frontHoleY(index);

        return (
          <g key={hole.holeId} transform={`translate(0, ${y})`}>
            {hole.isDouble ? (
              <>
                {renderCup(-6, 0, 5, hole.left ?? "open")}
                {renderCup(6, 0, 5, hole.right ?? "open")}
              </>
            ) : (
              renderCup(0, 0, 7.5, hole.state)
            )}
            <text
              x={LABEL_X}
              y={0}
              dominantBaseline="middle"
              fill={isDarkMode ? "#d1d5db" : "#374151"}
              fontSize="9"
              className="select-none"
            >
              {hole.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};
