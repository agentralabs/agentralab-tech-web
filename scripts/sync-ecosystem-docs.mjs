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

const CURATED_SLUGS = [
  "index",
  "quickstart",
  "installation",
  "integrations",
  "feedback",
  "operations-autonomic-and-backup",
  "server-runtime-auth-and-artifact-sync",
  "system-architecture",
  "memory-system-architecture",
  "codebase-system-architecture",
  "vision-system-architecture",
  "use-case-playbooks",
  "troubleshooting-matrix",
  "security-and-data-boundaries",
  "benchmarks-and-methodology",
  "ecosystem-feature-reference",
  "memory-docs",
  "codebase-docs",
  "vision-docs",
  "workspace-how-to",
  "codebase-canonical-contract",
  "memory-canonical-contract",
  "vision-canonical-contract",
  "sister-docs-catalog",
  "ecosystem-canonical-contract",
]

const SISTER_DOC_LABEL_EN = {
  quickstart: "Quickstart",
  concepts: "Concepts",
  "integration-guide": "Integration Guide",
  faq: "FAQ",
  benchmarks: "Benchmarks",
  "api-reference": "API Reference",
  "file-format": "File Format",
  "rust-api": "Rust API",
  limitations: "Limitations",
}

const SISTER_DOC_LABEL_ZH = {
  quickstart: "快速开始",
  concepts: "概念",
  "integration-guide": "集成指南",
  faq: "常见问题",
  benchmarks: "基准测试",
  "api-reference": "API 参考",
  "file-format": "文件格式",
  "rust-api": "Rust API",
  limitations: "限制说明",
}

const SISTER_SPECS = [
  {
    key: "memory",
    name: "AgenticMemory",
    docsDir: path.join(workspaceRoot, "agentic-memory", "docs"),
    sourcePrefix: "agentic-memory/docs",
    includes: [
      "quickstart.md",
      "concepts.md",
      "integration-guide.md",
      "faq.md",
      "benchmarks.md",
      "api-reference.md",
      "file-format.md",
      "rust-api.md",
    ],
  },
  {
    key: "codebase",
    name: "AgenticCodebase",
    docsDir: path.join(workspaceRoot, "agentic-codebase", "docs"),
    sourcePrefix: "agentic-codebase/docs",
    includes: [
      "quickstart.md",
      "concepts.md",
      "integration-guide.md",
      "faq.md",
      "benchmarks.md",
      "api-reference.md",
      "file-format.md",
    ],
  },
  {
    key: "vision",
    name: "AgenticVision",
    docsDir: path.join(workspaceRoot, "agentic-vision", "docs"),
    sourcePrefix: "agentic-vision/docs",
    includes: [
      "quickstart.md",
      "concepts.md",
      "integration-guide.md",
      "faq.md",
      "benchmarks.md",
      "api-reference.md",
      "LIMITATIONS.md",
    ],
  },
]

const DIRECT_SOURCES = [
  {
    slug: "workspace-how-to",
    titleEn: "Workspace How-To",
    titleZh: "Workspace 操作手册",
    descriptionEn: "How to run the full Agentra workspace from one place.",
    descriptionZh: "如何从一个入口运行完整 Agentra 工作区。",
    file: path.join(workspaceRoot, "docs", "how-to.md"),
    sourcePath: "docs/how-to.md",
  },
]

