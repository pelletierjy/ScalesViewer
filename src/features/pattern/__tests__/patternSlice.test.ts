/**
 * Unit tests for patternSlice.ts
 */

import patternReducer, {
  initialPatternState,
  togglePatternMode,
  selectPattern,
  setTempo,
  toggleLoop,
  startPlayback,
  stopPlayback,
  advanceStep,
} from "../patternSlice";

describe("patternSlice", () => {
  it("should have correct initial state", () => {
    expect(initialPatternState).toEqual({
      isPatternModeEnabled: false,
      selectedPatternId: null,
      currentStepIndex: 0,
      isPlaying: false,
      tempo: 120,
      loop: true,
    });
  });

  it("should toggle pattern mode on/off", () => {
    const stateOn = patternReducer(initialPatternState, togglePatternMode());
    expect(stateOn.isPatternModeEnabled).toBe(true);
    const stateOff = patternReducer(stateOn, togglePatternMode());
    expect(stateOff.isPatternModeEnabled).toBe(false);
  });

  it("should reset step index and stop playing when disabling pattern mode", () => {
    const playingState = {
      ...initialPatternState,
      isPatternModeEnabled: true,
      isPlaying: true,
      currentStepIndex: 3,
    };
    const state = patternReducer(playingState, togglePatternMode());
    expect(state.isPatternModeEnabled).toBe(false);
    expect(state.isPlaying).toBe(false);
    expect(state.currentStepIndex).toBe(0);
  });

  it("should select a pattern", () => {
    const state = patternReducer(initialPatternState, selectPattern("1235"));
    expect(state.selectedPatternId).toBe("1235");
  });

  it("should set tempo", () => {
    const state = patternReducer(initialPatternState, setTempo(140));
    expect(state.tempo).toBe(140);
  });

  it("should clamp tempo to valid range 40-300", () => {
    const low = patternReducer(initialPatternState, setTempo(20));
    expect(low.tempo).toBe(40);
    const high = patternReducer(initialPatternState, setTempo(400));
    expect(high.tempo).toBe(300);
  });

  it("should toggle loop", () => {
    const stateOn = patternReducer(initialPatternState, toggleLoop());
    expect(stateOn.loop).toBe(false);
    const stateOff = patternReducer(stateOn, toggleLoop());
    expect(stateOff.loop).toBe(true);
  });

  it("should start and stop playback", () => {
    const started = patternReducer(initialPatternState, startPlayback());
    expect(started.isPlaying).toBe(true);
    expect(started.currentStepIndex).toBe(0);
    const stopped = patternReducer(started, stopPlayback());
    expect(stopped.isPlaying).toBe(false);
  });

  it("should advance step index", () => {
    const state = patternReducer(initialPatternState, advanceStep());
    expect(state.currentStepIndex).toBe(1);
  });

  it("should reset step index to 0 when advancing past last step if looping", () => {
    const stateWithPattern = patternReducer(
      initialPatternState,
      selectPattern("1235")
    );
    const atLastStep = { ...stateWithPattern, currentStepIndex: 3 };
    const advanced = patternReducer(atLastStep, advanceStep());
    expect(advanced.currentStepIndex).toBe(0);
  });

  it("should stop playback when advancing past last step if not looping", () => {
    const stateWithPattern = patternReducer(
      { ...initialPatternState, loop: false },
      selectPattern("1235")
    );
    const atLastStep = { ...stateWithPattern, currentStepIndex: 3 };
    const advanced = patternReducer(atLastStep, advanceStep());
    expect(advanced.isPlaying).toBe(false);
    expect(advanced.currentStepIndex).toBe(0);
  });
});
