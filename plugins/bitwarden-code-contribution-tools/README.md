# Bitwarden Contribution Tools

Getting a change into a Bitwarden repository — commits, pull requests, change labeling, preflight quality gates, addressing review feedback, and applying one intent across a fleet of repos.

## Overview

Every skill here produces a commit or a pull request, whether for a single change or across a fleet of repositories at once.

These skills define process, not platform. A commit message format, a PR body shape, a quality gate, a labeling scheme. The platform specifics — which linter, which test runner, which build command — are discovered from each repository's `CLAUDE.md` at the time the skill runs. That separation is why these skills work across Clients, Server, SDK, Android, and iOS without a variant per repo.

## Agent

| Agent         | What It Does                                                                                                                                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `implementor` | Implements a Bitwarden engineering change end-to-end — orients in the codebase, builds incrementally, verifies before declaring done, and writes clear commits and PR summaries. See [`implementor.md`](./agents/implementor.md). |

## Skills

Listed in the order a change moves through them.

| Skill                             | Triggers                                         | Purpose                                                                                             |
| --------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `perform-preflight`               | "preflight", "self review"                       | Quality gate to run before staging: tests, lint, security, architecture.                            |
| `labeling-changes`                | "label", "change type"                           | Conventional commit type keywords and the `t:` CI label each one drives.                            |
| `committing-changes`              | "commit", "stage changes"                        | Default-branch check, commit message format, and staging best practices.                            |
| `creating-pull-request`           | "create PR", "open PR"                           | Title format, the repo's PR template, the AI review label, and a full submission preview.           |
| `addressing-code-review-comments` | "address review comments", "respond to feedback" | Evaluating reviewer feedback with technical rigor rather than implementing or agreeing reflexively. |
| `force-multiplier`                | "across all repos", "in bulk"                    | Fanning one intent across many repos or monorepo projects as isolated, piloted draft PRs.           |

## Related Plugins

Several skills in this plugin reference tools or skills provided by sibling plugins. Install these alongside `bitwarden-code-contribution-tools` for full functionality:

- **`bitwarden-code-review-tools`** — provides `/bitwarden-code-review-tools:code-review-local` and `Skill(bitwarden-code-review-tools:performing-multi-agent-code-review)`, the code-review gate `creating-pull-request` runs before opening a PR. If it is absent, `creating-pull-request` prompts you to install it rather than skip the review.
- **`bitwarden-security-tools`** — `force-multiplier` routes per-target work to the matching named agent, using its security agent when the change being fanned out is itself a security change.

## Installation

```bash
/plugin install bitwarden-code-contribution-tools@bitwarden-marketplace
```

## Usage

Skills activate based on natural-language triggers during your delivery workflow:

```
Run preflight before I commit
```

```
What change type should I use for this PR?
```

```
Commit these changes
```

```
Create a PR for this branch
```

```
Help me work through the review comments on this PR
```

```
Add the new lint rule across every client repo
```
