#!/usr/bin/env node

import fs from "node:fs/promises"
import path from "node:path"

const repoRoot = process.cwd()
const args = process.argv.slice(2)
const strict = args.includes("--strict")
const liveTranslate = args.includes("--live-translate")
const workspaceFlagIndex = args.indexOf("--workspace")
const workspaceFromArg = workspaceFlagIndex >= 0 ? args[workspaceFlagIndex + 1] : undefined
const workspaceRoot = path.resolve(
  workspaceFromArg || process.env.AGENTRA_WORKSPACE_ROOT || path.join(repoRoot, ".."),
)

const EN_OUT_DIR = path.join(repoRoot, "docs", "ecosystem", "en")
const ZH_OUT_DIR = path.join(repoRoot, "docs", "ecosystem", "zh")
const NAV_CONTRACT_FILE = path.join(repoRoot, "docs", "ecosystem", "navigation-contract.json")
const ZH_TRANSLATION_CACHE = path.join(repoRoot, "scripts", "data", "zh-translation-cache.json")
const SISTER_OVERRIDES_FILE = path.join(repoRoot, "docs", "config", "sister-overrides.json")
const SISTER_MANIFEST_NAME = "sister.manifest.json"
const CORE_GROUP_ORDER = [
  "Overview",
  "Feedback and Community",
  "System Architecture",
  "Use-Case Playbooks",
  "Glossary",
]
const VALID_DOC_STATUSES = new Set(["internal", "candidate", "stable"])
const REQUIRED_CORE_SLUG_ORDER = [
  "index",
  "feedback-community",
  "architecture-system",
  "playbooks-use-cases",
  "glossary",
]

const CORE_DOC_SPECS = [
  {
    key: "feedback",
    name: "Feedback and Community",
    docsPublicDir: path.join(workspaceRoot, "docs"),
    includeLanding: false,
    publishedDocIds: ["feedback-and-community"],
    enforceWhitelist: false,
    slugById: {
      "feedback-and-community": "feedback-community",
    },
  },
  {
    key: "architecture",
    name: "System Architecture",
    docsPublicDir: path.join(workspaceRoot, "docs"),
    includeLanding: false,
    publishedDocIds: ["system-architecture"],
    enforceWhitelist: false,
    slugById: {
      "system-architecture": "architecture-system",
    },
  },
  {
    key: "playbooks",
    name: "Use-Case Playbooks",
    docsPublicDir: path.join(workspaceRoot, "docs"),
    includeLanding: false,
    publishedDocIds: ["use-case-playbooks"],
    enforceWhitelist: false,
    slugById: {
      "use-case-playbooks": "playbooks-use-cases",
    },
  },
  {
    key: "glossary",
    name: "Glossary",
    docsPublicDir: path.join(workspaceRoot, "docs"),
    includeLanding: false,
    publishedDocIds: ["glossary"],
    enforceWhitelist: false,
    slugById: {
      "glossary": "glossary",
    },
  },
]

const LEGACY_SISTER_SPECS = [
  {
    repo: "agentic-codebase",
    key: "codebase",
    name: "AgenticCodebase",
    pageIds: [
      "overview",
      "experience-with-vs-without",
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
    ],
  },
  {
    repo: "agentic-memory",
    key: "memory",
    name: "AgenticMemory",
    pageIds: [
      "experience-with-vs-without",
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
    ],
  },
  {
    repo: "agentic-vision",
    key: "vision",
    name: "AgenticVision",
    pageIds: [
      "overview",
      "experience-with-vs-without",
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
    ],
  },
]

const SISTER_DEFAULT_PAGE_IDS = [
  "overview",
  "experience-with-vs-without",
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
  "initial-problem-coverage",
  "primary-problem-coverage",
]

const LEGACY_PAGE_ID_ALLOWLIST = {
  codebase: [
    "overview",
    "experience-with-vs-without",
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
  ],
  memory: [
    "experience-with-vs-without",
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
  ],
  vision: [
    "overview",
    "experience-with-vs-without",
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
  ],
}

const PAGE_ORDER_SUFFIX = [
  "overview",
  "experience-with-vs-without",
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
  "initial-problem-coverage",
  "primary-problem-coverage",
  "guide",
  "feedback-and-community",
  "system-architecture",
  "use-case-playbooks",
  "glossary",
]

