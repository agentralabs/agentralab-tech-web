"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Eye } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const ease = [0.22, 1, 0.36, 1] as const

type ProjectKey = "AgenticMemory" | "AgenticVision" | "AgenticCodebase" | "AgenticIdentity" | "AgenticTime" | "AgenticContract" | "AgenticComm" | "AgenticPlanning" | "AgenticCognition"

interface QueryRow {
  id: number
  query: string
  answer: string
  status: string
}

const PROJECTS: {
  key: ProjectKey
  artifact: string
  capacity: string
  repo: string
  scenarioHref: string
  line: string
}[] = [
  {
    key: "AgenticMemory",
    artifact: ".amem",
    capacity: "16 query capacities",
    repo: "https://github.com/agentralabs/agentic-memory",
    scenarioHref: "/projects/scenarios/agentic-memory",
    line: "Persistent cognitive graph memory for cross-session reasoning continuity.",
  },
  {
    key: "AgenticVision",
    artifact: ".avis",
    capacity: "cartography + actions + gateway + compiler runtime",
    repo: "https://github.com/agentralabs/agentic-vision",
    scenarioHref: "/projects/scenarios/agentic-vision",
    line: "Cortex web cartography with browserless mapping, direct actions, and persistent visual memory.",
  },
  {
    key: "AgenticCodebase",
    artifact: ".acb",
    capacity: "semantic compiler + collective + prophecy",
    repo: "https://github.com/agentralabs/agentic-codebase",
    scenarioHref: "/projects/scenarios/agentic-codebase",
    line: "Concept-level code intelligence with impact edges, hidden coupling, and temporal prophecy.",
  },
  {
    key: "AgenticIdentity",
    artifact: ".aid",
    capacity: "identity anchors + trust grants + action receipts",
    repo: "https://github.com/agentralabs/agentic-identity",
    scenarioHref: "/projects/scenarios/agentic-identity",
    line: "Cryptographic agent identity with Ed25519 anchors, signed receipts, and scoped trust delegation.",
  },
  {
    key: "AgenticTime",
    artifact: ".atime",
    capacity: "deadlines + schedules + sequences + decay + PERT",
    repo: "https://github.com/agentralabs/agentic-time",
    scenarioHref: "/projects/scenarios/agentic-time",
    line: "Temporal reasoning with deadline tracking, recurring schedules, step sequences, and temporal decay models.",
  },
  {
    key: "AgenticContract",
    artifact: ".acon",
    capacity: "policies + risk limits + approvals + obligations + violations",
    repo: "https://github.com/agentralabs/agentic-contract",
    scenarioHref: "/projects/scenarios/agentic-contract",
    line: "Policy governance for AI agents with risk limits, approval workflows, obligation tracking, and self-healing contracts.",
  },
  {
    key: "AgenticComm",
    artifact: ".acomm",
    capacity: "channels + messages + subscriptions + search + broadcast",
    repo: "https://github.com/agentralabs/agentic-comm",
    scenarioHref: "/projects/scenarios/agentic-comm",
    line: "Structured inter-agent communication with named channels, typed messages, subscriptions, and full-text search.",
  },
  {
    key: "AgenticPlanning",
    artifact: ".aplan",
    capacity: "goals + decisions + commitments + progress + federation",
    repo: "https://github.com/agentralabs/agentic-planning",
    scenarioHref: "/projects/scenarios/agentic-planning",
    line: "Persistent goals, strategic decisions, commitments, and progress tracking for AI agent reasoning.",
  },
  {
    key: "AgenticCognition",
    artifact: ".acog",
    capacity: "belief physics + decision fingerprints + shadow psychology + simulation",
    repo: "https://github.com/agentralabs/agentic-cognition",
    scenarioHref: "/projects/scenarios/agentic-cognition",
    line: "Longitudinal user modeling — living models of human consciousness for AI agents.",
  },
]

