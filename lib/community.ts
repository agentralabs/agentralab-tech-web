export type FeedbackType = "Bug Report" | "Feature Request" | "Integration Win" | "Docs" | "General"

export interface FeedbackEntry {
  id: string
  project: "AgenticMemory" | "AgenticVision" | "AgenticCodebase" | "AgenticIdentity" | "AgenticTime" | "AgenticContract" | "AgenticComm" | "AgenticPlanning"
  type: FeedbackType
  quote: string
  author: string
  role: string
  sourceLabel: string
  sourceUrl: string
  dateIso: string
}

export interface ShowcaseEntry {
  id: string
  title: string
  team: string
  summary: string
  stack: string[]
  links: { label: string; href: string }[]
  tags: string[]
}

export interface IntegrationEntry {
  id: string
  name: string
  status: "Production" | "Pilot" | "Community"
  description: string
  runtime: "MCP" | "CLI" | "Python" | "Rust" | "REST"
  project: "AgenticMemory" | "AgenticVision" | "AgenticCodebase" | "AgenticIdentity" | "AgenticTime" | "AgenticContract" | "AgenticComm" | "AgenticPlanning"
  link: string
}

export interface BlogEntry {
  slug: string
  title: string
  dateIso: string
  summary: string
  category: "Release" | "Research" | "Showcase" | "Ecosystem"
  cta: { label: string; href: string }
}

export interface ChannelEntry {
  name: string
  purpose: string
  primaryAction: string
  href: string
}

export const communityChannels: ChannelEntry[] = [
  {
    name: "Discord",
    purpose: "Real-time feedback, support requests, integration debugging, and community coordination.",
    primaryAction: "Join @agentralabs",
    href: "https://discord.gg/agentralabs",
  },
  {
    name: "X (Twitter)",
    purpose: "Showcase highlights, launch updates, and public signal from builders.",
    primaryAction: "Follow @agentralab",
    href: "https://x.com/agentralab",
  },
  {
    name: "Email",
    purpose: "Formal contact for integrations, support escalation, and collaboration requests.",
    primaryAction: "contact@agentralabs.tech",
    href: "mailto:contact@agentralabs.tech",
  },
]

export const featuredFeedback: FeedbackEntry[] = [
  {
    id: "fb-001",
    project: "AgenticMemory",
    type: "Integration Win",
    quote:
      "The .amem portability made multi-agent handoffs predictable. We finally stopped rebuilding context every session.",
    author: "Platform Engineering Team",
    role: "FinTech Ops",
    sourceLabel: "Discord",
    sourceUrl: "https://discord.gg/agentralabs",
    dateIso: "2026-02-08",
  },
  {
    id: "fb-002",
    project: "AgenticVision",
    type: "Feature Request",
    quote:
      "Cortex mapping is fast enough for nightly automation runs. We need more published templates for commerce workflows.",
    author: "Automation Guild",
    role: "Ecommerce Infra",
    sourceLabel: "Discord",
    sourceUrl: "https://discord.gg/agentralabs",
    dateIso: "2026-02-11",
  },
  {
    id: "fb-003",
    project: "AgenticCodebase",
    type: "General",
    quote:
      "Impact edges and coupling signals made PR planning dramatically cleaner for our team.",
    author: "Lead Developer",
    role: "B2B SaaS",
    sourceLabel: "Showcase Submission",
    sourceUrl: "https://agentralabs.tech/showcase",
    dateIso: "2026-02-17",
  },
]

