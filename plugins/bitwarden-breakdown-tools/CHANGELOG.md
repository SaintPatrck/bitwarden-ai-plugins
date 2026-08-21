# Changelog

All notable changes to this plugin will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-21

### Added

- The Bitwarden Tech Breakdown lifecycle, brought back into the marketplace from repo-local `.claude/` config in `bitwarden/tech-breakdowns`: `starting-breakdown`, `developing-breakdown-spec`, `developing-breakdown-plan`, `decomposing-into-tasks`, `filing-breakdown-tasks`, and `complete-breakdown`, plus the breakdown and tasks templates and the shared writing-quality reference. Repo-relative paths were rewritten to `${CLAUDE_PLUGIN_ROOT}` so the skills work from any checkout.
