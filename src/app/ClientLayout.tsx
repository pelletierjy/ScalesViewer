"use client";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Details } from "@/components/Details";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  saveState,
  setInstrument,
  setScale,
} from "../features/globalConfig/globalConfigSlice";
import {
  selectIsDarkMode,
  selectInstrument,
} from "../features/globalConfig/globalConfigSlice";
import { useRouter, usePathname } from "next/navigation";
import {
  applicationInitialized,
  initializeApplication,
  selectApplicationState,
} from "@/features/application/applicationSlice";
import { setAudioStatus } from "@/features/audio/audioSlice";
import { initializeAudio } from "@/lib/utils/audioUtils";
import { SCALE_TYPES, SCALE_PATTERNS } from "@/lib/utils/scaleConstants";
import { useUrlSyncedGlobalConfig } from "@/features/globalConfig/useUrlSyncedGlobalConfig";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isDarkMode = useSelector(selectIsDarkMode);
  const applicationState = useSelector(selectApplicationState);
  const instrument = useSelector(selectInstrument);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (applicationState === "started") {
      dispatch(initializeApplication());
      if (pathname !== "/") {
        //Init state from route.
        const pathParts = pathname.split("/")[1];
        dispatch(setInstrument(pathParts));
      }
    }
  }, [applicationState, dispatch, router, pathname]);

  useEffect(() => {
    // Handle application state transitions
    switch (applicationState) {
      case "started":
        // Nothing to do here, handled by the first useEffect
        return;

      case "initializing":
        // Back up hardcoded scales to localStorage
        localStorage.setItem("builtin-scale-types", JSON.stringify(SCALE_TYPES));
        localStorage.setItem("builtin-scale-patterns", JSON.stringify(SCALE_PATTERNS));
        // Complete initialization and save state
        dispatch(applicationInitialized());
        dispatch(saveState());
        return;

      case "initialized":
        // Handle routing after initialization
        if (pathname === "/" || !pathname.includes(instrument)) {
          router.push(`/${instrument}`);
        }
        return;
    }
  }, [applicationState, dispatch, instrument, router, pathname]);

  useEffect(() => {
    if (!isHydrated) return;
    
    const savedScale = localStorage.getItem("current-scale");
    if (savedScale) {
      try {
        dispatch(setScale(JSON.parse(savedScale)));
      } catch (e) {
        console.error("Failed to load saved scale:", e);
      }
    }
  }, [router, dispatch, isHydrated]);

  // Keep the URL's query string and the shared scale display configuration
  // in sync; must run after the localStorage restore above so that URL
  // params take precedence (FR-007) within the same effect pass.
  useUrlSyncedGlobalConfig();

  useEffect(() => {
    if (!isHydrated) return;
    
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode, isHydrated]);

  useEffect(() => {
    const initAudio = async () => {
      dispatch(setAudioStatus('initializing'));
      const success = await initializeAudio();
      dispatch(setAudioStatus(success ? 'initialized' : 'failed'));
    };
    initAudio();
  }, [dispatch]);

  // Always render the same structure to avoid hydration mismatch
  const showContent = isHydrated && applicationState === "initialized";

  return (
    <main className="min-h-screen transition-colors duration-200" suppressHydrationWarning>
      {showContent ? (
        <div className="max-w-[1600px] mx-auto p-2 sm:p-3 flex flex-col gap-2 sm:gap-3">
          <Header />

          <div className="rack-panel">
            <ErrorBoundary
              fallback={
                <div className="p-4 text-[var(--console-danger)]">
                  <p>Something went wrong.</p>
                  <p>Please try refreshing the page.</p>
                </div>
              }
            >
              <div className="p-2 sm:p-3">{children}</div>
            </ErrorBoundary>
          </div>
          <Details />
          <Footer isDarkMode={isDarkMode} />
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center rack-mono text-sm text-[var(--console-text-dim)]">
          Loading...
        </div>
      )}
    </main>
  );
}