const ZH_PHRASES = [
  ["Documentation", "文档"],
  ["Quickstart", "快速开始"],
  ["Overview", "总览"],
  ["Installation", "安装"],
  ["Installation Guide", "安装指南"],
  ["Command Surface", "命令面"],
  ["Integration Guide", "集成指南"],
  ["Core Concepts", "核心概念"],
  ["Concepts", "概念"],
  ["API Reference", "API 参考"],
  ["Python API Reference", "Python API 参考"],
  ["Rust API Reference", "Rust API 参考"],
  ["File Format Specification", "文件格式规范"],
  [".amem File Format Specification", ".amem 文件格式规范"],
  ["Benchmarks", "基准测试"],
  ["Frequently Asked Questions", "常见问题"],
  ["FAQ", "常见问题"],
  ["Known Limitations", "已知限制"],
  ["Runtime, Install Output, and Sync Contract", "运行、安装输出与同步契约"],
  ["Canonical Sister Kit (Agentra)", "标准 Sister 套件（Agentra）"],
  ["AgenticCodebase Overview", "AgenticCodebase 总览"],
  ["AgenticVision Overview", "AgenticVision 总览"],
  ["Why Teams Adopt AgenticMemory", "为什么团队采用 AgenticMemory"],
  ["Why Teams Adopt AgenticCodebase", "为什么团队采用 AgenticCodebase"],
  ["Why Teams Adopt AgenticVision", "为什么团队采用 AgenticVision"],
  ["Feedback and Community", "反馈与社区"],
  ["System Architecture", "系统架构"],
  ["Use-Case Playbooks", "用例手册"],
  ["Get Started", "开始使用"],
  ["Sections", "章节"],
  ["Install", "安装"],
  ["Create a brain", "创建脑文件"],
  ["Add and query memory", "添加并查询记忆"],
  ["Start MCP server", "启动 MCP 服务"],
  ["Validate MCP quality output", "验证 MCP 质量输出"],
  ["Enable automatic long-horizon budget enforcement", "启用自动长期预算约束"],
  ["Enable prompt and feedback auto-capture", "启用提示词与反馈自动采集"],
  ["Compile a repository", "编译仓库"],
  ["Run core queries", "运行核心查询"],
  ["Run health and gate checks", "运行健康与门禁检查"],
  ["Validate artifact path", "验证工件路径"],
  ["Inspect capabilities", "检查能力"],
  ["Query quality-aware results", "查询质量感知结果"],
  ["Use `Ctrl+C` to stop after startup verification.", "启动验证完成后，使用 `Ctrl+C` 停止。"],
  ["Profile-specific commands are listed in", "按 profile 区分的命令见"],
  ["Expected tools include", "预期工具包括"],
  ["Expected tool list includes", "预期工具列表包括"],
  ["Run", "运行"],
  ["Optional", "可选"],
  ["Modes", "模式"],
  ["When enabled, maintenance ticks auto-roll up completed sessions into episode summaries when budget pressure is detected.", "启用后，在检测到预算压力时，维护周期会自动将已完成会话汇总为情节摘要。"],
  ["Public source documentation for", "公开来源文档："],
  ["Glossary", "术语表"],
  ["Key terms used across Agentra Labs documentation and sister projects.", "Agentra Labs 文档和 sister 项目中使用的关键术语。"],
  ["Key terms used across Agentra Labs projects.", "Agentra Labs 项目中使用的关键术语。"],
  ["General", "通用"],
  ["Works with", "协同使用"],
  ["Validate capabilities", "验证能力"],
  ["See also", "另请参阅"],
]

const ZH_REPLACEMENTS = [...ZH_PHRASES].sort((a, b) => b[0].length - a[0].length)

function needsTranslation(value) {
  if (!value) return false
  return /[A-Za-z]/.test(value)
}

async function loadTranslationCache() {
  try {
    const raw = await fs.readFile(ZH_TRANSLATION_CACHE, "utf8")
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === "object") {
      return parsed
    }
  } catch {
    // Ignore missing or malformed cache.
  }
  return {}
}

async function saveTranslationCache(cache) {
  await ensureDir(path.dirname(ZH_TRANSLATION_CACHE))
  const sortedKeys = Object.keys(cache).sort((a, b) => a.localeCompare(b))
  const sorted = {}
  for (const key of sortedKeys) {
    sorted[key] = cache[key]
  }
  await writeIfChanged(ZH_TRANSLATION_CACHE, `${JSON.stringify(sorted, null, 2)}\n`)
}

