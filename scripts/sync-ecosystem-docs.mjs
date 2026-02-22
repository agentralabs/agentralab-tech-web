#!/usr/bin/env node

import fs from "node:fs/promises"
import path from "node:path"

const repoRoot = process.cwd()
const EN_OUT_DIR = path.join(repoRoot, "docs", "ecosystem", "en")
const ZH_OUT_DIR = path.join(repoRoot, "docs", "ecosystem", "zh")

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function writeFileIfChanged(file, content) {
  let current = null
  try {
    current = await fs.readFile(file, "utf8")
  } catch {
    current = null
  }

  if (current === content) return
  await fs.writeFile(file, content, "utf8")
}

async function pruneDocs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isFile()) continue
    if (entry.name === "index.mdx" || entry.name === "meta.json") continue
    if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
      await fs.unlink(path.join(dir, entry.name))
    }
  }
}

function page({ title, description, body }) {
  return `---\ntitle: ${title}\ndescription: ${description}\n---\n\n${body}\n`
}

async function main() {
  await ensureDir(EN_OUT_DIR)
  await ensureDir(ZH_OUT_DIR)

  const enIndex = page({
    title: "Documentation",
    description: "Documentation pages are temporarily cleared.",
    body:
      "This docs space is intentionally reset and currently empty.\n\n" +
      "Use the language switcher in the header while rebuilding content.",
  })

  const zhIndex = page({
    title: "文档",
    description: "文档页面已暂时清空。",
    body:
      "此文档空间已重置，当前为空。\n\n" +
      "重建内容期间可继续使用顶部语言切换。",
  })

  const enMeta = JSON.stringify({ title: "Agentra Labs Docs", pages: ["index"] }, null, 2) + "\n"
  const zhMeta = JSON.stringify({ title: "Agentra Labs 文档", pages: ["index"] }, null, 2) + "\n"

  await writeFileIfChanged(path.join(EN_OUT_DIR, "index.mdx"), enIndex)
  await writeFileIfChanged(path.join(ZH_OUT_DIR, "index.mdx"), zhIndex)
  await writeFileIfChanged(path.join(EN_OUT_DIR, "meta.json"), enMeta)
  await writeFileIfChanged(path.join(ZH_OUT_DIR, "meta.json"), zhMeta)

  await pruneDocs(EN_OUT_DIR)
  await pruneDocs(ZH_OUT_DIR)

  console.log("[sync] docs reset: minimal landing pages only")
}

main().catch((error) => {
  console.error("[sync] failed:", error.message)
  process.exit(1)
})
