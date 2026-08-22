# Bitwarden Contribution Tools

Getting a change into a Bitwarden repository: commits, pull requests, change labeling, preflight quality gates, addressing review feedback, and applying one intent across a fleet of repos.

## Overview

Every skill here produces a commit or a pull request, whether for a single change or across a fleet of repositories at once.

These skills define process, not platform. A commit message format, a PR body shape, a quality gate, a labeling scheme. The platform specifics — which linter, which test runner, which build command — are discovered from each repository's `CLAUDE.md` at the time the skill runs. That separation is why these skills work across Clients, Server, SDK, Android, and iOS without a variant per repo.

## Skills

Listed in the order a change moves through them.

| Skill                             | Triggers                                         | Purpose                                                                                             |
| --------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `perform-preflight`               | "preflight", "self review"                       | Quality gate to run before staging: tests, lint, security, architecture.                            |
| `labeling-changes`                | "label", "change type"                           | Conventional commit type keywords and the `t:` CI label each one drives.                            |
| `committing-changes`              | "commit", "stage changes"                        | Default-branch check, commit message format, and what a followup commit may omit.                   |
| `creating-pull-request`           | "create PR", "open PR"                           | Title format, the repo's PR template, the AI review label, and a full submission preview.           |
| `addressing-code-review-comments` | "address review comments", "respond to feedback" | Evaluating reviewer feedback with technical rigor rather than implementing or agreeing reflexively. |
| `force-multiplier`                | "across all repos", "in bulk"                    | Fanning one intent across many repos or monorepo projects as isolated, piloted draft PRs.           |

## Agent

`bitwarden-software-engineer` composes these skills as a product-team engineer implementing assigned work. It is a convenience, not a gate: every skill above works when invoked directly.

## Cross-Plugin Integration

| Plugin                        | How It's Used                                                                                                                                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `bitwarden-code-review-tools` | `creating-pull-request` runs a local code review as a gate before opening a PR, via `/bitwarden-code-review-tools:code-review-local` or the multi-agent review. If absent it prompts you to install rather than skipping the review. |
| `bitwarden-security-tools`    | `force-multiplier` routes per-target work to a matching named agent, using `bitwarden-security-engineer` when the change being fanned out is itself a security change.                                                               |

Both are soft: the skills prompt for what is missing rather than failing silently.

## Where to find related work

- Architectural judgment: [`bitwarden-architecture-tools`](../bitwarden-architecture-tools/)
- The Software Initiative Funnel and work transitions: [`bitwarden-initiative-tools`](../bitwarden-initiative-tools/)
- Tech Breakdowns, including turning a `tasks.md` into Jira tickets: [`bitwarden-breakdown-tools`](../bitwarden-breakdown-tools/)
- Reviewing a pull request: [`bitwarden-code-review-tools`](../bitwarden-code-review-tools/)

## Installation

```bash
/plugin install bitwarden-contribution-tools@bitwarden-marketplace
```

Formerly published as `bitwarden-delivery-tools`. Existing installs migrate automatically through the marketplace's `renames` map.

## Usage

Skills activate on natural language during normal work:

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
