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
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (applicationState === "started") {
      console.log("Starting application initialization");
      dispatch(initializeApplication());
      if (pathname !== "/") {
        //Init state from route.
        const pathParts = pathname.split("/")[1];
        dispatch(setInstrument(pathParts));
      }
    }
  }, [applicationState, dispatch, router, pathname]);

  // Debug: Log when hydration completes
  useEffect(() => {
    if (isHydrated) {
      console.log("Hydration completed");
    }
  }, [isHydrated]);

  useEffect(() => {
    // Handle application state transitions
    console.log("Application state:", applicationState);
    switch (applicationState) {
      case "started":
        // Nothing to do here, handled by the first useEffect
        return;

      case "initializing":
        // The state is being loaded from localStorage in the globalConfigSlice
        // Since the extraReducer runs synchronously, we can immediately mark as initialized
        console.log("Dispatching applicationInitialized");
        dispatch(applicationInitialized());
        // Don't save state here - it will be saved by the middleware after initialization
        return;

      case "initialized":
        // Handle routing after initialization
        console.log("Application initialized, checking route");
        if (pathname === "/" || !pathname.includes(instrument)) {
          router.push(`/${instrument}`);
        }
        return;
    }
  }, [applicationState, dispatch, instrument, router, pathname]);

  // Add a direct initialization bypass for debugging
  useEffect(() => {
    console.log("Application state check:", applicationState);
    if (isHydrated && applicationState === "started") {
      console.log("Forcing initialization");
      dispatch(initializeApplication());
      // Force immediate transition to initialized
      setTimeout(() => {
        dispatch(applicationInitialized());
      }, 100);
    }
  }, [isHydrated, applicationState, dispatch]);

  useEffect(() => {
    const initAudio = async () => {
      dispatch(setAudioStatus('initializing'));
      const success = await initializeAudio();
      dispatch(setAudioStatus(success ? 'initialized' : 'failed'));
    };
    initAudio();
  }, [dispatch]);

  // Add a timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (applicationState !== "initialized") {
        console.error("Application failed to initialize within 5 seconds");
        console.log("Current application state:", applicationState);
        console.log("isHydrated:", isHydrated);
        setLoadingTimeout(true);
        // Force initialization
        dispatch(applicationInitialized());
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [applicationState, dispatch, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode, isHydrated]);

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

  // Always render the same structure to avoid hydration mismatch
  const showContent = isHydrated && applicationState === "initialized";
  
  return (
    <main
      className={`min-h-screen transition-colors duration-200 ${
        showContent
          ? `p-4 sm:p-8 ${isDarkMode ? "bg-gray-900" : "bg-slate-100"}`
          : "bg-slate-100 flex items-center justify-center"
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
                : "bg-white border border-slate-300"
            }`}
          >
            <ErrorBoundary fallback={<div className="text-red-500"><p>Something went wrong.</p><p>Please try refreshing the page.</p></div>}>
              <div className="max-w-full mx-auto">{children}</div>
            </ErrorBoundary>
          </div>
          <Details />
        </div>
      ) : (
        <div className="text-slate-600">
          {loadingTimeout ? (
            <div className="text-center">
              <p className="text-red-500 mb-2">Loading timeout</p>
              <p>Please refresh the page</p>
            </div>
          ) : (
            "Loading..."
          )}
        </div>
      )}
      {showContent && <Footer isDarkMode={isDarkMode} />}
    </main>
  );
}
