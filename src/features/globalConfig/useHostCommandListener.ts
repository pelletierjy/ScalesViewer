"use client";

import { useEffect, type RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectScale,
  selectChordScaleMode,
  setScale,
  setHighlightRoots,
  setShowFlats,
  setShowDegrees,
  setInstrument,
  toggleChordScaleMode,
  setSoundEngine,
} from "./globalConfigSlice";
import {
  HOST_COMMAND_EVENT_NAME,
  HOST_COMMAND_PROTOCOL_VERSION,
  parseHostCommand,
  type HostCommandEventDetail,
} from "./hostCommandContract";

/**
 * Listens for `need-homework:command` CustomEvents dispatched by the
 * embedded AI tutor widget (composed, so they bubble out of its shadow
 * tree) on `target`, and applies them via the existing globalConfig Redux
 * actions. No origin check is needed (same document, same realm — this
 * isn't a cross-origin postMessage channel), but every field is still
 * validated since the tutor's output is untrusted.
 */
export function useHostCommandListener(target: RefObject<HTMLElement | null>): void {
  const dispatch = useDispatch();
  const scale = useSelector(selectScale);
  const chordScaleMode = useSelector(selectChordScaleMode);

  useEffect(() => {
    const node = target.current;
    if (!node) return;

    const handleCommand = (event: Event) => {
      const detail = (event as CustomEvent<HostCommandEventDetail>).detail;
      if (!detail || detail.version !== HOST_COMMAND_PROTOCOL_VERSION) {
        console.warn(
          "Ignoring need-homework:command with unrecognized version:",
          detail?.version
        );
        return;
      }

      for (const raw of detail.commands ?? []) {
        const command = parseHostCommand(raw);
        if (!command) continue;

        switch (command.type) {
          case "setScaleDisplay": {
            if (
              command.root !== undefined ||
              command.scaleType !== undefined ||
              command.mode !== undefined
            ) {
              dispatch(
                setScale({
                  root: command.root ?? scale.root,
                  type: command.scaleType ?? scale.type,
                  mode: command.mode ?? scale.mode,
                })
              );
            }
            if (command.highlightRoots !== undefined) {
              dispatch(setHighlightRoots(command.highlightRoots));
            }
            if (command.showFlats !== undefined) {
              dispatch(setShowFlats(command.showFlats));
            }
            if (command.showDegrees !== undefined) {
              dispatch(setShowDegrees(command.showDegrees));
            }
            break;
          }
          case "setInstrument":
            dispatch(setInstrument(command.value));
            break;
          case "setChordScaleMode":
            if (command.value !== chordScaleMode) {
              dispatch(toggleChordScaleMode());
            }
            break;
          case "setSoundEngine":
            dispatch(setSoundEngine(command.value));
            break;
        }
      }
    };

    node.addEventListener(HOST_COMMAND_EVENT_NAME, handleCommand);
    return () => node.removeEventListener(HOST_COMMAND_EVENT_NAME, handleCommand);
  }, [target, dispatch, scale, chordScaleMode]);
}
