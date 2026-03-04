export interface ScenarioItem {
  id: string
  title: string
  hook: string
  plainTerms: string
  content: React.ReactNode
}

export interface ScenarioGroup {
  label: string
  items: ScenarioItem[]
}

export const REALITY_HERO = {
  title: "AgenticReality",
  subtitle:
    "Existential grounding — deployment consciousness, resource awareness, and reality physics for AI agents",
  artifact: ".areal",
}

export const REALITY_SCENARIOS: ScenarioGroup[] = [
  {
    label: "Deployment Consciousness",
    items: [
      {
        id: "deployment-soul",
        title: "Deployment Soul",
        hook: "Identity continuity tied to where and how the agent is running.",
        plainTerms:
          "The agent tracks who it is, where it was deployed, and how its runtime identity evolves across sessions.",
        content: null,
      },
      {
        id: "environment-sensing",
        title: "Environment Sensing",
        hook: "Live environment state, incidents, and pressure captured as first-class runtime context.",
        plainTerms:
          "The agent keeps a current picture of its operating environment so it can adapt decisions to real conditions.",
        content: null,
      },
      {
        id: "context-fingerprint",
        title: "Context Fingerprint",
        hook: "Deterministic signature of the active runtime context for continuity and drift detection.",
        plainTerms:
          "The agent can detect when it is operating in a meaningfully different context instead of assuming everything is unchanged.",
        content: null,
      },
    ],
  },
  {
    label: "Resource Awareness",
    items: [
      {
        id: "resource-body",
        title: "Resource Body Schema",
        hook: "Structured view of memory, CPU, and runtime pressure as an operational body model.",
        plainTerms:
          "The agent does not guess about capacity; it reasons with explicit resource limits and pressure signals.",
        content: null,
      },
      {
        id: "capability-discovery",
        title: "Capability Discovery",
        hook: "Runtime-discovered capability surface instead of hard-coded assumptions.",
        plainTerms:
          "The agent checks what it can really do in this environment before planning actions.",
        content: null,
      },
      {
        id: "cost-consciousness",
        title: "Cost Consciousness",
        hook: "Operational cost and budget pressure integrated into decision paths.",
        plainTerms:
          "The agent can trade off action quality and system cost rather than optimizing only for one side.",
        content: null,
      },
    ],
  },
  {
    label: "Reality Physics",
    items: [
      {
        id: "reality-anchors",
        title: "Reality Anchors",
        hook: "Ground-truth anchors to keep inferred state aligned with verified reality.",
        plainTerms:
          "The agent binds reasoning to trusted anchor signals so it does not drift into fabricated assumptions.",
        content: null,
      },
      {
        id: "hallucination-detection",
        title: "Hallucination Detection",
        hook: "Mismatch detection between claimed context and observed grounded state.",
        plainTerms:
          "When the agent's internal story diverges from reality, it can detect and surface that gap.",
        content: null,
      },
      {
        id: "areal-artifact",
        title: ".areal Artifact",
        hook: "Portable binary runtime state artifact for deterministic handoff and replay.",
        plainTerms:
          "Grounding state travels with the agent as a single file so context survives runtime and model changes.",
        content: null,
      },
    ],
  },
]
