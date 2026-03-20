## User Story

As a {{PERSONA: Be specific, e.g., "developer integrating with the Search API" not just "user"}}, I want {{GOAL: The capability or feature}}, so that {{BENEFIT: The business value or outcome}}.

## Description

{{DESCRIPTION: 2-3 sentences providing context. Include:

- What problem this solves
- How it fits into the larger epic
- Any relevant background the implementer needs}}

## Acceptance Criteria

{{ACCEPTANCE_CRITERIA: Choose the format that best fits this story. Use Given-When-Then for behaviors, checklist for constraints/rules.}}

### Format Option 1: Given-When-Then (Behavior-Focused)

Use for: User interactions, API behaviors, state transitions

**Scenario 1: [Scenario name]**

**Given** [precondition or starting context]
**When** [action taken by user or system]
**Then** [expected outcome or result]
**And** [additional outcome, if any]

**Scenario 2: [Error/edge case]**

**Given** [precondition]
**When** [action that triggers error]
**Then** [expected error handling]

### Format Option 2: Rule-Based Checklist (Constraint-Focused)

Use for: Validation rules, UI constraints, configuration, non-functional requirements

- [ ] [Specific, testable condition 1]
- [ ] [Specific, testable condition 2]
- [ ] [Performance requirement, e.g., "Response time < 500ms"]
- [ ] [Validation rule, e.g., "Input limited to 200 characters"]

## Definition of Done

- [ ] Code complete and peer reviewed
- [ ] Unit tests passing with adequate coverage
- [ ] Integration tests passing (if applicable)
- [ ] API documentation updated (if applicable)
- [ ] No critical/high severity bugs

---

<!-- OPTIONAL SECTIONS: Include sections below when relevant to this story. Remove sections that don't apply. -->

## Technical Notes

{{TECHNICAL_NOTES: Implementation guidance. Include:

- Patterns to follow (e.g., "Use Strategy pattern per LLM_Integration_Standards.md")
- Reuse opportunities (e.g., "Adapt from POC at [path]")
- Key classes or methods to modify
- Configuration changes required
- Non-obvious implementation considerations}}

## API Changes

{{API_CHANGES: For stories that add or modify API endpoints. Include:

**Endpoint:** `POST /api/v1/example`

**Request:**
```json
{
  "field": "value"
}
```

**Response:**
```json
{
  "result": "value"
}
```

**Status Codes:** 200 OK, 400 Bad Request, etc.}}

## Dependencies

{{DEPENDENCIES: Stories or components that must be complete first, or that this story blocks.

**Blocked By:**
- IND-XX: [Story title] - [Why this blocks]

**Blocks:**
- IND-YY: [Story title] - [Why this story blocks it]

**Shared Components:**
- [Component name] - [Coordination needed]}}

## Out of Scope

{{OUT_OF_SCOPE: Explicit exclusions to prevent scope creep.

- [Feature or behavior NOT included]
- [Edge case NOT handled in this story]
- [Related work deferred to another story]}}

## Test Scenarios

{{TEST_SCENARIOS: Key test cases beyond acceptance criteria. Useful for QA handoff.

| Scenario | Input | Expected Result |
|----------|-------|-----------------|
| Happy path | Valid input | Success response |
| Invalid input | Missing required field | 400 error with field name |
| Edge case | Maximum allowed value | Handled correctly |}}

## Links

{{LINKS: Related resources.

- **Epic:** [IND-XX: Epic Title](link)
- **Design Doc:** [Title](link)
- **Related Stories:** IND-YY, IND-ZZ
- **Relevant Standards:** [Java_Coding_Standards.md](../.claude/rules/Java_Coding_Standards.md)}}

---

# Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-25 | Initial version |