function protectInlineCode(value) {
  const placeholders = []
  const text = value.replace(/`[^`]+`/g, (match) => {
    const token = `__AGENTRA_CODE_${placeholders.length}__`
    placeholders.push(match)
    return token
  })
  return { text, placeholders }
}

function restoreInlineCode(value, placeholders) {
  let out = value
  placeholders.forEach((match, index) => {
    out = out.split(`__AGENTRA_CODE_${index}__`).join(match)
  })
  return out
}

async function remoteTranslateEnToZh(value) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=${encodeURIComponent(value)}`
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) })
  if (!response.ok) {
    throw new Error(`translate_http_${response.status}`)
  }

  const payload = await response.json()
  const translated = Array.isArray(payload?.[0])
    ? payload[0].map((part) => (Array.isArray(part) ? String(part[0] ?? "") : "")).join("")
    : ""
  return translated || value
}

async function translateZhText(value, cacheState) {
  if (!value) return value
  const input = String(value)
  if (cacheState.cache[input]) {
    return cacheState.cache[input]
  }

  let result = input
  for (const [en, zh] of ZH_REPLACEMENTS) {
    result = result.split(en).join(zh)
  }

  if (cacheState.cache[result]) {
    return cacheState.cache[result]
  }

  if (!liveTranslate || !needsTranslation(result)) {
    return result
  }

  const { text, placeholders } = protectInlineCode(result)
  let translated = text
  try {
    translated = await remoteTranslateEnToZh(text)
    if (translated && translated !== text) {
      translated = restoreInlineCode(translated, placeholders)
      cacheState.cache[input] = translated
      cacheState.dirty = true
      cacheState.translated += 1
      if (liveTranslate && cacheState.translated % 100 === 0) {
        console.log(`[sync] zh cache translated entries: ${cacheState.translated}`)
      }
      return translated
    }
  } catch {
    return result
  }

  return result
}

async function translateZhMarkdown(markdown, cacheState) {
  const lines = markdown.split("\n")
  let inFence = false
  const out = []

  for (const line of lines) {
    const trimmed = line.trimStart()
    if (trimmed.startsWith("```")) {
      inFence = !inFence
      out.push(line)
      continue
    }
    if (inFence) {
      out.push(line)
      continue
    }

    const translatedLinks = await replaceAsync(line, /\[([^\]]+)\]\(([^)]+)\)/g, async (_, text, href) => {
      const translatedText = await translateZhText(text, cacheState)
      return `[${translatedText}](${href})`
    })

    out.push(await translateZhText(translatedLinks, cacheState))
  }

  return out.join("\n")
}

async function replaceAsync(input, pattern, replacer) {
  const matches = [...input.matchAll(pattern)]
  if (!matches.length) return input

  let cursor = 0
  const chunks = []
  for (const match of matches) {
    const [full, ...groups] = match
    const index = match.index ?? 0
    chunks.push(input.slice(cursor, index))
    // eslint-disable-next-line no-await-in-loop
    chunks.push(await replacer(full, ...groups))
    cursor = index + full.length
  }
  chunks.push(input.slice(cursor))
  return chunks.join("")
}

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

function parseSisterKeyFromRepo(repoName) {
  return slugify(repoName.replace(/^agentic-/, "") || repoName)
}

function defaultSisterNameFromKey(key) {
  const body = key
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
  return `Agentic${body}`
}

function normalizePageIdList(value) {
  if (!Array.isArray(value)) return []
  return [...new Set(value.map((item) => String(item).trim().toLowerCase()).filter(Boolean))]
}

function normalizeSlugMap(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}
  const out = {}
  for (const [key, val] of Object.entries(value)) {
    if (typeof val !== "string" || !val.trim()) continue
    out[String(key).trim().toLowerCase()] = val.trim()
  }
  return out
}

async function readJsonIfExists(file) {
  if (!(await pathExists(file))) return null
  const raw = await fs.readFile(file, "utf8")
  return JSON.parse(raw)
}

async function loadSisterOverrides() {
  const parsed = await readJsonIfExists(SISTER_OVERRIDES_FILE)
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { sisters: {} }
  }
  const sisters = parsed.sisters && typeof parsed.sisters === "object" && !Array.isArray(parsed.sisters)
    ? parsed.sisters
    : {}
  return { sisters }
}

