"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Eye } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const ease = [0.22, 1, 0.36, 1] as const

function StatusLine() {
  const [surface, setSurface] = useState("0.0")

  useEffect(() => {
    const interval = setInterval(() => {
      setSurface((Math.random() * 40 + 20).toFixed(1))
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-[10px] tracking-widest text-muted-foreground uppercase font-mono">
      <span className="h-1.5 w-1.5 bg-[#ea580c]" />
      <span>live surface: {surface} active operations</span>
    </div>
  )
}

function BlinkDot() {
  return <span className="inline-block h-2 w-2 bg-[#ea580c] animate-blink" />
}

interface ModuleCard {
  id: string
  frame: string
  value: string
  period: string
  tag: string | null
  description: string
  summary: string
  deepSummary: { lead: string; body: string }[]
  cta: string
  href: string
  scenarioHref: string
  highlighted: boolean
}

const MODULES: ModuleCard[] = [
  {
    id: "agentic-memory",
    frame: "PROJECTS",
    value: "AgenticMemory",
    period: "/ AVAILABLE",
    tag: "READY",
    description: "Ask any AI \"why did you recommend that?\" and you'll get a made-up answer. Not because it's dishonest — the reasoning evaporated when the context window closed. AgenticMemory stores reasoning chains so \"why?\" has a real answer.",
    summary:
      "Every decision has CAUSED_BY edges connecting it to the facts that led to it. The chain is traversable. Corrections link to what they fixed. Truth evolves across sessions in portable .amem files.",
    deepSummary: [
      {
        lead: "CAUSED_BY edges:",
        body: "Walk backwards through reasoning. Every recommendation traces to the facts that drove it.",
      },
      {
        lead: "SUPERSEDES chains:",
        body: "Corrections link to what they replaced. Old beliefs stay visible. Truth has a history.",
      },
      {
        lead: "16 query types:",
        body: "Traversal, temporal diffs, causal analysis, semantic search, and belief revision on graph structure.",
      },
      {
        lead: "6 event types:",
        body: "Facts, decisions, inferences, corrections, skills, and episodes. Each typed, timestamped, and linked.",
      },
    ],
    cta: "VIEW REPO",
    href: "https://github.com/agentralabs/agentic-memory",
    scenarioHref: "/projects/scenarios/agentic-memory",
    highlighted: false,
  },
  {
    id: "agentic-vision",
    frame: "PROJECTS",
    value: "AgenticVision",
    period: "/ AVAILABLE",
    tag: "READY",
    description: "\"The button broke yesterday.\" Your AI can't see yesterday. It can't see the button. It asks you to describe everything, then guesses. AgenticVision captures visual state as queryable evidence.",
    summary:
      "When the button breaks, the agent diffs Tuesday vs Wednesday, finds the CSS change, traces it to a commit, and links the evidence to memory. Screenshots become queryable in portable .avis files.",
    deepSummary: [
      {
        lead: "vision_capture:",
        body: "Structured screenshots with CLIP embedding, metadata, quality scoring, and optional OCR extraction.",
      },
      {
        lead: "vision_diff:",
        body: "Pixel-level comparison between two states. What changed, where, and by how much.",
      },
      {
        lead: "vision_similar:",
        body: "Find matching past states by visual similarity. Cosine distance on 512-dim CLIP embeddings.",
      },
      {
        lead: "Memory bridge:",
        body: "Link screenshots to cognitive graph nodes. Visual evidence connects to reasoning chains.",
      },
    ],
    cta: "VIEW REPO",
    href: "https://github.com/agentralabs/agentic-vision",
    scenarioHref: "/projects/scenarios/agentic-vision",
    highlighted: true,
  },
  {
    id: "agentic-codebase",
    frame: "PROJECTS",
    value: "AgenticCodebase",
    period: "/ AVAILABLE",
    tag: "READY",
    description: "\"Refactor this function.\" Your AI cheerfully edits the code. It has no idea that 47 other functions call this one. It doesn't know the test suite catches 12 failures but misses 35. AgenticCodebase fixes that.",
    summary:
      "Before writing one character, the agent walks callers, tests, and hidden couplings. Compile any repo into a portable .acb graph with impact analysis, stability scoring, and breakage prediction.",
    deepSummary: [
      {
        lead: "IMPACT edges:",
        body: "Trace what depends on what you're changing. Callers, tests, and downstream paths exposed before edits land.",
      },
      {
        lead: "COUPLES_WITH:",
        body: "Hidden dependencies from git co-change patterns. The connections your linter can't see.",
      },
      {
        lead: "PROPHECY:",
        body: "Predict failures from stability analysis and temporal drift. Stage migrations safely.",
      },
      {
        lead: "14.3 \u00b5s lookup:",
        body: "Symbol lookup in microseconds, index access in nanoseconds. Structure at the speed of thought.",
      },
    ],
    cta: "VIEW REPO",
    href: "https://github.com/agentralabs/agentic-codebase",
    scenarioHref: "/projects/scenarios/agentic-codebase",
    highlighted: false,
  },
  {
    id: "agentic-identity",
    frame: "PROJECTS",
    value: "AgenticIdentity",
    period: "/ AVAILABLE",
    tag: "READY",
    description: "\"Who did this?\" Your agent deployed code, called APIs, and approved a transaction. But there is no cryptographic proof. No signed receipt. No scoped trust. AgenticIdentity anchors every agent action to a verifiable identity.",
    summary:
      "Every agent gets an Ed25519 key pair as its identity anchor. Every action produces a signed receipt. Trust between agents is granted, scoped, delegated, and revoked through signed trust grants. Everything is portable in .aid files.",
    deepSummary: [
      {
        lead: "Identity anchors:",
        body: "Ed25519 key pairs that uniquely identify each agent. Deterministic, portable, and verifiable by anyone with the public key.",
      },
      {
        lead: "Action receipts:",
        body: "Signed records of every operation. Tamper-evident, timestamped, and chainable into complete audit trails.",
      },
      {
        lead: "Trust grants:",
        body: "Scoped, time-limited delegation tokens. Grant deploy:staging but not deploy:prod. Revoke instantly.",
      },
      {
        lead: "Microsecond signing:",
        body: "Ed25519 operations complete in microseconds. Zero latency overhead for production agent workflows.",
      },
    ],
    cta: "VIEW REPO",
    href: "https://github.com/agentralabs/agentic-identity",
    scenarioHref: "/projects/scenarios/agentic-identity",
    highlighted: false,
  },
  {
    id: "agentic-time",
    frame: "PROJECTS",
    value: "AgenticTime",
    period: "/ AVAILABLE",
    tag: "READY",
    description: "\"When should we migrate?\" Your agent has no clock, no calendar, no sense of deadlines or decay. It suggests \"this weekend\" without checking schedules, conflicts, or compounding debt. AgenticTime gives agents temporal reasoning.",
    summary:
      "Every temporal entity — deadlines, schedules, sequences, durations, decay models — is stored, queried, and reasoned over. PERT estimation, conflict detection, and timeline fork analysis in portable .atime files.",
    deepSummary: [
      {
        lead: "5 entity types:",
        body: "Duration, Deadline, Schedule, Sequence, and Decay. Each typed, timestamped, and linked to temporal chains.",
      },
      {
        lead: "PERT estimation:",
        body: "Three-point estimates (optimistic, expected, pessimistic) for realistic scheduling under uncertainty.",
      },
      {
        lead: "Temporal debt:",
        body: "Compounding cost models for deferred work. See how delay cascades before it compounds.",
      },
      {
        lead: "Timeline forks:",
        body: "Branch temporal state to compare outcomes before committing. What-if analysis for scheduling.",
      },
    ],
    cta: "VIEW REPO",
    href: "https://github.com/agentralabs/agentic-time",
    scenarioHref: "/projects/scenarios/agentic-time",
    highlighted: false,
  },
  {
    id: "agentic-contract",
    frame: "PROJECTS",
    value: "AgenticContract",
    period: "/ AVAILABLE",
    tag: "READY",
    description: "\"Is this agent allowed to do that?\" Your agent deploys code, approves requests, and allocates resources — with no policies, no risk limits, and no approval workflows. AgenticContract gives agents governance.",
    summary:
      "Every agent action is checked against policies, risk limits, and approval workflows. Obligations track what must be done. Violations are detected before they compound. All governance state lives in portable .acon files.",
    deepSummary: [
      {
        lead: "Policy engine:",
        body: "Allow, deny, or require approval for any action. Scoped to global, session, or individual agents with tag-based matching.",
      },
      {
        lead: "Risk limits:",
        body: "Rate, threshold, budget, and count limits that prevent agents from exceeding safe boundaries.",
      },
      {
        lead: "Approval workflows:",
        body: "Multi-party approval chains with smart escalation routing. Request, decide, and audit every controlled action.",
      },
      {
        lead: "Self-healing contracts:",
        body: "Contracts that automatically adapt policies when violations are detected. Governance that learns from incidents.",
      },
    ],
    cta: "VIEW REPO",
    href: "https://github.com/agentralabs/agentic-contract",
    scenarioHref: "/projects/scenarios/agentic-contract",
    highlighted: false,
  },
]

function ModuleGlyph({ id, highlighted }: { id: ModuleCard["id"]; highlighted: boolean }) {
  const baseClass = highlighted ? "text-background/85" : "text-foreground"
  const accentClass = highlighted ? "text-[#fb923c]" : "text-[#ea580c]"

  if (id === "agentic-memory") {
    return (
      <svg viewBox="0 0 120 80" className="w-full h-24" fill="none" aria-label="AgenticMemory glyph">
        <circle cx="20" cy="20" r="6" className={accentClass} fill="currentColor" />
        <circle cx="60" cy="16" r="5" className={baseClass} fill="currentColor" />
        <circle cx="96" cy="30" r="6" className={accentClass} fill="currentColor" />
        <circle cx="36" cy="54" r="6" className={baseClass} fill="currentColor" />
        <circle cx="82" cy="58" r="5" className={baseClass} fill="currentColor" />
        <path d="M20 20L60 16L96 30L82 58L36 54L20 20Z" className={baseClass} stroke="currentColor" strokeWidth="2" />
        <path d="M60 16L36 54M96 30L36 54" className={accentClass} stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  if (id === "agentic-vision") {
    return (
      <svg viewBox="0 0 120 80" className="w-full h-24" fill="none" aria-label="AgenticVision glyph">
        <ellipse cx="60" cy="40" rx="44" ry="22" className={baseClass} stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="40" r="12" className={accentClass} stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="40" r="4" className={accentClass} fill="currentColor" />
        <path d="M18 40H6M114 40h-12M60 6v12M60 74V62" className={baseClass} stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  if (id === "agentic-identity") {
    return (
      <svg viewBox="0 0 120 80" className="w-full h-24" fill="none" aria-label="AgenticIdentity glyph">
        <rect x="40" y="8" width="40" height="50" rx="4" className={baseClass} stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="28" r="8" className={accentClass} stroke="currentColor" strokeWidth="2" />
        <path d="M50 42h20M50 48h20" className={accentClass} stroke="currentColor" strokeWidth="2" />
        <path d="M60 58v14" className={baseClass} stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="72" r="4" className={accentClass} fill="currentColor" />
        <path d="M20 30l20-10M100 30l-20-10" className={baseClass} stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="16" cy="32" r="4" className={baseClass} fill="currentColor" />
        <circle cx="104" cy="32" r="4" className={baseClass} fill="currentColor" />
      </svg>
    )
  }

  if (id === "agentic-time") {
    return (
      <svg viewBox="0 0 120 80" className="w-full h-24" fill="none" aria-label="AgenticTime glyph">
        <circle cx="60" cy="40" r="28" className={baseClass} stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="40" r="3" className={accentClass} fill="currentColor" />
        <path d="M60 40V20" className={accentClass} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M60 40L78 48" className={baseClass} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M60 14v4M60 62v4M88 40h4M28 40h4" className={baseClass} stroke="currentColor" strokeWidth="1.5" />
        <path d="M96 16l-6 6M30 64l-6 6" className={accentClass} stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
    )
  }

  if (id === "agentic-contract") {
    return (
      <svg viewBox="0 0 120 80" className="w-full h-24" fill="none" aria-label="AgenticContract glyph">
        <rect x="30" y="8" width="60" height="64" rx="2" className={baseClass} stroke="currentColor" strokeWidth="2" />
        <path d="M42 24h36M42 34h36M42 44h24" className={baseClass} stroke="currentColor" strokeWidth="1.5" />
        <path d="M42 54h12" className={accentClass} stroke="currentColor" strokeWidth="2" />
        <circle cx="82" cy="54" r="6" className={accentClass} stroke="currentColor" strokeWidth="2" />
        <path d="M79 54l2 2 4-4" className={accentClass} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 20l10-4M100 20l-10-4" className={baseClass} stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 120 80" className="w-full h-24" fill="none" aria-label="AgenticCodebase glyph">
      <path d="M24 20L10 40L24 60" className={baseClass} stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      <path d="M96 20L110 40L96 60" className={baseClass} stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      <rect x="42" y="20" width="36" height="40" className={baseClass} stroke="currentColor" strokeWidth="2" />
      <path d="M50 32H70M50 40H70M50 48H64" className={accentClass} stroke="currentColor" strokeWidth="2" />
      <circle cx="78" cy="20" r="3" className={accentClass} fill="currentColor" />
      <circle cx="90" cy="32" r="3" className={accentClass} fill="currentColor" />
      <path d="M78 20L90 32L78 44" className={baseClass} stroke="currentColor" strokeWidth="2" />
      <circle cx="78" cy="44" r="3" className={accentClass} fill="currentColor" />
    </svg>
  )
}

function ModuleCardView({ module, index }: { module: ModuleCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.6, ease }}
      className={`flex flex-col h-full min-h-[760px] ${
        module.highlighted
          ? "border-2 border-foreground bg-foreground text-background"
          : "border-2 border-foreground bg-background text-foreground"
      }`}
    >
      <div
        className={`flex items-center justify-between px-5 py-3 border-b-2 ${
          module.highlighted ? "border-background/20" : "border-foreground"
        }`}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-mono">{module.frame}</span>
        <div className="flex items-center gap-2">
          {module.tag && (
            <span className="bg-[#ea580c] text-background text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 font-mono">
              {module.tag}
            </span>
          )}
          <span className="text-[10px] tracking-[0.2em] font-mono opacity-50">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="px-5 pt-6 pb-4">
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="text-3xl lg:text-4xl font-mono font-bold tracking-tight">{module.value}</span>
          <span
            className={`text-xs font-mono tracking-widest uppercase ${
              module.highlighted ? "text-background/50" : "text-muted-foreground"
            }`}
          >
            {module.period}
          </span>
        </div>
        <p
          className={`text-xs font-mono mt-3 leading-relaxed ${
            module.highlighted ? "text-background/60" : "text-muted-foreground"
          }`}
        >
          {module.description}
        </p>
      </div>

      <div
        className={`flex-1 px-5 py-4 border-t-2 ${
          module.highlighted ? "border-background/20" : "border-foreground"
        }`}
      >
        <p
          className={`text-xs font-mono leading-relaxed ${
            module.highlighted ? "text-background/80" : "text-muted-foreground"
          }`}
        >
          {module.summary}
        </p>
        <div className={`mt-4 pt-3 border-t ${module.highlighted ? "border-background/20" : "border-border"} flex flex-col gap-3`}>
          {module.deepSummary.map((line) => (
            <p
              key={`${module.id}-${line.lead}`}
              className={`text-xs font-mono leading-relaxed ${
                module.highlighted ? "text-background/70" : "text-muted-foreground"
              }`}
            >
              <strong>{line.lead}</strong> {line.body}
            </p>
          ))}
        </div>

        <div
          className={`mt-4 border-2 ${
            module.highlighted ? "border-background/20 bg-background/5" : "border-foreground"
          }`}
        >
          <div
            className={`px-3 py-2 border-b ${
              module.highlighted ? "border-background/20" : "border-border"
            } flex items-center justify-between`}
          >
            <span
              className={`text-[10px] tracking-[0.15em] uppercase font-mono ${
                module.highlighted ? "text-background/60" : "text-muted-foreground"
              }`}
            >
              module.glyph
            </span>
            <span
              className={`text-[10px] tracking-[0.15em] uppercase font-mono ${
                module.highlighted ? "text-background/50" : "text-muted-foreground"
              }`}
            >
              {module.value}
            </span>
          </div>
          <div className="px-3 py-2">
            <ModuleGlyph id={module.id} highlighted={module.highlighted} />
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 flex flex-col gap-2">
        <Link
          href={module.scenarioHref}
          className={`group w-full flex items-center justify-center gap-0 text-xs font-mono tracking-wider uppercase transition-colors ${
            module.highlighted
              ? "border-2 border-background/30 text-background hover:bg-background/10"
              : "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
          }`}
        >
          <span className="flex items-center justify-center w-9 h-9 bg-[#ea580c]">
            <Eye size={14} strokeWidth={2} className="text-background" />
          </span>
          <span className="flex-1 py-2.5">SEE IN ACTION</span>
        </Link>
        <motion.a
          href={module.href}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={`group w-full flex items-center justify-center gap-0 text-xs font-mono tracking-wider uppercase ${
            module.highlighted
              ? "bg-background text-foreground"
              : "bg-foreground text-background"
          }`}
        >
          <span className="flex items-center justify-center w-9 h-9 bg-[#ea580c]">
            <ArrowRight size={14} strokeWidth={2} className="text-background" />
          </span>
          <span className="flex-1 py-2.5">{module.cta}</span>
        </motion.a>
      </div>
    </motion.div>
  )
}

export function PricingSection() {
  return (
    <section className="w-full px-6 py-20 lg:px-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: ECOSYSTEM_MODULES"}
        </span>
        <div className="flex-1 border-t border-border" />
        <BlinkDot />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          006
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-foreground text-balance">
            Seven systems. One cognitive layer.
          </h2>
          <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-md">
            AgenticMemory — reasoning that persists. AgenticVision — visual state that&apos;s queryable.
            AgenticCodebase — code understanding with prediction. AgenticIdentity — cryptographic proof of agent action. AgenticTime — temporal reasoning with deadlines. AgenticContract — policy governance for agents. All open source. All shipped.
            AgenticComm — structured channels and message routing for cross-agent coordination.
          </p>
        </div>
        <StatusLine />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {MODULES.slice(0, 3).map((module, i) => (
          <ModuleCardView key={module.id} module={module} index={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 mt-0">
        {MODULES.slice(3).map((module, i) => (
          <ModuleCardView key={module.id} module={module} index={i + 3} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5, ease }}
        className="flex items-center gap-3 mt-6"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {
            "* Seven independent systems that work well together. Research-backed. MIT licensed. Production ready."
          }
        </span>
        <div className="flex-1 border-t border-border" />
      </motion.div>
    </section>
  )
}
