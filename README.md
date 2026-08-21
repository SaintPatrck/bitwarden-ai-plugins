# Bitwarden AI Plugin Marketplace

A curated collection of plugins for AI-assisted development at Bitwarden. Enables discovery and distribution of quality-controlled plugins for use with Claude Code.

## Available Plugins

Plugins come in two layers. **Capability plugins** hold the skills and agents, and every skill has exactly one home in one of them. **Role bundles** hold nothing but dependencies; they are what a person installs to get the set their job needs.

### Capability plugins

Bitwarden engineering practice.

| Plugin                                                                | Version | Description                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bitwarden-actions-tools](plugins/bitwarden-actions-tools/)           | 0.3.0   | Bitwarden's GitHub Actions conventions — workflow linter rules and naming standards, action and workflow auditing, and org-wide remediation with draft PRs.                                                                                                                                                                                           |
| [bitwarden-architecture-tools](plugins/bitwarden-architecture-tools/) | 1.0.0   | Architectural judgment for Bitwarden changes — team-level solution design that stays coherent with the holistic architecture, security posture, and multi-client constraints.                                                                                                                                                                         |
| [bitwarden-breakdown-tools](plugins/bitwarden-breakdown-tools/)       | 1.1.0   | The project-level Bitwarden Tech Breakdown process — setting up a breakdown, developing its specification and plan, decomposing it into tasks, filing those tasks as Jira work items, and archiving the finished folder. Scoped to breakdowns that coordinate a team's committed work, not to an engineer's own finer-grained personal task tracking. |
| [bitwarden-code-review-tools](plugins/bitwarden-code-review-tools/)   | 2.0.0   | Reviewing a Bitwarden pull request — multi-agent review passes, finding classification and validation, dependency-approval checks, and posting inline comments and summaries.                                                                                                                                                                         |
| [bitwarden-contribution-tools](plugins/bitwarden-contribution-tools/) | 4.0.0   | Getting a change into a Bitwarden repository — commits, pull requests, change labeling, preflight quality gates, addressing review feedback, and applying one intent across a fleet of repos.                                                                                                                                                         |
| [bitwarden-design-tools](plugins/bitwarden-design-tools/)             | 0.2.0   | Bitwarden's product design practice — brand application, content style, Figma Dev Mode reads, Design System governance, engineering handoff, critique, and the Product and Design Jira workflow.                                                                                                                                                      |
| [bitwarden-initiative-tools](plugins/bitwarden-initiative-tools/)     | 2.0.0   | Bitwarden's Software Initiative Funnel — championing and curating Technical Strategy Ideas, architectural assessments, proofs of concept, scoping and team handoffs, cross-team implementation, and work transitions.                                                                                                                                 |
| [bitwarden-product-tools](plugins/bitwarden-product-tools/)           | 0.3.0   | Turning product intent into tracked work at Bitwarden — requirements elicitation, work breakdown, and user-facing release notes.                                                                                                                                                                                                                      |
| [bitwarden-security-tools](plugins/bitwarden-security-tools/)         | 2.0.0   | Application security practice at Bitwarden — security principles and data classification, threat modeling, code and architecture security analysis, secret detection, dependency and HackerOne triage.                                                                                                                                                |
| [bitwarden-testing-tools](plugins/bitwarden-testing-tools/)           | 1.1.0   | Testing tools for Bitwarden — analyzing and improving test quality across its repositories.                                                                                                                                                                                                                                                           |

External platform integration.

| Plugin                                                          | Version | Description                                                                                                                                             |
| --------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bitwarden-atlassian-tools](plugins/bitwarden-atlassian-tools/) | 2.6.0   | Atlassian access via MCP server with deep Jira issue research skill, JQL search, Confluence pages, CQL search, attachments, and opt-in Jira write tools |

Claude Code itself.

| Plugin                                                      | Version | Description                                                                                                                                                                                                    |
| ----------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bitwarden-ai-telemetry](plugins/bitwarden-ai-telemetry/)   | 1.1.0   | Claude Code hooks that emit metadata-only AI-usage telemetry (identity, git-linkage, MCP) as OTLP logs. Fail-open.                                                                                             |
| [bitwarden-init](plugins/bitwarden-init/)                   | 1.2.2   | Initialize Claude Code configuration with Bitwarden's standardized template format                                                                                                                             |
| [claude-config-validator](plugins/claude-config-validator/) | 2.0.1   | Validates Claude Code configuration files for security, structure, and quality. Routes CLAUDE.md, agents, commands, hooks, and settings to targeted review skills, reporting only what a changeset introduced. |
| [claude-retrospective](plugins/claude-retrospective/)       | 1.1.1   | Comprehensive analysis of Claude Code sessions to identify successful patterns, problematic areas, and opportunities for improvement.                                                                          |

### Role bundles

Install one of these to get a scoped set for a role. Each is a dependency manifest with no skills of its own, so enabling it enables the capability plugins it names.

| Bundle                                                              | Version | Depends on                                                                                                      |
| ------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| [bitwarden-designer](plugins/bitwarden-designer/)                   | 0.2.0   | Everything a Bitwarden product designer needs, from brand and content through critique and engineering handoff. |
| [bitwarden-devops-engineer](plugins/bitwarden-devops-engineer/)     | 0.3.0   | Everything a Bitwarden DevOps engineer needs for CI workflow compliance and org-wide remediation.               |
| [bitwarden-product-analyst](plugins/bitwarden-product-analyst/)     | 0.2.0   | Everything a Bitwarden product analyst needs to elicit requirements, break down work, and communicate releases. |
| [bitwarden-qa-engineer](plugins/bitwarden-qa-engineer/)             | 1.0.0   | Everything a Bitwarden QA engineer needs to assess coverage and author manual test cases.                       |
| [bitwarden-security-engineer](plugins/bitwarden-security-engineer/) | 2.0.0   | Everything a Bitwarden application security engineer needs to model threats, analyze code, and triage findings. |
| [bitwarden-shepherd](plugins/bitwarden-shepherd/)                   | 2.0.0   | Everything an initiative shepherd needs to carry a Technical Strategy Idea through the funnel to adoption.      |
| [bitwarden-software-engineer](plugins/bitwarden-software-engineer/) | 2.0.0   | Everything a Bitwarden software engineer needs to implement, review, and ship a change.                         |
| [bitwarden-tech-lead](plugins/bitwarden-tech-lead/)                 | 4.0.0   | Everything a Bitwarden tech lead needs to scope, design, and shepherd their team's work.                        |

### External plugins

Sourced from outside Bitwarden and **pinned to a reviewed commit**, following the pattern Anthropic uses for third-party entries in its own marketplace. Their files are not copied into this repo; each entry references an upstream subdirectory at a fixed commit. They are not Bitwarden practice, so they sit outside the capability and bundle layers.

| Plugin                                                                                                   | Author    | Description                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`plugin-dev`](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/plugin-dev)       | Anthropic | Comprehensive toolkit for developing Claude Code plugins. Includes expert skills covering hooks, MCP integration, commands, agents, and plugin structure guidance.                                                                        |
| [`skill-creator`](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator) | Anthropic | Create new skills, improve existing skills, and measure skill performance. Use when creating a skill from scratch, optimizing an existing skill, running evals to test a skill, or benchmarking skill performance with variance analysis. |

Both resolve from `anthropics/claude-plugins-official` at `340e33aef211`. The pin is the point: a floating `ref` would let upstream change what your team installs without review. To move to a newer upstream commit, update the `sha` on both entries and say what changed in the pull request.

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
