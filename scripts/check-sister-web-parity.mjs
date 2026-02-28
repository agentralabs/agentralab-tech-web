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

import { readFileSync, existsSync, readdirSync } from "node:fs"
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
const NPM_PACKAGES = { memory: "@agenticamem/memory", vision: "@agenticamem/vision", codebase: "@agenticamem/codebase", identity: "@agenticamem/identity", time: "@agenticamem/time", contract: "@agenticamem/contract" }
const CLI_PACKAGES = { memory: "agentic-memory-cli", vision: "agentic-vision-cli", codebase: "agentic-codebase-cli", identity: "agentic-identity-cli", time: "agentic-time-cli", contract: "agentic-contract-cli" }
const MCP_PACKAGES = { memory: "agentic-memory-mcp", vision: "agentic-vision-mcp", codebase: "agentic-codebase-mcp", identity: "agentic-identity-mcp", time: "agentic-time-mcp", contract: "agentic-contract-mcp" }

console.log(`Enabled sisters: ${sisterKeys.join(", ")} (${sisters.length} total)\n`)

// ── Cross-validate: sister repos in workspace must have canonical files ──────
// This is the STRICTEST section. A new sister that is added to navigation-contract.json
// but does not have ALL canonical files in its repo directory will FAIL the entire guardrail.
// CI clones all sister repos into the workspace parent so this runs everywhere.

const WORKSPACE = resolve(ROOT, "..")

function readAbsFile(absPath) {
  if (!existsSync(absPath)) return null
  return readFileSync(absPath, "utf-8")
}

console.log("── Cross-validate: sister repo canonical files (STRICT) ──")

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
    fail(`Sister repo directory missing: ${slug}/ — new sister must exist in workspace before it can be enabled on the web`)
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
    const routeCmd = `curl -fsSL https://agentralabs.tech/install/${s.key} | bash`
    if (readme.includes(routeCmd)) {
      ok(`${slug}: README has canonical install route`)
    } else {
      fail(`${slug}: README missing canonical install route "${routeCmd}"`)
    }

    const cliPkg = CLI_PACKAGES[s.key]
    const mcpPkg = MCP_PACKAGES[s.key]
    if (cliPkg && mcpPkg) {
      const cargoPair = `cargo install ${cliPkg} ${mcpPkg}`
      if (readme.includes(cargoPair)) {
        ok(`${slug}: README has cargo install pair "${cargoPair}"`)
      } else {
        fail(`${slug}: README missing cargo install pair "${cargoPair}"`)
      }
    }

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
    const routeCmd = `curl -fsSL https://agentralabs.tech/install/${s.key} | bash`
    if (installDoc.includes(routeCmd)) {
      ok(`${slug}: installation.md has canonical install route`)
    } else {
      fail(`${slug}: installation.md missing canonical install route "${routeCmd}"`)
    }

    const cliPkg = CLI_PACKAGES[s.key]
    const mcpPkg = MCP_PACKAGES[s.key]
    if (cliPkg && mcpPkg) {
      if (installDoc.includes(`cargo install ${cliPkg}`) && installDoc.includes(`cargo install ${mcpPkg}`)) {
        ok(`${slug}: installation.md has cargo install commands for ${cliPkg} and ${mcpPkg}`)
      } else {
        fail(`${slug}: installation.md missing cargo install commands for ${cliPkg} and/or ${mcpPkg}`)
      }
    }

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

// ── F. quickstart-terminal-pane.tsx (DEEP CHECK) ────────────────────────────
// Verifies not just string presence but structural completeness:
//   1. ProjectKey union type includes the sister
//   2. PROJECTS array includes the sister
//   3. COMMANDS record has a non-trivial entry block for each sister
//   4. Each sister has curl install route, cargo install, pip install, npm install, MCP command
//   5. Artifact labels are correct
//   6. pip install uses the correct PyPI package name
//   7. npm install uses the correct @agenticamem scope

