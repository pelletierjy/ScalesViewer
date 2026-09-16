"use client";

import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { selectAudioStatus } from "@/features/audio/audioSlice";
import { playNote } from "@/lib/utils/audioUtils";
import { NoteWithOctave } from "@/lib/utils/note";

export function usePlayNote() {
  const audioStatus = useSelector((state: RootState) => state.audio.status);

  return useCallback(
    (note: NoteWithOctave, duration: number = 0.5) => {
      void playNote(note, audioStatus, duration, {
        instrument: "piano",
        soundEngine: "sample",
      });
    },
    [audioStatus]
  );
}
