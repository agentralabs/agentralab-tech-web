#!/usr/bin/env node

import { promises as fs } from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, "..")

const DATA_DIR = path.join(ROOT, "data")
const CONTENT_DIR = path.join(ROOT, "content", "lab-log")
const STATE_PATH = path.join(DATA_DIR, "lab-log-state.json")
const INDEX_PATH = path.join(DATA_DIR, "lab-log-index.json")
const MANUAL_PATH = path.join(DATA_DIR, "lab-log-manual.json")

const DEFAULT_REPOS = [
  "agentralabs/agentralabs-tech",
  "agentralabs/agentralab-tech-web",
  "agentralabs/agentic-memory",
  "agentralabs/agentic-vision",
  "agentralabs/agentic-codebase",
  "agentralabs/agentic-identity",
  "agentralabs/agentic-time",
]

const API_BASE = "https://api.github.com"

function envNumber(name, fallback) {
  const raw = process.env[name]
  if (!raw) return fallback
  const value = Number(raw)
  if (!Number.isFinite(value)) return fallback
  return value
}

function envBool(name) {
  const raw = process.env[name]
  if (!raw) return false
  return ["1", "true", "yes", "on"].includes(raw.toLowerCase())
}

function repoName(repoPath) {
  const parts = repoPath.split("/")
  return parts[1] || repoPath
}

function toIsoDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

function compactText(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function summarize(text, max = 220) {
  const compact = compactText(text)
  if (!compact) return "Update available in source logs."
  if (compact.length <= max) return compact
  return `${compact.slice(0, max - 3).trim()}...`
}

function uniqueBy(items, toKey) {
  const seen = new Set()
  const output = []
  for (const item of items) {
    const key = toKey(item)
    if (seen.has(key)) continue
    seen.add(key)
    output.push(item)
  }
  return output
}

function plural(word, count) {
  return count === 1 ? word : `${word}s`
}

function pluralRepository(count) {
  return count === 1 ? "repository" : "repositories"
}

async function readJson(filePath, fallback) {
  try {
    const content = await fs.readFile(filePath, "utf8")
    return JSON.parse(content)
  } catch {
    return fallback
  }
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8")
}

function parseRepos(raw) {
  if (!raw) return DEFAULT_REPOS
  const repos = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
  return repos.length ? repos : DEFAULT_REPOS
}

function githubHeaders() {
  const token = process.env.AGENTRA_GITHUB_TOKEN || process.env.GITHUB_TOKEN
  return {
    accept: "application/vnd.github+json",
    "user-agent": "agentralabs-lab-log-bot",
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  }
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: githubHeaders() })
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }
  return response.json()
}

async function fetchRepoEvents(repoPath) {
  const [releases, commits] = await Promise.all([
    fetchJson(`${API_BASE}/repos/${repoPath}/releases?per_page=4`).catch(() => []),
    fetchJson(`${API_BASE}/repos/${repoPath}/commits?per_page=6`).catch(() => []),
  ])

  const releaseEvents = releases
    .filter((release) => !release.draft)
    .map((release) => {
      const publishedAt = toIsoDate(release.published_at || release.created_at)
      if (!publishedAt) return null
      const title = (release.name || release.tag_name || "Release").trim()
      const summary = summarize(release.body || title)
      return {
        id: `release:${repoPath}:${release.id}`,
        repoPath,
        repoName: repoName(repoPath),
        kind: "release",
        title,
        summary,
        url: release.html_url,
        publishedAt,
      }
    })
    .filter(Boolean)

  const commitEvents = commits
    .map((commit) => {
      const publishedAt = toIsoDate(commit?.commit?.author?.date)
      if (!publishedAt) return null
      const sha = String(commit.sha || "").slice(0, 12)
      if (!sha) return null
      const message = String(commit?.commit?.message || "").split("\n")[0].trim()
      const title = message || `Commit ${sha}`
      return {
        id: `commit:${repoPath}:${sha}`,
        repoPath,
        repoName: repoName(repoPath),
        kind: "commit",
        title,
        summary: summarize(message || "Repository update."),
        url: commit.html_url,
        publishedAt,
      }
    })
    .filter(Boolean)

  return [...releaseEvents, ...commitEvents]
}

async function fetchManualEvents() {
  const payload = await readJson(MANUAL_PATH, [])
  const entries = Array.isArray(payload) ? payload : payload?.entries
  if (!Array.isArray(entries)) return []

  return entries
    .map((entry) => {
      const id = entry?.id ? String(entry.id) : null
      const title = entry?.title ? String(entry.title).trim() : null
      const url = entry?.url ? String(entry.url).trim() : null
      const publishedAt = toIsoDate(entry?.publishedAt || entry?.dateIso)
      if (!id || !title || !url || !publishedAt) return null

      const repoPath = entry?.repoPath ? String(entry.repoPath) : "agentralabs/lab-log"
      return {
        id: `manual:${id}`,
        repoPath,
        repoName: repoName(repoPath),
        kind: "manual",
        title,
        summary: summarize(String(entry?.summary || title)),
        url,
        publishedAt,
      }
    })
    .filter(Boolean)
}