const CONTRACT_SOURCES = [
  {
    key: "codebase",
    slug: "codebase-canonical-contract",
    labelEn: "Codebase canonical contract",
    labelZh: "Codebase 规范契约",
    titleEn: "AgenticCodebase Canonical Contract",
    titleZh: "AgenticCodebase 规范契约",
    fileCandidates: [
      {
        file: path.join(workspaceRoot, "agentic-codebase", "docs", "ecosystem", "CANONICAL_SISTER_KIT.md"),
        sourcePath: "agentic-codebase/docs/ecosystem/CANONICAL_SISTER_KIT.md",
      },
      {
        file: path.join(workspaceRoot, "agentic-codebase", "planning-docs", "CANONICAL_SISTER_KIT.md"),
        sourcePath: "agentic-codebase/planning-docs/CANONICAL_SISTER_KIT.md",
      },
    ],
  },
  {
    key: "memory",
    slug: "memory-canonical-contract",
    labelEn: "Memory canonical contract",
    labelZh: "Memory 规范契约",
    titleEn: "AgenticMemory Canonical Contract",
    titleZh: "AgenticMemory 规范契约",
    fileCandidates: [
      {
        file: path.join(workspaceRoot, "agentic-memory", "docs", "ecosystem", "CANONICAL_SISTER_KIT.md"),
        sourcePath: "agentic-memory/docs/ecosystem/CANONICAL_SISTER_KIT.md",
      },
      {
        file: path.join(workspaceRoot, "agentic-memory", "planning-docs", "CANONICAL_SISTER_KIT.md"),
        sourcePath: "agentic-memory/planning-docs/CANONICAL_SISTER_KIT.md",
      },
    ],
  },
  {
    key: "vision",
    slug: "vision-canonical-contract",
    labelEn: "Vision canonical contract",
    labelZh: "Vision 规范契约",
    titleEn: "AgenticVision Canonical Contract",
    titleZh: "AgenticVision 规范契约",
    fileCandidates: [
      {
        file: path.join(workspaceRoot, "agentic-vision", "docs", "ecosystem", "CANONICAL_SISTER_KIT.md"),
        sourcePath: "agentic-vision/docs/ecosystem/CANONICAL_SISTER_KIT.md",
      },
      {
        file: path.join(workspaceRoot, "agentic-vision", "planning-docs", "CANONICAL_SISTER_KIT.md"),
        sourcePath: "agentic-vision/planning-docs/CANONICAL_SISTER_KIT.md",
      },
    ],
  },
]

const LEGACY_PAGES = [
  "agentic-memory-manual",
  "agentic-codebase-manual",
  "agentic-vision-manual",
  "agentic-vision-limitations",
]

const COMMAND_FOCUSED_DOCS = new Set(["quickstart", "integration-guide"])

const ARCHITECTURE_SPECS = [
  {
    key: "memory",
    titleEn: "AgenticMemory Architecture",
    titleZh: "AgenticMemory 架构",
    slug: "memory-system-architecture",
    introEn: "How memory ingestion, graph updates, and retrieval work end-to-end.",
    introZh: "说明记忆写入、图更新与检索的完整流程。",
    pointsEn: [
      "Input events are normalized and written into a persistent graph.",
      "Search combines lexical + graph relevance so old context can be recalled quickly.",
      "MCP server exposes memory operations to any compliant client.",
    ],
    pointsZh: [
      "输入事件会标准化并写入持久化图结构。",
      "检索结合词法与图相关性，确保历史上下文快速找回。",
      "MCP 服务对所有兼容客户端公开统一记忆能力。",
    ],
    links: ["memory-concepts", "memory-file-format", "memory-api-reference", "memory-integration-guide"],
  },
  {
    key: "codebase",
    titleEn: "AgenticCodebase Architecture",
    titleZh: "AgenticCodebase 架构",
    slug: "codebase-system-architecture",
    introEn: "How repositories are parsed, indexed, and queried as semantic graphs.",
    introZh: "说明仓库如何被解析、建索引并以语义图方式查询。",
    pointsEn: [
      "Source code is parsed into typed units and semantic relationships.",
      "Compiled .acb artifacts keep query latency low for impact analysis workflows.",
      "MCP layer exposes symbol, impact, and graph-aware operations.",
    ],
    pointsZh: [
      "源代码会解析为类型化单元及语义关系。",
      ".acb 工件可保持低延迟，支撑影响分析场景。",
      "MCP 层提供符号、影响与图查询能力。",
    ],
    links: ["codebase-concepts", "codebase-file-format", "codebase-api-reference", "codebase-integration-guide"],
  },
  {
    key: "vision",
    titleEn: "AgenticVision Architecture",
    titleZh: "AgenticVision 架构",
    slug: "vision-system-architecture",
    introEn: "How capture, embeddings, and visual retrieval are composed.",
    introZh: "说明视觉采集、向量嵌入与检索如何协作。",
    pointsEn: [
      "Visual inputs are captured and embedded into retrievable artifacts.",
      "Queries match by semantic similarity and metadata filters.",
      "MCP server provides universal access for desktop, terminal, and hosted clients.",
    ],
    pointsZh: [
      "视觉输入会被采集并转为可检索工件。",
      "查询通过语义相似度与元数据过滤匹配结果。",
      "MCP 服务为桌面、终端与托管客户端提供统一接入。",
    ],
    links: ["vision-concepts", "vision-limitations", "vision-api-reference", "vision-integration-guide"],
  },
]

