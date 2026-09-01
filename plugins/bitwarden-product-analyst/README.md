# Bitwarden Product Analyst Plugin

## Overview

Product analyst bundle for Bitwarden. This plugin holds no agent or skills of its own — it depends on `bitwarden-product-tools` for the full toolkit: requirements elicitation, requirements-document writing following Bitwarden's 15-section template, and user-facing release notes.

## Cross-Plugin Integration

| Plugin                    | How It's Used                                                                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `bitwarden-product-tools` | Required. `requirements-elicitation` for extracting requirements, `writing-requirements-documents` for producing the requirements document, and `writing-release-notes` for user-facing release notes. |

## Installation

```bash
/plugin install bitwarden-product-analyst@bitwarden-marketplace
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

## References

- [Bitwarden Security Definitions](https://contributing.bitwarden.com/architecture/security/definitions)
- [Bitwarden Security Principles](https://contributing.bitwarden.com/architecture/security/principles/)
- [Product Initiative Template](https://bitwarden.atlassian.net/wiki/spaces/PROD/pages/171507714/Product+initiative+template)
