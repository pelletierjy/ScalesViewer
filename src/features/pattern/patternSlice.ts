import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { PRESET_PATTERNS } from "@/lib/utils/patternUtils";

export interface PatternState {
  isPatternModeEnabled: boolean;
  selectedPatternId: string | null;
  currentStepIndex: number;
  isPlaying: boolean;
  tempo: number;
  loop: boolean;
}

export const initialPatternState: PatternState = {
  isPatternModeEnabled: false,
  selectedPatternId: null,
  currentStepIndex: 0,
  isPlaying: false,
  tempo: 120,
  loop: true,
};

const getSelectedPattern = (id: string | null) =>
  PRESET_PATTERNS.find((p) => p.id === id);

const getPatternLength = (id: string | null): number =>
  getSelectedPattern(id)?.steps.length ?? 0;

export const patternSlice = createSlice({
  name: "pattern",
  initialState: initialPatternState,
  reducers: {
    togglePatternMode: (state) => {
      state.isPatternModeEnabled = !state.isPatternModeEnabled;
      if (!state.isPatternModeEnabled) {
        state.isPlaying = false;
        state.currentStepIndex = 0;
      }
    },
    selectPattern: (state, action: PayloadAction<string>) => {
      state.selectedPatternId = action.payload;
      state.currentStepIndex = 0;
      state.isPlaying = false;
    },
    setTempo: (state, action: PayloadAction<number>) => {
      state.tempo = Math.max(40, Math.min(300, action.payload));
    },
    toggleLoop: (state) => {
      state.loop = !state.loop;
    },
    startPlayback: (state) => {
      state.isPlaying = true;
      state.currentStepIndex = 0;
    },
    stopPlayback: (state) => {
      state.isPlaying = false;
    },
    advanceStep: (state) => {
      const length = getPatternLength(state.selectedPatternId);
      const nextIndex = state.currentStepIndex + 1;
      if (length > 0 && nextIndex >= length) {
        if (state.loop) {
          state.currentStepIndex = 0;
        } else {
          state.isPlaying = false;
          state.currentStepIndex = 0;
        }
      } else {
        state.currentStepIndex = nextIndex;
      }
    },
  },
});

export const {
  togglePatternMode,
  selectPattern,
  setTempo,
  toggleLoop,
  startPlayback,
  stopPlayback,
  advanceStep,
} = patternSlice.actions;

export default patternSlice.reducer;

const selectPatternState = (state: { pattern: PatternState }) => state.pattern;

export const selectIsPatternModeEnabled = (state: { pattern: PatternState }) =>
  selectPatternState(state).isPatternModeEnabled;
export const selectSelectedPatternId = (state: { pattern: PatternState }) =>
  selectPatternState(state).selectedPatternId;
export const selectCurrentStepIndex = (state: { pattern: PatternState }) =>
  selectPatternState(state).currentStepIndex;
export const selectIsPlaying = (state: { pattern: PatternState }) =>
  selectPatternState(state).isPlaying;
export const selectTempo = (state: { pattern: PatternState }) =>
  selectPatternState(state).tempo;
export const selectLoop = (state: { pattern: PatternState }) =>
  selectPatternState(state).loop;
