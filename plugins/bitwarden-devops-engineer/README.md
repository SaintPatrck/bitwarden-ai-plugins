# Bitwarden DevOps Engineer Plugin

## Overview

DevOps engineer bundle for a Bitwarden product team. This plugin holds no skills or agent of its own. Installing it gets a DevOps engineer GitHub Actions workflow compliance, action security auditing, and org-wide CI/CD remediation (`bitwarden-github-action-tools`), plus the commit/PR mechanics shared with the rest of the team (`bitwarden-code-contribution-tools`), in one step, instead of installing each capability plugin separately — both work standalone too, so this bundle is a convenience and a governance handle, not a requirement.

## Cross-Plugin Integration

| Plugin                              | How It's Used                                                                                                                                                                                                                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `bitwarden-github-action-tools`     | `workflow-audit` → `workflow-fix` for linter compliance inside a repo, `action-audit` → `action-remediate` for action security across the org, `bitwarden-workflow-linter-rules` and `auditing-workflow-conventions` as reference, `managing-workflow-secrets` for the Azure Key Vault + OIDC secret pattern |
| `bitwarden-code-contribution-tools` | `committing-changes`, `creating-pull-request`, `perform-preflight`, `labeling-changes`, `addressing-code-review-comments`                                                                                                                                                                                    |

## Installation

```bash
/plugin install bitwarden-devops-engineer@bitwarden-marketplace
```

## Usage

```
Run the workflow linter on the server repo.
```

```
Check if any repos are using tj-actions/changed-files.
```

```
Pin the unpinned actions from the audit and open draft PRs.
```

## References

- [Bitwarden Contributing Guidelines](https://contributing.bitwarden.com/contributing/)
