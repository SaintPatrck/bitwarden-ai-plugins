# Evaluation lenses

## How to apply

Apply every lens against the finished breakdown, in order. For each finding, cite `file:line`, name the specific problem, and propose a concrete fix. Group findings by lens.

If a lens genuinely has nothing to flag for a given change (e.g. Reversibility against a stateless UI-polish change), say so explicitly under the lens heading rather than skipping. This keeps the review complete and makes deliberate no-op findings visible.

Findings are not blockers. Mechanical fixes apply in-place; findings that require an engineer decision get surfaced in chat before saving. The engineer decides whether to address, defer, or note-and-proceed.

## The lenses

### 1. Security lens (adversarial)

- **Question it asks:** Where can an attacker interpose? Are trust boundaries explicit? Are secrets, keys, and tokens handled per Bitwarden's zero-knowledge invariants? What data crosses which boundary, and with what integrity guarantees?
- **What it catches:** An architecture that doesn't survive an adversarial read: implicit trust assumptions, downgrade paths, oracle exposures, boundary crossings not covered by a Security Definition that allows it.
- **Apply when:** the change touches authentication, authorization, encryption, key handling, secret storage, trust boundaries, cross-origin flows, or any client/server data crossing.

### 2. Failure-mode lens

- **Question it asks:** What breaks when? Partial deploy across clients and server; network partition; race conditions; retry storms; feature flag stuck on or stuck off; migration half-applied. For each, what's the user-visible blast radius, and does the Plan mitigate or just tolerate?
- **What it catches:** Happy-path designs that don't address the ways the system can be in a broken state.
- **Apply when:** the change introduces new state, new sync paths, new retries, feature-flagged behavior, or any user-visible action that can fail mid-flow.

### 3. Gap-analysis lens

- **Question it asks:** For each Spec requirement, name the Plan section that implements it. Then: what assumptions is the Plan load-bearing on that aren't stated?
- **What it catches:** Spec-to-Plan coverage gaps plus the harder case: unstated assumptions about client versions, server release timing, adjacent-team API stability, browser API availability.
- **Apply when:** the change has dependencies on external state (other teams' APIs, prior enrollment, prior data), or when the Spec is dense enough that mechanical coverage is not enough.

### 4. Reversibility lens

- **Question it asks:** Can this ship be undone cleanly? What's one-way once it lands? What data is stranded on rollback? Is there a rollback runbook, or an assertion that "we can revert the deploy"?
- **What it catches:** Rollback plans that only account for code (flip the flag; revert the deploy) and ignore data, published contracts, and user-visible state.
- **Apply when:** the change introduces migrations, schema changes, published API shapes, external SDK contracts, or persistent client-side state.

### 5. Complexity / YAGNI lens

- **Question it asks:** Is the Plan the simplest thing that meets the Spec? Which pieces would you cut if the deadline halved? Which abstractions exist because they're needed vs. because they seemed nice?
- **What it catches:** State machines with unreachable states; abstractions designed for features that aren't in the Spec; layer-cake designs that reflect the drafter's mental model rather than the Spec's requirements.
- **Apply when:** the Plan introduces new abstractions, services, state machines, or extension points.

### 6. Alternatives-considered lens

- **Question it asks:** Did the Specification honestly steel-man 2 or 3 alternatives, and does the Architecture chosen in the Plan reject each with cited constraints — or is this a single-path Plan with strawman rejections?
- **What it catches:** `## Alternatives` entries that name options but reject each in one sentence with no cited constraint, and rejection reasons that would flip under mild questioning.
- **Apply when:** the Spec has an `## Alternatives` subsection (which is where alternatives live in the breakdown; the Architecture in the Plan is where the picked candidate justifies rejecting each). Always apply this lens on any breakdown where the Spec `## Alternatives` subsection has been filled.

### 7. Test coverage lens

- **Question it asks:** Does the Testing strategy give a reader confidence the change works and stays working? Are the load-bearing behaviors covered at a level where automated testing would capture it? Are the failure modes named by the Failure-mode lens each mapped to a specific test that would catch them? Are the tests appropriately organized across unit, integration, and E2E tests to best capture failures early and consistently? Where does existing coverage in the touched code stand, and does this change leave it better, worse, or the same?
- **What it catches:** Testing strategies that list layers (unit / integration / e2e) without naming which behaviors each layer verifies; missing coverage for identified failure modes; changes to under-tested code that don't add coverage as part of the work; reliance on manual QA where automated tests are practical.
- **Apply when:** always.

### 8. API contract lens

- **Question it asks:** For each existing interface the change touches — HTTP endpoints, SDK APIs, IPC or message contracts, database schemas consumed by another service, published event shapes — what compatibility does the change preserve, and what does it break? Cover the success contract and the error contract: which error codes, status codes, exception types, and error payload shapes callers already handle, and which the change adds, removes, renames, or repurposes. For each break, which consumers are affected, and is there a coordinated path (versioning, deprecation window, feature flag, cross-team sync) or is the break unmanaged?
- **What it catches:** Silent breaking changes to interfaces other code depends on; renames or reshapes framed as "cleanup" without accounting for downstream callers; version-skew windows where old clients hit a new server (or vice versa) and get undefined behavior; schema migrations that assume a synchronous cutover the deployment topology cannot deliver; error-contract drift — new error codes callers won't recognize, existing codes returned under new conditions, error payloads reshaped so caller error-handling silently falls through to a generic branch, or thrown exception types changed such that existing `catch` clauses no longer match.
- **Apply when:** the change modifies existing interfaces rather than introducing net-new ones. Skip for pure greenfield work where nothing consumes the interface yet.
