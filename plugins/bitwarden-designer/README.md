# Bitwarden Designer Bundle

The plugin set for a Bitwarden designer.

## Overview

This is a **role bundle**: a dependency manifest with no skills, agents, or commands of its own. Installing it pulls in the capability plugins below, which is where the skills actually live. That keeps every skill in exactly one home while still letting you install one thing and get a working set.

It covers brand and content, Figma reads, Design System governance, critique, and the handoff to engineering.

## What you get

| Capability plugin                                      | Skills                                                                                                                                                                                                                  |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`bitwarden-design-tools`](../bitwarden-design-tools/) | `applying-bitwarden-branding`, `content-style-guide`, `design-review`, `evolving-design-system-components`, `facilitating-design-critique`, `navigating-design-jira-process`, `preparing-design-handoff`, `using-figma` |

Installing this bundle enables 1 plugins and 8 skills.

## What you do not get

No engineering plugins resolve into this bundle. A designer gets no commit conventions, no pull request mechanics, and no architecture skills.
