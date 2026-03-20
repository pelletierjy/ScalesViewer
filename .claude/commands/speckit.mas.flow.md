---
description: Run the Spec-Kit workflow step-by-step in a MANDATORY feature worktree (start, next, status, reset). All work is isolated. Delegates to the mas-flow-runner agent.
model: sonnet
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty). Treat it as the subcommand and any extra args (e.g. feature name for start).

## Subcommands

- **start** – Create a new feature worktree (if not already in one) and run the first step (Setup). Creates worktree at `../<repo>-feature-{ticket}-{short-name}`, creates `specs/<branch>/` inside worktree, and initializes flow state via `mas-flow-state.ps1`. Creates `mas-flow-state.json` with all steps initialized as pending, then marks Setup as in_progress, executes Setup, and marks it as completed.

  **Usage**: `speckit.mas.flow start [-JiraTicket ABC-123] <feature description>`
  - `-JiraTicket`: Optional JIRA ticket ID (e.g., ABC-123). If not provided, defaults to IND-999
  - Example: `speckit.mas.flow start -JiraTicket IND-512 Update branch naming logic`
- **next** – Run the next step in the flow (Plan → Tasks → Checklist → Analyze → Implement). Reads flow state from `specs/<branch>/mas-flow-state.json`, marks the next pending step as in_progress, runs the corresponding speckit command, then marks step as completed with outcome, artifacts, and timestamps.
- **status** – Show current flow step, last outcome, attempt history, and key paths (FEATURE_DIR, IMPL_PLAN, tasks.md). Display completion percentage and all artifacts generated per step. No side effects.
- **reset** – Call `Reset-MasFlowState` to clear flow state and archive it. Do not delete spec/plan/tasks/checklists unless the user explicitly asks to wipe the feature.

## Delegation

This command is executed by the **mas-flow-runner** agent. When the user invokes `/speckit.mas.flow` or `speckit.mas.flow`:

1. Parse subcommand from `$ARGUMENTS` (default to `status` if empty).
2. Resolve repo root (and worktree if applicable). Use absolute paths for scripts.
3. For **start**: If not in a feature worktree, run `.specify/scripts/powershell/create-new-feature.ps1` with user args if provided, or ensure SPECIFY_FEATURE is set and run `.specify/scripts/powershell/setup-plan.ps1 -Json` to get FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH.
   - Initialize flow state in SPECS_DIR via `.specify/scripts/powershell/mas-flow-state.ps1 -Operation Initialize -StateFilePath specs/<branch>/mas-flow-state.json -Json`
   - Mark Setup as started via `.specify/scripts/powershell/mas-flow-state.ps1 -Operation StartStep -StateFilePath ... -StepIndex 0 -Json`
   - Run Setup (copy plan template, ensure dirs)
   - Mark Setup as completed via `.specify/scripts/powershell/mas-flow-state.ps1 -Operation CompleteStep -StateFilePath ... -StepIndex 0 -Outcome success -Artifacts @(...paths...) -Json`
4. For **next**: Read flow state from `specs/<branch>/mas-flow-state.json` via `mas-flow-state.ps1`. Determine next pending step index.
   - Mark step as started via `StartStep` operation
   - Run the corresponding command (speckit.plan, speckit.tasks, speckit.checklist, speckit.analyze, speckit.implement)
   - Mark step as completed via `CompleteStep` operation with outcome, message, and artifacts list
   - Report results
5. For **status**: Load state via `mas-flow-state.ps1 -Operation Read`. Display flow status including current step, completion percentage, attempt history, and artifacts per step.
6. For **reset**: Call `mas-flow-state.ps1 -Operation Reset -StateFilePath specs/<branch>/mas-flow-state.json`. Report "Flow state reset with backup at ..."

## Worktree Requirement

ALL speckit.mas.flow operations MUST occur in a dedicated feature worktree. The agent will:

1. **Validate worktree** at the start of every command
2. **Create worktree automatically** for `start` command if not in one
3. **Error immediately** for other commands if not in worktree

**Worktree naming convention**: `../<repo>-feature-{ticket}-{short-name}`
- Example: Main repo at `/dev/MediaAssetSearch`, worktree at `/dev/MediaAssetSearch-feature-ABC-123-user-auth`

**Branch naming convention**: `feature-{ticket}-{short-name}`
- Example: `feature-ABC-123-user-auth`, `feature-DEF-456-config-properties`
- When no JIRA ticket provided, defaults to `feature-IND-999-{short-name}`

**All artifacts** (spec.md, plan.md, tasks.md, checklists/, mas-flow-state.json) are created in `specs/<branch>/` within the worktree.

## Scripts (worktree root)

- `.specify/scripts/powershell/is-worktree.ps1 -Json` – IS_WORKTREE, WORKTREE_PATH, MAIN_REPO_PATH (validates worktree context).
- `.specify/scripts/powershell/setup-plan.ps1 -Json` – FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH.
- `.specify/scripts/powershell/create-new-feature.ps1 -Json -Worktree [-JiraTicket ABC-123] <description>` – Create feature worktree with JIRA-based branch naming and specs dir (returns WORKTREE_PATH, BRANCH_NAME, FEATURE_DIR).
- `.specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks` – FEATURE_DIR, AVAILABLE_DOCS (for implement step).
- `.specify/scripts/powershell/mas-flow-state.ps1 -Operation <op> -StateFilePath <path> [options] -Json` – Manages flow state persistence.
  - **Initialize**: Create new state file with all steps pending
  - **Read**: Load state from file
  - **StartStep**: Mark step as in_progress with new attempt
  - **CompleteStep**: Mark step as completed with outcome and artifacts
  - **FailStep**: Mark step as failed with error message
  - **GetStatus**: Get step status and attempt history
  - **Validate**: Validate state file integrity
  - **Reset**: Delete state file and create timestamped backup

