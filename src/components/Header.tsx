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
import React, { useRef } from "react";
import { HelpModal } from "./HelpModal";
import { SettingsPanel } from "@/features/settings/components/SettingsPanel";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const showFlats = useSelector(selectShowFlats);
  const scale = useSelector(selectScale);
  const instrument = useSelector(selectInstrument);
  const isDarkMode = useSelector(selectIsDarkMode);
  const showDegrees = useSelector(selectShowDegrees);
  const highlightRoots = useSelector(selectIsMonochrome);
  const [showHelp, setShowHelp] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  
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
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="instrument"
              className={`text-sm font-semibold ${
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
                  : "bg-white border-slate-400 text-slate-800"
              }`}
            >
              <option value="guitar">Guitar</option>
              <option value="piano">Piano</option>
              <option value="kalimba">Kalimba</option>
              <option value="harmonica">Harmonica</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="scale-type"
              className={`text-sm font-semibold ${
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
                  : "bg-white border-slate-400 text-slate-800"
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

          <div className="flex flex-col gap-1">
            <label
              htmlFor="root-note"
              className={`text-sm font-semibold ${
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
                  : "bg-white border-slate-400 text-slate-800"
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
              : "bg-slate-300 text-slate-800 hover:bg-slate-400"
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
              : "bg-slate-300 text-slate-800 hover:bg-slate-400"
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
              : "bg-slate-300 text-slate-800 hover:bg-slate-400"
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
              : "bg-slate-300 text-slate-800 hover:bg-slate-400"
          }`}
          title="Show help slideshow"
        >
          ❓
        </button>
        <button
          ref={settingsButtonRef}
          onClick={() => setShowSettings(true)}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-slate-300 text-slate-800 hover:bg-slate-400"
          }`}
          title="Open settings"
          aria-label="Open settings panel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isDarkMode
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              : "bg-slate-300 text-slate-800 hover:bg-slate-400"
          }`}
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} isDarkMode={isDarkMode} />
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        triggerRef={settingsButtonRef}
      />
    </>
  );
};
