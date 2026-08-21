# Tasks

> **Sizing nudge.** Aim for **fewer than 10 tasks** as a healthy range; refinement can absorb that without too much delay between breakdown and implementation, and a release date is predictable. When you reach **10 or more tasks**, look for natural split points such as sequential phases or independently-shippable subsets and consider splitting; the mental model for the work may become too large for human or agent context.

> _For each task, include:_

- **Task**: _title describing the task_
- **Owner**: _what team is doing the work_
- **Affected files / crates / modules**:
  - `path/to/file.ext`
  - `crates/<crate-name>`
- **Blocked by**: Task M, PM-XXXXX (outside of this breakdown) _prior tasks or external dependencies that must land first_
- **Depends on**: Task K _parallel work whose interface must exist (but not necessarily land first)_
- **Description**: _One sentence describing the purpose of this work._
- **Acceptance Criteria**: _In GIVEN/WHEN/THEN format._
- **QA Testing Notes**: _Any manual testing considerations outside of validating the Acceptance Criteria._
- **Tech Breakdown**: _Actual code, not prose - whatever the engineer will literally write or modify. Use fenced code blocks tagged with the right language. If the change is purely a rename or a config flip, show the before-and-after. If the particular code change shape or reason is not obvious, include a sentence explaining why._

```diff

```
