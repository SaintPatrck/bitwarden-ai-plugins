# Writing quality

Rules for prose written into a Bitwarden Tech Breakdown (breakdown Spec, breakdown Plan, task decomposition). These are guardrails at drafting time and a checklist at review time: Claude should not write these patterns in the first place, and when they slip through, the review pass catches and fixes them.

## When to apply

- **While drafting.** Every rule below is a guardrail. Do not write text that violates a rule and plan to fix it later; write it right the first time. Drafting-time application is where most of the value comes from because the LLM-tell patterns are habitual; catching them before they land keeps the document tight from the start.
- **As a review pass.** Before presenting a section to the engineer for review, grep the file for the specific markers and rewrite each hit. Mechanical fixes apply in-place. Structural rewrites (sentence bloat, passive-voice with genuinely unclear actor) surface to the engineer for approval before saving.

Report findings with `file:line`, current phrasing, and proposed rewrite. Group by rule name.

## The rules

Ordered by rule granularity, from easiest to grep to hardest to spot. Every rule is non-negotiable.

### LLM-tell phrases

Grep for each. Cut when possible; replace with the shorter form when not.

| Phrase                                                                        | Cut or replace with                                                            |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| _It's worth noting that_, _It should be noted that_, _Importantly_, _Notably_ | Cut. If the sentence needs the emphasis, restructure so the point lands first. |
| _This ensures that X_                                                         | _X_                                                                            |
| _In order to X_                                                               | _To X_                                                                         |
| _leverages_, _utilizes_                                                       | _uses_                                                                         |
| _provides the ability to X_                                                   | _lets you X_                                                                   |
| _makes use of_                                                                | _uses_                                                                         |
| _is responsible for X-ing_                                                    | _X's_                                                                          |
| _robust_, _comprehensive_, _seamless_, _cutting-edge_                         | Cut. These are meaningless in a technical document.                            |
| _facilitates_, _enables_                                                      | Prefer the concrete verb.                                                      |
| _a wide variety of_, _a range of_                                             | Name the specifics or cut.                                                     |
| _at this point in time_, _at the present time_                                | _now_                                                                          |
| _in the process of X-ing_                                                     | _X-ing_                                                                        |
| _due to the fact that_                                                        | _because_                                                                      |
| _in the event that_                                                           | _if_                                                                           |
| _for the purpose of X-ing_                                                    | _to X_                                                                         |

### Vague-jargon nouns

Grep for and replace with the specific thing meant:

| Term                 | Replace with                                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------------- |
| _seam_               | Name what it actually is: _interface_, _boundary_, _contract_, _abstraction_, or _coupling point_.              |
| _fracture plane_     | _split point_, _decomposition boundary_, or name where the actual split happens.                                |
| _axis of separation_ | Name the dimension the split is along: _by responsibility_, _by team ownership_, _by data lifetime_, and so on. |
| _paved path_         | _supported approach_, _recommended way_, or name the actual mechanism.                                          |

These sound technical but leave the reader guessing. If the specific noun is right, use it; if you can't pick one, the sentence probably isn't saying what you think it is.

### Filler qualifiers

Grep for and cut: _essentially_, _arguably_, _generally_, _typically_, _usually_, _often_, _quite_, _very_, _significantly_, _somewhat_, _fairly_, _rather_, _simply_, _just_, _genuinely_.

Rule: if the qualifier is load-bearing, replace it with a concrete number or constraint. If it isn't, cut it. _"significantly faster"_ becomes either _"3x faster"_ or _"faster"_.

### Vague quantifiers where specifics exist

Grep for: _various_, _several_, _a number of_, _many_, _multiple_, _some_.

Rule: if the count is knowable, name it. _"touches several client surfaces"_ becomes _"touches three client surfaces: extension, desktop, and mobile"_.

### Redundant qualifiers

Cut the qualifier:

- _advance planning_ → _planning_
- _final outcome_ → _outcome_
- _end result_ → _result_
- _future plans_ → _plans_
- _past history_ → _history_
- _unexpected surprise_ → _surprise_
- _added bonus_ → _bonus_
- _close proximity_ → _proximity_
- _completely eliminate_ → _eliminate_

### Nominalization (verbs hidden as nouns)

Restore the verb:

- _make an evaluation of X_ → _evaluate X_
- _perform a review_ → _review_
- _conduct an analysis_ → _analyze_
- _provide an explanation_ → _explain_
- _carry out an investigation_ → _investigate_
- _reach a decision_ → _decide_
- _give consideration to_ → _consider_

Nominalization turns strong verbs into weak noun phrases and inflates sentences.

### Passive-voice dilution of responsibility

Passive constructions hide who acts. In a technical document, reviewers need to know which component does what.

- Wrong: _"The migration is performed by the system."_
- Right: _"The billing service runs the migration."_

Grep for _"is performed"_, _"is executed"_, _"is handled"_, _"is processed"_, _"was decided"_, _"has been implemented"_. Each is a candidate for rewrite. Passive is correct only when the actor is genuinely unknown or irrelevant; that case is rare in a breakdown.

### No em-dash as substitute punctuation

Do not use `—` or `--` as a catch-all substitute for real punctuation. Use the mark that fits the grammatical relationship:

- Elaboration or introducing a list: colon.
- Joining two independent clauses: period or semicolon.
- Parenthetical aside: parentheses or commas.
- Abrupt interruption in dialogue: em-dash is correct; leave it.

Multiple em-dashes in a single sentence is always wrong. Grep for `—` and standalone `--` in prose; rewrite each occurrence per the relationship above.

