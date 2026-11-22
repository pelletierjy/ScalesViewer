"use client";

import React from "react";
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { DisplayMode, formatNoteLabel } from "@/lib/utils/scaleUtils";
import { getTrumpetFingering } from "@/lib/utils/trumpetUtils";
import { TrumpetType, ValveNumber } from "./trumpetFingerings";
import { getScaleNoteColor } from "@/lib/utils/noteColors";
import { useTranslations, useLocale } from "next-intl";

export interface TrumpetDiagramProps {
  note: NoteWithOctave;
  trumpet: TrumpetType;
  scale: Scale;
  displayMode: DisplayMode;
  isDarkMode: boolean;
  highlightRoots: boolean;
  onPlay: (note: NoteWithOctave) => void;
  /** Optional chord/pattern highlight override applied to the note label color. */
  getHighlightColor?: (noteName: Note, fallback: string) => string;
}

// Vertical trumpet schematic: mouthpiece on top, valve block in the middle,
// bell at the bottom. Everything is drawn from x = 0, y = 0 of the strip cell.
const TUBE_HALF = 6;
const MOUTHPIECE_TOP = 40;
const MOUTHPIECE_BOTTOM = 60;
const BLOCK_X = -32;
const BLOCK_Y = 140;
const BLOCK_W = 64;
const BLOCK_H = 60;
const BELL_START = 296;
const BELL_END = 342;
const VALVE_X: Record<ValveNumber, number> = { 1: -21, 2: 0, 3: 21 };
const CAP_R = 9;
/** Piston cap centre when the valve is up / pressed (it sinks into the block). */
const CAP_UP_CY = BLOCK_Y - CAP_R;
const CAP_DOWN_CY = BLOCK_Y - CAP_R + 6;
const VALVE_LABEL_Y = BLOCK_Y + 34;
const SUMMARY_Y = 364;

export const TrumpetDiagram: React.FC<TrumpetDiagramProps> = ({
  note,
  trumpet,
  scale,
  displayMode,
  isDarkMode,
  highlightRoots,
  onPlay,
  getHighlightColor,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const [isFocused, setIsFocused] = React.useState(false);
  const gradientId = React.useId();
  const fingering = getTrumpetFingering(note, trumpet);

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

  // Brass body shading.
  const brassStops = isDarkMode
    ? ["#b98c3c", "#9a7129", "#78551e", "#9a7129", "#b98c3c"]
    : ["#f6d98a", "#e3b95a", "#c2913a", "#e3b95a", "#f6d98a"];
  const brassStroke = isDarkMode ? "#4a3410" : "#7a5617";
  const capOpenFill = isDarkMode ? "#2a1f12" : "#f7f1e3";
  const capPressedFill = isDarkMode ? "#f3f4f6" : "#1f2937";
  const labelFill = isDarkMode ? "#d1d5db" : "#374151";

  const labelText = formatNoteLabel(noteName, scale, displayMode, locale);

  const baseNoteColor = getScaleNoteColor(noteName, scale, isDarkMode, highlightRoots);
  const noteColor = getHighlightColor
    ? getHighlightColor(noteName, baseNoteColor)
    : baseNoteColor;

  // Summary under the bell: "0" when open, "1-3" when valves are down,
  // an en dash when the note is off the chart.
  const summary = fingering
    ? fingering.valves.length > 0
      ? fingering.valves.join("-")
      : "0"
    : "–";

  const isPressed = (valve: ValveNumber): boolean =>
    !!fingering && fingering.valves.includes(valve);

  return (
    <g
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role="button"
      tabIndex={0}
      aria-label={t("ui.playNoteOnTrumpet", { note })}
      className="cursor-pointer focus:outline-none"
      style={{ outline: "none" }}
    >
      <defs>
        {/* Left-to-right shading gives the body a rounded, metallic look */}
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          {brassStops.map((color, i) => (
            <stop
              key={i}
              offset={`${(i / (brassStops.length - 1)) * 100}%`}
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
          height={372}
          rx={6}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={3}
          className="transition-colors duration-200"
        />
      )}

      {/* Note label above the trumpet */}
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

      {/* Mouthpiece: a small cup flaring open at the top */}
      <path
        d={`M -14 ${MOUTHPIECE_TOP} L 14 ${MOUTHPIECE_TOP} L ${TUBE_HALF} ${MOUTHPIECE_BOTTOM} L -${TUBE_HALF} ${MOUTHPIECE_BOTTOM} Z`}
        fill={`url(#${gradientId})`}
        stroke={brassStroke}
        strokeWidth={1}
      />

      {/* Leadpipe above the valve block */}
      <rect
        x={-TUBE_HALF}
        y={MOUTHPIECE_BOTTOM}
        width={TUBE_HALF * 2}
        height={BLOCK_Y - MOUTHPIECE_BOTTOM}
        fill={`url(#${gradientId})`}
        stroke={brassStroke}
        strokeWidth={1}
      />

      {/* Valve block: three pistons side by side, pressed ones sunk and filled */}
      <rect
        x={BLOCK_X}
        y={BLOCK_Y}
        width={BLOCK_W}
        height={BLOCK_H}
        rx={5}
        fill={`url(#${gradientId})`}
        stroke={brassStroke}
        strokeWidth={1.5}
        className="transition-colors duration-200"
      />
      {([1, 2, 3] as ValveNumber[]).map((valve) => {
        const pressed = isPressed(valve);
        return (
          <g key={valve}>
            <circle
              cx={VALVE_X[valve]}
              cy={pressed ? CAP_DOWN_CY : CAP_UP_CY}
              r={CAP_R}
              fill={pressed ? capPressedFill : capOpenFill}
              stroke={brassStroke}
              strokeWidth={1.5}
              // Off the chart: the valves stay up but fade back so the diagram
              // never reads as a confident "open" fingering.
              opacity={fingering ? 1 : 0.4}
              className="transition-colors duration-200"
            />
            <text
              x={VALVE_X[valve]}
              y={VALVE_LABEL_Y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={labelFill}
              fontSize="11"
              fontWeight="bold"
              className="select-none"
            >
              {valve}
            </text>
          </g>
        );
      })}

      {/* Body tube from the valve block down to the bell */}
      <rect
        x={-TUBE_HALF}
        y={BLOCK_Y + BLOCK_H}
        width={TUBE_HALF * 2}
        height={BELL_START - (BLOCK_Y + BLOCK_H)}
        fill={`url(#${gradientId})`}
        stroke={brassStroke}
        strokeWidth={1}
      />

      {/* Bell */}
      <path
        d={`M -${TUBE_HALF} ${BELL_START} L -22 ${BELL_END} Q 0 ${BELL_END + 8} 22 ${BELL_END} L ${TUBE_HALF} ${BELL_START} Z`}
        fill={`url(#${gradientId})`}
        stroke={brassStroke}
        strokeWidth={1}
      />

      {/* Fingering summary (0 = open, 1-3 = valves down, – = off the chart) */}
      <text
        x={0}
        y={SUMMARY_Y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={fingering ? labelFill : isDarkMode ? "#6b7280" : "#9ca3af"}
        fontSize="13"
        fontWeight="bold"
        className="select-none"
      >
        {summary}
      </text>
    </g>
  );
};
