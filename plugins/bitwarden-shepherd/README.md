# Bitwarden Shepherd Plugin

## Overview

Shepherd bundle for a Bitwarden technical strategy champion. This plugin holds no skills or agent of its own — it composes the capability plugins a shepherd needs to carry a thesis from a Technical Strategy Idea through Architecture's evaluation and across the Software Initiative Funnel: `championing-a-strategy-idea`, `shepherding-an-initiative`, `running-an-architectural-assessment`, `running-a-proof-of-concept`, `scoping-and-handing-off-to-teams`, `coordinating-implementation-across-teams`, and `curating-the-strategy-ideas-backlog` from `bitwarden-initiative-tools`, plus team-scope architectural judgment from `bitwarden-architecture-tools`.

This plugin is the symmetric counterpart to `bitwarden-tech-lead`. Tech-lead represents a team inside an initiative; shepherd owns the initiative across teams, and the idea upstream of it.

## Cross-Plugin Integration

| Plugin                         | How It's Used                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bitwarden-initiative-tools`   | `championing-a-strategy-idea` for the pre-funnel Primary-Owner arc, `shepherding-an-initiative` for the five-phase umbrella (dispatching to `running-an-architectural-assessment`, `running-a-proof-of-concept`, `scoping-and-handing-off-to-teams`, `coordinating-implementation-across-teams`), and `curating-the-strategy-ideas-backlog` for the Peer-Reviewer and portfolio-curator side |
| `bitwarden-architecture-tools` | Team-scope architectural judgment when an initiative lands inside a single team's codebase                                                                                                                                                                                                                                                                                                   |

## Related Plugins

- **`bitwarden-tech-lead`** — the team-side counterpart of this role. Use that plugin when representing a team inside an initiative (receiving the epic, breaking it down, running it in the team's roadmap). Use this plugin when owning the initiative across teams.

## Installation

```bash
/plugin install bitwarden-shepherd@bitwarden-marketplace
```

## Usage

```
I think Bitwarden should standardize observability instrumentation across services. I want to take this on. Walk me through the championing arc — how do I file, who do I pair with, what does the Stakeholder & Engagement Map need to look like before this can go to Research?
```

```
I just got assigned to shepherd ARCH-123. Walk me through Phase 1 — what do I produce, and what do I avoid pre-scoping?
```

```
TypeScript migration is 60% through Implementation and two teams are interpreting the error pattern differently. How do I surface this without taking over their code review?
```

## References

- [Software Initiative Funnel](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/584515614)
- [Work Transition Playbook](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/2521038855)
- [Architecture / Engineering Operating Model](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/1286963201)
- [Technical Strategy Ideas](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/2344517656)
- [Idea-Based Initiatives](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/2785181779)
- [Architecture Council](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/751698031)
- [Bitwarden ADR Template](https://contributing.bitwarden.com/architecture/adr/)
- [Bitwarden Contributing Guidelines](https://contributing.bitwarden.com/contributing/)