console.log("\n── F. quickstart-terminal-pane.tsx (DEEP CONTENT CHECK) ──")
const qsTsx = readFile("components/quickstart-terminal-pane.tsx")
const PYPI_PACKAGES = { memory: "agentic-brain", vision: "agentic-vision", codebase: "agentic-codebase", identity: "agentic-identity", time: "agentic-time", contract: "agentic-contract" }
const artifacts = sisterKeys.map((k) => {
  switch (k) {
    case "memory": return ".amem"
    case "vision": return ".avis"
    case "codebase": return ".acb"
    case "identity": return ".aid"
    case "time": return ".atime"
    case "contract": return ".acon"
    default: return `.${k}`
  }
})
for (const s of sisters) {
  const name = s.name

  // F.1 — ProjectKey union type
  const unionPattern = new RegExp(`"${name}"\\s*\\||\\|\\s*"${name}"`)
  assertMatch(qsTsx, unionPattern, "quickstart-terminal-pane.tsx", `ProjectKey union includes "${name}"`)

  // F.2 — PROJECTS array
  assertContains(qsTsx, `"${name}"`, "quickstart-terminal-pane.tsx", `PROJECTS array has "${name}"`)

  // F.3 — COMMANDS record has a block for this sister with actual content
  const commandBlockStart = new RegExp(`${name}:\\s*\\{\\s*\\n`)
  assertMatch(qsTsx, commandBlockStart, "quickstart-terminal-pane.tsx", `COMMANDS has ${name} record block`)

  // F.4 — Canonical install route (curl)
  const routeCmd = `curl -fsSL https://agentralabs.tech/install/${s.key} | bash`
  assertContains(qsTsx, routeCmd, "quickstart-terminal-pane.tsx", `GLOBAL commands include canonical install route for ${s.key}`)

  // F.5 — Cargo install pair
  const cliPkg = CLI_PACKAGES[s.key]
  const mcpPkg = MCP_PACKAGES[s.key]
  if (cliPkg && mcpPkg) {
    assertContains(qsTsx, `cargo install ${cliPkg} ${mcpPkg}`, "quickstart-terminal-pane.tsx", `RUST commands include cargo install pair for ${s.key}`)
  }

  // F.6 — Pip install with correct PyPI package
  const pypiPkg = PYPI_PACKAGES[s.key]
  if (pypiPkg) {
    assertContains(qsTsx, `pip install ${pypiPkg}`, "quickstart-terminal-pane.tsx", `PYTHON commands include pip install ${pypiPkg} for ${s.key}`)
  }

  // F.7 — npm install with correct scope
  const npmPkg = NPM_PACKAGES[s.key]
  if (npmPkg) {
    assertContains(qsTsx, `npm install ${npmPkg}`, "quickstart-terminal-pane.tsx", `NPM commands include npm install ${npmPkg} for ${s.key}`)
  }

  // F.8 — MCP server command (structural: the MCP block must contain the sister's MCP package name)
  if (mcpPkg) {
    assertContains(qsTsx, mcpPkg, "quickstart-terminal-pane.tsx", `MCP commands reference ${mcpPkg} for ${s.key}`)
  }
}

// F.9 — Artifact labels
for (let i = 0; i < sisterKeys.length; i++) {
  assertContains(qsTsx, artifacts[i], "quickstart-terminal-pane.tsx", `artifact label includes ${artifacts[i]} for ${sisterKeys[i]}`)
}

// ── G. scenario-cards-section.tsx ───────────────────────────────────────────

console.log("\n── G. scenario-cards-section.tsx ──")
const scenarioCardsTsx = readFile("components/scenario-cards-section.tsx")
for (const slug of sisterSlugs) {
  assertContains(scenarioCardsTsx, `/projects/scenarios/${slug}`, "scenario-cards-section.tsx", `SCENARIOS has href for ${slug}`)
}

// ── H. pricing-section.tsx (DEEP CHECK) ─────────────────────────────────────
// Verifies each sister has a MODULES entry with:
//   1. Module id matching the sister slug
//   2. Module name referencing the sister display name
//   3. A description (non-trivial content, not just name mention)

console.log("\n── H. pricing-section.tsx (DEEP CONTENT CHECK) ──")
const pricingTsx = readFile("components/pricing-section.tsx")
for (const s of sisters) {
  const slug = `agentic-${s.key}`
  // H.1 — Module id
  assertContains(pricingTsx, `"${slug}"`, "pricing-section.tsx", `MODULES has id "${slug}"`)
  // H.2 — Display name
  assertContains(pricingTsx, s.name, "pricing-section.tsx", `MODULES references ${s.name}`)
  // H.3 — Structural: the sister's slug entry must be followed by a description property
  if (pricingTsx) {
    const modulePattern = new RegExp(`id:\\s*"${slug}"[\\s\\S]*?description:`, "m")
    if (modulePattern.test(pricingTsx)) {
      ok(`pricing-section.tsx: MODULES entry for "${slug}" has a description property`)
    } else {
      fail(`pricing-section.tsx: MODULES entry for "${slug}" MISSING description property — every sister module needs a description`)
    }
  }
}

// ── I. projects/page.tsx (DEEP CHECK) ───────────────────────────────────────
// Verifies each sister has:
//   1. An entry in the ProjectKey union type
//   2. An entry in the PROJECTS array
//   3. A repo link pointing to the correct GitHub repository
//   4. A description that is non-empty

console.log("\n── I. projects/page.tsx (DEEP CONTENT CHECK) ──")
const projectsPage = readFile("app/projects/page.tsx")
for (const s of sisters) {
  // I.1 — ProjectKey/PROJECTS includes sister name
  assertContains(projectsPage, `"${s.name}"`, "app/projects/page.tsx", `ProjectKey/PROJECTS has "${s.name}"`)

  // I.2 — GitHub repo link
  if (projectsPage) {
    const repoPattern = new RegExp(`github\\.com/agentralabs/agentic-${s.key}`)
    if (repoPattern.test(projectsPage)) {
      ok(`app/projects/page.tsx: has GitHub repo link for agentic-${s.key}`)
    } else {
      fail(`app/projects/page.tsx: MISSING GitHub repo link for agentic-${s.key} — every sister must link to its repository`)
    }
  }

  // I.3 — File format artifact label
  if (projectsPage) {
    const artIdx = sisterKeys.indexOf(s.key)
    if (artIdx >= 0) {
      assertContains(projectsPage, artifacts[artIdx], "app/projects/page.tsx", `projects page mentions ${artifacts[artIdx]} format for ${s.key}`)
    }
  }
}

