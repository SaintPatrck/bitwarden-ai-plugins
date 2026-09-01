# Bitwarden Security Engineer Plugin

## Overview

Security engineer bundle for a Bitwarden product team. This plugin holds no skills or agent of its own — it composes the capability plugins a security engineer needs day to day: vulnerability triage, threat modeling, and secure code analysis from `bitwarden-security-tools`, and reviewing PRs for security issues from `bitwarden-code-review-tools`.

## Cross-Plugin Integration

| Plugin                        | How It's Used                                                                                                                                                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bitwarden-security-tools`    | `triaging-security-findings`, `threat-modeling`, `analyzing-code-security`, `reviewing-dependencies`, `detecting-secrets`, `reviewing-security-architecture`, `perform-security-review`, `auditing-hackerone-vulns`, and `bitwarden-security-context` |
| `bitwarden-code-review-tools` | `bitwarden-code-reviewer` agent and the code review skills, for reviewing teammates' PRs                                                                                                                                                              |

## Installation

```bash
/plugin install bitwarden-security-engineer@bitwarden-marketplace
```

## Usage

```
Triage the open Checkmarx findings on this PR.
```

```
Create a threat model for the new Send feature.
```

```
Review this code for OWASP Top 10 vulnerabilities.
```

## References

- [Bitwarden Contributing Guidelines](https://contributing.bitwarden.com/contributing/)