export const showcaseEntries: ShowcaseEntry[] = [
  {
    id: "sc-001",
    title: "Persistent Incident Copilot",
    team: "NorthOps",
    summary:
      "Operations agents now preserve incident context across shifts with portable .amem memory snapshots.",
    stack: ["AgenticMemory", "MCP", "Claude Desktop"],
    links: [
      { label: "Thread", href: "https://discord.gg/agentralabs" },
      { label: "Repo", href: "https://github.com/agentralabs/agentic-memory" },
    ],
    tags: ["SRE", "Ops", "Memory"],
  },
  {
    id: "sc-002",
    title: "Browserless Catalog Monitor",
    team: "RetailDelta",
    summary:
      "Cortex map deltas power daily pricing checks and stock alerts without heavyweight browser automation.",
    stack: ["AgenticVision", "REST", "Python"],
    links: [
      { label: "Post", href: "https://x.com/agentralab" },
      { label: "Project", href: "https://github.com/agentralabs/agentic-vision" },
    ],
    tags: ["Commerce", "Observability", "Vision"],
  },
  {
    id: "sc-003",
    title: "Semantic Refactor Control Plane",
    team: "CodeFoundry",
    summary:
      "Repository-wide change planning now runs through semantic impact paths before edits are approved.",
    stack: ["AgenticCodebase", "Rust", "MCP"],
    links: [
      { label: "Contact", href: "mailto:contact@agentralabs.tech" },
      { label: "Project", href: "https://github.com/agentralabs/agentic-codebase" },
    ],
    tags: ["Code Intelligence", "Refactoring", "Governance"],
  },
]

export const integrationEntries: IntegrationEntry[] = [
  {
    id: "int-001",
    name: "Claude Desktop MCP",
    status: "Production",
    description: "Desktop MCP integration for persistent memory, web mapping, and semantic code workflows.",
    runtime: "MCP",
    project: "AgenticMemory",
    link: "https://github.com/agentralabs/agentic-memory",
  },
  {
    id: "int-002",
    name: "Codex CLI",
    status: "Pilot",
    description: "Local terminal workflow integration for build-time analysis and agentic tooling orchestration.",
    runtime: "CLI",
    project: "AgenticCodebase",
    link: "https://github.com/agentralabs/agentic-codebase",
  },
  {
    id: "int-003",
    name: "Python Runtime",
    status: "Production",
    description: "Python package pathways for memory and vision automation scripts.",
    runtime: "Python",
    project: "AgenticVision",
    link: "https://github.com/agentralabs/agentic-vision",
  },
  {
    id: "int-004",
    name: "REST Gateway",
    status: "Community",
    description: "Stateless endpoint interface for deployment environments that do not run MCP directly.",
    runtime: "REST",
    project: "AgenticVision",
    link: "https://github.com/agentralabs/agentic-vision",
  },
]

export const blogEntries: BlogEntry[] = [
  {
    slug: "launch-layer",
    title: "Building the Agent Infrastructure Layer",
    dateIso: "2026-02-18",
    summary: "Why persistent memory, web cartography, and semantic code intelligence belong in one ecosystem.",
    category: "Ecosystem",
    cta: { label: "Read on GitHub", href: "https://github.com/agentralabs" },
  },
  {
    slug: "feedback-loop",
    title: "Designing a Public Feedback Loop for Open Agent Systems",
    dateIso: "2026-02-19",
    summary: "How we collect user signal, moderate it, and publish verified implementation outcomes.",
    category: "Research",
    cta: { label: "Open feedback", href: "/feedback" },
  },
  {
    slug: "showcase-roundup",
    title: "What Teams Are Building with Agentra",
    dateIso: "2026-02-20",
    summary: "A running roundup of deployments using the eight Agentra sisters.",
    category: "Showcase",
    cta: { label: "View showcase", href: "/showcase" },
  },
]

export const submissionLinks = {
  feedbackForm: "https://discord.gg/agentralabs",
  showcaseForm: "https://x.com/agentralab",
  integrationForm: "mailto:contact@agentralabs.tech?subject=Agentra%20Labs%20Integration%20Submission&body=Project:%0AIntegration%20type:%0ARuntime:%0AEnvironment:%0A",
  partnerEmail:
    "mailto:contact@agentralabs.tech?subject=Agentra%20Labs%20Partnership%20Inquiry&body=Team%20name:%0AUse%20case:%0ATimeline:%0A",
}
