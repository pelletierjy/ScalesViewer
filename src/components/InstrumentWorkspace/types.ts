import React from "react";
import { Note, NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";
import { DisplayMode } from "@/lib/utils/scaleUtils";

/**
 * Everything an instrument view needs from the workspace. Views render only
 * their own drawing surface; the tooling around them is the workspace's job.
 */
export interface InstrumentViewProps<S = void> {
  scale: Scale;
  settings: S;
  displayMode: DisplayMode;
  isDarkMode: boolean;
  highlightRoots: boolean;
  getNoteColor: (note: Note) => string;
  getHighlightColor: (note: Note, fallback: string) => string;
  onPlay: (note: NoteWithOctave) => void;
}

export interface InstrumentDefinition<S = void> {
  /** Instrument-owned state, usually persisted to localStorage. */
  useSettings: () => S;
  /** Rendered into the shared tool row above the panels. */
  Controls?: React.FC<{ settings: S }>;
  View: React.FC<InstrumentViewProps<S>>;
  /** Wrap the view in a <Stage>. Default true; guitar manages its own surface. */
  stage?: boolean;
}