// ── J. scenarios/[sister]/page.tsx (DEEP CHECK) ─────────────────────────────
// Verifies each sister has:
//   1. An entry in VALID_SISTERS
//   2. An entry in META with title and description

console.log("\n── J. scenarios/[sister]/page.tsx (DEEP CONTENT CHECK) ──")
const scenariosPage = readFile("app/projects/scenarios/[sister]/page.tsx")
for (const slug of sisterSlugs) {
  // J.1 — VALID_SISTERS
  assertContains(scenariosPage, `"${slug}"`, "scenarios/[sister]/page.tsx", `VALID_SISTERS has "${slug}"`)
  // J.2 — META entry
  assertContains(scenariosPage, `"${slug}":`, "scenarios/[sister]/page.tsx", `META has "${slug}" entry`)
  // J.3 — META entry has title
  if (scenariosPage) {
    const metaBlock = scenariosPage.substring(scenariosPage.indexOf(`"${slug}":`))
    const nextBrace = metaBlock.indexOf("}")
    const block = metaBlock.substring(0, nextBrace + 1)
    if (block.includes("title:")) {
      ok(`scenarios/[sister]/page.tsx: META "${slug}" has title property`)
    } else {
      fail(`scenarios/[sister]/page.tsx: META "${slug}" MISSING title property`)
    }
  }
}

// ── K. Data files (DEEP CHECK) ──────────────────────────────────────────────
// Verifies each sister's scenario data file:
//   1. File exists
//   2. Exports HERO constant
//   3. Exports SCENARIOS constant
//   4. HERO has title, subtitle, and artifact properties
//   5. SCENARIOS array has at least one group with items

