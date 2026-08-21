---
name: complete-breakdown
description: Move a finished tech breakdown folder into its team's `complete/` archive. Invoke when the user says the breakdown's work is done, that the breakdown is now `Complete`, that they want to archive a breakdown, or any phrasing that signals the lifecycle has reached `Complete` for a specific breakdown folder (e.g., "mark this breakdown complete", "archive this breakdown", "move this to complete"). The skill verifies the status, moves the folder via `git mv`, and reports the sibling files it carried along.
allowed-tools: Read, Glob, Bash(git mv:*), Bash(git status:*), Bash(git diff:*), Bash(mkdir:*), Bash(test:*)
argument-hint: "<path/to/breakdown.md | path/to/breakdown-folder>"
---

# Complete Breakdown

## Overview

Archive a tech breakdown by moving its whole folder into the owning team's `complete/` subdirectory. Breakdowns live in per-breakdown folders (`<team>/<JIRA-KEY>-<short-slug>/`) alongside `tasks.md` and any specification companion files; those siblings archive together as one unit. The destination convention is documented in the repo `README.md`: breakdowns under `<team>/complete/` are point-in-time records, not source of truth.

**Announce at start:** "I'm using the complete-breakdown skill to archive the breakdown. I'll verify the status is `Complete` and then `git mv` the folder into `<team>/complete/`, keeping `tasks.md` and any sibling companion files with it."

<HARD-GATE>
Do NOT run `git mv` until all of the following hold:

- The path resolves to a real breakdown. Take `$ARGUMENTS` (or ask the user if missing) and resolve it to one of three shapes: a per-breakdown folder (`<team>/<JIRA-KEY>-<short-slug>`), a `breakdown.md` inside such a folder (take the parent folder), or a legacy flat file (`<team>/<file>.md` with no enclosing folder). Record which shape matched; Steps 2–4 branch on it. Confirm the resolved target with `AskUserQuestion` before proceeding.
- The path is validated before any shell interpolation. Team segment must match `^[a-z][a-z0-9-]*$`. Breakdown-folder segment must match `^[A-Z][A-Z0-9]+-[0-9]+-[a-z][a-z0-9-]*$` (JIRA key + hyphen + kebab slug), OR the legacy flat-file filename must match `^[A-Za-z][A-Za-z0-9-]*\.md$` (alphanumeric + hyphen basename, `.md` extension, no path separators or shell metacharacters). Never interpolate an unvalidated value into `mkdir` or `git mv`. If validation fails, reject and re-prompt the user rather than continuing.
- The resolved target is not already under `<team>/complete/`. If it is, stop and tell the user the breakdown is already archived.
- The destination path does not exist. For the folder shape, run `test -e <team>/complete/<JIRA-KEY>-<short-slug>` (using only the regex-validated segments from the path-validation step above); a zero exit means the destination is present and must be treated as a collision. `Glob` cannot substitute here — it returns file paths, so an empty destination directory would not appear in its output, and `git mv <src> <team>/complete/<slug>` against an existing destination folder exits 0 and silently nests the source at `<team>/complete/<slug>/<slug>/`. Report the collision and let the user resolve it (rename, remove, or investigate); do not attempt to recover automatically.
- The `**Status:**` field of the breakdown reads `Complete`. See Step 2 for the exceptions (`Rejected`, missing field).
- Any working-tree modifications are limited to the Status flip. Uncommitted edits outside that pattern would silently combine with the archival commit. See Step 3.

</HARD-GATE>

## Steps

1. **Resolve and validate the path.** Take `$ARGUMENTS` (or ask if missing). Resolve to either the breakdown folder or the legacy flat file. Record which shape matched; Steps 2–4 branch on it. Apply the regex validation in the HARD-GATE. Confirm with `AskUserQuestion`.

