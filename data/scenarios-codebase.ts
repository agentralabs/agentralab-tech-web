import type { ScenarioGroup } from "./scenarios-memory"

export const CODEBASE_HERO = {
  title: "AgenticCodebase",
  subtitle: "What happens when an AI agent understands your code the way an architect understands a building — structurally, historically, and predictively?",
  artifact: ".acb",
}

export const CODEBASE_SCENARIOS: ScenarioGroup[] = [
  {
    label: "Structural Understanding",
    items: [
      {
        id: "impact-edges",
        title: "IMPACT Edges",
        hook: "Knowing what breaks before you break it — X-ray vision for code changes.",
        plainTerms:
          "IMPACT edges are X-ray vision for code changes. Before you touch anything, the agent shows you every piece of code that depends on it — including the hidden, indirect, and dynamically-loaded dependencies that text search misses.",
        content: null,
      },
      {
        id: "called-by-calls",
        title: "CALLED_BY / CALLS Edges",
        hook: "Dependency traversal at 1.27μs — a subway map for your code.",
        plainTerms:
          "Call graph traversal lets the agent read an entire function's extended family tree in microseconds. Instead of you manually tracing calls through files, the agent shows you who calls what, how deep it goes, and where the critical paths are.",
        content: null,
      },
      {
        id: "tests-edges",
        title: "TESTS Edges",
        hook: "Coverage mapping that distinguishes real tests from mocked ones.",
        plainTerms:
          "TESTS edges connect code to its safety net. Instead of counting green checkmarks and hoping they cover your changes, the agent tells you exactly which tests exercise the code you actually modified — and which tests are lying to you with mocks.",
        content: null,
      },
      {
        id: "contains-edges",
        title: "CONTAINS Edges",
        hook: "Structural hierarchy — an organizational chart for your code.",
        plainTerms:
          "CONTAINS edges are an organizational chart for your code. Instead of searching for text strings, the agent navigates the containment hierarchy — package contains module, module contains class, class contains method — showing you where things live, not just where they're mentioned.",
        content: null,
      },
    ],
  },
  {
    label: "Temporal Intelligence",
    items: [
      {
        id: "couples-with",
        title: "COUPLES_WITH Edges",
        hook: "Shadow coupling from git history — the marriages your codebase never told you about.",
        plainTerms:
          "COUPLES_WITH edges reveal the marriages your codebase never told you about. Two files that always change together are coupled, even if they share zero imports. The agent spots these shadow dependencies by reading git history the way a detective reads phone records.",
        content: null,
      },
      {
        id: "prophecy",
        title: "PROPHECY",
        hook: "Predicting failures from temporal patterns — a weather forecast for code health.",
        plainTerms:
          "PROPHECY is a weather forecast for code health. It looks at the patterns — how fast a file is changing, how many of those changes are bugfixes, how many people are touching it — and tells you which files are likely to break before they actually do.",
        content: null,
      },
      {
        id: "stability-scoring",
        title: "Stability Scoring",
        hook: "Quantifying volatility — a credit score for code modules.",
        plainTerms:
          "Stability scoring turns \"this code feels risky\" into a number. Instead of gut feelings about which code is safe to build on, the agent gives you a quantified reliability metric — like a credit score for code modules.",
        content: null,
      },
      {
        id: "change-velocity",
        title: "Change Velocity Analysis",
        hook: "A speedometer for code areas — plan around reality, not assumptions.",
        plainTerms:
          "Change velocity analysis tells you which parts of the codebase are moving fast, which are stable, and which are slowing down. It's a speedometer for code areas — helping you plan around reality, not assumptions.",
        content: null,
      },
    ],
  },
  {
    label: "Semantic Navigation",
    items: [
      {
        id: "concept-edges",
        title: "CONCEPT Edges",
        hook: "Navigating ideas, not files — ask for \"authentication\", get the architecture.",
        plainTerms:
          "CONCEPT edges let you navigate code by ideas rather than file paths. Instead of searching for the word \"auth\" and drowning in results, the agent shows you the conceptual architecture — here's where authentication lives, here are its sub-concepts, and here's how they connect.",
        content: null,
      },
      {
        id: "symbol-lookup",
        title: "Symbol Lookup",
        hook: "Finding by qualified name in 14.3μs — a direct address for code.",
        plainTerms:
          "Symbol lookup is a direct address for code. Instead of searching and filtering, you give the agent a qualified name and get the definition instantly — like looking up a phone number in a directory rather than shouting the name in a crowd.",
        content: null,
      },
      {
        id: "type-hierarchy",
        title: "Type Hierarchy",
        hook: "Inheritance and implementation chains — the family tree of any class.",
        plainTerms:
          "Type hierarchy traversal shows you the family tree of any class or trait. Instead of guessing which classes inherit from which, the agent traces the complete lineage — parents, children, grandchildren, and every method override along the way.",
        content: null,
      },
    ],
  },
  {
    label: "Cross-Language",
    items: [
      {
        id: "ffi-binds",
        title: "FFI_BINDS Edges",
        hook: "Tracing across language boundaries — bridges between language islands.",
        plainTerms:
          "FFI_BINDS edges are bridges between language islands. When your Python calls Rust, or your Node.js calls C, the agent traces the connection across the boundary — so you can debug a Unicode bug by following the call from Python into Rust without losing the thread.",
        content: null,
      },
      {
        id: "multi-language",
        title: "Multi-Language Boundary Regression",
        hook: "Following data across language borders — customs agent for cross-language bugs.",
        plainTerms:
          "Multi-language tracing follows data across language borders like a customs agent following a package through international shipping. When a bug appears at the boundary between languages, the agent traces the full path and identifies exactly where the translation goes wrong.",
        content: null,
      },
    ],
  },
  {
    label: "Collective Intelligence",
    items: [
      {
        id: "pattern-sharing",
        title: "Pattern Sharing",
        hook: "Learning from a million codebases — collective wisdom without leaking your code.",
        plainTerms:
          "Pattern sharing gives your agent the collective wisdom of thousands of open-source projects. It's like having a senior developer who's seen every common mistake with every popular library and can warn you before you make them.",
        content: null,
      },
      {
        id: "common-mistake-detection",
        title: "Common Mistake Detection",
        hook: "Peer review from every developer who ever hit this bug.",
        plainTerms:
          "Common mistake detection is a peer review from every Go developer who ever forgot to close a response body. The agent has seen the mistake thousands of times in other codebases and catches it in yours before it reaches production.",
        content: null,
      },
      {
        id: "library-guidance",
        title: "Library-Specific Guidance",
        hook: "The library author whispering \"don't do that\" before runtime panic.",
        plainTerms:
          "Library-specific guidance is like having the library author standing behind you, whispering \"don't do that\" before you make a mistake that compiles but explodes at runtime. The collective knows each library's footguns because thousands of developers have stepped on them already.",
        content: null,
      },
    ],
  },
  {
    label: "Safety & Governance",
    items: [
      {
        id: "acb-gate",
        title: "acb gate",
        hook: "Enforceable risk thresholds — a quality bouncer for your CI pipeline.",
        plainTerms:
          "acb gate is a quality bouncer for your CI pipeline. Instead of just checking \"do tests pass?\", it checks \"is this change architecturally safe?\" — blocking high-risk PRs before they merge, with specific explanations of what to fix.",
        content: null,
      },
      {
        id: "acb-budget",
        title: "acb budget",
        hook: "Storage policy controls — a self-organizing filing cabinet for decades.",
        plainTerms:
          "acb budget is a storage plan that lets your code graphs accumulate for decades without manual cleanup. Like a self-organizing filing cabinet, it keeps what matters and compresses what doesn't.",
        content: null,
      },
      {
        id: "test-gap",
        title: "Test-Gap Detection",
        hook: "Finding the holes in your safety net where the tightrope is highest.",
        plainTerms:
          "Test-gap detection finds the holes in your safety net where the tightrope is highest. Instead of treating 82% coverage as \"good enough,\" the agent shows you that the uncovered 18% is exactly the code that matters most.",
        content: null,
      },
      {
        id: "health-diagnostics",
        title: "Health Diagnostics",
        hook: "An annual physical for your codebase — vital signs measured continuously.",
        plainTerms:
          "Health diagnostics are an annual physical for your codebase. Instead of waiting until the architecture is visibly sick, the agent measures vital signs continuously — stability, coupling, coverage, and risk — and tells you where the problems are developing.",
        content: null,
      },
    ],
  },
]
