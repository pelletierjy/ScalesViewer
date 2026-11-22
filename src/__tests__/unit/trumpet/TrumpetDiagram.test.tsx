/**
 * Tests for TrumpetDiagram component: play interaction and valve rendering.
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TrumpetDiagram } from "@/instruments/trumpet/TrumpetDiagram";
import { getTrumpetType } from "@/instruments/trumpet/trumpetFingerings";
import { NoteWithOctave } from "@/lib/utils/note";
import { Scale } from "@/lib/utils/scaleType";

const mockScale: Scale = { root: "C", type: "major", mode: "ionian" };
const bb = getTrumpetType("bb");

const renderDiagram = (note: string) => {
  const onPlay = jest.fn();
  const utils = render(
    <TrumpetDiagram
      note={note as NoteWithOctave}
      trumpet={bb}
      scale={mockScale}
      displayMode="note"
      isDarkMode={false}
      highlightRoots={false}
      onPlay={onPlay}
    />
  );
  return { onPlay, ...utils };
};

/** The three valve caps (r = 9); a cap sits lower in the block when pressed. */
const valveCaps = (container: HTMLElement) =>
  Array.from(
    container.querySelectorAll("circle[r='9']")
  ) as SVGCircleElement[];

const pressedCount = (container: HTMLElement) =>
  valveCaps(container).filter(
    (cap) => Number(cap.getAttribute("cy")) === 137
  ).length;

describe("TrumpetDiagram", () => {
  it("calls onPlay with the note on click", () => {
    const { onPlay, container } = renderDiagram("C4");
    const diagram = container.querySelector("[role='button']");
    expect(diagram).toBeTruthy();
    fireEvent.click(diagram!);
    expect(onPlay).toHaveBeenCalledWith("C4");
  });

  it("calls onPlay on Enter and Space", () => {
    const { onPlay, container } = renderDiagram("G4");
    const diagram = container.querySelector("[role='button']");
    fireEvent.keyDown(diagram!, { key: "Enter", code: "Enter" });
    fireEvent.keyDown(diagram!, { key: " ", code: "Space" });
    expect(onPlay).toHaveBeenCalledTimes(2);
    expect(onPlay).toHaveBeenLastCalledWith("G4");
  });

  it("depresses the valves the chart asks for", () => {
    // Concert C4 = written D4 on a B♭ trumpet → valves 1 and 3.
    const { container } = renderDiagram("C4");
    expect(valveCaps(container)).toHaveLength(3);
    expect(pressedCount(container)).toBe(2);
  });

  it("leaves every valve up for an open note", () => {
    // Concert B♭4 = written C5 → open.
    const { container } = renderDiagram("Bb4");
    expect(pressedCount(container)).toBe(0);
    expect(container.textContent).toContain("0");
  });

  it("presses all three valves for the lowest note", () => {
    // Concert E3 = written F#3 → 1-2-3.
    const { container } = renderDiagram("E3");
    expect(pressedCount(container)).toBe(3);
  });

  it("shows no pressed valve for a note outside the charted range", () => {
    const { container } = renderDiagram("C#6");
    expect(pressedCount(container)).toBe(0);
    // The out-of-chart summary is an en dash rather than "0" (open).
    expect(container.textContent).toContain("–");
  });

  it("labels the diagram for screen readers", () => {
    const { container } = renderDiagram("C4");
    expect(container.querySelector("[role='button']")).toHaveAttribute(
      "aria-label",
      "Play {note} on trumpet"
    );
  });
});
