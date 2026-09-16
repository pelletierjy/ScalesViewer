/**
 * Tests for Flute page (T015)
 */

import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import Flute from "@/app/flute/page";
import { renderWithProviders } from "@/__tests__/test-utils";

// Scope to the flute fingering diagrams; the Chord/Pattern panels also
// render buttons, so match on their "…on flute" aria-label.
const getDiagrams = () => screen.getAllByRole("button", { name: /on flute$/ });

describe("FlutePage (T015)", () => {
  it("renders 7 diagrams by default", () => {
    renderWithProviders(<Flute />);
    expect(getDiagrams()).toHaveLength(7);
  });

  it("updates to 12 diagrams when note count changes to 12", () => {
    renderWithProviders(<Flute />);
    const select = screen.getByLabelText("Select number of notes to display");
    fireEvent.change(select, { target: { value: "12" } });
    expect(getDiagrams()).toHaveLength(12);
  });

  it("updates to 3 diagrams when note count changes to 3", () => {
    renderWithProviders(<Flute />);
    const select = screen.getByLabelText("Select number of notes to display");
    fireEvent.change(select, { target: { value: "3" } });
    expect(getDiagrams()).toHaveLength(3);
  });
});
