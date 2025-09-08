"use client";
import React, { useState, useEffect } from "react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "GScale",
      subtitle: "Musical Scale Visualization Tool",
      content: "A modern, interactive application that helps musicians visualize and learn musical scales across multiple instruments.",
      tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "React 19", "Redux"]
    },
    {
      title: "What is GScale?",
      content: "GScale is a comprehensive musical scale visualization tool designed for musicians of all levels. It provides interactive visualizations of scales across different instruments, making it easier to understand scale patterns, relationships, and fingerings.",
      features: [
        { icon: "🎸", title: "Multi-Instrument Support", desc: "Visualize scales on Guitar, Piano, Flute, and Kalimba with instrument-specific features" },
        { icon: "🎵", title: "60+ Scale Types", desc: "From basic major/minor to exotic scales like Hungarian Minor and Byzantine" },
        { icon: "🎨", title: "Interactive Visualizations", desc: "Click notes to hear them, customize display options, and explore patterns" },
        { icon: "📱", title: "Cross-Platform", desc: "Works on desktop, mobile, and can be built as a native desktop application" }
      ]
    },
    {
      title: "Supported Instruments",
      content: "GScale provides specialized visualizations for each instrument type:",
      instruments: [
        { name: "🎸 Guitar", desc: "Interactive fretboard with custom tunings, variable fret count, and orientation flipping" },
        { name: "🎹 Piano", desc: "Keyboard visualization with adjustable octave count (1-4 octaves)" },
        { name: "🎼 Flute", desc: "Standard fingering chart with scale highlighting" },
        { name: "🎵 Kalimba", desc: "Traditional 17-key thumb piano layout with center-outward note arrangement" }
      ]
    },
    {
      title: "Comprehensive Scale Library",
      content: "GScale includes over 60 scale types across multiple categories:",
      scales: ["Major Scales", "Minor Scales", "Pentatonic", "Blues Scales", "Jazz Bebop", "Diminished", "Whole-tone", "Altered Scales", "Dorian Mode", "Phrygian Mode", "Lydian Mode", "Mixolydian Mode", "Hungarian Minor", "Ukrainian Dorian", "Persian Scale", "Byzantine Scale"]
    },
    {
      title: "Advanced Features",
      features: [
        { icon: "🌓", title: "Dark/Light Themes", desc: "Switch between themes for comfortable viewing in any environment" },
        { icon: "🎨", title: "Display Options", desc: "Show scale degrees, toggle sharp/flat notation, choose color/monochrome modes" },
        { icon: "🔊", title: "Audio Playback", desc: "Click any note to hear it played, helping with ear training" },
        { icon: "📱", title: "Responsive Design", desc: "Works perfectly on phones, tablets, and desktops" },
        { icon: "💾", title: "State Persistence", desc: "Your preferences and custom settings are saved automatically" },
        { icon: "⚙️", title: "Custom Tunings", desc: "Create and save custom guitar tunings for specialized applications" }
      ]
    },
    {
      title: "Getting Started",
      steps: [
        { title: "Step 1: Choose Your Instrument", desc: "Select from Guitar, Piano, Flute, or Kalimba using the navigation menu" },
        { title: "Step 2: Select a Scale", desc: "Browse through 60+ scale types organized by category (Common, Jazz, Modes, Exotic)" },
        { title: "Step 3: Customize Your View", desc: "Adjust display options like theme, notation (sharps/flats), and scale degree visibility" },
        { title: "Step 4: Explore and Learn", desc: "Click notes to hear them, experiment with different keys, and discover patterns" },
        { title: "Step 5: Save Your Preferences", desc: "Your settings are automatically saved, including custom guitar tunings and display preferences" }
      ]
    },
    {
      title: "Guitar-Specific Features",
      content: "GScale offers advanced guitar functionality:",
      features: [
        { icon: "🎸", title: "Custom Tuning Editor", desc: "Create unlimited custom tunings with import/export functionality" },
        { icon: "📏", title: "Variable Fret Count", desc: "Adjust the number of frets displayed (perfect for different guitar types)" },
        { icon: "🔄", title: "Orientation Flipping", desc: "Flip the neck horizontally or vertically to match your perspective" },
        { icon: "🎵", title: "Base Tuning Transposition", desc: "Easily transpose your entire tuning up or down" }
      ]
    },
    {
      title: "Learning & Development Focus",
      content: "GScale was created as a learning platform for modern web development:",
      features: [
        { icon: "🧪", title: "Multiple State Management", desc: "Redux for global config, Context API for instrument-specific state, local state for components" },
        { icon: "🎨", title: "SVG Visualizations", desc: "Scalable vector graphics for crisp instrument renderings across all devices" },
        { icon: "📱", title: "Mobile-First Design", desc: "Responsive design that works beautifully on phones, tablets, and desktops" },
        { icon: "🧪", title: "Comprehensive Testing", desc: "Jest, React Testing Library, Playwright, and Cucumber for different testing approaches" }
      ]
    },
    {
      title: "Technical Architecture",
      content: "Built with modern web technologies:",
      tech: ["Next.js 15 (App Router)", "React 19", "TypeScript 5", "Tailwind CSS", "Redux Toolkit", "Jest & RTL", "Playwright", "Cucumber BDD", "Capacitor (Mobile)", "Web Audio API"]
    },
    {
      title: "Start Exploring Music Theory",
      content: "GScale makes learning and understanding musical scales intuitive and engaging. Whether you're a beginner learning your first scales or an advanced musician exploring exotic modes, GScale provides the tools you need.",
      userTypes: [
        { icon: "🎯", title: "For Beginners", desc: "Visual learning makes complex music theory accessible and fun" },
        { icon: "🚀", title: "For Advanced Players", desc: "Explore exotic scales and custom tunings to expand your musical vocabulary" },
        { icon: "👨‍🏫", title: "For Teachers", desc: "Clear visualizations perfect for music education and demonstrations" },
        { icon: "🎼", title: "For Composers", desc: "Discover new scales and modes to inspire your compositions" }
      ]
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === ' ') {
        e.preventDefault();
        setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, slides.length]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`fixed inset-0 z-50 ${isDarkMode ? 'dark' : ''}`}>
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className={`relative w-full max-w-4xl h-[80vh] rounded-lg shadow-2xl overflow-hidden ${
          isDarkMode 
            ? 'bg-gray-900 text-white' 
            : 'bg-white text-gray-900'
        }`}>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${
              isDarkMode
                ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
            title="Close help"
          >
            ✕
          </button>

          {/* Slideshow container */}
          <div className="h-full overflow-y-auto">
            <div className="min-h-full flex flex-col justify-center p-8">
              
              {/* Slide 1: Title */}
              {currentSlide === 0 && (
                <div className="text-center space-y-6">
                  <h1 className={`text-4xl sm:text-5xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    GScale
                  </h1>
                  <h3 className={`text-xl sm:text-2xl ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Musical Scale Visualization Tool
                  </h3>
                  <p className={`text-lg ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    A modern, interactive application that helps musicians visualize and learn musical scales across multiple instruments.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center mt-8">
                    {currentSlideData.tech?.map((tech, index) => (
                      <span key={index} className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode
                          ? 'bg-gray-800 text-gray-300 border border-gray-700'
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Slide 2: What is GScale */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <h2 className={`text-3xl font-bold text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    What is GScale?
                  </h2>
                  <p className={`text-lg text-center ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    GScale is a comprehensive musical scale visualization tool designed for musicians of all levels. It provides interactive visualizations of scales across different instruments, making it easier to understand scale patterns, relationships, and fingerings.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {currentSlideData.features?.map((feature, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-800 border border-gray-700'
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{feature.icon}</span>
                          <h4 className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {feature.title}
                          </h4>
                        </div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Slide 3: Instruments */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <h2 className={`text-3xl font-bold text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Supported Instruments
                  </h2>
                  <p className={`text-lg text-center ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    GScale provides specialized visualizations for each instrument type:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {currentSlideData.instruments?.map((instrument, index) => (
                      <div key={index} className={`p-4 rounded-lg text-center ${
                        isDarkMode
                          ? 'bg-gray-800 border border-gray-700'
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <h4 className={`font-semibold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {instrument.name}
                        </h4>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {instrument.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Slide 4: Scale Library */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <h2 className={`text-3xl font-bold text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Comprehensive Scale Library
                  </h2>
                  <p className={`text-lg text-center ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    GScale includes over 60 scale types across multiple categories:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                    {currentSlideData.scales?.map((scale, index) => (
                      <div key={index} className={`p-2 rounded text-center text-sm ${
                        isDarkMode
                          ? 'bg-gray-800 border border-gray-700 text-gray-300'
                          : 'bg-gray-50 border border-gray-200 text-gray-700'
                      }`}>
                        {scale}
                      </div>
                    ))}
                  </div>
                  <p className={`text-center text-sm mt-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Each scale includes proper interval relationships and can be transposed to any key.
                  </p>
                </div>
              )}

              {/* Slide 5: Advanced Features */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <h2 className={`text-3xl font-bold text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Advanced Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSlideData.features?.map((feature, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-800 border border-gray-700'
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{feature.icon}</span>
                          <h4 className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {feature.title}
                          </h4>
                        </div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Slide 6: Getting Started */}
              {currentSlide === 5 && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  <h2 className={`text-3xl font-bold text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Getting Started
                  </h2>
                  <div className="space-y-4">
                    {currentSlideData.steps?.map((step, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-700 border-green-500'
                          : 'bg-gray-50 border-gray-200 border-green-500'
                      }`}>
                        <h4 className={`font-semibold mb-2 ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}>
                          {step.title}
                        </h4>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Slide 7: Guitar Features */}
              {currentSlide === 6 && (
                <div className="space-y-6">
                  <h2 className={`text-3xl font-bold text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Guitar-Specific Features
                  </h2>
                  <p className={`text-lg text-center ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    GScale offers advanced guitar functionality:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSlideData.features?.map((feature, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-800 border border-gray-700'
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{feature.icon}</span>
                          <h4 className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {feature.title}
                          </h4>
                        </div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className={`text-center text-sm mt-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    The SVG-based fretboard provides crisp, scalable visualizations that work on any screen size.
                  </p>
                </div>
              )}

              {/* Slide 8: Learning Focus */}
              {currentSlide === 7 && (
                <div className="space-y-6">
                  <h2 className={`text-3xl font-bold text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Learning & Development Focus
                  </h2>
                  <p className={`text-lg text-center ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    GScale was created as a learning platform for modern web development:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSlideData.features?.map((feature, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-800 border border-gray-700'
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{feature.icon}</span>
                          <h4 className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {feature.title}
                          </h4>
                        </div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className={`text-center text-sm mt-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Despite being a learning project, GScale provides genuine value as one of the most comprehensive scale visualization tools available.
                  </p>
                </div>
              )}

              {/* Slide 9: Technical Architecture */}
              {currentSlide === 8 && (
                <div className="space-y-6">
                  <h2 className={`text-3xl font-bold text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Technical Architecture
                  </h2>
                  <p className={`text-lg text-center ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Built with modern web technologies:
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center mt-8">
                    {currentSlideData.tech?.map((tech, index) => (
                      <span key={index} className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode
                          ? 'bg-gray-800 text-gray-300 border border-gray-700'
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className={`text-center text-sm mt-6 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    The application uses a hybrid state management approach intentionally to demonstrate different techniques, and includes comprehensive testing with multiple frameworks.
                  </p>
                </div>
              )}

              {/* Slide 10: Conclusion */}
              {currentSlide === 9 && (
                <div className="space-y-6">
                  <h2 className={`text-3xl font-bold text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Start Exploring Music Theory
                  </h2>
                  <p className={`text-lg text-center ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    GScale makes learning and understanding musical scales intuitive and engaging. Whether you're a beginner learning your first scales or an advanced musician exploring exotic modes, GScale provides the tools you need.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSlideData.userTypes?.map((userType, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-800 border border-gray-700'
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{userType.icon}</span>
                          <h4 className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {userType.title}
                          </h4>
                        </div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {userType.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className={`text-center text-lg font-semibold mt-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <strong>Ready to explore the world of musical scales?</strong> Open GScale and start your musical journey today!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className={`p-2 rounded-full transition-colors ${
                currentSlide === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Previous slide"
            >
              ←
            </button>
            
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide
                      ? (isDarkMode ? 'bg-white' : 'bg-gray-900')
                      : (isDarkMode ? 'bg-gray-600' : 'bg-gray-400')
                  }`}
                  title={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlide === slides.length - 1}
              className={`p-2 rounded-full transition-colors ${
                currentSlide === slides.length - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Next slide"
            >
              →
            </button>
          </div>

          {/* Slide counter */}
          <div className="absolute top-4 left-4 text-sm text-gray-500">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>
    </div>
  );
};