# Bitwarden Security Engineer Bundle

The plugin set for a Bitwarden security engineer.

## Overview

This is a **role bundle**: a dependency manifest with no skills, agents, or commands of its own. Installing it pulls in the capability plugins below, which is where the skills actually live. That keeps every skill in exactly one home while still letting you install one thing and get a working set.

It covers modeling threats, analyzing code and architecture for weaknesses, triaging findings, and carrying that lens into pull request review.

## What you get

| Capability plugin                                                | Skills                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`bitwarden-security-tools`](../bitwarden-security-tools/)       | `analyzing-code-security`, `auditing-hackerone-vulns`, `bitwarden-security-context`, `detecting-secrets`, `perform-security-review`, `reviewing-dependencies`, `reviewing-security-architecture`, `threat-modeling`, `triaging-security-findings` |
| [`bitwarden-code-review-tools`](../bitwarden-code-review-tools/) | `avoiding-false-positives`, `classifying-review-findings`, `performing-multi-agent-code-review`, `posting-bitwarden-review-comments`, `posting-review-summary`, `reviewing-dependency-changes`                                                    |

Installing this bundle enables 2 plugins and 15 skills.

## What you do not get

A bundle is defined as much by what it leaves out. If you need something outside this set, install the capability plugin directly rather than widening the bundle; widening it changes what every person in this role receives.
