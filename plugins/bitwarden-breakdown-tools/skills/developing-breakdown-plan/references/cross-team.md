# Cross-team engagement and in-flight coordination

Scan over the affected files and modules to assess cross-team ownership and potential coordination issues with ongoing changes.

## Step 1: Ownership via CODEOWNERS

Fetch each affected repo's CODEOWNERS remotely. No local checkout required.

```bash
gh api repos/bitwarden/<repo>/contents/.github/CODEOWNERS \
  -H "Accept: application/vnd.github.raw"
```

For each affected file, note:

- Which team owns it.
- If another team owns it, whether we're _modifying_ their code or only _consuming_ their public API.

## Step 2: Scan for in-flight work and owning-team churn

Three surfaces, one pass across every affected file and module. This scan serves both the in-flight-collision question and the owning-team-churn question.

**A. Other teams' breakdowns** in the current working copy. Invoke the `Grep` tool with `pattern` set to the file or module name (use fixed-string matching; identifiers may contain regex metacharacters like `.` or `-`), `glob` set to `**/*.md`, and `output_mode` set to `files_with_matches`. Discard any hit whose path contains `/complete/` — archived breakdowns don't count as in-flight overlap.

Confirm overlap by reading the candidate breakdown's Tasks and Plan sections. Grep matches alone are not proof.

**B. Open PRs in the affected repos:**

```bash
gh pr list -R bitwarden/<repo> --state open --json number,title,headRefName,files,author --limit 50
```

**C. Recent merged commits in affected paths.** Use a date 1 month prior to today. Recent material churn signals conventions may not be stable.

```bash
gh api repos/bitwarden/<repo>/commits\?path=\<path\>\&since=\<YYYY-MM-DD\> \
  --jq '.[] | {sha:.sha[0:7], author:.author.login, date:.commit.author.date, message:(.commit.message | split("\n")[0])}'
```

## Work the template checklists

`Consuming other teams' APIs`, `Changes required in other teams' code`, and `Cross-team sequencing & ordering` each carry a checklist in `${CLAUDE_PLUGIN_ROOT}/templates/breakdown.md`. Work each question in order, in place, before routing scan findings below.

## Step 3: Route each finding

For each finding produced by the scan, apply the routing table:

| Finding                                                                         | Where it lands                                        | Signoff row? |
| ------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------ |
| Code owned by another team AND we're modifying it                               | `Cross-team engagement → Cross-team signoff`          | Yes          |
| Code owned by another team, consumed only, AND Step 2 found recent churn        | `Cross-team engagement → Cross-team signoff`          | Yes          |
| Code owned by another team, consumed only, no churn                             | `Cross-team engagement → Consuming other teams' APIs` | No           |
| Code owned by driving team AND another team has in-flight work on the same code | `Cross-team engagement → Coordination notes`          | No           |
| Another team's in-flight design work (breakdown or PR) touches the same area    | `Cross-team engagement → Coordination notes`          | No           |

For any coordination-note finding, recommend posting on the other team's public Slack channel; tag the named human if one is identifiable. Do not DM.

Findings are not blocks. The engineer decides whether alignment needs to happen before continuing.

## Never in the signoff table

- **Driving team.** It owns this breakdown; it doesn't sign off on itself.
- **Teams whose APIs are stable and only being consumed.** They own the API; they don't review your consumption.

## Signoff row fields

Per row in `Cross-team engagement`:

- **Team**: the owning team.
- **Interface**: one or two sentences on what gets modified, extended, or consumed in their domain. Note any recent churn from Step 2.
- **Associated breakdown**: link to the owning team's breakdown for this work if one exists; otherwise leave blank.
- **Signoff**: left empty for the owning-team reviewer.
