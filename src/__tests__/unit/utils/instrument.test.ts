import { defaultInstrument, getRouteInstrument, INSTRUMENTS } from "@/lib/utils/instrument";

describe("getRouteInstrument", () => {
  it("reads the instrument from a trailing-slash route", () => {
    expect(getRouteInstrument("/guitar/")).toBe("guitar");
    expect(getRouteInstrument("/piano/")).toBe("piano");
  });

  it("reads the instrument from a route without a trailing slash", () => {
    expect(getRouteInstrument("/guitar")).toBe("guitar");
  });

  it("returns null for the root route", () => {
    expect(getRouteInstrument("/")).toBeNull();
  });

  it("returns null for non-instrument paths", () => {
    expect(getRouteInstrument("/index.html")).toBeNull();
    expect(getRouteInstrument("/not-an-instrument/")).toBeNull();
    expect(getRouteInstrument("")).toBeNull();
  });

  it("returns null for unknown nested paths", () => {
    expect(getRouteInstrument("/guitar/extra")).toBe("guitar");
    expect(getRouteInstrument("/nope/extra")).toBeNull();
  });

  it("recognises every declared instrument", () => {
    for (const instrument of INSTRUMENTS) {
      expect(getRouteInstrument(`/${instrument}/`)).toBe(instrument);
    }
  });

  it("always resolves the default instrument to itself", () => {
    expect(getRouteInstrument(`/${defaultInstrument}/`)).toBe(defaultInstrument);
  });
});