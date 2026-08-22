# Security surface

Captures the security surface of the change, referencing existing security definitions (SDs) or authoring new ones as needed, and picks the correct security review routing. Whether the work also needs an Architecture review is the rubric's call, recorded in `## Architecture review screening`.

_Captured in **Plan → Security** (checklist and Security definitions subsection)._

## Skill invocation

Invoke `Skill(bitwarden-security-tools:bitwarden-security-context)` before working any question in this section, even if a prior activity already invoked it. Sessions resumed at the Security activity in a fresh conversation will not carry the context loaded earlier. Both `bitwarden-security-context` and `threat-modeling` are provided by the `bitwarden-security-tools` plugin; if either is unavailable, prompt the engineer to install the plugin and stop until it is present.

## Work the template checklist

The four-question Security checklist and its cryptography review-routing block live in `templates/breakdown.md`. Work each question in order, in place.

## Referencing existing Security Definitions

The fresh template does not list any existing SDs. That absence is not evidence, and there may still be relevant SDs elsewhere. If the checklist indicates SD coverage is needed, prompt the engineer to point to existing definitions before authoring new ones.

## Creating new Security Definitions

If the checklist surfaces that new or modified Security Definitions are needed, invoke `Skill(bitwarden-security-tools:threat-modeling)` to author them, then store the result as described below.

Store proposed SDs inline in the `Security definitions` subsection for 1–2 SDs, or in a sibling `security-definitions.md` next to `breakdown.md` for 3 or more. Link, don't duplicate.
