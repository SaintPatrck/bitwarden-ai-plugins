# Bitwarden QA Engineer Plugin

## Overview

QA engineer bundle for a Bitwarden product team. This plugin holds no skills or agent of its own. Installing it gets a QA engineer manual test-case authoring and coverage assessment (`bitwarden-testing-tools`), plus the commit/PR mechanics shared with the rest of the team (`bitwarden-code-contribution-tools`), in one step, instead of installing each capability plugin separately — both work standalone too, so this bundle is a convenience and a governance handle, not a requirement.

## Cross-Plugin Integration

| Plugin                              | How It's Used                                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `bitwarden-testing-tools`           | `writing-manual-test-cases`, `assessing-test-coverage`                                                                    |
| `bitwarden-code-contribution-tools` | `committing-changes`, `creating-pull-request`, `perform-preflight`, `labeling-changes`, `addressing-code-review-comments` |

## Related Plugins

- **`bitwarden-software-engineer`** — the engineering counterpart that collaborates with QA on testing questions.

## Installation

```bash
/plugin install bitwarden-qa-engineer@bitwarden-marketplace
```

## Usage

```
Help me write manual test cases for PM-12345 using bitwarden-qa-engineer.
```

```
Assess test coverage for this PR with bitwarden-qa-engineer.
```

## References

- [Bitwarden Contributing Guidelines](https://contributing.bitwarden.com/contributing/)
