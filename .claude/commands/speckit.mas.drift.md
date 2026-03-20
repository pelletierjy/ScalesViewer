---
description: Detect and report workflow/policy drift across .claude and .specify (no changes applied).
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Goal

Identify contradictions or outdated references across:
- `.specify/memory/constitution.md`
- `.claude/rules/`
- `.claude/commands/`
- `.specify/templates/` and `.specify/scripts/`
- `.documents` 

## Outline

1. **Load key artifacts**
   - Read constitution, core rules (API/security/testing), and the spec-kit command definitions.

2. **Drift checks**
   - API pagination strategy consistency
   - Auth responsibility (gateway vs service)
   - Branch naming consistency (Jira vs numbered)
   - Package naming / service naming drift
   - Broken or non-existent file references (e.g., templates pointing to missing paths)

3. **Report**
   - Findings table: ID | Area | Severity | Location(s) | Recommendation
   - “Suggested remediation plan” section (but do not apply changes).

## Behavior rules

- Default is strictly read-only.
- If user asks to remediate, propose an ordered patch list first.