function titleize(value) {
  return value
    .replace(/\.mdx?$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function fileBase(filename) {
  return filename.replace(/\.mdx?$/i, "").toLowerCase()
}

function slugFor(spec, filename) {
  return `${spec.key}-${fileBase(filename)}`
}

function stripFrontMatter(markdown) {
  if (!markdown.startsWith("---\n")) return markdown
  const next = markdown.indexOf("\n---\n", 4)
  if (next < 0) return markdown
  return markdown.slice(next + 5)
}

function stripLeadingH1(markdown) {
  return markdown.replace(/^#\s+.+\n+/m, "")
}

function normalizeMarkdown(markdown) {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, "  ")
    .replace(/^export\s+/gm, "export ")
    .trim()
}

function stripCommandCodeFences(markdown) {
  return markdown.replace(/```(?:bash|sh|shell|zsh|console)[\s\S]*?```/gi, "").trim()
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

function rewriteSiblingLinks(markdown, siblingSlugMap) {
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => {
    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("#") ||
      href.startsWith("/") ||
      href.startsWith("mailto:")
    ) {
      return match
    }

    const [targetPath, hash] = href.split("#")
    if (!/\.(md|mdx)$/i.test(targetPath)) return match

    const base = fileBase(path.basename(targetPath))
    const targetSlug = siblingSlugMap.get(base)
    if (!targetSlug) return match
    const hashSuffix = hash ? `#${hash}` : ""
    return `[${text}](/docs/${targetSlug}${hashSuffix})`
  })
}

function labelFromSlug(slug) {
  return titleize(slug)
}

async function exists(target) {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

async function resolveSourceCandidate(spec) {
  for (const candidate of spec.fileCandidates) {
    if (await exists(candidate.file)) {
      return candidate
    }
  }
  return null
}

function withFrontMatter({ title, description, body }) {
  return `---\ntitle: ${title}\ndescription: ${description}\n---\n\n${body.trim()}\n`
}

async function writeFileIfChanged(file, content) {
  const current = (await exists(file)) ? await fs.readFile(file, "utf8") : null
  if (current === content) return false
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, content, "utf8")
  return true
}

async function removeFileIfExists(file) {
  if (await exists(file)) {
    await fs.unlink(file)
  }
}

function sortGeneratedSlugs(slugs) {
  const specOrder = { memory: 0, codebase: 1, vision: 2 }
  const docOrder = {
    quickstart: 0,
    concepts: 1,
    "integration-guide": 2,
    faq: 3,
    benchmarks: 4,
    "api-reference": 5,
    "file-format": 6,
    "rust-api": 7,
    limitations: 8,
  }

  return [...slugs].sort((a, b) => {
    const [aSpec, ...aRest] = a.split("-")
    const [bSpec, ...bRest] = b.split("-")
    const aDoc = aRest.join("-")
    const bDoc = bRest.join("-")
    const aSpecOrd = specOrder[aSpec] ?? 999
    const bSpecOrd = specOrder[bSpec] ?? 999
    if (aSpecOrd !== bSpecOrd) return aSpecOrd - bSpecOrd
    const aDocOrd = docOrder[aDoc] ?? 999
    const bDocOrd = docOrder[bDoc] ?? 999
    if (aDocOrd !== bDocOrd) return aDocOrd - bDocOrd
    return a.localeCompare(b)
  })
}

async function cleanupGeneratedFiles(targetDir, generatedSlugs) {
  const entries = await fs.readdir(targetDir, { withFileTypes: true })
  const generatedSet = new Set(generatedSlugs)

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".mdx")) continue
    const slug = entry.name.replace(/\.mdx$/i, "")
    const isGeneratedByPrefix = /^(memory|codebase|vision)-/.test(slug)
    if (isGeneratedByPrefix && !generatedSet.has(slug)) {
      await fs.unlink(path.join(targetDir, entry.name))
    }
  }

  for (const legacy of LEGACY_PAGES) {
    await removeFileIfExists(path.join(targetDir, `${legacy}.mdx`))
  }
}

