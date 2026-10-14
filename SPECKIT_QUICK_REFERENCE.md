# Spec Kit Quick Reference

## What You Just Installed

**12 Spec-Driven Development skills** + **4 Technical Writing skills** = **16 total tools**

These enable systematic, AI-assisted specification → planning → implementation workflows.

## The Workflow (Copy & Paste Ready)

### Step 1: Understand Current System
```
"Use speckit-baseline to derive a specification from the contact-manager code"
```
**Output**: `specification.md` — what the current system actually does

### Step 2: Plan Improvements
```
"Use speckit-specify to create requirements for [FEATURE]"
Example: "Use speckit-specify to create requirements for adding contact categories"
```
**Output**: `requirements.md` — what you want to build

### Step 3: Resolve Ambiguities (Optional)
```
"Use speckit-clarify to resolve ambiguities in the requirements"
```
**Output**: Clearer requirements

### Step 4: Create Strategy
```
"Use speckit-plan to create an implementation strategy for the requirements"
```
**Output**: `plan.md` — how you'll build it

### Step 5: Break Into Tasks
```
"Use speckit-tasks to generate implementation tasks from the plan"
```
**Output**: `tasks.md` — ordered, actionable work items

### Step 6: Check for Consistency (Optional)
```
"Use speckit-analyze to check consistency across specification, plan, and tasks"
```
**Output**: Gaps and inconsistencies identified

### Step 7: Implement
```
"Use speckit-implement to implement the tasks systematically"
```
**Output**: Code changes following the task breakdown

### Step 8: Convert to GitHub Issues
```
"Use speckit-taskstoissues to convert tasks.md to GitHub issues"
```
**Output**: GitHub issues created from tasks

### Step 9: Verify Completeness (Optional)
```
"Use speckit-converge to compare the implementation with the spec/plan/tasks"
```
**Output**: List of remaining work

## All 16 Skills at a Glance

### Spec Kit Framework (12 skills)
| Skill | Use for |
|-------|---------|
| `speckit-constitution` | Define project principles and values |
| `speckit-specify` | Capture new requirements |
| `speckit-baseline` | Reverse-engineer requirements from code |
| `speckit-clarify` | Resolve ambiguities (optional) |
| `speckit-plan` | Create implementation strategy |
| `speckit-tasks` | Generate work breakdown |
| `speckit-analyze` | Check consistency (optional) |
| `speckit-converge` | Verify completeness (optional) |
| `speckit-implement` | Execute the tasks |
| `speckit-checklist` | Quality-check requirements |
| `speckit-taskstoissues` | Convert tasks to GitHub issues |
| `claude-command-converter` | CLI utility |

### Technical Writing (4 skills)
| Skill | Use for |
|-------|---------|
| `diagramming-processes` | Create workflow and system diagrams |
| `documenting-contracts` | Document API contracts and payloads |
| `documenting-legacy-codebases` | Reverse-engineer documentation |
| `technical-writing` | Polish and review all documentation |

## Contact Manager Context

### System Quick Facts
- **Type**: Angular 6 single-page application
- **Database**: None (in-memory storage only)
- **Backend**: None (calls JSONPlaceholder API)
- **Authentication**: Placeholder only
- **Purpose**: Contact and shopping cart demo

### What's Already Documented
✅ System inventory with counts (4 APIs, 0 databases, 11 packages, 0 jobs)  
✅ Architecture and component structure  
✅ Data model (contacts, products, cart)  
✅ API contracts  
✅ Integration points  
✅ Development commands  
✅ 9 known defects  
✅ 7 unanswered questions  

See `docs/README.md` for complete documentation index.

## Example: Add Contact Categories

### Command 1: Capture Requirements
```
"Use speckit-specify to create requirements for adding contact categories to the contact-manager. 
Categories should include personal, business, and family. 
Each contact can have multiple categories. 
Categories should persist in localStorage instead of memory."
```

### Command 2: Create Plan
```
"Use speckit-plan to create an implementation strategy"
```

### Command 3: Generate Tasks
```
"Use speckit-tasks to generate implementation tasks"
```

### Command 4: Convert to Issues
```
"Use speckit-taskstoissues to create GitHub issues from tasks.md"
```

### Command 5: Implement
```
"Use speckit-implement to implement the tasks step by step"
```

## Files to Know

| File | Purpose |
|------|---------|
| `.agents/skills/` | 16 installed skills |
| `skills-lock.json` | Version tracking (hash verification) |
| `docs/speckit-skills-guide.md` | Full Spec Kit guide |
| `SPECKIT_INSTALLATION.md` | Installation details |
| `README.md` | Updated with Spec Kit reference |
| `docs/inventory.md` | System counts (start here) |
| `docs/reviews/findings.md` | 9 known defects |

## Key Principles

1. **Specification-driven**: Write what you want before building
2. **Systematic**: Break work into ordered, checkable tasks
3. **Consistent**: Verify spec ↔ plan ↔ code alignment
4. **Traceable**: Convert specifications to GitHub issues
5. **Iterative**: Plans can be analyzed and refined before coding

## Tips

- **Start with baseline**: Use `speckit-baseline` first to confirm current state
- **Be specific**: Requirements are more useful if they include examples
- **Use checklists**: `speckit-checklist` validates requirement quality
- **Track issues**: Convert tasks to GitHub issues for team visibility
- **Iterate**: It's okay to run clarify/plan/analyze multiple times

## Next Steps

1. Read [docs/speckit-skills-guide.md](docs/speckit-skills-guide.md)
2. Try: `"Use speckit-baseline to reverse-engineer requirements from this code"`
3. Pick a feature to add
4. Follow the 9-step workflow above
5. Commit the generated specification and task files

---

**Installed from**: https://github.com/dceoy/speckit-agent-skills  
**Spec Kit docs**: https://github.com/github/spec-kit  
**This project docs**: [docs/README.md](docs/README.md)
