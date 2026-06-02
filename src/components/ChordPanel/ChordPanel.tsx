"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  toggleChordScaleMode,
  setSelectedChord,
} from "@/features/globalConfig/globalConfigSlice";
import { getDiatonicTriads, isToneShared, Triad } from "@/lib/utils/chordUtils";
import { getScaleNotes, getNoteAtInterval } from "@/lib/utils/scaleUtils";
import { Scale } from "@/lib/utils/scaleType";

export default function ChordPanel({ scale }: { scale: Scale }) {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector((state: RootState) => state.globalConfig.isDarkMode);
  const chordScaleMode = useSelector((state: RootState) => state.globalConfig.chordScaleMode);
  const selectedChord = useSelector((state: RootState) => state.globalConfig.selectedChord);

  const scaleNotes = getScaleNotes(scale);
  const triads: Triad[] = chordScaleMode ? getDiatonicTriads(scaleNotes) : [];

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

      <div className="flex flex-wrap gap-2">
        {triads.map((triad) => {
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
              {triad.root}
              {triad.quality === "minor" && "m"}
              {triad.quality === "diminished" && "dim"}
              {triad.quality === "augmented" && "aug"}
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
                    {tone}
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
