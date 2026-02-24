import { promises as fs } from "node:fs"
import path from "node:path"

export interface LabLogSource {
  label: string
  href: string
}

export interface LabLogEntry {
  slug: string
  title: string
  dateIso: string
  publishedAt: string
  summary: string
  category: "Release" | "Research" | "Showcase" | "Ecosystem"
  notes: string[]
  highlights: string[]
  sources: LabLogSource[]
  sourceCount: number
  signalCount: number
  carryoverMode?: boolean
  reposTouched: string[]
}

const INDEX_PATH = path.join(process.cwd(), "data", "lab-log-index.json")

export async function getLabLogEntries(limit = 12): Promise<LabLogEntry[]> {
  try {
    const raw = await fs.readFile(INDEX_PATH, "utf8")
    const payload = JSON.parse(raw)
    if (!Array.isArray(payload)) return []

    return payload
      .filter((item): item is LabLogEntry => typeof item?.slug === "string")
      .slice(0, Math.max(1, limit))
  } catch {
    return []
  }
}
