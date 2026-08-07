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
import { Panel, Field, Select, TextInput, Button } from "@/components/ui";
import { useTranslations } from "next-intl";

export default function PatternPanel({ scale }: { scale: Scale }) {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
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
      <Panel title={t("pattern.patternSequencer")}>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--console-text-dim)]">
            {t("pattern.practicePatterns")}
          </p>
          <Button tone="accent2" onClick={() => dispatch(togglePatternMode())}>
            {t("pattern.enable")}
          </Button>
        </div>
      </Panel>
    );
  }

  return (
    <Panel
      title={t("pattern.patternSequencer")}
      headerRight={
        <Button size="sm" onClick={() => dispatch(togglePatternMode())}>
          {t("pattern.disable")}
        </Button>
      }
    >
      <p className="text-sm text-[var(--console-text-dim)] mb-3">
        {scale.root} {scale.type} — {currentPattern?.name ?? t("pattern.noPatternSelected", { defaultMessage: "No pattern selected" })}
      </p>

      <div className="flex flex-wrap items-end gap-4 mb-4">
        <Field label={t("pattern.pattern")} >
          <Select
            value={selectedPatternId ?? ""}
            onChange={(e) => dispatch(selectPattern(e.target.value))}
          >
            {PRESET_PATTERNS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field label={t("pattern.tempoBpm")}>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={40}
              max={300}
              value={tempo}
              onChange={(e) => dispatch(setTempo(Number(e.target.value)))}
              className="w-24 accent-[var(--console-accent)]"
            />
            <TextInput
              type="number"
              min={40}
              max={300}
              value={tempo}
              onChange={(e) => dispatch(setTempo(Number(e.target.value)))}
              className="w-16 text-center"
            />
          </div>
        </Field>

        <label className="flex items-center gap-2 text-sm cursor-pointer text-[var(--console-text-dim)] rack-label normal-case font-normal">
          <input
            type="checkbox"
            checked={loop}
            onChange={() => dispatch(toggleLoop())}
            className="rounded-none accent-[var(--console-accent)]"
          />
          {t("pattern.loop")}
        </label>
      </div>

      {currentPattern && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Button tone={isPlaying ? "danger" : "success"} onClick={handleTogglePlayback}>
            {isPlaying ? t("pattern.stop") : t("pattern.play")}
          </Button>

          <div className="flex items-center gap-1">
            {currentPattern.steps.map((step, idx) => (
              <div
                key={idx}
                data-active={(idx === currentStepIndex && isPlaying) || undefined}
                className="rack-chip w-8 h-8 flex items-center justify-center"
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
    </Panel>
  );
}
