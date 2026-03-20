---
description: Run the standard Maven verification workflow and summarize failures.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Goal

Run the project’s standard verification flow (tests + checks) and produce an actionable summary.

## Outline

1. **Pre-flight**
   - If git is available: show branch, clean/dirty status.
   - Run `.specify/scripts/powershell/check-prerequisites.ps1 -Json -PathsOnly` (best-effort) to capture current feature paths.

2. **Execute**
   - Run `mvn -q test` and `mvn -q verify` (or just `mvn verify` if preferred) from repo root.

3. **Summarize**
   - If failures:
     - Identify failing test classes/methods and error types.
     - Provide the minimal set of next actions to fix (e.g., “fix MockMvc expectation”, “update Testcontainers properties”, etc.).
   - If success:
     - Report success and the exact command(s) run.

## Behavior rules

- Prefer **PowerShell** commands and absolute paths.
- Do not skip checks unless the user asked for `-DskipTests` explicitly.
- Do not create commits.
