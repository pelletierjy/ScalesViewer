"use client";

import { useSelector } from "react-redux";
import { selectInstrument } from "@/features/globalConfig/globalConfigSlice";
import { InstrumentWorkspace } from "@/components/InstrumentWorkspace/InstrumentWorkspace";

/**
 * Root route shell.
 *
 * The static export serves this document for any URL that doesn't name an
 * instrument ("/", a stale or mistyped path). Rather than a bare spinner, it
 * renders the selected instrument — the saved one once the store has
 * initialised, `defaultInstrument` before that — so there is always an
 * instrument on screen even if the redirect in ClientLayout is slow or never
 * completes (observed on the static host, the Capacitor shell and Tauri).
 * ClientLayout still redirects to the instrument's own route immediately
 * afterwards, so the URL ends up shareable either way.
 */
export default function Home() {
  const instrument = useSelector(selectInstrument);

  return <InstrumentWorkspace instrument={instrument} key={instrument} />;
}