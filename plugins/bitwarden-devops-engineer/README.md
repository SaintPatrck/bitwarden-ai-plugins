# Bitwarden DevOps Engineer Bundle

The plugin set for a Bitwarden devops engineer.

## Overview

This is a **role bundle**: a dependency manifest with no skills, agents, or commands of its own. Installing it pulls in the capability plugins below, which is where the skills actually live. That keeps every skill in exactly one home while still letting you install one thing and get a working set.

It covers keeping GitHub Actions workflows compliant across the org and landing remediation as reviewable pull requests.

## What you get

| Capability plugin                                                  | Skills                                                                                                                                        |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [`bitwarden-actions-tools`](../bitwarden-actions-tools/)           | `action-audit`, `action-remediate`, `auditing-workflow-conventions`, `bitwarden-workflow-linter-rules`, `workflow-audit`, `workflow-fix`      |
| [`bitwarden-contribution-tools`](../bitwarden-contribution-tools/) | `addressing-code-review-comments`, `committing-changes`, `creating-pull-request`, `force-multiplier`, `labeling-changes`, `perform-preflight` |

Installing this bundle enables 2 plugins and 12 skills.

## What you do not get

A bundle is defined as much by what it leaves out. If you need something outside this set, install the capability plugin directly rather than widening the bundle; widening it changes what every person in this role receives.
