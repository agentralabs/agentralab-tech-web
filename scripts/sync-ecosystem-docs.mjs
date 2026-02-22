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
  "use-case-playbooks",
  "troubleshooting-matrix",
  "security-and-data-boundaries",
  "benchmarks-and-methodology",
  "ecosystem-feature-reference",
  "workspace-how-to",
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
    titleEn: "Workspace How-To (Synced)",
    titleZh: "Workspace 操作手册（同步）",
    descriptionEn: "Generated from the canonical workspace how-to guide.",
    descriptionZh: "来自 Agentra 工作区规范文档的同步页面。",
    introEn:
      "This page is generated from the canonical workspace how-to guide in the Agentra workspace.",
    introZh: "本页由生态仓库的 docs/how-to.md 自动同步。",
    file: path.join(workspaceRoot, "docs", "how-to.md"),
    sourcePath: "docs/how-to.md",
  },
]

const CONTRACT_SOURCES = [
  {
    labelEn: "Codebase canonical contract",
    labelZh: "Codebase 规范契约",
    file: path.join(workspaceRoot, "agentic-codebase", "planning-docs", "CANONICAL_SISTER_KIT.md"),
    sourcePath: "agentic-codebase/planning-docs/CANONICAL_SISTER_KIT.md",
  },
  {
    labelEn: "Memory canonical contract",
    labelZh: "Memory 规范契约",
    file: path.join(workspaceRoot, "agentic-memory", "planning-docs", "CANONICAL_SISTER_KIT.md"),
    sourcePath: "agentic-memory/planning-docs/CANONICAL_SISTER_KIT.md",
  },
  {
    labelEn: "Vision canonical contract",
    labelZh: "Vision 规范契约",
    file: path.join(workspaceRoot, "agentic-vision", "planning-docs", "CANONICAL_SISTER_KIT.md"),
    sourcePath: "agentic-vision/planning-docs/CANONICAL_SISTER_KIT.md",
  },
]

