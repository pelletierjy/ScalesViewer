import { Instrument } from "@/lib/utils/instrument";
import { GuitarView, useGuitarSettings } from "@/instruments/guitar/GuitarView";
import {
  PianoView,
  PianoControls,
  usePianoSettings,
} from "@/instruments/piano/PianoView";
import { KalimbaView, useKalimbaSettings } from "@/instruments/kalimba/KalimbaView";
import {
  HarmonicaView,
  HarmonicaControls,
  useHarmonicaSettings,
} from "@/instruments/harmonica/HarmonicaView";
import {
  FluteView,
  FluteControls,
  useFluteSettings,
} from "@/instruments/flute/FluteView";
import {
  RecorderView,
  RecorderControls,
  useRecorderSettings,
} from "@/instruments/recorder/RecorderView";
import { InstrumentDefinition } from "./types";

/**
 * Maps an instrument to the only two things it owns: the view it draws and the
 * controls it contributes to the workspace's shared tool row.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const INSTRUMENT_REGISTRY: Record<Instrument, InstrumentDefinition<any>> = {
  guitar: {
    useSettings: useGuitarSettings,
    View: GuitarView,
    stage: false, // GuitarNeck manages its own container and ResizeObserver
  },
  piano: {
    useSettings: usePianoSettings,
    Controls: PianoControls,
    View: PianoView,
  },
  kalimba: {
    useSettings: useKalimbaSettings,
    View: KalimbaView,
  },
  harmonica: {
    useSettings: useHarmonicaSettings,
    Controls: HarmonicaControls,
    View: HarmonicaView,
  },
  flute: {
    useSettings: useFluteSettings,
    Controls: FluteControls,
    View: FluteView,
  },
  recorder: {
    useSettings: useRecorderSettings,
    Controls: RecorderControls,
    View: RecorderView,
  },
};
