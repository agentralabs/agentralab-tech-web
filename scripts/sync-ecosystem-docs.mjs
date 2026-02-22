#!/usr/bin/env node

import fs from "node:fs/promises"
import path from "node:path"

const repoRoot = process.cwd()
const args = process.argv.slice(2)
const strict = args.includes("--strict")
const workspaceFlagIndex = args.indexOf("--workspace")
const workspaceFromArg = workspaceFlagIndex >= 0 ? args[workspaceFlagIndex + 1] : undefined
const workspaceRoot = path.resolve(
  workspaceFromArg || process.env.AGENTRA_WORKSPACE_ROOT || path.join(repoRoot, ".."),
)

const EN_OUT_DIR = path.join(repoRoot, "docs", "ecosystem", "en")
const ZH_OUT_DIR = path.join(repoRoot, "docs", "ecosystem", "zh")

const DOC_SPECS = [
  {
    key: "workspace",
    name: "Workspace",
    docsPublicDir: path.join(workspaceRoot, "docs"),
    includeLanding: false,
  },
  {
    key: "memory",
    name: "AgenticMemory",
    docsPublicDir: path.join(workspaceRoot, "agentic-memory", "docs", "public"),
    includeLanding: true,
  },
  {
    key: "codebase",
    name: "AgenticCodebase",
    docsPublicDir: path.join(workspaceRoot, "agentic-codebase", "docs", "public"),
    includeLanding: true,
  },
  {
    key: "vision",
    name: "AgenticVision",
    docsPublicDir: path.join(workspaceRoot, "agentic-vision", "docs", "public"),
    includeLanding: true,
  },
  {
    key: "feedback",
    name: "Feedback and Community",
    docsPublicDir: path.join(workspaceRoot, "docs"),
    includeLanding: false,
    slugById: {
      "feedback-and-community": "feedback-community",
    },
  },
  {
    key: "architecture",
    name: "System Architecture",
    docsPublicDir: path.join(workspaceRoot, "docs"),
    includeLanding: false,
    slugById: {
      "system-architecture": "architecture-system",
    },
  },
  {
    key: "playbooks",
    name: "Use-Case Playbooks",
    docsPublicDir: path.join(workspaceRoot, "docs"),
    includeLanding: false,
    slugById: {
      "use-case-playbooks": "playbooks-use-cases",
    },
  },
]

const PUBLISHED_DOC_IDS = {
  workspace: [
    "how-to",
    "agentra-runtime-operations-update",
    "server-runtime-auth-artifact-sync",
  ],
  codebase: [
    "overview",
    "quickstart",
    "installation",
    "command-surface",
    "runtime-install-sync",
    "integration-guide",
    "concepts",
    "api-reference",
    "file-format",
    "benchmarks",
    "faq",
    "ecosystem/canonical_sister_kit",
  ],
  memory: [
    "quickstart",
    "installation",
    "command-surface",
    "runtime-install-sync",
    "integration-guide",
    "concepts",
    "api-reference",
    "file-format",
    "rust-api",
    "benchmarks",
    "faq",
    "ecosystem/canonical_sister_kit",
  ],
  vision: [
    "overview",
    "quickstart",
    "installation",
    "command-surface",
    "runtime-install-sync",
    "integration-guide",
    "concepts",
    "api-reference",
    "benchmarks",
    "faq",
    "limitations",
    "ecosystem/canonical_sister_kit",
  ],
  feedback: ["feedback-and-community"],
  architecture: ["system-architecture"],
  playbooks: ["use-case-playbooks"],
}

const PAGE_ORDER_SUFFIX = [
  "how-to",
  "agentra-runtime-operations-update",
  "server-runtime-auth-artifact-sync",
  "overview",
  "quickstart",
  "installation",
  "command-surface",
  "runtime-install-sync",
  "integration-guide",
  "concepts",
  "api-reference",
  "file-format",
  "rust-api",
  "benchmarks",
  "faq",
  "limitations",
  "guide",
  "feedback-and-community",
  "system-architecture",
  "use-case-playbooks",
]

function normalizePath(value) {
  return value.replaceAll("\\", "/")
}

