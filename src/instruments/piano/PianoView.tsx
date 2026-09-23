"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNoteInScale, formatNoteLabel } from "@/lib/utils/scaleUtils";
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { selectNote } from "@/features/selectedNote/selectedNoteSlice";
import { RootState } from "@/app/store";
import { useLocalStorageNumber } from "@/lib/hooks/useLocalStorage";
import { Field, Select } from "@/components/ui";
import { InstrumentViewProps } from "@/components/InstrumentWorkspace/types";
import { useTranslations, useLocale } from "next-intl";

// Piano keys for one octave
const OCTAVE_NOTES: { note: Note; isBlack: boolean }[] = [
  { note: "C", isBlack: false },
  { note: "C#", isBlack: true },
  { note: "D", isBlack: false },
  { note: "D#", isBlack: true },
  { note: "E", isBlack: false },
  { note: "F", isBlack: false },
  { note: "F#", isBlack: true },
  { note: "G", isBlack: false },
  { note: "G#", isBlack: true },
  { note: "A", isBlack: false },
  { note: "A#", isBlack: true },
  { note: "B", isBlack: false },
];

const OCTAVE_COUNT_OPTIONS = [1, 2, 3, 4];

const WHITE_KEY_WIDTH = 40;
const BLACK_KEY_WIDTH = 24;
const WHITE_KEY_HEIGHT = 150;
const BLACK_KEY_HEIGHT = 90;

// Position after each white key (0-based), per octave
const BLACK_KEY_POSITIONS = [1, 2, 4, 5, 6];

export interface PianoSettings {
  octaveCount: number;
  setOctaveCount: (value: number) => void;
}

export const usePianoSettings = (): PianoSettings => {
  const [octaveCount, setOctaveCount] = useLocalStorageNumber("octave-count", 3, 1, 4);
  return { octaveCount, setOctaveCount };
};

export const PianoControls: React.FC<{ settings: PianoSettings }> = ({ settings }) => {
  const t = useTranslations();
  return (
  <Field label={t("ui.display")} htmlFor="octave-count">
    <Select
      id="octave-count"
      aria-label={t("ui.selectOctaveCount")}
      value={settings.octaveCount}
      onChange={(e) => settings.setOctaveCount(Number(e.target.value))}
    >
      {OCTAVE_COUNT_OPTIONS.map((num) => (
        <option key={num} value={num}>
          {t("ui.octaveCount", { n: num })}
        </option>
      ))}
    </Select>
  </Field>
  );
};

export const PianoView: React.FC<InstrumentViewProps<PianoSettings>> = ({
  scale,
  settings,
  displayMode,
  isDarkMode,
  getNoteColor,
  onPlay,
}) => {
  const dispatch = useDispatch();
  const selectedNote = useSelector(
    (state: RootState) => state.selectedNote.selectedNote
  );
  const locale = useLocale();

  const keys = Array.from({ length: settings.octaveCount }).flatMap(
    () => OCTAVE_NOTES
  );
  const whiteKeys = keys.filter((key) => !key.isBlack);
  const blackKeys = keys.filter((key) => key.isBlack);

  const handleNoteClick = (note: Note, octave: number): void => {
    onPlay(`${note}${octave}` as NoteWithOctave);
    dispatch(selectNote(selectedNote === note ? null : note));
  };

  const selectionStyle = (note: Note) =>
    selectedNote === note
      ? {
          filter:
            "drop-shadow(0 0 10px rgba(255,255,255,1)) drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 3px rgba(255,255,255,0.7))",
          stroke: "#ffffff",
          strokeWidth: 2.5,
        }
      : { filter: "none", stroke: "none", strokeWidth: 0 };

  const renderMarker = (
    note: Note,
    cx: number,
    cy: number,
    radius: number,
    selectedRadius: number,
    fontSize: string
  ) => (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={selectedNote === note ? selectedRadius : radius}
        fill={getNoteColor(note)}
        className="transition-all duration-200"
        style={selectionStyle(note)}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={
          isDarkMode ? "#1f2937" : note === scale.root ? "#ffffff" : "#1f2937"
        }
        fontSize={fontSize}
        className="select-none font-bold transition-colors duration-200"
      >
        {formatNoteLabel(note, scale, displayMode, locale)}
      </text>
    </g>
  );

  return (
    <svg
      width="100%"
      height="200"
      viewBox={`0 0 ${WHITE_KEY_WIDTH * whiteKeys.length} 200`}
    >
      <g transform="translate(0, 25)">
        {/* White keys */}
        {whiteKeys.map((key, i) => {
          const octave = Math.floor(i / 7) + 1;
          const inScale = isNoteInScale(key.note, scale);

          return (
            <g
              key={`white-${i}`}
              onClick={() => inScale && handleNoteClick(key.note, octave)}
              onKeyDown={(e) => {
                if (inScale && (e.key === "Enter" || e.key === " ")) {
                  handleNoteClick(key.note, octave);
                }
              }}
              role="button"
              aria-label={inScale ? `${key.note}${octave}` : undefined}
              tabIndex={inScale ? 0 : -1}
              className={`transition-colors duration-200 ${
                inScale
                  ? "hover:fill-opacity-90 cursor-pointer"
                  : "cursor-not-allowed"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg`}
            >
              <rect
                x={i * WHITE_KEY_WIDTH}
                y={0}
                width={WHITE_KEY_WIDTH}
                height={WHITE_KEY_HEIGHT}
                fill={isDarkMode ? "#4b5563" : "#ffffff"}
                stroke={isDarkMode ? "#1f2937" : "#000000"}
                strokeWidth="1"
              />
              {inScale &&
                renderMarker(
                  key.note,
                  i * WHITE_KEY_WIDTH + WHITE_KEY_WIDTH / 2,
                  WHITE_KEY_HEIGHT - 25,
                  15,
                  22,
                  "12"
                )}
            </g>
          );
        })}

        {/* Black keys */}
        {blackKeys.map((key, i) => {
          const octave = Math.floor(i / 5) + 1;
          const whiteKeyOffset = Math.floor(i / 5) * 7;
          const x =
            (whiteKeyOffset + BLACK_KEY_POSITIONS[i % 5]) * WHITE_KEY_WIDTH -
            BLACK_KEY_WIDTH / 2;
          const inScale = isNoteInScale(key.note, scale);

          return (
            <g
              key={`black-${i}`}
              onClick={() => inScale && handleNoteClick(key.note, octave)}
              onKeyDown={(e) => {
                if (inScale && (e.key === "Enter" || e.key === " ")) {
                  handleNoteClick(key.note, octave);
                }
              }}
              role="button"
              aria-label={inScale ? `${key.note}${octave}` : undefined}
              tabIndex={inScale ? 0 : -1}
              className={`transition-colors duration-200 ${
                inScale
                  ? "hover:fill-opacity-90 cursor-pointer"
                  : "cursor-not-allowed"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg`}
            >
              <rect
                x={x}
                y={0}
                width={BLACK_KEY_WIDTH}
                height={BLACK_KEY_HEIGHT}
                fill={isDarkMode ? "#1f2937" : "#000000"}
              />
              {inScale &&
                renderMarker(
                  key.note,
                  x + BLACK_KEY_WIDTH / 2,
                  BLACK_KEY_HEIGHT - 25,
                  12,
                  17,
                  "10"
                )}
            </g>
          );
        })}
      </g>
    </svg>
  );
};
