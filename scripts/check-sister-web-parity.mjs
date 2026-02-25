#!/usr/bin/env node
/**
 * check-sister-web-parity.mjs — The Brutal Web Parity Guardrail
 *
 * Reads navigation-contract.json as source of truth, then asserts
 * ALL enabled sisters appear in ALL web locations. If a single sister
 * is missing from any location, the script exits nonzero.
 *
 * Usage:
 *   node scripts/check-sister-web-parity.mjs
 */

import { readFileSync, existsSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

let passed = 0
let failed = 0
const failures = []

function ok(msg) {
  passed++
  console.log(`  ✓ ${msg}`)
}

function fail(msg) {
  failed++
  failures.push(msg)
  console.log(`  ✗ ${msg}`)
}

function readFile(relPath) {
  const full = resolve(ROOT, relPath)
  if (!existsSync(full)) {
    fail(`File not found: ${relPath}`)
    return null
  }
  return readFileSync(full, "utf-8")
}

function assertContains(content, pattern, file, desc) {
  if (content && content.includes(pattern)) {
    ok(`${file}: ${desc}`)
  } else {
    fail(`${file}: ${desc} — missing "${pattern}"`)
  }
}

function assertMatch(content, regex, file, desc) {
  if (content && regex.test(content)) {
    ok(`${file}: ${desc}`)
  } else {
    fail(`${file}: ${desc} — pattern not found`)
  }
}

// ── Load source of truth ────────────────────────────────────────────────────

console.log("\n══ Sister Web Parity Guardrail ══\n")
console.log("Loading navigation-contract.json as source of truth...\n")

const contractRaw = readFile("docs/ecosystem/navigation-contract.json")
if (!contractRaw) {
  console.error("FATAL: Cannot load navigation-contract.json")
  process.exit(1)
}

const contract = JSON.parse(contractRaw)
const sisters = contract.sisters.filter((s) => s.enabled)
const sisterKeys = sisters.map((s) => s.key)
const sisterNames = sisters.map((s) => s.name)
const sisterRepos = sisters.map((s) => s.repo)
const sisterSlugs = sisters.map((s) => `agentic-${s.key}`)
const NPM_PACKAGES = { memory: "@agenticamem/memory", vision: "@agenticamem/vision", codebase: "@agenticamem/codebase", identity: "@agenticamem/identity" }

console.log(`Enabled sisters: ${sisterKeys.join(", ")} (${sisters.length} total)\n`)

// ── Cross-validate: sister repos in workspace must have canonical files ──────
// When running locally in a workspace that contains sister repos, this validates
// canonical file parity across all sisters. In CI (where only the web repo is
// checked out), this section is SKIPPED — the per-sister CI guardrails handle it.

const WORKSPACE = resolve(ROOT, "..")
const IS_CI = !!process.env.CI

function readAbsFile(absPath) {
  if (!existsSync(absPath)) return null
  return readFileSync(absPath, "utf-8")
}

console.log("── Cross-validate: sister repo canonical files" + (IS_CI ? " (SKIPPED — CI mode, sister repos not in workspace)" : " (STRICT)") + " ──")

// Required files every sister MUST have — no exceptions
const CANONICAL_REQUIRED_FILES = [
  "scripts/check-canonical-sister.sh",
  "scripts/install.sh",
  "scripts/check-install-commands.sh",
  "scripts/check-runtime-hardening.sh",
  "scripts/test-primary-problems.sh",
  "README.md",
  "docs/public/installation.md",
  "docs/public/quickstart.md",
  "docs/public/concepts.md",
  "docs/public/integration-guide.md",
  "docs/public/faq.md",
  "docs/public/benchmarks.md",
  "docs/public/api-reference.md",
  "docs/public/experience-with-vs-without.md",
  "docs/public/command-surface.md",
  "docs/public/runtime-install-sync.md",
  "docs/public/sister.manifest.json",
  "docs/public/primary-problem-coverage.md",
  "docs/public/initial-problem-coverage.md",
  "docs/ecosystem/CANONICAL_SISTER_KIT.md",
  "assets/github-hero-pane.svg",
  "assets/github-terminal-pane.svg",
  ".github/workflows/ci.yml",
  ".github/workflows/release.yml",
  ".github/workflows/canonical-sister-guardrails.yml",
  ".github/workflows/install-command-guardrails.yml",
]

// Reference sister for byte-identity checks
const REFERENCE_SISTER = "agentic-memory"
const refCanonicalKit = readAbsFile(resolve(WORKSPACE, REFERENCE_SISTER, "docs/ecosystem/CANONICAL_SISTER_KIT.md"))

for (const s of sisters) {
  const slug = `agentic-${s.key}`
  const repoDir = resolve(WORKSPACE, slug)
  if (!existsSync(repoDir)) {
    if (IS_CI) {
      console.log(`  ⊘ ${slug}/ not in workspace (expected in CI — sister guardrails run in their own repos)`)
    } else {
      fail(`Sister repo directory missing: ${slug}/ — new sister must exist in workspace before it can be enabled on the web`)
    }
    continue
  }
  ok(`${slug}/ exists in workspace`)

  // 1. All canonical files must exist
  for (const f of CANONICAL_REQUIRED_FILES) {
    const p = resolve(repoDir, f)
    if (existsSync(p)) {
      ok(`${slug}: has ${f}`)
    } else {
      fail(`${slug}: MISSING ${f} — every sister must have this file. Create it from a reference sister.`)
    }
  }

  // 2. CANONICAL_SISTER_KIT.md must be byte-identical to reference
  if (refCanonicalKit) {
    const thisKit = readAbsFile(resolve(repoDir, "docs/ecosystem/CANONICAL_SISTER_KIT.md"))
    if (thisKit && thisKit === refCanonicalKit) {
      ok(`${slug}: CANONICAL_SISTER_KIT.md is byte-identical to ${REFERENCE_SISTER}`)
    } else if (thisKit) {
      fail(`${slug}: CANONICAL_SISTER_KIT.md DIFFERS from ${REFERENCE_SISTER} — must be identical across all sisters`)
    }
  }

  // 3. check-canonical-sister.sh assertion body must match reference
  const refCheckBody = readAbsFile(resolve(WORKSPACE, REFERENCE_SISTER, "scripts/check-canonical-sister.sh"))
  const thisCheckBody = readAbsFile(resolve(repoDir, "scripts/check-canonical-sister.sh"))
  if (refCheckBody && thisCheckBody) {
    const extractBody = (src) => src.substring(src.indexOf("# ── Shared helpers"))
    const refBody = extractBody(refCheckBody)
    const thisBody = extractBody(thisCheckBody)
    if (refBody === thisBody) {
      ok(`${slug}: check-canonical-sister.sh assertion body matches ${REFERENCE_SISTER}`)
    } else {
      fail(`${slug}: check-canonical-sister.sh assertion body DIFFERS from ${REFERENCE_SISTER} — shared body must be identical`)
    }
  }

  // 4. README must have npm install
  const readme = readAbsFile(resolve(repoDir, "README.md"))
  if (readme !== null) {
    const pkg = NPM_PACKAGES[s.key]
    if (pkg && readme.includes(`npm install ${pkg}`)) {
      ok(`${slug}: README has npm install ${pkg}`)
    } else if (pkg) {
      fail(`${slug}: README missing npm install ${pkg}`)
    }
    // 5. README must have canonical nav bar links
    const navLinks = ["#quickstart", "#problems-solved", "#how-it-works", "#benchmarks", "#install"]
    for (const link of navLinks) {
      if (readme.includes(`href="${link}"`)) {
        ok(`${slug}: README has nav link ${link}`)
      } else {
        fail(`${slug}: README missing nav bar link ${link}`)
      }
    }
  }

  // 6. installation.md must have npm install
  const installDoc = readAbsFile(resolve(repoDir, "docs/public/installation.md"))
  if (installDoc !== null) {
    const pkg = NPM_PACKAGES[s.key]
    if (pkg && installDoc.includes(`npm install ${pkg}`)) {
      ok(`${slug}: installation.md has npm install ${pkg}`)
    } else if (pkg) {
      fail(`${slug}: installation.md missing npm install ${pkg}`)
    }
  }

  // 7. sister.manifest.json must have baseline page_ids
  const manifest = readAbsFile(resolve(repoDir, "docs/public/sister.manifest.json"))
  if (manifest !== null) {
    const baselineIds = ["experience-with-vs-without", "quickstart", "installation", "command-surface", "runtime-install-sync"]
    for (const pid of baselineIds) {
      if (manifest.includes(`"${pid}"`)) {
        ok(`${slug}: manifest has page_id "${pid}"`)
      } else {
        fail(`${slug}: manifest missing baseline page_id "${pid}"`)
      }
    }
  }

  // 8. Install script must have canonical output strings
  const installScript = readAbsFile(resolve(repoDir, "scripts/install.sh"))
  if (installScript !== null) {
    const requiredStrings = ["MCP client summary:", "Universal MCP entry", "Quick terminal check:", "AGENTIC_TOKEN"]
    for (const str of requiredStrings) {
      if (installScript.includes(str)) {
        ok(`${slug}: install.sh has "${str}"`)
      } else {
        fail(`${slug}: install.sh missing canonical string "${str}"`)
      }
    }
  }
}

// ── A. Navigation contract self-check ───────────────────────────────────────

console.log("── A. Navigation contract completeness ──")
for (const s of sisters) {
  assertContains(contractRaw, `"key": "${s.key}"`, "navigation-contract.json", `key "${s.key}" present`)
  assertContains(contractRaw, `"enabled": true`, "navigation-contract.json", `sister "${s.key}" enabled`)
}

// ── B. releases.ts ──────────────────────────────────────────────────────────

console.log("\n── B. releases.ts ──")
const releasesTs = readFile("lib/releases.ts")
for (const repo of sisterRepos) {
  assertContains(releasesTs, `agentralabs/${repo}`, "lib/releases.ts", `DEFAULT_RELEASE_REPOS has ${repo}`)
}

// ── C. site.ts ──────────────────────────────────────────────────────────────

console.log("\n── C. site.ts ──")
const siteTs = readFile("lib/site.ts")
for (const name of sisterNames) {
  assertContains(siteTs, name, "lib/site.ts", `description/keywords mentions ${name}`)
}
for (const key of sisterKeys) {
  assertContains(siteTs, `agentic ${key}`, "lib/site.ts", `keywords includes "agentic ${key}"`)
}

// ── D. community.ts ─────────────────────────────────────────────────────────

console.log("\n── D. community.ts ──")
const communityTs = readFile("lib/community.ts")
for (const name of sisterNames) {
  // Check FeedbackEntry.project union
  assertContains(communityTs, `"${name}"`, "lib/community.ts", `project union includes "${name}"`)
}

// ── E. footer.tsx ───────────────────────────────────────────────────────────

console.log("\n── E. footer.tsx ──")
const footerTsx = readFile("components/footer.tsx")
for (const repo of sisterRepos) {
  assertContains(footerTsx, `github.com/agentralabs/${repo}`, "components/footer.tsx", `PROJECT_LINKS has ${repo}`)
}

// ── F. quickstart-terminal-pane.tsx ─────────────────────────────────────────

console.log("\n── F. quickstart-terminal-pane.tsx ──")
const qsTsx = readFile("components/quickstart-terminal-pane.tsx")
for (const name of sisterNames) {
  assertContains(qsTsx, `"${name}"`, "quickstart-terminal-pane.tsx", `ProjectKey/PROJECTS has "${name}"`)
  // Check COMMANDS record entry
  assertContains(qsTsx, `${name}:`, "quickstart-terminal-pane.tsx", `COMMANDS has ${name} entry`)
}
// Check artifact labels
const artifacts = sisterKeys.map((k) => {
  switch (k) {
    case "memory": return ".amem"
    case "vision": return ".avis"
    case "codebase": return ".acb"
    case "identity": return ".aid"
    default: return `.${k}`
  }
})
for (const art of artifacts) {
  assertContains(qsTsx, art, "quickstart-terminal-pane.tsx", `artifact label includes ${art}`)
}

// ── G. scenario-cards-section.tsx ───────────────────────────────────────────

console.log("\n── G. scenario-cards-section.tsx ──")
const scenarioCardsTsx = readFile("components/scenario-cards-section.tsx")
for (const slug of sisterSlugs) {
  assertContains(scenarioCardsTsx, `/projects/scenarios/${slug}`, "scenario-cards-section.tsx", `SCENARIOS has href for ${slug}`)
}

// ── H. pricing-section.tsx ──────────────────────────────────────────────────

console.log("\n── H. pricing-section.tsx ──")
const pricingTsx = readFile("components/pricing-section.tsx")
for (const slug of sisterSlugs) {
  assertContains(pricingTsx, `"${slug}"`, "pricing-section.tsx", `MODULES has id "${slug}"`)
}
for (const name of sisterNames) {
  assertContains(pricingTsx, name, "pricing-section.tsx", `MODULES references ${name}`)
}

// ── I. projects/page.tsx ────────────────────────────────────────────────────

console.log("\n── I. projects/page.tsx ──")
const projectsPage = readFile("app/projects/page.tsx")
for (const name of sisterNames) {
  assertContains(projectsPage, `"${name}"`, "app/projects/page.tsx", `ProjectKey/PROJECTS has "${name}"`)
}

// ── J. scenarios/[sister]/page.tsx ──────────────────────────────────────────

console.log("\n── J. scenarios/[sister]/page.tsx ──")
const scenariosPage = readFile("app/projects/scenarios/[sister]/page.tsx")
for (const slug of sisterSlugs) {
  assertContains(scenariosPage, `"${slug}"`, "scenarios/[sister]/page.tsx", `VALID_SISTERS has "${slug}"`)
  assertContains(scenariosPage, `"${slug}":`, "scenarios/[sister]/page.tsx", `META has "${slug}" entry`)
}

// ── K. Data file existence ──────────────────────────────────────────────────

console.log("\n── K. Data file existence ──")
for (const key of sisterKeys) {
  const dataFile = `data/scenarios-${key}.ts`
  if (existsSync(resolve(ROOT, dataFile))) {
    ok(`${dataFile} exists`)
  } else {
    fail(`${dataFile} missing — each sister needs a scenario data file`)
  }
}

// ── L. scenario-page.tsx ────────────────────────────────────────────────────

console.log("\n── L. scenario-page.tsx ──")
const scenarioPageTsx = readFile("components/scenario-page.tsx")
for (const key of sisterKeys) {
  const heroConst = key.toUpperCase() + "_HERO"
  const scenariosConst = key.toUpperCase() + "_SCENARIOS"
  assertContains(scenarioPageTsx, heroConst, "scenario-page.tsx", `imports ${heroConst}`)
  assertContains(scenarioPageTsx, scenariosConst, "scenario-page.tsx", `imports ${scenariosConst}`)
}
for (const slug of sisterSlugs) {
  assertContains(scenarioPageTsx, `"${slug}"`, "scenario-page.tsx", `getConfig handles "${slug}"`)
}

// ── M. scenario-content.tsx ─────────────────────────────────────────────────

console.log("\n── M. scenario-content.tsx ──")
const scenarioContentTsx = readFile("components/scenario-content.tsx")
const allTogetherNames = {
  memory: "MemoryAllTogetherContent",
  vision: "VisionAllTogetherContent",
  codebase: "CodebaseAllTogetherContent",
  identity: "IdentityAllTogetherContent",
}
for (const key of sisterKeys) {
  const fnName = allTogetherNames[key]
  if (fnName) {
    assertContains(scenarioContentTsx, `export function ${fnName}`, "scenario-content.tsx", `exports ${fnName}`)
  }
}

// ── N. Install routes ───────────────────────────────────────────────────────

console.log("\n── N. Install routes ──")
const installRoute = readFile("app/install/[target]/route.ts")
for (const key of sisterKeys) {
  assertContains(installRoute, `${key}:`, "install/[target]/route.ts", `INSTALL_TARGETS has "${key}" key`)
  assertContains(installRoute, `"agentic-${key}"`, "install/[target]/route.ts", `INSTALL_TARGETS has "agentic-${key}" key`)
}

// ── O. hero-section.tsx ─────────────────────────────────────────────────────

console.log("\n── O. hero-section.tsx ──")
const heroTsx = readFile("components/hero-section.tsx")
assertMatch(heroTsx, /four/i, "hero-section.tsx", `hero mentions "four" systems`)

// ── P. quickstart-terminal-pane npm commands ────────────────────────────────

console.log("\n── P. quickstart-terminal-pane npm commands ──")
for (const s of sisters) {
  const pkg = NPM_PACKAGES[s.key]
  if (pkg) {
    assertContains(qsTsx, `npm install ${pkg}`, "quickstart-terminal-pane.tsx", `NPM command for ${s.key}: ${pkg}`)
  }
}

// ── Q. publications/page.tsx — all sisters must have papers ──────────────────

console.log("\n── Q. publications/page.tsx ──")
const pubTsx = readFile("app/publications/page.tsx")
if (pubTsx) {
  for (const s of sisters) {
    assertContains(pubTsx, s.name, "publications/page.tsx", `publications page references ${s.name}`)
  }
}

// ── R. value-proof-section.tsx — all sisters must have proof cards ───────────

console.log("\n── R. value-proof-section.tsx ──")
const vpTsx = readFile("components/value-proof-section.tsx")
if (vpTsx) {
  for (const s of sisters) {
    assertContains(vpTsx, s.name, "value-proof-section.tsx", `value proof references ${s.name}`)
  }
}

// ── Summary ─────────────────────────────────────────────────────────────────

console.log("\n══════════════════════════════════════════")
console.log(`  Passed: ${passed}`)
console.log(`  Failed: ${failed}`)
console.log("══════════════════════════════════════════")

if (failed > 0) {
  console.log("\nFAILURES:")
  for (const f of failures) {
    console.log(`  ✗ ${f}`)
  }
  console.log("")
  process.exit(1)
}

console.log("\nAll sister web parity checks passed.\n")
