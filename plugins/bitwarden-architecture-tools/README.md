# Bitwarden Architecture Tools

Architectural judgment for Bitwarden changes.

## Overview

This plugin is the home for deciding **how** a change should be built so it stays coherent with Bitwarden's holistic architecture. It is deliberately separate from the mechanics of landing a change and from the process of moving an initiative through the funnel, because those are different subjects with different owners.

## Skills

| Skill                    | Triggers                                                                                          | Purpose                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `architecting-solutions` | "plan the solution", "assess blast radius", "evaluate trade-offs", "should Architecture weigh in" | Architectural judgment framework: security mindset, blast radius, Bitwarden-specific constraints, and the signals that warrant pulling in the Architecture group. |

## Related Plugins

- **`bitwarden-security-tools`** — provides `Skill(bitwarden-security-tools:bitwarden-security-context)`, referenced from `architecting-solutions` for the security principles and data classification that architectural choices are graded against.

## Installation

```bash
/plugin install bitwarden-architecture-tools@bitwarden-marketplace
```

## Usage

```
Plan the solution for this change — what are the trade-offs?
```

```
Should Architecture weigh in on this decision?
```
