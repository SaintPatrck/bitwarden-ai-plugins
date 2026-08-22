# Changelog

All notable changes to this plugin will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-08-21

### Changed

- The breakdown and tasks templates are no longer bundled here. They stay canonical in `bitwarden/tech-breakdowns` and are resolved from the working copy at run time. They are human document templates, usable by an engineer with no plugin installed and owned by the group that owns the breakdown folders they seed, so a template edit stays one pull request in that repository instead of becoming a plugin release.
- Skills read the template's structure instead of asserting it. Hardcoded subsection counts and name lists are gone, so adding or rewording a template subsection needs no change here.
- `starting-breakdown` resolves the template by globbing the working copy and narrows its shell grant back to `Bash(cp templates/breakdown.md:*)`. No skill gained a tool grant.

## [1.0.0] - 2026-08-21

### Added

- The Bitwarden Tech Breakdown lifecycle, brought back into the marketplace from repo-local `.claude/` config in `bitwarden/tech-breakdowns`: `starting-breakdown`, `developing-breakdown-spec`, `developing-breakdown-plan`, `decomposing-into-tasks`, `filing-breakdown-tasks`, and `complete-breakdown`, plus the breakdown and tasks templates and the shared writing-quality reference. Repo-relative paths were rewritten to `${CLAUDE_PLUGIN_ROOT}` so the skills work from any checkout.