function applySisterOverride(spec, override) {
  const out = { ...spec }
  if (!override || typeof override !== "object" || Array.isArray(override)) return out

  if (typeof override.enabled === "boolean") out.enabled = override.enabled
  if (typeof override.name === "string" && override.name.trim()) out.name = override.name.trim()
  if (typeof override.include_landing === "boolean") out.includeLanding = override.include_landing
  if (typeof override.enforce_whitelist === "boolean") out.enforceWhitelist = override.enforce_whitelist
  if (typeof override.order === "number" && Number.isFinite(override.order)) out.order = override.order

  const pageIds = normalizePageIdList(override.page_ids)
  if (pageIds.length) out.publishedDocIds = pageIds

  const overrideSlugMap = normalizeSlugMap(override.slug_by_id)
  if (Object.keys(overrideSlugMap).length) {
    out.slugById = { ...(out.slugById || {}), ...overrideSlugMap }
  }

  return out
}

async function discoverSisterSpecs(overrides) {
  const entries = await fs.readdir(workspaceRoot, { withFileTypes: true })
  const repoDirs = entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("agentic-"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))

  const discovered = []
  for (const repoName of repoDirs) {
    const repoRootDir = path.join(workspaceRoot, repoName)
    const docsPublicDir = path.join(repoRootDir, "docs", "public")
    const docsPublicExists = await pathExists(docsPublicDir)

    if (!docsPublicExists) {
      const message = `[sync] Missing required public docs path for sister ${repoName}: ${docsPublicDir}`
      if (strict) throw new Error(message)
      console.warn(message)
      continue
    }

    const manifestPath = path.join(docsPublicDir, SISTER_MANIFEST_NAME)
    const manifest = await readJsonIfExists(manifestPath)
    const legacy = LEGACY_SISTER_SPECS.find((entry) => entry.repo === repoName) || null

    if (!manifest && !legacy) {
      const message = `[sync] Missing ${SISTER_MANIFEST_NAME} for sister ${repoName}`
      if (strict) throw new Error(message)
      console.warn(message)
      continue
    }

    const manifestObj = manifest && typeof manifest === "object" && !Array.isArray(manifest) ? manifest : {}
    const key = String(manifestObj.key || legacy?.key || parseSisterKeyFromRepo(repoName)).trim().toLowerCase()
    const name = String(manifestObj.name || legacy?.name || defaultSisterNameFromKey(key)).trim()
    const includeLanding = manifestObj.include_landing !== false
    const slugById = normalizeSlugMap(manifestObj.slug_by_id)
    const manifestPageIds = normalizePageIdList(manifestObj.page_ids)
    const legacyPageIds = legacy ? normalizePageIdList(legacy.pageIds) : []
    const publishedDocIds = manifestPageIds.length
      ? manifestPageIds
      : legacyPageIds.length
        ? legacyPageIds
        : SISTER_DEFAULT_PAGE_IDS

    const baseSpec = {
      key,
      repoName,
      name,
      docsPublicDir,
      includeLanding,
      slugById,
      publishedDocIds,
      enforceWhitelist: manifestObj.enforce_whitelist === true,
      isSister: true,
      enabled: manifestObj.enabled !== false,
      order: typeof manifestObj.order === "number" ? manifestObj.order : Number.POSITIVE_INFINITY,
    }

    const override =
      overrides.sisters?.[key] ||
      overrides.sisters?.[repoName] ||
      null

    const resolved = applySisterOverride(baseSpec, override)
    if (resolved.enabled === false) continue

    if (resolved.includeLanding !== true) {
      const message = `[sync] Sister ${resolved.repoName} is enabled but include_landing is not true; sister landing pages are required for deterministic nav panes`
      if (strict) throw new Error(message)
      console.warn(message)
    }

    discovered.push(resolved)
  }

  const keySet = new Set()
  const unique = []
  for (const spec of discovered) {
    if (keySet.has(spec.key)) {
      const message = `[sync] duplicate sister key detected: ${spec.key}`
      if (strict) throw new Error(message)
      console.warn(message)
      continue
    }
    keySet.add(spec.key)
    unique.push(spec)
  }

  return unique.sort((a, b) => {
    const orderA = Number.isFinite(a.order) ? a.order : Number.POSITIVE_INFINITY
    const orderB = Number.isFinite(b.order) ? b.order : Number.POSITIVE_INFINITY
    if (orderA !== orderB) return orderA - orderB
    return a.name.localeCompare(b.name)
  })
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

