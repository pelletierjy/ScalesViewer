import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectIsDarkMode,
  selectScale,
  selectShowFlats,
  selectIsMonochrome,
  selectShowDegrees,
} from "../features/globalConfig/globalConfigSlice";

export const Details: React.FC = () => {
  const showFlats = useSelector(selectShowFlats);
  const scale = useSelector(selectScale);
  const isDarkMode = useSelector(selectIsDarkMode);
  const showDegrees = useSelector(selectShowDegrees);
  const isMonochrome = useSelector(selectIsMonochrome);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  return (
    <div
      className={`rounded-lg transition-colors duration-200 ${
        isDarkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-slate-50/80 border border-slate-200"
      }`}
    >
      <button
        onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
        className={`w-full px-4 py-2 flex items-center justify-between text-sm font-medium ${
          isDarkMode
            ? "text-gray-200 hover:bg-gray-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <span>Details</span>
        <span
          className="transform transition-transform duration-200"
          style={{
            transform: isDetailsExpanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
      </button>

      {isDetailsExpanded && (
        <div
          className={`px-4 py-3 text-sm border-t transition-colors duration-200 ${
            isDarkMode
              ? "text-gray-400 border-gray-700"
              : "text-gray-700 border-gray-200"
          }`}
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p>
                Current Scale: {scale.root} {scale.type}
              </p>
              <p>Scale Root: {scale.root}</p>
              {/*               {instrument === "guitar" && (
                <>
                  <p>Tuning: {currentTuning.name}</p>
                  <p>Number of frets: {fretCount}</p>
                  <p>Base Tuning: {baseTuning}</p>
                </>
              )}
             {instrument === "piano" && (
                <p>
                  Display: {octaveCount} octave{octaveCount > 1 ? "s" : ""}
                </p>
              )}
 */}{" "}
            </div>
            <div>
              <p>
                Display Mode: {showDegrees ? "Scale Degrees" : "Note Names"}
              </p>
              <p>
                Note Display: {showFlats ? "Flat Notes (♭)" : "Sharp Notes (♯)"}
              </p>
              <p>Color Mode: {isMonochrome ? "Monochrome" : "Colored"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