const MEMORY_ENGINE: QueryRow[] = [
  { id: 1, query: "Traversal", answer: "Why did I decide this?", status: "Operational" },
  { id: 2, query: "Pattern", answer: "Show me all decisions from last week", status: "Operational" },
  { id: 3, query: "Temporal", answer: "What changed between session 5 and 20?", status: "Operational" },
  { id: 4, query: "Causal / Impact", answer: "What breaks if this fact is wrong?", status: "Operational" },
  { id: 5, query: "Similarity", answer: "What else do I know about this topic?", status: "Operational" },
  { id: 6, query: "Context", answer: "Give me everything around this node", status: "Operational" },
  { id: 7, query: "Resolve", answer: "What is the current truth?", status: "Operational" },
  { id: 8, query: "BM25 Text Search", answer: "Find memories containing these words", status: "Operational" },
  { id: 9, query: "Hybrid Search", answer: "BM25 + vector fused ranking", status: "Operational" },
  { id: 10, query: "Graph Centrality", answer: "What are my foundational beliefs?", status: "Operational" },
  { id: 11, query: "Shortest Path", answer: "How are these concepts connected?", status: "Operational" },
  { id: 12, query: "Belief Revision", answer: "If I learn X, what breaks?", status: "Operational" },
  { id: 13, query: "Reasoning Gaps", answer: "Where am I guessing?", status: "Operational" },
  { id: 14, query: "Analogical", answer: "Have I solved something like this before?", status: "Operational" },
  { id: 15, query: "Consolidation", answer: "Clean and strengthen my brain", status: "Operational" },
  { id: 16, query: "Drift Detection", answer: "How has my understanding shifted?", status: "Operational" },
]

function SectionRail({ label, step }: { label: string; step: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease }}
      className="flex items-center gap-4 mb-8"
    >
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">{label}</span>
      <div className="flex-1 border-t border-border" />
      <span className="h-1.5 w-1.5 bg-[#ea580c]" />
      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">{step}</span>
    </motion.div>
  )
}

