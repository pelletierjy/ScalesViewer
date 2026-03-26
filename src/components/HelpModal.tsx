"use client";
import React, { useState, useEffect } from "react";

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

const slides: Slide[] = [
  {
    title: "Start Exploring",
    intro: "GScale works for all skill levels. Here's how to get the most out of it.",
    steps: [
      { title: "Pick an instrument", desc: "Use the instrument dropdown to navigate to Guitar, Piano, Kalimba, or Harmonica" },
      { title: "Choose a scale and root", desc: "Select from 60+ built-in scales or create your own, then pick a root note" },
      { title: "Click notes to hear them", desc: "Every highlighted note on every instrument is clickable — use it for ear training" },
      { title: "Adjust your view", desc: "Toggle degrees/names, sharps/flats, color/mono, and dark/light to suit your preference" },
      { title: "Customize further", desc: "For guitar: adjust tuning, fret count, texture, orientation, and enable/disable specific strings or frets" },
      { title: "Save and share", desc: "Export your custom scales and tunings to back them up or share with others" },
    ],
  },
  {
    title: "Welcome to GScale",
    subtitle: "Musical Scale Visualization Tool",
    intro: "An interactive app for visualizing and learning musical scales across multiple instruments. Click any note to hear it, customize your view, and explore 60+ scales.",
    tags: ["Guitar", "Piano", "Kalimba", "Harmonica", "60+ Scales", "Audio Playback", "Custom Scales"],
  },
  {
    title: "Navigating the Interface",
    intro: "The header bar contains all global controls, accessible from any instrument page.",
    features: [
      { icon: "🎸", title: "Instrument Selector", desc: "Switch between Guitar, Piano, Kalimba, and Harmonica using the instrument dropdown" },
      { icon: "🎵", title: "Scale & Root Selectors", desc: "Choose from 60+ scale types and any root note (C through B, sharps and flats)" },
      { icon: "🔢", title: "Degrees / Note Names", desc: "Toggle between scale degree numbers (1–7) and note names (C, D, E…)" },
      { icon: "♭", title: "Flats / Sharps", desc: "Switch note display between flat (♭) and sharp (♯) notation" },
      { icon: "🎨", title: "Color / Monochrome", desc: "Color mode highlights each interval; monochrome mode shows only root notes" },
      { icon: "🌓", title: "Dark / Light Theme", desc: "Toggle between dark and light modes — preference is saved automatically" },
    ],
  },
  {
    title: "Scale Library & Custom Scales",
    intro: "GScale ships with over 60 built-in scales. You can also create your own.",
    features: [
      { icon: "📚", title: "60+ Built-in Scales", desc: "Covers Major, Minor, Pentatonic, Blues, Jazz Bebop, Modes (Dorian, Phrygian, Lydian…), and Exotic scales (Hungarian Minor, Byzantine, Persian…)" },
      { icon: "✏️", title: "Custom Scale Editor", desc: "Open the scale dropdown and select '+ Create Custom Scale' to build a scale from scratch by picking intervals" },
      { icon: "🎹", title: "Interval Picker", desc: "Select any combination of the 12 semitones to define your scale — a live C preview updates as you choose" },
      { icon: "📝", title: "Name & Categorize", desc: "Give your scale a name and category so it appears grouped with similar scales in the dropdown" },
      { icon: "🔁", title: "Edit or Delete", desc: "Custom scales can be edited or deleted at any time from the scale editor" },
    ],
  },
  {
    title: "Guitar — Fretboard Setup",
    intro: "The Guitar page offers the most configuration options. All settings are saved automatically.",
    features: [
      { icon: "🎸", title: "Tuning Presets", desc: "Choose from dozens of preset tunings (Standard, Drop D, Open G, DADGAD, and many more) organized by category" },
      { icon: "🎚️", title: "Base Tuning Transposition", desc: "Shift the entire tuning up or down by semitone using the Base Tuning selector" },
      { icon: "📏", title: "Fret Count", desc: "Display 12, 20, 21, 22, 23, or 24 frets to match your instrument" },
      { icon: "🪵", title: "Fretboard Texture", desc: "Choose a visual texture: Rosewood, Pale Moon Ebony, Maple, Pau Ferro, or Richlite" },
      { icon: "↔️", title: "Flip Horizontally", desc: "Mirror the fretboard left-to-right — useful for left-handed players" },
      { icon: "↕️", title: "Flip Vertically", desc: "Mirror the fretboard top-to-bottom to match your preferred string order" },
      { icon: "📐", title: "String Spacing", desc: "Switch between Normal and Enlarged spacing for better readability" },
    ],
  },
  {
    title: "Guitar — String & Fret Control",
    intro: "Focus on any part of the neck by enabling or disabling individual strings and fret positions.",
    features: [
      { icon: "☑️", title: "String Checkboxes", desc: "Each string has a checkbox on the left side — uncheck to hide that string from the visualization" },
      { icon: "☑️", title: "Fret Checkboxes", desc: "Each fret column has a checkbox at the bottom — uncheck to hide that fret position" },
      { icon: "⊟", title: "Enable / Disable All", desc: "The button at the axis junction toggles all strings AND all frets at once — great for isolating a specific region then re-enabling everything" },
      { icon: "🎸", title: "Custom Tunings", desc: "Create your own tuning: set the number of strings (4–18), name each string note, and save it alongside the presets" },
      { icon: "📐", title: "Multiscale / Fanned Frets", desc: "Enable multiscale mode to set independent treble and bass scale lengths, with a configurable perpendicular fret" },
    ],
  },
  {
    title: "Piano",
    intro: "The Piano page shows an interactive keyboard with scale notes highlighted.",
    features: [
      { icon: "🎹", title: "Octave Count", desc: "Select 1, 2, 3, or 4 octaves to display — your choice is saved automatically" },
      { icon: "🖱️", title: "Click to Play", desc: "Click any highlighted key to hear the note played through the Web Audio API" },
      { icon: "🎨", title: "Color-Coded Intervals", desc: "Scale notes are colored by degree (even degrees in green, odd in orange, root in high contrast). Non-scale notes are grayed out." },
      { icon: "⌨️", title: "Keyboard Accessible", desc: "Tab to a key and press Enter or Space to play it" },
    ],
  },
  {
    title: "Kalimba",
    intro: "The Kalimba page shows a traditional 17-key thumb piano layout.",
    features: [
      { icon: "🎵", title: "17-Key Layout", desc: "Tines are arranged center-outward in alternating left/right order, matching a real kalimba" },
      { icon: "🖱️", title: "Click to Play", desc: "Click any tine to hear it. Scale notes are color-highlighted; non-scale notes are visible but grayed out" },
      { icon: "🎨", title: "Interval Colors", desc: "Same color scheme as other instruments — colored or monochrome based on your global display setting" },
      { icon: "🔢", title: "Note Labels", desc: "Each tine shows the note name, flat/sharp, or scale degree depending on your display toggle" },
    ],
  },
  {
    title: "Harmonica",
    intro: "The Harmonica page shows a standard 10-hole diatonic harmonica layout.",
    features: [
      { icon: "🎷", title: "Blow & Draw Notes", desc: "Each hole shows both the blow note (↑) and the draw note (↓) side by side" },
      { icon: "🎼", title: "Harmonica Key Selector", desc: "Choose the key of your harmonica (C, G, A, D, F, B♭, E♭) — all notes transpose automatically" },
      { icon: "🖱️", title: "Click to Play", desc: "Click any blow or draw note to hear it. Only scale notes are active; others are grayed out" },
      { icon: "🔢", title: "Hole Numbers", desc: "Holes are numbered 1–10 as standard harmonica reference" },
    ],
  },
  {
    title: "Custom Tunings",
    intro: "Create, edit, and manage guitar tunings directly in the app.",
    features: [
      { icon: "➕", title: "Create a Tuning", desc: "Select '+ Custom Tuning' in the tuning dropdown to open the tuning editor" },
      { icon: "🔢", title: "String Count", desc: "Set anywhere from 4 to 18 strings — each gets its own note picker" },
      { icon: "📋", title: "Duplicate a Tuning", desc: "Use the duplicate button to copy an existing tuning as a starting point for a variation" },
      { icon: "✏️", title: "Edit or Delete", desc: "Custom tunings can be renamed, modified, or deleted at any time" },
      { icon: "💾", title: "Persistent Storage", desc: "All custom tunings are saved to local storage and survive page refreshes" },
    ],
  },
  {
    title: "Settings, Export & Import",
    intro: "Access the Settings panel via the gear icon in the header to manage your configuration.",
    features: [
      { icon: "📤", title: "Export Settings", desc: "Download all your settings (custom scales, custom tunings, display preferences) as a JSON file with a timestamped filename" },
      { icon: "📥", title: "Import Settings", desc: "Load a previously exported settings file to restore your configuration — on any device" },
      { icon: "✅", title: "Import Validation", desc: "The importer checks version compatibility and reports which settings were applied and which were skipped" },
      { icon: "🔄", title: "Reset to Defaults", desc: "The Reset button restores all settings to factory defaults after a confirmation prompt" },
      { icon: "💾", title: "Auto-Save", desc: "Every setting change is saved automatically to localStorage — no manual save needed" },
    ],
    note: "Use Export/Import to back up your custom scales and tunings or share them with others.",
  },
];

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const slide = slides[currentSlide];

  const cardClass = isDarkMode
    ? "bg-gray-800 border border-gray-700"
    : "bg-gray-50 border border-gray-200";

  const headingClass = isDarkMode ? "text-white" : "text-gray-900";
  const subheadingClass = isDarkMode ? "text-gray-300" : "text-gray-700";
  const bodyClass = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`fixed inset-0 z-50 ${isDarkMode ? "dark" : ""}`}>
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className={`relative w-full max-w-4xl h-[85vh] rounded-lg shadow-2xl overflow-hidden ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-slate-800"
        }`}>

          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                : "bg-slate-400 text-slate-700 hover:bg-slate-500 hover:text-slate-900"
            }`}
            title="Close help"
          >
            ✕
          </button>

          {/* Slide counter */}
          <div className={`absolute top-4 left-4 text-sm ${bodyClass}`}>
            {currentSlide + 1} / {slides.length}
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
                    <span key={i} className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode
                        ? "bg-gray-800 text-gray-300 border border-gray-700"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Feature cards */}
              {slide.features && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {slide.features.map((f, i) => (
                    <div key={i} className={`p-4 rounded-lg ${cardClass}`}>
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
                    <div key={i} className={`p-4 rounded-lg border-l-4 border-green-500 ${cardClass}`}>
                      <h4 className={`font-semibold text-sm mb-1 ${isDarkMode ? "text-green-400" : "text-green-700"}`}>
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
              className={`p-2 rounded-full transition-colors ${
                currentSlide === 0
                  ? "opacity-50 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              title="Previous slide"
            >
              ←
            </button>

            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === currentSlide
                      ? isDarkMode ? "bg-white" : "bg-gray-900"
                      : isDarkMode ? "bg-gray-600" : "bg-gray-400"
                  }`}
                  title={`Slide ${i + 1}: ${slides[i].title}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlide === slides.length - 1}
              className={`p-2 rounded-full transition-colors ${
                currentSlide === slides.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              title="Next slide"
            >
              →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
