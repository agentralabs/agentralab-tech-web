#!/usr/bin/env node

import { promises as fs } from "node:fs"
import path from "node:path"
import process from "node:process"

const INDEX_PATH = path.join(process.cwd(), "data", "lab-log-index.json")
const API_BASE = "https://api.github.com"

function fail(message) {
  console.error(message)
  process.exitCode = 1
}

function qualityGate(entry) {
  if (!entry || typeof entry !== "object") {
    throw new Error("Missing lab log entry.")
  }
  if (!Array.isArray(entry.notes) || entry.notes.length < 3) {
    throw new Error("Release note quality gate failed: expected at least 3 business paragraphs.")
  }
  for (const [index, paragraph] of entry.notes.entries()) {
    if (typeof paragraph !== "string" || paragraph.trim().length < 120) {
      throw new Error(`Release note quality gate failed: paragraph ${index + 1} is too short.`)
    }
  }
  if (!Array.isArray(entry.highlights) || entry.highlights.length < 3) {
    throw new Error("Release note quality gate failed: expected at least 3 highlights.")
  }
  if (!Array.isArray(entry.sources) || entry.sources.length < 2) {
    throw new Error("Release note quality gate failed: expected at least 2 source links.")
  }
}

function hashSeed(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 33 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

function pick(items, seed, offset = 0) {
  if (!items.length) return ""
  return items[(seed + offset) % items.length]
}

function releaseTag(entry) {
  return `lab-log-${String(entry.dateIso || "").replace(/-/g, "")}-${String(entry.slug || "").slice(-4)}`
}

function buildReleaseBody(entry) {
  const seed = hashSeed(`${entry.slug}:${entry.title}`)
  const intros = [
    "This release packages the latest business-critical execution signals from the Agentra ecosystem.",
    "This publication captures the latest delivery outcomes and converts them into an operator-ready release narrative.",
    "This release communicates the current execution posture with emphasis on deployment readiness and operational control.",
  ]
  const closers = [
    "Execution recommendation: roll out in stages, verify runtime health, then promote broadly.",
    "Operational recommendation: validate MCP wiring and artifact integrity in staging before production promotion.",
    "Delivery recommendation: complete migration and runtime checks first, then scale rollout by environment tier.",
  ]

  const highlights = entry.highlights.slice(0, 6).map((item) => `- ${item}`).join("\n")
  const sources = entry.sources.slice(0, 8).map((item) => `- [${item.label}](${item.href})`).join("\n")

  const paragraphs = [
    `${pick(intros, seed)} ${entry.notes[0]}`,
    entry.notes[1],
    `${entry.notes[2]} ${pick(closers, seed, 5)}`,
  ]

  return [
    "## Executive Summary",
    "",
    paragraphs[0],
    "",
    paragraphs[1],
    "",
    paragraphs[2],
    "",
    "## Delivery Highlights",
    "",
    highlights,
    "",
    "## Source Validation",
    "",
    sources,
  ].join("\n")
}

async function readLatestEntry() {
  const raw = await fs.readFile(INDEX_PATH, "utf8")
  const entries = JSON.parse(raw)
  if (!Array.isArray(entries) || entries.length === 0) {
    throw new Error("No lab log entries found in data/lab-log-index.json")
  }
  return entries[0]
}

async function githubRequest(url, options = {}) {
  const token = process.env.AGENTRA_GITHUB_TOKEN || process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error("Missing AGENTRA_GITHUB_TOKEN or GITHUB_TOKEN")
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "user-agent": "agentralabs-lab-log-release-bot",
      ...(options.headers || {}),
    },
  })

  return response
}

async function main() {
  const repository = process.env.GITHUB_REPOSITORY
  if (!repository || !repository.includes("/")) {
    throw new Error("GITHUB_REPOSITORY is required (owner/repo)")
  }

  const entry = await readLatestEntry()
  qualityGate(entry)

  const tag = releaseTag(entry)
  const title = `${entry.title} · Release Broadcast`
  const body = buildReleaseBody(entry)

  if (process.env.LAB_LOG_RELEASE_DRY_RUN === "1") {
    console.log(`DRY RUN: would create release ${tag}`)
    console.log(body)
    return
  }

  const existing = await githubRequest(`${API_BASE}/repos/${repository}/releases/tags/${encodeURIComponent(tag)}`)
  if (existing.status === 200) {
    console.log(`Release already exists for tag ${tag}; skipping.`)
    return
  }
  if (existing.status !== 404) {
    const text = await existing.text()
    throw new Error(`Failed checking existing release: ${existing.status} ${text}`)
  }

  const createResponse = await githubRequest(`${API_BASE}/repos/${repository}/releases`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      tag_name: tag,
      target_commitish: process.env.GITHUB_SHA || "main",
      name: title,
      body,
      draft: false,
      prerelease: false,
      generate_release_notes: false,
    }),
  })

  if (!createResponse.ok) {
    const text = await createResponse.text()
    throw new Error(`Release creation failed: ${createResponse.status} ${text}`)
  }

  const payload = await createResponse.json()
  console.log(`Created GitHub release: ${payload.html_url}`)
}

main().catch((error) => fail(`Lab Log release sync failed: ${error.message}`))
