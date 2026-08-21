# Architecture

Architecture is the most critical part of the Plan. Downstream sections cannot draft without it, and if the architecture changes later, they all need revisiting. This is why the SKILL.md HARD-GATE requires architecture approval before any other Plan content lands in the file.

"This change is too small to need architecture" is not an acceptable exit. Every Plan gets an Architecture subsection. It can be short for genuinely small changes, but you present it, get engineer approval, and save it before drafting the rest of the Plan.

## Ground before proposing

Before generating candidate architectures, read the code the change actually touches. Grep for the components named in the Spec; open the files. State briefly what you read: module names, key interfaces, existing patterns, current data shapes. Candidates drafted without opening any file produce plausible-sounding fiction that survives until implementation.

The findings from this grounding pass are the source content for the `## Current State` subsection of the Plan; keep them in a form you can save verbatim once the engineer picks a candidate.

Follow existing patterns in the codebase. Where existing code has problems that affect this work, include a targeted improvement in the candidate.

## Load Bitwarden context

Invoke two skills before proposing candidates:

- `Skill(bitwarden-architecture-tools:architecting-solutions)`. Covers architectural judgment and Bitwarden-specific constraints a candidate architecture must survive.
- `Skill(bitwarden-security-tools:bitwarden-security-context)`. Loads security principles, trust boundaries, and data classification standards.

If either is unavailable, stop and ask the engineer to install the owning plugin; neither is skippable.

## Reconcile with product and design specs

Product Requirements Documents (PRDs), Figma mockups, ADRs, and wire-format specs linked from the Spec section are the source of truth for user-visible behavior, display formats, identifiers, and protocol shape. Read every linked spec before proposing candidate architectures. If a linked spec cannot be fetched (the `bitwarden-atlassian-tools` plugin is not installed, or the source is a Figma/Slack/etc. artifact this skill cannot reach), ask the engineer to paste the relevant requirement before proposing candidates; do not proceed on the description alone.

If a candidate would contradict a linked spec — different display format, different identifier surfaced to the user, different wire shape, different visible behavior — flag the conflict inline when presenting the candidate. Cite the spec by name and quote the specific requirement.

If the engineer directs an approach that diverges from a linked spec, surface the divergence and the spec citation before drafting. If the divergence is intentional, add a row to the Clarifications Log noting that the spec needs to be amended, with the spec owner as the Clarifications Log owner.

Rationale: implementations that quietly diverged from a spec have required full reverts once the spec conflict was noticed. Catching the conflict during architecture is cheap; catching it after implementation is not.

## Evaluate the `sdk-internal` boundary for client-side changes

For changes that touch client-side code carrying business logic, decide where the `sdk-internal` boundary should sit for this change before proposing candidates. `sdk-internal` is Bitwarden's long-term home for client-side business logic, but existing client-side logic may be represented entirely outside of the shared SDK; the question at architecture time is which portion of the change and adjacent existing logic belongs on the SDK side of the boundary now.

Weigh two positions honestly:

- **Move the boundary now.** Place the new logic in `sdk-internal`, and port adjacent existing client-side logic that would otherwise straddle the boundary. Adds porting scope and cross-client validation; pays down the client-side surface.
- **Leave the boundary where it is.** Keep the logic client-side for this change. Reasonable when the adjacent client-side surface is too large to move under this change's scope, or the change is too small on its own to justify a port.

The finding shapes candidate generation: each candidate should place the boundary consistent with what you evaluated here. If the change has no business logic on the client side, record that and move on.

## Establish tech debt landscape

Ask the engineer if there are opportunities to eliminate technical debt in the areas being addressed with this change. Cover two kinds of debt:

- **Local debt.** `TODO`s, obvious anti-patterns, dead branches, duplicated logic in the files this change touches. If you see obvious signs, call them out as suggestions.
- **Interface and contract debt.** Whether the interfaces and cross-team contracts this change touches are shaped for the work ahead, or whether the change is routing around them. If the engineer is routing around a bad shape, the fix belongs in Architecture as a "refactor first" candidate (see below), not as a follow-up.

Findings from this pass feed candidate generation: they can motivate a "refactor first" candidate, a candidate that moves the `sdk-internal` boundary, or a targeted improvement folded into a mainline candidate. Document the outcome in `### Tech Debt` when Architecture is saved. `N/A: <reason>` is a valid answer.

## Present candidate architectures

Propose 2 or 3 candidate architectures in chat with tradeoffs. For each, state:

- **Mental-model choice.** The differentiating technical consideration it picks, e.g. new service vs. extending an existing one.
- **Spec requirement it optimizes for.** Which specific Spec item this candidate is chosen to serve well.
- **Location / layer.** Where the code lives: `sdk-internal`, server, or client application. For client-side changes that touch business logic, the candidate must reflect the boundary finding from the `sdk-internal` boundary evaluation above.
- **Interfaces touched.** Which existing interfaces it introduces, changes, or breaks. Name types and signatures where they are load-bearing.
- **Surface the tradeoffs.** Under what assumptions or external considerations is one better than another?
- **Tech debt load.** Does this change add tech debt?

