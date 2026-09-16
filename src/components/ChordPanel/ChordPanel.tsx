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
import { Panel, Field, Select, Button } from "@/components/ui";

const QUALITY_OPTIONS: { value: ChordQuality | "all"; label: string }[] = [
  { value: "all", label: "All Qualities" },
  { value: "major", label: "Major" },
  { value: "minor", label: "Minor" },
  { value: "diminished", label: "Diminished" },
  { value: "augmented", label: "Augmented" },
];

export default function ChordPanel({ scale }: { scale: Scale }) {
  const dispatch = useDispatch<AppDispatch>();
  const chordScaleMode = useSelector((state: RootState) => state.globalConfig.chordScaleMode);
  const selectedChord = useSelector((state: RootState) => state.globalConfig.selectedChord);
  const showFlats = useSelector(selectShowFlats);
  const [qualityFilter, setQualityFilter] = useState<ChordQuality | "all">("all");

  const scaleNotes = getScaleNotes(scale);
  const triads: Triad[] = chordScaleMode ? getDiatonicTriads(scaleNotes) : [];
  const filteredTriads = qualityFilter === "all" ? triads : triads.filter((t) => t.quality === qualityFilter);

  if (!chordScaleMode) {
    return (
      <Panel title="Chord-Scale Intersection">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--console-text-dim)]">
            See which chords belong to this scale.
          </p>
          <Button tone="accent2" onClick={() => dispatch(toggleChordScaleMode())}>
            Enable
          </Button>
        </div>
      </Panel>
    );
  }

  return (
    <Panel
      title="Diatonic Chords"
      headerRight={
        <Button size="sm" onClick={() => dispatch(toggleChordScaleMode())}>
          Disable
        </Button>
      }
    >
      <p className="text-sm text-[var(--console-text-dim)] mb-3">
        {scale.root} {scale.type} {scale.mode ? `(${scale.mode})` : ""}
      </p>

      <div className="mb-3">
        <Field label="Filter by Quality" htmlFor="quality-filter">
          <Select
            id="quality-filter"
            value={qualityFilter}
            className="w-full sm:w-auto"
            onChange={(e) => {
              setQualityFilter(e.target.value as ChordQuality | "all");
              dispatch(setSelectedChord(null));
            }}
          >
            {QUALITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </Field>
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
              data-active={isSelected || undefined}
              className="rack-chip px-3 py-2"
            >
              {getTriadDisplayLabel(triad, showFlats)}
            </button>
          );
        })}
      </div>

      {selectedChord && (
        <div className="mt-4 pt-3 border-t border-[var(--console-border)]">
          <p className="rack-label mb-2">Chord Tones</p>
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
                const toneStyle =
                  type === "root"
                    ? "border-[var(--console-success)] text-[var(--console-success)]"
                    : type === "shared"
                      ? "border-[var(--console-accent)] text-[var(--console-accent-strong)]"
                      : "border-[var(--console-border-strong)] text-[var(--console-text-dim)]";
                return (
                  <span
                    key={tone}
                    className={`inline-flex items-center gap-1 px-2 py-1 rack-mono text-xs font-bold border ${toneStyle}`}
                  >
                    {showFlats ? (SHARP_TO_FLAT[tone] ?? tone) : tone}
                  </span>
                );
              });
            })()}
          </div>
        </div>
      )}
    </Panel>
  );
}
