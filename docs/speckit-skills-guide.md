# Spec Kit Skills Guide

This project now includes 12 **Spec Kit** skills for specification-driven development. Spec Kit enables systematic planning, implementation, and verification using an AI-assisted workflow.

## Quick Start

The main Spec-Driven Development workflow is:

```
constitution → specify/baseline → clarify → plan → tasks → implement
                                    ↑        ↓
                                 (optional analysis/convergence)
```

## Available Skills

| Skill | Purpose | When to use |
|-------|---------|-----------|
| **speckit-constitution** | Define project principles and values | Start of a project; establish team norms |
| **speckit-specify** | Capture requirements for new work | Planning a new feature or project phase |
| **speckit-baseline** | Derive a specification from existing code | Reverse-engineer requirements from the codebase |
| **speckit-clarify** | Resolve ambiguities in the specification | Optional; when requirements need refinement |
| **speckit-plan** | Produce the implementation strategy | After a specification is finalized |
| **speckit-tasks** | Generate ordered work items from the plan | Create actionable task breakdown |
| **speckit-analyze** | Check consistency across spec, plan, and tasks | Optional; before implementing to catch gaps |
| **speckit-converge** | Compare implementation with spec/plan/tasks | After implementation; identify remaining work |
| **speckit-implement** | Execute the tasks and build the feature | Actual implementation phase |
| **speckit-checklist** | Quality checks for requirements | Validate that requirements are complete |
| **speckit-taskstoissues** | Convert tasks to GitHub issues | Bulk-create issues from a tasks.md file |
| **claude-command-converter** | Convert between Claude and other CLI formats | Utility for multi-tool workflows |

## Key Files Created

- `docs/speckit-skills-guide.md` — This guide
- `skills-lock.json` — Tracks versions and hashes of all 16 installed skills

## Project Context

This is an **Angular 6 contact manager** — a single-page web application with:
- Zero backend server
- External dependency on JSONPlaceholder API
- In-memory shopping cart
- No database, authentication, or payment processing

See [docs/inventory.md](./inventory.md) for complete system enumeration.

## Example Workflow

### Phase 1: Understand the current system
```
You: "Use speckit-baseline to reverse-engineer the current contact manager requirements"
→ Agent generates a specification based on the actual code
```

### Phase 2: Plan improvements
```
You: "Use speckit-specify to capture requirements for adding contact categories"
→ Agent captures what "categories" means, validation rules, storage, etc.

You: "Use speckit-plan to create an implementation strategy"
→ Agent produces architecture changes needed
```

### Phase 3: Execute
```
You: "Use speckit-tasks to generate work items"
→ Agent creates ordered tasks (e.g., "Add category field to Contact model", "Update the API client")

You: "Use speckit-implement to build the changes"
→ Agent implements the tasks systematically
```

## Skills Installation Details

- **Source repository**: [dceoy/speckit-agent-skills](https://github.com/dceoy/speckit-agent-skills)
- **Location**: `.agents/skills/`
- **Tracking**: `skills-lock.json` (one entry per skill with SHA256 hash)
- **Total skills installed**: 16 (4 technical-writer + 12 spec-kit)

## Further Reading

- [Spec Kit Repository](https://github.com/github/spec-kit)
- [speckit-agent-skills README](https://github.com/dceoy/speckit-agent-skills)
- [Contact Manager Repository Overview](./architecture/repository-overview.md)
- [System Inventory](./inventory.md)
