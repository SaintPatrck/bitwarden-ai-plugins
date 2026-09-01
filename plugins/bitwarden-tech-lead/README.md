# Bitwarden Tech Lead Plugin

## Overview

Tech lead bundle for a Bitwarden product team. This plugin holds no skills or agent of its own — it composes the capability plugins a tech lead needs day to day: team-scope architectural judgment from `bitwarden-architecture-tools`, initiative-funnel participation and work transitions from `bitwarden-initiative-tools`, implementing and landing changes from `bitwarden-code-contribution-tools`, and reviewing teammates' PRs from `bitwarden-code-review-tools`.

## Cross-Plugin Integration

| Plugin                              | How It's Used                                                                                                                                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bitwarden-architecture-tools`      | `architecting-solutions` for team-level architectural judgment that stays coherent with the holistic architecture                                                                                                |
| `bitwarden-initiative-tools`        | `navigating-the-initiative-funnel` for funnel phase mechanics, `running-work-transitions` for ownership transitions either side, `contributing-to-technical-strategy` for surfacing team-level patterns upstream |
| `bitwarden-code-contribution-tools` | `implementor` agent, plus `committing-changes`, `creating-pull-request`, `perform-preflight`, `labeling-changes`, `addressing-code-review-comments`                                                              |
| `bitwarden-code-review-tools`       | `bitwarden-code-reviewer` agent and the code review skills, for reviewing teammates' PRs                                                                                                                         |

## Related Plugins

- **`bitwarden-shepherd`** — the shepherd-side counterpart of this role. Use that plugin when operating as a Staff+ initiative shepherd driving a cross-cutting initiative end-to-end through the Software Initiative Funnel. Use this plugin (tech-lead) when representing a single team inside an initiative — receiving the epic, breaking it down, executing inside the team's roadmap.

## Installation

```bash
/plugin install bitwarden-tech-lead@bitwarden-marketplace
```

## Usage

```
Plan the implementation for PM-12345 within our team.
```

```
We're receiving a framework transition from the Platform team. Help me prepare.
```

```
Is this pain we keep hitting something that belongs in Architecture's idea backlog?
```

## References

- [Software Initiative Funnel](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/584515614)
- [Work Transition Playbook](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/2521038855)
- [Architecture / Engineering Operating Model](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/1286963201)
- [Technical Strategy Ideas](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/2344517656)
- [Idea-Based Initiatives](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/2785181779)
- [Bitwarden Contributing Guidelines](https://contributing.bitwarden.com/contributing/)
