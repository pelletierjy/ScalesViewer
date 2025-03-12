import { TuningPreset } from "@/app/guitar/types/tuningPreset";
import { createSlice } from "@reduxjs/toolkit";
import { initializeApplication } from "../application/applicationSlice";
import { WritableDraft } from "immer";
import { Instrument } from "@/lib/utils/instrument";
import { Scale } from "@/lib/utils/scaleType";
import { TUNING_PRESETS } from "@/app/guitar/tuningConstants";

/**
 * GlobalConfig
 *
 * @description Hold the global configuration settings.
 */
export interface GlobalConfig {
  isDarkMode: boolean;
  instrument: Instrument;
  scale: Scale;
  scaleRoot: TuningPreset;
  showFlats: boolean;
  highlightRoots: boolean;
  showDegrees: boolean;
}

const updateState = (
  savedState: GlobalConfig | undefined,
  state: WritableDraft<GlobalConfig>
) => {
  if (savedState) {
    state.isDarkMode = savedState?.isDarkMode ?? true;
    state.instrument = savedState?.instrument ?? "piano";
    state.scale = savedState?.scale ?? {
      root: "A",
      type: "major",
      mode: "ionian",
    };
    state.scaleRoot = savedState?.scaleRoot ?? TUNING_PRESETS[0];
    state.showFlats = savedState?.showFlats ?? false;
    state.highlightRoots = savedState?.highlightRoots ?? true;
    state.showDegrees = savedState?.showDegrees ?? false;
  }
};

const loadState = (): GlobalConfig | undefined => {
  // Skip during server-side rendering or when window is not available
  if (typeof window === "undefined") return undefined;

  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState)?.globalConfig;
  } catch {
    console.error("Failed to load state from localStorage");
    return undefined;
  }
};

export const initialState: GlobalConfig = {
  isDarkMode: true,
  instrument: "piano",
  scale: {
    root: "A",
    type: "major",
    mode: "ionian",
  },
  scaleRoot: TUNING_PRESETS[0],
  showFlats: false,
  highlightRoots: true,
  showDegrees: false,
};

export const globalConfigSlice = createSlice({
  name: "globalConfig",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setInstrument: (state, action) => {
      state.instrument = action.payload;
    },
    saveState: () => {
      /* Just triggering the middleware. */
    },
    setScale: (state, action) => {
      state.scale = action.payload;
    },
    setCurrentTuning: (state, action) => {
      state.scaleRoot = action.payload;
    },
    toggleShowFlats: (state) => {
      state.showFlats = !state.showFlats;
    },
    toggleShowMonochrome: (state) => {
      state.highlightRoots = !state.highlightRoots;
    },
    toggleShowDegrees: (state) => {
      state.showDegrees = !state.showDegrees;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeApplication, (state, action) => {
      if (action.type !== "applicationState/initializeApplication") {
        return;
      }
      updateState(loadState(), state);
    });
  },
});

export const {
  toggleDarkMode,
  setInstrument,
  saveState,
  setScale,
  setCurrentTuning,
  toggleShowFlats,
  toggleShowMonochrome,
  toggleShowDegrees,
} = globalConfigSlice.actions;

export default globalConfigSlice.reducer;

const selectGlobalConfig = (state: { globalConfig: GlobalConfig }) =>
  state.globalConfig;

export const selectIsDarkMode = (state: { globalConfig: GlobalConfig }) =>
  selectGlobalConfig(state).isDarkMode;
export const selectInstrument = (state: { globalConfig: GlobalConfig }) =>
  selectGlobalConfig(state).instrument;
export const selectScale = (state: { globalConfig: GlobalConfig }) =>
  selectGlobalConfig(state).scale;
export const selectTuning = (state: { globalConfig: GlobalConfig }) =>
  selectGlobalConfig(state).scaleRoot;
export const selectShowFlats = (state: { globalConfig: GlobalConfig }) =>
  selectGlobalConfig(state).showFlats;
export const selectIsMonochrome = (state: { globalConfig: GlobalConfig }) =>
  selectGlobalConfig(state).highlightRoots;
export const selectShowDegrees = (state: { globalConfig: GlobalConfig }) =>
  selectGlobalConfig(state).showDegrees;
