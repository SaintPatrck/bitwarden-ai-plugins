# Bitwarden AI Plugin Marketplace

A curated collection of plugins for AI-assisted development at Bitwarden. Enables discovery and distribution of quality-controlled plugins for use with Claude Code.

## Available Plugins

### Capability plugins

| Plugin                                                                            | Version | Description                                                                                                                                                                       |
| --------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bitwarden-ai-telemetry](plugins/bitwarden-ai-telemetry/)                         | 1.1.0   | Claude Code hooks emitting metadata-only AI-usage telemetry (identity, git-linkage, MCP) via OTLP                                                                                 |
| [bitwarden-atlassian-tools](plugins/bitwarden-atlassian-tools/)                   | 2.7.0   | Atlassian access via MCP server with deep Jira issue research skill and opt-in Jira write tools                                                                                   |
| [bitwarden-code-review-tools](plugins/bitwarden-code-review-tools/)               | 2.0.4   | Autonomous code review agent following Bitwarden engineering standards with GitHub integration                                                                                    |
| [bitwarden-code-contribution-tools](plugins/bitwarden-code-contribution-tools/)   | 4.1.3   | Getting a change into a Bitwarden repository: commits, PRs, change labeling, preflight quality gates, addressing review feedback, and fleet-wide fan-out                          |
| [bitwarden-architecture-tools](plugins/bitwarden-architecture-tools/)             | 1.0.1   | Architectural judgment for Bitwarden changes: team-level solution design coherent with the holistic architecture and security posture                                             |
| [bitwarden-initiative-tools](plugins/bitwarden-initiative-tools/)                 | 2.2.3   | Bitwarden's Software Initiative Funnel: championing and curating Technical Strategy Ideas, architectural assessments, PoCs, scoping, handoffs, transitions                        |
| [bitwarden-product-design-tools](plugins/bitwarden-product-design-tools/)         | 0.3.1   | Design toolkit: content style guide, Figma Dev Mode MCP, Bitwarden brand application, handoff prep, Design System governance, Product and Design Jira, design critique            |
| [bitwarden-github-action-tools](plugins/bitwarden-github-action-tools/)           | 1.0.0   | Bitwarden's GitHub Actions conventions: workflow linter rules, naming standards, action and workflow auditing, secret handling review, and remediation                            |
| [bitwarden-init](plugins/bitwarden-init/)                                         | 1.2.3   | Initialize and enhance CLAUDE.md files with Bitwarden's standardized template format                                                                                              |
| [bitwarden-product-management-tools](plugins/bitwarden-product-management-tools/) | 1.0.0   | Turning product intent into tracked work at Bitwarden: requirements elicitation, requirements-document writing, and user-facing release notes                                     |
| [bitwarden-security-tools](plugins/bitwarden-security-tools/)                     | 2.1.0   | Application security practice at Bitwarden: principles and data classification, threat modeling, code and architecture security analysis, secrets, dependencies, HackerOne triage |
| [bitwarden-testing-tools](plugins/bitwarden-testing-tools/)                       | 1.1.0   | Testing tools for analyzing and improving test quality across Bitwarden's repositories.                                                                                           |
| [bitwarden-claude-config-tools](plugins/bitwarden-claude-config-tools/)           | 2.0.4   | Validates Claude Code configuration files for security, structure, and quality                                                                                                    |
| [bitwarden-retrospective-tools](plugins/bitwarden-retrospective-tools/)           | 1.1.1   | Analyze Claude Code sessions to identify successful patterns and improvement opportunities                                                                                        |

### Role bundles

The capability plugins above are enough on their own for placement — nothing about them requires
installing a bundle. A role bundle buys two things instead: a one-step install for a role's whole
toolkit instead of reading the catalog and installing each capability plugin separately, and a
governance handle, since a bundle is small enough to audit and can be pushed org-wide through
managed settings.

| Plugin                                                              | Version | Description                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bitwarden-tech-lead](plugins/bitwarden-tech-lead/)                 | 4.0.2   | Tech lead dependency bundle — team-scope architectural judgment, initiative-funnel participation, implementation, and reviewing PRs                                                                                                          |
| [bitwarden-shepherd](plugins/bitwarden-shepherd/)                   | 2.0.1   | Shepherd dependency bundle — championing a Technical Strategy Idea through Architecture's evaluation and driving an approved initiative across the Software Initiative Funnel                                                                |
| [bitwarden-designer](plugins/bitwarden-designer/)                   | 1.0.2   | Product designer bundle with no agent of its own; depends on bitwarden-product-design-tools for design critique, critique facilitation, and the rest of the toolkit                                                                          |
| [bitwarden-devops-engineer](plugins/bitwarden-devops-engineer/)     | 1.0.3   | DevOps engineering assistant: workflow compliance linting, action security auditing, and org-wide CI/CD remediation                                                                                                                          |
| [bitwarden-product-analyst](plugins/bitwarden-product-analyst/)     | 1.0.2   | Product analyst bundle for Bitwarden. Depends on the bitwarden-product-management-tools capability plugin for requirements elicitation, requirements-document writing, and user-facing release notes. This bundle holds no agent of its own. |
| [bitwarden-security-engineer](plugins/bitwarden-security-engineer/) | 2.0.1   | Security engineer bundle for a Bitwarden product team. Depends on the security-tools and code-review-tools capability plugins — vulnerability triage, threat modeling, secure code analysis, and reviewing PRs for security issues.          |
| [bitwarden-software-engineer](plugins/bitwarden-software-engineer/) | 2.0.2   | Software engineer bundle for a Bitwarden product team. Depends on the contribution and code-review capability plugins — the implementor agent, commit/PR mechanics, and reviewing teammates' PRs.                                            |
| [bitwarden-qa-engineer](plugins/bitwarden-qa-engineer/)             | 1.0.2   | QA engineer bundle for a Bitwarden product team. Manual test-case authoring, coverage assessment, and the commit/PR mechanics shared with engineering.                                                                                       |

## Usage

### Adding this marketplace to Claude Code

```bash
# Short form (GitHub owner/repo)
/plugin marketplace add bitwarden/ai-plugins

# Full GitHub URL
/plugin marketplace add https://github.com/bitwarden/ai-plugins
```

After adding the marketplace, restart Claude Code for the changes to take effect.

You can also use `/plugin` interactively to manage marketplaces and plugins through a guided interface.

### Installing plugins

Once the marketplace is added, install plugins using:

```bash
/plugin install plugin-name@bitwarden-marketplace
```

Plugins are installed to `~/.claude/plugins/` by default. Restart Claude Code after installing for the plugin to become active.

### Keeping plugins up to date

Third-party marketplaces don't auto-update by default. To enable automatic updates, open `/plugin`, go to **Marketplaces**, select this marketplace, and choose **Enable auto-update**. Claude Code will then refresh marketplace data and update installed plugins at startup.

You can also update manually at any time:

```bash
/plugin marketplace update bitwarden-marketplace
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for plugin development guidelines, structure requirements, versioning rules, and the review process.

## Documentation

- [Claude Code Plugins Guide](https://docs.claude.com/en/docs/claude-code/plugins.md)
- [Plugin Reference](https://docs.claude.com/en/docs/claude-code/plugins-reference.md)
- [Plugin Marketplaces](https://docs.claude.com/en/docs/claude-code/plugin-marketplaces.md)
- [Validation Scripts](https://github.com/bitwarden/gh-actions/tree/main/validate-ai/scripts)
