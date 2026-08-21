# Breakdown

**Template checklist**

- [ ] Copy this template into your team's folder in the breakdown repo
- [ ] Rename to include the Jira ticket key (epic, task, story) and a human-readable name for the breakdown scope
- [ ] Delete this checklist

**When the breakdown is ready for review, communicate to stakeholders**:

- Post a link on #team-eng-tech-breakdowns for cross-team visibility.
- Contact the responsible QA Engineer so they can review the breakdown and build test cases against the design. If none has been identified, post on the team internal Slack channel to surface them.
- Plan refinement of the tickets with your team.

---

## Status

> _Quick-reference state for an agent or reader picking this up cold. Keeps work from running against stale assumptions._

- **Status:** _one of: In Planning, In Progress, Proposed, Accepted, Rejected, Complete_
  - **In Planning** — expected but not actively being worked on
  - **In Progress** — actively being worked on
  - **Proposed** — ready for review
  - **Accepted** — accepted and changes being implemented
  - **Rejected** — rejected due to incompatibilities or blockers
  - **Complete** — implementation has been completed
- **Active owner / contact:** _who to ping for clarifications today_

---

# Specification

> The WHAT and WHY. After reading this section a reader should know what is being built, who benefits, and what the success outcome looks like, without yet knowing how it will be built.

## Description

> _What is being built, in two or three sentences. Concrete enough that someone unfamiliar with the project can picture the end state._

-

## User Value

> _Why this matters. What changes for the customer, the business, or the engineering org once this ships. The success outcome stated in observable terms, not internal milestones._

-

## Functional Requirements

> _Bullet list of what this initiative or epic produces. Each bullet is a deliverable, not a task._

-

## Alternatives

> _Each alternative is one paragraph: the option, why it was rejected, and what trade-off the rejection accepts. This section is the single best defense against re-litigation later._

- **Alternative name** — _description; why rejected; trade-off accepted._

## Success Criteria

> Success criteria are written at the breakdown level. Per-ticket acceptance criteria are story-specific and live on the ticket; they do not duplicate breakdown-level success criteria.

- ***

# Clarifications Log

