import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScenarioPageView } from "@/components/scenario-page"

const VALID_SISTERS = ["agentic-memory", "agentic-vision", "agentic-codebase"] as const

const META: Record<string, { title: string; description: string }> = {
  "agentic-memory": {
    title: "AgenticMemory Scenarios — Agentra Labs",
    description:
      "See AgenticMemory capabilities in action: causal reasoning chains, cross-session persistence, semantic search, and self-correcting belief graphs.",
  },
  "agentic-vision": {
    title: "AgenticVision Scenarios — Agentra Labs",
    description:
      "See AgenticVision capabilities in action: persistent visual evidence, pixel-level diff, quality-scored captures, and cognitive memory bridging.",
  },
  "agentic-codebase": {
    title: "AgenticCodebase Scenarios — Agentra Labs",
    description:
      "See AgenticCodebase capabilities in action: impact analysis, hidden coupling detection, code prophecy, and cross-language FFI tracing.",
  },
}

export function generateStaticParams() {
  return VALID_SISTERS.map((sister) => ({ sister }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sister: string }>
}): Promise<Metadata> {
  const { sister } = await params
  const meta = META[sister]
  if (!meta) return {}
  return { title: meta.title, description: meta.description }
}

export default async function ScenariosPage({
  params,
}: {
  params: Promise<{ sister: string }>
}) {
  const { sister } = await params

  if (!VALID_SISTERS.includes(sister as (typeof VALID_SISTERS)[number])) {
    notFound()
  }

  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <ScenarioPageView sister={sister} />
      </main>
      <Footer />
    </div>
  )
}
