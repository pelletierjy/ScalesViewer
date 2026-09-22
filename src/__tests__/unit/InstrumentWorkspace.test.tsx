/**
 * The shared instrument workspace owns the page-level tooling that every
 * instrument used to duplicate. The chord/homework/pattern panels deliberately
 * live in ClientLayout instead, so they survive an instrument change.
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
  it.each(INSTRUMENTS)("renders %s without the shared panels", (instrument) => {
    renderWithProviders(<InstrumentWorkspace instrument={instrument} />);

    expect(screen.queryByText("Chord-Scale Intersection")).not.toBeInTheDocument();
    expect(screen.queryByText("Learn music theory")).not.toBeInTheDocument();
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
