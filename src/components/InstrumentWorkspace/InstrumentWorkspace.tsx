"use client";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectScale,
  selectShowDegrees,
  selectShowFlats,
} from "@/features/globalConfig/globalConfigSlice";
import { usePlayNote } from "@/lib/hooks/usePlayNote";
import { useNoteColors } from "@/lib/hooks/useNoteColors";
import { DisplayMode } from "@/lib/utils/scaleUtils";
import { Instrument } from "@/lib/utils/instrument";
import { Stage } from "@/components/ui";
import ChordPanel from "@/components/ChordPanel/ChordPanel";
import HomeworkPanel from "@/components/HomeworkPanel/HomeworkPanel";
import PatternPanel from "@/components/PatternPanel/PatternPanel";
import { INSTRUMENT_REGISTRY } from "./registry";
import { InstrumentDefinition } from "./types";

interface InstrumentWorkspaceProps {
  instrument: Instrument;
}

/**
 * The single instrument page. Owns every page-level tool — the note colour
 * composition, the display mode, the tool row and the chord/homework/pattern
 * panels — so that each instrument only contributes its own view and controls.
 */
export function InstrumentWorkspace({ instrument }: InstrumentWorkspaceProps) {
  const scale = useSelector(selectScale);
  const showFlats = useSelector(selectShowFlats);
  const showDegrees = useSelector(selectShowDegrees);
  const onPlay = usePlayNote();
  const { isDarkMode, highlightRoots, getNoteColor, getHighlightColor } =
    useNoteColors(scale);

  const displayMode: DisplayMode = showDegrees
    ? "degree"
    : showFlats
    ? "flat"
    : "note";

  // Safe to index by key: the workspace is keyed by instrument at the route,
  // so `useSettings` never changes identity within a mounted instance.
  const definition = INSTRUMENT_REGISTRY[instrument] as InstrumentDefinition<unknown>;
  const { View, Controls, useSettings, stage = true } = definition;
  const settings = useSettings();

  const view = (
    <View
      scale={scale}
      settings={settings}
      displayMode={displayMode}
      isDarkMode={isDarkMode}
      highlightRoots={highlightRoots}
      getNoteColor={getNoteColor}
      getHighlightColor={getHighlightColor}
      onPlay={onPlay}
    />
  );

  return (
    <div className="w-full flex flex-col gap-3">
      {stage ? <Stage>{view}</Stage> : view}

      {Controls && (
        <div className="flex flex-wrap justify-end gap-6">
          <Controls settings={settings} />
        </div>
      )}

      <HomeworkPanel />
      <ChordPanel scale={scale} />
      <PatternPanel scale={scale} />
    </div>
  );
}

export default InstrumentWorkspace;
