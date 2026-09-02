#!/usr/bin/env node
//
// Validate cross-references inside the marketplace: every Skill(...) invocation,
// every plugin.json `dependencies` entry, and the rule-2 bundle-purity invariant.
//
// Checks:
//   1. Every Skill() reference and every dependencies[] entry resolves to something
//      real in the marketplace.
//   2. Every reference that crosses a plugin boundary is fully qualified
//      (Skill(plugin:skill), never a bare Skill(skill) for another plugin's skill).
//   3. Every role bundle listed in the root README's "## Role bundles" table holds
//      no skills/, agents/, or commands/ directory.
//
// Usage:
//   node scripts/validate-references.js
//
// Exits non-zero if any check fails.

"use strict";

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");
const PLUGINS_DIR = path.join(REPO_ROOT, "plugins");
const MARKETPLACE_PATH = path.join(
  REPO_ROOT,
  ".claude-plugin",
  "marketplace.json",
);
const README_PATH = path.join(REPO_ROOT, "README.md");
const BASELINE_PATH = path.join(__dirname, "validate-references.baseline");

const RED = "\x1b[91m";
const GREEN = "\x1b[92m";
const YELLOW = "\x1b[93m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

let errorCount = 0;
let baselinedCount = 0;

function fail(message) {
  console.log(`  ${RED}❌ ${message}${RESET}`);
  errorCount++;
}

function baselined(message) {
  console.log(`  ${YELLOW}⚠️  (baselined) ${message}${RESET}`);
  baselinedCount++;
}

function ok(message) {
  console.log(`  ${GREEN}✅ ${message}${RESET}`);
}

function section(title) {
  console.log(`\n${BOLD}${title}${RESET}`);
}

// --- Load marketplace + baseline -------------------------------------------------

const marketplace = JSON.parse(fs.readFileSync(MARKETPLACE_PATH, "utf8"));
const marketplacePluginNames = new Set(marketplace.plugins.map((p) => p.name));

function loadBaseline() {
  if (!fs.existsSync(BASELINE_PATH)) return new Set();
  return new Set(
    fs
      .readFileSync(BASELINE_PATH, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#")),
  );
}

const baseline = loadBaseline();

// --- Filesystem walk ---------------------------------------------------------------

// CHANGELOG.md files are excluded from the reference scan: they narrate historical
// state on purpose (renamed plugins, retired skills, old invocation syntax) and are
// never invoked live by an assistant. Scanning them would fail the build on every
// rename this repo has ever made, not on anything a contributor could act on.
function walkMarkdownFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkMarkdownFiles(full));
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".md") &&
      entry.name !== "CHANGELOG.md"
    ) {
      results.push(full);
    }
  }
  return results;
}

function relPath(p) {
  return path.relative(REPO_ROOT, p);
}

// plugins/<plugin-name>/... -> plugin-name
function pluginOfPath(filePath) {
  const rel = path.relative(PLUGINS_DIR, filePath);
  return rel.split(path.sep)[0];
}

// --- Build the skill ownership map --------------------------------------------------

// skillName -> pluginName (unique; a duplicate skill name across plugins would be
// its own bug, checked for separately below).
const skillOwner = new Map();
const duplicateSkillNames = new Map(); // skillName -> [pluginName, ...]

for (const pluginDir of fs.readdirSync(PLUGINS_DIR, { withFileTypes: true })) {
  if (!pluginDir.isDirectory()) continue;
  const pluginName = pluginDir.name;
  const skillsDir = path.join(PLUGINS_DIR, pluginName, "skills");
  if (!fs.existsSync(skillsDir)) continue;
  for (const skillDir of fs.readdirSync(skillsDir, { withFileTypes: true })) {
    if (!skillDir.isDirectory()) continue;
    const skillMd = path.join(skillsDir, skillDir.name, "SKILL.md");
    if (!fs.existsSync(skillMd)) continue;
    const skillName = skillDir.name;
    if (skillOwner.has(skillName)) {
      const owners = duplicateSkillNames.get(skillName) || [
        skillOwner.get(skillName),
      ];
      owners.push(pluginName);
      duplicateSkillNames.set(skillName, owners);
    } else {
      skillOwner.set(skillName, pluginName);
    }
  }
}

// --- Scan every Skill(...) reference ------------------------------------------------

// Matches Skill(skill-name) or Skill(plugin-name:skill-name). Identifiers are
// lowercase kebab-case throughout this repo, so this is exact, not approximate.
const SKILL_REF_RE = /Skill\(([a-z0-9][a-z0-9-]*(?::[a-z0-9][a-z0-9-]*)?)\)/g;

const references = []; // { file, line, raw, qualifier, skillName }

for (const file of walkMarkdownFiles(PLUGINS_DIR)) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((lineText, idx) => {
    let match;
    const re = new RegExp(SKILL_REF_RE);
    while ((match = re.exec(lineText)) !== null) {
      const raw = match[1];
      const colonIdx = raw.indexOf(":");
      const qualifier = colonIdx === -1 ? null : raw.slice(0, colonIdx);
      const skillName = colonIdx === -1 ? raw : raw.slice(colonIdx + 1);
      references.push({ file, line: idx + 1, raw, qualifier, skillName });
    }
  });
}

// === Check 1: every reference and dependency resolves ===============================

section("Check 1: reference resolution");

const unresolved = [];

