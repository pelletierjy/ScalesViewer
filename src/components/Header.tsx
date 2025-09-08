"use client";
import { ROOTS, SCALE_TYPES } from "@/lib/utils/scaleConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDarkMode,
  setScale,
  toggleShowMonochrome,
  toggleShowFlats,
  toggleShowDegrees,
} from "@/features/globalConfig/globalConfigSlice";
import { setInstrument } from "../features/globalConfig/globalConfigSlice";
import {
  selectIsDarkMode,
  selectInstrument,
  selectScale,
  selectShowFlats,
  selectIsMonochrome,
  selectShowDegrees,
} from "../features/globalConfig/globalConfigSlice";
import { Instrument } from "@/lib/utils/instrument";
import { Note } from "@/lib/utils/note";
import { ScaleType } from "@/lib/utils/scaleType";
import React from "react";
import { HelpModal } from "./HelpModal";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const showFlats = useSelector(selectShowFlats);
  const scale = useSelector(selectScale);
  const instrument = useSelector(selectInstrument);
  const isDarkMode = useSelector(selectIsDarkMode);
  const showDegrees = useSelector(selectShowDegrees);
  const highlightRoots = useSelector(selectIsMonochrome);
  const [showHelp, setShowHelp] = React.useState(false);
  
  const handleInstrumentChange = (newInstrument: Instrument) => {
    dispatch(setInstrument(newInstrument));
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <h1
          className={`text-3xl sm:text-4xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Scales Viewer
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="instrument"
              className={`text-sm font-semibold whitespace-nowrap ${
                isDarkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Instrument
            </label>
            <select
              id="instrument"
              value={instrument}
              onChange={(e) =>
                handleInstrumentChange(e.target.value as Instrument)
              }
              className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="guitar">Guitar</option>
              <option value="piano">Piano</option>
              <option value="kalimba">Kalimba</option>
              <option value="harmonica">Harmonica</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="scale-type"
              className={`text-sm font-semibold whitespace-nowrap ${
                isDarkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Scale
            </label>
            <select
              id="scale-type"
              className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              value={scale.type}
              onChange={(e) =>
                dispatch(
                  setScale({
                    ...scale,
                    type: e.target.value as ScaleType,
                  })
                )
              }
            >
              {Object.entries(
                SCALE_TYPES.reduce((groups, scale) => {
                  const group = scale.group || "Other";
                  if (!groups[group]) {
                    groups[group] = [];
                  }
                  groups[group].push(scale);
                  return groups;
                }, {} as Record<string, (typeof SCALE_TYPES)[number][]>)
              ).map(([group, scales]) => (
                <optgroup key={group} label={group}>
                  {scales.map((scale) => (
                    <option key={scale.value} value={scale.value}>
                      {scale.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="root-note"
              className={`text-sm font-semibold whitespace-nowrap ${
                isDarkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              Root
            </label>
            <select
              id="root-note"
              className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              value={scale.root}
              onChange={(e) =>
                dispatch(
                  setScale({
                    ...scale,
                    root: e.target.value as Note,
                  })
                )
              }
            >
              {ROOTS.map((note) => (
                <option key={note} value={note}>
                  {note}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(toggleShowDegrees())}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          title={showDegrees ? "Show note names" : "Show scale degrees"}
        >
          {showDegrees ? "ABC" : "123"}
        </button>
        <button
          onClick={() => dispatch(toggleShowFlats())}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          title={showFlats ? "Show sharp notes" : "Show flat notes"}
        >
          {showFlats ? "♯" : "♭"}
        </button>
        <button
          onClick={() => dispatch(toggleShowMonochrome())}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          title={
            highlightRoots ? "Highlight intervals" : "Highlight root notes"
          }
        >
          {highlightRoots ? "🎨" : "⚫"}
        </button>
        <button
          onClick={() => setShowHelp(true)}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          title="Show help slideshow"
        >
          ❓
        </button>
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} isDarkMode={isDarkMode} />
    </>
  );
};
