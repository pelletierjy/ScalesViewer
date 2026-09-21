"use client";

// Build trigger: force Vercel redeploy (take 3)

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleHomeworkMode,
  selectHomeworkMode,
  selectIsDarkMode,
} from "@/features/globalConfig/globalConfigSlice";
import { Panel, Button } from "@/components/ui";

const HOMEWORK_BASE = "/need-homework/";

export default function HomeworkPanel() {
  const dispatch = useDispatch();
  const homeworkMode = useSelector(selectHomeworkMode);
  const isDarkMode = useSelector(selectIsDarkMode);
  const iframeSrc = `${HOMEWORK_BASE}?subject=Music&theme=${isDarkMode ? "dark" : "light"}`;

  if (!homeworkMode) {
    return (
      <Panel title="Learn about music theory (new feature under development / experimental)" className="flex flex-col gap-4">
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
      title="AI Homework"
      headerRight={
        <Button size="sm" onClick={() => dispatch(toggleHomeworkMode())}>
          Disable
        </Button>
      }
    >
      <div className="w-full" style={{ height: "600px" }}>
        <iframe
          src={iframeSrc}
          style={{ width: "100%", height: "100%", border: "none" }}
          title="AI Homework Chatbot"
          allow="clipboard-write"
        />
      </div>
    </Panel>
  );
}
