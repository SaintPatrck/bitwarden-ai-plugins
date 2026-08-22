# Bitwarden Breakdown Tools Plugin

The project-level Bitwarden Tech Breakdown process, end to end.

## Overview

A Tech Breakdown is how a team turns a committed piece of work into a specification, a plan, and a set of Jira work items. This plugin ships the whole lifecycle as six skills that hand off to each other in order.

Breakdown artifacts live in [`bitwarden/tech-breakdowns`](https://github.com/bitwarden/tech-breakdowns), one folder per breakdown under its team directory. These skills run from inside that working copy, which is where they write and where they resolve the templates from.

## Scope

This plugin targets breakdowns that **coordinate a team's committed work** — the artifact a tech lead produces so several engineers, QA, and dependent teams can act from one plan. Its outputs are a reviewed `breakdown.md`, a `tasks.md` whose entries become real Jira tickets, and an archived folder.

It is **not** for an engineer's own finer-grained personal task tracking. Engineers routinely decompose their assigned work further for themselves, at a grain below a Jira work item and with no review or archival obligation. That is a different activity with different outputs, and pointing it at this process would impose specification gates, an approval loop, and a repo-committed artifact on work that needs none of them. That is why the `bitwarden-software-engineer` bundle does not depend on this plugin.

## Skills

They run in order, and each hands off to the next when it completes.

| Skill                       | What It Does                                                                                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `starting-breakdown`        | Creates the per-breakdown folder `<team>/<JIRA-KEY>-<slug>/` and seeds `breakdown.md` from the template, validating the team, slug, and Jira key before any shell command touches them.           |
| `developing-breakdown-spec` | Resolves open design questions with the engineer, then writes the Specification section one subsection at a time, never landing text that has not been approved in chat first.                    |
| `developing-breakdown-plan` | Develops the Plan across eight activities: technical architecture, impact by area, deployment, security surface, the Architecture involvement rubric, cross-team collisions, testing, fresh eyes. |
| `decomposing-into-tasks`    | Turns the Plan into a sibling `tasks.md`, one entry per future Jira work item, each with acceptance criteria and mapped `Blocked by` / `Depends on` links.                                        |
| `filing-breakdown-tasks`    | Turns those entries into an epic parent plus one child story or task each, as tickets that stand on their own, then hands off to file them.                                                       |
| `complete-breakdown`        | Verifies the status and `git mv`s the finished folder into `<team>/complete/`, reporting the sibling files it carried along.                                                                      |

`complete-breakdown` is invoked explicitly when the work is finished, not automatically at the end of decomposition.

## Cross-Plugin Integration

| Plugin                         | How It's Used                                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bitwarden-architecture-tools` | **Required** — `architecting-solutions` backs the technical-architecture activity of the Plan.                                                                      |
| `bitwarden-security-tools`     | **Required** — `bitwarden-security-context` and `threat-modeling` back the security surface activity. If either is unavailable the Plan stops rather than guessing. |
| `bitwarden-contribution-tools` | **Required** — `creating-pull-request` opens the optional prototype draft PR. Falls back to `gh pr create --draft` if unavailable.                                  |
| `bitwarden-atlassian-tools`    | **Recommended** — supplies the Jira and Confluence reads that ground the Specification, and the write tools that `filing-breakdown-tasks` hands off to.             |

## Shared References

`references/writing-quality.md` ships with this plugin and holds twenty named prose rules applied while drafting the Specification, Plan, and task entries, and again as a review pass.

The templates do not ship here. `templates/breakdown.md` and `templates/tasks.md` stay canonical in `bitwarden/tech-breakdowns`, resolved from the working copy at run time and never edited in place. They are human document templates: an engineer can copy and fill one in with no plugin installed, and they are owned by the same group that owns the breakdown folders they seed. Keeping them there means a template edit is one pull request in that repository rather than a plugin release.

Skills therefore read the template's structure rather than asserting it, so adding or rewording a subsection needs no change here.
