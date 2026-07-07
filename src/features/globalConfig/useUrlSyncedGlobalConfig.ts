"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  selectScale,
  selectIsMonochrome,
  selectShowFlats,
  selectShowDegrees,
  setScale,
  setHighlightRoots,
  setShowFlats,
  setShowDegrees,
} from "./globalConfigSlice";
import {
  decodeParamsToGlobalConfigPatch,
  encodeGlobalConfigToParams,
  GlobalConfigUrlSlice,
} from "./urlConfigParams";

/**
 * Keeps the shareable Scale Display Configuration (scale, root, color mode,
 * flat display, number display) in sync with the page's URL query string in
 * both directions:
 *  - URL -> store: params found in the URL are applied whenever the URL
 *    itself changes (initial load, navigation, back/forward), taking
 *    precedence over any locally restored defaults (FR-007).
 *  - store -> URL: any change to the five settings is mirrored back into
 *    the URL (FR-006).
 *
 * Spec: specs/002-url-params/spec.md
 */
export function useUrlSyncedGlobalConfig(): void {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const scale = useSelector(selectScale);
  const highlightRoots = useSelector(selectIsMonochrome);
  const showFlats = useSelector(selectShowFlats);
  const showDegrees = useSelector(selectShowDegrees);

  // Read fresh, current store values from the URL -> store effect without
  // making them reactive dependencies of that effect (see below).
  const currentConfigRef = useRef<GlobalConfigUrlSlice>({
    scale,
    highlightRoots,
    showFlats,
    showDegrees,
  });
  currentConfigRef.current = { scale, highlightRoots, showFlats, showDegrees };

  // The store -> URL effect intentionally skips its very first invocation:
  // on mount, the URL -> store effect below may dispatch changes that have
  // not yet propagated to this hook's `scale`/etc. closures in the same
  // commit. Skipping the first write lets the resulting re-render (if any)
  // supply settled, correct values before anything is written back to the
  // URL, avoiding a stale write that would clobber the very params a shared
  // link just supplied.
  const isFirstWriteRef = useRef(true);

  // URL -> store: only reacts to the URL's own query string changing
  // (not to store changes), so it never fights a live user-driven edit.
  useEffect(() => {
    const patch = decodeParamsToGlobalConfigPatch(searchParams);
    const current = currentConfigRef.current;

    const hasScaleOverride =
      patch.root !== undefined ||
      patch.scaleType !== undefined ||
      patch.mode !== undefined;
    if (hasScaleOverride) {
      const nextScale = {
        root: patch.root ?? current.scale.root,
        type: patch.scaleType ?? current.scale.type,
        mode: patch.mode ?? current.scale.mode,
      };
      const scaleChanged =
        nextScale.root !== current.scale.root ||
        nextScale.type !== current.scale.type ||
        nextScale.mode !== current.scale.mode;
      if (scaleChanged) {
        dispatch(setScale(nextScale));
      }
    }

    if (
      patch.highlightRoots !== undefined &&
      patch.highlightRoots !== current.highlightRoots
    ) {
      dispatch(setHighlightRoots(patch.highlightRoots));
    }
    if (patch.showFlats !== undefined && patch.showFlats !== current.showFlats) {
      dispatch(setShowFlats(patch.showFlats));
    }
    if (
      patch.showDegrees !== undefined &&
      patch.showDegrees !== current.showDegrees
    ) {
      dispatch(setShowDegrees(patch.showDegrees));
    }
  }, [searchParams, dispatch]);

  // store -> URL: reacts only to the five settings changing.
  useEffect(() => {
    if (isFirstWriteRef.current) {
      isFirstWriteRef.current = false;
      return;
    }

    const nextQuery = encodeGlobalConfigToParams({
      scale,
      highlightRoots,
      showFlats,
      showDegrees,
    }).toString();

    if (nextQuery !== searchParams.toString()) {
      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    }
  }, [scale, highlightRoots, showFlats, showDegrees, pathname, router, searchParams]);
}
