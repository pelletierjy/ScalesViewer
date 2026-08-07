"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

type FeatureItem = { icon: string; title: string; desc: string };
type StepItem = { title: string; desc: string };

interface Slide {
  title: string;
  subtitle?: string;
  intro?: string;
  features?: FeatureItem[];
  steps?: StepItem[];
  tags?: string[];
  note?: string;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = t.raw("help.slides") as Slide[];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide(prev => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === " ") {
        e.preventDefault();
        setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
      }
    };

    if (isOpen && typeof window !== "undefined") {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      }
    };
  }, [isOpen, onClose, slides.length]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  if (!isOpen || !slides.length) return null;

  const slide = slides[currentSlide];

  const cardClass = "rack-panel";

  const headingClass = isDarkMode ? "text-white" : "text-gray-900";
  const subheadingClass = isDarkMode ? "text-gray-300" : "text-gray-700";
  const bodyClass = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`fixed inset-0 z-50 ${isDarkMode ? "dark" : ""}`}>
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl h-[85vh] rack-panel shadow-2xl overflow-hidden">

          {/* Close button */}
          <button
            onClick={onClose}
            className="rack-btn absolute top-4 right-4 z-10 p-2"
            title={t("help.close")}
          >
            ✕
          </button>

          {/* Slide counter */}
          <div className={`absolute top-4 left-4 text-sm rack-mono ${bodyClass}`}>
            {t("help.slideCounter", { current: currentSlide + 1, total: slides.length })}
          </div>

          {/* Slide content */}
          <div className="h-full overflow-y-auto pb-20">
            <div className="p-8 pt-12">

              {/* Title */}
              <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-2 ${headingClass}`}>
                {slide.title}
              </h2>

              {slide.subtitle && (
                <p className={`text-lg text-center mb-4 ${subheadingClass}`}>{slide.subtitle}</p>
              )}

              {slide.intro && (
                <p className={`text-base text-center mb-6 max-w-2xl mx-auto ${subheadingClass}`}>
                  {slide.intro}
                </p>
              )}

              {/* Tag badges (welcome slide) */}
              {slide.tags && (
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  {slide.tags.map((tag, i) => (
                    <span key={i} className="rack-chip px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Feature cards */}
              {slide.features && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {slide.features.map((f, i) => (
                    <div key={i} className={`p-4 ${cardClass}`}>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xl">{f.icon}</span>
                        <h4 className={`font-semibold text-sm ${headingClass}`}>{f.title}</h4>
                      </div>
                      <p className={`text-sm ${bodyClass}`}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Steps */}
              {slide.steps && (
                <div className="space-y-3 max-w-2xl mx-auto mt-2">
                  {slide.steps.map((s, i) => (
                    <div
                      key={i}
                      className={`p-4 border-l-4 !border-l-[var(--console-success)] ${cardClass}`}
                    >
                      <h4 className="font-semibold text-sm mb-1 text-[var(--console-success)]">
                        {i + 1}. {s.title}
                      </h4>
                      <p className={`text-sm ${bodyClass}`}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer note */}
              {slide.note && (
                <p className={`text-center text-sm mt-4 italic ${bodyClass}`}>{slide.note}</p>
              )}

            </div>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className={`rack-btn p-2 ${currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              title={t("help.previous")}
            >
              ←
            </button>

            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="w-2.5 h-2.5 transition-colors"
                  style={{
                    background:
                      i === currentSlide
                        ? "var(--console-accent)"
                        : "var(--console-border-strong)",
                  }}
                  title={`${t("help.slideCounter", { current: i + 1, total: slides.length })}: ${slides[i].title}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlide === slides.length - 1}
              className={`rack-btn p-2 ${currentSlide === slides.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              title={t("help.next")}
            >
              →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
