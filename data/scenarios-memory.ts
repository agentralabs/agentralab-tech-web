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

export const MEMORY_HERO = {
  title: "AgenticMemory",
  subtitle: "What happens when an AI agent can remember, reason about its reasoning, and correct itself across sessions?",
  artifact: ".amem",
}

export const MEMORY_SCENARIOS: ScenarioGroup[] = [
  {
    label: "Core Graph Capabilities",
    items: [
      {
        id: "caused-by",
        title: "CAUSED_BY Edges",
        hook: "The agent can walk backwards through its own thinking.",
        plainTerms:
          "CAUSED_BY edges give the agent a breadcrumb trail through its own thinking. Instead of a goldfish that forgets between conversations, you get a colleague who can explain every recommendation back to the evidence that motivated it.",
        content: null, // will be replaced with JSX in the component file
      },
      {
        id: "supersedes-resolve",
        title: "SUPERSEDES + RESOLVE",
        hook: "Facts that update other facts — version control for beliefs.",
        plainTerms:
          "SUPERSEDES chains are version control for beliefs. The agent never loses history, but it always gives you the latest truth — like a wiki page that tracks every edit but shows the current version by default.",
        content: null,
      },
      {
        id: "cognitive-event-types",
        title: "Six Cognitive Event Types",
        hook: "Typed thinking, not a blob of text — Facts, Decisions, Inferences, Corrections, Skills, Episodes.",
        plainTerms:
          "Typed events turn a junk drawer into a filing cabinet. The agent doesn't just remember things — it remembers what kind of thing each memory is, so it can retrieve decisions without wading through observations, and separate facts from guesses.",
        content: null,
      },
      {
        id: "cross-session",
        title: "Cross-Session Persistence",
        hook: "Memory that survives conversation boundaries — no more Groundhog Day.",
        plainTerms:
          "Cross-session persistence turns a series of disconnected conversations into a continuous working relationship. The agent remembers you the way a long-term colleague does — not just what you said today, but the full context of your collaboration.",
        content: null,
      },
    ],
  },
  {
    label: "Retrieval Capabilities",
    items: [
      {
        id: "semantic-search",
        title: "Semantic Search",
        hook: "Finding by meaning, not keywords — 9ms across 100,000 nodes.",
        plainTerms:
          "Semantic search is like asking a colleague \"remember when we talked about the database not keeping up?\" and having them immediately recall the conversation, even though you used completely different words the first time around.",
        content: null,
      },
      {
        id: "hybrid-search",
        title: "Hybrid Search",
        hook: "BM25 precision meets vector flexibility through Reciprocal Rank Fusion.",
        plainTerms:
          "Hybrid search is like having two search strategies — one that reads exact words, one that understands meaning — and combining their best guesses. You get the precision of keywords with the flexibility of meaning-based retrieval.",
        content: null,
      },
      {
        id: "temporal-queries",
        title: "Temporal Queries",
        hook: "\"What did I know at time T?\" — a time machine for beliefs.",
        plainTerms:
          "Temporal queries give you a time machine for beliefs. You can rewind to any date and see exactly what the agent knew, didn't know, and was wrong about — invaluable for incident postmortems and understanding how knowledge evolves.",
        content: null,
      },
      {
        id: "pattern-queries",
        title: "Pattern Queries",
        hook: "\"Find all decisions about authentication\" — typed retrieval in 40ms.",
        plainTerms:
          "Pattern queries are like asking \"show me every time we made a call about authentication\" and getting a clean, typed, chronological decision log — no noise, no manual filtering, just the decisions and their reasoning chains.",
        content: null,
      },
      {
        id: "causal-analysis",
        title: "Causal Analysis",
        hook: "\"What depends on this fact?\" — a blast radius calculator for beliefs.",
        plainTerms:
          "Causal analysis is a blast radius calculator for beliefs. When you discover a fact was wrong, the agent instantly shows you everything that was built on that bad foundation — like finding a cracked brick and knowing exactly which walls are affected.",
        content: null,
      },
    ],
  },
  {
    label: "Quality & Governance",
    items: [
      {
        id: "memory-quality",
        title: "Memory Quality Scoring",
        hook: "Confidence and reliability metrics — a health checkup for the agent's brain.",
        plainTerms:
          "Memory quality scoring is a health checkup for the agent's brain. Like a code linter catches technical debt, quality scoring catches knowledge debt — beliefs that are stale, unsupported, or dangerously low-confidence.",
        content: null,
      },
      {
        id: "contradiction-detection",
        title: "Contradiction Detection",
        hook: "Finding conflicting facts before they cause real problems.",
        plainTerms:
          "Contradiction detection is an internal consistency checker. When the agent holds two beliefs that can't both be true, it catches the conflict before it causes problems — like a compiler that won't let you declare the same variable with two different types.",
        content: null,
      },
      {
        id: "budget-policy",
        title: "Budget Policy",
        hook: "Long-horizon storage governance — a pension plan for memory.",
        plainTerms:
          "Budget policy is a pension plan for memory. The agent manages its own storage lifecycle so it can run for decades without human intervention — compressing the mundane while preserving every important decision.",
        content: null,
      },
      {
        id: "privacy-redaction",
        title: "Privacy & Redaction Controls",
        hook: "AMEM_AUTO_CAPTURE — a firewall between conversation and persistent memory.",
        plainTerms:
          "Privacy controls are a firewall between conversation content and persistent memory. The agent remembers the reasoning and decisions, but sensitive details like API keys and email addresses are scrubbed at the gate — privacy by construction, not by policy.",
        content: null,
      },
      {
        id: "runtime-sync",
        title: "Runtime-Sync Episodes",
        hook: "Handoff snapshots between sessions — shift reports between agents.",
        plainTerms:
          "Runtime-sync episodes are briefing documents that agents write for each other. Instead of making Agent B read Agent A's entire diary, you get a curated summary of the important decisions — like a shift handoff report in a hospital.",
        content: null,
      },
    ],
  },
]
