---
description: Post status update to a Jira ticket and check off completed checklist items from changes
model: haiku
---

## User Input

```text
$ARGUMENTS
```

## Workflow

### Step 1: Determine Jira Ticket

1. If user provided a ticket key in arguments (e.g., `IND-20`), use it
2. Otherwise, extract ticket from current branch name:
   - Run `git rev-parse --abbrev-ref HEAD` to get current branch
   - Parse branch name for pattern like `feature/IND-XXX` or `IND-XXX`
   - Extract ticket key (e.g., `IND-20`)
3. If still no ticket found, ask user for ticket key
4. If ticket cannot be determined, exit with error

### Step 2: Fetch Ticket Description

1. Use Atlassian CLI to fetch the ticket description:
   ```bash
   acli jira workitem view <TICKET_KEY>
   ```
2. Extract the description field
3. Parse for unchecked checklist items (lines starting with `- [ ]`)

### Step 3: Analyze Changes

1. Get list of changed files:
   - Run `git diff main...HEAD --name-only`
2. Get commit messages:
   - Run `git log main...HEAD --oneline`
3. Identify which files/components were touched
4. Identify the general nature of changes (Java files, tests, config, docs, etc.)

### Step 4: Match Checklist Items to Changes

1. Extract all unchecked checklist items from ticket description
2. For each checklist item, determine if it's addressed by the changes:
   - Match keywords/components mentioned in the checklist item with changed files
   - Look for related commit messages
   - Use reasonable inference (e.g., if item mentions "add tests" and Java test files were added, mark as handled)
3. Create a list of items that were addressed

### Step 5: Update Ticket Description

1. Take the original description from Step 2
2. Update checklist items by changing `- [ ]` to `- [x]` for completed items
3. Update the ticket description using Atlassian CLI:
   ```bash
   acli jira workitem edit --key <TICKET_KEY> --description "<updated_description>"
   ```
4. Confirm the description was updated successfully

### Step 6: Generate and Post Status Comment

Create a status comment that includes:
1. **Summary line:** Brief status update on the changes (2-3 sentences)
   - What was implemented/fixed
   - Current state of the feature
2. **Checklist section:** If applicable, show the checklist items with completed ones marked
   - Checked items: `- [x] Item name` (for items addressed by changes)
   - Unchecked items: `- [ ] Item name` (for remaining items)

Example format:
```
**Status Update:**
Implemented OpenSearch index initialization and health checks. Added configuration support for k-NN vector search with faiss engine.

**Progress:**
- [x] Configure OpenSearch client connection
- [x] Set up index initialization
- [x] Add health indicator
- [ ] Implement semantic search queries
- [ ] Add integration tests
```

Then post the comment using Atlassian CLI:
```bash
acli jira workitem comment create --key <TICKET_KEY> --body "<comment_text>"
```

Confirm the comment was posted successfully.

## Important Notes

- Be conservative when matching checklist items to changes - only mark as complete if confident
- Keep status summary brief and clear (2-3 sentences)
- Focus on what was accomplished, not implementation details
- If Jira ticket cannot be accessed, report the issue clearly
- Do not post if analysis cannot be completed
- Use the Atlassian CLI (`acli`) for all Jira operations
- Ensure `acli` is configured and authenticated before running this command
- Update the ticket description FIRST, then post the comment for audit trail
