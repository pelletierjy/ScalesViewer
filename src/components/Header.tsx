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
import React, { useRef, useMemo, useEffect } from "react";
import { HelpModal } from "./HelpModal";
import { SettingsPanel } from "@/features/settings/components/SettingsPanel";
import { useLocalStorage } from "@/app/guitar/hooks/useLocalStorage";
import {
  getCustomScales,
  registerCustomScales,
  CustomScaleDefinition,
} from "@/lib/utils/customScaleTypes";
import { LOCAL_STORAGE_KEYS } from "@/features/settings/types/settings.types";
import { CustomScaleEditor } from "@/app/guitar/CustomScaleEditor/CustomScaleEditor";

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
  const [showScaleEditor, setShowScaleEditor] = React.useState(false);
  const [editingScale, setEditingScale] = React.useState<CustomScaleDefinition | null>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  // Load custom scales from localStorage
  const [customScales, setCustomScalesStorage] = useLocalStorage<CustomScaleDefinition[]>(
    LOCAL_STORAGE_KEYS.CUSTOM_SCALES,
    getCustomScales()
  );

  // Register custom scales in the runtime registry
  useEffect(() => {
    registerCustomScales(customScales);
  }, [customScales]);

  // Merge hardcoded and custom scale types for dropdown
  const allScaleTypes = useMemo(() => {
    const customEntries = customScales.map((cs) => ({
      value: cs.id,
      label: cs.label,
      group: cs.group,
    }));
    return [...SCALE_TYPES, ...customEntries];
  }, [customScales]);
  
  const handleInstrumentChange = (newInstrument: Instrument) => {
    dispatch(setInstrument(newInstrument));
  };

  const handleSaveCustomScale = (scale: CustomScaleDefinition) => {
    if (editingScale) {
      // Update existing scale
      setCustomScalesStorage((prevScales) =>
        prevScales.map((s) => (s.id === editingScale.id ? scale : s))
      );
    } else {
      // Add new scale
      setCustomScalesStorage((prevScales) => [...prevScales, scale]);
    }
    setShowScaleEditor(false);
    setEditingScale(null);
  };

  const handleEditScale = (scale: CustomScaleDefinition) => {
    setEditingScale(scale);
    setShowScaleEditor(true);
  };

  const handleDeleteCustomScale = (scaleId: string) => {
    if (confirm("Are you sure you want to delete this custom scale?")) {
      setCustomScalesStorage((prevScales) =>
        prevScales.filter((s) => s.id !== scaleId)
      );
      // If the deleted scale was selected, revert to major
      if (scale.type === scaleId) {
        dispatch(setScale({ ...scale, type: "major" as ScaleType }));
      }
    }
  };

  const selectedCustomScale = customScales.find((cs) => cs.id === scale.type);

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
            <div className="flex flex-col gap-1">
              <select
                id="scale-type"
                className={`rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200"
                    : "bg-white border-slate-400 text-slate-800"
                }`}
                value={scale.type}
                onChange={(e) => {
                  if (e.target.value === "__new__") {
                    setEditingScale(null);
                    setShowScaleEditor(true);
                  } else {
                    dispatch(setScale({ ...scale, type: e.target.value as ScaleType }));
                  }
                }}
              >
                {Object.entries(
                  allScaleTypes.reduce((groups, scaleEntry) => {
                    const group = scaleEntry.group || "Other";
                    if (!groups[group]) {
                      groups[group] = [];
                    }
                    groups[group].push(scaleEntry);
                    return groups;
                  }, {} as Record<string, { value: string; label: string; group: string }[]>)
                ).map(([group, scales]) => (
                  <optgroup key={group} label={group}>
                    {scales.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value="__new__">+ Custom Scale</option>
              </select>
              {selectedCustomScale && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditScale(selectedCustomScale)}
                    className={`px-2 py-1 text-xs rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600"
                        : "bg-slate-300 text-slate-800 hover:bg-slate-400 border border-slate-500"
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCustomScale(selectedCustomScale.id)}
                    className={`px-2 py-1 text-xs rounded-md text-red-600 hover:text-red-700 ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600 border border-gray-600"
                        : "bg-slate-300 hover:bg-slate-400 border border-slate-500"
                    }`}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
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

      {showScaleEditor && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${
            isDarkMode ? "bg-black/50" : "bg-white/50"
          }`}
          onClick={() => {
            setShowScaleEditor(false);
            setEditingScale(null);
          }}
          role="presentation"
        >
          <div
            className={`rounded-lg shadow-xl max-w-md w-full p-6 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <CustomScaleEditor
              initialScale={editingScale}
              onSaveScale={handleSaveCustomScale}
              onCancel={() => {
                setShowScaleEditor(false);
                setEditingScale(null);
              }}
              customScales={customScales}
            />
          </div>
        </div>
      )}
    </>
  );
};
