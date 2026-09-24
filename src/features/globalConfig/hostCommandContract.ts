import { isInstrument } from "@/lib/utils/instrument";
import { SoundEngine } from "@/lib/audio/instrumentSampleConfig";
import { isValidNote, isValidScaleMode, isValidScaleType } from "./urlConfigParams";

/**
 * Wire contract for commands the embedded AI tutor (`conversia-app`'s
 * `<conversia-app>` widget) dispatches to control this app's state
 * directly. Canonical source of truth: conversia-app's
 * `src/models/host-commands.ts` — keep this in sync with it by hand.
 */
export const HOST_COMMAND_PROTOCOL_VERSION = 1;

export const HOST_COMMAND_EVENT_NAME = "conversia-app:command";

export type HostCommand =
  | {
      type: "setScaleDisplay";
      root?: string;
      scaleType?: string;
      mode?: string;
      highlightRoots?: boolean;
      showFlats?: boolean;
      showDegrees?: boolean;
    }
  | { type: "setInstrument"; value: string }
  | { type: "setChordScaleMode"; value: boolean }
  | { type: "setSoundEngine"; value: string };

export interface HostCommandEventDetail {
  version: number;
  sessionId: string;
  commands: HostCommand[];
}

const VALID_SOUND_ENGINES: readonly SoundEngine[] = ["sample", "synth", "sine"];

const isValidSoundEngine = (value: string): value is SoundEngine =>
  (VALID_SOUND_ENGINES as readonly string[]).includes(value);

function parseScaleDisplayCommand(
  raw: Record<string, unknown>
): Extract<HostCommand, { type: "setScaleDisplay" }> | null {
  const command: Extract<HostCommand, { type: "setScaleDisplay" }> = {
    type: "setScaleDisplay",
  };
  let hasAnyField = false;

  if (raw.root !== undefined) {
    if (typeof raw.root !== "string" || !isValidNote(raw.root)) return null;
    command.root = raw.root;
    hasAnyField = true;
  }
  if (raw.scaleType !== undefined) {
    if (typeof raw.scaleType !== "string" || !isValidScaleType(raw.scaleType)) return null;
    command.scaleType = raw.scaleType;
    hasAnyField = true;
  }
  if (raw.mode !== undefined) {
    if (typeof raw.mode !== "string" || !isValidScaleMode(raw.mode)) return null;
    command.mode = raw.mode;
    hasAnyField = true;
  }
  if (raw.highlightRoots !== undefined) {
    if (typeof raw.highlightRoots !== "boolean") return null;
    command.highlightRoots = raw.highlightRoots;
    hasAnyField = true;
  }
  if (raw.showFlats !== undefined) {
    if (typeof raw.showFlats !== "boolean") return null;
    command.showFlats = raw.showFlats;
    hasAnyField = true;
  }
  if (raw.showDegrees !== undefined) {
    if (typeof raw.showDegrees !== "boolean") return null;
    command.showDegrees = raw.showDegrees;
    hasAnyField = true;
  }

  return hasAnyField ? command : null;
}

/**
 * Validates an unknown payload into a HostCommand, or returns null for
 * anything malformed. Never throws — the tutor's output is untrusted LLM
 * output, and an invalid command should be skipped, not abort the batch.
 */
export function parseHostCommand(raw: unknown): HostCommand | null {
  if (typeof raw !== "object" || raw === null) return null;
  const record = raw as Record<string, unknown>;

  switch (record.type) {
    case "setScaleDisplay":
      return parseScaleDisplayCommand(record);
    case "setInstrument":
      return typeof record.value === "string" && isInstrument(record.value)
        ? { type: "setInstrument", value: record.value }
        : null;
    case "setChordScaleMode":
      return typeof record.value === "boolean"
        ? { type: "setChordScaleMode", value: record.value }
        : null;
    case "setSoundEngine":
      return typeof record.value === "string" && isValidSoundEngine(record.value)
        ? { type: "setSoundEngine", value: record.value }
        : null;
    default:
      return null;
  }
}
