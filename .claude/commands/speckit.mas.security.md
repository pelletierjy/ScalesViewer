---
description: Security-focused scan of the repo changes and configuration (secrets, logging, dependencies).
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Goal

Catch common security issues early: leaked secrets, unsafe logging, missing validation, and dependency red flags.

## Outline

1. **Change-scope scan**
   - `git status`
   - `git diff --name-only`
   - `git diff`

2. **Secrets & sensitive data**
   - Search diffs for: API keys, tokens, passwords, connection strings, private keys.
   - Confirm no secrets are checked in (warn if `.env*`, `*.pem`, `credentials.*` changed).

3. **Logging & error hygiene**
   - Look for logging of headers, auth tokens, PII, filesystem paths.
   - Ensure errors don’t expose internals; prefer ProblemDetails payloads.

4. **Dependency posture (best-effort)**
   - Run `mvn -q -DskipTests dependency:tree` or `mvn -q dependency:analyze` if available.
   - If your pipeline uses SpotBugs/OWASP checks, point to the right commands.

5. **Report**
   - Findings grouped by severity with clear remediation steps.

## Behavior rules

- Do not attempt to “rotate” secrets—only identify and recommend remediation.
- If you detect a likely secret in git history or working tree, stop and highlight it immediately.
