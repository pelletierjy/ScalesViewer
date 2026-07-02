/**
 * Tests for FluteDiagram component (T019)
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { FluteDiagram } from "@/app/flute/FluteDiagram";
import { Scale } from "@/lib/utils/scaleType";

const mockScale: Scale = { root: "C", type: "major", mode: "ionian" };

describe("FluteDiagram (T019)", () => {
  it("calls onPlay with correct note on click", () => {
    const onPlay = jest.fn();
    const { container } = render(
      <FluteDiagram
        note="C4"
        scale={mockScale}
        displayMode="note"
        isDarkMode={false}
        highlightRoots={false}
        onPlay={onPlay}
      />
    );

    const diagram = container.querySelector("[role='button']");
    expect(diagram).toBeTruthy();
    fireEvent.click(diagram!);
    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onPlay).toHaveBeenCalledWith("C4");
  });

  it("calls onPlay with correct note on Enter key", () => {
    const onPlay = jest.fn();
    const { container } = render(
      <FluteDiagram
        note="G4"
        scale={mockScale}
        displayMode="note"
        isDarkMode={false}
        highlightRoots={false}
        onPlay={onPlay}
      />
    );

    const diagram = container.querySelector("[role='button']");
    expect(diagram).toBeTruthy();
    fireEvent.keyDown(diagram!, { key: "Enter", code: "Enter" });
    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onPlay).toHaveBeenCalledWith("G4");
  });

  it("calls onPlay with correct note on Space key", () => {
    const onPlay = jest.fn();
    const { container } = render(
      <FluteDiagram
        note="D4"
        scale={mockScale}
        displayMode="note"
        isDarkMode={false}
        highlightRoots={false}
        onPlay={onPlay}
      />
    );

    const diagram = container.querySelector("[role='button']");
    expect(diagram).toBeTruthy();
    fireEvent.keyDown(diagram!, { key: " ", code: "Space" });
    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onPlay).toHaveBeenCalledWith("D4");
  });
});
