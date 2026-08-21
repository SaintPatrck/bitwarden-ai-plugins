# Impact across areas

Walks every technical area the change touches, producing the concrete file and module list that downstream activities depend on. The in-flight scan and the cross-team impact identification both act on that list, so vague or incomplete area descriptions here propagate downstream.

_Captured in **Plan → Changes by area**._

## Walk the template

Walk every area under `## Changes by area` in the breakdown template. Use the checklist in each section of the breakdown template to ensure that all potential impacts on an area are addressed.

## Draft as a single pass

Draft the full `Changes by area` content in chat as a single pass. For each area, either name the concrete impact or mark `N/A: <reason>`.

Present the pass to the engineer, refine based on their response, then save. If the engineer wants to iterate on a specific subsection, do so on request; do not run a per-subsection approval loop by default.

## Be specific

Be specific in the impact descriptions and address the checklist items in each area. This is where the concrete file and module list emerges.

## Audit before proposing changes to shared types

Before naming a change to any shared data model — an entity, DTO, request/response model, or public contract — grep every usage across `src/` and `test/` in each affected repo. Enumerate every consumer as an affected file; do not stop at the file where the change originates.

- Grep for the type name, not just the property being added or removed. Constructor changes propagate silently.
- Read the tests, not just the source. Pre-existing tests that were not opened this session are the most common regression vector when a shared type shifts.
- If a consumer is in another team's code, the change also becomes a Cross-team engagement finding — surface it in Activity 6.

An affected-files list that omits a consumer produces a task that will miss it. Rationale: modifying a shared model without listing every consumer has caused pre-existing tests to break at implementation because they were never on the drafter's radar.

## Trace call sites when the work mirrors an existing feature

If the change is parity work — mirroring an existing feature to produce a new one (a new resource type that follows the shape of Send, a new event category that follows the shape of an existing category) — do not stop at structural components. Enumerate the parity source's public members and grep every call site of each. For each call site, name the new equivalent that must be wired in.

- Structural components alone (interfaces, controllers, models) will not produce a working feature. Missing wire-ups are the parity-work failure mode.
- The output of this step is a per-call-site row in the affected-files list, not a general "mirror the Send feature" bullet.

Rationale: infrastructure created without walking the parity source's callers has shipped structurally complete but functionally silent — methods existed, no one called them.