async function syncSisterReferencePages() {
  const records = []
  const generatedSlugs = []

  for (const spec of SISTER_SPECS) {
    if (!(await exists(spec.docsDir))) {
      if (strict) throw new Error(`Missing docs source directory: ${spec.docsDir}`)
      console.warn(`[sync] skipped (missing source): ${spec.docsDir}`)
      continue
    }

    const siblingMap = new Map(
      spec.includes.map((filename) => [fileBase(filename), slugFor(spec, filename)]),
    )

    for (const filename of spec.includes) {
      const sourceFile = path.join(spec.docsDir, filename)
      if (!(await exists(sourceFile))) {
        if (strict) throw new Error(`Missing source file: ${sourceFile}`)
        console.warn(`[sync] skipped (missing source): ${sourceFile}`)
        continue
      }

      const base = fileBase(filename)
      const slug = slugFor(spec, filename)
      const sourcePath = `${spec.sourcePrefix}/${filename}`
      const labelEn = SISTER_DOC_LABEL_EN[base] ?? titleize(base)
      const labelZh = SISTER_DOC_LABEL_ZH[base] ?? titleize(base)
      const titleEn = `${spec.name} ${labelEn}`
      const titleZh = `${spec.name} ${labelZh}`

      const raw = await fs.readFile(sourceFile, "utf8")
      const normalized = escapeUnsafeAngles(
        rewriteSiblingLinks(
          normalizeMarkdown(stripLeadingH1(stripFrontMatter(raw))),
          siblingMap,
        ),
      )
      const commandFocused = COMMAND_FOCUSED_DOCS.has(base)
      const cleanedBody = commandFocused
        ? normalized
        : stripCommandCodeFences(normalized)
      const commandTrimmed = !commandFocused && cleanedBody !== normalized
      const cleanEn = commandTrimmed
        ? `${cleanedBody}\n\n> Command steps are centralized in Quickstart and Integration Guide for faster onboarding.`
        : cleanedBody
      const cleanZh = commandTrimmed
        ? `${cleanedBody}\n\n> 为了避免重复，命令步骤集中在 Quickstart 与 Integration Guide 页面。`
        : cleanedBody

      const enContent = withFrontMatter({
        title: titleEn,
        description: `${spec.name} ${labelEn} documentation.`,
        body: cleanEn,
      })

      const zhContent = withFrontMatter({
        title: titleZh,
        description: `${spec.name} ${labelZh}文档。`,
        body: cleanZh,
      })

      await writeFileIfChanged(path.join(EN_OUT_DIR, `${slug}.mdx`), enContent)
      await writeFileIfChanged(path.join(ZH_OUT_DIR, `${slug}.mdx`), zhContent)

      generatedSlugs.push(slug)
      records.push({ slug, sourcePath, titleEn, titleZh, sister: spec.name })
    }
  }

  return { generatedSlugs: sortGeneratedSlugs(generatedSlugs), records }
}

async function syncDirectSource(spec) {
  if (!(await exists(spec.file))) {
    if (strict) throw new Error(`Missing source file: ${spec.file}`)
    console.warn(`[sync] skipped (missing source): ${spec.file}`)
    return null
  }

  const raw = await fs.readFile(spec.file, "utf8")
  const clean = escapeUnsafeAngles(normalizeMarkdown(stripLeadingH1(stripFrontMatter(raw))))

  const enContent = withFrontMatter({
    title: spec.titleEn,
    description: spec.descriptionEn,
    body: clean,
  })
  await writeFileIfChanged(path.join(EN_OUT_DIR, `${spec.slug}.mdx`), enContent)

  const zhContent = withFrontMatter({
    title: spec.titleZh,
    description: spec.descriptionZh,
    body: clean,
  })
  await writeFileIfChanged(path.join(ZH_OUT_DIR, `${spec.slug}.mdx`), zhContent)

  return {
    slug: spec.slug,
    sourcePath: spec.sourcePath,
    titleEn: spec.titleEn,
    titleZh: spec.titleZh,
    sister: "Workspace",
  }
}

