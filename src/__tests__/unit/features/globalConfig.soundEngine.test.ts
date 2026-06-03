/**
 * Spec: specs/instrument-audio/spec.md — FR-010
 */

import globalConfigReducer, {
  initialState,
  setSoundEngine,
} from "@/features/globalConfig/globalConfigSlice";

describe("globalConfig soundEngine (FR-010)", () => {
  it("defaults to sample", () => {
    expect(initialState.soundEngine).toBe("sample");
  });

  it("updates via setSoundEngine", () => {
    const state = globalConfigReducer(initialState, setSoundEngine("synth"));
    expect(state.soundEngine).toBe("synth");

    const sine = globalConfigReducer(state, setSoundEngine("sine"));
    expect(sine.soundEngine).toBe("sine");
  });
});