function normalizeDescriptionText(value) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^(\d+)\.\s+/, "")
    .replace(/\s+/g, " ")
    .trim()
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
    const normalized = normalizeDescriptionText(trimmed)
    if (!normalized) continue
    return normalized.length > 180 ? `${normalized.slice(0, 177)}...` : normalized
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

      // Keep inline code untouched so placeholders like `<agentra-workspace>`
      // render naturally in code spans after docs sync.
      const { text, placeholders } = protectInlineCode(line)
      const escaped = text
        // MDX treats raw "<1" style text as invalid JSX; escape as markdown.
        .replace(/(?<!\\)<(?=\s*\d)/g, "\\<")
        .replace(/(?<!\\)<([A-Za-z0-9_.-]+)>/g, (_, token) => `&lt;${token}&gt;`)
      return restoreInlineCode(escaped, placeholders)
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

function localizeMarkdownDocsLinks(markdown, language) {
  return markdown.replace(/\]\(\/docs\/(?!en\/|zh\/)([^)]+)\)/g, (_full, suffix) => {
    return `](/docs/${language}/${suffix})`
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
  const safeDescription = JSON.stringify(normalizeDescriptionText(String(description)))
  return `---\ntitle: ${safeTitle}\ndescription: ${safeDescription}\n---\n\n${body}\n`
}

