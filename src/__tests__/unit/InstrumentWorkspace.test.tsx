/**
 * The shared instrument workspace owns the page-level tooling that every
 * instrument used to duplicate.
 */

import React from "react";
import { screen } from "@testing-library/react";
import { InstrumentWorkspace } from "@/components/InstrumentWorkspace/InstrumentWorkspace";
import { INSTRUMENTS } from "@/lib/utils/instrument";
import { renderWithProviders } from "@/__tests__/test-utils";

jest.mock("@/lib/hooks/usePlayNote", () => ({
  usePlayNote: () => jest.fn(),
}));

describe("InstrumentWorkspace", () => {
  it.each(INSTRUMENTS)("renders the shared panels exactly once for %s", (instrument) => {
    const { container } = renderWithProviders(
      <InstrumentWorkspace instrument={instrument} />
    );

    expect(screen.getAllByText("Chord-Scale Intersection")).toHaveLength(1);
    expect(screen.getAllByText("Learn music theory")).toHaveLength(1);
    // Chord, homework and pattern panels, in that order.
    const titles = Array.from(container.querySelectorAll(".rack-label")).map(
      (el) => el.textContent
    );
    expect(titles.slice(0, 2)).toEqual([
      "Chord-Scale Intersection",
      "Learn music theory",
    ]);
    expect(titles).toHaveLength(3);
  });

  it.each([
    ["piano", "Select number of octaves to display"],
    ["flute", "Select number of notes to display"],
    ["recorder", "Select recorder type"],
    ["harmonica", "Harmonica Key"],
  ] as const)("renders the %s control in the shared tool row", (instrument, label) => {
    renderWithProviders(<InstrumentWorkspace instrument={instrument} />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it("renders no tool row for an instrument without controls", () => {
    const { container } = renderWithProviders(
      <InstrumentWorkspace instrument="kalimba" />
    );
    expect(container.querySelectorAll("select")).toHaveLength(0);
  });
});
