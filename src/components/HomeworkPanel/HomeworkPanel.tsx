"use client";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsDarkMode,
  selectLanguage,
} from "@/features/globalConfig/globalConfigSlice";
import { useHostCommandListener } from "@/features/globalConfig/useHostCommandListener";
import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useLocalStorageBoolean } from "@/lib/hooks/useLocalStorage";
import { useResizableWidth } from "@/lib/hooks/useResizableWidth";

// Overridable for local dev against a `need-home-work` checkout: set
// NEXT_PUBLIC_HOMEWORK_WIDGET_URL=http://localhost:5173/need-homework/need-homework-widget.js
// in .env.local (after running `pnpm run build:widget && vite preview --port 5173` there).
const WIDGET_SCRIPT_SRC =
  process.env.NEXT_PUBLIC_HOMEWORK_WIDGET_URL ||
  "https://pelletierjy.github.io/need-homework/need-homework-widget.js";
const CUSTOM_ELEMENT_TAG = "conversia-app";

const DEFAULT_WIDTH = 380;
const MIN_WIDTH = 280;
const MAX_WIDTH = 640;

function loadHomeworkWidgetScript() {
  if (customElements.get(CUSTOM_ELEMENT_TAG)) return;
  if (document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`)) return;
  const script = document.createElement("script");
  script.type = "module";
  script.src = WIDGET_SCRIPT_SRC;
  document.head.appendChild(script);
}

/**
 * A right-docked, resizable sidebar (desktop) / collapsible panel (mobile) for
 * the AI tutor. The panel is always present and only collapses or expands;
 * it never disappears completely.
 */
export default function HomeworkPanel() {
  const t = useTranslations();
  const isDarkMode = useSelector(selectIsDarkMode);
  const language = useSelector(selectLanguage);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useLocalStorageBoolean(
    "homework-sidebar-collapsed",
    false
  );
  const { width, isResizing, startResizing } = useResizableWidth({
    containerRef,
    storageKey: "homework-sidebar-width",
    defaultWidth: DEFAULT_WIDTH,
    minWidth: MIN_WIDTH,
    maxWidth: MAX_WIDTH,
  });

  // Composed CustomEvents from the widget's shadow tree bubble out through
  // this container, so listening here catches them regardless of collapse
  // state.
  useHostCommandListener(containerRef);

  useEffect(() => {
    loadHomeworkWidgetScript();
  }, []);

  const toggleLabel = isCollapsed ? t("homework.expandPanel") : t("homework.collapsePanel");

  return (
    <div
      ref={containerRef}
      className="w-full lg:w-auto lg:sticky lg:top-3 lg:max-h-[calc(100vh-1.5rem)] flex"
    >
      {/* Drag handle: desktop only, and only while expanded (a collapsed strip has nothing to resize) */}
      {!isCollapsed && (
        <div
          onPointerDown={startResizing}
          role="separator"
          aria-orientation="vertical"
          aria-label={t("homework.resizePanel")}
          data-resizing={isResizing || undefined}
          className="hidden lg:block w-1.5 shrink-0 -mr-1.5 z-10 cursor-col-resize touch-none rounded-full transition-colors hover:bg-[var(--console-accent)] data-[resizing]:bg-[var(--console-accent)]"
        />
      )}

      <div
        className={`rack-panel flex flex-col w-full shrink-0 lg:min-h-0 overflow-hidden ${
          isCollapsed ? "lg:w-11" : "lg:w-[var(--homework-width)]"
        } ${isResizing ? "" : "transition-[width] duration-150"}`}
        style={isCollapsed ? undefined : ({ "--homework-width": `${width}px` } as React.CSSProperties)}
      >
        <div className="rack-panel-header shrink-0">
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="flex items-center gap-2 rack-label hover:text-[var(--console-accent)] min-w-0"
            aria-expanded={!isCollapsed}
            aria-label={toggleLabel}
            title={toggleLabel}
          >
            <span className="inline-block shrink-0" aria-hidden="true">🧠</span>
            <span
              className="inline-block shrink-0 transition-transform duration-200"
              style={{ transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}
              aria-hidden="true"
            >
              ▸
            </span>
            <span className={`truncate ${isCollapsed ? "lg:hidden" : ""}`}>
              {t("homework.learnMusicTheoryExperimental")}
            </span>
          </button>
        </div>

        <div className={`flex-1 min-h-0 flex flex-col ${isCollapsed ? "hidden" : ""}`}>
          <div className="flex-1 min-h-[500px] lg:min-h-0 overflow-y-auto p-2 sm:p-3">
            <conversia-app
              subject="Music"
              grade-level="20"
              context="ScalesViewer"
              theme={isDarkMode ? "dark" : "light"}
              lang={language}
              className="block h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