This rule applies to prose sentences. Structured list rows that use `—` as a field separator (the `Team — interface — …` shapes in `${CLAUDE_PLUGIN_ROOT}/templates/breakdown.md`) are not prose; leave them.

### No parenthetical clarifying lists

Do not put comma-separated clarifying lists inside parentheses. Use a separate sentence, a colon with a list, or restructure.

- Wrong: _"The migration touches four surfaces (server, extension, web, desktop) and adds two events."_
- Right: _"The migration touches four surfaces: server, extension, web, and desktop. It also adds two events."_

### No comma-delimited justifications

Do not string multiple short clauses or items together with commas to reinforce a point. Pick one construction: a single sentence, a colon with a bullet list, or a restructured paragraph.

- Wrong: _"There is no separate fetch, no cache, no propagation window, no retry."_
- Right: _"The path has none of the usual sync scaffolding:_
  - _no separate fetch_
  - _no cache_
  - _no propagation window_
  - _no retry"_

### Bulleted for scannability

Any list of three or more items renders as a bullet list, not a comma-run-on inside a paragraph. Two items may stay inline; three or more break out.

- Wrong: _"The client emits `attempt`, `success`, `fallback`, and `error` events."_
- Right:

  The client emits four events:
  - `attempt`
  - `success`
  - `fallback`
  - `error`

### Verbosity and sentence bloat

A sentence that chains three or more clauses with commas usually should be two or three sentences. A cold reader skims and misses the load-bearing clause when it sits in the middle of a comma chain.

Rewrite pattern: identify the main verb of each clause; split each into its own sentence; drop connective filler.

Cut the fluff and overly wordy speech. Each word MUST earn its keep.

### Empty affirmations

Do not restate a point for emphasis. Every sentence must earn its place by adding content: a new fact, a constraint, a tradeoff, a boundary. A sentence that only re-asserts what the previous sentence already established is cruft.

- Wrong: _"The interface between the client and server is stable enough to code against. The interface is real."_
- Wrong: _"After weighing the two options, we're going with the coordinator pattern. The path has been decided."_
- Right: cut the trailing sentence.

Common patterns to grep for and cut:

- _"X is real."_
- _"The path has been decided."_ / _"The choice is deliberate."_
- _"This is intentional."_
- _"That's the point."_ / _"That's the whole point."_
- _"The tradeoff is clear."_ / _"The tradeoff is real."_
- _"This matters."_ / _"This is important."_

If a point genuinely needs emphasis, restructure the preceding sentence to land the emphasis in the main clause; do not append a coda.

### Self-contained context

A reviewer coming in cold must gain enough context from the document itself. Do not lean on _"as discussed"_, _"per the ticket"_, _"per Slack"_, _"per the meeting"_, _"as agreed"_, _"as decided"_ without an inline one-sentence summary of the decision and a link to the source.

Grep the file for those phrases. Each hit is a finding.

### No duplication

Say each thing once, in the section where it naturally lives. Cross-reference (`§Section`) from elsewhere. If a fact appears in two places, one is the source and the other is a link.

Duplication inflates the document and lets copies drift out of sync when the source changes and its copies do not. Watch especially for the same **claim** asserted in two sections' prose — a decision restated in Architecture and again in Deployment, a constraint named in Current State and again in Security. Pick one home; link from the other.

### Dangling references

A reviewer-ready document has no pointer to something that no longer exists. Grep for every reference in prose and verify each still resolves at the location cited.

- `§Section` cross-references — verify the target section still exists with that name.
- File paths — `path/to/file.ts`, `src/foo/bar.rs` — verify the path resolves in the repo where the breakdown says it lives.
- Type, module, function, and interface names — verify each is still spelled that way in the code being referenced.
- Feature-flag literals — verify the flag still exists in `FeatureFlag.<Name>` form in the flag registry.
- Jira keys — verify each `PM-XXXXX` is a real key, not a placeholder.
- Sibling artifacts — a mention of `worked-examples.md`, `security-definitions.md`, or `<name>-contract.md` must correspond to a file that exists next to the breakdown, or to a decision recorded to create it.

Rename drift and deleted-section pointers are the two most common failure modes. Rewrite each hit to point at the current name and location, or remove the reference if the target is gone and no longer relevant.

### Placeholder markers

A reviewer-ready document has no unresolved authoring shorthand. Grep for and rewrite each hit — either into concrete content, folded into the row whose behavior it belongs to, or replaced with `N/A: <reason>`.

- Literal `TBD`, `TODO`, `FIXME`, `XXX`.
- Deferral phrases: `decide later`, `figure out during implementation`, `to be determined`, `TBD later`.
- Unbounded gestures: `as needed`, `handle edge cases`, `various edge cases` — unless the set is named.
- Naked references: `wire up existing service`, `use the existing X` — where the service, module, or type is not named.
- Bare `-` bullets (empty list items) under any `#### Changes required` heading — either fill the row, remove it, or replace with `N/A: <reason>`.

### Name consistency

An interface, type, module, file path, or feature-flag literal named more than once must be spelled identically in every occurrence. Grep for each named identifier's first mention and confirm every subsequent mention matches. Fix drift in place; do not surface stylistic variants for engineer decision.

- Wrong: `FeatureFlag.KeyRotation` in Architecture, `FeatureFlag.key-rotation` in Deployment, `KeyRotation flag` in Security.
- Right: one spelling, chosen deliberately, repeated wherever the identifier appears.