function titleize(value) {
  return value
    .replace(/\.[A-Za-z0-9]+$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function splitFrontMatter(markdown) {
  if (!markdown.startsWith("---\n")) {
    return { frontMatter: {}, body: markdown }
  }

  const end = markdown.indexOf("\n---\n", 4)
  if (end < 0) {
    return { frontMatter: {}, body: markdown }
  }

  const raw = markdown.slice(4, end)
  const body = markdown.slice(end + 5)
  const frontMatter = {}

  for (const line of raw.split("\n")) {
    const idx = line.indexOf(":")
    if (idx < 0) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim().replace(/^"|"$/g, "")
    if (key) frontMatter[key] = value
  }

  return { frontMatter, body }
}

function extractFirstHeading(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : undefined
}

function stripLeadingH1(markdown) {
  return markdown.replace(/^#\s+.+\n+/m, "")
}

function extractDescription(markdown) {
  const lines = markdown.split("\n")
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (trimmed.startsWith("#")) continue
    if (trimmed.startsWith("```")) continue
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) continue
    if (trimmed.startsWith(">")) continue
    return trimmed.length > 180 ? `${trimmed.slice(0, 177)}...` : trimmed
  }
  return undefined
}

function sanitizeForPublic(markdown) {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/\/Users\/[^\s)"']+/g, "$HOME/<path>")
    .replace(/\/home\/[A-Za-z0-9_-]+\//g, "$HOME/")
    .replace(/C:\\\\[^\s)"']+/g, "%USERPROFILE%\\<path>")
    .replace(/\/private\/tmp\/[A-Za-z0-9_\-/.]+/g, "/tmp/<artifact>")
    .trim()
}

function escapeUnsafeAngles(markdown) {
  const lines = markdown.split("\n")
  let inFence = false

  return lines
    .map((line) => {
      const trimmed = line.trimStart()
      if (trimmed.startsWith("```")) {
        inFence = !inFence
        return line
      }
      if (inFence) return line
      return line
        .replace(/<(?=\s*\d)/g, "&lt;")
        .replace(/<([A-Za-z0-9_.-]+)>/g, (_, token) => `&lt;${token}&gt;`)
    })
    .join("\n")
}

function parseHref(rawHref) {
  const hashIndex = rawHref.indexOf("#")
  if (hashIndex < 0) return { pathPart: rawHref, anchor: "" }
  return { pathPart: rawHref.slice(0, hashIndex), anchor: rawHref.slice(hashIndex) }
}

function rewriteLocalLinks(markdown, currentId, idToSlug) {
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (full, text, href) => {
    const value = href.trim()
    if (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("mailto:") ||
      value.startsWith("tel:") ||
      value.startsWith("#") ||
      value.startsWith("/")
    ) {
      return full
    }

    const { pathPart, anchor } = parseHref(value)
    if (!pathPart) return full

    const currentDir = path.posix.dirname(currentId)
    const resolved = path.posix
      .normalize(path.posix.join(currentDir, pathPart))
      .replace(/^\.\//, "")
      .replace(/^\//, "")
      .replace(/\.(md|mdx)$/i, "")
      .toLowerCase()

    const slug = idToSlug.get(resolved)
    if (!slug) return full

    return `[${text}](/docs/${slug}${anchor})`
  })
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function writeIfChanged(file, content) {
  let current = null
  try {
    current = await fs.readFile(file, "utf8")
  } catch {
    current = null
  }

  if (current === content) return
  await fs.writeFile(file, content, "utf8")
}

async function pathExists(target) {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

async function walkMarkdownFiles(rootDir) {
  const out = []

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const abs = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await walk(abs)
      } else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
        out.push(abs)
      }
    }
  }

  await walk(rootDir)
  return out
}

function mdxPage({ title, description, body }) {
  const safeTitle = JSON.stringify(String(title))
  const safeDescription = JSON.stringify(String(description))
  return `---\ntitle: ${safeTitle}\ndescription: ${safeDescription}\n---\n\n${body}\n`
}

function sortDocEntries(entries, key) {
  const rank = new Map(PAGE_ORDER_SUFFIX.map((value, index) => [value, index]))
  const prefix = `${key}-`

  return [...entries].sort((a, b) => {
    const aSuffix = a.slug.startsWith(prefix) ? a.slug.slice(prefix.length) : a.slug
    const bSuffix = b.slug.startsWith(prefix) ? b.slug.slice(prefix.length) : b.slug

    const aRank = rank.has(aSuffix) ? rank.get(aSuffix) : Number.POSITIVE_INFINITY
    const bRank = rank.has(bSuffix) ? rank.get(bSuffix) : Number.POSITIVE_INFINITY
    if (aRank !== bRank) return aRank - bRank

    return a.slug.localeCompare(b.slug)
  })
}

async function buildDocPages(spec) {
  const exists = await pathExists(spec.docsPublicDir)
  if (!exists) {
    const message = `[sync] Missing public docs directory: ${spec.docsPublicDir}`
    if (strict) throw new Error(message)
    console.warn(message)
    return { entries: [], enPages: new Map(), zhPages: new Map(), landingEn: "", landingZh: "" }
  }

  const files = await walkMarkdownFiles(spec.docsPublicDir)
  const allowedIds = new Set(PUBLISHED_DOC_IDS[spec.key] || [])
  const filteredFiles = allowedIds.size
    ? files.filter((file) => {
        const rel = normalizePath(path.relative(spec.docsPublicDir, file))
        const id = rel.replace(/\.(md|mdx)$/i, "").toLowerCase()
        return allowedIds.has(id)
      })
    : files

  if (!filteredFiles.length && strict) {
    throw new Error(`[sync] No markdown files found in ${spec.docsPublicDir}`)
  }

  if (allowedIds.size) {
    const presentIds = new Set(
      filteredFiles.map((file) =>
        normalizePath(path.relative(spec.docsPublicDir, file))
          .replace(/\.(md|mdx)$/i, "")
          .toLowerCase(),
      ),
    )

    const missing = [...allowedIds].filter((id) => !presentIds.has(id))
    if (missing.length) {
      const message = `[sync] Missing expected public docs for ${spec.name}: ${missing.join(", ")}`
      if (strict) throw new Error(message)
      console.warn(message)
    }
  }

  const rawEntries = filteredFiles.map((file) => {
    const rel = normalizePath(path.relative(spec.docsPublicDir, file))
    const id = rel.replace(/\.(md|mdx)$/i, "").toLowerCase()
    const suffix = id === "index" ? "overview" : slugify(id.replaceAll("/", "-"))
    const explicitSlug = spec.slugById?.[id]
    return {
      file,
      rel,
      id,
      slug: explicitSlug || `${spec.key}-${suffix}`,
    }
  })

  const unique = []
  const seen = new Set()
  for (const entry of rawEntries) {
    let slug = entry.slug
    let n = 2
    while (seen.has(slug)) {
      slug = `${entry.slug}-${n}`
      n += 1
    }
    seen.add(slug)
    unique.push({ ...entry, slug })
  }

  const idToSlug = new Map(unique.map((entry) => [entry.id, entry.slug]))

  const enriched = []
  for (const entry of unique) {
    const source = await fs.readFile(entry.file, "utf8")
    const { frontMatter, body } = splitFrontMatter(source)
    const fallbackTitle = titleize(path.basename(entry.id))
    const title = String(frontMatter.title || extractFirstHeading(body) || fallbackTitle)
    const stripped = stripLeadingH1(body)
    const rewritten = rewriteLocalLinks(stripped, entry.id, idToSlug)
    const cleaned = escapeUnsafeAngles(sanitizeForPublic(rewritten))
    const description = String(frontMatter.description || extractDescription(cleaned) || `${spec.name} documentation page.`)

    enriched.push({
      ...entry,
      title,
      description,
      body: cleaned || "This page is intentionally concise.",
    })
  }

  const ordered = sortDocEntries(enriched, spec.key)

  const enPages = new Map()
  const zhPages = new Map()

  for (const item of ordered) {
    enPages.set(
      item.slug,
      mdxPage({ title: item.title, description: item.description, body: item.body }),
    )

    zhPages.set(
      item.slug,
      mdxPage({ title: item.title, description: item.description, body: item.body }),
    )
  }

  const linksEn = ordered
    .map((item) => `- [${item.title}](/docs/${item.slug})`)
    .join("\n")

  const linksZh = ordered
    .map((item) => `- [${item.title}](/docs/${item.slug})`)
    .join("\n")

  const includeLanding = spec.includeLanding !== false
  const landingSlug = includeLanding ? `${spec.key}-docs` : ""
  const landingEn = includeLanding
    ? mdxPage({
      title: `${spec.name} Docs`,
      description: `Public source documentation for ${spec.name}.`,
      body: `## ${spec.name} Navigation\n\n${linksEn}\n`,
    })
    : ""

  const landingZh = includeLanding
    ? mdxPage({
      title: `${spec.name} 文档`,
      description: `${spec.name} 的公开来源文档。`,
      body: `## ${spec.name} 导航\n\n${linksZh}\n`,
    })
    : ""

  return {
    entries: ordered,
    enPages,
    zhPages,
    landingSlug,
    landingEn,
    landingZh,
  }
}

async function pruneOutput(dir, keepFiles) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isFile()) continue
    if (!/\.(md|mdx|json)$/i.test(entry.name)) continue
    if (!keepFiles.has(entry.name)) {
      await fs.unlink(path.join(dir, entry.name))
    }
  }
}

