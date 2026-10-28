"use client";

import { IonApp } from "@ionic/react";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/**
 * Client-side shell for the Capacitor/Android build.
 * IonApp must live in a client component (Next App Router server components
 * cannot render @ionic/react, which touches browser APIs at runtime).
 */
export default function IonicShell({ children }: { children: React.ReactNode }) {
  return <IonApp>{children}</IonApp>;
}