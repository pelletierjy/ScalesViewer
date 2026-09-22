"use client";

// Build trigger: force Vercel redeploy (take 3)

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleHomeworkMode,
  selectHomeworkMode,
  selectIsDarkMode,
  selectLanguage,
} from "@/features/globalConfig/globalConfigSlice";
import { Panel, Button } from "@/components/ui";

const WIDGET_SCRIPT_SRC = "/need-homework/need-homework-widget.js";
const CUSTOM_ELEMENT_TAG = "need-homework-app";

function loadHomeworkWidgetScript() {
  if (customElements.get(CUSTOM_ELEMENT_TAG)) return;
  if (document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`)) return;
  const script = document.createElement("script");
  script.type = "module";
  script.src = WIDGET_SCRIPT_SRC;
  document.head.appendChild(script);
}

export default function HomeworkPanel() {
  const dispatch = useDispatch();
  const homeworkMode = useSelector(selectHomeworkMode);
  const isDarkMode = useSelector(selectIsDarkMode);
  const language = useSelector(selectLanguage);

  useEffect(() => {
    if (homeworkMode) loadHomeworkWidgetScript();
  }, [homeworkMode]);

  if (!homeworkMode) {
    return (
      <Panel title="Learn music theory" className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--console-text-dim)]">
            Practice music theory with an AI tutor.
          </p>
          <Button tone="accent2" onClick={() => dispatch(toggleHomeworkMode())}>
            Enable
          </Button>
        </div>
      </Panel>
    );
  }

  return (
    <Panel
      title="Learn music theory (experimental feature under development)"
      headerRight={
        <Button size="sm" onClick={() => dispatch(toggleHomeworkMode())}>
          Disable
        </Button>
      }
    >
      <div className="w-full" style={{ height: "600px" }}>
        <need-homework-app
          subject="Music"
          theme={isDarkMode ? "dark" : "light"}
          lang={language}
          className="block h-full w-full"
        />
      </div>
    </Panel>
  );
}
