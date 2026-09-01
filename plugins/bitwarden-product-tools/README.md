# Bitwarden Product Tools

Claude Code skills for product analysis at Bitwarden. Generic AI assistance doesn't know our requirements format, security principles, Confluence initiative structure, or how we think about plan tiers and client surfaces. These skills keep Claude focused on how we specify software here.

## Skills

| Skill                            | What It Does                                                                                                                                                                                                                                       |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `requirements-elicitation`       | Extracts functional, non-functional, and security requirements from specifications. Flags ambiguities, identifies constraints, and creates testable acceptance criteria using Bitwarden security vocabulary.                                       |
| `writing-requirements-documents` | Gathers sources directly (Confluence, Jira, GitHub issues, web URLs, local files), dispatches `requirements-elicitation` for extraction, and assembles a comprehensive requirements document following Bitwarden's requirements template.          |
| `writing-release-notes`          | Produces user-facing release notes from a Jira release tag and the weekly #release Slack thread. Filters to user-visible changes, respects feature flag enablement, and for server releases always surfaces flag removals in user-facing language. |

## Installation

Available through Bitwarden's internal Claude Code marketplace:

```bash
# Add the Bitwarden marketplace (if not already added)
/plugin marketplace add https://github.com/bitwarden/ai-plugins

# Install the product tools plugin
/plugin install bitwarden-product-tools@bitwarden-marketplace

# Restart Claude Code
```

## Usage

```
Analyze requirements from https://bitwarden.atlassian.net/wiki/spaces/PROD/pages/123456/Feature-Name
```

```
Create a spec document from PROJ-1234
```

```
Write a spec for adding passkey support to the browser extension
```

```
Write release notes for https://bitwarden.atlassian.net/projects/CL/versions/12345
```

```
Draft release notes for the 2025.7.0 server release
```

## References

### requirements-elicitation / writing-requirements-documents

- [Bitwarden Security Definitions](https://contributing.bitwarden.com/architecture/security/definitions) — Vault Data, Protected Data, Secure Channel, Trusted Channel vocabulary
- [Bitwarden Security Principles](https://contributing.bitwarden.com/architecture/security/principles/) — P01–P06 foundation principles
- [Product Initiative Template](https://bitwarden.atlassian.net/wiki/spaces/PROD/pages/171507714/Product+initiative+template) — Canonical PM template; maps to `references/requirements-template.md`
- [Requirements Template](references/requirements-template.md) — Full requirements document structure

### writing-release-notes

- [Bitwarden Atlassian Tools](../bitwarden-atlassian-tools/) — Provides the `search_issues`, `get_issue`, and `get_issue_comments` MCP tools used for automated Jira lookups
- Jira release report pages (`https://bitwarden.atlassian.net/projects/<PROJECT>/versions/<ID>/tab/release-report-all-issues`) and the weekly `#release` Slack thread are the two data sources this skill synthesizes
