"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  toggleChordScaleMode,
  setSelectedChord,
  selectShowFlats,
} from "@/features/globalConfig/globalConfigSlice";
import { getDiatonicTriads, isToneShared, getTriadDisplayLabel, Triad } from "@/lib/utils/chordUtils";
import { getScaleNotes, getNoteAtInterval, SHARP_TO_FLAT } from "@/lib/utils/scaleUtils";
import { Scale } from "@/lib/utils/scaleType";
import { ChordQuality } from "@/lib/utils/chordTypes";

const QUALITY_OPTIONS: { value: ChordQuality | "all"; label: string }[] = [
  { value: "all", label: "All Qualities" },
  { value: "major", label: "Major" },
  { value: "minor", label: "Minor" },
  { value: "diminished", label: "Diminished" },
  { value: "augmented", label: "Augmented" },
];

export default function ChordPanel({ scale }: { scale: Scale }) {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector((state: RootState) => state.globalConfig.isDarkMode);
  const chordScaleMode = useSelector((state: RootState) => state.globalConfig.chordScaleMode);
  const selectedChord = useSelector((state: RootState) => state.globalConfig.selectedChord);
  const showFlats = useSelector(selectShowFlats);
  const [qualityFilter, setQualityFilter] = useState<ChordQuality | "all">("all");

  const scaleNotes = getScaleNotes(scale);
  const triads: Triad[] = chordScaleMode ? getDiatonicTriads(scaleNotes) : [];
  const filteredTriads = qualityFilter === "all" ? triads : triads.filter((t) => t.quality === qualityFilter);

  if (!chordScaleMode) {
    return (
      <div className={`rounded-lg border p-4 ${isDark ? "border-gray-700 bg-gray-800" : "border-slate-300 bg-white"}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
              Chord-Scale Intersection
            </h3>
            <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              See which chords belong to this scale.
            </p>
          </div>
          <button
            onClick={() => dispatch(toggleChordScaleMode())}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isDark
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Enable
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border p-4 ${isDark ? "border-gray-700 bg-gray-800" : "border-slate-300 bg-white"}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-lg font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
            Diatonic Chords
          </h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {scale.root} {scale.type} {scale.mode ? `(${scale.mode})` : ""}
          </p>
        </div>
        <button
          onClick={() => dispatch(toggleChordScaleMode())}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            isDark
              ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          Disable
        </button>
      </div>

      <div className="mb-3">
        <label
          htmlFor="quality-filter"
          className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          Filter by Quality
        </label>
        <select
          id="quality-filter"
          value={qualityFilter}
          onChange={(e) => {
            setQualityFilter(e.target.value as ChordQuality | "all");
            dispatch(setSelectedChord(null));
          }}
          className={`w-full sm:w-auto rounded-md px-2 py-1.5 text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDark
              ? "bg-gray-700 border-gray-600 text-gray-200"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          {QUALITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {filteredTriads.map((triad) => {
          const isSelected = selectedChord === triad.symbol;
          return (
            <button
              key={triad.symbol}
              onClick={() =>
                dispatch(setSelectedChord(isSelected ? null : triad.symbol))
              }
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all border-2 ${
                isSelected
                  ? isDark
                    ? "border-blue-400 bg-blue-900/40 text-blue-200"
                    : "border-blue-600 bg-blue-50 text-blue-900"
                  : isDark
                    ? "border-gray-600 hover:border-gray-500 bg-gray-700 text-gray-200"
                    : "border-gray-300 hover:border-gray-400 bg-white text-gray-800"
              }`}
            >
              {getTriadDisplayLabel(triad, showFlats)}
            </button>
          );
        })}
      </div>

      {selectedChord && (
        <div className={`mt-4 pt-4 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Chord Tones
          </p>
          <div className="flex flex-wrap gap-2">
            {(() => {
              const triad = triads.find((t) => t.symbol === selectedChord);
              if (!triad) return null;
              const tones = [
                triad.root,
                getNoteAtInterval(triad.root, triad.intervals[0]),
                getNoteAtInterval(triad.root, triad.intervals[1]),
              ];
              return tones.map((tone) => {
                const type: "root" | "shared" | "unique" =
                  tone === triad.root
                    ? "root"
                    : isToneShared(tone, triads)
                      ? "shared"
                      : "unique";
                return (
                  <span
                    key={tone}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${
                      type === "root"
                        ? isDark
                          ? "bg-green-900/50 text-green-300 border border-green-700"
                          : "bg-green-100 text-green-800 border border-green-300"
                        : type === "shared"
                          ? isDark
                            ? "bg-yellow-900/40 text-yellow-200 border border-yellow-700"
                            : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                          : isDark
                            ? "bg-gray-700 text-gray-300 border border-gray-600"
                            : "bg-gray-100 text-gray-700 border border-gray-300"
                    }`}
                  >
                    {showFlats ? (SHARP_TO_FLAT[tone] ?? tone) : tone}
                  </span>
                );
              });
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
