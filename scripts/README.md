# scripts/

## validate-references.js

CI gate for the marketplace's reference integrity, run by `.github/workflows/validate-ai.yml`
on every PR. Checks:

1. No two plugins own a skill of the same name, since a duplicate makes every bare
   `Skill(name)` reference to it ambiguous.
2. Every `Skill(...)` invocation across every `.md` file in `plugins/` (excluding
   `CHANGELOG.md`, which narrates historical/renamed state on purpose) and every
   `dependencies[]` entry in every `plugin.json` resolves to something real.
3. Every reference that crosses a plugin boundary is fully qualified
   (`Skill(plugin:skill)`), never a bare `Skill(skill)` naming another plugin's skill.
4. Every role bundle listed in the root `README.md`'s `## Role bundles` table holds no
   `skills/`, `agents/`, or `commands/` directory (rule 2).
5. Every `subagent_type: "plugin:agent"` dispatch and every `agent:` frontmatter value
   names an agent that plugin's `plugin.json` `agents` field actually declares (matched
   by the agent file's own frontmatter `name:`, not by path or filename).

Plugin namespaces this marketplace doesn't register itself, such as `aikido` (Aikido
Security's own plugin, installed from `claude-plugins-official`), resolve as external for
both checks 2 and 5 instead of failing or needing a baseline entry.

Run it locally with:

```bash
node scripts/validate-references.js
```

No dependencies beyond Node itself.

### `validate-references.baseline`

Check 3 findings that predate this migration, in plugins the migration didn't touch, are
listed here (one `<file>:<line>:Skill(<name>)` per line) so the gate doesn't fail on debt
it isn't this PR's job to fix. Don't add new entries for plugins that were touched by the
migration — fix those references instead. Check 5 reads the same file and would honor an
`<file>:<line>:agent(<plugin>:<agent>)` entry the same way, for pre-existing agent-dispatch
debt.