console.log("\n── K. Data files (DEEP CONTENT CHECK) ──")
for (const key of sisterKeys) {
  const dataFile = `data/scenarios-${key}.ts`
  const fullPath = resolve(ROOT, dataFile)
  if (existsSync(fullPath)) {
    ok(`${dataFile} exists`)

    const dataContent = readFileSync(fullPath, "utf-8")

    // K.1 — Exports HERO constant
    const heroConst = key.toUpperCase() + "_HERO"
    if (dataContent.includes(`export const ${heroConst}`)) {
      ok(`${dataFile}: exports ${heroConst}`)
    } else {
      fail(`${dataFile}: MISSING export const ${heroConst} — must export hero config`)
    }

    // K.2 — Exports SCENARIOS constant
    const scenariosConst = key.toUpperCase() + "_SCENARIOS"
    if (dataContent.includes(`export const ${scenariosConst}`)) {
      ok(`${dataFile}: exports ${scenariosConst}`)
    } else {
      fail(`${dataFile}: MISSING export const ${scenariosConst} — must export scenarios array`)
    }

    // K.3 — HERO has title, subtitle, artifact
    if (dataContent.includes("title:") && dataContent.includes("subtitle:") && dataContent.includes("artifact:")) {
      ok(`${dataFile}: HERO has title, subtitle, and artifact properties`)
    } else {
      fail(`${dataFile}: HERO missing one or more required properties (title, subtitle, artifact)`)
    }

    // K.4 — SCENARIOS has at least one group with items
    const scenarioItemCount = (dataContent.match(/id:\s*"/g) || []).length
    if (scenarioItemCount >= 3) {
      ok(`${dataFile}: SCENARIOS has ${scenarioItemCount} scenario items (minimum 3 required)`)
    } else {
      fail(`${dataFile}: SCENARIOS has only ${scenarioItemCount} items — each sister needs at least 3 scenarios to match depth of other sisters`)
    }
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
// Every sister MUST have an AllTogetherContent function — no silent skips
for (const key of sisterKeys) {
  const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1)
  const fnName = `${capitalizedKey}AllTogetherContent`
  if (scenarioContentTsx) {
    if (scenarioContentTsx.includes(`export function ${fnName}`)) {
      ok(`scenario-content.tsx: exports ${fnName}`)
    } else {
      fail(`scenario-content.tsx: MISSING export function ${fnName} — every sister must have an AllTogetherContent component`)
    }
  }
}

// ── N. Install routes ───────────────────────────────────────────────────────

console.log("\n── N. Install routes ──")
const installRoute = readFile("app/install/[target]/route.ts")
for (const key of sisterKeys) {
  assertContains(installRoute, `${key}:`, "install/[target]/route.ts", `INSTALL_TARGETS has "${key}" key`)
  assertContains(installRoute, `"agentic-${key}"`, "install/[target]/route.ts", `INSTALL_TARGETS has "agentic-${key}" key`)
}

// ── O. hero-section.tsx + home page metadata ────────────────────────────────

console.log("\n── O. hero-section.tsx + home page metadata ──")
const heroTsx = readFile("components/hero-section.tsx")
assertMatch(heroTsx, /six/i, "hero-section.tsx", `hero mentions "six" systems`)

const homePageTsx = readFile("app/page.tsx")
if (homePageTsx) {
  // Home page metadata must NOT say "Five" — must be "Six"
  if (/Five\s+(open-source|file\s+format|independent|sister)/i.test(homePageTsx)) {
    fail(`app/page.tsx: home page metadata still says "Five" — must be updated to "Six"`)
  } else {
    ok(`app/page.tsx: no stale "Five" count`)
  }
  // All file formats must be present
  for (const art of artifacts) {
    assertContains(homePageTsx, art, "app/page.tsx", `home page metadata mentions ${art} format`)
  }
}

// Flyers must mention all sisters (no stale "Four" counts)
const flyerFiles = ["app/flyers/twitter-post/route.tsx", "app/flyers/linkedin-post/route.tsx", "app/twitter-image.tsx"]
for (const flyerPath of flyerFiles) {
  const flyerContent = readFile(flyerPath)
  if (flyerContent) {
    if (/Four\s+(open-source|file\s+format|independent|sister)/i.test(flyerContent)) {
      fail(`${flyerPath}: flyer still says "Four" — must be updated to "Five"`)
    } else {
      ok(`${flyerPath}: no stale "Four" count`)
    }
  }
}

// about-section.tsx must mention all sister display names
const aboutTsx = readFile("components/about-section.tsx")
if (aboutTsx) {
  for (const name of sisterNames) {
    assertContains(aboutTsx, name, "about-section.tsx", `about section references ${name}`)
  }
}

// ── P. quickstart-terminal-pane npm commands ────────────────────────────────

console.log("\n── P. quickstart-terminal-pane npm commands ──")
for (const s of sisters) {
  const pkg = NPM_PACKAGES[s.key]
  if (pkg) {
    assertContains(qsTsx, `npm install ${pkg}`, "quickstart-terminal-pane.tsx", `NPM command for ${s.key}: ${pkg}`)
  }
}

// ── Q. publications/page.tsx — all sisters must have papers (DEEP CHECK) ─────
// LESSON: Shallow string checks let incomplete implementations pass.
// A GroupBlock reference satisfies `assertContains(name)` even without a
// PAPERS array entry, PDF link, or TeX source link. We now verify:
//   1. Sister name appears in the file (surface)
//   2. A PAPERS entry exists with `project: "SisterName"` (structural)
//   3. That entry has a pdf link pointing to the sister's repo (content)
//   4. That entry has a source link pointing to the sister's repo (content)
//   5. A <GroupBlock project="SisterName"> invocation exists (rendering)

console.log("\n── Q. publications/page.tsx (DEEP CONTENT CHECK) ──")
const pubTsx = readFile("app/publications/page.tsx")
if (pubTsx) {
  for (const s of sisters) {
    // Q.1 — Surface: name appears anywhere
    assertContains(pubTsx, s.name, "publications/page.tsx", `publications page references ${s.name}`)

    // Q.2 — Structural: PAPERS array has an entry with project: "SisterName"
    const papersEntryPattern = new RegExp(`project:\\s*"${s.name}"`)
    if (papersEntryPattern.test(pubTsx)) {
      ok(`publications/page.tsx: PAPERS array has entry with project: "${s.name}"`)
    } else {
      fail(`publications/page.tsx: PAPERS array MISSING entry with project: "${s.name}" — every sister needs at least one paper in the PAPERS array`)
    }

    // Q.3 — Content: PDF link pointing to the sister's GitHub repo
    const pdfLinkPattern = new RegExp(`pdf:\\s*"https://github\\.com/agentralabs/agentic-${s.key}/`)
    if (pdfLinkPattern.test(pubTsx)) {
      ok(`publications/page.tsx: PAPERS entry for ${s.name} has PDF link to agentic-${s.key} repo`)
    } else {
      fail(`publications/page.tsx: PAPERS entry for ${s.name} MISSING PDF link to agentic-${s.key} repo — paper must link to the correct repository`)
    }

    // Q.4 — Content: TeX source link pointing to the sister's GitHub repo
    const sourceLinkPattern = new RegExp(`source:\\s*[\\n\\s]*"https://github\\.com/agentralabs/agentic-${s.key}/`)
    if (sourceLinkPattern.test(pubTsx)) {
      ok(`publications/page.tsx: PAPERS entry for ${s.name} has TeX source link to agentic-${s.key} repo`)
    } else {
      fail(`publications/page.tsx: PAPERS entry for ${s.name} MISSING TeX source link to agentic-${s.key} repo — paper must have source link`)
    }

    // Q.5 — Rendering: GroupBlock invocation exists
    const groupBlockPattern = new RegExp(`<GroupBlock\\s+project="${s.name}"`)
    if (groupBlockPattern.test(pubTsx)) {
      ok(`publications/page.tsx: has <GroupBlock project="${s.name}"> rendering`)
    } else {
      fail(`publications/page.tsx: MISSING <GroupBlock project="${s.name}"> — every sister must have a GroupBlock rendering section`)
    }
  }

  // Q.6 — Paper union type must include all sisters
  const paperUnionPattern = /project:\s*("[^"]+"\s*\|\s*)+"[^"]+"/
  for (const s of sisters) {
    const unionCheck = new RegExp(`"${s.name}"\\s*\\||\\|\\s*"${s.name}"`)
    if (unionCheck.test(pubTsx)) {
      ok(`publications/page.tsx: Paper interface union type includes "${s.name}"`)
    } else {
      fail(`publications/page.tsx: Paper interface union type MISSING "${s.name}" — must be added to the project union type`)
    }
  }

  // Q.7 — Total Papers count must be accurate
  // Only count entries INSIDE the PAPERS array literal, not the type annotation Paper[]
  // Find "= [" after "const PAPERS" to skip past the type annotation
  const papersConstStart = pubTsx.indexOf("const PAPERS")
  const equalSign = pubTsx.indexOf("= [", papersConstStart)
  const bracketOpen = equalSign + 2  // index of the '[' in '= ['
  let depth = 0, papersArrayEnd = bracketOpen
  for (let ci = bracketOpen; ci < pubTsx.length; ci++) {
    if (pubTsx[ci] === "[") depth++
    if (pubTsx[ci] === "]") { depth--; if (depth === 0) { papersArrayEnd = ci; break } }
  }
  const papersArrayContent = pubTsx.substring(bracketOpen, papersArrayEnd + 1)
  const papersCount = (papersArrayContent.match(/project:\s*"/g) || []).length
  const displayedCount = pubTsx.match(/Total Papers[\s\S]*?<p[^>]*>(\d+)<\/p>/)
  if (displayedCount) {
    const displayed = parseInt(displayedCount[1])
    if (displayed === papersCount) {
      ok(`publications/page.tsx: displayed Total Papers (${displayed}) matches actual PAPERS count (${papersCount})`)
    } else {
      fail(`publications/page.tsx: displayed Total Papers (${displayed}) does NOT match actual PAPERS count (${papersCount}) — update the count`)
    }
  }

  // Q.8 — Projects count must match number of unique projects
  const uniqueProjects = new Set((pubTsx.match(/project:\s*"([^"]+)"/g) || []).map(m => m.match(/"([^"]+)"/)[1]))
  const projectsCountMatch = pubTsx.match(/Projects[\s\S]*?<p[^>]*>(\d+)<\/p>/)
  if (projectsCountMatch) {
    const displayedProjects = parseInt(projectsCountMatch[1])
    if (displayedProjects === uniqueProjects.size) {
      ok(`publications/page.tsx: displayed Projects count (${displayedProjects}) matches unique projects (${uniqueProjects.size})`)
    } else {
      fail(`publications/page.tsx: displayed Projects count (${displayedProjects}) does NOT match unique projects (${uniqueProjects.size}) — update the count`)
    }
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

// ── S. glossary.mdx — all sisters must have a section ──────────────────────

console.log("\n── S. glossary.mdx ──")
const glossaryEn = readFile("docs/ecosystem/en/glossary.mdx")
if (glossaryEn) {
  for (const s of sisters) {
    assertContains(glossaryEn, `## ${s.name}`, "glossary.mdx", `glossary has "## ${s.name}" section`)
  }
  assertMatch(glossaryEn, /six/i, "glossary.mdx", `glossary says "six" sisters (not five)`)
}

// ── T. architecture-system.mdx — all sister runtimes referenced ────────────

console.log("\n── T. architecture-system.mdx ──")
const archEn = readFile("docs/ecosystem/en/architecture-system.mdx")
if (archEn) {
  for (const s of sisters) {
    if (s.key === "codebase") {
      if (archEn.includes("acb-mcp") || archEn.includes("agentic-codebase-mcp")) {
        ok("architecture-system.mdx: architecture doc references codebase MCP runtime alias")
      } else {
        fail('architecture-system.mdx: architecture doc missing codebase MCP runtime alias ("acb-mcp" or "agentic-codebase-mcp")')
      }
    } else {
      const mcp = `agentic-${s.key}-mcp`
      assertContains(archEn, mcp, "architecture-system.mdx", `architecture doc references ${mcp}`)
    }
  }
  assertMatch(archEn, /six/i, "architecture-system.mdx", `architecture doc says "six" sisters (not five)`)
}

// ── U. Meta tags: layout.tsx + head files must reference all sisters ────────

console.log("\n── U. Meta tags ──")
const layoutTsx = readFile("app/layout.tsx")
if (layoutTsx) {
  for (const s of sisters) {
    assertContains(layoutTsx, s.name, "app/layout.tsx", `layout.tsx meta references ${s.name}`)
  }
}
const ogTsx = readFile("app/opengraph-image.tsx")
if (ogTsx) {
  for (const s of sisters) {
    assertContains(ogTsx, s.name, "app/opengraph-image.tsx", `opengraph-image.tsx references ${s.name}`)
  }
}
const pubHead = readFile("app/publications/head.tsx")
if (pubHead) {
  for (const s of sisters) {
    assertContains(pubHead, s.name, "app/publications/head.tsx", `publications/head.tsx references ${s.name}`)
  }
}
const projHead = readFile("app/projects/head.tsx")
if (projHead) {
  for (const s of sisters) {
    assertContains(projHead, s.name, "app/projects/head.tsx", `projects/head.tsx references ${s.name}`)
  }
}
const showcaseTsx = readFile("app/showcase/page.tsx")
if (showcaseTsx) {
  for (const s of sisters) {
    assertContains(showcaseTsx, s.name, "app/showcase/page.tsx", `showcase/page.tsx references ${s.name}`)
  }
}

// ── V. quickstart-terminal-pane: all command types must have entries ─────────

console.log("\n── V. quickstart command completeness ──")
const REQUIRED_COMMAND_TYPES = ["GLOBAL", "RUST", "MCP", "PYTHON", "NPM"]
if (qsTsx) {
  // Extract each sister's COMMANDS block by finding text between sister name entries
  const sisterNames = sisters.map(s => s.name)
  for (let i = 0; i < sisters.length; i++) {
    const name = sisters[i].name
    const startIdx = qsTsx.indexOf(`${name}: {`, qsTsx.indexOf("COMMANDS"))
    if (startIdx === -1) continue
    // Find the end: next sister entry or end of COMMANDS
    let endIdx = qsTsx.length
    for (let j = i + 1; j < sisters.length; j++) {
      const nextIdx = qsTsx.indexOf(`${sisters[j].name}: {`, startIdx + 1)
      if (nextIdx !== -1 && nextIdx < endIdx) { endIdx = nextIdx; break }
    }
    const block = qsTsx.substring(startIdx, endIdx)
    for (const ct of REQUIRED_COMMAND_TYPES) {
      // Match: PYTHON: [ { (with whitespace) = non-empty, vs PYTHON: [] = empty
      const nonEmpty = new RegExp(`${ct}:\\s*\\[\\s*\\{`)
      if (nonEmpty.test(block)) {
        ok(`quickstart: ${name} has non-empty ${ct} commands`)
      } else {
        fail(`quickstart: ${name} has EMPTY ${ct} commands — every sister must have entries for all command types`)
      }
    }
  }
}

// ── W. Sister Repo Code Depth Parity ────────────────────────────────────────
// LESSON: "the code depth has to be like other sisters"
// Ensures every sister repo has the SAME depth of implementation:
//   1. Paper directory exists and contains at least one .tex file
//   2. Python package exists and has pyproject.toml
//   3. npm/wasm package exists and has Cargo.toml + src/lib.rs
//   4. MCP crate exists and has src/main.rs (or equivalent entry point)
//   5. CLI crate exists and has src/main.rs (or equivalent entry point)
//   6. Core library crate exists
//   7. Tests directory exists and has test files
//   8. FFI crate exists (if other sisters have it)

console.log("\n── W. Sister repo code depth parity (STRICT) ──")
for (const s of sisters) {
  const slug = `agentic-${s.key}`
  const repoDir = resolve(WORKSPACE, slug)
  if (!existsSync(repoDir)) continue

  // W.1 — Paper directory with .tex file
  const paperDir = resolve(repoDir, "paper")
  if (existsSync(paperDir)) {
    // Find any .tex file recursively (papers can be in subdirs)
    let foundTex = false
    const paperSubdirs = existsSync(paperDir) ? readdirSync(paperDir, { withFileTypes: true }) : []
    for (const entry of paperSubdirs) {
      if (entry.isDirectory()) {
        const subdir = resolve(paperDir, entry.name)
        const files = readdirSync(subdir)
        if (files.some(f => f.endsWith(".tex"))) { foundTex = true; break }
      } else if (entry.name.endsWith(".tex")) {
        foundTex = true; break
      }
    }
    if (foundTex) {
      ok(`${slug}: paper/ directory has at least one .tex file`)
    } else {
      fail(`${slug}: paper/ directory exists but has NO .tex files — every sister must have a research paper`)
    }
  } else {
    fail(`${slug}: MISSING paper/ directory — every sister must have a research paper`)
  }

  // W.2 — Python package with pyproject.toml
  const pyprojectPath = resolve(repoDir, "python/pyproject.toml")
  if (existsSync(pyprojectPath)) {
    const pyproject = readAbsFile(pyprojectPath)
    if (pyproject && pyproject.includes("[project]")) {
      ok(`${slug}: python/pyproject.toml exists with [project] section`)
    } else {
      fail(`${slug}: python/pyproject.toml exists but missing [project] section`)
    }
  } else {
    fail(`${slug}: MISSING python/pyproject.toml — every sister must have a Python package`)
  }

  // W.3 — npm/wasm package with Cargo.toml
  const wasmCargoPath = resolve(repoDir, "npm/wasm/Cargo.toml")
  if (existsSync(wasmCargoPath)) {
    const wasmCargo = readAbsFile(wasmCargoPath)
    if (wasmCargo && wasmCargo.includes("wasm-bindgen")) {
      ok(`${slug}: npm/wasm/Cargo.toml exists with wasm-bindgen dependency`)
    } else {
      fail(`${slug}: npm/wasm/Cargo.toml exists but missing wasm-bindgen dependency`)
    }
    // Also check src/lib.rs exists
    const wasmLibPath = resolve(repoDir, "npm/wasm/src/lib.rs")
    if (existsSync(wasmLibPath)) {
      ok(`${slug}: npm/wasm/src/lib.rs exists`)
    } else {
      fail(`${slug}: MISSING npm/wasm/src/lib.rs — WASM package needs entry point`)
    }
  } else {
    fail(`${slug}: MISSING npm/wasm/Cargo.toml — every sister must have an npm/wasm package`)
  }

  // W.4 — MCP crate exists
  const mcpCrateDir = resolve(repoDir, `crates/agentic-${s.key}-mcp`)
  if (existsSync(mcpCrateDir)) {
    const mcpCargoPath = resolve(mcpCrateDir, "Cargo.toml")
    if (existsSync(mcpCargoPath)) {
      ok(`${slug}: MCP crate exists with Cargo.toml`)
    } else {
      fail(`${slug}: MCP crate directory exists but MISSING Cargo.toml`)
    }
  } else {
    fail(`${slug}: MISSING crates/agentic-${s.key}-mcp/ — every sister must have an MCP crate`)
  }

  // W.5 — CLI crate exists
  const cliCrateDir = resolve(repoDir, `crates/agentic-${s.key}-cli`)
  if (existsSync(cliCrateDir)) {
    const cliCargoPath = resolve(cliCrateDir, "Cargo.toml")
    if (existsSync(cliCargoPath)) {
      ok(`${slug}: CLI crate exists with Cargo.toml`)
    } else {
      fail(`${slug}: CLI crate directory exists but MISSING Cargo.toml`)
    }
  } else {
    fail(`${slug}: MISSING crates/agentic-${s.key}-cli/ — every sister must have a CLI crate`)
  }

  // W.6 — Core library crate exists
  // Some sisters put the core lib at crates/agentic-{key}/, others have src/ at root
  const coreCrateDir = resolve(repoDir, `crates/agentic-${s.key}`)
  const altSrcDir = resolve(repoDir, "src")
  if (existsSync(coreCrateDir)) {
    const coreCargoPath = resolve(coreCrateDir, "Cargo.toml")
    if (existsSync(coreCargoPath)) {
      const coreCargo = readAbsFile(coreCargoPath)
      if (coreCargo && coreCargo.includes("[package]")) {
        ok(`${slug}: core crate exists with Cargo.toml [package]`)
      } else {
        fail(`${slug}: core crate Cargo.toml missing [package] section`)
      }
    } else {
      fail(`${slug}: core crate directory exists but MISSING Cargo.toml`)
    }
  } else if (existsSync(altSrcDir) && existsSync(resolve(repoDir, "Cargo.toml"))) {
    // Alternative: src/ at root level (e.g. agentic-codebase)
    ok(`${slug}: core library at root src/ with Cargo.toml (alternative layout)`)
  } else {
    fail(`${slug}: MISSING crates/agentic-${s.key}/ and no root src/ — every sister must have a core library`)
  }

  // W.7 — Tests directory with test files (recursive check including subdirs)
  function countTestFiles(dir) {
    let count = 0
    if (!existsSync(dir)) return 0
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        count += countTestFiles(resolve(dir, entry.name))
      } else if (entry.name.endsWith(".rs") || entry.name.endsWith(".py") || entry.name.endsWith(".sh")) {
        count++
      }
    }
    return count
  }
  const testsDir = resolve(repoDir, "tests")
  if (existsSync(testsDir)) {
    const testFileCount = countTestFiles(testsDir)
    if (testFileCount > 0) {
      ok(`${slug}: tests/ has ${testFileCount} test files (recursive)`)
    } else {
      fail(`${slug}: tests/ directory exists but has NO test files (.rs, .py, .sh) in any subdirectory`)
    }
  } else {
    fail(`${slug}: MISSING tests/ directory — every sister must have tests`)
  }
}

// ── X. Cross-Sister Depth Comparison ─────────────────────────────────────────
// Counts the depth metrics for each sister and flags outliers.
// If any sister has significantly fewer scenarios, commands, or content than
// the median, it gets flagged as incomplete.

console.log("\n── X. Cross-sister depth comparison ──")
const depthMetrics = {}
for (const s of sisters) {
  const key = s.key
  depthMetrics[key] = { scenarios: 0, commands: 0, papers: 0 }

  // Count scenarios in data file
  const dataFile = resolve(ROOT, `data/scenarios-${key}.ts`)
  if (existsSync(dataFile)) {
    const dataContent = readFileSync(dataFile, "utf-8")
    depthMetrics[key].scenarios = (dataContent.match(/id:\s*"/g) || []).length
  }

  // Count command entries in quickstart
  if (qsTsx) {
    const startIdx = qsTsx.indexOf(`${s.name}: {`, qsTsx.indexOf("COMMANDS"))
    if (startIdx !== -1) {
      let endIdx = qsTsx.length
      for (const other of sisters) {
        if (other.key === key) continue
        const nextIdx = qsTsx.indexOf(`${other.name}: {`, startIdx + 1)
        if (nextIdx !== -1 && nextIdx < endIdx) endIdx = nextIdx
      }
      const block = qsTsx.substring(startIdx, endIdx)
      depthMetrics[key].commands = (block.match(/command:\s*"/g) || []).length
    }
  }

  // Count papers (only from PAPERS array, not interface/JSX)
  if (pubTsx) {
    // Reuse papersArrayContent if available, otherwise extract
    const paperPattern = new RegExp(`project:\\s*"${s.name}"`, "g")
    if (typeof papersArrayContent !== "undefined") {
      depthMetrics[key].papers = (papersArrayContent.match(paperPattern) || []).length
    } else {
      depthMetrics[key].papers = (pubTsx.match(paperPattern) || []).length
    }
  }
}

// Calculate medians and flag outliers
const scenarioCounts = Object.values(depthMetrics).map(m => m.scenarios)
const commandCounts = Object.values(depthMetrics).map(m => m.commands)
const medianScenarios = scenarioCounts.sort((a, b) => a - b)[Math.floor(scenarioCounts.length / 2)]
const medianCommands = commandCounts.sort((a, b) => a - b)[Math.floor(commandCounts.length / 2)]
const MIN_SCENARIO_RATIO = 0.5  // Must have at least 50% of median scenarios
const MIN_COMMAND_RATIO = 0.7   // Must have at least 70% of median commands

console.log(`  Depth metrics (median scenarios: ${medianScenarios}, median commands: ${medianCommands}):`)
for (const s of sisters) {
  const m = depthMetrics[s.key]
  console.log(`    ${s.key}: ${m.scenarios} scenarios, ${m.commands} commands, ${m.papers} papers`)

  // Scenario depth check
  if (medianScenarios > 0 && m.scenarios < medianScenarios * MIN_SCENARIO_RATIO) {
    fail(`DEPTH: ${s.key} has ${m.scenarios} scenarios vs median ${medianScenarios} — significantly below sister average (min ${Math.ceil(medianScenarios * MIN_SCENARIO_RATIO)} required)`)
  } else {
    ok(`DEPTH: ${s.key} scenario count (${m.scenarios}) within acceptable range of median (${medianScenarios})`)
  }

  // Command depth check
  if (medianCommands > 0 && m.commands < medianCommands * MIN_COMMAND_RATIO) {
    fail(`DEPTH: ${s.key} has ${m.commands} commands vs median ${medianCommands} — significantly below sister average (min ${Math.ceil(medianCommands * MIN_COMMAND_RATIO)} required)`)
  } else {
    ok(`DEPTH: ${s.key} command count (${m.commands}) within acceptable range of median (${medianCommands})`)
  }

  // Every sister must have at least 1 paper
  if (m.papers < 1) {
    fail(`DEPTH: ${s.key} has NO papers — every sister must have at least one research paper`)
  } else {
    ok(`DEPTH: ${s.key} has ${m.papers} paper(s)`)
  }
}

// ── Y. Code Depth Guardrail — MCP crate Rust line counts ────────────────────
// Counts .rs lines in each sister's MCP crate src/ directory (recursively).
// If any sister's MCP code depth falls significantly below the median,
// it gets flagged as shallow. This prevents new sisters from shipping with
// stub implementations while older sisters have deep algorithmic code.
//
// The threshold is intentionally strict: every sister must have at least 60%
// of the median MCP crate line count.

console.log("\n── Y. Code depth guardrail (MCP crate .rs lines) ──")

function countRustLines(dir) {
  if (!existsSync(dir)) return 0
  let total = 0
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      total += countRustLines(full)
    } else if (entry.name.endsWith(".rs")) {
      const content = readFileSync(full, "utf-8")
      total += content.split("\n").length
    }
  }
  return total
}

const codeDepthMetrics = {}
for (const s of sisters) {
  const slug = `agentic-${s.key}`
  const repoDir = resolve(WORKSPACE, slug)

  // Use mcp.cratePath from registry if available, otherwise guess
  const mcpCratePath = s.mcp?.cratePath || `crates/${slug}-mcp`
  const mcpSrcDir = resolve(repoDir, mcpCratePath, "src")

  if (existsSync(mcpSrcDir)) {
    codeDepthMetrics[s.key] = countRustLines(mcpSrcDir)
  } else {
    codeDepthMetrics[s.key] = 0
  }
}

const depthValues = Object.values(codeDepthMetrics).filter(v => v > 0).sort((a, b) => a - b)
const medianCodeDepth = depthValues.length > 0 ? depthValues[Math.floor(depthValues.length / 2)] : 0
const MIN_CODE_DEPTH_RATIO = 0.6  // Must have at least 60% of median code depth
const MIN_ABSOLUTE_LINES = 2000   // Absolute floor: every sister needs at least 2000 .rs lines

console.log(`  Code depth metrics (median MCP crate: ${medianCodeDepth} lines):`)
for (const s of sisters) {
  const lines = codeDepthMetrics[s.key] || 0
  console.log(`    ${s.key}: ${lines.toLocaleString()} .rs lines in MCP crate src/`)

  // Absolute minimum
  if (lines < MIN_ABSOLUTE_LINES) {
    fail(`CODE-DEPTH: ${s.key} has ${lines} .rs lines — below absolute minimum of ${MIN_ABSOLUTE_LINES}`)
  } else {
    ok(`CODE-DEPTH: ${s.key} meets absolute minimum (${lines} >= ${MIN_ABSOLUTE_LINES} lines)`)
  }

  // Relative to median
  if (medianCodeDepth > 0 && lines < medianCodeDepth * MIN_CODE_DEPTH_RATIO) {
    fail(`CODE-DEPTH: ${s.key} has ${lines} .rs lines vs median ${medianCodeDepth} — significantly below sister average (min ${Math.ceil(medianCodeDepth * MIN_CODE_DEPTH_RATIO)} required)`)
  } else if (medianCodeDepth > 0) {
    const pct = Math.round((lines / medianCodeDepth) * 100)
    ok(`CODE-DEPTH: ${s.key} MCP code depth (${lines} lines, ${pct}% of median) within acceptable range`)
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