2. **Verify the status is `Complete`.** Read the resolved breakdown file's `## Status` section (top of the document) — that's `<folder>/breakdown.md` for the folder shape, or the flat `.md` itself for the legacy shape. The `**Status:**` line must read `Complete`. If it does not:
   - If the status is `In Planning`, `In Progress`, `Proposed`, or `Accepted`: refuse the move. Tell the user the breakdown isn't done yet and ask them to change the status first.
   - If the status is `Rejected`: ask whether they want to archive a rejected breakdown alongside completed ones. Only proceed on explicit confirmation. Mention that rejected breakdowns living in `complete/` should still note the rejection reason in the status block so future readers don't confuse them.
   - If the status field is missing or malformed: stop and ask the user to fix the status block first.

3. **Check the working tree scope.** Ensure that the archived folder's contents match its state at the moment the engineer flipped Status to `Complete`; any other uncommitted edit — inside the target or elsewhere in the repo — would ride along with the `git mv` and land in the archival commit silently. Two checks, run in order:
   - **Repo-wide unrelated changes, plus in-target untracked files.** Run two commands: `git status --porcelain` (all changes) and `git status --porcelain -- <target>` (scoped, accepts absolute or cwd-relative pathspecs; both outputs render paths as repo-root-relative). Treat the two outputs as line sets: any line in the full-repo set that is not in the target-scoped set is an unrelated modification and is blocking. Additionally, any `??` entry in the target-scoped output (an untracked file inside the target folder — draft companion doc, PoC notes) is blocking: `git mv` carries it along on disk without staging it, so it would appear archived but land outside the commit. If either condition holds, stop and list the offending lines; ask the user to commit, stash, or remove the untracked files before archiving.
   - **Status-flip-only within the target (tracked content).** Run `git diff HEAD -U0 -- <target>` (folder or flat `.md`). Use `HEAD` explicitly so the diff covers both staged and unstaged changes; the plain `git diff` form ignores staged edits and would let a staged content change ride along with the archival. This check covers tracked content only — untracked files are handled by the previous check. The documented happy path per `README.md` is that the Status flip to `Complete` and the archival move land in the same PR, so a change limited to the `**Status:**` line of the resolved breakdown file is expected. If the diff is clean, or touches only lines within the Status block, proceed. Any other in-target modification: stop and ask the user to commit or stash before archiving.

4. **Move the folder.** Create `<team>/complete/` if it doesn't exist (`mkdir -p <team>/complete`), then move the entire folder in one operation:

   ```
   git mv <team>/<JIRA-KEY>-<short-slug> <team>/complete/<JIRA-KEY>-<short-slug>
   ```

   This preserves history for `breakdown.md`, `tasks.md`, and every companion file in the folder as one rename.

   **Legacy flat-file exception.** A small number of pre-folder breakdowns live directly under `<team>/` as `<team>/<jira-key>-<slug>.md` (no enclosing folder). If validation matched the legacy pattern, use the historical form:

   ```
   git mv <team>/<file>.md <team>/complete/<file>.md
   ```

   Do not attempt to relocate the file into a synthetic folder as part of archiving; migrating layout is a separate change.

   **On `git mv` failure.** Report the command output verbatim to the user and stop. Do not retry with `-f`, do not clean up partial state, do not attempt any recovery. `git mv` failures usually mean the destination already exists, the source is untracked, or the working tree state changed since the HARD-GATE ran; the correct next step is human investigation.

5. **Report.** Echo the new folder path (or file path for legacy) and list every file that was carried along. For a folder move, use `Glob` to enumerate the destination and report each file so the user can verify nothing was left behind. Example:

   > Archived: `platform/PM-12345-widget-redesign` → `platform/complete/PM-12345-widget-redesign`
   > Files moved: `breakdown.md`, `tasks.md`, `worked-examples.md`

## Rules

- Do not edit the breakdown contents. The archived files should read exactly as they did at completion, except for the Status flip the user already made.
- Do not commit. Stop after the `git mv` so the user can review and include the move in their own PR.
- Do not archive sibling artifacts that live outside the breakdown folder; only the folder itself moves.
