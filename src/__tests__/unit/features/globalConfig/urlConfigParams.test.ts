/**
 * Spec: specs/002-url-params/spec.md — FR-001..FR-005, FR-008, FR-009
 */

import {
  encodeGlobalConfigToParams,
  decodeParamsToGlobalConfigPatch,
  URL_PARAM_KEYS,
} from "@/features/globalConfig/urlConfigParams";
import { Scale } from "@/lib/utils/scaleType";

describe("encodeGlobalConfigToParams", () => {
  it("encodes all five settings into query params", () => {
    const scale: Scale = { root: "D", type: "major" };
    const params = encodeGlobalConfigToParams({
      scale,
      highlightRoots: true,
      showFlats: false,
      showDegrees: true,
    });

    expect(params.get(URL_PARAM_KEYS.root)).toBe("D");
    expect(params.get(URL_PARAM_KEYS.scaleType)).toBe("major");
    expect(params.get(URL_PARAM_KEYS.mode)).toBeNull();
    expect(params.get(URL_PARAM_KEYS.highlightRoots)).toBe("1");
    expect(params.get(URL_PARAM_KEYS.showFlats)).toBe("0");
    expect(params.get(URL_PARAM_KEYS.showDegrees)).toBe("1");
  });

  it("includes mode when the scale has one", () => {
    const scale: Scale = { root: "E", type: "dorian", mode: "dorian" };
    const params = encodeGlobalConfigToParams({
      scale,
      highlightRoots: false,
      showFlats: false,
      showDegrees: false,
    });

    expect(params.get(URL_PARAM_KEYS.mode)).toBe("dorian");
  });
});

describe("decodeParamsToGlobalConfigPatch", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("round-trips a fully valid query string", () => {
    const scale: Scale = { root: "C#", type: "harmonic-minor" };
    const encoded = encodeGlobalConfigToParams({
      scale,
      highlightRoots: true,
      showFlats: true,
      showDegrees: false,
    });

    const patch = decodeParamsToGlobalConfigPatch(encoded);

    expect(patch).toEqual({
      root: "C#",
      scaleType: "harmonic-minor",
      highlightRoots: true,
      showFlats: true,
      showDegrees: false,
    });
  });

  it("returns an empty patch for an empty query string", () => {
    expect(decodeParamsToGlobalConfigPatch(new URLSearchParams())).toEqual({});
  });

  it("omits an invalid root but keeps other valid values", () => {
    const params = new URLSearchParams({
      [URL_PARAM_KEYS.root]: "H#",
      [URL_PARAM_KEYS.scaleType]: "major",
    });

    const patch = decodeParamsToGlobalConfigPatch(params);

    expect(patch.root).toBeUndefined();
    expect(patch.scaleType).toBe("major");
  });

  it("omits an invalid scale type but keeps other valid values", () => {
    const params = new URLSearchParams({
      [URL_PARAM_KEYS.root]: "F",
      [URL_PARAM_KEYS.scaleType]: "not-a-real-scale",
    });

    const patch = decodeParamsToGlobalConfigPatch(params);

    expect(patch.root).toBe("F");
    expect(patch.scaleType).toBeUndefined();
  });

  it("omits an invalid mode", () => {
    const params = new URLSearchParams({
      [URL_PARAM_KEYS.mode]: "not-a-mode",
    });

    expect(decodeParamsToGlobalConfigPatch(params).mode).toBeUndefined();
  });

  it("omits boolean flags with values other than 1/0", () => {
    const params = new URLSearchParams({
      [URL_PARAM_KEYS.highlightRoots]: "true",
      [URL_PARAM_KEYS.showFlats]: "yes",
      [URL_PARAM_KEYS.showDegrees]: "0",
    });

    const patch = decodeParamsToGlobalConfigPatch(params);

    expect(patch.highlightRoots).toBeUndefined();
    expect(patch.showFlats).toBeUndefined();
    expect(patch.showDegrees).toBe(false);
  });

  it("accepts a custom scale id registered in localStorage", () => {
    localStorage.setItem(
      "custom-scales",
      JSON.stringify([
        {
          id: "custom-abc123",
          label: "My Scale",
          group: "Custom",
          intervals: [0, 2, 4, 5, 7, 9, 11],
        },
      ])
    );

    const params = new URLSearchParams({
      [URL_PARAM_KEYS.scaleType]: "custom-abc123",
    });

    expect(decodeParamsToGlobalConfigPatch(params).scaleType).toBe(
      "custom-abc123"
    );
  });

  it("supports a partial parameter set", () => {
    const params = new URLSearchParams({
      [URL_PARAM_KEYS.root]: "A#",
      [URL_PARAM_KEYS.showFlats]: "1",
    });

    expect(decodeParamsToGlobalConfigPatch(params)).toEqual({
      root: "A#",
      showFlats: true,
    });
  });

  it("omits a flat-spelled root, since scale.root only ever uses sharp spellings", () => {
    const params = new URLSearchParams({ [URL_PARAM_KEYS.root]: "Bb" });

    expect(decodeParamsToGlobalConfigPatch(params).root).toBeUndefined();
  });

  it("omits multiple invalid values while keeping valid ones from the same query string", () => {
    const params = new URLSearchParams({
      [URL_PARAM_KEYS.root]: "D",
      [URL_PARAM_KEYS.scaleType]: "bogus-scale",
      [URL_PARAM_KEYS.highlightRoots]: "1",
      [URL_PARAM_KEYS.showFlats]: "maybe",
    });

    expect(decodeParamsToGlobalConfigPatch(params)).toEqual({
      root: "D",
      highlightRoots: true,
    });
  });
});
