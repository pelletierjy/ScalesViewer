"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";
import { useLocalStorageNumber } from "./useLocalStorage";

interface UseResizableWidthOptions {
  /** The panel this width applies to; resizing measures from the pointer to its right edge. */
  containerRef: RefObject<HTMLElement | null>;
  storageKey: string;
  defaultWidth: number;
  minWidth: number;
  maxWidth: number;
}

interface UseResizableWidthResult {
  width: number;
  isResizing: boolean;
  /** Pass to a drag handle's onPointerDown. */
  startResizing: (event: ReactPointerEvent) => void;
}

/**
 * Drag-to-resize width for a panel docked to the right edge of `containerRef`.
 * Width is measured from the pointer to the container's own right edge (captured
 * once at drag start) rather than the viewport's, so it stays correct inside a
 * centered, max-width layout. Persisted to localStorage.
 */
export function useResizableWidth({
  containerRef,
  storageKey,
  defaultWidth,
  minWidth,
  maxWidth,
}: UseResizableWidthOptions): UseResizableWidthResult {
  const [width, setWidth] = useLocalStorageNumber(storageKey, defaultWidth, minWidth, maxWidth);
  const [isResizing, setIsResizing] = useState(false);
  const rightEdgeRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  const startResizing = useCallback(
    (event: ReactPointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      rightEdgeRef.current = rect.right;
      setIsResizing(true);
      event.preventDefault();
    },
    [containerRef]
  );

  useEffect(() => {
    if (!isResizing) return;

    const clamp = (value: number) => Math.min(maxWidth, Math.max(minWidth, value));

    const handlePointerMove = (event: PointerEvent) => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        setWidth(clamp(rightEdgeRef.current - event.clientX));
      });
    };
    const stopResizing = () => setIsResizing(false);

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", stopResizing);
    document.addEventListener("pointercancel", stopResizing);

    // Prevent text selection / show a resize cursor for the duration of the drag.
    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", stopResizing);
      document.removeEventListener("pointercancel", stopResizing);
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [isResizing, minWidth, maxWidth, setWidth]);

  return { width, isResizing, startResizing };
}
