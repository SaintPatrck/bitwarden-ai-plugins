# Contributing to Bitwarden AI Plugins

Every engineer who has solved a recurring problem, documented a pattern, or automated a workflow has something worth sharing. This marketplace is where those ideas become plugins that the whole team can use. This guide helps you figure out where your work fits, then walks through the mechanics of building and submitting it.

For general Bitwarden contribution practices, see our [Contributing Guidelines](https://contributing.bitwarden.com/contributing/).

## Where Does Your Claude Tooling Belong?

Plugins in this marketplace are organized in two layers: capability plugins and role bundles. Repo-specific patterns — those unusable outside that repo's own codebase — belong closer to the code, in that repo's `.claude/` directory. If your work is cross-repo, read on to find which layer it belongs to. If you're still unsure after reading, raise a draft PR and maintainers will help find the right home.

### Capability Plugins

A capability plugin holds skills and agents. Every skill has exactly one home. It's named for what its skills act on — an artifact, a practice, or an integration surface — never for a job title, a seniority level, or a lifecycle phase.

Placement ranges only over capability plugins: a skill serving three roles still lives once, in a single capability plugin, and simply appears in three bundles.

Examples: `bitwarden-security-tools`, `bitwarden-atlassian-tools`

### Role Bundles

A role bundle holds nothing but a name, a description, and dependencies — no skills, no agents, no commands. A bundle directory contains only its manifest, README, and CHANGELOG. CI enforces this: a bundle directory carrying a skill, an agent, or a command fails the build. A bundle is what a person installs, and it's named for the role.

Bundles are additive, not a placement requirement — the capability layer already answers "which plugin does this skill go in" on its own. A bundle buys discoverability (install one entry instead of reading the catalog) and a governance handle (a bundle is the unit pushed org-wide through managed settings).

Example: `bitwarden-software-engineer`

### Deciding Where a Skill or Agent Belongs

For any new skill or agent, walk this test in order:

1. Is it unusable outside one repo's own codebase? It stays in that repo's local `.claude/` configuration, not the marketplace.
2. If not, is it dispatched only by one sibling skill or agent? It stays with its consumer.
3. If not, would it transfer unchanged to another company using the same vendor product? It belongs in that vendor's integration plugin.
4. Otherwise, it's named for the artifact or practice it acts on.

A plugin's description enumerates its skills, which keeps this boundary self-enforcing at review time. A skill that no longer fits its plugin's description either forces a deliberate description change or a move to a different plugin.

## Plugin Structure

Each plugin lives under `plugins/` and follows this layout:

```
plugins/your-plugin-name/
├── .claude-plugin/
│   └── plugin.json          (required manifest)
├── commands/                (slash commands - optional)
├── agents/                  (subagents - optional)
├── skills/                  (agent skills - optional)
├── hooks/                   (event handlers - optional)
├── CHANGELOG.md             (required)
├── README.md                (required)
└── .mcp.json               (MCP servers - optional)
```

For detailed guidance on building each component, see the [Plugin Reference](https://code.claude.com/docs/en/plugins-reference).

## Adding a New Plugin

1. Create your plugin directory under `plugins/`
2. Add an entry to `.claude-plugin/marketplace.json`:

```json
{
  "name": "your-plugin-name",
  "source": "./plugins/your-plugin-name",
  "description": "Brief description of your plugin",
  "version": "1.0.0"
}
```

3. Create your `.claude-plugin/plugin.json` manifest
4. Add a `README.md` and `CHANGELOG.md`
5. Add any subject-matter terms to `.cspell.json`
6. [Validate your plugin](#validating-changes) before submitting

## Plugin Requirements

All plugins must include:

- **Comprehensive README** - Clear description of capabilities, usage, and examples
- **Proper error handling** - Fail gracefully with helpful error messages
- **Security best practices** - No credential exposure, input validation on all untrusted data
- **Test coverage** - Unit tests for core functionality, integration tests for external dependencies
- **Semantic versioning** - Follow [semver](https://semver.org/) for all version numbers
- **Changelog** - Document all changes in [Keep a Changelog](https://keepachangelog.com/) format

## Versioning and Changelog

All plugin changes **must** include a version bump and changelog entry in the same PR.

### Determining the version bump

- **MAJOR (X.0.0)**: Breaking changes or incompatible modifications
- **MINOR (0.X.0)**: New features or backward-compatible additions
- **PATCH (0.0.X)**: Bug fixes, documentation updates, or security patches

### Bumping the version

Update the version in every place it appears:

- the plugin's `.claude-plugin/plugin.json`,
- its entry in the root `.claude-plugin/marketplace.json`,
- the plugin catalog table in the root `README.md`,
- any agent frontmatter (`AGENT.md`), if the plugin has agents.

A helper script that updates all of these at once (`bump-plugin-version.sh`) lives in [`bitwarden/gh-actions`](https://github.com/bitwarden/gh-actions/tree/main/validate-ai/scripts). Run it from a checkout of that repository. The script defaults `REPO_ROOT` to the parent of its own `scripts/` directory, which inside a gh-actions checkout is `validate-ai/` — so you must set `REPO_ROOT` to this repository or it will look for plugins in gh-actions and fail with "Plugin directory not found":

```bash
REPO_ROOT=/path/to/ai-plugins validate-ai/scripts/bump-plugin-version.sh <plugin-name> <new-version>
```

### Updating the changelog

After bumping the version, add an entry to `plugins/<plugin-name>/CHANGELOG.md` under the appropriate category:

- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements

See the [validate-ai scripts README](https://github.com/bitwarden/gh-actions/tree/main/validate-ai/scripts) for full documentation on the version bump script and validation tooling.

## Validating Changes

Plugin structure, marketplace consistency, and version-bump checks are covered by the validation scripts (`validate-plugin-structure.sh`, `validate-marketplace.sh`) in [`bitwarden/gh-actions`](https://github.com/bitwarden/gh-actions/tree/main/validate-ai), under `validate-ai/scripts/`.

To run them locally before pushing, invoke them from a checkout of that repository with `REPO_ROOT` pointed at this one. Each script defaults `REPO_ROOT` to the parent of its own `scripts/` directory — `validate-ai/` inside a gh-actions checkout — so without the override it inspects gh-actions instead of this repository and fails on a path that isn't there (`validate-plugin-structure.sh` reports "Plugins directory not found", `validate-marketplace.sh` reports "marketplace.json not found at"). Each script accepts a plugin name or `plugins/<name>` path, and validates all plugins when given no arguments:

```bash
REPO_ROOT=/path/to/ai-plugins validate-ai/scripts/validate-plugin-structure.sh bitwarden-code-review
REPO_ROOT=/path/to/ai-plugins validate-ai/scripts/validate-marketplace.sh
```

## Code Quality

- Use `.editorconfig` settings for consistent formatting
- Validate spelling against `.cspell.json` and add subject-matter terms as needed
- Ensure all pre-commit hooks pass before submitting
- Follow existing patterns in the repository

## Security

This is a Bitwarden-maintained repository with high security standards:

- **Never commit credentials or API keys** - Use environment variables or secure configuration
- **Review all external dependencies for vulnerabilities**
- **Follow principle of least privilege** - Request only necessary permissions
- **Validate all inputs as untrusted**
- **Fail safely** - Handle errors without compromising security

## Review Process

- All contributions require review from repository maintainers (see `.github/CODEOWNERS`)
- Automated checks validate structure, versioning consistency, and compliance
- Follow [Bitwarden Contributing Guidelines](https://contributing.bitwarden.com) for all submissions