async function syncContractPages() {
  const records = []
  const overviewRowsEn = []
  const overviewRowsZh = []

  for (const source of CONTRACT_SOURCES) {
    const resolved = await resolveSourceCandidate(source)
    if (!resolved) {
      const attempted = source.fileCandidates.map((entry) => entry.file).join(", ")
      if (strict) throw new Error(`Missing source file. Tried: ${attempted}`)
      console.warn(`[sync] skipped (missing source): ${attempted}`)
      continue
    }

    const raw = await fs.readFile(resolved.file, "utf8")
    const clean = escapeUnsafeAngles(normalizeMarkdown(stripLeadingH1(stripFrontMatter(raw))))
    const enContent = withFrontMatter({
      title: source.titleEn,
      description: `${source.labelEn.charAt(0).toUpperCase()}${source.labelEn.slice(1)} for public use.`,
      body: clean,
    })

    const zhContent = withFrontMatter({
      title: source.titleZh,
      description: `${source.labelZh}（面向公开使用）。`,
      body: clean,
    })

    await writeFileIfChanged(path.join(EN_OUT_DIR, `${source.slug}.mdx`), enContent)
    await writeFileIfChanged(path.join(ZH_OUT_DIR, `${source.slug}.mdx`), zhContent)

    overviewRowsEn.push(`| ${source.titleEn} | [/docs/${source.slug}](/docs/${source.slug}) |`)
    overviewRowsZh.push(`| ${source.titleZh} | [/docs/${source.slug}](/docs/${source.slug}) |`)
    records.push({
      slug: source.slug,
      sourcePath: resolved.sourcePath,
      titleEn: source.titleEn,
      titleZh: source.titleZh,
      sister: source.key === "memory" ? "AgenticMemory" : source.key === "codebase" ? "AgenticCodebase" : "AgenticVision",
    })
  }

  if (records.length === 0) return records

  const overviewEn = withFrontMatter({
    title: "Ecosystem Canonical Contracts",
    description: "Core rules for each sister, split by project for easier reading.",
    body:
      "Use these contract pages when implementing or reviewing standards.\n\n" +
      "## Choose a sister\n\n| Contract | Page |\n|---|---|\n" +
      overviewRowsEn.join("\n"),
  })

  const overviewZh = withFrontMatter({
    title: "生态规范契约",
    description: "按姐妹项目拆分的核心规范，阅读更清晰。",
    body:
      "请按项目查看对应规范页面。\n\n" +
      "## 选择姐妹项目\n\n| 规范 | 页面 |\n|---|---|\n" +
      overviewRowsZh.join("\n"),
  })

  await writeFileIfChanged(path.join(EN_OUT_DIR, "ecosystem-canonical-contract.mdx"), overviewEn)
  await writeFileIfChanged(path.join(ZH_OUT_DIR, "ecosystem-canonical-contract.mdx"), overviewZh)
  records.push({
    slug: "ecosystem-canonical-contract",
    sourcePath: "Split overview from sister canonical contracts",
    titleEn: "Ecosystem Canonical Contracts",
    titleZh: "生态规范契约",
    sister: "Ecosystem",
  })

  return records
}

async function syncArchitecturePages() {
  for (const spec of ARCHITECTURE_SPECS) {
    const enLinks = spec.links
      .map((slug) => `- [${labelFromSlug(slug.replace(`${spec.key}-`, ""))}](/docs/${slug})`)
      .join("\n")
    const zhLinks = spec.links
      .map((slug) => `- [${labelFromSlug(slug.replace(`${spec.key}-`, ""))}](/docs/${slug})`)
      .join("\n")

    const enContent = withFrontMatter({
      title: spec.titleEn,
      description: spec.introEn,
      body:
        `## Runtime flow\n\n${spec.pointsEn.map((point) => `- ${point}`).join("\n")}\n\n` +
        "## Related pages\n\n" +
        enLinks,
    })

    const zhContent = withFrontMatter({
      title: spec.titleZh,
      description: spec.introZh,
      body:
        `## 运行流程\n\n${spec.pointsZh.map((point) => `- ${point}`).join("\n")}\n\n` +
        "## 相关页面\n\n" +
        zhLinks,
    })

    await writeFileIfChanged(path.join(EN_OUT_DIR, `${spec.slug}.mdx`), enContent)
    await writeFileIfChanged(path.join(ZH_OUT_DIR, `${spec.slug}.mdx`), zhContent)
  }
}

