# scripts/

## validate-references.js

CI gate for the marketplace's reference integrity, run by `.github/workflows/validate-ai.yml`
on every PR. Checks:

1. Every `Skill(...)` invocation across every `.md` file in `plugins/` (excluding
   `CHANGELOG.md`, which narrates historical/renamed state on purpose) and every
   `dependencies[]` entry in every `plugin.json` resolves to something real.
2. Every reference that crosses a plugin boundary is fully qualified
   (`Skill(plugin:skill)`), never a bare `Skill(skill)` naming another plugin's skill.
3. Every role bundle listed in the root `README.md`'s `## Role bundles` table holds no
   `skills/`, `agents/`, or `commands/` directory (rule 2).

Run it locally with:

```bash
node scripts/validate-references.js
```

No dependencies beyond Node itself.

### `validate-references.baseline`

Check 2 findings that predate this migration, in plugins the migration didn't touch, are
listed here (one `<file>:<line>:Skill(<name>)` per line) so the gate doesn't fail on debt
it isn't this PR's job to fix. Don't add new entries for plugins that were touched by the
migration — fix those references instead.

### Dropped: agent-dispatch-by-subagent-type check

The task brief for this gate also asked for a best-effort check of prose like
``the `plugin-name:agent-name` subagent type``, resolving the same way as `Skill()`
references. Investigated and dropped: the only pattern matches found anywhere in the
current tree are `` `plugin-dev:skill-reviewer` subagent type `` references, and
`plugin-dev` is a legitimate external plugin that isn't (and shouldn't be) registered in
this marketplace. A resolver would flag every one of them as a false positive and catch
zero real issues, so this check isn't implemented.
