# Bitwarden Software Engineer Bundle

The plugin set for a Bitwarden software engineer.

## Overview

This is a **role bundle**: a dependency manifest with no skills, agents, or commands of its own. Installing it pulls in the capability plugins below, which is where the skills actually live. That keeps every skill in exactly one home while still letting you install one thing and get a working set.

It covers implementing assigned work, getting it committed and reviewed, and knowing what it is already tested by.

## What you get

| Capability plugin                                                  | Skills                                                                                                                                                                                         |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`bitwarden-contribution-tools`](../bitwarden-contribution-tools/) | `addressing-code-review-comments`, `committing-changes`, `creating-pull-request`, `force-multiplier`, `labeling-changes`, `perform-preflight`                                                  |
| [`bitwarden-code-review-tools`](../bitwarden-code-review-tools/)   | `avoiding-false-positives`, `classifying-review-findings`, `performing-multi-agent-code-review`, `posting-bitwarden-review-comments`, `posting-review-summary`, `reviewing-dependency-changes` |
| [`bitwarden-testing-tools`](../bitwarden-testing-tools/)           | `assessing-test-coverage`, `writing-manual-test-cases`                                                                                                                                         |

Pulled in transitively, because the plugins above depend on them:

- [`bitwarden-security-tools`](../bitwarden-security-tools/) — `analyzing-code-security`, `auditing-hackerone-vulns`, `bitwarden-security-context`, `detecting-secrets`, `perform-security-review`, `reviewing-dependencies`, `reviewing-security-architecture`, `threat-modeling`, `triaging-security-findings`

Installing this bundle enables 4 plugins and 23 skills.

## What you do not get

The project-level Tech Breakdown process is deliberately absent. Engineers decompose their own work at a finer grain than a Jira work item, with no review or archival obligation, and `bitwarden-breakdown-tools` targets the team-coordination artifact instead. Install it directly if you are authoring one.