All script invocations MUST be from the worktree root. Use Bash to run PowerShell: `pwsh -NoProfile -File .specify/scripts/powershell/mas-flow-state.ps1 -Operation Initialize -StateFilePath specs/branch-name/mas-flow-state.json -Json`.

## Flow State File Format

The `mas-flow-state.json` file is stored in `specs/<branch>/` and tracks all step execution outcomes persistently.

### File Location
```
specs/<branch>/mas-flow-state.json
```

Example: `specs/feature-ABC-123-user-auth/mas-flow-state.json`

### Schema

```json
{
  "version": "1.0",
  "flowId": "550e8400-e29b-41d4-a716-446655440000",
  "featureBranch": "feature-ABC-123-user-auth",
  "createdAt": "2026-01-31T10:00:00Z",
  "updatedAt": "2026-01-31T10:30:00Z",
  "currentStep": 2,
  "status": "in_progress",
  "steps": [
    {
      "stepIndex": 0,
      "stepName": "Setup",
      "status": "completed",
      "attempts": [
        {
          "attemptNumber": 1,
          "startedAt": "2026-01-31T10:00:00Z",
          "completedAt": "2026-01-31T10:05:00Z",
          "outcome": "success",
          "message": "Setup completed successfully",
          "artifacts": [
            "specs/feature-ABC-123-user-auth/spec.md"
          ]
        }
      ],
      "lastAttempt": "2026-01-31T10:05:00Z"
    }
  ]
}
```

### Field Definitions

**Root Level**:
- `version` – Schema version (e.g., "1.0")
- `flowId` – Unique identifier for this flow execution
- `featureBranch` – Branch/feature name (e.g., "002-config-properties")
- `createdAt` – When flow was initialized (ISO 8601)
- `updatedAt` – Last state modification timestamp
- `currentStep` – Index of currently active step (0-5)
- `status` – Overall flow status: `not_started`, `in_progress`, `completed`, `failed`

**Step Level** (one per flow step):
- `stepIndex` – 0-based index: Setup=0, Plan=1, Tasks=2, Checklist=3, Analyze=4, Implement=5
- `stepName` – Human-readable name (e.g., "Setup")
- `status` – Step status: `pending`, `in_progress`, `completed`, `failed`
- `attempts` – Array of all execution attempts (for retry tracking)
- `lastAttempt` – Timestamp of most recent attempt

**Attempt Level** (one or more per step):
- `attemptNumber` – Sequential attempt counter (1 for first try, 2 for first retry, etc.)
- `startedAt` – When this attempt began (ISO 8601)
- `completedAt` – When this attempt finished (null if in progress)
- `outcome` – Result: `pending`, `success`, `failed`, `skipped`
- `message` – Human-readable summary or error message
- `artifacts` – Paths to files created/modified during this attempt

### State Enforcement Guarantees

1. **Step Start Enforcement**: State MUST be updated before any step command executes
   - Adds new attempt record with `startedAt` timestamp
   - Sets step status to `in_progress`
   - Writes state atomically to disk

2. **Step End Enforcement**: State MUST be updated after step command completes (success or failure)
   - Updates attempt with `completedAt` timestamp
   - Sets `outcome` to success/failed/skipped
   - Adds `message` and `artifacts`
   - Advances `currentStep` on success
   - Writes state atomically to disk

3. **Atomicity**: All file writes use temp file + atomic rename pattern to prevent corruption

4. **Validation**: State is validated on every read operation

## Troubleshooting

### State file not found after `start`
- Verify you are in the worktree directory (not main repo)
- Check that `specs/<branch>/` directory was created
- Re-run `speckit.mas.flow start <description>` to initialize

### State file is corrupted
- A backup is available at `specs/<branch>/mas-flow-state.json.backup.*`
- Delete the corrupted file and restore from backup, or
- Run `speckit.mas.flow reset` to delete and start over

### Flow is stuck on a failed step
- Run `speckit.mas.flow status` to see the failure details
- Fix the underlying issue (e.g., missing dependencies)
- Run `speckit.mas.flow next` again to retry
- A new attempt record will be created in the state file

### Want to start over
- Run `speckit.mas.flow reset` to delete state file and create backup
- The next `speckit.mas.flow start ...` will begin from step 1 with fresh state

## Example Queries

### Check flow progress
```bash
speckit.mas.flow status
```

Output includes:
- Current step (Setup/Plan/Tasks/Checklist/Analyze/Implement)
- Completion percentage
- All attempts and outcomes per step
- Artifacts created by each step

### Inspect state file directly
```bash
cat specs/002-config-properties/mas-flow-state.json | jq .
```

### Extract artifacts from all completed steps
```bash
cat specs/feature-ABC-123-user-auth/mas-flow-state.json | jq '.steps[] | select(.status=="completed") | .attempts[-1].artifacts'
```

### See all failed attempts
```bash
cat specs/feature-ABC-123-user-auth/mas-flow-state.json | jq '.steps[].attempts[] | select(.outcome=="failed")'
```
