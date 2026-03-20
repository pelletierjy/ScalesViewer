---
description: Post a description to a PR explaining the changes in the current branch
model: haiku
---

## User Input

```text
$ARGUMENTS
```

## Workflow

### Step 1: Determine PR Number

1. If user provided a PR number in arguments, use it
2. Otherwise, detect the PR from the current branch context:
   - Run `gh pr list --head $(git rev-parse --abbrev-ref HEAD) --json number --jq ".[0].number"`
   - If no PR found, ask user for PR number
3. If still no PR available, exit with error

### Step 2: Analyze Changes

1. Get the list of changed files:
   - Run `git diff main...HEAD --name-only`
   - This shows files changed since branch diverged from main
2. Get a summary of the changes:
   - Run `git log main...HEAD --oneline` to see commit messages
   - Run `git diff main...HEAD --stat` to see change statistics
3. Identify the primary areas affected (Java code, configuration, tests, docs, etc.)

### Step 3: Analyze Changes in Depth

1. Categorize changed files by type:
   - Source code changes (Java files in `sources/main/`)
   - Test changes (files in `sources/test/`)
   - Configuration changes (pom.xml, properties, YAML, JSON)
   - Documentation changes (markdown files in `documents/`)
   - Standards/Rules changes (files in `.claude/rules/`)

2. For each category, identify:
   - Which components/modules were affected
   - What specific changes were made
   - Impact on functionality or testing

3. Determine the primary change type:
   - **Feature**: New functionality added
   - **Fix/Bug Fix**: Resolves an issue or error
   - **Refactor**: Code structure improved, no functional change
   - **Migration**: Dependency/framework/technology upgrade
   - **Documentation**: Docs/guides added or updated
   - **Test**: New or improved tests

### Step 4: Generate Comprehensive PR Description

Create a structured description with these sections (use markdown formatting):

**## Summary**
- 1-2 sentences explaining what was changed and why
- Include the primary issue/problem being solved

**## What Changed**
- Organize by category (Core Code, Tests, Documentation, etc.)
- List specific files and what changed in each
- Include before/after comparisons where relevant
- Note dependencies or configuration updates

**## Why This Matters** (if applicable)
- Explain the business/technical impact
- Highlight benefits or improvements
- Note compatibility concerns or migration paths

**## Verification** (if applicable)
- Provide specific commands to verify the changes
- Include expected outputs or results
- Reference test commands or manual testing steps

**## Additional Notes** (if applicable)
- Production deployment considerations
- Known limitations or future work
- Related documentation or resources

### Step 5: Post to PR

1. Set the description as the PR body using:
   ```bash
   gh pr edit <PR_NUMBER> --body "<description>"
   ```
2. The description will be set as the main PR description, not a comment
3. Confirm the update was successful

## Important Notes

- **Structured over summary**: Use organized sections (Summary, What Changed, Why, Verification) for clarity
- **Be specific**: Reference actual filenames and specific changes
- **Include context**: Explain why changes were made, not just what was changed
- **Verification section**: Always include how to verify the changes work
- **Markdown formatting**: Use proper markdown headers, lists, and code blocks
- **Completeness over brevity**: Better to be thorough than terse
- **Production concerns**: Always note deployment considerations if applicable
- **Do not post if incomplete**: Ensure all critical information is present before posting