function createSlug(nowIso) {
  const compact = nowIso.replace(/[-:]/g, "").replace(/\..+$/, "")
  return `lab-log-${compact.slice(0, 13)}`
}

function hashSeed(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

function pick(items, seed, offset = 0) {
  if (!items.length) return ""
  return items[(seed + offset) % items.length]
}

function ensureNotesQuality(notes) {
  if (!Array.isArray(notes) || notes.length < 3) {
    throw new Error("Release narrative quality gate failed: expected at least 3 paragraphs.")
  }

  for (const [index, note] of notes.entries()) {
    if (typeof note !== "string" || note.trim().length < 120) {
      throw new Error(`Release narrative quality gate failed: paragraph ${index + 1} is too short.`)
    }
  }
}

function heartbeatEvent(nowIso) {
  return {
    id: `heartbeat:${nowIso}`,
    repoPath: "agentralabs/lab-log",
    repoName: "agentralabs",
    kind: "manual",
    title: "No major upstream deltas in this cycle",
    summary: "Routine operations heartbeat generated on schedule.",
    url: "https://github.com/agentralabs",
    publishedAt: nowIso,
  }
}

function buildNarrative(selectedEvents, nowIso) {
  const seed = hashSeed(
    `${nowIso}:${selectedEvents.map((event) => `${event.repoName}:${event.title}`).join("|")}`,
  )
  const dateIso = nowIso.slice(0, 10)
  const repoSet = new Set(selectedEvents.map((event) => event.repoName))
  const releaseCount = selectedEvents.filter((event) => event.kind === "release").length
  const commitCount = selectedEvents.filter((event) => event.kind === "commit").length
  const manualCount = selectedEvents.filter((event) => event.kind === "manual").length
  const repoList = Array.from(repoSet).slice(0, 4).join(", ")

  const openingVariants = [
    "This cycle focused on converting active roadmap commitments into shippable operational outcomes.",
    "This publishing window concentrated on execution quality, with delivery aimed at production confidence.",
    "The latest release cycle prioritized deployable improvements tied to reliability and operator speed.",
  ]
  const impactVariants = [
    "From a business perspective, the net effect is lower integration drag and faster time-to-value for teams adopting the stack.",
    "Operationally, these updates reduce onboarding overhead and improve release confidence across environments.",
    "Commercially, this batch improves deployment readiness and lowers the support burden during rollout.",
  ]
  const nextStepVariants = [
    "Recommended action is phased rollout through staging, then controlled promotion into shared environments after MCP and artifact checks.",
    "Teams should validate runtime compatibility in staging, clear migration checks, then proceed with progressive deployment.",
    "The safest rollout path is staged verification first, followed by controlled promotion once telemetry and MCP wiring are clean.",
  ]

  const paragraph1 =
    `This blog update captures the latest publishing window ending on ${dateIso}. ` +
    `We recorded ${selectedEvents.length} ${plural("signal", selectedEvents.length)} across ${repoSet.size} ${pluralRepository(repoSet.size)}, ` +
    `including ${releaseCount} ${plural("release", releaseCount)}, ${commitCount} commit ${plural("update", commitCount)}, and ${manualCount} manually curated ${plural("note", manualCount)}. ` +
    `${pick(openingVariants, seed)}`

  const highlights = selectedEvents.slice(0, 4).map((event) => {
    if (event.kind === "release") return `${event.repoName}: released ${event.title}`
    if (event.kind === "manual") return `${event.repoName}: ${event.title}`
    return `${event.repoName}: commit ${event.title}`
  })

  const paragraph2 =
    `Highlights from this cycle: ${highlights.join("; ")}. ` +
    `Taken together, these changes focus on runtime reliability, clearer operations flow, and lower adoption friction across the Agentra systems. ` +
    `${pick(impactVariants, seed, 3)} Core repositories touched in this cycle: ${repoList || "agentralabs core stack"}.`

  const paragraph3 =
    `${pick(nextStepVariants, seed, 7)} ` +
    `For each item, source links are attached below so teams can validate scope, migration impact, and follow-up tasks without context loss before broad release communication.`

  const summary =
    `${selectedEvents.length} fresh ${plural("signal", selectedEvents.length)} across ${repoSet.size} ${plural("repo", repoSet.size)} in the latest 4-5 day publishing window.`

  return {
    summary,
    notes: [paragraph1, paragraph2, paragraph3],
  }
}

function toMdx(entry) {
  const tags = ["lab-log", "automation", "releases", "operations"]
  const sourceUrls = entry.sources.map((source) => source.href)

  const frontmatter = [
    "---",
    `title: \"${entry.title.replace(/\"/g, '\\\"')}\"`,
    `summary: \"${entry.summary.replace(/\"/g, '\\\"')}\"`,
    `publishedAt: \"${entry.publishedAt}\"`,
    "tags:",
    ...tags.map((tag) => `  - \"${tag}\"`),
    "sources:",
    ...sourceUrls.map((href) => `  - \"${href}\"`),
    "---",
  ].join("\n")

  const highlights = entry.highlights.map((item) => `- ${item}`).join("\n")
  const sources = entry.sources.map((item) => `- [${item.label}](${item.href})`).join("\n")

  return `${frontmatter}\n\n## What shipped\n\n${entry.notes[0]}\n\n## Why it matters\n\n${entry.notes[1]}\n\n## What to do next\n\n${entry.notes[2]}\n\n### Highlights\n\n${highlights}\n\n### Sources\n\n${sources}\n`
}

async function main() {
  const intervalHours = envNumber("LAB_LOG_INTERVAL_HOURS", 96)
  const minEvents = envNumber("LAB_LOG_MIN_EVENTS", 2)
  const maxSignals = envNumber("LAB_LOG_MAX_SIGNALS", 6)
  const forcePublish = envBool("LAB_LOG_FORCE")
  const nowIso = new Date().toISOString()

  const repos = parseRepos(process.env.LAB_LOG_REPO_SOURCES)

  const state = await readJson(STATE_PATH, {
    lastPublishedAt: null,
    lastSlug: null,
    seenEventIds: [],
  })

  const lastPublished = state.lastPublishedAt ? new Date(state.lastPublishedAt) : null
  const hoursSinceLast = lastPublished ? (Date.now() - lastPublished.getTime()) / (1000 * 60 * 60) : Number.POSITIVE_INFINITY

  if (!forcePublish && hoursSinceLast < intervalHours) {
    console.log(`Skip publish: last entry was ${hoursSinceLast.toFixed(1)}h ago (< ${intervalHours}h window).`)
    return
  }

  const [manualEvents, ...repoEvents] = await Promise.all([
    fetchManualEvents(),
    ...repos.map((repo) => fetchRepoEvents(repo)),
  ])

  const allEvents = [...manualEvents, ...repoEvents.flat()]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  const seenSet = new Set(Array.isArray(state.seenEventIds) ? state.seenEventIds : [])
  const unseen = allEvents.filter((event) => !seenSet.has(event.id))

  const selectedPool = unseen.length >= minEvents ? unseen : allEvents
  const selectedEvents = selectedPool.length ? selectedPool.slice(0, Math.max(1, maxSignals)) : [heartbeatEvent(nowIso)]
  const carryoverMode = unseen.length < minEvents

  if (carryoverMode) {
    console.log(
      `Carryover mode: ${unseen.length} unseen ${plural("event", unseen.length)} found (minimum ${minEvents}), publishing heartbeat from latest available signals.`,
    )
  }
  const slug = createSlug(nowIso)
  const dateIso = nowIso.slice(0, 10)

  const narrative = buildNarrative(selectedEvents, nowIso)
  ensureNotesQuality(narrative.notes)
  const sourceItems = uniqueBy(
    selectedEvents.map((event) => ({
      label: `${event.repoName} · ${event.kind}`,
      href: event.url,
    })),
    (item) => item.href,
  )

  const highlights = selectedEvents.map((event) => {
    const prefix = event.kind === "release" ? "release" : event.kind === "manual" ? "note" : "commit"
    return `${event.repoName} (${prefix}): ${event.title}`
  })

  const entry = {
    slug,
    title: `Blog Update · ${dateIso}`,
    dateIso,
    publishedAt: nowIso,
    summary: narrative.summary,
    category: "Release",
    notes: narrative.notes,
    highlights,
    sources: sourceItems,
    sourceCount: sourceItems.length,
    signalCount: selectedEvents.length,
    carryoverMode,
    reposTouched: Array.from(new Set(selectedEvents.map((event) => event.repoName))),
  }

  const existingIndex = await readJson(INDEX_PATH, [])
  const indexList = Array.isArray(existingIndex) ? existingIndex : []
  const nextIndex = [entry, ...indexList.filter((item) => item?.slug !== slug)].slice(0, 120)

  const nextState = {
    lastPublishedAt: nowIso,
    lastSlug: slug,
    seenEventIds: uniqueBy([...selectedEvents.map((event) => event.id), ...seenSet], (item) => item).slice(0, 2000),
  }

  await fs.mkdir(CONTENT_DIR, { recursive: true })
  await fs.writeFile(path.join(CONTENT_DIR, `${slug}.mdx`), toMdx(entry), "utf8")
  await writeJson(INDEX_PATH, nextIndex)
  await writeJson(STATE_PATH, nextState)

  console.log(`Published ${slug} with ${selectedEvents.length} signals from ${entry.reposTouched.length} repos.`)
}

main().catch((error) => {
  console.error("Lab Log generation failed:", error)
  process.exitCode = 1
})
