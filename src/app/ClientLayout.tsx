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
  setLanguage,
  setScale,
} from "../features/globalConfig/globalConfigSlice";
import {
  selectIsDarkMode,
  selectInstrument,
  selectLanguage,
  selectScale,
} from "../features/globalConfig/globalConfigSlice";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  applicationInitialized,
  initializeApplication,
  selectApplicationState,
} from "@/features/application/applicationSlice";
import { setAudioStatus } from "@/features/audio/audioSlice";
import { initializeAudio } from "@/lib/utils/audioUtils";
import { SCALE_TYPES, SCALE_PATTERNS } from "@/lib/utils/scaleConstants";
import { useUrlSyncedGlobalConfig } from "@/features/globalConfig/useUrlSyncedGlobalConfig";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { isLocale, Locale } from "@/lib/i18n/types";
import { isInstrument } from "@/lib/utils/instrument";
import ChordPanel from "@/components/ChordPanel/ChordPanel";
import HomeworkPanel from "@/components/HomeworkPanel/HomeworkPanel";
import PatternPanel from "@/components/PatternPanel/PatternPanel";

// Shown before messages.json has loaded, so it cannot use next-intl. Locale is
// already known at this point (from the URL, redux, or the server prop), so
// this small inline table keeps it localized instead of hardcoding English.
const BOOTSTRAP_LOADING_TEXT: Record<Locale, string> = {
  en: "Loading...",
  fr: "Chargement...",
  es: "Cargando...",
};

// Rendered as children of NextIntlClientProvider so they can call useTranslations();
// ClientLayout itself sits above that provider and can't call the hook directly.
function ErrorFallback() {
  const t = useTranslations();
  return (
    <div className="p-4 text-[var(--console-danger)]">
      <p>{t("ui.somethingWentWrong")}</p>
      <p>{t("ui.pleaseRefresh")}</p>
    </div>
  );
}

function LoadingSpinner() {
  const t = useTranslations();
  return (
    <div className="min-h-screen flex items-center justify-center rack-mono text-sm text-[var(--console-text-dim)]">
      {t("ui.loading")}
    </div>
  );
}

interface ClientLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default function ClientLayout({ children, locale }: ClientLayoutProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDarkMode = useSelector(selectIsDarkMode);
  const applicationState = useSelector(selectApplicationState);
  const instrument = useSelector(selectInstrument);
  const language = useSelector(selectLanguage);
  const scale = useSelector(selectScale);
  const [isHydrated, setIsHydrated] = useState(false);
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  // Derive the effective locale from the URL param, Redux state, or the server prop.
  // This is necessary because the app uses static export (output: "export"), so
  // layout.tsx always renders with locale="en" at build time. We must read the
  // actual user preference from the URL or localStorage on the client.
  const urlLang = searchParams.get("lang");
  const effectiveLocale =
    urlLang && isLocale(urlLang) ? urlLang : language;

  // Load messages for the current locale
  useEffect(() => {
    async function loadMessages() {
      const msgs = (await import(`@/lib/i18n/messages/${effectiveLocale}.json`)).default;
      setMessages(msgs);
    }
    loadMessages();
  }, [effectiveLocale]);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Browser language detection on first visit (no URL param, no saved preference)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedState = localStorage.getItem("state");
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          if (parsed.globalConfig?.language) return; // User has a saved preference
        } catch {
          // ignore
        }
      }
      // No saved preference — detect from browser
      const browserLang = navigator.language.split("-")[0].toLowerCase();
      if (isLocale(browserLang) && browserLang !== effectiveLocale) {
        dispatch(setLanguage(browserLang));
        dispatch(saveState());
      }
    } catch (error) {
      console.error("Failed to access localStorage during language detection:", error);
    }
  }, [dispatch, effectiveLocale]);

  useEffect(() => {
    if (applicationState === "started") {
      dispatch(initializeApplication());
      if (pathname !== "/") {
        //Init state from route.
        const pathParts = pathname.split("/")[1];
        if (isInstrument(pathParts)) {
          dispatch(setInstrument(pathParts));
        }
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
        try {
          localStorage.setItem("builtin-scale-types", JSON.stringify(SCALE_TYPES));
          localStorage.setItem("builtin-scale-patterns", JSON.stringify(SCALE_PATTERNS));
        } catch (error) {
          console.error("Failed to back up scales to localStorage:", error);
        }
        // Complete initialization and save state
        dispatch(applicationInitialized());
        dispatch(saveState());
        return;

      case "initialized":
        // Handle routing after initialization
        if (pathname === "/" || !pathname.includes(instrument)) {
          router.push(`/${instrument}/`);
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
    if (typeof document !== "undefined") {
      document.documentElement.lang = effectiveLocale;
    }
  }, [effectiveLocale]);

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

  if (!messages) {
    return (
      <div className="min-h-screen flex items-center justify-center rack-mono text-sm text-[var(--console-text-dim)]">
        {BOOTSTRAP_LOADING_TEXT[isLocale(effectiveLocale) ? effectiveLocale : "en"]}
      </div>
    );
  }

  return (
    <NextIntlClientProvider locale={effectiveLocale} messages={messages}>
      <main className="min-h-screen transition-colors duration-200" suppressHydrationWarning>
        {showContent ? (
          <div className="max-w-[1600px] mx-auto p-2 sm:p-3 flex flex-col lg:flex-row gap-2 sm:gap-3 lg:min-h-[600px]">
            <div className="flex-1 min-w-0 flex flex-col gap-2 sm:gap-3">
              <Header />

              <div className="rack-panel">
                <ErrorBoundary fallback={<ErrorFallback />}>
                  <div className="p-2 sm:p-3">{children}</div>
                </ErrorBoundary>
              </div>
              <ChordPanel scale={scale} />
              <PatternPanel scale={scale} />
              <Details />
              <Footer isDarkMode={isDarkMode} />
            </div>

            <HomeworkPanel />
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </main>
    </NextIntlClientProvider>
  );
}
