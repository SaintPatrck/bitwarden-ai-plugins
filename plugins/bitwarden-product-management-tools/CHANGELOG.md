# Changelog

All notable changes to the `bitwarden-product-management-tools` plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-09-02

### Fixed

- `writing-requirements-documents` stated both a hard-abort framing ("immediately use", "do not ask the user to paste content") and a soft "when installed" framing for the same two plugins (`bitwarden-atlassian-tools`, `bitwarden-security-tools`) in the same file. Neither plugin is a declared dependency and both already degrade gracefully per the Cross-Plugin Integration section, so the hard-sounding instructions are now consistently conditional on the plugin being installed.

## [1.0.1] - 2026-09-02

### Changed

- Renamed from `bitwarden-product-tools`. The README H1 and this changelog's header still named the old plugin.

## [1.0.0] - 2026-09-01

### Added

- `writing-requirements-documents` skill — multi-source gathering (Confluence/Jira/GitHub/web/local-file fetch) and document assembly against the requirements template, ported from the now-eliminated `product-analyst` agent in `bitwarden-product-analyst`. Dispatches `requirements-elicitation` internally for extraction.

### Removed

- **BREAKING:** `work-breakdown` skill, retired outright. Superseded by `decomposing-into-tasks` in the [`bitwarden/tech-breakdowns`](https://github.com/bitwarden/tech-breakdowns) repository, which already does the identical job. Not moved anywhere in this marketplace.

### Changed

- `requirements-elicitation`: removed its stale forward pointer to `work-breakdown` from the description.

## [0.3.0] - 2026-09-01

### Added

- Initial release of this plugin. All 3 skills moved in from `bitwarden-product-analyst`, which continues to exist as a dependency-only bundle.

## [0.1.6] - 2026-08-04

### Added

- `writing-release-notes` skill for producing user-facing release notes from a Jira release tag and the weekly #release Slack thread. Filters to user-visible changes, gates items against feature flag enablement, and for server releases surfaces flag removals in user-facing benefit-forward language (targeting self-hosted users receiving the feature for the first time).

## [0.1.5] - 2026-04-03

### Changed

- Update Atlassian integration references from `Skill(atlassian-reader)` to `Skill(researching-jira-issues)` and direct MCP tools following the consolidation of `atlassian-reader` into `bitwarden-atlassian-tools`

## [0.1.4] - 2026-03-12

### Changed

- Remove redundant `skills` field from `plugin.json`; skills are auto-discovered from the `skills/` directory

## [0.1.3] - 2026-03-12

### Changed

- Remove duplicated section list from agent; agent now reads `references/requirements-template.md` directly at the Documentation Phase

## [0.1.2] - 2026-03-12

### Fixed

- Corrected agent path in `plugin.json` from `./agents/product-analyst/AGENT.md` to `./agents/product-analyst.md` so the plugin can discover its agent
- Fixed malformed code fence in `references/requirements-template.md` where the outer `````markdown` block closed prematurely after section 9, leaving sections 10–15 outside the template block

## [0.1.1] - 2026-03-10

### Changed

- Add local files and directories as a first-class spec source (Read, Glob, Grep)
- Add generic web URLs as a spec source (WebFetch)
- Save generated specs to the current working directory instead of the plugin's specs/ folder

## [0.1.0] - 2026-03-04

### Added

- Initial release of Bitwarden Product Analyst plugin
- Product analyst agent for creating comprehensive Bitwarden requirements documents
- `requirements-elicitation` skill for extracting and organizing requirements
- `work-breakdown` skill for decomposing features into implementable tasks
- Requirements document template following Bitwarden standards
- Integration with Bitwarden security vocabulary and principles (P01-P06)
- Support for analyzing multiple sources (GitHub issues, technical docs, user requests)
- Structured requirements output with security considerations
