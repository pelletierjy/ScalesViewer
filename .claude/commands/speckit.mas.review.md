---
description: Perform a standards-focused review of current changes (security, quality, performance) with actionable findings.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Goal

Review the current change set against the repo’s standards (security, error handling, testing, OpenSearch patterns) and produce a prioritized findings list with file/line references.

## Outline

1. **Collect change set**
   - `git status`
   - `git diff`
   - `git diff --name-only`

2. **Standards checks (static)**
   - Secrets exposure scan: look for keys/tokens, `.env` usage, accidental credential logging.
   - Logging/PII scan: ensure no sensitive fields are logged.
   - Error handling: confirm RFC 7807 ProblemDetails pattern is used when applicable.
   - API conventions: endpoints/versioning/status codes/pagination consistency.
   - Testing: verify test updates are present when behavior changes.

3. **(Optional) Run fast checks**
   - `mvn -q test` if the change size warrants it and runtime is reasonable.

4. **Report**
   - Findings table: ID | Severity | File:Line | Summary | Recommendation
   - End with a short “Top fixes to do next” list.

## Behavior rules

- Default is read-only analysis; do not modify files unless the user explicitly asks to apply fixes.
