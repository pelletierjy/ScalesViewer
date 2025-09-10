"use client";
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
                : "bg-slate-50/80 border border-slate-200"
            }`}
          >
            <div className="max-w-full mx-auto">{children}</div>
          </div>
          <Details />
        </div>
      ) : (
        <div className="text-gray-500">Loading...</div>
      )}
      {showContent && <Footer isDarkMode={isDarkMode} />}
    </main>
  );
}
