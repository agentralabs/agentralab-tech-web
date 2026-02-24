#!/usr/bin/env node

import fs from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const navContractPath = path.join(root, "docs", "ecosystem", "navigation-contract.json")
const metaEnPath = path.join(root, "docs", "ecosystem", "en", "meta.json")
const metaZhPath = path.join(root, "docs", "ecosystem", "zh", "meta.json")

const EXPECTED_CORE_GROUP_ORDER = [
  "Overview",
  "Feedback and Community",
  "System Architecture",
  "Use-Case Playbooks",
  "Glossary",
]

const EXPECTED_CORE_SLUG_ORDER = [
  "index",
  "feedback-community",
  "architecture-system",
  "playbooks-use-cases",
  "glossary",
]

function fail(message) {
  console.error(`[docs-nav-contract] ${message}`)
  process.exit(1)
}

function expectArrayEquals(actual, expected, label) {
  if (!Array.isArray(actual)) {
    fail(`${label} is missing or not an array`)
  }
  if (actual.length !== expected.length) {
    fail(`${label} length mismatch: expected ${expected.length}, got ${actual.length}`)
  }
  for (let i = 0; i < expected.length; i += 1) {
    if (actual[i] !== expected[i]) {
      fail(`${label} mismatch at index ${i}: expected "${expected[i]}", got "${actual[i]}"`)
    }
  }
}

function expectIncludesInOrder(haystack, orderedNeedles, label) {
  let prev = -1
  for (const needle of orderedNeedles) {
    const idx = haystack.indexOf(needle)
    if (idx < 0) {
      fail(`${label} is missing required page "${needle}"`)
    }
    if (idx <= prev) {
      fail(`${label} order violation around "${needle}"`)
    }
    prev = idx
  }
}

async function readJson(file) {
  const raw = await fs.readFile(file, "utf8")
  return JSON.parse(raw)
}

async function main() {
  const [navContract, metaEn, metaZh] = await Promise.all([
    readJson(navContractPath),
    readJson(metaEnPath),
    readJson(metaZhPath),
  ])

  expectArrayEquals(navContract.coreGroupOrder, EXPECTED_CORE_GROUP_ORDER, "coreGroupOrder")
  expectArrayEquals(navContract.requiredCoreSlugOrder, EXPECTED_CORE_SLUG_ORDER, "requiredCoreSlugOrder")

  if (!Array.isArray(metaEn.pages) || !Array.isArray(metaZh.pages)) {
    fail("meta.json pages arrays are missing")
  }

  expectIncludesInOrder(metaEn.pages, EXPECTED_CORE_SLUG_ORDER, "en/meta.json")
  expectIncludesInOrder(metaZh.pages, EXPECTED_CORE_SLUG_ORDER, "zh/meta.json")

  if (!Array.isArray(navContract.sisters)) {
    fail("sisters contract missing")
  }

  const seen = new Set()
  for (const sister of navContract.sisters) {
    if (!sister || typeof sister !== "object") {
      fail("invalid sister entry in contract")
    }
    const key = String(sister.key || "").trim().toLowerCase()
    if (!key) fail("sister key missing")
    if (seen.has(key)) fail(`duplicate sister key "${key}" in contract`)
    seen.add(key)

    const enabled = sister.enabled !== false
    if (!enabled) continue

    if (sister.includeLanding !== true) {
      fail(`enabled sister "${key}" must include landing`)
    }

    const expectedLanding = `${key}-docs`
    if (sister.landingSlug !== expectedLanding) {
      fail(`enabled sister "${key}" has invalid landingSlug: expected "${expectedLanding}", got "${sister.landingSlug}"`)
    }
  }

  console.log("[docs-nav-contract] OK")
}

main().catch((error) => fail(error instanceof Error ? error.message : String(error)))
