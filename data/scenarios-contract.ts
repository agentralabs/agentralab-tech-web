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

export const CONTRACT_HERO = {
  title: "AgenticContract",
  subtitle: "What happens when an AI agent checks policies before acting, respects risk limits, routes approvals through proper channels, and tracks obligations — all in a single portable file?",
  artifact: ".acon",
}

export const CONTRACT_SCENARIOS: ScenarioGroup[] = [
  {
    label: "Core Governance",
    items: [
      {
        id: "policy-engine",
        title: "Policy Engine",
        hook: "Allow, deny, or require approval for any action — scoped to global, session, or individual agents.",
        plainTerms:
          "The policy engine gives every agent a rulebook. Each policy defines what actions are allowed, denied, or need approval. Scope it globally, per session, or per agent. Tag-based matching means policies compose naturally without conflicts.",
        content: null,
      },
      {
        id: "risk-limits",
        title: "Risk Limits",
        hook: "Rate, threshold, budget, and count limits that prevent agents from exceeding safe boundaries.",
        plainTerms:
          "Risk limits put guardrails on agent behavior. Set a budget limit for API spending, a rate limit for deployments per hour, a count limit for file deletions, or a threshold limit for confidence scores. The agent checks before acting, not after breaking things.",
        content: null,
      },
      {
        id: "approval-workflows",
        title: "Approval Workflows",
        hook: "Multi-party approval chains with rules, requests, and decisions — all auditable.",
        plainTerms:
          "Approval workflows turn dangerous agent actions into controlled processes. Define who needs to approve what, create requests when actions need clearance, and record decisions with reasons. Every approval or denial is tracked and auditable.",
        content: null,
      },
      {
        id: "obligation-tracking",
        title: "Obligation Tracking",
        hook: "Deadlines, assignees, and automatic status transitions for tasks agents must fulfill.",
        plainTerms:
          "Obligation tracking ensures agents don't just start tasks — they finish them. Each obligation has a deadline, an assignee, and automatic status transitions from pending to fulfilled or overdue. The agent knows what it owes before taking on new work.",
        content: null,
      },
    ],
  },
  {
    label: "Enforcement and Detection",
    items: [
      {
        id: "violation-detection",
        title: "Violation Detection",
        hook: "Automatic detection and reporting of policy violations with severity levels.",
        plainTerms:
          "Violation detection catches agents breaking rules. Each violation records what policy was broken, how severe it was (info, warning, critical, fatal), and when it happened. Pattern analysis over violation history reveals systemic governance gaps.",
        content: null,
      },
      {
        id: "conditional-execution",
        title: "Conditional Execution",
        hook: "Rules that gate agent actions on dynamic conditions — thresholds, time windows, dependencies.",
        plainTerms:
          "Conditional execution adds context-awareness to governance. An action might only be allowed during business hours, only when a dependency is satisfied, or only when a metric stays below a threshold. The agent evaluates conditions in real time before proceeding.",
        content: null,
      },
      {
        id: "contract-signing",
        title: "Contract Signing",
        hook: "Multi-party agreements between agents with verifiable signature chains.",
        plainTerms:
          "Contract signing formalizes agreements between agents. When two agents need to collaborate, they create a contract, both sign it, and the signature chain is verifiable by anyone. This turns informal coordination into auditable commitments.",
        content: null,
      },
    ],
  },
  {
    label: "Contract Advanced Tools",
    items: [
      {
        id: "self-healing-contracts",
        title: "Self-Healing Contracts",
        hook: "Contracts that automatically adapt policies when violations are detected.",
        plainTerms:
          "Self-healing contracts learn from every violation. When an agent breaks a rule, the contract automatically tightens the relevant policy, adds monitoring, or adjusts risk limits. Governance that gets smarter with every incident instead of waiting for manual review.",
        content: null,
      },
      {
        id: "smart-escalation",
        title: "Smart Escalation Routing",
        hook: "Approval requests automatically routed to the optimal approver based on patterns.",
        plainTerms:
          "Smart escalation routes approval requests to the right person at the right time. It analyzes who approved similar requests before, who's currently available, and who has the authority. No more bottlenecks from approvals sitting in the wrong queue.",
        content: null,
      },
      {
        id: "violation-archaeology",
        title: "Violation Archaeology",
        hook: "Pattern analysis over violation history to identify root causes and systemic issues.",
        plainTerms:
          "Violation archaeology digs into the history of rule-breaking to find why it keeps happening. It identifies clusters, recurring patterns, and root causes that individual violation reports miss. Fix the system, not just the symptoms.",
        content: null,
      },
      {
        id: "temporal-contracts",
        title: "Temporal Contracts",
        hook: "Time-evolving contracts with governance transitions — policies that change on schedule.",
        plainTerms:
          "Temporal contracts model governance that evolves over time. A new agent starts with strict policies that gradually relax as trust builds. A project transitions from development governance to production governance on a schedule. Policy evolution is planned, not ad-hoc.",
        content: null,
      },
    ],
  },
  {
    label: "File Format and Portability",
    items: [
      {
        id: "acon-format",
        title: ".acon Binary Format",
        hook: "One portable file containing all governance state — policies, limits, approvals, obligations, violations.",
        plainTerms:
          "The .acon file is a portable governance brain. It stores all policies, risk limits, approval workflows, obligations, conditions, and violation history in a single binary file with BLAKE3 checksums. Copy it to another machine, and the agent's entire governance context comes with it.",
        content: null,
      },
      {
        id: "contract-multi-llm",
        title: "Multi-LLM Portability",
        hook: "The same .acon artifact works across Claude, GPT, Gemini, and any MCP-compatible runtime.",
        plainTerms:
          "Multi-LLM portability means your governance isn't locked to one AI vendor. The same .acon file works with Claude today and GPT tomorrow. Your policies, risk limits, and approval workflows belong to your workflow, not your platform.",
        content: null,
      },
    ],
  },
]