async function main() {
  const sourceChecks = await Promise.all(
    DOC_SPECS.map(async (spec) => ({
      spec,
      exists: await pathExists(spec.docsPublicDir),
    })),
  )

  const missing = sourceChecks.filter((entry) => !entry.exists)
  if (missing.length && !strict) {
    const missingList = missing.map((entry) => entry.spec.docsPublicDir).join(", ")
    console.warn(
      `[sync] skipped: canonical source docs unavailable (${missingList}); keeping committed docs/ecosystem output`,
    )
    return
  }

  await ensureDir(EN_OUT_DIR)
  await ensureDir(ZH_OUT_DIR)

  const docResults = []
  for (const spec of DOC_SPECS) {
    // eslint-disable-next-line no-await-in-loop
    docResults.push({ spec, ...(await buildDocPages(spec)) })
  }

  const enFiles = new Map()
  const zhFiles = new Map()

  const indexEnBody = [
    "This documentation hub brings together workspace and sister documentation in one place.",
    "",
    "## Sections",
    "",
    ...docResults
      .map(({ spec, landingSlug, entries }) => {
        const target = landingSlug || entries[0]?.slug
        return target ? `- [${spec.name}](/docs/${target})` : ""
      })
      .filter(Boolean),
  ].join("\n")

  const indexZhBody = [
    "该文档中心将工作区与三姐妹文档汇总到同一个入口。",
    "",
    "## 分组",
    "",
    ...docResults
      .map(({ spec, landingSlug, entries }) => {
        const target = landingSlug || entries[0]?.slug
        return target ? `- [${spec.name}](/docs/${target})` : ""
      })
      .filter(Boolean),
  ].join("\n")

  enFiles.set(
    "index.mdx",
    mdxPage({
      title: "Documentation",
      description: "Unified documentation for workspace and sister systems.",
      body: indexEnBody,
    }),
  )

  zhFiles.set(
    "index.mdx",
    mdxPage({
      title: "文档",
      description: "工作区与三姐妹系统的统一文档入口。",
      body: indexZhBody,
    }),
  )

  const orderedPages = ["index"]

  for (const result of docResults) {
    const { landingSlug, landingEn, landingZh, enPages, zhPages } = result

    if (landingSlug && landingEn && landingZh) {
      enFiles.set(`${landingSlug}.mdx`, landingEn)
      zhFiles.set(`${landingSlug}.mdx`, landingZh)
      orderedPages.push(landingSlug)
    }

    for (const [slug, content] of enPages.entries()) {
      enFiles.set(`${slug}.mdx`, content)
      orderedPages.push(slug)
    }
    for (const [slug, content] of zhPages.entries()) {
      zhFiles.set(`${slug}.mdx`, content)
    }
  }

  const uniqueOrderedPages = [...new Set(orderedPages)]

  enFiles.set(
    "meta.json",
    `${JSON.stringify({ title: "Agentra Labs Docs", pages: uniqueOrderedPages }, null, 2)}\n`,
  )
  zhFiles.set(
    "meta.json",
    `${JSON.stringify({ title: "Agentra Labs 文档", pages: uniqueOrderedPages }, null, 2)}\n`,
  )

  for (const [name, content] of enFiles.entries()) {
    // eslint-disable-next-line no-await-in-loop
    await writeIfChanged(path.join(EN_OUT_DIR, name), content)
  }
  for (const [name, content] of zhFiles.entries()) {
    // eslint-disable-next-line no-await-in-loop
    await writeIfChanged(path.join(ZH_OUT_DIR, name), content)
  }

  await pruneOutput(EN_OUT_DIR, new Set(enFiles.keys()))
  await pruneOutput(ZH_OUT_DIR, new Set(zhFiles.keys()))

  console.log("[sync] docs generated from canonical sources")
}

main().catch((error) => {
  console.error("[sync] failed:", error.message)
  process.exit(1)
})
