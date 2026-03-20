---
description: MediaAssetSearch (MAS) environment and workflow readiness checks.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Goal

Run a fast, mostly non-destructive diagnostic pass to confirm the local environment and feature-workflow prerequisites are in place for MediaAssetSearch development.

## Outline

1. **Repo + feature context**
   - Print current working directory and verify repo root markers exist (`.claude/`, `.specify/`).
   - If git is available: show current branch and working tree status.
   - Run `.specify/scripts/powershell/check-prerequisites.ps1 -Json -PathsOnly` and parse:
     - `REPO_ROOT`, `BRANCH`, `FEATURE_DIR`, `FEATURE_SPEC`, `IMPL_PLAN`, `TASKS`

2. **Toolchain checks (read-only)**
   - `java -version`
   - `mvn -v`
   - If Docker is in expected use: `docker version` and `docker compose version`

3. **Build & quality quick checks (non-destructive)**
   - `mvn -q -DskipTests compile`
   - If configured/available: `mvn -q checkstyle:check` and `mvn -q spotbugs:check`

4. **Local service connectivity checks (best-effort)**
   - If running locally, probe actuator health endpoints if applicable (do not fail the whole run if not running).
   - If OpenSearch is expected on `localhost:9200`, do a lightweight `curl`/`Invoke-WebRequest` probe (best-effort).

5. **Report**
   - Output a short table: Check | Status | Evidence | Fix suggestion
   - If any critical checks fail, recommend the next action (install steps or which command to run next).

## Behavior rules

- Prefer **PowerShell** commands and absolute paths.
- Do **not** create or modify files.
- If any step is not applicable (e.g., service not running), mark as **SKIPPED** with rationale.