function MemoryCapacity() {
  return (
    <div className="flex flex-col gap-5">
      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Memory Is Not Search</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Most systems treat memory as retrieval over flattened text chunks. AgenticMemory treats memory as graph
          cognition: nodes for what the agent learned or decided, edges for why those events connect, and traversal for
          reasoning history.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">The Atom: Cognitive Event</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          The smallest memory unit is a cognitive event, not a transcript chunk: FACT, DECISION, INFERENCE,
          CORRECTION, SKILL, and EPISODE. Each event is written with confidence, timestamps, access dynamics, feature
          vectors, and direct edge references for O(1) node access.
        </p>
        <div className="mt-3 border border-foreground overflow-hidden">
          {[
            "FACT — learned truth about user, system, or world state.",
            "DECISION — selected action and why it was chosen.",
            "INFERENCE — synthesized conclusion from multiple events.",
            "CORRECTION — explicit update that supersedes prior belief.",
            "SKILL — procedural pattern for execution in context.",
            "EPISODE — compressed session-level meaning summary.",
          ].map((row) => (
            <div key={row} className="px-3 py-2 text-xs font-mono text-muted-foreground border-b border-border last:border-b-0">
              {row}
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Edges Make It A Brain</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Relationship edges encode causality and truth evolution: CAUSED_BY, SUPPORTS, CONTRADICTS, SUPERSEDES,
          RELATED_TO, PART_OF, TEMPORAL_NEXT. This preserves why decisions happened and what changed over time.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">One File, Memory-Mappable</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          `.amem` is a binary graph file with header, node table, edge table, content block, vectors, and indexes.
          It is memory-mappable, portable, and query-ready without external databases or managed vector services.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">The Full Query Engine</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Querying is navigation, not blind similarity. The engine supports traversal, temporal diffing, causal impact,
          contradiction resolution, pattern recall, and structural gap detection.
        </p>
      </div>

      <div className="border-2 border-foreground overflow-hidden">
        <div className="grid grid-cols-[70px_1fr_1fr_140px] border-b-2 border-foreground">
          <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">#</span>
          <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Query Type</span>
          <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">What It Answers</span>
          <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">Status</span>
        </div>
        {MEMORY_ENGINE.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[70px_1fr_1fr_140px] border-b border-border last:border-b-0"
          >
            <span className="px-3 py-2 text-xs font-mono">{row.id}</span>
            <span className="px-3 py-2 text-xs font-mono">{row.query}</span>
            <span className="px-3 py-2 text-xs font-mono text-muted-foreground">{row.answer}</span>
            <span className="px-3 py-2 text-xs font-mono text-[#ea580c]">{row.status}</span>
          </div>
        ))}
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Memory Formation Pipeline</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          After each interaction the system extracts events, links them to existing cognition, updates confidence and
          decay, writes an EPISODE compression node, and incrementally refreshes indexes. Memory formation runs
          asynchronously so response latency remains stable.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Portable Agent Brain</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Your `.amem` travels across agents and environments. Knowledge continuity belongs to you, not to a single
          assistant vendor. Any compatible runtime can mount the same cognitive history with causal context intact.
        </p>
      </div>
    </div>
  )
}

function VisionCapacity() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">AI Can Think. AI Cannot See.</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Cortex gives any AI agent complete vision of the web. Instead of opening pages one by one, it builds
          structured site maps that agents can query, traverse, and execute against.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">The Core: Web Cartography</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Any agent that uses Cortex does not browse. It maps. Sitemaps, JSON-LD, metadata, and API traces are
          extracted over HTTP and compiled into a binary graph where pages become queryable nodes.
        </p>
        <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">
          <strong>In human terms:</strong> instead of walking store by store, the agent gets the floor plan,
          inventory, and price surface in one pass.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">No Browser Required</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Browser automation stacks carry heavy runtime cost and are easy to block. Cortex runs HTTP-first so
          rendering is fallback, not default. The result is lightweight mapping with direct structured extraction.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Actions Without Clicking</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Buttons are UI wrappers around HTTP actions. Cortex discovers action surfaces from forms, JavaScript bundles,
          and platform patterns, then executes the same requests directly for search, form submission, and cart flows.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">One Command Across Agents</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          `cortex plug` auto-discovers compatible agent clients and injects Cortex MCP configuration safely so setup
          is minutes faster across multi-agent workstations.
        </p>
        <div className="mt-3 bg-foreground text-background p-3 border border-foreground">
          <p className="text-xs font-mono">{"> npx cortex plug"}</p>
          <p className="text-xs font-mono">{"> cortex start --http-port 7700"}</p>
          <p className="text-xs font-mono">{"> open http://localhost:7700/dashboard"}</p>
        </div>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Works With Every Agent</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Cortex is exposed through MCP, REST, and language clients, so Claude, GPT actions, Cursor, Copilot-class
          IDE agents, and orchestration frameworks can all share the same cartography and action layer.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Capability Progression</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Vision capability track as delivered milestones, shown independently from the narrative frames.
        </p>
        <div className="mt-3 border border-foreground overflow-hidden">
          <div className="grid grid-cols-[1fr_140px] border-b border-foreground">
            <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">
              Milestone
            </span>
            <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground text-right">
              Status
            </span>
          </div>
          {[
            "Core runtime foundation",
            "No-browser mapping engine",
            "Advanced action execution",
            "Gateway surface (MCP + REST + plug)",
            "Framework adapters",
            "Docker delivery",
            "Package-manager distribution",
            "WebMCP integration",
            "Full platform validation",
            "Live visibility and dashboard telemetry",
            "Web Compiler + Collective Graph + Temporal Intelligence",
          ].map((item) => (
            <div key={item} className="grid grid-cols-[1fr_140px] border-b border-border last:border-b-0">
              <span className="px-3 py-2 text-xs font-mono text-muted-foreground">{item}</span>
              <span className="px-3 py-2 text-xs font-mono text-[#ea580c] text-right">READY</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">The Web Compiler</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Cortex maps websites into structured graphs, then compiles those graphs into typed interfaces so any agent
          can import web domains like libraries instead of scraping page-by-page sessions.
        </p>
        <div className="mt-3 bg-foreground text-background p-3 border border-foreground">
          <p className="text-xs font-mono">{'> amazon = cortex.compile("amazon.com")'}</p>
          <p className="text-xs font-mono">{"> amazon.Product.search()"}</p>
          <p className="text-xs font-mono">{"> product.add_to_cart()"}</p>
          <p className="text-xs font-mono">{"> amazon.Cart.checkout()"}</p>
        </div>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">The Collective Web Graph</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Mapping deltas can be shared so new agents start warm instead of remapping the same domains repeatedly.
          Shared graph structure lowers cold-start latency while private context remains local.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">The Web Gets A Memory</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          <strong>The web gets a memory.</strong>
        </p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Right now the web has no past. You only see what exists today. With persistent timelines and collective
          deltas, historical state becomes queryable by default: price history, availability changes, and drift.
        </p>
        <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">
          Temporal intelligence layers can surface recurring drop windows, short-horizon volatility, and in-stock
          returns without bespoke per-site trackers.
        </p>
        <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">
          <strong>In human terms:</strong> if every time anyone looked at a web page state it was preserved,
          you could ask what something cost months ago, when it changes most, and when to act next.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">MCP Capability Surface</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          AgenticVision exposes 10 MCP tools for visual continuity: capture, compare, query, OCR, similar, track,
          diff, link, session_start, and session_end. Visual memory persists in portable <code>.avis</code> artifacts.
        </p>
      </div>
    </div>
  )
}

function CodebaseCapacity() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Code Is Not A Text Search Problem</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Most tools flatten code into files and syntax trees, then grep for strings. AgenticCodebase models code as a
          living graph across four dimensions: symbols, relationships, time, and collective patterns.
        </p>
        <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">
          The agent does not read code line-by-line. It navigates concepts, impacts, and future risk.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Semantic Code Compiler</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Compile repositories into semantic graphs where nodes represent intentions, not just syntax. Concepts become
          first-class navigation targets across files and languages.
        </p>
        <div className="mt-3 bg-foreground text-background p-3 border border-foreground">
          <p className="text-xs font-mono">{"> pythonrepo = acb.compile('./my-project')"}</p>
          <p className="text-xs font-mono">{"> pythonrepo.User"}</p>
          <p className="text-xs font-mono">{"> pythonrepo.User.authentication_flow"}</p>
          <p className="text-xs font-mono">{"> pythonrepo.User.all_mutations"}</p>
          <p className="text-xs font-mono">{"> pythonrepo.User.test_coverage"}</p>
          <p className="text-xs font-mono">{"> repo.PaymentService"}</p>
          <p className="text-xs font-mono">{"> repo.PaymentService.rust_binding"}</p>
          <p className="text-xs font-mono">{"> repo.PaymentService.js_consumer"}</p>
        </div>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Collective Code Intelligence</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Dependency intelligence arrives pre-understood from shared ecosystem patterns. Private code remains private
          while open-source operational knowledge compounds across agents.
        </p>
        <div className="mt-3 border-t border-foreground pt-3 flex flex-col gap-1">
          <p className="text-xs font-mono text-muted-foreground">Common usage patterns per symbol</p>
          <p className="text-xs font-mono text-muted-foreground">Frequent mistakes and their fixes</p>
          <p className="text-xs font-mono text-muted-foreground">Performance characteristics discovered through use</p>
          <p className="text-xs font-mono text-muted-foreground">Upgrade paths that worked versus broke</p>
        </div>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Code Prophecy</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Temporal delta stacking turns repository history into forward-looking risk intelligence. The system predicts
          likely failure boundaries before they become incidents.
        </p>
        <div className="mt-3 border-t border-foreground pt-3 flex flex-col gap-1">
          <p className="text-xs font-mono text-muted-foreground">
            Stability scores: identify high-churn modules that are refactor candidates.
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            Coupling detection: highlight pairs that repeatedly break together.
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            Pattern prediction: detect change signatures linked to debt accumulation.
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            Migration prophecy: estimate dependency break pressure windows.
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            Architectural drift: detect where implementation diverges from intended design.
          </p>
        </div>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Impact Edges</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Before editing a function, agents traverse `CALLED_BY`, `TESTS`, and `COUPLES_WITH` edges to compute what
          will break, what is covered, and what hidden dependencies are not covered.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Concept Edges</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Ask for `repo.Authentication`, not keyword matches. Concept subgraphs unify handlers, middleware, models,
          utilities, and tests into one navigable architectural unit.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Collective Patterns</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Library behavior arrives with collective caution layers: common misuses, production failure signatures, and
          mitigation patterns observed across broad usage.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">FFI_BINDS Edges</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Cross-language traces remain continuous. Python-to-Rust-to-C execution paths are represented in one graph so
          debugging and impact analysis do not stop at language boundaries.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">COUPLES_WITH Edges</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Git-derived co-change analysis surfaces hidden coupling that static imports miss. Shadow dependencies become
          explicit before refactors land in production.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">24-Query Surface</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          24 query types across core, built, and advanced layers: lookup, dependency, containment, semantic traversal,
          impact analysis, cross-language tracing, stability, coupling, migration pressure, drift, and hotspot mapping.
        </p>
        <div className="mt-3 border border-foreground overflow-hidden">
          <div className="grid grid-cols-[160px_1fr] border-b border-foreground">
            <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">
              Tier
            </span>
            <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">
              Coverage
            </span>
          </div>
          <div className="grid grid-cols-[160px_1fr] border-b border-border">
            <span className="px-3 py-2 text-xs font-mono">Core</span>
            <span className="px-3 py-2 text-xs font-mono text-muted-foreground">
              Symbol lookup, dependency graphs, reverse dependency, calls, hierarchy, containment, semantic match
            </span>
          </div>
          <div className="grid grid-cols-[160px_1fr] border-b border-border">
            <span className="px-3 py-2 text-xs font-mono">Built</span>
            <span className="px-3 py-2 text-xs font-mono text-muted-foreground">
              Impact analysis, coverage mapping, cross-language tracing, similarity, path navigation
            </span>
          </div>
          <div className="grid grid-cols-[160px_1fr]">
            <span className="px-3 py-2 text-xs font-mono">Advanced</span>
            <span className="px-3 py-2 text-xs font-mono text-muted-foreground">
              Collective patterns, temporal evolution, stability, coupling, prophecy, migration, drift, hotspots
            </span>
          </div>
        </div>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">End-to-End Refactor Intelligence</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          For requests like multi-currency payment refactors, the agent navigates concept subgraphs, computes impact
          edges, checks hidden couplings, pulls collective warnings, traces FFI assumptions, and proposes a safe change
          sequence before writing code.
        </p>
      </div>
    </div>
  )
}

