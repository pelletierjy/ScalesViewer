import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalConfigReducer from "@/features/globalConfig/globalConfigSlice";
import applicationStateReducer from "@/features/application/applicationSlice";
import audioReducer from "@/features/audio/audioSlice";
import selectedNoteReducer from "@/features/selectedNote/selectedNoteSlice";
import { DataProvider, useDataContext } from "@/app/guitar/context";
import { FrettedNotes } from "@/app/guitar/GuitarNeck/FrettedNotes";
import { GuitarNeck } from "@/app/guitar/GuitarNeck/GuitarNeck";
import { render } from "@testing-library/react";
import type { NoteWithOctave } from "@/lib/utils/note";
import type { Scale } from "@/lib/utils/scaleType";

function createGuitarTestStore() {
  return configureStore({
    reducer: {
      globalConfig: globalConfigReducer,
      applicationState: applicationStateReducer,
      audio: audioReducer,
      selectedNote: selectedNoteReducer,
    },
  });
}

function renderWithGuitarProviders(
  ui: React.ReactElement,
  { store = createGuitarTestStore() } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <DataProvider>{children}</DataProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper }) };
}

describe("Guitar string and fret position enable", () => {
  beforeEach(() => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    (window.localStorage.setItem as jest.Mock).mockClear();
  });

  describe("DataProvider context", () => {
    function ContextConsumer() {
      const {
        stringEnabled,
        setStringEnabled,
        fretPositionEnabled,
        setFretPositionEnabled,
        scaleRoot,
        fretCount,
      } = useDataContext();
      return (
        <div>
          <span data-testid="string-enabled-length">{stringEnabled.length}</span>
          <span data-testid="string-enabled-values">
            {stringEnabled.join(",")}
          </span>
          <span data-testid="fret-enabled-length">
            {fretPositionEnabled.length}
          </span>
          <span data-testid="fret-enabled-values">
            {fretPositionEnabled.join(",")}
          </span>
          <span data-testid="string-count">{scaleRoot.strings.length}</span>
          <span data-testid="fret-count">{fretCount}</span>
          <button
            data-testid="toggle-string-0"
            onClick={() =>
              setStringEnabled((prev) => {
                const next = [...prev];
                next[0] = !next[0];
                return next;
              })
            }
          >
            Toggle string 0
          </button>
          <button
            data-testid="toggle-fret-2"
            onClick={() =>
              setFretPositionEnabled((prev) => {
                const next = [...prev];
                next[2] = !next[2];
                return next;
              })
            }
          >
            Toggle fret 3
          </button>
        </div>
      );
    }

    it("provides stringEnabled with length matching scaleRoot.strings and default true", () => {
      renderWithGuitarProviders(<ContextConsumer />);
      const stringCount = parseInt(
        screen.getByTestId("string-count").textContent ?? "0",
        10
      );
      expect(screen.getByTestId("string-enabled-length")).toHaveTextContent(
        String(stringCount)
      );
      const values = screen.getByTestId("string-enabled-values").textContent ?? "";
      expect(values.split(",").every((v) => v === "true")).toBe(true);
    });

    it("provides fretPositionEnabled with length matching fretCount and default true", () => {
      renderWithGuitarProviders(<ContextConsumer />);
      const fretCount = parseInt(
        screen.getByTestId("fret-count").textContent ?? "0",
        10
      );
      expect(screen.getByTestId("fret-enabled-length")).toHaveTextContent(
        String(fretCount)
      );
      const values = screen.getByTestId("fret-enabled-values").textContent ?? "";
      expect(values.split(",").every((v) => v === "true")).toBe(true);
    });

    it("setStringEnabled toggles the given string index", () => {
      renderWithGuitarProviders(<ContextConsumer />);
      const valuesEl = screen.getByTestId("string-enabled-values");
      expect(valuesEl.textContent).toContain("true");

      fireEvent.click(screen.getByTestId("toggle-string-0"));
      expect(valuesEl.textContent).toMatch(/^false,/);
      fireEvent.click(screen.getByTestId("toggle-string-0"));
      expect(valuesEl.textContent).toMatch(/^true,/);
    });

    it("setFretPositionEnabled toggles the given fret index", () => {
      renderWithGuitarProviders(<ContextConsumer />);
      const valuesEl = screen.getByTestId("fret-enabled-values");

      fireEvent.click(screen.getByTestId("toggle-fret-2"));
      const parts = (valuesEl.textContent ?? "").split(",");
      expect(parts[2]).toBe("false");
      fireEvent.click(screen.getByTestId("toggle-fret-2"));
      expect((valuesEl.textContent ?? "").split(",")[2]).toBe("true");
    });
  });

  describe("FrettedNotes disabled style", () => {
    const defaultScale: Scale = {
      root: "C",
      type: "major",
      mode: "ionian",
    };
    const defaultDimensions = { width: 400, height: 120 };
    const stringSpacing = 20;
    const mockCalculateNoteWithOctave = (
      _openNote: string,
      _stringIndex: number,
      _fret: number
    ): NoteWithOctave => "C4";

    const defaultProps = {
      openNote: "E" as const,
      stringIndex: 0,
      fretCount: 12,
      dimensions: defaultDimensions,
      stringSpacing,
      scale: defaultScale,
      isDarkMode: true,
      showDegrees: false,
      showFlats: false,
      highlightRoots: false,
      flipX: false,
      flipY: false,
      calculateNoteWithOctave: mockCalculateNoteWithOctave,
      fretPositions: [] as number[],
    };

    it("renders scale notes with normal style when string and fret position are enabled", () => {
      const { container } = renderWithGuitarProviders(
        <svg>
          <FrettedNotes
            {...defaultProps}
            isStringEnabled={true}
            fretPositionEnabled={Array(12).fill(true)}
          />
        </svg>
      );
      const circles = container.querySelectorAll("circle");
      expect(circles.length).toBeGreaterThan(0);
      const firstCircle = circles[0];
      expect(firstCircle.getAttribute("fill")).not.toBe("#9ca3af");
      const parentG = firstCircle.closest("g");
      const style = parentG?.getAttribute("style") ?? "";
      expect(style).not.toContain("opacity: 0.5");
    });

    it("applies disabled style (grey fill, opacity) when isStringEnabled is false", () => {
      const { container } = renderWithGuitarProviders(
        <svg>
          <FrettedNotes
            {...defaultProps}
            isStringEnabled={false}
            fretPositionEnabled={Array(12).fill(true)}
          />
        </svg>
      );
      const circles = container.querySelectorAll("circle");
      expect(circles.length).toBeGreaterThan(0);
      circles.forEach((circle) => {
        expect(circle.getAttribute("fill")).toBe("#9ca3af");
      });
      const groups = container.querySelectorAll('g[style*="opacity"]');
      expect(groups.length).toBeGreaterThan(0);
      groups.forEach((g) => {
        expect(g.getAttribute("style")).toContain("opacity: 0.5");
      });
    });

    it("applies disabled style for notes at a disabled fret position", () => {
      const fretPositionEnabled = Array(12).fill(true) as boolean[];
      fretPositionEnabled[2] = false; // disable fret 3 (index 2)
      const { container } = renderWithGuitarProviders(
        <svg>
          <FrettedNotes
            {...defaultProps}
            isStringEnabled={true}
            fretPositionEnabled={fretPositionEnabled}
          />
        </svg>
      );
      const groups = container.querySelectorAll("g");
      const disabledGroups = Array.from(groups).filter(
        (g) => g.getAttribute("style")?.includes("opacity: 0.5")
      );
      const disabledCircles = Array.from(container.querySelectorAll("circle")).filter(
        (c) => c.getAttribute("fill") === "#9ca3af"
      );
      expect(disabledCircles.length).toBeGreaterThan(0);
      expect(disabledGroups.length).toBeGreaterThan(0);
    });

    it("renders note text with grey fill when string is disabled", () => {
      const { container } = renderWithGuitarProviders(
        <svg>
          <FrettedNotes
            {...defaultProps}
            isStringEnabled={false}
            fretPositionEnabled={Array(12).fill(true)}
          />
        </svg>
      );
      const texts = container.querySelectorAll("text");
      expect(texts.length).toBeGreaterThan(0);
      texts.forEach((text) => {
        expect(text.getAttribute("fill")).toBe("#6b7280");
      });
    });
  });

  describe("GuitarNeck checkboxes", () => {
    it("renders string enable checkboxes (one per string) and fret position checkboxes (one per fret)", () => {
      renderWithGuitarProviders(<GuitarNeck />);
      const stringToggles = screen.getByLabelText("String enable toggles");
      expect(stringToggles).toBeInTheDocument();
      const fretToggles = screen.getByLabelText("Fret position enable toggles");
      expect(fretToggles).toBeInTheDocument();

      const allCheckboxes = screen.getAllByRole("checkbox");
      const stringCheckboxes = allCheckboxes.filter((el) =>
        el.getAttribute("aria-label")?.startsWith("String ")
      );
      const fretCheckboxes = allCheckboxes.filter((el) =>
        el.getAttribute("aria-label")?.startsWith("Fret ")
      );
      expect(stringCheckboxes.length).toBeGreaterThanOrEqual(1);
      expect(fretCheckboxes.length).toBeGreaterThanOrEqual(1);
    });

    it("string checkboxes are checked by default", () => {
      renderWithGuitarProviders(<GuitarNeck />);
      const stringCheckboxes = screen
        .getAllByRole("checkbox")
        .filter((el) => el.getAttribute("aria-label")?.startsWith("String "));
      stringCheckboxes.forEach((cb) => {
        expect(cb).toBeChecked();
      });
    });

    it("fret position checkboxes are checked by default", () => {
      renderWithGuitarProviders(<GuitarNeck />);
      const fretCheckboxes = screen
        .getAllByRole("checkbox")
        .filter((el) => el.getAttribute("aria-label")?.startsWith("Fret "));
      fretCheckboxes.forEach((cb) => {
        expect(cb).toBeChecked();
      });
    });

    it("unchecking a string checkbox leaves it unchecked", () => {
      renderWithGuitarProviders(<GuitarNeck />);
      const stringCheckboxes = screen
        .getAllByRole("checkbox")
        .filter((el) => el.getAttribute("aria-label")?.startsWith("String "));
      const first = stringCheckboxes[0];
      expect(first).toBeChecked();
      fireEvent.click(first);
      expect(first).not.toBeChecked();
    });

    it("unchecking a fret position checkbox leaves it unchecked", () => {
      renderWithGuitarProviders(<GuitarNeck />);
      const fretCheckboxes = screen
        .getAllByRole("checkbox")
        .filter((el) => el.getAttribute("aria-label")?.startsWith("Fret "));
      const first = fretCheckboxes[0];
      expect(first).toBeChecked();
      fireEvent.click(first);
      expect(first).not.toBeChecked();
    });
  });
});
