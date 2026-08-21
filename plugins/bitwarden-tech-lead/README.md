# Bitwarden Tech Lead Bundle

The plugin set for a Bitwarden tech lead.

## Overview

This is a **role bundle**: a dependency manifest with no skills, agents, or commands of its own. Installing it pulls in the capability plugins below, which is where the skills actually live. That keeps every skill in exactly one home while still letting you install one thing and get a working set.

It covers scoping and designing the team's work, running it through breakdown and the funnel, and holding the review bar.

## What you get

| Capability plugin                                                  | Skills                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`bitwarden-architecture-tools`](../bitwarden-architecture-tools/) | `architecting-solutions`                                                                                                                                                                                                                                                                                                                                     |
| [`bitwarden-initiative-tools`](../bitwarden-initiative-tools/)     | `championing-a-strategy-idea`, `contributing-to-technical-strategy`, `coordinating-implementation-across-teams`, `curating-the-strategy-ideas-backlog`, `navigating-the-initiative-funnel`, `running-a-proof-of-concept`, `running-an-architectural-assessment`, `running-work-transitions`, `scoping-and-handing-off-to-teams`, `shepherding-an-initiative` |
| [`bitwarden-contribution-tools`](../bitwarden-contribution-tools/) | `addressing-code-review-comments`, `committing-changes`, `creating-pull-request`, `force-multiplier`, `labeling-changes`, `perform-preflight`                                                                                                                                                                                                                |
| [`bitwarden-code-review-tools`](../bitwarden-code-review-tools/)   | `avoiding-false-positives`, `classifying-review-findings`, `performing-multi-agent-code-review`, `posting-bitwarden-review-comments`, `posting-review-summary`, `reviewing-dependency-changes`                                                                                                                                                               |
| [`bitwarden-breakdown-tools`](../bitwarden-breakdown-tools/)       | `complete-breakdown`, `decomposing-into-tasks`, `developing-breakdown-plan`, `developing-breakdown-spec`, `filing-breakdown-tasks`, `starting-breakdown`                                                                                                                                                                                                     |

Pulled in transitively, because the plugins above depend on them:

- [`bitwarden-security-tools`](../bitwarden-security-tools/) — `analyzing-code-security`, `auditing-hackerone-vulns`, `bitwarden-security-context`, `detecting-secrets`, `perform-security-review`, `reviewing-dependencies`, `reviewing-security-architecture`, `threat-modeling`, `triaging-security-findings`

Installing this bundle enables 6 plugins and 38 skills.

## What you do not get

A bundle is defined as much by what it leaves out. If you need something outside this set, install the capability plugin directly rather than widening the bundle; widening it changes what every person in this role receives.
