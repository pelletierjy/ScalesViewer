import { TuningPresetWithMetadata, TUNING_PRESETS } from "./tuningConstants";

export const tuningGroups = (customTunings: TuningPresetWithMetadata[]) =>
  [...TUNING_PRESETS, ...customTunings].reduce((groups, scaleRoot) => {
    const category = scaleRoot.category || "Other";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(scaleRoot);
    return groups;
  }, {} as Record<string, TuningPresetWithMetadata[]>);

export const getCustomTunings = () => {
  let _customTuning: TuningPresetWithMetadata[] = [];
  // Skip during server-side rendering or when window is not available
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("custom-tunings");
      if (saved) {
        _customTuning = JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load custom tunings:", e);
    }
  }
  return _customTuning;
};

export const saveTuning = (tunning: TuningPresetWithMetadata[]) => {
  try {
    localStorage.setItem("custom-tunings", JSON.stringify(tunning));
  } catch (e) {
    console.error("Failed to save custom tunings:", e);
  }
}

export const getTuning = (): TuningPresetWithMetadata => {
  let defaultTuning = TUNING_PRESETS[0];
  const savedTuning = localStorage.getItem("current-scaleRoot");
  if (savedTuning) {
    try {
      const parsedTuning = JSON.parse(savedTuning);
      const matchingTuning = [...TUNING_PRESETS].find(
        (t) => t.name === parsedTuning.name
      );
      if (matchingTuning) {
        defaultTuning = matchingTuning;
      }
    } catch (e) {
      console.error("Failed to load saved scaleRoot:", e);
    }
  }
  return defaultTuning;
};