const LEGACY_PAGES = [
  "agentic-memory-manual",
  "agentic-codebase-manual",
  "agentic-vision-manual",
  "agentic-vision-limitations",
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

async function exists(target) {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
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
      const titleEn = `${spec.name} ${labelEn} (Synced)`
      const titleZh = `${spec.name} ${labelZh}（同步）`

      const raw = await fs.readFile(sourceFile, "utf8")
      const clean = escapeUnsafeAngles(
        rewriteSiblingLinks(
          normalizeMarkdown(stripLeadingH1(stripFrontMatter(raw))),
          siblingMap,
        ),
      )

      const enContent = withFrontMatter({
        title: titleEn,
        description: `Generated from ${sourcePath}.`,
        body:
          `<Callout type="tip" title="Generated page">\n` +
          `This page is synced from canonical ecosystem docs. Update source docs, then run docs:sync.\n` +
          `</Callout>\n\n` +
          `<Callout type="info" title="Source">\`${sourcePath}\`</Callout>\n\n` +
          clean,
      })

      const zhContent = withFrontMatter({
        title: titleZh,
        description: `来自 ${sourcePath} 的同步页面。`,
        body:
          `<Callout type="tip" title="同步页面">\n` +
          `本页来自生态仓库规范文档，更新源文档后运行 docs:sync 即可同步。\n` +
          `</Callout>\n\n` +
          `<Callout type="info" title="Source">\`${sourcePath}\`</Callout>\n\n` +
          clean,
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
    body:
      `<Callout type="tip" title="Generated page">\n${spec.introEn}\n</Callout>\n\n` +
      `<Callout type="info" title="Source">\`${spec.sourcePath}\`</Callout>\n\n` +
      clean,
  })
  await writeFileIfChanged(path.join(EN_OUT_DIR, `${spec.slug}.mdx`), enContent)

  const zhContent = withFrontMatter({
    title: spec.titleZh,
    description: spec.descriptionZh,
    body:
      `<Callout type="tip" title="同步页面">\n${spec.introZh}\n</Callout>\n\n` +
      `<Callout type="info" title="Source">\`${spec.sourcePath}\`</Callout>\n\n` +
      clean,
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

async function syncContractPage() {
  const enSections = []
  const zhSections = []
  const rowsEn = []
  const rowsZh = []

  for (const source of CONTRACT_SOURCES) {
    if (!(await exists(source.file))) {
      if (strict) throw new Error(`Missing source file: ${source.file}`)
      console.warn(`[sync] skipped (missing source): ${source.file}`)
      continue
    }

    const raw = await fs.readFile(source.file, "utf8")
    const clean = escapeUnsafeAngles(normalizeMarkdown(stripLeadingH1(stripFrontMatter(raw))))
    enSections.push(`## ${source.labelEn}\n\n<Callout type="info" title="Source">\`${source.sourcePath}\`</Callout>\n\n${clean}`)
    zhSections.push(`## ${source.labelZh}\n\n<Callout type="info" title="Source">\`${source.sourcePath}\`</Callout>\n\n${clean}`)
    rowsEn.push(`| ${source.labelEn} | \`${source.sourcePath}\` |`)
    rowsZh.push(`| ${source.labelZh} | \`${source.sourcePath}\` |`)
  }

  if (enSections.length === 0) return null

  const slug = "ecosystem-canonical-contract"
  const titleEn = "Ecosystem Canonical Contract (Synced)"
  const titleZh = "生态规范契约（同步）"

  const enContent = withFrontMatter({
    title: titleEn,
    description: "Generated from canonical sister contract docs across the ecosystem.",
    body:
      `<Callout type="tip" title="Generated page">\n` +
      `This page is generated from canonical sister contract docs. Update source contracts, then run docs:sync.\n` +
      `</Callout>\n\n` +
      `## Included sources\n\n| Source | Path |\n|---|---|\n${rowsEn.join("\n")}\n\n` +
      enSections.join("\n\n"),
  })

  const zhContent = withFrontMatter({
    title: titleZh,
    description: "来自三姐妹规范契约文档的同步页面。",
    body:
      `<Callout type="tip" title="同步页面">\n` +
      `本页由三姐妹规范契约文档自动同步。更新源文档后运行 docs:sync。\n` +
      `</Callout>\n\n` +
      `## 已同步来源\n\n| 来源 | 路径 |\n|---|---|\n${rowsZh.join("\n")}\n\n` +
      zhSections.join("\n\n"),
  })

  await writeFileIfChanged(path.join(EN_OUT_DIR, `${slug}.mdx`), enContent)
  await writeFileIfChanged(path.join(ZH_OUT_DIR, `${slug}.mdx`), zhContent)

  return {
    slug,
    sourcePath: "*/planning-docs/CANONICAL_SISTER_KIT.md",
    titleEn,
    titleZh,
    sister: "Ecosystem",
  }
}

async function syncCatalogPage(records) {
  const sorted = records
    .filter(Boolean)
    .sort((a, b) => String(a.slug).localeCompare(String(b.slug)))

  const enRows = sorted.map((entry) =>
    `| ${entry.sister} | ${entry.titleEn} | \`${entry.sourcePath}\` | [/docs/${entry.slug}](/docs/${entry.slug}) |`,
  )
  const zhRows = sorted.map((entry) =>
    `| ${entry.sister} | ${entry.titleZh} | \`${entry.sourcePath}\` | [/docs/${entry.slug}](/docs/${entry.slug}) |`,
  )

  const enContent = withFrontMatter({
    title: "Sister Docs Catalog (Synced)",
    description: "Index of user-facing docs synced from canonical ecosystem sources.",
    body:
      `<Callout type="success" title="Single-source docs pipeline">\n` +
      `This catalog is generated from ecosystem repositories. Website docs are synced from canonical sources to avoid duplication drift.\n` +
      `</Callout>\n\n` +
      `## Synced source map\n\n| Sister | Entry | Canonical source | Public page |\n|---|---|---|---|\n` +
      enRows.join("\n"),
  })

  const zhContent = withFrontMatter({
    title: "姐妹文档目录（同步）",
    description: "从生态规范源同步的用户文档索引。",
    body:
      `<Callout type="success" title="单一来源文档">\n` +
      `本目录由生态仓库规范文档自动生成，避免多处手工维护导致漂移。\n` +
      `</Callout>\n\n` +
      `## 同步来源映射\n\n| 模块 | 条目 | 规范来源 | 公共页面 |\n|---|---|---|---|\n` +
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

  const contract = await syncContractPage()
  if (contract) records.push(contract)

  await syncCatalogPage(records)
  await writeMeta(generatedSlugs)
  await cleanupGeneratedFiles(EN_OUT_DIR, generatedSlugs)
  await cleanupGeneratedFiles(ZH_OUT_DIR, generatedSlugs)

  console.log("[sync] ecosystem docs sync complete")
}

main().catch((error) => {
  console.error("[sync] failed:", error.message)
  process.exit(1)
})