async function syncSisterHubPages(records) {
  const hubRecords = []
  const sisters = [
    { key: "memory", name: "AgenticMemory", slug: "memory-docs", titleZh: "AgenticMemory 文档总览" },
    { key: "codebase", name: "AgenticCodebase", slug: "codebase-docs", titleZh: "AgenticCodebase 文档总览" },
    { key: "vision", name: "AgenticVision", slug: "vision-docs", titleZh: "AgenticVision 文档总览" },
  ]

  for (const sister of sisters) {
    const items = records
      .filter((entry) => entry.sister === sister.name)
      .sort((a, b) => a.slug.localeCompare(b.slug))

    const enRows = items.map((entry) => `| ${entry.titleEn} | [/docs/${entry.slug}](/docs/${entry.slug}) |`)
    const zhRows = items.map((entry) => `| ${entry.titleZh} | [/docs/${entry.slug}](/docs/${entry.slug}) |`)

    const enContent = withFrontMatter({
      title: `${sister.name} Docs`,
      description: `Everything for ${sister.name} in one page.`,
      body:
        "## Pages\n\n" +
        "| Page | Link |\n|---|---|\n" +
        enRows.join("\n"),
    })

    const zhContent = withFrontMatter({
      title: sister.titleZh,
      description: `${sister.name} 的页面导航。`,
      body:
        "## 页面列表\n\n" +
        "| 页面 | 链接 |\n|---|---|\n" +
        zhRows.join("\n"),
    })

    await writeFileIfChanged(path.join(EN_OUT_DIR, `${sister.slug}.mdx`), enContent)
    await writeFileIfChanged(path.join(ZH_OUT_DIR, `${sister.slug}.mdx`), zhContent)
    hubRecords.push({
      slug: sister.slug,
      sourcePath: "Generated from sister page map",
      titleEn: `${sister.name} Docs`,
      titleZh: sister.titleZh,
      sister: sister.name,
    })
  }
  return hubRecords
}

async function syncCatalogPage(records) {
  const sorted = records
    .filter(Boolean)
    .sort((a, b) => String(a.slug).localeCompare(String(b.slug)))

  const enRows = sorted.map((entry) =>
    `| ${entry.sister} | ${entry.titleEn} | [/docs/${entry.slug}](/docs/${entry.slug}) |`,
  )
  const zhRows = sorted.map((entry) =>
    `| ${entry.sister} | ${entry.titleZh} | [/docs/${entry.slug}](/docs/${entry.slug}) |`,
  )

  const enContent = withFrontMatter({
    title: "Sister Docs Catalog",
    description: "Index of user-facing docs across all sisters.",
    body:
      `## Documentation map\n\n| Sister | Entry | Public page |\n|---|---|---|\n` +
      enRows.join("\n"),
  })

  const zhContent = withFrontMatter({
    title: "姐妹文档目录",
    description: "所有姐妹项目的用户文档索引。",
    body:
      `## 文档地图\n\n| 模块 | 条目 | 公共页面 |\n|---|---|---|\n` +
      zhRows.join("\n"),
  })

  await writeFileIfChanged(path.join(EN_OUT_DIR, "sister-docs-catalog.mdx"), enContent)
  await writeFileIfChanged(path.join(ZH_OUT_DIR, "sister-docs-catalog.mdx"), zhContent)
}

async function writeMeta(generatedSlugs) {
  const pages = [...CURATED_SLUGS, ...generatedSlugs]
  const enMeta = { title: "Agentra Labs Docs", pages }
  const zhMeta = { title: "Agentra Labs 文档", pages }
  await writeFileIfChanged(path.join(EN_OUT_DIR, "meta.json"), `${JSON.stringify(enMeta, null, 2)}\n`)
  await writeFileIfChanged(path.join(ZH_OUT_DIR, "meta.json"), `${JSON.stringify(zhMeta, null, 2)}\n`)
}

async function main() {
  const records = []

  const { generatedSlugs, records: sisterRecords } = await syncSisterReferencePages()
  records.push(...sisterRecords)

  for (const spec of DIRECT_SOURCES) {
    const synced = await syncDirectSource(spec)
    if (synced) records.push(synced)
  }

  const contractRecords = await syncContractPages()
  records.push(...contractRecords)
  await syncArchitecturePages()
  const sisterHubRecords = await syncSisterHubPages(records)
  records.push(...sisterHubRecords)

  await syncCatalogPage(records)
  await writeMeta(generatedSlugs)
  const managedSisterSlugs = [
    ...generatedSlugs,
    ...contractRecords
      .concat(sisterHubRecords)
      .map((record) => record.slug)
      .filter((slug) => /^(memory|codebase|vision)-/.test(slug)),
  ]
  await cleanupGeneratedFiles(EN_OUT_DIR, managedSisterSlugs)
  await cleanupGeneratedFiles(ZH_OUT_DIR, managedSisterSlugs)

  console.log("[sync] ecosystem docs sync complete")
}

main().catch((error) => {
  console.error("[sync] failed:", error.message)
  process.exit(1)
})