function assertEnglishOutputHasNoHan(filename, content) {
  if (/[\u4E00-\u9FFF]/.test(content)) {
    throw new Error(`[sync] english output contains CJK characters: ${filename}`)
  }
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

async function buildDocPages(spec, cacheState) {
  const exists = await pathExists(spec.docsPublicDir)
  if (!exists) {
    const message = `[sync] Missing public docs directory: ${spec.docsPublicDir}`
    if (strict) throw new Error(message)
    console.warn(message)
    return { entries: [], enPages: new Map(), zhPages: new Map(), landingEn: "", landingZh: "" }
  }

  const files = await walkMarkdownFiles(spec.docsPublicDir)
  const knownAllowlist = spec.publishedDocIds || LEGACY_PAGE_ID_ALLOWLIST[spec.key] || []
  const allowedIds = new Set(knownAllowlist)
  const allIds = new Set(
    files.map((file) =>
      normalizePath(path.relative(spec.docsPublicDir, file))
        .replace(/\.(md|mdx)$/i, "")
        .toLowerCase(),
    ),
  )
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
    if (spec.enforceWhitelist) {
      const extras = [...allIds].filter((id) => !allowedIds.has(id))
      if (extras.length) {
        const message = `[sync] Unapproved public docs for ${spec.name}: ${extras.join(", ")}`
        if (strict) throw new Error(message)
        console.warn(message)
      }
    }

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
    const rawStatus = String(frontMatter.status || "").trim().toLowerCase()
    if (!rawStatus || !VALID_DOC_STATUSES.has(rawStatus)) {
      const message = `[sync] Missing or invalid frontmatter status in ${entry.file}. Expected one of: internal, candidate, stable`
      if (strict) throw new Error(message)
      console.warn(message)
      continue
    }

    if (rawStatus !== "stable") {
      if (strict && allowedIds.has(entry.id)) {
        throw new Error(
          `[sync] Non-stable page cannot be published for ${spec.name}: ${entry.id} has status=${rawStatus}`,
        )
      }
      continue
    }

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

  if (strict && spec.isSister && spec.includeLanding !== false && ordered.length === 0) {
    throw new Error(`[sync] Sister ${spec.name} has no stable public pages to publish`)
  }

  const enPages = new Map()
  const zhPages = new Map()

  for (const item of ordered) {
    enPages.set(
      item.slug,
      mdxPage({
        title: item.title,
        description: item.description,
        body: localizeMarkdownDocsLinks(item.body, "en"),
      }),
    )

    // eslint-disable-next-line no-await-in-loop
    const zhTitle = await translateZhText(item.title, cacheState)
    // eslint-disable-next-line no-await-in-loop
    const zhDescription = await translateZhText(item.description, cacheState)
    // eslint-disable-next-line no-await-in-loop
    const zhBody = await translateZhMarkdown(item.body, cacheState)

    zhPages.set(
      item.slug,
      mdxPage({
        title: zhTitle,
        description: zhDescription,
        body: escapeUnsafeAngles(localizeMarkdownDocsLinks(zhBody, "zh")),
      }),
    )
  }

  const linksEn = ordered
    .map((item) => `- [${item.title}](/docs/en/${item.slug})`)
    .join("\n")

  const linksZhParts = []
  for (const item of ordered) {
    // eslint-disable-next-line no-await-in-loop
    const translatedTitle = await translateZhText(item.title, cacheState)
    linksZhParts.push(`- [${translatedTitle}](/docs/zh/${item.slug})`)
  }
  const linksZh = linksZhParts.join("\n")

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
  const cacheState = {
    cache: await loadTranslationCache(),
    dirty: false,
    translated: 0,
  }

  const sisterOverrides = await loadSisterOverrides()
  const sisterSpecs = await discoverSisterSpecs(sisterOverrides)
  const docSpecs = [...CORE_DOC_SPECS, ...sisterSpecs]

  const sourceChecks = await Promise.all(
    docSpecs.map(async (spec) => ({
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
  for (const spec of docSpecs) {
    // eslint-disable-next-line no-await-in-loop
    docResults.push({ spec, ...(await buildDocPages(spec, cacheState)) })
  }

  for (const result of docResults) {
    const { spec, landingSlug } = result
    if (spec.isSister && spec.enabled !== false && spec.includeLanding !== false && !landingSlug) {
      const message = `[sync] Sister ${spec.repoName || spec.key} has no landing slug; required for deterministic nav panes`
      if (strict) throw new Error(message)
      console.warn(message)
    }
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
        return target ? `- [${spec.name}](/docs/en/${target})` : ""
      })
      .filter(Boolean),
  ].join("\n")

  const indexZhBody = [
    "该文档中心将工作区与三姐妹文档汇总到同一个入口。",
    "",
    "## 分组",
    "",
    ...await Promise.all(
      docResults.map(async ({ spec, landingSlug, entries }) => {
        const target = landingSlug || entries[0]?.slug
        if (!target) return ""
        const label = await translateZhText(spec.name, cacheState)
        return `- [${label}](/docs/zh/${target})`
      }),
    ).then((items) => items.filter(Boolean)),
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

  const sisterContract = docResults
    .filter((result) => result.spec.isSister)
    .map((result, index) => ({
      key: result.spec.key,
      repo: result.spec.repoName || `agentic-${result.spec.key}`,
      name: result.spec.name,
      order: Number.isFinite(result.spec.order) ? result.spec.order : 1000 + index,
      landingSlug: result.landingSlug || null,
      includeLanding: result.spec.includeLanding !== false,
      enabled: result.spec.enabled !== false,
    }))

  const navContract = {
    coreGroupOrder: CORE_GROUP_ORDER,
    requiredCoreSlugOrder: REQUIRED_CORE_SLUG_ORDER,
    sisters: sisterContract,
  }

  enFiles.set(
    "meta.json",
    `${JSON.stringify({ title: "Agentra Labs Docs", pages: uniqueOrderedPages }, null, 2)}\n`,
  )
  zhFiles.set(
    "meta.json",
    `${JSON.stringify({ title: "Agentra Labs 文档", pages: uniqueOrderedPages }, null, 2)}\n`,
  )

  await writeIfChanged(NAV_CONTRACT_FILE, `${JSON.stringify(navContract, null, 2)}\n`)

  // Copy sisters-registry.json from monorepo into web repo (single-source sync)
  const registrySource = path.join(workspaceRoot, "docs", "sisters-registry.json")
  const registryDest = path.join(repoRoot, "docs", "ecosystem", "sisters-registry.json")
  try {
    const registryContent = await fs.readFile(registrySource, "utf8")
    await writeIfChanged(registryDest, registryContent)
  } catch {
    if (strict) throw new Error(`[sync] sisters-registry.json not found at ${registrySource}`)
    console.warn(`[sync] skipped sisters-registry.json copy (source not found)`)
  }

  for (const [name, content] of enFiles.entries()) {
    assertEnglishOutputHasNoHan(name, content)
    // eslint-disable-next-line no-await-in-loop
    await writeIfChanged(path.join(EN_OUT_DIR, name), content)
  }
  for (const [name, content] of zhFiles.entries()) {
    // eslint-disable-next-line no-await-in-loop
    await writeIfChanged(path.join(ZH_OUT_DIR, name), content)
  }

  if (cacheState.dirty) {
    await saveTranslationCache(cacheState.cache)
  }

  await pruneOutput(EN_OUT_DIR, new Set(enFiles.keys()))
  await pruneOutput(ZH_OUT_DIR, new Set(zhFiles.keys()))

  console.log(
    `[sync] docs generated from canonical sources${liveTranslate ? " (live zh translation refresh)" : ""}`,
  )
}

main().catch((error) => {
  console.error("[sync] failed:", error.message)
  process.exit(1)
})
