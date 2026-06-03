"use client";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  togglePatternMode,
  selectPattern,
  setTempo,
  toggleLoop,
  startPlayback,
  stopPlayback,
  advanceStep,
  selectIsPatternModeEnabled,
  selectSelectedPatternId,
  selectIsPlaying,
  selectTempo,
  selectLoop,
  selectCurrentStepIndex,
} from "@/features/pattern/patternSlice";
import { PRESET_PATTERNS } from "@/lib/utils/patternUtils";
import { usePlayNote } from "@/lib/hooks/usePlayNote";
import { getPatternNotesWithOctave } from "@/lib/utils/patternUtils";
import { Scale } from "@/lib/utils/scaleType";

export default function PatternPanel({ scale }: { scale: Scale }) {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector((state: RootState) => state.globalConfig.isDarkMode);
  const isPatternModeEnabled = useSelector(selectIsPatternModeEnabled);
  const selectedPatternId = useSelector(selectSelectedPatternId);
  const isPlaying = useSelector(selectIsPlaying);
  const tempo = useSelector(selectTempo);
  const loop = useSelector(selectLoop);
  const currentStepIndex = useSelector(selectCurrentStepIndex);
  const playNoteSound = usePlayNote();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentPattern = PRESET_PATTERNS.find((p) => p.id === selectedPatternId);

  // Playback timing effect
  useEffect(() => {
    if (isPlaying && currentPattern) {
      const intervalMs = (60 / tempo) * 1000;
      intervalRef.current = setInterval(() => {
        dispatch(advanceStep());
      }, intervalMs);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, tempo, dispatch, currentPattern?.id]);

  // Play audio when step advances
  useEffect(() => {
    if (isPlaying && currentPattern) {
      const notes = getPatternNotesWithOctave(currentPattern, scale, 4);
      const note = notes[currentStepIndex];
      if (note) {
        playNoteSound(note, 0.4);
      }
    }
  }, [currentStepIndex, isPlaying, currentPattern, scale, playNoteSound]);

  const handleTogglePlayback = () => {
    if (isPlaying) {
      dispatch(stopPlayback());
    } else {
      if (!selectedPatternId) {
        dispatch(selectPattern(PRESET_PATTERNS[0].id));
      }
      dispatch(startPlayback());
    }
  };

  if (!isPatternModeEnabled) {
    return (
      <div
        className={`rounded-lg border p-4 ${
          isDark ? "border-gray-700 bg-gray-800" : "border-slate-300 bg-white"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3
              className={`text-lg font-semibold ${
                isDark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Pattern Sequencer
            </h3>
            <p
              className={`text-sm mt-1 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Practice melodic patterns locked to the scale.
            </p>
          </div>
          <button
            onClick={() => dispatch(togglePatternMode())}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isDark
                ? "bg-purple-600 hover:bg-purple-500 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            Enable
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border p-4 ${
        isDark ? "border-gray-700 bg-gray-800" : "border-slate-300 bg-white"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h3
            className={`text-lg font-semibold ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Pattern Sequencer
          </h3>
          <p
            className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {scale.root} {scale.type} — {currentPattern?.name ?? "No pattern selected"}
          </p>
        </div>
        <button
          onClick={() => dispatch(togglePatternMode())}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            isDark
              ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
              : "bg-slate-200 hover:bg-slate-300 text-slate-800"
          }`}
        >
          Disable
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <label
            className={`text-xs font-semibold ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Pattern
          </label>
          <select
            value={selectedPatternId ?? ""}
            onChange={(e) => dispatch(selectPattern(e.target.value))}
            className={`rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm ${
              isDark
                ? "bg-gray-700 border-gray-600 text-gray-200"
                : "bg-white border-slate-400 text-slate-800"
            }`}
          >
            {PRESET_PATTERNS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            className={`text-xs font-semibold ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Tempo (BPM)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={40}
              max={300}
              value={tempo}
              onChange={(e) => dispatch(setTempo(Number(e.target.value)))}
              className="w-24 accent-purple-600"
            />
            <input
              type="number"
              min={40}
              max={300}
              value={tempo}
              onChange={(e) => dispatch(setTempo(Number(e.target.value)))}
              className={`w-16 rounded-md shadow-sm text-sm text-center ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-white border-slate-400 text-slate-800"
              }`}
            />
          </div>
        </div>

        <label
          className={`flex items-center gap-2 text-sm cursor-pointer ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <input
            type="checkbox"
            checked={loop}
            onChange={() => dispatch(toggleLoop())}
            className="rounded accent-purple-600"
          />
          Loop
        </label>
      </div>

      {currentPattern && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={handleTogglePlayback}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isPlaying
                ? isDark
                  ? "bg-red-600 hover:bg-red-500 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
                : isDark
                ? "bg-green-600 hover:bg-green-500 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isPlaying ? "Stop" : "Play"}
          </button>

          <div className="flex items-center gap-1">
            {currentPattern.steps.map((step, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold transition-all ${
                  idx === currentStepIndex && isPlaying
                    ? isDark
                      ? "bg-purple-500 text-white ring-2 ring-purple-300"
                      : "bg-purple-600 text-white ring-2 ring-purple-400"
                    : isDark
                    ? "bg-gray-700 text-gray-300"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
