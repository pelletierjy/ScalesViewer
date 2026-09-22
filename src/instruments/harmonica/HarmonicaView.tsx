"use client";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectShowFlats } from "@/features/globalConfig/globalConfigSlice";
import { isNoteInScale, formatNoteLabel, sharpToFlat } from "@/lib/utils/scaleUtils";
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Field, Select } from "@/components/ui";
import { InstrumentViewProps } from "@/components/InstrumentWorkspace/types";
import { HARMONICA_KEYS, transposeHarmonicaNotes } from "./harmonicaNotes";
import { useTranslations } from "next-intl";

export interface HarmonicaSettings {
  selectedKey: Note;
  setSelectedKey: (key: Note) => void;
}

export const useHarmonicaSettings = (): HarmonicaSettings => {
  const [selectedKey, setSelectedKey] = useState<Note>("C");
  return { selectedKey, setSelectedKey };
};

export const HarmonicaControls: React.FC<{ settings: HarmonicaSettings }> = ({
  settings,
}) => {
  const showFlats = useSelector(selectShowFlats);
  const t = useTranslations();

  return (
    <Field label={t("ui.harmonicaKey")} htmlFor="harmonicaKey">
      <Select
        id="harmonicaKey"
        value={settings.selectedKey}
        onChange={(e) => settings.setSelectedKey(e.target.value as Note)}
      >
        {HARMONICA_KEYS.map((key) => (
          <option key={key} value={key}>
            {showFlats ? sharpToFlat(key) : key}
          </option>
        ))}
      </Select>
    </Field>
  );
};

export const HarmonicaView: React.FC<InstrumentViewProps<HarmonicaSettings>> = ({
  scale,
  settings,
  displayMode,
  isDarkMode,
  getNoteColor,
  onPlay,
}) => {
  const harmonicaNotes = useMemo(
    () => transposeHarmonicaNotes(settings.selectedKey),
    [settings.selectedKey]
  );

  // Harmonica spans roughly three octaves from hole 1 upwards.
  const handleNoteClick = (note: Note, holeNumber: number): void => {
    const octave = 4 + Math.floor((holeNumber - 1) / 3);
    onPlay(`${note}${octave}` as NoteWithOctave);
  };

  return (
    <svg width="100%" height="400" viewBox="0 0 1200 400">
      {/* Harmonica body */}
      <rect
        x="100"
        y="100"
        width="1000"
        height="200"
        rx="20"
        fill={isDarkMode ? "#4b5563" : "#d1d5db"}
        className="transition-colors duration-200"
      />

      {harmonicaNotes.blow.map((blowNote, i) => {
        const x = 180 + i * 90;
        const drawNote = harmonicaNotes.draw[i];
        const isBlowRoot = blowNote === scale.root;
        const isDrawRoot = drawNote === scale.root;

        const renderNote = (
          note: Note,
          isRoot: boolean,
          cy: number,
          arrow: string
        ) => (
          <g onClick={() => handleNoteClick(note, i + 1)} className="cursor-pointer">
            <circle
              cx={x}
              cy={cy}
              r="22"
              fill={getNoteColor(note)}
              className="transition-colors duration-200 hover:fill-opacity-90"
            />
            <text
              x={x}
              y={cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isDarkMode ? "#1f2937" : isRoot ? "#ffffff" : "#1f2937"}
              fontSize="16"
              className="select-none font-bold transition-colors duration-200"
            >
              {formatNoteLabel(note, scale, displayMode)}
            </text>
            <text
              x={x + 26}
              y={cy}
              textAnchor="start"
              dominantBaseline="middle"
              fill={isDarkMode ? "#9ca3af" : "#4b5563"}
              fontSize="14"
              className="select-none transition-colors duration-200"
            >
              {arrow}
            </text>
          </g>
        );

        return (
          <g key={i}>
            {/* Hole */}
            <rect
              x={x - 15}
              y="170"
              width="30"
              height="60"
              rx="4"
              fill={isDarkMode ? "#1f2937" : "#000000"}
              className="transition-colors duration-200"
            />

            {isNoteInScale(blowNote, scale) && renderNote(blowNote, isBlowRoot, 130, "↑")}
            {isNoteInScale(drawNote, scale) && renderNote(drawNote, isDrawRoot, 270, "↓")}

            {/* Hole number */}
            <text
              x={x}
              y="200"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isDarkMode ? "#9ca3af" : "#4b5563"}
              fontSize="14"
              className="select-none transition-colors duration-200"
            >
              {i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
