/**
 * URL query-parameter mapping for the shareable Scale Display Configuration.
 *
 * Spec: specs/002-url-params/spec.md
 * Contract: specs/002-url-params/contracts/url-query-params.md
 * Data model: specs/002-url-params/data-model.md
 */

import { Note } from "@/lib/utils/note";
import { Scale, ScaleMode, ScaleType } from "@/lib/utils/scaleType";
import { ROOTS, SCALE_TYPES } from "@/lib/utils/scaleConstants";
import { getCustomScales } from "@/lib/utils/customScaleTypes";

export const URL_PARAM_KEYS = {
  root: "root",
  scaleType: "scale",
  mode: "mode",
  highlightRoots: "color",
  showFlats: "flats",
  showDegrees: "numbers",
} as const;

// The app's root-note picker (src/components/Header.tsx) only ever offers
// the sharp-spelled ROOTS values as its canonical `scale.root`; flat
// spellings ("Bb", "Db", ...) are display-only elsewhere in the app and are
// not values `scale.root` itself takes, so they must not be accepted here.
const VALID_NOTES: readonly Note[] = ROOTS;

const VALID_SCALE_MODES: readonly ScaleMode[] = [
  "ionian",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "aeolian",
  "locrian",
];

const isValidNote = (value: string): value is Note =>
  (VALID_NOTES as readonly string[]).includes(value);

const isValidScaleMode = (value: string): value is ScaleMode =>
  (VALID_SCALE_MODES as readonly string[]).includes(value);

const isValidScaleType = (value: string): value is ScaleType => {
  const builtInIds: readonly string[] = SCALE_TYPES.map((s) => s.value);
  const customIds = getCustomScales().map((s) => s.id);
  return builtInIds.includes(value) || customIds.includes(value);
};

const isBooleanFlag = (value: string): value is "1" | "0" =>
  value === "1" || value === "0";

export interface GlobalConfigUrlSlice {
  scale: Scale;
  highlightRoots: boolean;
  showFlats: boolean;
  showDegrees: boolean;
}

export interface GlobalConfigUrlPatch {
  root?: Note;
  scaleType?: ScaleType;
  mode?: ScaleMode;
  highlightRoots?: boolean;
  showFlats?: boolean;
  showDegrees?: boolean;
}

/**
 * Encode the shareable subset of GlobalConfig into a URLSearchParams instance.
 */
export function encodeGlobalConfigToParams(
  config: GlobalConfigUrlSlice
): URLSearchParams {
  const params = new URLSearchParams();
  params.set(URL_PARAM_KEYS.root, config.scale.root);
  params.set(URL_PARAM_KEYS.scaleType, config.scale.type);
  if (config.scale.mode) {
    params.set(URL_PARAM_KEYS.mode, config.scale.mode);
  }
  params.set(URL_PARAM_KEYS.highlightRoots, config.highlightRoots ? "1" : "0");
  params.set(URL_PARAM_KEYS.showFlats, config.showFlats ? "1" : "0");
  params.set(URL_PARAM_KEYS.showDegrees, config.showDegrees ? "1" : "0");
  return params;
}

/**
 * Decode a URLSearchParams instance into a patch of validated GlobalConfig
 * values. Missing or invalid values are omitted from the returned patch
 * rather than throwing, so callers can apply only what is present and valid.
 */
export function decodeParamsToGlobalConfigPatch(
  params: URLSearchParams
): GlobalConfigUrlPatch {
  const patch: GlobalConfigUrlPatch = {};

  const root = params.get(URL_PARAM_KEYS.root);
  if (root !== null && isValidNote(root)) {
    patch.root = root;
  }

  const scaleType = params.get(URL_PARAM_KEYS.scaleType);
  if (scaleType !== null && isValidScaleType(scaleType)) {
    patch.scaleType = scaleType;
  }

  const mode = params.get(URL_PARAM_KEYS.mode);
  if (mode !== null && isValidScaleMode(mode)) {
    patch.mode = mode;
  }

  const highlightRoots = params.get(URL_PARAM_KEYS.highlightRoots);
  if (highlightRoots !== null && isBooleanFlag(highlightRoots)) {
    patch.highlightRoots = highlightRoots === "1";
  }

  const showFlats = params.get(URL_PARAM_KEYS.showFlats);
  if (showFlats !== null && isBooleanFlag(showFlats)) {
    patch.showFlats = showFlats === "1";
  }

  const showDegrees = params.get(URL_PARAM_KEYS.showDegrees);
  if (showDegrees !== null && isBooleanFlag(showDegrees)) {
    patch.showDegrees = showDegrees === "1";
  }

  return patch;
}
