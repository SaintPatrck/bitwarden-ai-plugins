# Bitwarden Product Analyst Bundle

The plugin set for a Bitwarden product analyst.

## Overview

This is a **role bundle**: a dependency manifest with no skills, agents, or commands of its own. Installing it pulls in the capability plugins below, which is where the skills actually live. That keeps every skill in exactly one home while still letting you install one thing and get a working set.

It covers eliciting unambiguous requirements, breaking work down, and writing the release notes users actually read.

## What you get

| Capability plugin                                        | Skills                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------- |
| [`bitwarden-product-tools`](../bitwarden-product-tools/) | `requirements-elicitation`, `work-breakdown`, `writing-release-notes` |

Installing this bundle enables 1 plugin and 3 skills.

## What you do not get

A bundle is defined as much by what it leaves out. If you need something outside this set, install the capability plugin directly rather than widening the bundle; widening it changes what every person in this role receives.