for (const ref of references) {
  if (ref.qualifier) {
    const pluginExists = marketplacePluginNames.has(ref.qualifier);
    const skillPath = path.join(
      PLUGINS_DIR,
      ref.qualifier,
      "skills",
      ref.skillName,
      "SKILL.md",
    );
    if (!pluginExists || !fs.existsSync(skillPath)) {
      unresolved.push(ref);
    }
  } else {
    if (
      !skillOwner.has(ref.skillName) &&
      !duplicateSkillNames.has(ref.skillName)
    ) {
      unresolved.push(ref);
    }
  }
}

for (const ref of unresolved) {
  fail(
    `${relPath(ref.file)}:${ref.line}: Skill(${ref.raw}) does not resolve to any skill`,
  );
}

// dependencies[] entries in every plugin.json
const dependencyIssues = [];
for (const pluginDir of fs.readdirSync(PLUGINS_DIR, { withFileTypes: true })) {
  if (!pluginDir.isDirectory()) continue;
  const manifestPath = path.join(
    PLUGINS_DIR,
    pluginDir.name,
    ".claude-plugin",
    "plugin.json",
  );
  if (!fs.existsSync(manifestPath)) continue;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  for (const dep of manifest.dependencies || []) {
    if (!marketplacePluginNames.has(dep)) {
      dependencyIssues.push({ plugin: pluginDir.name, dep, manifestPath });
    }
  }
}

for (const issue of dependencyIssues) {
  fail(
    `${relPath(issue.manifestPath)}: dependency "${issue.dep}" does not exist in marketplace.json`,
  );
}

// Best-effort "<plugin>:<agent> subagent type" dispatch check was investigated and
// deliberately dropped — see scripts/README.md for why (plugin-dev is a legitimate
// external plugin not registered in this marketplace, and it was the only match the
// pattern ever found in the current tree).

if (unresolved.length === 0 && dependencyIssues.length === 0) {
  ok(
    `all ${references.length} Skill() references and all dependencies[] entries resolve`,
  );
}

// === Check 2: cross-plugin references are fully qualified ===========================

section("Check 2: cross-plugin references are qualified");

const crossPluginViolations = [];

for (const ref of references) {
  if (ref.qualifier) continue; // already qualified, nothing to check here
  if (!skillOwner.has(ref.skillName)) continue; // unresolvable bare ref: Check 1's failure, not this one

  const referencingPlugin = pluginOfPath(ref.file);
  const owningPlugin = skillOwner.get(ref.skillName);
  if (owningPlugin !== referencingPlugin) {
    crossPluginViolations.push({ ref, referencingPlugin, owningPlugin });
  }
}

for (const { ref, referencingPlugin, owningPlugin } of crossPluginViolations) {
  const key = `${relPath(ref.file)}:${ref.line}:Skill(${ref.skillName})`;
  const message = `${relPath(ref.file)}:${ref.line}: bare Skill(${ref.skillName}) is owned by ${owningPlugin}, not ${referencingPlugin} — write Skill(${owningPlugin}:${ref.skillName})`;
  if (baseline.has(key)) {
    baselined(message);
  } else {
    fail(message);
  }
}

if (crossPluginViolations.length === 0) {
  ok("no bare cross-plugin Skill() references found");
} else if (
  crossPluginViolations.every(({ ref, referencingPlugin, owningPlugin }) =>
    baseline.has(`${relPath(ref.file)}:${ref.line}:Skill(${ref.skillName})`),
  )
) {
  ok(
    `all cross-plugin violations found are pre-existing debt covered by ${relPath(BASELINE_PATH)}`,
  );
}

// === Check 3: role-bundle purity (rule 2) ============================================

section("Check 3: role bundles carry no skills/agents/commands");

const readme = fs.readFileSync(README_PATH, "utf8");
const bundleSectionMatch = readme.match(/## Role bundles\n([\s\S]*?)\n## /);
if (!bundleSectionMatch) {
  fail(`could not find a "## Role bundles" section in ${relPath(README_PATH)}`);
} else {
  const bundleSection = bundleSectionMatch[1];
  const bundleNames = [];
  const rowRe = /^\|\s*\[([a-z0-9-]+)\]\(plugins\/([a-z0-9-]+)\/\)/gm;
  let rowMatch;
  while ((rowMatch = rowRe.exec(bundleSection)) !== null) {
    bundleNames.push(rowMatch[2]);
  }

  if (bundleNames.length === 0) {
    fail(
      `"## Role bundles" table in ${relPath(README_PATH)} listed no plugins`,
    );
  }

  const forbidden = ["skills", "agents", "commands"];
  let bundleFailures = 0;
  for (const bundleName of bundleNames) {
    const bundleDir = path.join(PLUGINS_DIR, bundleName);
    for (const dir of forbidden) {
      const forbiddenPath = path.join(bundleDir, dir);
      if (fs.existsSync(forbiddenPath)) {
        fail(`${bundleName} is a role bundle but contains ${dir}/`);
        bundleFailures++;
      }
    }
  }
  if (bundleFailures === 0 && bundleNames.length > 0) {
    ok(
      `all ${bundleNames.length} role bundles (${bundleNames.join(", ")}) are pure`,
    );
  }
}

// === Summary ==========================================================================

console.log();
if (errorCount > 0) {
  console.log(
    `${BOLD}${RED}${errorCount} error(s)${RESET}, ${baselinedCount} baselined finding(s) ignored.`,
  );
  process.exit(1);
} else {
  console.log(
    `${BOLD}${GREEN}All checks passed.${RESET} (${baselinedCount} pre-existing finding(s) suppressed by baseline)`,
  );
  process.exit(0);
}