> A persistent record of questions that need a human stakeholder outside the drafting session (PM, legal, security, AppSec, a peer team, Architecture) and the answers they gave. This log is not a transcript of the drafting conversation.
>
> **What does NOT belong here**: questions the author asked the engineer in-session and resolved together, or questions raised by an AI clarify pass (Spec Kit's `/speckit.clarify`, Claude, or equivalent). Those get folded directly into Specification or Plan as decisions. Only questions that leave the room — that need someone the drafting session cannot answer — get a row here.
>
> **Open** entries carry an owner and a target resolution; a breakdown can ship to Proposed with open clarifications so long as the owners are clear. **Resolved** entries stay in the log as short stubs pointing into Specification or Plan, so future readers can see why a decision was made and don't have to dig through Confluence comment threads to reconstruct intent.

| Status   | Question   | Raised by | Owner      | Resolution                       |
| -------- | ---------- | --------- | ---------- | -------------------------------- |
| Open     | _question_ | _person_  | _owner_    | _needed by date_                 |
| Resolved | _question_ | _person_  | _resolver_ | _short answer; link to §section_ |

---

# Plan

> The HOW. The specification describes WHAT and WHY we're building this, and now we describe how we'll make it happen.
>
> The document breaks the plan up into several sections, to allow the problem to be expressed fully:
>
> 1. Current state
> 2. Architecture (with Out of Scope, Known Limitations, Tech Debt)
> 3. Prototypes
> 4. Changes by area — per-layer impact walkthrough
> 5. Deployment considerations — flagging and observability
> 6. Security — checklist and security definitions
> 7. Architecture review screening — the rubric outcome for this change
> 8. Cross-team engagement — signoff table and coordination notes

## Current State

> _What exists today, before the change. File paths, existing types, current behavior, current data shapes. This subsection anchors the proposed change in concrete code so the reader can see what's actually being modified, not just what's being added._

## Architecture

> Describe the proposed architecture for the solution. Headings and content structure are highly dependent upon the task at hand. Suggested items included below.
>
> **Use Diagrams**. **Prefer Mermaid source** over image-only diagrams: Mermaid is AI-readable (Claude can parse it directly), it diffs cleanly in Confluence history, and reviewers can suggest edits in text.

### Out of Scope

> _What this work explicitly does not deliver. Use this section to short-circuit drift; if a question comes up later, the answer is "out of scope, tracked under X" or "out of scope, not pursued."_

-

### Known Limitations

> _In-scope-but-deferred decisions. Distinct from Out of Scope: these are constraints inside the work we're shipping, not exclusions._

- _Limitation — rationale — what follow-up addresses it (if any)._

### Tech Debt

> _Any tech debt that should be considered when doing this work._

## Prototypes

> _Exploratory technical work done to validate the spec, including throwaway code, proofs of concept, and technical investigation. Sized for shaping, not implementation. Prototype findings should inform the per-layer subsections below; if a finding rewrites a layer's plan, the spec is updated and the finding stays here as the audit trail._

-

## Changes by area

### Data model changes

#### Checklist

- [ ] Will there need to be database changes?
- [ ] Will these changes need to be backwards compatible ([EDD docs](https://contributing.bitwarden.com/contributing/database-migrations/edd))?
- [ ] What data migration strategy is necessary?
- [ ] Has EF and Dapper been considered?

#### Changes required

-

### Server logic and controller changes

#### Checklist

- [ ] Is CQS introduced where applicable?

#### Changes required

-

### Server API surface changes

#### Checklist

- [ ] Will there need to be API changes?
- [ ] If so, what are they?
- [ ] Will these changes need to be backwards compatible?

#### Changes required

-

### `sdk-internal` changes

#### Checklist

- [ ] Have we identified all changes required in the SDK?
- [ ] Are there any changes to public FFI-exposed APIs?
- [ ] Are we including both WASM and UNIFFI bindings?
- [ ] Do we need any new crates? If so, be sure [Adding functionality to the SDK](https://contributing.bitwarden.com/architecture/sdk/adding-functionality) is referenced.
- [ ] Is there opportunity to move existing logic to the SDK?

#### Changes required

-

### Client services changes

#### Checklist

- [ ] Have we identified all TypeScript services this will touch?
- [ ] If we are touching pre-existing TypeScript services can we just add the extra effort of migrating to a high level SDK method?

#### Changes required

-

### Client / UI behavior changes

#### Checklist

- [ ] Have all affected UI components been identified?
- [ ] Any shared team-owned component changes?
- [ ] If yes to shared team-owned component changes, consider breaking out those shared changes into their own tasks and PRs, so that they can be verified and tested independently of other work. Splitting between tasks means re-testing all shared use cases.
- [ ] Do any Component Library components need to _change_?
- [ ] If yes to base Component Library component changes, **alert the UI Foundation team**.
- [ ] Are there any new components that need to be _added_?
- [ ] Are any of these new components good candidates for the Component Library?
- [ ] If there are new components that may be good candidates for the Component Library, **alert the UI Foundation team**.
- [ ] All new or modified UI components have Storybook stories covering default, loading, error, and edge-case states.

#### Changes required

-

### Background jobs

> _New or changed background jobs (consider scheduling, batch sizing, idempotency, observability)._

#### Changes required

-

## Deployment considerations

### Flagging and environments

#### Checklist

- [ ] Have we confirmed support considerations between cloud and self-hosted?
- [ ] Have we confirmed flagging strategy, or why we can't flag?
- [ ] If feature-flagged, where will this be enforced? What UI/services will be flagged?
- [ ] Does our solution need different behavior for developer environments?

#### Changes required

-

### Observability & operations

> _Logging, metrics, events, alerts. Event log entries this work writes; existing observability that needs to be extended._

#### Changes required

-

## Security

> The security posture of the change. Before this section is complete, security definitions must exist for the areas this work touches; either referenced (existing) or authored (new). If existing SDs will be modified, extended, or broken, call that out explicitly.
>
> **Security Definitions (SDs)** are Bitwarden's formal artifact for communicating security posture: a threat model, security goals, and accepted goal status. Authorization and trust-boundary changes count, not just cryptography. If new SDs are needed, use the `bitwarden-security-tools:threat-modeling` skill to author them.

### Checklist

- [ ] Do the changes affect any of our core security definitions, principles, or requirements?
- [ ] Do existing security definitions cover this area? If yes, list them below. If no, author new SDs and link them.
- [ ] Will any existing security definitions be modified, extended, or broken by the changes? If yes, describe the change.
- [ ] Does this change include cryptography changes, or call cryptography APIs? If yes, which case applies? Name the reviewer(s). These reviews run alongside `## Architecture review screening`; neither one satisfies the other.
  - **Consumption or changes to Key Management's owned crypto interfaces (Bitwarden's cryptography abstractions)** requires a KM review to ensure that the API is being used correctly - whether this is a change by the Key Management team or another team.
  - **External integration crypto** (cryptographic interfaces outside of the Bitwarden product to third-party applications, the OS, or the browser) should act according to a standard. If the team making the changes is unsure, or perceives risk, a crypto SME may be asked for review. Crypto SMEs can be company-internal or external. External engagements are handled by the AppSec team.
  - **Novel cryptographic design not built on an existing Key Management abstraction** (new primitives, envelope formats, key-derivation schemes, key hierarchies, or wire formats) requires Key Management review before implementation. Consider whether external review or a formal security proof is warranted, and record the decision here.

### Security definitions

> _Reference existing SDs by identifier and link. Capture new or modified SDs either inline below (for 1–2) or in a sibling `security-definitions.md` next to `breakdown.md` (for 3+)._

- _SD-N: title; status (existing / new / modified / broken); link_

## Architecture review screening

> _Complete before this breakdown is ready for review. The [Architecture involvement rubric](https://bitwarden.atlassian.net/wiki/spaces/EN/pages/3294724098/Architecture+Involvement+Rubric) holds the tier lists and the screening questions; record the outcome here rather than restating them._
>
> _"None" in both tier rows plus a sentence of reasoning is a complete record. A Tier 1 trigger has no self-certification path, so record it as pending while the review is scheduled and land the outcome before implementation starts._

| Field           | Entry                                                                                 |
| --------------- | ------------------------------------------------------------------------------------- |
| Tier 1 triggers | _which rows apply, or "none"_                                                         |
| Tier 2 answers  | _which questions are yes, or "none"_                                                  |
| Decision        | _"Reviewed", "pending", or "not required" with one line of why review was not needed_ |
| Reference       | _Architecture Council session, Slack thread, or ADR_                                  |

## Cross-team engagement

### Consuming other teams' APIs

#### Checklist

- [ ] Will this use any services outside of the team's domain? Verify the providing team doesn't have significant tech debt or planned changes in that area.
- [ ] Does the consumption require **changes or extensions** to the owning team's API? If yes, add a row to the signoff table.

- _Team — interface — assumed behavior — known constraints / roadmap impact_

### Changes required in other teams' code

#### Checklist

- [ ] Will there be mobile changes required?
- [ ] If yes to mobile changes: make sure they are defined as separate Tasks/Stories in Jira to be moved to the Mobile team. Include the Mobile team in the cross-team signoff.
- [ ] Will this require changes to any components/services/files outside of this team's domain? Ensure that these are already accounted for in related breakdowns. If so, add the team and breakdown to the signoff list. If not, **post on the owning team's public Slack channel to evaluate their impact** before adding them to the signoff list.

- _Team — file/module — change — Jira items_

### Cross-team sequencing & ordering

#### Checklist

- [ ] Will this change be implemented in order to deliver an API/service for another team?
- [ ] If yes to delivering an API/service for another team: consider defining the work such that we can produce the interface first to enable other teams to code against it while we implement it.
- [ ] If yes to delivering an API/service for another team: make sure that the requesting team is consulted to ensure API compatibility after designs are complete and at the PR stage after the implementation is complete.

### Cross-team signoff

All affected teams **must** sign off on the breakdown before it advances from `Proposed` to `Accepted`.

| Team | Interface | Associated breakdown | Signoff |
| ---- | --------- | -------------------- | ------- |
|      |           |                      | ☐       |

### Coordination notes

> _Anything about the cross-team interfaces that isn't obvious from the table. Examples: which team's PR lands first; whether a temporary API stub is needed; whether one team's work needs to land in a feature branch; collisions surfaced by the in-flight scan and how the sequencing accounts for them._

-

# Testing strategy

## Checklist

- [ ] Are all changes covered by unit and integration tests, including edge cases?
- [ ] Is all UI component testing covered by Storybook stories (default, loading, error, edge cases)?

## Coverage and gaps

-

# Tasks

For task-level breakdown of the work, use a separate `tasks.md` file in the same folder as the `breakdown.md`.

-

# Agent Context

> Context for AI assistants working on tickets carved from this breakdown. The breakdown itself is largely self-contained; the items below are pointers to existing code and external references that supplement the inline spec.

### Checklist

- [ ] Repos affected listed with `CLAUDE.md` pointers
- [ ] Existing patterns to follow listed with concrete file paths
- [ ] Counter-intuitive assumptions flagged for agents

### Repos affected

> _List each repo that will be touched, with a pointer to its `CLAUDE.md` file. Per the repo `CLAUDE.md` convention, each affected repo's `CLAUDE.md` should point agents back to this breakdown._

- `repo-name` — _role in this work_. `CLAUDE.md` at `repo-name/CLAUDE.md`.

### Existing patterns to follow

> _Concrete pointers to existing code or modules that establish the pattern this work should mirror. Avoid vague references; an agent should be able to navigate from this list directly to the relevant file._

- **Pattern name** — _file path_; _what to mirror_.

### External references

> _Standards, RFCs, third-party docs, prior ADRs. Each item should be load-bearing for some decision above; if it isn't, leave it out._

- _Reference — what decision it supports_

### Things an agent should not assume

> _Counter-intuitive constraints, defaults that look obvious but aren't, or invariants that an agent might violate by following standard patterns. This list is the single highest-leverage section for preventing wrong-shaped AI-generated code._

- _Assumption that would be wrong — what to do instead_
