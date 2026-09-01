# Bitwarden Software Engineer Plugin

## Overview

Software engineer bundle for a Bitwarden product team. This plugin holds no skills or agent of its own — it composes the capability plugins a software engineer needs day to day: implementing stories, tasks, and bugs from `bitwarden-code-contribution-tools`, and code review from `bitwarden-code-review-tools`.

## Cross-Plugin Integration

| Plugin                              | How It's Used                                                                                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bitwarden-code-contribution-tools` | `implementor` agent, plus `committing-changes`, `creating-pull-request`, `perform-preflight`, `labeling-changes`, `addressing-code-review-comments` |
| `bitwarden-code-review-tools`       | `bitwarden-code-reviewer` agent and the code review skills, for reviewing teammates' PRs                                                            |

## Related Plugins

- **`bitwarden-qa-engineer`** — the QA counterpart that collaborates with engineering on testing questions.

## Installation

```bash
/plugin install bitwarden-software-engineer@bitwarden-marketplace
```

## Usage

```
Implement Jira story PM-12345 using bitwarden-software-engineer.
```

```
Review PR #12345 with bitwarden-software-engineer.
```

## References

- [Bitwarden Contributing Guidelines](https://contributing.bitwarden.com/contributing/)
