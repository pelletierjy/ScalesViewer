---
name: atlassian-cli
description: Use the Atlassian CLI (acli) to interact with Jira Cloud resources and retrieve ticket information.
model: haiku
---

# Atlassian CLI for Jira

## Overview

The Atlassian CLI (`acli`) is installed and configured to seamlessly interact with Jira Cloud. This skill helps you work with Jira tickets, projects, and work items directly from the command line.

## Getting Started

The acli tool is pre-installed and configured. To understand available commands, run:

```bash
acli --help
```

## Core Commands

```
AVAILABLE COMMANDS:
  admin       Admin commands
  auth        Authenticate to use Atlassian CLI
  confluence  Confluence Cloud commands
  jira        Jira Cloud commands
  rovodev     Atlassian's AI coding agent: Rovo Dev (Beta)
```

## Jira Work Items

The primary command for working with Jira tickets is:

```bash
acli jira workitem [command]
```

### Available Work Item Commands

```
COMMANDS:
  view        Retrieve information about Jira work items
  search      Search for work items
  create      Create a Jira work item
  edit        Edit a Jira work item
  assign      Assign a work item to an assignee
  transition  Transition a work item to a new status
  comment     Work item comments commands
  link        Link work items commands
  delete      Delete a work item
  archive     Archive a work item
  watcher     Work item watcher commands
  attachment  Work item attachments commands
  clone       Create a duplicate work item
```

## Common Usage Examples

### View a Ticket
```bash
acli jira workitem view IND-147
```

This displays:
- Key and Type (e.g., Sub-task)
- Summary and Status
- Assignee information
- Full description and acceptance criteria
- Technical notes and dependencies
- Links to related stories

### Search for Work Items
```bash
acli jira workitem search --query "project=IND AND status='In Progress'"
```

### Create a New Work Item
```bash
acli jira workitem create --project IND --type "Task" --summary "Your summary here"
```

### Edit a Work Item
```bash
acli jira workitem edit IND-147 --status "Closed"
```

### Assign a Work Item
```bash
acli jira workitem assign IND-147 --assignee "user@example.com"
```

### Transition Status
```bash
acli jira workitem transition IND-147 --status "In Review"
```

### Add a Comment
```bash
acli jira workitem comment add IND-147 --comment "Your comment here"
```

## Authentication

The CLI is already configured, but if you need to authenticate:

```bash
acli auth login
```

## Project Navigation

View boards, sprints, and dashboards:

```bash
acli jira board list                    # List all boards
acli jira sprint list                   # List sprints
acli jira dashboard list                # List dashboards
acli jira project list                  # List all projects
```

## Help

Get detailed help for any command:

```bash
acli jira workitem --help               # Show all workitem commands
acli jira workitem view --help          # Show help for view command
acli --help                             # Show all acli commands
```

## Tips

- **Ticket Keys:** Always use the format `PROJECT-NUMBER` (e.g., `IND-147`)
- **JSON Output:** Most commands support `--output json` for programmatic processing
- **Filtering:** Use `--query` flag with JQL (Jira Query Language) for advanced filtering
- **Configuration:** View/change settings with `acli config`

## Useful Jira Links

- **Epic:** [IND-20: Media Asset Search](https://rossvideo.atlassian.net/browse/IND-20)
- **Backlog:** [IND Board](https://rossvideo.atlassian.net/jira/software/c/projects/IND/boards/4146)
- **Active Sprint:** [Current Sprint](https://rossvideo.atlassian.net/jira/software/c/projects/IND/boards/4146?sprint=active)
- **Project Issues:** [IND Issues](https://rossvideo.atlassian.net/projects/IND/issues)

---

**Learn More:**
Use `acli [command] --help` for detailed command options and flags.