function IdentityCapacity() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Agents Have No Identity</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          API keys are shared secrets with no audit trail. OAuth tokens expire and carry no action history.
          Logs can be tampered with and carry no signatures. AgenticIdentity gives every agent a permanent,
          cryptographic identity rooted in Ed25519 key pairs.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">The Atom: Identity Anchor</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          The identity anchor is an Ed25519 key pair that uniquely identifies an agent. The public key is the
          agent&apos;s verifiable identity. The private key signs every action the agent takes.
        </p>
        <div className="mt-3 border border-foreground overflow-hidden">
          {[
            "IDENTITY ANCHOR — Ed25519 key pair, deterministic and portable.",
            "ACTION RECEIPT — Signed record of an operation with timestamp and payload hash.",
            "RECEIPT CHAIN — Ordered sequence of receipts forming a complete audit trail.",
            "TRUST GRANT — Scoped, time-limited delegation from one anchor to another.",
            "KEY DERIVATION — Hierarchical child keys for isolated subsystem identities.",
          ].map((row) => (
            <div key={row} className="px-3 py-2 text-xs font-mono text-muted-foreground border-b border-border last:border-b-0">
              {row}
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Trust Grants Make It A Web</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Trust grants are signed delegation tokens from one identity anchor to another. Each grant specifies
          scope (deploy:staging, read:logs), TTL, and revocation conditions. Delegation chains are fully verifiable.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">One File, Portable Identity</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          <code>.aid</code> is a portable identity artifact containing the anchor, trust grants, and receipt history.
          It travels with the agent across environments. Identity belongs to the agent, not the platform.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Cryptographic Primitives</p>
        <div className="mt-3 border border-foreground overflow-hidden">
          <div className="grid grid-cols-[160px_1fr_140px] border-b border-foreground">
            <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">
              Operation
            </span>
            <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">
              Detail
            </span>
            <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">
              Status
            </span>
          </div>
          {[
            { op: "Key Generation", detail: "Ed25519 from CSPRNG or deterministic seed", status: "Operational" },
            { op: "Action Signing", detail: "Sign payload hash with private key", status: "Operational" },
            { op: "Receipt Verify", detail: "Verify signature with public key only", status: "Operational" },
            { op: "Trust Grant", detail: "Scoped delegation with TTL and revocation", status: "Operational" },
            { op: "Key Derivation", detail: "Hierarchical child keys from master anchor", status: "Operational" },
            { op: "Receipt Chain", detail: "Ordered, hash-linked audit trail", status: "Operational" },
            { op: "Encrypted Storage", detail: "AES-256-GCM encrypted .aid at rest", status: "Operational" },
          ].map((row) => (
            <div key={row.op} className="grid grid-cols-[160px_1fr_140px] border-b border-border last:border-b-0">
              <span className="px-3 py-2 text-xs font-mono">{row.op}</span>
              <span className="px-3 py-2 text-xs font-mono text-muted-foreground">{row.detail}</span>
              <span className="px-3 py-2 text-xs font-mono text-[#ea580c]">{row.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Multi-LLM Portability</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Identity anchors are LLM-agnostic. The same <code>.aid</code> artifact works across Claude, GPT, Gemini,
          and any MCP-compatible runtime. Agent identity is not locked to a single vendor.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">MCP Capability Surface</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          AgenticIdentity exposes MCP tools for identity lifecycle: create_anchor, sign_receipt, verify_receipt,
          grant_trust, revoke_trust, list_receipts, and action_context. All operations produce portable <code>.aid</code> artifacts.
        </p>
      </div>
    </div>
  )
}

function TimeCapacity() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Agents Have No Clock</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          LLMs have no sense of time. They cannot track deadlines, model recurring schedules, estimate
          durations, or understand temporal decay. Every conversation exists in an eternal present.
          AgenticTime gives agents a temporal reasoning engine rooted in deadlines, schedules, sequences,
          and decay models.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">The Atom: Temporal Entity</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          The smallest temporal unit is a typed entity: Duration, Deadline, Schedule, Sequence, or Decay.
          Each carries metadata, status transitions, and relationships to other temporal entities.
        </p>
        <div className="mt-3 border border-foreground overflow-hidden">
          {[
            "DURATION — PERT three-point estimate (optimistic, expected, pessimistic).",
            "DEADLINE — Hard or soft with consequences and automatic status transitions.",
            "SCHEDULE — Daily, weekly, or cron-style recurrence with conflict detection.",
            "SEQUENCE — Ordered multi-step workflow with automatic advancement.",
            "DECAY — Exponential, linear, or step-function relevance decay over time.",
          ].map((row) => (
            <div key={row} className="px-3 py-2 text-xs font-mono text-muted-foreground border-b border-border last:border-b-0">
              {row}
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Temporal Intelligence</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          Beyond tracking, AgenticTime reasons about time: finding available slots across overlapping
          schedules, detecting conflicts before they happen, computing temporal debt from deferred work,
          and modeling chrono-gravity where approaching deadlines warp priority landscapes.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Temporal Advanced Tools</p>
        <div className="mt-3 border border-foreground overflow-hidden">
          <div className="grid grid-cols-[160px_1fr_140px] border-b border-foreground">
            <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">
              Advanced Tool
            </span>
            <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">
              Detail
            </span>
            <span className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-mono text-muted-foreground">
              Status
            </span>
          </div>
          {[
            { op: "Timeline Forks", detail: "Branch-and-explore what-if temporal reasoning", status: "Operational" },
            { op: "Temporal Debt", detail: "Compound interest on deferred work", status: "Operational" },
            { op: "Chrono-Gravity", detail: "Urgent deadlines warp nearby task priorities", status: "Operational" },
            { op: "Anomaly Detection", detail: "Catch impossible timelines and temporal paradoxes", status: "Operational" },
            { op: "PERT Estimation", detail: "Three-point duration estimates with weighted averages", status: "Operational" },
            { op: "Decay Models", detail: "Exponential, linear, and step-function relevance decay", status: "Operational" },
            { op: "Slot Queries", detail: "Find free windows across overlapping constraints", status: "Operational" },
          ].map((row) => (
            <div key={row.op} className="grid grid-cols-[160px_1fr_140px] border-b border-border last:border-b-0">
              <span className="px-3 py-2 text-xs font-mono">{row.op}</span>
              <span className="px-3 py-2 text-xs font-mono text-muted-foreground">{row.detail}</span>
              <span className="px-3 py-2 text-xs font-mono text-[#ea580c]">{row.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">One File, Portable Temporal Brain</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          <code>.atime</code> is a portable temporal artifact containing all deadlines, schedules, sequences,
          duration estimates, and decay models in a single binary file with BLAKE3 checksums. Copy it to
          another machine, and the agent&apos;s entire temporal context comes with it.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">Multi-LLM Portability</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          The same <code>.atime</code> artifact works across Claude, GPT, Gemini, and any MCP-compatible
          runtime. Temporal reasoning is not locked to a single vendor.
        </p>
      </div>

      <div className="border-2 border-foreground p-4">
        <p className="text-sm font-mono font-bold uppercase tracking-tight">MCP Capability Surface</p>
        <p className="mt-2 text-xs font-mono text-muted-foreground leading-relaxed">
          AgenticTime exposes 19 MCP tools for temporal lifecycle: deadline management, schedule creation,
          sequence advancement, decay evaluation, slot queries, conflict detection, and timeline forking.
          All operations persist in portable <code>.atime</code> artifacts.
        </p>
      </div>
    </div>
  )
}

function ProjectCapacityView({ project }: { project: ProjectKey }) {
  if (project === "AgenticMemory") return <MemoryCapacity />
  if (project === "AgenticVision") return <VisionCapacity />
  if (project === "AgenticCodebase") return <CodebaseCapacity />
  if (project === "AgenticIdentity") return <IdentityCapacity />
  return <TimeCapacity />
}

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<ProjectKey>("AgenticMemory")
  const activeMeta = PROJECTS.find((item) => item.key === activeProject)!

  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <section className="w-full px-6 pt-10 pb-14 lg:px-12">
          <SectionRail label="// SECTION: ECOSYSTEM_PROJECTS" step="009" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="border-2 border-foreground p-6 lg:p-8"
          >
            <h1 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tight">
              Project Capacity Explorer
            </h1>
            <p className="mt-4 max-w-3xl text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              Click each project to inspect its real capacity surface. This page is intentionally capability-first:
              what the engine can do, how it behaves, and how it maps to practical agent outcomes. AgenticComm
              (.acomm) serves as the structured communication substrate across these runtime sisters.
            </p>
          </motion.div>
        </section>

        <section className="w-full px-6 pb-16 lg:px-12">
          <SectionRail label="// SECTION: CAPABILITY_SURFACE" step="010" />
          <div className="border-2 border-foreground">
            <div className="px-4 py-3 border-b-2 border-foreground flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                  {PROJECTS.slice(0, 3).map((project) => (
                    <button
                      key={project.key}
                      type="button"
                      onClick={() => setActiveProject(project.key)}
                      className={`px-3 py-2 text-[10px] tracking-[0.15em] uppercase font-mono border ${
                        activeProject === project.key
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-muted-foreground border-border hover:border-foreground"
                      }`}
                      aria-pressed={activeProject === project.key}
                    >
                      {project.key}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {PROJECTS.slice(3, 6).map((project) => (
                    <button
                      key={project.key}
                      type="button"
                      onClick={() => setActiveProject(project.key)}
                      className={`px-3 py-2 text-[10px] tracking-[0.15em] uppercase font-mono border ${
                        activeProject === project.key
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-muted-foreground border-border hover:border-foreground"
                      }`}
                      aria-pressed={activeProject === project.key}
                    >
                      {project.key}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {PROJECTS.slice(6).map((project) => (
                    <button
                      key={project.key}
                      type="button"
                      onClick={() => setActiveProject(project.key)}
                      className={`px-3 py-2 text-[10px] tracking-[0.15em] uppercase font-mono border ${
                        activeProject === project.key
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-muted-foreground border-border hover:border-foreground"
                      }`}
                      aria-pressed={activeProject === project.key}
                    >
                      {project.key}
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-muted-foreground">
                {activeMeta.capacity} | artifact: {activeMeta.artifact}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-0">
              <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-foreground p-5 flex flex-col gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">active.project</p>
                  <h2 className="mt-2 text-2xl font-mono font-bold uppercase">{activeMeta.key}</h2>
                  <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">{activeMeta.line}</p>
                </div>

                <div className="border-t-2 border-foreground pt-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase font-mono text-muted-foreground">surface.summary</p>
                  <p className="mt-2 text-xs font-mono text-muted-foreground">{activeMeta.capacity}</p>
                  <p className="text-xs font-mono text-muted-foreground">Portable artifact: {activeMeta.artifact}</p>
                </div>

                <a
                  href={activeMeta.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 group flex items-center gap-0 bg-foreground text-background text-xs font-mono tracking-wider uppercase"
                >
                  <span className="flex items-center justify-center w-9 h-9 bg-[#ea580c]">
                    <ArrowRight size={14} strokeWidth={2} className="text-background" />
                  </span>
                  <span className="flex-1 py-2.5 text-center">View Repo</span>
                </a>
                <Link
                  href={activeMeta.scenarioHref}
                  className="mt-2 group flex items-center gap-0 border-2 border-foreground text-foreground text-xs font-mono tracking-wider uppercase hover:bg-foreground hover:text-background transition-colors"
                >
                  <span className="flex items-center justify-center w-9 h-9 bg-[#ea580c]">
                    <Eye size={14} strokeWidth={2} className="text-background" />
                  </span>
                  <span className="flex-1 py-2.5 text-center">See Scenarios</span>
                </Link>
              </div>

              <div className="p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.28, ease }}
                  >
                    <ProjectCapacityView project={activeProject} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-12">
          <SectionRail label="// SECTION: COLLABORATION" step="011" />
          <div className="border-2 border-foreground">
            <div className="px-5 py-3 border-b-2 border-foreground flex items-center justify-between">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                collaboration.channel
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">LIVE</span>
            </div>
            <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
                Open to sponsorships and research collaborations across AI, ML, and agent systems,
                including persistent memory, visual continuity, and semantic code intelligence.
              </p>
              <div className="flex flex-col gap-2">
                <a href="mailto:contact@agentralabs.tech" className="text-xs font-mono uppercase tracking-widest">
                  contact@agentralabs.tech
                </a>
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  www.agentralabs.tech
                </span>
                <a
                  href="/publications"
                  className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  Research publications
                </a>
                <a
                  href="https://github.com/agentralabs/agentralabs-tech-web"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  Website repository
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
