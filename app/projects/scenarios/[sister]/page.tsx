import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScenarioPageView } from "@/components/scenario-page"

const VALID_SISTERS = ["agentic-memory", "agentic-vision", "agentic-codebase", "agentic-identity", "agentic-time", "agentic-contract", "agentic-comm", "agentic-planning", "agentic-cognition"] as const

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
  "agentic-identity": {
    title: "AgenticIdentity Scenarios — Agentra Labs",
    description:
      "See AgenticIdentity capabilities in action: Ed25519 identity anchors, signed action receipts, scoped trust grants, and cryptographic audit trails.",
  },
  "agentic-time": {
    title: "AgenticTime Scenarios — Agentra Labs",
    description:
      "See AgenticTime capabilities in action: deadline tracking, recurring schedules, PERT estimation, temporal decay models, and timeline fork analysis.",
  },
  "agentic-contract": {
    title: "AgenticContract Scenarios — Agentra Labs",
    description:
      "See AgenticContract capabilities in action: policy enforcement, risk limits, approval workflows, obligation tracking, self-healing contracts, and violation archaeology.",
  },
  "agentic-comm": {
    title: "AgenticComm Scenarios — Agentra Labs",
    description:
      "See AgenticComm capabilities in action: structured channels, typed messages, subscriptions, full-text search, broadcast, and portable .acomm artifacts.",
  },
  "agentic-planning": {
    title: "AgenticPlanning Scenarios — Agentra Labs",
    description:
      "See AgenticPlanning capabilities in action: persistent goals, strategic decisions, commitments, progress tracking, and portable .aplan artifacts.",
  },
  "agentic-cognition": {
    title: "AgenticCognition Scenarios — Agentra Labs",
    description:
      "See AgenticCognition capabilities in action: longitudinal user modeling, belief physics, decision fingerprints, shadow psychology, and predictive simulation in portable .acog artifacts.",
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
