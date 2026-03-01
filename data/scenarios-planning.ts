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

export const PLANNING_HERO = {
  title: "AgenticPlanning",
  subtitle:
    "What happens when AI agents maintain persistent goals, record strategic decisions, track commitments, and resolve conflicts through structured reasoning in one portable file?",
  artifact: ".aplan",
}

export const PLANNING_SCENARIOS: ScenarioGroup[] = [
  {
    label: "Core Planning",
    items: [
      {
        id: "goal-graph",
        title: "Goal Graph",
        hook: "Hierarchical goals with priorities, dependencies, and conflict resolution",
        plainTerms:
          "Agents do not need to pick tasks blindly. They maintain a structured goal graph where each objective has a priority, status, and dependency chain that informs what to work on next.",
        content: null,
      },
      {
        id: "decision-records",
        title: "Decision Records",
        hook: "Every strategic choice recorded with rationale, alternatives, and outcome",
        plainTerms:
          "When an agent chooses one path over another, the reasoning is captured. Later agents can trace why a decision was made without re-deriving the context.",
        content: null,
      },
      {
        id: "commitment-tracking",
        title: "Commitment Tracking",
        hook: "Promises, deadlines, and deliverables with accountability chains",
        plainTerms:
          "Agents make commitments that are tracked explicitly. A commitment has an owner, a deadline, a deliverable, and a status that updates as work progresses.",
        content: null,
      },
    ],
  },
  {
    label: "Runtime Operations",
    items: [
      {
        id: "progress-signals",
        title: "Progress Signals",
        hook: "Real-time progress tracking against goals and commitments",
        plainTerms:
          "Teams can see exactly where each goal stands without asking the agent. Progress is measured against explicit criteria, not subjective estimates.",
        content: null,
      },
      {
        id: "planning-sessions",
        title: "Session-Linked Planning",
        hook: "Planning actions linked to session lifecycle with contextual logging",
        plainTerms:
          "Planning decisions are linked to the session that produced them. Operators can audit which session created a goal, changed a priority, or resolved a conflict.",
        content: null,
      },
      {
        id: "aplan-artifact",
        title: ".aplan Artifact Portability",
        hook: "One file carries goals, decisions, commitments, and progress state",
        plainTerms:
          "The planning layer stays portable across environments and models. Copy the file, and the strategic context moves with it.",
        content: null,
      },
    ],
  },
]
