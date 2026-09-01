# Changelog

All notable changes to the `bitwarden-initiative-tools` plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.2] - 2026-09-01

### Changed

- Updated the `claude-config-validator` reference in `running-a-proof-of-concept/SKILL.md` to its
  new name, `bitwarden-claude-config-tools`.

## [2.2.1] - 2026-09-01

### Fixed

- Stale `bitwarden-delivery-tools` and `bitwarden-tech-lead` plugin qualifiers across `championing-a-strategy-idea`, `curating-the-strategy-ideas-backlog`, `contributing-to-technical-strategy`, `shepherding-an-initiative`, `scoping-and-handing-off-to-teams`, `coordinating-implementation-across-teams`, `running-an-architectural-assessment`, and `running-a-proof-of-concept`: same-plugin references to `contributing-to-technical-strategy`, `navigating-the-initiative-funnel`, and `running-work-transitions` dropped their now-unnecessary qualifier, and cross-plugin references to `architecting-solutions` now point at `bitwarden-architecture-tools`.

## [2.2.0] - 2026-09-01

### Added

- `shepherding-an-initiative`'s small-scope-initiative section gains a note carried forward from the now-deleted `shepherd` agent: when a team-scope tech lead asks the shepherd to make a purely team-internal call, the shepherd pushes it back to them, since the shepherd's authority sits at the initiative and strategy scale, not below it.

## [2.1.0] - 2026-09-01

### Added

- `navigating-the-initiative-funnel` and `coordinating-implementation-across-teams` each gain a short note carried forward from the now-deleted `tech-lead` agent: workflows orchestrate a tech lead's participation rather than the reverse, and cross-team coordination during an initiative belongs to the shepherd, not a participating team's own tech lead.

## [2.0.0] - 2026-09-01

### Added

- Initial release of this plugin. `navigating-the-initiative-funnel` and `running-work-transitions` moved in from `bitwarden-delivery-tools`.
