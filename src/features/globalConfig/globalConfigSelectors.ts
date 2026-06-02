import { RootState } from "@/app/store";
import { Scale } from "@/lib/utils/scaleType";

export const selectChordScaleMode = (state: RootState) =>
  state.globalConfig.chordScaleMode;

export const selectSelectedChord = (state: RootState) =>
  state.globalConfig.selectedChord;
