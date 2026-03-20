## Overview

{{OVERVIEW: 1-2 sentences describing what this Epic delivers and its primary goal. Write as a concise elevator pitch.}}

## Problem Statement

{{PROBLEM_STATEMENT: Describe the problem being solved. Include:

- What pain point or gap exists today
- Who is affected (users, teams, systems)
- Why solving this matters now
- Business value or impact of solving it}}

## Scope

{{SCOPE: List what IS included in this Epic. Be specific about:

- Features or capabilities being delivered
- User-facing changes
- System/component changes
- Any phases or increments if applicable}}

## Out of Scope

{{OUT_OF_SCOPE: Explicitly list what is NOT included. This prevents scope creep. Consider:

- Related features deferred to future Epics
- Edge cases not being handled
- Integrations not included
- Platforms or environments excluded}}

## Success Criteria

{{SUCCESS_CRITERIA: Define how we know this Epic is complete. Include:

- Measurable outcomes where possible
- Acceptance conditions at the Epic level
- Any metrics or KPIs to track}}

---

<!-- CONTEXT SECTIONS: Include the sections below when relevant to this Epic. Remove sections that don't apply. -->

## High-Level Architecture

{{HIGH_LEVEL_ARCHITECTURE: Describe the system context. Include:

- Entry points (APIs, UI surfaces, event triggers)
- Components affected or created
- Integration boundaries with other systems
- Data flows at a conceptual level

Note: Link to detailed technical design documents if available rather than duplicating content here.}}

## Technical Considerations

{{TECHNICAL_CONSIDERATIONS: Capture constraints and decisions. Include:

**Tech Stack:**
- Language: Java 17
- Framework: Spring Boot 3.x
- Build: Maven
- HTTP Client: Spring WebClient
- Search Engine: OpenSearch

**Patterns to Follow:**
- Strategy Pattern for pluggable LLM/ASR providers
- Factory Pattern for provider instantiation
- Async Processing with Spring @Async

**Non-functional Requirements:**
- Performance, security, scalability considerations
- Migration or backward compatibility needs

Note: Keep high-level. Detailed specs belong in linked TDDs or story-level descriptions.}}

## Provider Integration

{{PROVIDER_INTEGRATION: If this Epic involves LLM or ASR providers, specify:

- Which providers are affected
- New provider integrations required
- API changes or version updates
- Rate limiting or cost considerations}}

## OpenSearch Impact

{{OPENSEARCH_IMPACT: If this Epic affects data persistence, specify:

- Index changes (new indexes, mapping updates)
- Query pattern changes
- Data migration requirements
- Performance implications}}

## Async Processing Considerations

{{ASYNC_PROCESSING: If this Epic involves job processing, specify:

- Job lifecycle changes
- Thread pool configuration impacts
- Timeout or retry behavior changes
- Failure handling requirements}}

## Assumptions

{{ASSUMPTIONS: List what we're assuming to be true. Examples:

- Dependencies that will be available
- Team capacity or skills assumed
- External systems behavior
- Business rules taken as given}}

## Risks

{{RISKS: Known risks that could impact delivery. Keep lightweight (2-5 items). Format:

- Risk: [description] | Mitigation: [approach]}}

## Dependencies

{{DEPENDENCIES: Upstream and downstream dependencies. Include:

- Other Epics or features this depends on
- External teams or systems we need
- What other work depends on this Epic}}

## Open Questions

{{OPEN_QUESTIONS: Unresolved decisions needing input. Format as a checklist:

- [ ] Question 1
- [ ] Question 2}}

---

# Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.2 | 2025-01-24 | Removed specific provider references |
| 1.0.1 | 2025-01-24 | Added project-specific sections |
| 1.0.0 | 2025-01-24 | Initial version |
