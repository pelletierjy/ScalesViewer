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
    <main
      className={`min-h-screen transition-colors duration-200 ${
        showContent 
          ? `p-4 sm:p-8 ${isDarkMode ? "bg-gray-900" : "bg-slate-200"}`
          : "bg-slate-200 flex items-center justify-center"
      }`}
      suppressHydrationWarning
    >
      {showContent ? (
        <div className="max-w-[1400px] mx-auto space-y-6 sm:space-y-8">
          <div className="flex justify-between items-center">
            <Header />
          </div>

          <div
            className={`p-4 sm:p-6 rounded-lg shadow-lg space-y-6 transition-colors duration-200 ${
              isDarkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-slate-300 border border-slate-400"
            }`}
          >
            <ErrorBoundary fallback={<div className="text-red-500"><p>Something went wrong.</p><p>Please try refreshing the page.</p></div>}>
              <div className="max-w-full mx-auto">{children}</div>
            </ErrorBoundary>
          </div>
          <Details />
        </div>
      ) : (
        <div className="text-slate-700">Loading...</div>
      )}
      {showContent && <Footer isDarkMode={isDarkMode} />}
    </main>
  );
}
