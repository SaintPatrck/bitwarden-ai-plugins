# Bitwarden Security Engineer Plugin

## Overview

Security engineer bundle for a Bitwarden product team. This plugin holds no skills or agent of its own. Installing it gets a security engineer vulnerability triage, threat modeling, and secure code analysis (`bitwarden-security-tools`), plus reviewing PRs for security issues (`bitwarden-code-review-tools`), in one step, instead of installing each capability plugin separately — both work standalone too, so this bundle is a convenience and a governance handle, not a requirement.

## Cross-Plugin Integration

| Plugin                        | How It's Used                                                                                                                                                                                                                                                                                                                       |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bitwarden-security-tools`    | `bitwarden-security-assessor` agent, plus `triaging-security-findings`, `threat-modeling`, `analyzing-code-security`, `reviewing-dependencies`, `detecting-secrets`, `reviewing-security-architecture`, `perform-security-review`, `auditing-hackerone-vulns`, `auditing-external-claude-plugins`, and `bitwarden-security-context` |
| `bitwarden-code-review-tools` | `bitwarden-code-reviewer` agent and the code review skills, for reviewing teammates' PRs                                                                                                                                                                                                                                            |

## Installation

```bash
/plugin install bitwarden-security-engineer@bitwarden-marketplace
```

## Usage

```
Triage the open Aikido findings on this PR using bitwarden-security-assessor.
```

```
Create a threat model for the new Send feature using bitwarden-security-assessor.
```

```
Review this code for OWASP Top 10 vulnerabilities using bitwarden-security-assessor.
```

## References

- [Bitwarden Contributing Guidelines](https://contributing.bitwarden.com/contributing/)
