import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import {
  selectScale,
  selectShowFlats,
  selectIsMonochrome,
  selectShowDegrees,
} from "../features/globalConfig/globalConfigSlice";

export const Details: React.FC = () => {
  const t = useTranslations();
  const showFlats = useSelector(selectShowFlats);
  const scale = useSelector(selectScale);
  const showDegrees = useSelector(selectShowDegrees);
  const highlightRoots = useSelector(selectIsMonochrome);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  return (
    <div className="rack-panel">
      <button
        onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
        className="w-full px-3 py-1.5 flex items-center justify-between rack-label hover:text-[var(--console-accent)]"
      >
        <span>{t("details.title")}</span>
        <span
          className="transform transition-transform duration-200"
          style={{ transform: isDetailsExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </span>
      </button>

      {isDetailsExpanded && (
        <div className="px-3 py-2 text-sm border-t border-[var(--console-border)] text-[var(--console-text-dim)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 rack-mono">
            <div>
              <p>
                {t("details.currentScale")} {scale.root} {scale.type}
              </p>
              <p>{t("details.scaleRoot")} {scale.root}</p>
            </div>
            <div>
              <p>{t("details.displayMode")} {showDegrees ? t("details.scaleDegrees") : t("details.noteNames")}</p>
              <p>{t("details.noteDisplay")} {showFlats ? t("details.flatNotes") : t("details.sharpNotes")}</p>
              <p>{t("details.colorMode")} {highlightRoots ? t("details.monochrome") : t("details.colored")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
