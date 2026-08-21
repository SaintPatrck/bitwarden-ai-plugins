# Bitwarden Architecture Tools Plugin

Architectural judgment for Bitwarden changes.

## Overview

This plugin is the home for deciding **how** a change should be built so it stays coherent with Bitwarden's holistic architecture. It is deliberately separate from the mechanics of landing a change and from the process of moving an initiative through the funnel, because those are different subjects with different owners.

## Skills

| Skill                    | What It Does                                                                                                                                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `architecting-solutions` | Designs a solution at the team level while holding the wider architecture in view: security mindset, Bitwarden-specific constraints such as multi-client support and zero knowledge, and when to bring the architecture group in. |

## Cross-Plugin Integration

| Plugin                     | How It's Used                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bitwarden-security-tools` | **Required** — `bitwarden-security-context` supplies the security principles and data classification that architectural choices are graded against. |

## Consumers

`bitwarden-initiative-tools` and `bitwarden-breakdown-tools` both depend on this plugin, since architectural assessments, proofs of concept, and breakdown plans all need the same judgment.