Name the one you would recommend and why. Wait for the engineer to pick or push back before writing anything to the file.

### Include a "refactor first" candidate when the interface fights the change

If the grounding pass shows the existing interfaces or cross-team contracts are shaped wrong for the work ahead, one of the candidates must be **refactor the interface first, then apply the change.** Contrast it with **work within the current contract** so the engineer chooses deliberately.

Signals that this candidate belongs on the table:

- The change requires threading new parameters through call sites that already carry too many.
- A cross-team contract leaks internals the caller now has to special-case.
- The natural place for the new behavior is behind an interface the current shape does not admit.
- The same friction has produced repeated workarounds in prior changes to this area.

Frame the tradeoff honestly: refactoring first adds scope and cross-team coordination now, in exchange for a change that lands cleanly and does not compound the friction for the next caller. Do not default to refactoring; propose it as a candidate the engineer picks against a documented alternative.

## Refuse to commit if the tradeoff is not real

If you cannot articulate a genuine tradeoff between two candidates, do not fabricate a differentiator. Say so and stop. Two signals to watch for:

- **Both are valid, but you're pushing for a pick.** Different deployments or scale points would rationally pick different candidates. Surface this tension and why to the engineer.
- **You wrote "we need to pick one" with no reason.** Only resolve when one of these applies:
  - prohibitive cost to preserve both
  - one-way door: the choice locks the architecture
  - fundamental conflict: the candidates cannot coexist
  - clear technical superiority for this specific context

## Draft the Architecture subsection

Once one is picked, draft the subsection in chat, refine with the engineer, then save. In the same save, populate the `## Current State` subsection from the grounding-pass findings above (file paths, existing types, current behavior, current data shapes). Architecture and Current State are the two subsections saved together at this checkpoint; nothing else in the Plan is drafted yet.

YAGNI ruthlessly: strip anything not required by the Spec before saving.

The Architecture must tell a coherent, concise story about why the changes are needed and how they work together to meet the Spec. Before saving, the draft passes:

1. **State the visible change first.** Name what changes for a user or another team before describing how it's built.
2. **Traceable to Spec.** Every architectural decision maps back to a Spec requirement.
3. **Units of clear purpose.** Each component has one clear responsibility, a documented interface, and dependencies you can name. A reader can understand what a component does without reading its internals.
4. **Failure surface acknowledged.** What breaks if this fails, what depends on it, what is stranded on rollback.
5. **Rejections argued.** The other candidates are rejected with a cited constraint, not "less clean" or "not what we do."

## Extract reference detail to companion files

Some detail belongs alongside the breakdown, not inside it.

Extract when the Architecture subsection would grow large because of one of these:

- **Worked examples.** Full input/output payloads tracing a scenario end-to-end (JSON blocks, request/response pairs, before/after states). Destination: `worked-examples.md`.
- **Wire-format schemas or contracts.** Field-by-field type definitions, metadata conventions, protocol specs a peer team or downstream ticket will code against. Destination: `<name>-contract.md`
- **Long enumerations of reference material.** Per-surface flow diagrams, per-catalog-entry mappings, or per-endpoint-shape breakdowns that exceed a few lines. Destination: a purpose-named `.md` file.

The Architecture subsection keeps the shape and links to the companion in one sentence: what the companion contains and why the reader would open it. Do not duplicate content between `breakdown.md` and its companions; if a fact appears in both, one is the source and the other is a cross-reference.

When you create a companion, add it to the Spec front-matter's `**Companion artifacts:**` block so downstream readers find it. If that block does not exist yet, create it above the Status block. Companions live in the same folder as `breakdown.md`.

## Scope boundaries

Under Architecture, use the `### Out of Scope` and `### Known Limitations` subsections to explicitly define the key parts of the boundary between what this solution delivers and what it does not.

- **`Out of Scope`** — what this work explicitly does not deliver. Use this to short-circuit drift: if a question comes up later, the answer is "out of scope, tracked under X" or "out of scope, not pursued." Populate from Spec items the picked architecture defers, adjacent capabilities the engineer explicitly ruled out, and follow-on work surfaced by the grounding pass but not chosen. One bullet per exclusion; name the tracker (Jira key, later breakdown) if any.
- **`### Known Limitations`** — in-scope-but-deferred decisions. Distinct from Out of Scope: these are constraints inside what we're shipping, not exclusions. Populate from tradeoffs the picked architecture accepts, capabilities the design intentionally leaves incomplete, and any behavior gaps that the Spec's Success Criteria don't require closing. Use the template's shape: `Limitation — rationale — what follow-up addresses it (if any).`

## Recap and hand off

Recap what was saved and ask _"Ready to move on to impact across areas?"_
