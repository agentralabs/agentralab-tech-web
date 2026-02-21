import fs from "node:fs/promises"
import path from "node:path"

const DOCS_DIR = path.join(process.cwd(), "docs", "public")

export interface DocRecord {
  slug: string
  filename: string
  title: string
  summary: string
  content: string
}

function toSlug(filename: string): string {
  return filename.replace(/\.mdx?$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-")
}

function parseDoc(filename: string, content: string): DocRecord {
  const slug = toSlug(filename)
  const lines = content.split(/\r?\n/)
  const titleLine = lines.find((line) => line.startsWith("# "))
  const title = titleLine ? titleLine.replace(/^#\s+/, "").trim() : filename.replace(/\.mdx?$/i, "")

  const summaryLine = lines.find((line) => line.trim() && !line.startsWith("#") && !line.startsWith("|"))
  const summary = summaryLine?.trim() ?? "Documentation entry."

  return { slug, filename, title, summary, content }
}

export async function getAllDocs(): Promise<DocRecord[]> {
  const entries = await fs.readdir(DOCS_DIR, { withFileTypes: true })
  const mdFiles = entries.filter((entry) => entry.isFile() && /\.(md|mdx)$/i.test(entry.name))

  const docs = await Promise.all(
    mdFiles.map(async (entry) => {
      const content = await fs.readFile(path.join(DOCS_DIR, entry.name), "utf8")
      return parseDoc(entry.name, content)
    }),
  )

  return docs.sort((a, b) => a.title.localeCompare(b.title))
}

export async function getDocBySlug(slug: string): Promise<DocRecord | null> {
  const docs = await getAllDocs()
  return docs.find((doc) => doc.slug === slug) ?? null
}
